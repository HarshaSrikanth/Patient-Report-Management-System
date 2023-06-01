import React from 'react'
import { Link } from 'react-router-dom'
import '../style.css';

const Navbar = () => {
  return (
    <div className='nav-bar'>
      <h3>Patient Report Management System</h3>
      <div className='navbar-compo'>
      <Link to="/adminlogin" className='btn btn-primary'>Admin</Link>
      <Link to="/login" className='btn btn-primary' >User Login</Link>
      <Link to="/patientlogin" className='btn btn-primary' >Patient Login</Link>
      <Link to="/register" className='btn btn-primary' >Register</Link>
      </div>
      </div>
  )
}

export default Navbar