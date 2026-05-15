import requests

def test_child_immunization():
    base_url = "http://localhost:8000"
    
    # Register/Login
    email = "test_immunization@example.com"
    password = "Password123!"
    
    res = requests.post(f"{base_url}/auth/register", json={
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
    
    # Create child
    res = requests.post(f"{base_url}/children", json={
        "name": "Test Child",
        "birth_date": "2024-01-01",
        "gender": "male"
    }, headers=headers)
    
    if res.status_code != 201:
        print("Create child failed:", res.json())
        return
        
    child_id = res.json()["id"]
    print("Child ID:", child_id)
    
    # Create immunization log
    res = requests.post(f"{base_url}/children/{child_id}/immunization", json={
        "vaccine_id": 1,
        "scheduled_date": "2024-02-01"
    }, headers=headers)
    
    print("Create Immunization status:", res.status_code)
    print("Create Immunization response:", res.json())

    if res.status_code == 201:
        log_id = res.json()["id"]
        # Update immunization log
        res = requests.put(f"{base_url}/immunization/{log_id}", json={
            "status": "completed",
            "completion_date": "2024-02-02"
        }, headers=headers)
        
        print("Update Immunization status:", res.status_code)
        print("Update Immunization response:", res.json())

if __name__ == "__main__":
    test_child_immunization()
