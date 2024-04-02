import React, { useState } from 'react';
import axios from 'axios';
import './Changepassword.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') setCurrentPassword(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch('http://localhost:3100/changePassword', 
      {
        currentPassword,
        newPassword,
      },
      {
        headers :{
          Authorization :`Bearer ${token}`
        }
      }
      );

      Swal.fire({
        icon:"success",
        title:'Success',
        text:response.data.message
      }).then(()=>{
        navigate('/login')
      })
    } catch (error) {
      console.error('Error:',error);
      setMessage("failed to chnage password")
      }
    };
  return (
    <div className='wrapper'>
      <div className='resetform'>
      <form onSubmit={handleSubmit}>
      <h2>Change Password</h2>
        <div>
          <input
            type="password"
            id="currentPassword"
            placeholder='Current Password'
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            id="newPassword"
            placeholder='New Password'
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            id="confirmPassword"
            placeholder='ConfirmPassword'
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Change Password</button>
        <div className={message ? (message.includes('Error') ? 'error' : 'success') : ''}>
      {message && <p>{message}</p>}
      </div>
      </form>
    </div>
    </div>
  );
}

export default ChangePassword;
