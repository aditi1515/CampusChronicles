import { Button, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import ReactSelect from 'react-select';
import './CreateBlog.scss';
import axios from 'axios';
import { baseURL } from '../../utils/makeRequest';
const CreateBlog = () => {
 const [title, setTitle] = useState('');
 const [shortDescription, setShortDescription] = useState('');
 const [description, setDescription] = useState('');
 const { enqueueSnackbar } = useSnackbar()
 const navigate = useNavigate()
 const [formdata, setFormData] = useState({});
 const [category, setCategory] = useState(null);
 const categoryOptions = [
  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
  { value: 'Software Development', label: 'Software Development' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'Internet of Things', label: 'Internet of Things' },
  { value: 'Machine Learning', label: 'Machine Learning' },
  { value: 'Robotics', label: 'Robotics' },
  { value: 'Virtual Reality', label: 'Virtual Reality' },
  { value: 'Augmented Reality', label: 'Augmented Reality' },
  { value: 'Mobile App Development', label: 'Mobile App Development' },
  { value: 'Network Security', label: 'Network Security' },
  { value: 'Cloud Computing', label: 'Cloud Computing' },
  { value: 'Blockchain Technology', label: 'Blockchain Technology' },
  { value: 'UI/UX Design', label: 'UI/UX Design' }
 ]

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
    ...formdata, 'preview': reader.result
    , 'coverImage': file
   })
  }
 }
 
 async function handleSubmit(e) {
  e.preventDefault();

  const myForm = new FormData();

  myForm.append('title', formdata.title);
  myForm.append('shortDescription', formdata.shortDescription);
  myForm.append('description', description);
  myForm.append('category', category);
  myForm.append('file', formdata.coverImage);

  try {
   const { data } = await axios.post(`${baseURL}/api/blog/create`, myForm, {
    headers: { 
     'Content-type': 'multipart/form-data',
    },
    withCredentials: true,
   });
   if (data.success) {
    enqueueSnackbar(`Blog Created Successfully`, { variant: 'success' })
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
  <div className='create-blog' >
   <h1>Create Blog</h1>
   <form action="" onSubmit={handleSubmit}>
    <div>
     <span>Title</span>
     <TextField onChange={handleChange} name='title' className='text-field' />
    </div>
    <div>
     <span>Short Description</span>
     <TextField onChange={handleChange} name='shortDescription' className='text-field' />
    </div>
    <div>
     <span>Choose Category</span>
     <ReactSelect className='category' options={categoryOptions} style={{ backgroundColor: "pink" }} onChange={e => setCategory(e.value)} />
    </div>
    <div>
     <span>Description</span>
     <ReactQuill className='description' theme="snow" value={description} onChange={setDescription} />
    </div>
    <div>
     <span>Cover Image</span>
     <TextField onChange={handleImageSelection} className='text-field' type='file' />
    </div>
    <Button variant='contained' className='submit-btn' type='submit'>Create</Button>
   </form>
  </div>
 )
}

export default CreateBlog