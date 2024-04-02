import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Resetpassword.css'

function Resetpassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

 useEffect(()=>{
    const urlParms = new URLSearchParams(window.location.search);
    const token = urlParms.get('token')
    setToken(token);
 },[])


  const handleChange =  (e) => {
    const { name, value } = e.target;
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.patch('http://localhost:3100/passwordreset', {password},{
        headers:{
            Authorization:`Bearer${token}`
        },
        
      });
      if(response.status === 200){
      setMessage(response.data.message);
      }else{
        setMessage("Failed to reset password")
      }
    } catch (error) {
      setMessage('Error: Unable to reset password');
      console.error(error);
    }
  };

  return (
    <div className='wrapper'>
      <div className='resetpwd'>
      <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
      </form>
    </div>
    </div>
  );
}

export default Resetpassword;
