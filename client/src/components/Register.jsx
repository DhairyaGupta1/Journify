import React, { useState, useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Register = ({ setIsLogin }) => {
  const { setUsername, setEmail, setPassword, usertype, setUsertype, register, setHomeBranch } = useContext(GeneralContext);

  const [username, setLocalUsername] = useState('');
  const [password, setLocalPassword] = useState('');
  const [usernameSuggestions, setUsernameSuggestions] = useState([]);
  const [passwordSuggestions, setPasswordSuggestions] = useState([]);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const generateUsernameSuggestions = (input) => {
    if (input.length === 0) return [];
    const suggestions = [
      `${input}123`,
      `${input}_dev`,
      `${input}_official`,
      `theReal${input}`,
      `${input}2024`,
    ];
    return shuffleArray(suggestions).slice(0, 3);
  };

  const generatePasswordSuggestions = (input) => {
    if (input.length < 8) return ["Password length should be minimum 8 characters"];
    const suggestions = [
      `${input}@123`,
      `${input}!2024`,
      `${input}#secure`,
      `${input}$safe`,
      `${input}_2024!`,
    ];
    return shuffleArray(suggestions).slice(0, 0);
  };

  const handleUsernameChange = (e) => {
    const input = e.target.value;
    setLocalUsername(input);
    setUsernameSuggestions(generateUsernameSuggestions(input));
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setLocalPassword(input);
    setPasswordSuggestions(generatePasswordSuggestions(input));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await register();
  };

  return (
    <form style={{minWidth: '60vh', maxWidth: '400px', margin: 'auto' }} onSubmit={handleRegister}>
      <h2>Register Here!</h2>

      <div style={{ marginBottom: '30px', position: 'relative' }}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange} 
          style={{ width: '100%', padding: '10px' }}
        />
        {usernameSuggestions.length > 0 && (
          <div style={{ fontSize: '0.9em', color: '#0059b8', marginTop: '5px', paddingLeft: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Suggestions: {usernameSuggestions.join(', ')}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <input 
          type="email" 
          className="form-control" 
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)} 
          style={{ width: '100%', padding: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '30px', position: 'relative' }}>
        <input 
          type="password" 
          className="form-control" 
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange} 
          style={{ width: '100%', padding: '10px' }}
        />
        {passwordSuggestions.length > 0 && (
          <div style={{ fontSize: '0.9em', color: '#FF0000', marginTop: '5px', paddingLeft: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
             {passwordSuggestions.join(', ')}
          </div>
        )}
      </div>

      <select 
        className="form-select form-select-lg mb-3" 
        aria-label="User type selection"
        onChange={(e) => setUsertype(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '30px', fontSize: '1.1rem'}}
      >
        <option value="">User type</option>
        <option value="admin">Admin</option>
        <option value="customer">Customer</option>
        <option value="flight-operator">Flight Operator</option>
      </select>

      <button className="btn btn-primary" style={{ width: '100%', padding: '10px' }} type="submit">Sign up</button>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Already registered? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setIsLogin(true)}>Login</span>
      </p>
    </form>
  );
};

export default Register;
