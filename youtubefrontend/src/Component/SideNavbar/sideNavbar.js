import React, { useState, useEffect } from "react";
import "./sideNavbar.css";
import HomeIcon from "@mui/icons-material/Home";
import VideocamIcon from "@mui/icons-material/Videocam";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SideNavbar = ({ sideNavbar }) => {
  const [activeOption, setActiveOption] = useState("Home");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveOption("Home");
    } else if (path.startsWith("/user/")) {
      setActiveOption("YourVideos");
    } else {
      setActiveOption(""); // Remove active class for other paths
    }
  }, [location]);

  const handleOptionClick = (option, path) => {
    let userId = localStorage.getItem("userId");

    if (option === "YourVideos") {
      if (userId) {
        navigate(`/user/${userId}`);
      } else {
        // toast.error("Please Login To See Your Videos");
        alert("Please Login To See Your Videos");
        navigate('/')
      }
    } else {
      navigate(path);
    }
    setActiveOption(option);
  };

  return (
    <div className={sideNavbar ? "home-sideNavbar" : "homeSideNavbarHide"}>
      <div className="home_sideNavbarTop">

        {/* Home Option */}
        <Link
          to="/"
          className={`home_sideNavbarTopOption ${activeOption === "Home" ? "active" : ""}`}
          style={{ color: "white", textDecoration: "none" }}
          onClick={() => handleOptionClick("Home", "/")}
        >
          <HomeIcon />
          <div className="home_sideNavbarTopOptionTitle">Home</div>
        </Link>

        {/* Shorts Option */}
        <div
          className="home_sideNavbarTopOption"
          style={{ color: "white" }}
          // onClick={() => handleOptionClick("", "/shorts")}
        >
          <VideocamIcon />
          <div className="home_sideNavbarTopOptionTitle">Shorts</div>
        </div>

        {/* Subscription Option */}
        <div
          className="home_sideNavbarTopOption"
          style={{ color: "white" }}
          // onClick={() => handleOptionClick("", "/subscriptions")}
        >
          <SubscriptionsIcon />
          <div className="home_sideNavbarTopOptionTitle">Subscription</div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="home_sideNavbarMiddle">
        <div className="home_sideNavbarTopOption">
          <div className="home_sideNavbarTopOptionTitle">You</div>
          <ChevronRightIcon />
        </div>

        <div className="home_sideNavbarTopOption">
          <RecentActorsIcon />
          <div className="home_sideNavbarTopOptionTitle">Your Channel</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <HistoryIcon />
          <div className="home_sideNavbarTopOptionTitle">History</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <PlaylistAddIcon />
          <div className="home_sideNavbarTopOptionTitle">Playlist</div>
        </div>

        <div
          className={`home_sideNavbarTopOption ${activeOption === "YourVideos" ? "active" : ""}`}
          onClick={() => handleOptionClick("YourVideos", "")}
        >
          <SmartDisplayOutlinedIcon />
          <div className="home_sideNavbarTopOptionTitle">Your videos</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <WatchLaterOutlinedIcon />
          <div className="home_sideNavbarTopOptionTitle">Watch later</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <ThumbUpAltOutlinedIcon />
          <div className="home_sideNavbarTopOptionTitle">Liked videos</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <ContentCutIcon />
          <div className="home_sideNavbarTopOptionTitle">Your clips</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="home_sideNavbarBottom">
        <div className="home_sideNavbarTopOption">
          <div className="home_sideNavbarTopOptionTitleHeader">Subscription</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img
            className="home_sideNavbar_imgLogo"
            src="https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg"
            alt="Aaj Tak"
          />
          <div className="home_sideNavbarTopOptionTitle">Aaj Tak</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img
            className="home_sideNavbar_imgLogo"
            src="https://play-lh.googleusercontent.com/Vcd76CBOVKKf8AMluq7JvoTB8ImEmJJOC2hIfcjMuCgD0VPMcXulB7QDyPRHoZYRqBI"
            alt="The LallanTop"
          />
          <div className="home_sideNavbarTopOptionTitle">The LallanTop</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img
            className="home_sideNavbar_imgLogo"
            src="https://images.indianexpress.com/2015/11/ndtv-480.jpg"
            alt="NDTV India"
          />
          <div className="home_sideNavbarTopOptionTitle">NDTV India</div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SideNavbar;
