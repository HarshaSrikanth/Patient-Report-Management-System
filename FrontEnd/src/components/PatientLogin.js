import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import '../style.css';
import UserService from '../services/UserService';

function PatientLogin(){
    const [name, setName] = useState("");
    const[patients,setPatients]=useState("");
    const [contact, setContact] = useState("");
    const navigate = useNavigate();
    const userService=new UserService();

    
  useEffect(()=>{

    //axios.get("http://localhost:8080/User/getAllPatients")
        userService.getAllPatients()
        .then(res=>{
            setPatients(res.data);
            
        })
        .catch(err=>{
            console.log(err);
        });
    
    });

    const patientlogin=()=> {
        console.log(patients);
        const Array1=patients.filter((patient)=>{return (patient.name.toLowerCase()===name.toLowerCase()) && (patient.contact===contact)});
        if(Array1){
            localStorage.setItem("loggedInPatient",name)
            localStorage.setItem("loggedInPatientId",Array1[0].id)
            navigate("/patientdashboard");
            setName('');
            setContact('');
        }
        else{
            alert("Enter valid details");
        }
             
      }

      const home=()=>{
        navigate("/");
      }
  return (
    <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
    <div className='form-container p-5 rounded bg-white'>
       <form>
          <h3 className='text-center'>Patient Login</h3>
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input type="name"  class="form-control" id="name" placeholder="Enter Name" value={name} onChange={(event) => { setName(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='contact'>Contact</label>
            <input type="contact"  class="form-control" id="contact" placeholder="Enter Contact" value={contact} onChange={(event) => {setContact(event.target.value);}}
            />
          </div>
          <div className='mb-2'>
            <input type="checkbox" className='custom-control custom-checkbox' id='check'/>
            <label htmlFor='check' className='custom-input-label'> I,agree to all terms and conditions</label>
          </div>
          <div className='d-grid'>
            <button className='btn btn-primary' onClick={patientlogin}>Sign In</button>
          </div>
          <br></br>
          <button className='btn btn-primary' onClick={home}>Go to Home</button>
       </form>
    </div>
    </div>
  )
}

export default PatientLogin