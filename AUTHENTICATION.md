# Accessing Protected Endpoints with mTLS

Who uses passwords these days!

## Creating a client key and certificate signing request (CSR)
On the client device, running this command creates a private key `client.key` and a CSR `client.csr`.
```
openssl req -new -newkey rsa:2048 -nodes -keyout client.key -out client.csr
```
Keep the client's private key safe somewhere for later.

## Create a client certificate
Securely copy the CSR onto the server. Now sign the CSR with the server's public and private key to create a client certificate `client.crt`.
```
openssl x509 -req -days 365 -in client.csr -CA .letsencrypt/live/danieldoescocktails.com/fullchain.pem -CAkey .letsencrypt/live/danieldoescocktails.com/fullchain.pem/privkey.pem -CAcreateserial -out client.crt
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

---

[Reference Material](https://dev.to/stjamlb/nginx-configuration-tips-for-secure-communication-enabling-mtls-and-checking-client-fingerprint-4jf3)

