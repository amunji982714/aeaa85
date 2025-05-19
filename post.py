import requests

# Replace this with your actual email address
email = "akashmunji26@gmail.com"

url = "https://apply-to-avantos.dev-sandbox.workload.avantos-ai.net"

headers = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
}

payload = {
    "email": email
}

response = requests.post(url, json=payload, headers=headers)

# Print the response (this might be the coding challenge instructions or a link)
print("Status Code:", response.status_code)
print("Response:", response.text)