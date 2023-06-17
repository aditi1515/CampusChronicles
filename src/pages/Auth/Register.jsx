import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Avatar, Button, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react';
import { registerUser } from '../../reducers/user.reducer';

import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/user.store';
import { baseURL } from '../../utils/makeRequest';
import './auth.scss';
const Register = () => {
 const [showPassword, setShowPassword] = useState(false)
 const { enqueueSnackbar } = useSnackbar()
 const registerUser = useAuthStore(state => state.registerUser)
 const navigate = useNavigate()
 const handleClickShowPassword = () => setShowPassword((show) => !show);
 const [formdata, setFormData] = useState({
 });



 function handleChange(e) {
  setFormData({
   ...formdata,
   [e.target.name]: e.target.value
  })
 }


 function handleImageSelection(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onloadend = () => {
   setFormData({
    ...formdata, 'avatar': reader.result
    , 'image': file
   })
  }
 }



 async function handleSubmit(e) {
  e.preventDefault();

  const myForm = new FormData();

  myForm.append('username', formdata.username);
  myForm.append('email', formdata.email);
  myForm.append('password', formdata.password);
  myForm.append('profession', formdata.profession);
  myForm.append('file', formdata.image);

  try {
   const { data } = await axios.post(`${baseURL}/api/auth/register`, myForm, {
    headers: {
     'Content-type': 'multipart/form-data',
    },
    withCredentials: true,
   });
   if (data.success) {
    registerUser(data)
    enqueueSnackbar(`Welcome ${data.user.username}`, { variant: 'success' })
    navigate('/')
   }
   else {
    enqueueSnackbar(data.message, { variant: 'error' })
   }

  } catch (error) {
   console.log(error);
  }
 }
 return (
  <div className='register'>
   <h1>Sign Up</h1>
   <form action="" onSubmit={handleSubmit}>
    <Avatar src={formdata.avatar} alt="" className='profile-img' />
    <div className='input-field'>
     <InputLabel>Name</InputLabel>
     <TextField onChange={handleChange} className='input-field-input' name='username' type='text' />
    </div>
    <div className='input-field'>
     <InputLabel>Email</InputLabel>
     <TextField onChange={handleChange} className='input-field-input' type='email' name='email' />
    </div>
    <div className='input-field'>
     <InputLabel>Profession</InputLabel>
     <TextField onChange={handleChange} className='input-field-input' name='profession' type='text' />
    </div>
    <div className='input-field'>
     <InputLabel htmlFor="password">Password</InputLabel>
     <OutlinedInput
      onChange={handleChange}
      className='input-field-input'
      id='password'
      name='password'
      type={showPassword ? 'password' : 'text'}
      endAdornment={
       <InputAdornment position="end">
        <IconButton
         aria-label="toggle password visibility"
         onClick={handleClickShowPassword}
        >
         {!showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
       </InputAdornment>
      }
     />
    </div>
    <div className="input-field">
     <InputLabel htmlFor="">Choose Profile Picture</InputLabel>
     <OutlinedInput
      onChange={handleImageSelection}
      className='input-field-input'
      type='file'
     />

    </div>
    <Button variant='contained' className='submit-btn' type="submit">Submit</Button>
   </form>
  </div>
 )
}

export default Register