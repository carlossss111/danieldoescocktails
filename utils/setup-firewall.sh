#!/bin/bash
set -e

if [ "$EUID" -ne 0 ]; then
    echo 'Please run as root.'; exit 1
fi

### SETUP ### 
# Flush all user-defined rules
iptables -F 

# Create new chains for TCP and UDP
iptables -N TCP
iptables -N UDP

# Drop all packets expected to be forwarded as this is not a gateway machine
iptables -P FORWARD DROP

# Allow all outgoing connections, it is a webserver after all
iptables -P OUTPUT ACCEPT

# Begin INPUT chain as a whitelist, blocking everything not explicitly allowed after
iptables -P INPUT DROP 

### INCOMING STATES AND PROTOCOLS ### 
# Whitelist incoming established connections
iptables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
# Whitelist incoming loopback (127.0.0.1) packets
iptables -A INPUT -i lo -j ACCEPT
# Blacklist incoming invalidated packets
iptables -A INPUT -m conntrack --ctstate INVALID -j DROP

# Whitelist incoming new ICMP (ping) packets
iptables -A INPUT -p icmp --icmp-type 8 -m conntrack --ctstate NEW -j ACCEPT
# Attach TCP and UDP chains to the INPUT chain
iptables -A INPUT -p udp -m conntrack --ctstate NEW -j UDP
iptables -A INPUT -p tcp --syn -m conntrack --ctstate NEW -j TCP

# Reject TCP and UDP packets in a friendly way instead of dropping them
iptables -A INPUT -p udp -j REJECT --reject-with icmp-port-unreachable
iptables -A INPUT -p tcp -j REJECT --reject-with tcp-reset
# Reject non TCP/UDP packets in a friendly way
iptables -A INPUT -j REJECT --reject-with icmp-proto-unreachable

### INCOMING PORTS ###
# Serve the website on ports 80 (HTTP) and 443 (HTTPS), rate limit it to 25 connections a minute with a burst of 100
iptables -A TCP -p tcp --dport 80 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT
iptables -A TCP -p tcp --dport 443 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT

# Use SSH guard
iptables -N sshguard 
iptables -A TCP -p tcp --destination-ports 22 -j sshguard

# Whitelist SSH connections
iptables -A TCP -p tcp --dport 22 -j ACCEPT

# Finish IP Tables rules
iptables-save -f /etc/iptables/iptables.rules

# Enable SSH guard
systemctl enable sshguard.service
systemctl start sshguard.service

echo 'Finished! Please check /etc/iptables/iptables.rules'

