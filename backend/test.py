import requests

response = requests.post(
    "http://127.0.0.1:5000/generate-pitch",
    json={"repo_link": "https://github.com/psf/requests"}   # update with your repo link
)

print(response.json())