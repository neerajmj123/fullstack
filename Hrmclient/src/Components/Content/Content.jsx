import React, { useEffect, useState } from 'react';
import './Content.css';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

function Content(){

  
  // const [name, setName] = useState('');
  // const [nameError,setNameError]=useState('');
  // const [age, setAge] = useState('');
  // const [ageError,setAgeError]=useState('')
  // const [email,setEmail] = useState('');
  // const [emailError,setEmailError]=useState('');
  // // const [password,setPassword]=useState('');
  // // const [passwordError,setPasswordError]=useState('');
  // const [phone_no, setPhone_no] = useState('');
  // const [phone_noError,setPhone_noError] =useState('');
  // const [pincode, setPincode] = useState('');
  // const [pincodeError,setPincodeError]=useState('')
  const [token,setToken]=useState('');
  const [generatedPassword,setGeneratedPassword] = useState('');


 useEffect(()=>{
  const storedToken = localStorage.getItem('token')
  if(storedToken){
    setToken(storedToken)
  }
 },[]);


  // const nameValidate =(value)=>{
  //   const name_val=/^[A-Za-z]{6}$/i;
  //   if(!value){
  //     setNameError("Enter Name")
  //   }else if(!name_val.test(value)){
  //     setNameError('Check your name')
  //   }else{
  //     setNameError('')
  //   }
  // }
  // const ageValidate =(value)=>{
  //   const age_val= /^(0?[1-9]|[1-9][0-9]|[1][0-1][0-9]|120)$/;
  //   if(!value){
  //     setAgeError("Enter Age")
  //   }else if(!age_val.test(value)){
  //     setNameError('Invalid Age')
  //   }else{
  //     setAgeError('')
  //   }
  // }

  // const emailValidate=(value)=>{
  //   const email_val =/^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;
  //   if(!value){
  //     setEmailError("Enter Your Email")
  //   }else if(!email_val.test(value)){
  //     setEmailError("Invalid Email")
  //   }else{
  //     setEmailError("")
  //   }
  // }
  // // const passwordValidate=(value)=>{
  // //   const password_val=/^[a-z0-9_@\.]{8,}$/;
    
  // //   if(!value){
  // //     setPasswordError("Enter Your Password")
  // //   }else if(!password_val.test(value)){
  // //     setPasswordError("Password must be 8 Characters")
  // //   }else{
  // //     setPasswordError("")
  // //   }
  // // }
  // const phonenoValidate=(value)=>{
  //   const phoneno_val= /^(\+\d{1,3}[- ]?)?\d{10}$/;
  //   if(!value){
  //     setPhone_noError("Enter Your Phone Number")
  //   }else if(!phoneno_val.test(value)){
  //     setPhone_noError("Invalid phone number")
  //   }else{
  //     setPhone_noError("")
  //   }
  // }
  // const pincodeValidate=(value)=>{
  //   const pincode_val = /^[0-9]{6}$/;

  //   if(!value){
  //     setPincodeError("Enter Your Pincode")
  //   }else if(!pincode_val.test(value)){
  //     setPincodeError("Invalid pincode")
  //   }else{
  //     setPincodeError("")
  //   }
  // }

  const handleSubmit =async(values,{setSubmitting}) => {
    try {
      // const data = {name,age,email,phone_no,pincode};
      // const json_data = JSON.stringify(data);
      // console.log("jsondata",json_data)

      // console.log("token",token)
    
      const response = await axios.post('http://localhost:3100/createUser',values,{
      
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type':'application/json',
        },
      })
      const responseData =  response.data;
      console.log(responseData)
      if(responseData.errors){
        // if(responseData.errors.name||responseData.errors.name){
        //   setNameError(responseData.errors.name || responseData.errors.name)
        // }
        // if(responseData.errors.age||responseData.errors.age){
        //   setAgeError(responseData.errors.age || responseData.errors.age)
        // }
        // if(responseData.errors.email||responseData.errors.email){
        //   setEmailError(responseData.errors.email || responseData.errors.email)
        // }
        // // if(responseData.errors.password||responseData.errors.password){
        // //   setPasswordError(responseData.errors.password || responseData.errors.password)
        // // }
        // if(responseData.errors.phone_no||responseData.errors.phone_no){
        //   setPhone_noError(responseData.errors.phone_no || responseData.errors.phone_no)
        // }
        // if(responseData.errors.pincode||responseData.errors.pincode){
        //   setPincodeError(responseData.errors.pincode || responseData.errors.pincode)
        // }
      }else if(responseData.success){
        const passwordFromServer = response.data.password;
        setGeneratedPassword(passwordFromServer);
        Swal .fire({
          icon : "success",
          title : "success",
          text : responseData.message
        })
      }
  
    } catch (error) {
      
      Swal.fire({
        icon : "error",
        title : "error",
        text: error.response ? error.response.data.message : 'Unexpected error occurred.',
      });
    }finally{
      setSubmitting(false)
    }
  };

  return (
    <div className="form-container">
      <h2>Add User Information</h2>

      <Formik
      initialValues={{
        name:'',
        age:'',
        email:'',
        phone_no:'',
        pincode:'',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Name is required').matches(/^[A-Za-z]{6}$/, 'Invalid Name'),
          age: Yup.number().required('Age is required').positive('Age must be a positive number').integer('Age must be an integer').max(120, 'Invalid Age'),
          email: Yup.string().email('Invalid email address').required('Email is required'),
          phone_no: Yup.string().required('Phone Number is required').matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid Phone Number'),
          pincode: Yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Invalid Pincode'),
      })}
      onSubmit={handleSubmit}
      >
      <Form  className="form">
        <div className="form-group">
        <Field type="text" id="name" name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" className="error" />
        </div>
        <div className="form-group">
            <Field type="text" id="age" name="age" placeholder="Age" />
            <ErrorMessage name="age" component="div" className="error" />
          </div>
          <div className="form-group">
            <Field type="email" id="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-group">
            <Field type="tel" id="phone_no" name="phone_no" placeholder="Phone Number" />
            <ErrorMessage name="phone_no" component="div" className="error" />
          </div>
          <div className="form-group">
            <Field type="text" id="pincode" name="pincode" placeholder="Pincode" />
            <ErrorMessage name="pincode" component="div" className="error" />
          </div>
        <button type="submit">Submit</button>
      </Form>
      </Formik>
      {generatedPassword && <p>Passwor_generated :{generatedPassword}</p>}
    </div>
  );
};

export default Content;
