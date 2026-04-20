import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    
    with app.test_client() as client:
        yield client

def test_health_check(client):
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json['status'] == 'healthy'

def test_test_endpoint(client):
    response = client.get('/api/test')
    assert response.status_code == 200
    assert response.json['success'] == True

def test_echo_endpoint(client):
    test_data = {'message': 'Hello World'}
    response = client.post('/api/echo', json=test_data)
    assert response.status_code == 200
    assert response.json['echo'] == test_data

def test_not_found(client):
    response = client.get('/nonexistent')
    assert response.status_code == 404
