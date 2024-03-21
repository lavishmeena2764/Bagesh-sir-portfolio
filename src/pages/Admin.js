import React, { useState } from 'react';
import axios from 'axios';
import Main from '../layouts/Main';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verified, setVerified] = useState(false);
  const [activeTab, setActiveTab] = useState('team');
  const [teamData, setTeamData] = useState({
    img: null,
    name: '',
    education: '',
    linkedIn: '',
    github: '',
  });
  const [alumniData, setAlumniData] = useState({
    img: null,
    name: '',
    project: '',
    linkedIn: '',
    projectLink: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', { email, password });
      if (response.data.status === 'OK') {
        localStorage.setItem('token', response.data.data.secret);
        setVerified(true);
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleTeamSubmit = async () => {
    const formData = new FormData();
    formData.append('img', teamData.img);
    formData.append('name', teamData.name);
    formData.append('education', teamData.education);
    formData.append('linkedIn', teamData.linkedIn);
    formData.append('github', teamData.github);

    try {
        const headers = {
            'Content-Type' : 'multipart/form-data'
        }
      const response = await axios.post('http://localhost:4000/team/upload', formData,  {headers});
      alert("Data added successfully!!");
      
    } catch (error) {
      console.error('Error uploading team data:', error);
    }
  };
  const switchToTab = (tab) => {
    setActiveTab(tab);
  };
  const handleAlumniSubmit = async () => {
    const formData = new FormData();
    formData.append('img', alumniData.img);
    formData.append('name', alumniData.name);
    formData.append('project', alumniData.project);
    formData.append('linkedIn', alumniData.linkedIn);
    formData.append('projectLink', alumniData.projectLink);

    try {const headers = {
        'Content-Type' : 'multipart/form-data'
    }
      const response = await axios.post('http://localhost:4000/alumni/upload', formData, {headers});
      alert("Data added Successfully!!");
    } catch (error) {
      console.error('Error uploading alumni data:', error);
    }
  };

  return (
    <Main
      title="Login"
      description="Login to access restricted content."
    >
      <article className="post" id="Login">
        <header>
          <div className="title">
            <h2>Admin</h2>
          </div>
        </header>
        {verified ? (
          <div>
            <p>Login Successful! You can access the restricted content now.</p>
            <div>
              <div style={{display:"flex", justifyContent:"space-evenly"}}>
                <button
                
                  onClick={() => switchToTab('team')}
                  className={activeTab === 'team' ? 'active' : ''}
                  style={{ marginBottom: "50px"}}
                >
                  Upload Team Data
                </button>
                <button
                
                  onClick={() => switchToTab('alumni')}
                  className={activeTab === 'alumni' ? 'active' : ''}
                  style={{ marginBottom: "50px"}}
                >
                  Upload Alumni Data
                </button>
              </div>
              {activeTab === 'team' && (
                <div style={{width:"50%", alignSelf:"center",marginLeft:"auto", marginRight:"auto",display:"grid", alignItems:"center"}}>
                   <h3 style={{marginLeft:"auto", marginRight:"auto", textAlign:"center"}}>Upload Team Data</h3>
                   <input
                   style={{marginLeft:"auto", marginRight:"auto"}}
                     type="file"
                     onChange={(e) => setTeamData({ ...teamData, img: e.target.files[0] })}
                   />
                   <input
                     type="text"
                     placeholder="Name"
                     value={teamData.name}
                     onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
                   />
                   <input
                     type="text"
                     placeholder="Education"
                     value={teamData.education}
                     onChange={(e) => setTeamData({ ...teamData, education: e.target.value })}
                   />
                   <input
                     type="text"
                     placeholder="LinkedIn"
                     value={teamData.linkedIn}
                     onChange={(e) => setTeamData({ ...teamData, linkedIn: e.target.value })}
                   />
                   <input
                     type="text"
                     placeholder="GitHub"
                     value={teamData.github}
                     onChange={(e) => setTeamData({ ...teamData, github: e.target.value })}
                   />
                   <button  onClick={handleTeamSubmit}>Upload Team Data</button>
                 </div>
              )}
              {activeTab === 'alumni' && (
                <div style={{width:"50%", alignSelf:"center",marginLeft:"auto", marginRight:"auto",display:"grid", alignItems:"center"}}>
                  <h3 style={{marginLeft:"auto", marginRight:"auto", textAlign:"center"}}>Upload Alumni Data</h3>
                  <input
                   style={{marginLeft:"auto", marginRight:"auto"}}
                    type="file"
                    onChange={(e) => setAlumniData({ ...alumniData, img: e.target.files[0] })}
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    value={alumniData.name}
                    onChange={(e) => setAlumniData({ ...alumniData, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Project"
                    value={alumniData.project}
                    onChange={(e) => setAlumniData({ ...alumniData, project: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="LinkedIn"
                    value={alumniData.linkedIn}
                    onChange={(e) => setAlumniData({ ...alumniData, linkedIn: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Project Link"
                    value={alumniData.projectLink}
                    onChange={(e) => setAlumniData({ ...alumniData, projectLink: e.target.value })}
                  />
                  <button  onClick={handleAlumniSubmit}>Upload Alumni Data</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6 col-12-xsmall" style={{ width: '50%' }}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div><br /><br />
              <div className="col-6 col-12-xsmall" style={{ width: '50%' }}>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div><br /><br />
              <div className="col-12" style={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
                <button  className="primary">Login</button>
              </div>
            </div>
          </form>
        )}
      </article>
    </Main>
  );
};

export default Login;
