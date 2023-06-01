import React from 'react'
import { Link} from 'react-router-dom'
import '../style.css';
import Navbar from './Navbar';


const Home = () => {
  return (
    <div className='navbar-container'>
      <Navbar/>
      <div className='container-flex'>
        <div className='container-new'>
          <h4>Manage patients and create reports</h4>
          <Link to="/login" className='btn btn-success' >Join us</Link>
        </div>
        <div className='container-new'>
         <h4>Join our hospital and help our patients</h4>
          <Link to="/login" className='btn btn-success' >Be A Member</Link>
        </div>
        <div className='container-new'>
          <h4>Register and Be a part of our family</h4>
          <Link to="/login" className='btn btn-success' >Login Now</Link>
        </div>
      </div>
      
    </div>
  )
}

export default Home