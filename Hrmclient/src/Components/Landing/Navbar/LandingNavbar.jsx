import React from 'react';
import { Link } from 'react-router-dom';
import './LandingNavbar.css'
 function LandingNavbar(){
    return(
        <>

        <div className="navbar">
    <ul className="link">
      <li>
        <a href="">Home</a>
      </li>
      <li>
        <a href="">About</a>
      </li>
      <li>
        <a href="">Services</a>
      </li>
      <li>
        <a href="">Contact</a>
      </li>
    </ul>
    <a href="#" className="action-btn">
    Get Started
  </a>
  </div>
  <div className='mainbtn'>
  <Link to={"/login"} className='loginbtn'>
    Login
  </Link>
  </div>
  </>
    )
}
export default LandingNavbar;