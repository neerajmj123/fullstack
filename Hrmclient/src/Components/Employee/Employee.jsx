import React, { useEffect } from "react";
import './Employee.css';
import { useNavigate ,Link } from "react-router-dom";
import Swal from "sweetalert2";
function Employee() {
  const navigate = useNavigate();
  const isTokenPresent =()=>{
    const token = localStorage.getItem('token')
    return !! token; 
  };
  useEffect(()=>{
    if(!isTokenPresent()){
      Swal.fire({
        title:'Error',
        text :" You need to login to acces the user area",
        icon :'error',
        button :"Login",
      }).then(()=>{
        navigate('/login');
      });
    }
  },[navigate]);
return (
    <>
    <div className="intro ">
          <div className="content">
            {/* <img src={image} alt="" /> */}
            <h3>hi,<span>Employee</span></h3>
            <h1>Welcome</h1>
            <p>this is an Admin page</p>
            <Link to={""} className='addbtn'>
              Edit Profile
            </Link>
            <Link to={""} className='addbtn'>
              View Employee
            </Link>
          </div>
        </div>
    </>
)
}
export default Employee;