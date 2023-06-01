import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import AdminService from '../services/AdminService';

const AdminAppointments = () => {
    const[users,setUsers]=useState([]);
    const[patients,setPatients]=useState([]);
    const[userId,setUserId]=useState('');
    const[patientId,setPatientId]=useState('');
    const[date,setDate]=useState('');
    const[showAddAppointment,setshowAddAppointment]=useState(false);
    const[showgetAllAppointments,setshowGetAllAppointments]=useState(false);
    const[aptdata,setAptdata]=useState([]);
    const navigate=useNavigate();
    const adminService=new AdminService();
    const userService=new UserService();
    useEffect(()=>{


        //axios.get("http://localhost:8080/admin/getAllPatients")
        adminService.getAllPatients()
        .then((res)=>{
         setPatients(res.data);
        })

        //axios.get("http://localhost:8080/admin/getAllUsers")
        adminService.getAllUsers()
        .then((res)=>{
        setUsers(res.data);
           })


       // axios.get("http://localhost:8080/admin/getAllAppointments")
       adminService.getAllAppointments()
        .then((res)=>{
            
            setAptdata(res.data);
        })
        .catch((err)=>{
            console.error(err)
        });
    })

    const handleLogout=()=>{
        navigate("/adminlogin");
        localStorage.setItem('isLoggedIn',false);
        alert("Successfully Logged Out");
     }
     const handleDashboard=()=>{
         navigate("/admindashboard");
     }

     const handleGetAllAppointments=()=>{
        setshowGetAllAppointments(true);
        setshowAddAppointment(false);
        
      }
      const handleAddAppointment=()=>{
        setshowGetAllAppointments(false);
        setshowAddAppointment(true);
      }
     
      async function AddAppointment(event) {
        event.preventDefault();
        var today=new Date(),
        newdate=today.getFullYear()+'-'+((today.getMonth())<10 ? '0'+(today.getMonth()+1):today.getMonth()+1)+'-'+((today.getDate())<10 ? '0'+today.getDate() : today.getDate());
        
        if(!userId || !patientId || !date){
          alert("Please fill out all fields")
        }
      // eslint-disable-next-line
       else if(!users.some(user => user.id == userId) || !patients.some(patient => patient.id == patientId )){
           alert("Please Enter Valid user id and Patient Id");
         }
         else if(date<newdate){
          alert("Please Enter Valid Date");
         }
      else{
        try {
          /*await axios.post("http://localhost:8080/User/request", {
            uid:userId,
            pid:patientId,
            date:date
            })*/
            await userService.addAppointment(userId,patientId,date)
            .then((res) => 
            {
             console.log(res.data);
             alert("Request Sent Successfully")
             setUserId('');
             setPatientId('');
             setDate('');
             handleGetAllAppointments();
          }, fail => {
           console.error(fail);
         });
        } 
         catch (err) {
          console.log(err);
        }
      } 
}



  return (
    
        <div className='container'>
            <div className='sub-container'>
            <h1>User to Patient Appointments</h1>
            <div className="logout btn btn-danger" onClick={handleLogout}>Logout</div>
            </div>
            <div class='flex-container'>
            <button className='btn btn-primary' onClick={handleGetAllAppointments}>Get All Appointments</button>
            <button className='btn btn-primary' onClick={handleAddAppointment}>Add Appointment</button>
           
            <button className='btn btn-primary' onClick={handleDashboard}>Main Dashboard</button>
            </div>
            {showgetAllAppointments && (
            <>
        <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>User Name</th>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Date of Appointment</th>
                </tr>
           </thead>
           <tbody>
            {
                aptdata.map(apt=>(
                    <tr key={apt.id}>
                        <td>{apt.id}</td>
                        <td>{apt.user.id}</td>
                        <td>{apt.user.name}</td>
                        <td>{apt.patient.id}</td>
                        <td>{apt.patient.name}</td>
                        <td>{apt.date}</td>
                    </tr>
                ))
            }
           </tbody>
        </table>
        </>
       )}
        {showAddAppointment && (
         <>
         <div className='d-flex justify-content-center align-items-center 100-w'>
         <div className='form-container p-5 rounded bg-white'>
         <form>
           <h3 className='text-center'>Add Appointment</h3>
           <div className='mb-2'>
             <label htmlFor='user id'>User Id</label>
             <input type="text"  class="form-control" id="userid" placeholder="Enter UserId" required value={userId} onChange={(event) => { setUserId(event.target.value); }}
              />
           </div>
           <div className='mb-2'>
             <label htmlFor='patient id'>Patient Id</label>
             <input type="text"  class="form-control" id="patientId" placeholder="Enter Patient Id" required value={patientId} onChange={(event) => { setPatientId(event.target.value); }}
              />
           </div>
           <div className='mb-2'>
             <label htmlFor='date'>Date</label>
             <input type="date"  class="form-control" id="date" placeholder="Enter date"  required value={date} onChange={(event) => {setDate(event.target.value);}}
             />
           </div>
           <br/>
           <div className='d-grid'>
             <button className='btn btn-primary' onClick={AddAppointment}>Request Patient</button>
           </div>
           </form>
           </div>
           </div>
         </>
    )}
        
       
    </div>
  )
}

export default AdminAppointments