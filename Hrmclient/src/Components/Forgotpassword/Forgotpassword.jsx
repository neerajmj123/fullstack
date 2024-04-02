import React, { useState } from 'react';
import axios from 'axios';
import './Forgotpassword.css';
import Swal from 'sweetalert2'

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3100/forgetpassword', { email });
      setMessage(response.data.message);
      if(response.status === 200){
        Swal.fire({
          icon : 'success',
          title : 'Success',
          text : "Password reset Link has sent to your email"
        })
      }else{
        Swal.fire({
          icon : 'error',
          title : 'Error',
          text : "failed to send reset link"
        })
      }
    } catch (error) {
      console.error('Erorr',error);
      Swal.fire({
        icon:"error",
        title:'Error',
        text : 'Failed to send reset Link '
      })
    }
  };

  return (
    <div className='wrapper'>
      <div className='forgotpwd'>
      <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Email'
            value={email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      {message && <p>{message}</p>}
      </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
