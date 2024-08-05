import React, { useState } from 'react';
import './App.css';
import { createClient } from "@supabase/supabase-js";
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [rlsStatus, setRlsStatus] = useState(null);
  const [pitrStatus, setPitrStatus] = useState(null);
  const [error, setError] = useState(null);

  // Initialize Supabase client with environment variables
  const supabase = createClient(
    "https://hoqfneswnzcwwgzpkrbk.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvcWZuZXN3bnpjd3dnenBrcmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3NzgzMzksImV4cCI6MjAzODM1NDMzOX0.kqwuakX-Mfj0hPdZLA4Rwam2iDbPSIIRrdgK1GC6nIg"
  );

  async function fetchUsers() {
    try {
      const { data, error } = await supabase.from("users").select();
      
      if (error) {
        throw error;
      }
      
      setUsers(data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to fetch user details');
      setUsers([]); // Clear user details on error
    }
  }

  async function checkRls() {
    try {
      const response = await axios.get('http://localhost:5002/check-rls');
      setRlsStatus(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch RLS status');
      setRlsStatus([]);
    }
  }

  const checkPITR = async () => {
    try {
      const response = await axios.get('http://localhost:5002/check-pitr');
      setPitrStatus(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch PITR status');
      setPitrStatus(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Compliance Dashboard</h1>
        
        <button onClick={fetchUsers}>Run Compliance Checks</button>
        {users.length > 0 && (
          <div>
            <h2>User Details</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div>
        )}

        <button onClick={checkRls}>Check RLS Status</button>
        {rlsStatus && (
          <div>
            <h2>RLS Status</h2>
            <ul>
            <pre>{JSON.stringify(rlsStatus, null, 2)}</pre>
            </ul>
          </div>
        )}

        <button onClick={checkPITR}>Check PITR Status</button>
        {pitrStatus && (
          <div>
            <h2>PITR Status</h2>
            <pre>{JSON.stringify(pitrStatus, null, 2)}</pre>
          </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
    </div>
  );
}

export default App;
