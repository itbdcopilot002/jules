import json
from backend.app import create_app, db


def setup_app():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.app_context():
        db.create_all()
    return app


def test_team_member_creation():
    app = setup_app()
    client = app.test_client()
    response = client.post('/team_members', json={'name': 'Alice', 'role': 'Developer'})
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['name'] == 'Alice'


def test_get_projects_empty():
    app = setup_app()
    client = app.test_client()
    response = client.get('/projects')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data == []
