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
const Login = () => {
 const [showPassword, setShowPassword] = useState(false)
 const { enqueueSnackbar } = useSnackbar()
 const loginUser = useAuthStore(state => state.loginUser)
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


 async function handleSubmit(e) {
  e.preventDefault();

  const myForm = new FormData();

  myForm.append('email', formdata.email);
  myForm.append('password', formdata.password);

  try {
   const { data } = await axios.post(`${baseURL}/api/auth/login`, myForm, {
    headers: {
     'Content-type': 'multipart/form-data',
    },
    withCredentials: true,
   });
   if (data.success) {
    loginUser(data.user)
    enqueueSnackbar(`Welcome back ${data.user.username}`, { variant: 'success' })
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
  <div className='register' style={{margin:'4rem'}}>
   <h1>Sign In</h1>
   <form action="" onSubmit={handleSubmit}>
    <div className='input-field'>
     <InputLabel>Email</InputLabel>
     <TextField onChange={handleChange} className='input-field-input' type='email' name='email' />
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

    <Button variant='contained' className='submit-btn' type="submit">Submit</Button>
   </form>
  </div>
 )
}

export default Login