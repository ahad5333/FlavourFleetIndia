import React from 'react'
import "./Navbar.css"
import { assets } from "../../assets/assets"

const Navbar = () => {
  return (
    <div className='navbar'>
      <div>

        <img className='logo' src={assets.logo} alt="" />
        <h3>Admin panel
        </h3>
      </div>
          

        <img src={assets.profile_image} alt="" className='profile' />
        
        
      
    </div>
  )
}

export default Navbar
