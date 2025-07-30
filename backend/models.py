from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TeamMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    role = db.Column(db.String(80), nullable=False)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    budget = db.Column(db.Float, nullable=False)

class Allocation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team_member_id = db.Column(db.Integer, db.ForeignKey('team_member.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    hours_allocated = db.Column(db.Float, nullable=False)

    team_member = db.relationship('TeamMember', backref='allocations')
    project = db.relationship('Project', backref='allocations')
