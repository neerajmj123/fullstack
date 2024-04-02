import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import './UserDetails.css'
import axios from "axios";
function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/getuser/${userId}`)
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };
    fetchData();
  }, [userId]);

  const ToggleReadonly = () => {
    setReadOnly(prevState => !prevState)
  }
  const handleSubmit = async (values) => {
    try {
      await axios.put(`http://localhost:3100/updateUser/${userId}`, values);
      window.alert("Data updated successfully");
      console.log("Data updated succesfully")
    } catch (error) {
      console.log("error updating user details", error);
    }
  }
  if (!user) {
    return <h1>Loading......</h1>
  }
  return (
    <div className="form-container">
      <Formik
        initialValues={{
          name: user.name || '',
          email: user.email || '',
          phone_no: user.phone_no || '',
          pincode: user.pincode || ''
        }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-group">
              <label htmlFor="Name" className="userlabel">Name</label>
              <Field type="text" id="name" name="name" placeholder='Name' readOnly={readOnly} />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="Email" className="userlabel">Email</label>
              <Field type="email" id="email" name="email" placeholder='Email' readOnly={readOnly} />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="Phone_no" className="userlabel">Phone Number</label>
              <Field type="tel" id="phoneNumber" name="phone_no" placeholder='Phone Number' readOnly={readOnly} />
              <ErrorMessage name="phone_no" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="Pincode" className="userlabel">Pincode</label>
              <Field type="text" id="pincode" name="pincode" placeholder='Pincode' readOnly={readOnly} />
              <ErrorMessage name="pincode" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>

            <button type="button" onClick={ToggleReadonly} className="edit">
              Edit
            </button>


            {/* <form  className="form">
        <div className="form-group">
          <label htmlFor="Name" className="userlabel">Name</label>
          <input type="text"id="name"placeholder='Name' defaultValue={user ? user.name : '' }  readOnly={readOnly} onChange={(e)=>setUser({...user,name:e.target.value})}/>
        </div>
        <div className="form-group">
          <label htmlFor="Email" className="userlabel">Email</label>
          <input type="email"id="email"placeholder='Email' defaultValue={ user ? user.email :'' }  readOnly={readOnly} onChange={(e)=>setUser({...user,email:e.target.value})}/>
        </div>
        <div className="form-group">
          <label htmlFor="Phone_no" className="userlabel">Phone Number</label>
          <input type="tel"id="phoneNumber"placeholder='Phone Number' defaultValue={ user ? user.phone_no : ''} readOnly={readOnly} onChange={(e)=>setUser({...user,phone_no:e.target.value})}/>
        </div>
        <div className="form-group">
          <label htmlFor="Pincode" className="userlabel">Pincode</label>
          <input type="text"id="pincode" placeholder='Pincode' defaultValue={ user ? user.pincode:''}  readOnly={readOnly} onChange={(e)=>setUser({...user,pincode:e.target.value})}/>
        </div> */}

            {/* <Link to="/list"><button type="submit" onClick={handleSubmit}>Submit</button></Link>
      
        <button type="button" onClick={ToggleReadonly} className="edit">Edit</button> */}

          </Form>
          // </div>
        )}
      </Formik>
    </div>
  )
}
export default UserDetails;