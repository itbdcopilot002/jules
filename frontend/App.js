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
    <div style={{padding: '20px'}}>
      <h1>Resource Management Portal</h1>
      <h2>Add Team Member</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
      <button onClick={addTeamMember}>Add</button>
      <ul>
        {teamMembers.map(tm => (
          <li key={tm.id}>{tm.name} - {tm.role}</li>
        ))}
      </ul>
      <h2>Add Project</h2>
      <input placeholder="Project Name" value={projectName} onChange={e => setProjectName(e.target.value)} />
      <input placeholder="Budget" type="number" value={budget} onChange={e => setBudget(e.target.value)} />
      <button onClick={addProject}>Add Project</button>
      <ul>
        {projects.map(p => (
          <li key={p.id}>{p.name} - ${p.budget}</li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
