import React, { useEffect, useState } from "react";
import "./profile.css";
import SideNavbar from "../../Component/SideNavbar/sideNavbar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useParams } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';

const Profile = ({ sideNavbar }) => {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const [user, setUser] = useState(null);

  const fecthProfileData = async () => {
    axios
      .get(`http://localhost:8000/api/${id}/channel`)
      .then((res) => {
        console.log(res);
        setData(res.data.result);
        setUser(res.data.result[0]?.user);
        // console.log("user of profile.js ",user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fecthProfileData();
  }, []);

  // ----------------if value zero of video then this data get and display profile page----------------------------------->
  let userProfilePic = localStorage.getItem("userProfilePic");
  let channelName = localStorage.getItem("channelName");
  let userName = localStorage.getItem("userName");
  let about = localStorage.getItem("about");
  //-------------------------------------------------------------------------------------------------------------->

  console.log("User Profile Pic setUser ", user);

  console.log("data profile, ", data);

  return (
    <div className="profile">
      <SideNavbar sideNavbar={sideNavbar} />

      <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
        <div className="profile_top_section">
          <div className="profile_top_section_profile">
            <img
              src={user === undefined ? userProfilePic : user?.profilePic}
              alt="profile"
              className="profile_top_section_img"
            />
          </div>

          <div className="profile_top_section_about">
            <div className="profile_top_section_About_Name">
              {user === undefined ? channelName : user?.channelName}
            </div>
            <div className="profile_top_section_info">
              {user === undefined ? userName : user?.userName}{" "}
              <CircleIcon
                sx={{ width: "6px", height: "3.5px", marginBottom: "1.5px" }}
              />{" "}
              {data.length} videos
            </div>
            <div className="profile_top_section_info">
              {user === undefined ? about : user?.about}
            </div>
          </div>
        </div>

        <div className="profile_videos">
          <div className="profile_videos_title">
            Videos &nbsp; <ArrowRightIcon />
          </div>

          <div className="profileVideo">
            {data.map((item, idx) => {
              return (
                <div className="profileVideo_block">
                  <Link to={`/watch/${item?._id}`}>
                    <div className="profileVideo_block_thumbnail">
                      <img
                        src={item?.thumbnail}
                        alt=""
                        className="profileVideo_block_thumbnail_img"
                      />
                    </div>
                  </Link>

                  <div className="profile_video_block_details">
                    <div className="profileVideo_block_detail_name">
                      {item?.title}
                    </div>
                    <div className="profileVideo_block_detail_about">
                      Create at {item?.createdAt.slice(0, 10)} <label className="deleteVideo"> <DeleteIcon sx={{color : "white" , height: "15px" , paddingTop : "3px" , cursor : "pointer"}} /></label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
