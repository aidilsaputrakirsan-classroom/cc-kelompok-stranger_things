import requests

def test_add_multiple_immunizations():
    base_url = "http://localhost:8000"
    
    # Login as user
    email = "test_immunization@example.com"
    password = "Password123!"
    
    res = requests.post(f"{base_url}/auth/login", json={
        "email": email,
        "password": password
    })
    
    if res.status_code != 200:
        # Register if not exists
        requests.post(f"{base_url}/auth/register", json={
            "name": "Test Parent",
            "email": email,
            "password": password
        })
        res = requests.post(f"{base_url}/auth/login", json={
            "email": email,
            "password": password
        })
        
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get children
    res = requests.get(f"{base_url}/children", headers=headers)
    children = res.json()
    if not children:
        res = requests.post(f"{base_url}/children", json={
            "name": "Test Child",
            "birth_date": "2024-01-01",
            "gender": "male"
        }, headers=headers)
        child_id = res.json()["id"]
    else:
        child_id = children[0]["id"]
        
    print("Child ID:", child_id)
    
    # Create first immunization log
    res = requests.post(f"{base_url}/children/{child_id}/immunization", json={
        "vaccine_id": 1,
        "scheduled_date": "2024-02-01"
    }, headers=headers)
    print("Create 1 status:", res.status_code, res.json())
    
    # Create second immunization log
    res = requests.post(f"{base_url}/children/{child_id}/immunization", json={
        "vaccine_id": 2,
        "scheduled_date": "2024-03-01"
    }, headers=headers)
    print("Create 2 status:", res.status_code, res.json())

if __name__ == "__main__":
    test_add_multiple_immunizations()
