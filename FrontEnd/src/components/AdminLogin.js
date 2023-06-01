import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import '../style.css';
import AdminService from '../services/AdminService';


function AdminLogin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const adminService=new AdminService()

    async function login(event) {
        event.preventDefault();
        try {
          /*await axios.post(`http://localhost:8080/admin/login/${email}/${password}`, {
            email: email,
            password: password,
            })*/
           adminService.adminLogin(email,password)
            .then((res) => 
            {
             console.log(res.data.id);
           
             if (res.status === 200) 
             {
              localStorage.setItem('user-token',res.data.id);
              localStorage.setItem("isLoggedIn",true);
           //   localStorage.setItem('UserId',res.data.id)
              navigate("/admindashboard");
             } 
            else 
             { 
                alert("Incorrect Email and Password not match");
             }
          }, fail => {
           console.error(fail); // Error!
  });
        } 
         catch (err) {
         console.log(err);
                }
      }

      const home=()=>{
        navigate("/");
      }
  return (
    <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
    <div className='form-container p-5 rounded bg-white'>
       <form>
          <h3 className='text-center'>Admin Login</h3>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input type="email"  class="form-control" id="Email" placeholder="Enter email" value={email} onChange={(event) => { setEmail(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='password'>Password</label>
            <input type="password"  class="form-control" id="Password" placeholder="Enter Password" value={password} onChange={(event) => {setPassword(event.target.value);}}
            />
          </div>
          <div className='mb-2'>
            <input type="checkbox" className='custom-control custom-checkbox' id='check'/>
            <label htmlFor='check' className='custom-input-label'> I,agree to all terms and conditions</label>
          </div>
          <div className='d-grid'>
            <button className='btn btn-primary' onClick={login}>Sign In</button>
          </div>
          <br></br>
          <button className='btn btn-primary' onClick={home}>Go to Home</button>
       </form>
    </div>
    </div>
  )
}

export default AdminLogin