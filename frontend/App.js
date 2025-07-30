function App() {
  const [teamMembers, setTeamMembers] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState('');
  const [projectName, setProjectName] = React.useState('');
  const [budget, setBudget] = React.useState('');

  React.useEffect(() => {
    fetch('/team_members')
      .then(res => res.json())
      .then(setTeamMembers);
    fetch('/projects')
      .then(res => res.json())
      .then(setProjects);
  }, []);

  const addTeamMember = () => {
    fetch('/team_members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role })
    }).then(res => res.json())
      .then(tm => setTeamMembers([...teamMembers, tm]));
  };

  const addProject = () => {
    fetch('/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: projectName, budget: parseFloat(budget) })
    }).then(res => res.json())
      .then(p => setProjects([...projects, p]));
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Resource Management Portal</h1>
      <div className="row mb-5">
        <div className="col-md-6">
          <h2>Add Team Member</h2>
          <div className="mb-3">
            <input className="form-control mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input className="form-control mb-2" placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
            <button className="btn btn-primary" onClick={addTeamMember}>Add</button>
          </div>
          <ul className="list-group">
            {teamMembers.map(tm => (
              <li className="list-group-item" key={tm.id}>{tm.name} - {tm.role}</li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h2>Add Project</h2>
          <div className="mb-3">
            <input className="form-control mb-2" placeholder="Project Name" value={projectName} onChange={e => setProjectName(e.target.value)} />
            <input className="form-control mb-2" placeholder="Budget" type="number" value={budget} onChange={e => setBudget(e.target.value)} />
            <button className="btn btn-primary" onClick={addProject}>Add Project</button>
          </div>
          <ul className="list-group">
            {projects.map(p => (
              <li className="list-group-item" key={p.id}>{p.name} - ${p.budget}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
