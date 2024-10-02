import React, { useState } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import axios from 'axios';
import {toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./signUp.css";
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


const SignUp = () => {
  const [uploadedImageUrl , SetuplodedImageUrl] = useState( "https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain")

  const [signUpField, setSignUpField] = useState({"channelName":"","userName":"","password":"","about":"","profilePic":uploadedImageUrl});
  const [progressBar , setProgressBar] = useState(false);
  const navigate = useNavigate();


const handleChangeInput = (event , name) =>{
  setSignUpField({
    ...signUpField,[name]:event.target.value
  })
}
console.log(signUpField);



const uploadIamge = async (e) => {
  const files = e.target.files
  const data = new FormData();
  data.append('file', files[0] )
  
  data.append('upload_preset' , 'youtube_clone');
  try {
    setProgressBar(true);
    const response = await axios.post('https://api.cloudinary.com/v1_1/dobl6txj8/image/upload',data)
    setProgressBar(false);
    const imageUrl = response.data.url;
    SetuplodedImageUrl(imageUrl);

    setSignUpField({
      ...signUpField,"profilePic":imageUrl
    })
    
  } catch (error) {
    console.log(error);
    
  }
  
}

 const handleSignUp = async () => {

  try {
  setProgressBar(true);
  const response = await  axios.post('http://localhost:8000/auth/signUp',signUpField, {withCredentials : true})
      setProgressBar(false);

      if (response.status === 201) {

        toast.success(response.data.message);

        navigate('/');
        
      }
    
  } catch (error) {

    console.log(error.response.data);

    toast.error(error.response.data.message);
    setProgressBar(false);
    
  }

 };

  return (
 
    
    // console.log("siginUp error ==> ",err);
    // toast.error(err)

    // 



    <div className="signUp">
      <div className="signup_card">
        <div className="sginup_title">
          <YouTubeIcon
            sx={{ fontSize: "54px", color: "red" }}
            className="login_youtubeImage"
          />
          SignUp
        </div>
      
      <div className="signUp_Inputs">
        <input type="text"  className="signUp_Inputs_inp" value={signUpField.channelName} onChange={(e)=>handleChangeInput(e, "channelName")} placeholder="Channel Name"  autoComplete="name" />
        <input type="text" className="signUp_Inputs_inp" value={signUpField.userName} onChange={(e)=>handleChangeInput(e, "userName")}  placeholder="User Name"  />
        <input type="password" className="signUp_Inputs_inp" value={signUpField.password} onChange={(e)=>handleChangeInput(e, "password")}  placeholder="Password" />
        <input type="text" className="signUp_Inputs_inp" value={signUpField.about} onChange={(e)=>handleChangeInput(e, "about")}  placeholder="About Your Channel"  />

        <div className="image_upload_signup">
          <input type="file" onChange={(e) => uploadIamge(e)}  />
          <div className="image_upload_signup_div">
            <img src={uploadedImageUrl} alt="" className="image_default_signUp"  />
          </div>
        </div>

        <div className="signUpbtns">
          <div className="signUpbtn" onClick={handleSignUp}>SignUp</div>
          <Link to={'/'} className="signUpbtn">Home</Link>


        </div>

        {
          progressBar && 
          <Box sx={{ width: '100%' }}>
         <LinearProgress />
         </Box>
        }

 

      </div>

      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
