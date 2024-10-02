import React, { useState } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';



const Login = ({setLoginModal}) => {
  const [loginField, setLoginFiled] = useState({"userName":"","password":""});
  const [loader, setLoader] = useState(false);

console.log(loginField);

const handleChangeInput = (event, name) => {
       setLoginFiled({
        ...loginField,[name]:event.target.value
       })
} 

const handleLoginFun = async () => {
  setLoader(true);
   await axios.post('http://localhost:8000/auth/signIn',loginField , { withCredentials: true}).then((res) => {
      setLoader(false);
      
      localStorage.setItem('channelName', res.data.user.channelName);
      localStorage.setItem('userName', res.data.user.userName);
      localStorage.setItem('token',res.data.token);
      localStorage.setItem('userId',res.data.user._id);
      localStorage.setItem('userProfilePic',res.data.user.profilePic);
      localStorage.setItem('about',res.data.user.about);
       
      window.location.reload();
      
    }).catch((err) => {
      toast.error("Invalid Credentials");
      console.log(err);
      setLoader(false);
    })
}

  return (
    <div className="login">
      <div className="login_cart">
        <div className="titleCard_login">
          <YouTubeIcon
            sx={{ fontSize: "54px", color: "red" }}
            className="login_youtubeImage"
          />
          Login
        </div>

      <div className="loginCredentials">
        <div className="userNameLogin">
          <input type="text" className="userNameLoginUserName" value={loginField.userName} onChange={(e) =>handleChangeInput(e, "userName")} placeholder="UserName"  />
        </div>

        <div className="userNameLogin">
          <input type="password" className="userNameLoginUserName" value={loginField.password} onChange={(e) =>handleChangeInput(e, "password")} placeholder="Password"  />
        </div>

      </div>

      <div className="login_buttons">
        <div className="login-btn" onClick={handleLoginFun}>Login</div>
        <Link to={'/signup'} onClick={()=>setLoginModal()} className="login-btn">SignUp</Link>
        <div className="login-btn" onClick={()=>setLoginModal()}>Cancel</div>


      </div>

      {
        loader && 
        <Box sx={{ width: '100%' , marginTop : "35px" }}>
           <LinearProgress />
           </Box>
      }


      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
