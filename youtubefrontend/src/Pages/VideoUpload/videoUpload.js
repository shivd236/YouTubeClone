import React, { useEffect, useState } from 'react'
import './videoUpload.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';

const VideoUpload = () => {
  const [inputField, setInputField] = useState({"title": "", "description": "", "videoLink" : "", "thumbnail": "", "videoType": ""})
  
  const [loader , setLoader] = useState(false);

  const navigate = useNavigate();

  const handleChangeInput = (event , name) => {
    setInputField({
      ...inputField,[name]:event.target.value
    })
  }
  
  const uploadImage = async (e , type) => {
    setLoader(true)
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);

    data.append('upload_preset' , 'youtube_clone');
    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/dobl6txj8/${type}/upload`,data)
      
      const url= response.data.url;
      setLoader(false);

       console.log("Url ==>",url);
      
       let val = type==="image"?"thumbnail":"videoLink";
      setInputField({
        ...inputField,[val]:url
      })
    

    } catch (error) {
      setLoader(false);
      console.log(error);
      
    }
    
  };
  
  console.log("upload video form filed ==> ",inputField);

  useEffect(() => {
    let isLogin = localStorage.getItem('userId');
    if(isLogin === null){
        navigate('/');
    }
  },[])
  
  const handleSubmitFunc = async()=>{

    const token = localStorage.getItem('token'); // Fetch token from localStorage

   setLoader(true);
   try {
    const response =   await axios.post('http://localhost:8000/api/video',inputField, 

      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request headers
        },
    })

    setLoader(false);
    if (response.status === 201) {
        console.log(response);
        
      toast.success(response.data.message);

      setTimeout(()=>{
      navigate('/');
      },2000)
    
      
    }
    
   } catch (error) {

    setLoader(false);
    console.log(error.response.data);
    toast.error(error.response.data.message);
    
    
   }

  };


  return (

    <div className='videoUpload'>

      <div className="uploadBox">
        <div className="uploadVideoTitle">
          <div className='whitedive'></div>
          <YouTubeIcon sx={{fontSize : "54px", color : "red", position : "relative", zIndex : "2" }} />
          Upload Video
        </div>

        <div className="uploadForm">
          <input type="text" value={inputField.title} onChange={(e)=>handleChangeInput(e, "title")} placeholder='Title of Video' className='uploadFormInputs' />
          <input type="text" value={inputField.description}  onChange={(e)=>handleChangeInput(e, "description")} placeholder='Description' className='uploadFormInputs' />
          <input type="text" value={inputField.videoType}  onChange={(e)=>handleChangeInput(e, "videoType")} placeholder='Category' className='uploadFormInputs' />
          <div>Thumbnail <input type='file' accept='image/*'h onChange={(e) => uploadImage(e , "image")} /></div>
          <div>Video <input type='file' accept='video/mp4, video/webm, video/*' onChange={(e) => uploadImage(e , "video")} /></div>
          {
           loader &&    <Box sx={{ display: 'flex' }}>
                          <CircularProgress />
                          </Box>
        }
          
        </div>

      

        <div className="uploadButtons">
          <div className="uploadBtn-form" onClick={handleSubmitFunc}>Upload</div>
          <Link to={'/'} className="uploadBtn-form">Home</Link>
          
        </div>



      </div>

      <ToastContainer />
      
    </div>
  )
}

export default VideoUpload
