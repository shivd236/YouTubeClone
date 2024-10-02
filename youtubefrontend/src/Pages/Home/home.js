import React from 'react'
import SideNavbar from '../../Component/SideNavbar/sideNavbar';
import './home.css';
import HomePage from '../../Component/HomePage/homePage';

const Home = ({sideNavbar}) => {
  return (
    <div className='home'> 
      <SideNavbar  sideNavbar={sideNavbar}/>
      <HomePage sideNavbar={sideNavbar} />
    </div>
  )
}

export default Home;
