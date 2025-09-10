import requests


URL = "http://localhost:5000/ping"
TIMEOUT = 10 # seconds


if __name__ == "__main__":
    response = requests.get(URL, timeout=TIMEOUT, verify=False)
    if not response.ok:
        exit(1)
    if not response.json().get("status") == "OK":
        exit(1)

    exit(0)

