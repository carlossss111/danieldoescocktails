# Accessing Protected Endpoints with mTLS

Who uses passwords these days!

## Creating a Certificate Authority (CA) 
We need to create a certificate authority on the server (seperate from the letsencrypt CA) to authenticate with.
Do this in .letsencrypt/ because this is where we already mount certificates on the frontend. Here we create `admin-access-ca.crt` and `admin-access-ca.key`.
```
openssl req -newkey rsa:4096 -x509 -keyout admin-access-ca.key -out admin-access-ca.crt -days 365 -nodes -subj "/CN=daniel-certificate-authority"
```
NOTE: The CN (Common Name) does not matter too much, but it MUST atleast be different from the CN that follows in the next steps.

## Creating a client key and certificate signing request (CSR)
On the client device, running this command creates a private key `client.key` and a CSR `client.csr`.
```
openssl req -new -newkey rsa:4096 -nodes -keyout client.key -out client.csr
```
Keep the client's private key safe somewhere for later.

## Create a client certificate
Securely copy the CSR onto the server. Now sign the CSR with the CA's public and private key to create a client certificate `client.crt`.
```
openssl x509 -req -days 365 -in client.csr -CA admin-access-ca.crt -CAkey admin-access-ca.key -CAcreateserial -out client.crt
```

Copy the client certificate back onto the client machine next to the client's private key from earlier.
Send a cURL to a protected endpoint to check that it worked. This will send your signed certificate along and will further sign it with the client private key during sending.
```
curl -k https://localhost/<protected-endpoint> --cert client.crt --key client.key
```

## Load into a browser
Merge the client certificate and client key into a single file. Firefox uses pkcs12 keystore files.
```
openssl pkcs12 -export -out key-store.p12 -inkey client.key -in client.crt
```

In the browser settings, import this keystore as a certificate, then go to the protected page you want to view.
Note that it might be a bit finicky at-first, if it doesn't work load it up in a private browser session.

That's it! Done! No passwords needed!

## Debugging nginx
If nginx is rejecting the certificate, add logs to it to find out why.

Add to a 'server' part in `nginx.conf`:
```
error_log  /error.log debug;
```

Now run:
```
docker compose restart
docker exec -it backend tail -f /error.log
```
Send a request now and it will show up in the log.

---

[Reference Material A](https://dev.to/stjamlb/nginx-configuration-tips-for-secure-communication-enabling-mtls-and-checking-client-fingerprint-4jf3)
[Reference Material B](https://blog.devops.dev/handshake-at-first-sight-setting-up-mtls-with-nginx-3b306ec7061d)

