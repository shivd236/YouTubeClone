import React, { useEffect, useState } from "react";
import "./video.css";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircleIcon from '@mui/icons-material/Circle';

const Video = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0); // Track like count
 
  
  const [activeUnactive  , setActiveUnactive] = useState(null); // Tracks if user liked or disliked

  //------>Comment profile pic image show karne ke liye hai
  const [userPic, setUserPic] = useState(
    "https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain"
  );
  const [isLogIn, setIsLogin] = useState(false);
  //---------------------------------------------------------.+//

  const [videoSugesstion , setVideoSugesstion] = useState([]);

  const { id } = useParams();






  

  // Fetch video details
  const fetchVideoById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/getVideoById/${id}`
      );
      const videoData = res.data.result;
      setData(videoData);
      setVideoUrl(videoData?.videoLink);
      
      setLikeCount(videoData?.likes.length); // Initialize like count
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch comments =======================>
  const getCommentByVideoId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/commApi/comment/${id}`
      );
      setComments(res.data.comments);
      
    } catch (err) {
      console.log(err);
    }
  };

  // Handle like button click

// Like API Call===================>

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        `http://localhost:8000/api/video/${id}/like`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { likes, message } = res.data;
      setLikeCount(likes);
      toast.success(message);

      setActiveUnactive(message);

      
    } catch (err) {
      console.log(err);
      toast.error("Please login to like the video.");
    }
  };



  // Handle dislike button click
  // Dislike API Call

  const handleDislike = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        `http://localhost:8000/api/video/${id}/dislike`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { likes, message } = res.data;
      setLikeCount(likes);
      toast.success(message)

      setActiveUnactive(message);

    } catch (err) {
      console.log(err);
      toast.error("Please login to dislike the video.");
    }
  };

// console.log("userAction32==>",userAction);

// fetch video details and comments

  useEffect(() => {
    fetchVideoById();

    getCommentByVideoId();


  }, []);


