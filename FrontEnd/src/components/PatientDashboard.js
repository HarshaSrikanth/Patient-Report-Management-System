import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const PatientDashboard = () => {
    const navigate=useNavigate();
    const[reports,setReports]=useState([]);
    const[aptdata,setAptdata]=useState([]);
    const[reqdata,setreqdata]=useState([]);
    const[showGetAllReports,setshowGetAllReports]=useState(false);
    const[showgetAllAppointments,setshowGetAllAppointments]=useState(false);
    const[showgetAllRequests,setshowGetAllRequests]=useState(false);
    const newname=localStorage.getItem("loggedInPatient");
    const newid=localStorage.getItem("loggedInPatientId");
    const userService=new UserService();


   useEffect(()=>{


    //axios.get(`http://localhost:8080/User/Report/getbyId/${newid}`)
        userService.getReportById(newid)
        .then((res)=>{
        setReports(res.data);
        console.log(res.data);
    })  

    //axios.get(`http://localhost:8080/User/Appointment/getbyId/${newid}`)
    userService.getAppointmentById(newid)
    .then((res)=>{
        setAptdata(res.data);
    })
    //axios.get(`http://localhost:8080/User/getMyRequests/${newid}`)
    userService.getMyAppRequests(newid)
    .then((res)=>{
        setreqdata(res.data);
    })
   })

    const handleLogout=()=>{
        navigate("/patientlogin");
        localStorage.clear();
        setReports();
    }

    const handleReportsDashboard=()=>{
        setshowGetAllReports(true);
        setshowGetAllAppointments(false);
        setshowGetAllRequests(false);        
    }

    const handleAppointment=()=>{
      setshowGetAllAppointments(true);
      setshowGetAllReports(false);
      setshowGetAllRequests(false); 
    }

    const handleRequest=()=>{
        setshowGetAllAppointments(false);
      setshowGetAllReports(false);
      setshowGetAllRequests(true); 
    }
   async function handleAcceptRequest(req){
    try{
        //axios.get(`http://localhost:8080/User/acceptRequest/${newid}`)
        userService.acceptRequest(newid)
        .then((res)=>{
            if(res.data=="accepted"){
                setshowGetAllRequests(false);
                setshowGetAllAppointments(true);
                setshowGetAllReports(false);
            }
        })
    }catch(err){
        console.log(err);
    }

   }

  return (
    <div className='container'>
    <div className='sub-container'>
    <h1>Welcome {newname}</h1>
    <div className="logout btn btn-danger" onClick={handleLogout}>Logout</div>
    </div>
    <div class='flex-container'>
    <button className='btn btn-primary' onClick={handleReportsDashboard}>My Reports</button>
    <button className='btn btn-primary' onClick={handleAppointment}>My Appointments</button>
    <button className='btn btn-primary' onClick={handleRequest}>Appointment Requests</button>
    </div>
    {showGetAllReports && (
        <>
    <table>
        <thead>
            <tr>
            <th>ID</th>
            <th>Patient Id</th>
            <th>Patient Name</th>
            <th>Test Results</th>
            <th>Diagnosis Info</th>
            <th>Date</th>
            <th>Added User Id</th>
            <th>Added User Name</th>
            </tr>
       </thead>
       <tbody>
        {       reports == null ? (
                <tr>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                    <td>null</td>
                </tr>
        ):(
                <tr >
                    <td>{reports.id}</td>
                    <td>{reports.patient.id}</td>
                    <td>{reports.patient.name}</td>
                    <td>{reports.testResults}</td>
                    <td>{reports.diagnosisInfo}</td>
                    <td>{reports.date}</td>
                    <td>{reports.addedBy.id}</td>
                    <td>{reports.u_name_addedBy}</td>
                </tr>
        )
        }
       </tbody>
    </table>
    </>
    )}
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
       {showgetAllRequests && (
            <>
        <table>
            <thead>
                <tr>
                <th>User ID</th>
                <th>PatientID</th>
                <th>Date of Appointment</th>
                <th>Actions</th>
                </tr>
           </thead>
           <tbody>
            {
                    reqdata.map(req=>(
                    <tr key={reqdata.uid}>
                        <td>{req.uid}</td>
                        <td>{req.pid}</td>
                        <td>{req.date}</td>
                        <td>
                          <button className='btn btn-success' onClick={()=>handleAcceptRequest(req)}>Accept</button>
                        </td>
                    </tr>
                    ))
            }
           </tbody>
        </table>
        </>
       )}
    

    </div>
    
  )
}

export default PatientDashboard