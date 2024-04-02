import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import "./AdminNavbar.css"
import image from './images/icons8-admin-64.png'
function AdminNavbar() {
  return (
    <>
      <nav>
        <div className="intro ">
          <div className="content">
            <img src={image} alt="" />
            <h3>hi,<span>admin</span></h3>
            <h1>Welcome</h1>
            <p>this is an Admin page</p>
            <Link to={"/content"} className='addbtn'>
              Add Employee
            </Link>
            <Link to={"/list"} className='addbtn'>
              View Employee
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
export default AdminNavbar;