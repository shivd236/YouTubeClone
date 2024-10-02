import { useEffect, useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar/navbar';
import Home from './Pages/Home/home';
import Video from './Pages/Video/video';
import Profile from './Pages/Profile/profile';
import VideoUpload from './Pages/VideoUpload/videoUpload';
import SignUp from './Pages/SignUp/signUp';
import axios from 'axios';
function App() {
  const [sideNavbar , setsideNavbar] = useState(true);

  // useEffect(()=>{
  //  axios.get('http://localhost:8000/api/allVideo').then((res)=>{
  //   console.log(res);
    
  //  }).catch((err)=>{
  //   console.log(err);
    
  //  })
  // },[])

  

  const setsideNavbarFunc = (value) =>{
    setsideNavbar(value)
  }



  return (
    <div className="App">
      <Navbar setsideNavbarFunc={setsideNavbarFunc} sideNavbar={sideNavbar}/>
      <Routes>
      <Route path='/' element={ <Home sideNavbar={sideNavbar} />} />
      <Route path='/watch/:id' element={<Video />} />
      <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar} />} />
      <Route path='/:id/upload' element={<VideoUpload />} />
      <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
