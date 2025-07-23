from flask import Flask, request, jsonify
from .models import db, TeamMember, Project, Allocation


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///resource.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        db.create_all()

    @app.route('/team_members', methods=['GET', 'POST'])
    def team_members():
        if request.method == 'POST':
            data = request.json
            tm = TeamMember(name=data['name'], role=data['role'])
            db.session.add(tm)
            db.session.commit()
            return jsonify({'id': tm.id, 'name': tm.name, 'role': tm.role}), 201
        else:
            members = TeamMember.query.all()
            return jsonify([{'id': m.id, 'name': m.name, 'role': m.role} for m in members])

    @app.route('/projects', methods=['GET', 'POST'])
    def projects():
        if request.method == 'POST':
            data = request.json
            project = Project(name=data['name'], budget=data['budget'])
            db.session.add(project)
            db.session.commit()
            return jsonify({'id': project.id, 'name': project.name, 'budget': project.budget}), 201
        else:
            projects = Project.query.all()
            return jsonify([{'id': p.id, 'name': p.name, 'budget': p.budget} for p in projects])

    @app.route('/allocations', methods=['GET', 'POST'])
    def allocations():
        if request.method == 'POST':
            data = request.json
            allocation = Allocation(team_member_id=data['team_member_id'], project_id=data['project_id'], hours_allocated=data['hours_allocated'])
            db.session.add(allocation)
            db.session.commit()
            return jsonify({'id': allocation.id}), 201
        else:
            allocs = Allocation.query.all()
            result = []
            for a in allocs:
                result.append({'id': a.id, 'team_member': a.team_member.name, 'project': a.project.name, 'hours_allocated': a.hours_allocated})
            return jsonify(result)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
