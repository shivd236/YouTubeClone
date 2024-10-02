import React, { useEffect, useState } from "react";
import "./navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import YouTubeIcon from "@mui/icons-material/YouTube";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import PersonIcon from '@mui/icons-material/Person';
import { Link , useNavigate, } from "react-router-dom";
import {toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "../Login/login";
import axios from "axios";

const Navbar = ({ setsideNavbarFunc, sideNavbar }) => {

  

  const [userPic, setUserPic] = useState(
    "https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain"
  );
  const [navbarModel, setNavbarModel] = useState(false);
  const navigate = useNavigate();
  const [isLogIn, setIsLogin] = useState(false);

  const [login, setLogin] = useState(false);

  const handleClickModal = () => {
    setNavbarModel((prev) => !prev);
  };

  const sideNavbarFunc = () => {
    setsideNavbarFunc(!sideNavbar);
  };

  const handleProfile = () => {
    let userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
    setTimeout(()=>{
      window.location.reload();
    },700);
    setNavbarModel(false);
  };

  const onclickOfPopOpt = (button) =>{

    setNavbarModel(false);

    if (button === "login") {
      setLogin(true);
    } else {
      localStorage.clear();
      getLogOutFun();
      toast.error('User Successfully LogOut');
      setTimeout(() => {
        navigate('/')
        window.location.reload();
      }, 2000);
    }
  };

  const getLogOutFun = async () => {
    axios.post('http://localhost:8000/auth/logout',{}, { withCredentials : true}).then((res) =>{
      console.log("LogOut");
      
    }).catch((err)=> {
      console.log("logout eerr==> ",err);
      
    })
  }

  const setLoginModal = () => {
    setLogin(false);
  }

  useEffect(() => {
    
    let userProfilePic = localStorage.getItem("userProfilePic");
    setIsLogin(localStorage.getItem("userId") !== null? true : false);
      if (userProfilePic !== null) {
        setUserPic(userProfilePic);
        
      }
  },[])
  
  //----> login nhi hai toh video upload page pe navigate na ho;
const handleNavigateUpl = () => {
  let userId = localStorage.getItem("userId");

  if (userId !== null) {
    navigate(`/${userId}/upload`);
    
  } else {
    alert("Please Login For Video Upload");
  }

}
//----------------------------------------------------------------------------//

  return (
  <>
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbarHamberger" onClick={sideNavbarFunc}>
          <MenuIcon sx={{ color: "white" }} />
        </div>
        <Link to={"/"} className="navbar_youtubeImg">
          <div className="whitediv"></div>

          <YouTubeIcon
            sx={{ fontSize: "34px" }}
            className="navbar_youtubeImage"
          />
          <div className="navbar_utubeTitle">YouTube</div>
        </Link>
      </div>

      <div className="navbar-middle">
        <div className="navbar_searchBox">
          <input
            type="text"
            placeholder="Search"
            className="navbar_searchBoxInput"
          />
          <div className="navbar_searchIconBox">
            <SearchIcon sx={{ fontSize: "28px", color: "white" }} />{" "}
          </div>
        </div>

        <div className="navbar_mike">
          <KeyboardVoiceIcon sx={{ color: "white" }} />
        </div>
      </div>

      <div className="navbar-right">

        <div onClick={handleNavigateUpl} >
        <VideoCallIcon
          sx={{ color: "white", fontSize: "30px", cursor: "pointer" }}
        />
        </div>

        <NotificationsIcon
          sx={{ color: "white", fontSize: "28px", cursor: "pointer" }}
        />
        <img
          onClick={handleClickModal}
          src={userPic}
          className="nvabar-right-logo"
          alt="Logo"
        />

        {navbarModel && (

          <div className="navbar-modal">

           {isLogIn &&  <div className="navbar-option-modal" onClick={handleProfile}>Profile </div> }

          { isLogIn && <div className="navbar-option-modal" onClick={()=> onclickOfPopOpt("logout")}>Logout </div> }

          { !isLogIn && <div className="navbar-option-modal" onClick={()=> onclickOfPopOpt("login")}>Login </div> }

          </div>
        )}
      </div>

     {
       login && <Login setLoginModal={setLoginModal} />
     }

    </div>
    <ToastContainer />
</>
  );
};

export default Navbar;