///----------------------> handle post comment api====>//

  const handleComment = async () => {
    const body = {
      message: message,
      video: id,
    };
  
    const token = localStorage.getItem('token'); // Fetch token from localStorage
  
    try {
      const response = await axios.post(
        "http://localhost:8000/commApi/comment",
        body,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        }
      );
  
      if (response.status === 201) {
        setComments([response.data.comment, ...comments]);
        toast.success(response.data.message);
        setMessage("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
  
      if (!isLogIn) {
        toast.error("Please login to comment on this video.");
      }
    }
  };
  

//--------------------------------------------------------------------//


  // --------> handle cancel comment button;
  const handleCancelComButt = () =>{
    setMessage('');
  }
//------------------------------------------------//

  // <----- comment User profilePIc ==>
    useEffect(() => {
      let userProfilePic = localStorage.getItem("userProfilePic");
      setIsLogin(localStorage.getItem("userId") !== null? true : false);
        if (userProfilePic !== null) {
          setUserPic(userProfilePic);
          
        }
  
        
    },[])
    //------------------>
  
   
    //-----> Video Suggestion Show Dynamic-->
    useEffect(()=> {

      axios.get('http://localhost:8000/api/allVideo').then((res) =>{
        console.log("suggesstion",res.data.result);
        setVideoSugesstion(res.data.result);
        
      }).catch((err)=> {
        console.log(err);
        
      })

    },[])

   
   // Shuffle array and select first 7 objects

   const shuffleArray = videoSugesstion.sort(() => Math.random() - 0.5);

   const random7VideoSugge = shuffleArray.slice(0, 7); 
   
   
//-------------------------------------------------------------//
// ----> video sugesstion click to play video func ;

const handleReload = () => {

  setTimeout(() =>{
    window.location.reload();
  },100)
}

console.log("DAta0", data);


//-----------------------------------------------------------//

  return (
    <div className="video">
      <div className="videoPostSection">
        <div className="video_youtube">
          {data && (
            <video
              width="400"
              controls
              autoPlay
              className="video_youtube_video"
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="video_youtubeAbout">
          <div className="video_youtubeTitle">{data?.title}</div>
          <div className="youtube_video_ProfileBlock">
            <div className="youtube_video_ProfileBlock_left">
              <Link
                to={`/user/${data?.user?._id}`}
                className="youtube_video_ProfileBlock_left_img"
              >
                <img
                  src={data?.user?.profilePic}
                  alt="profileimg"
                  className="youtube_video_ProfileBlock_left_image"
                />
              </Link>
              <div className="youtubevideo_subView">
                <div className="youtubePostProfileName">
                  {data?.user?.channelName}
                </div>
                <div className="youtubePostProfileSubs">
                  {data?.user?.createdAt.slice(0, 10)}
                </div>
              </div>
              <div className="subscribeBtnYoutube">Subscribe</div>
            </div>

            <div className="youtube_video_likeBlock">
              <div
                className={`youtube_video_likeBlock_Like  ${
                  activeUnactive === "Video liked successfully!" ? "active" : ""
                } `}
                onClick={handleLike}
              >
                <ThumbUpOutlinedIcon className="icon" />
                <div className="youtube_video_likeBlock_NoofLikes">
                  {likeCount}
                </div>
              </div>
              <div className="youtubeVideoLikeDivider"></div>
              <div
                className={`youtube_video_likeBlock_Like  ${
                  activeUnactive === "Video disliked successfully!" ? "active" : ""
                }`}
                onClick={handleDislike}
              >
                <ThumbDownOutlinedIcon className="icon" />
              </div>
            </div>
          </div>
        </div>


        <div className="youtube_video_About">
          <div>Upload at {data?.createdAt.slice(0, 10)}</div>
          <div>{data?.description}</div>
        </div>

        <div className="youtubeCommentSection">
          <div className="youtubeCommentSectionTitle">
            {comments.length} Comments
          </div>
          <div className="youtubeSelfComment">
            <img
              src={userPic}
              alt="commnetselfprofile"
              className="video_youtubeSelfCommentProfile"
            />
            <div className="addAComment">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="addAcommentInput"
                placeholder="Add a comment"
              />
              <div className="cancelSubmitComment">
                <div className="cancelComment" onClick={handleCancelComButt}>Cancel</div>
                <div className="cancelComment" onClick={handleComment}>
                  Comment
                </div>
              </div>
            </div>
          </div>

          <div className="youtubeOthersComments">
            {comments.map((item, index) => {

             return (
              <div className="youtubeSelfComment" key={index}>
                <img
                  src={item?.user?.profilePic}
                  alt="commnetselfprofile"
                  className="video_youtubeSelfCommentProfile"
                />
                <div className="others_CommentSection">
                  <div className="others_commentSectionHeader">
                    <div className="channelName_comment">
                      {item?.user?.channelName}
                    </div>
                    <div className="commentTiminingOthers">
                      {item?.createdAt.slice(0, 10)}
                    </div>
                  </div>
                  <div className="otherCommentSectionComment">
                    {item?.message}
                  </div>
                </div>
              </div>
             );

            })}
          </div>
        </div>
      </div>

      

      <div className="videoSuggestions">


      {
        
        random7VideoSugge?.map((item , idx) => {


         console.log("itemOFViedoSugg ",item);
         

          if (item?._id !== data?._id) {

            return (

              <div className="videoSuggestionsBlock">
              <Link to={`/watch/${item?._id}`} onClick={handleReload} className="video_suggestion_thumbnail">
                <img
                  src={item?.
                    thumbnail}
                  alt="thumbnail img"
                  className="video_suggestion_thumbnail_img"
                />
              </Link>
              <div className="video_suggestion_About">
                <div className="video_suggestion_About_title">
                  {item?.title}
                </div>
                <div className="video_suggestion_About_Profile">{item?.user?.channelName}</div>
                <div className="video_suggestion_About_Profile">
                  {item?.likes.length} likes <CircleIcon sx={{width:"6px", height : "3.5px", marginBottom : "1.5px"}} /> {item?.updatedAt.slice(0, 10) }
                </div>
              </div>
            </div>

            )
        
          }
          
  
        })
    
        
      }


      </div>

      <ToastContainer />
    </div>
  );
};

export default Video;

