import {  useState } from "react";

import axios from "axios";
import '../style.css';
import { Link } from "react-router-dom";
function Register() {
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[role, setRole]=useState("");

    function isValidEmail(email){
      return /\S+@\S+\.\S+/.test(email);
    }
  
     function save(event) {
      event.preventDefault();
      if(!isValidEmail(email)){
        alert("Enter a valid mail");
      }
      else if(password.length<8){
        alert("Please enter Password with minimum 8 characters");
      }
      else if(!name || !email || !password || !role){
        alert("Please enter all the fields");
      }
      else{
         axios.post("http://localhost:8080/User/register", {
        name: name,
        email: email,
        password: password,
        role:role,
        });
        alert("Registration Successfully");
        setName('');
        setEmail('');
        setPassword('');
        setRole('');
    }
    }

    return (
      <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
      <div className='form-container p-5 rounded bg-white'>
         <form>
            <h3 className='text-center'>Register</h3>
            <div className='mb-2'>
              <label htmlFor='name'>Name</label>
              <input type="text"  class="form-control" id="Name" placeholder="Enter name" value={name} onChange={(event) => {setName(event.target.value);}}
              />
            </div> 
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
              <label htmlFor='role'>Role</label>
              <input type="text"  class="form-control" id="role" placeholder="Enter role" value={role} onChange={(event) => {setRole(event.target.value);}}
              />
            </div>   
            <div className='d-grid'>
              <button className='btn btn-primary' onClick={save}>Sign Up</button>
            </div>
            <p className='text-end mt-2'>
              Already a registered User?<Link to="/login" className="ms-2">Now sign In</Link>
            </p>
         </form>
      </div>
      </div>
    );
  }
  
  export default Register;