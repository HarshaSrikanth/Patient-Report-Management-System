import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../style.css';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';


function Dashboard (){
    const [patients,setPatients]=useState([]);
    const[name,setName]=useState('');
    const[age,setAge]=useState('')
    const[gender,setGender]=useState('');
    const[contact,setContact]=useState('');
    const[medicalhistory,setMedicalhistory]=useState('');
    const[showGetAllPatients,setshowGetAllPatients]=useState(false);
    const[showAddPatient,setshowAddPatient]=useState(false);
    const[showUpdatePatient,setshowUpdatePatient]=useState(false);
    const[patientId,setPatientId]=useState('');
    const[searchInput,setSearchInput]=useState('');
    const[showSearch,setShowSearch]=useState('');
    const[searchData,setSearchData]=useState('');
    const navigate=useNavigate();

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


    const handleGetAllPatients=()=>{
        setshowGetAllPatients(true);
        setshowAddPatient(false);
        setshowUpdatePatient(false);
        setShowSearch(false);
        
        if(!localStorage.getItem('isLoggedIn')){
            navigate("/login");
            return;
        }
        //axios.get("http://localhost:8080/User/getAllPatients")
        userService.getAllPatients()
        .then((res)=>{
            setPatients(res.data);
        })
        .catch((err)=>{
            console.error(err)
        });
    }


    const handleAddPatient=()=>{
        setshowAddPatient(true);
        setshowGetAllPatients(false);
        setshowUpdatePatient(false);
        setShowSearch(false);
    }


    const handleReportsDashboard=()=>{
      const userId=localStorage.getItem('user-token')
      navigate(`/reports/${userId}`);
      
    }


    async function AddPatient(event) {
        event.preventDefault();
        if(!name || !age || !gender || !contact || !medicalhistory){
          alert("Please fill out all fields")
        }
        else{
        try {
         // await axios.post("http://localhost:8080/User/addPatient", {
         //   name:name,
           // age:age,
           // gender:gender,
          //  contact:contact,
          //  medicalhistory:medicalhistory
           // })
          await userService.addPatient(name,age,gender,contact,medicalhistory)
          .then((res) => 
            {
             console.log(res.data);
             alert("Patient added Successfully")
             setName('');
             setAge('');
             setGender('');
             setContact('');
             setMedicalhistory('');
             handleGetAllPatients();
          }, fail => {
           console.error(fail);
         });
        } 
         catch (err) {
          console.log(err);
        }
      }
      }


      const handleUpdateUser=(patient)=>{
        setPatientId(patient.id)
        setshowUpdatePatient(true);
        setshowAddPatient(false);
        setshowGetAllPatients(false);
        setShowSearch(false);
      }


     async function  UpdatePatient(event){
      event.preventDefault();
        if(!name || !age || !gender || !contact || !medicalhistory){
          alert("Please fill out all fields")
        }
        else{
        try {
       /* await axios.put(`http://localhost:8080/User/Patient/update/${patientId}`,
         { name:name,
            age:age,
            gender:gender,
            contact:contact,
            medicalhistory:medicalhistory
        })*/
        await userService.updatePatient(patientId,name,age,gender,contact,medicalhistory)
        .then((res) => 
            {
              console.log(res.data);
              alert("Patient Updated Successfully")
              setName('');
              setAge('');
              setGender('');
              setContact('');
              setMedicalhistory('');
              handleGetAllPatients();
              setPatientId('');
          }, fail => {
           console.error(fail);
         });
        } 
         catch (err) {
          console.log(err);
         }
        }
      }


      const handleDeleteUser=(id)=>{
        
        try{
        //axios.delete(`http://localhost:8080/User/Patient/delete/${id}`)
        userService.deletePatient(id)
        .then((res) => 
        {
          console.log(res.data);
          alert("Patient deleted Successfully")

        }, fail => {
       console.error(fail);
         });
        } 
       catch (err) {
      console.log(err);
       }   
       }


       const handleLogout=()=>{
        const userId=localStorage.getItem('user-token');

       // axios.get(`http://localhost:8080/User/logout/${userId}`)
       userService.userLogout(userId)
        .then((res)=>{
          console.log(res.data);
          navigate("/login");
          localStorage.setItem('isLoggedIn',false);
          alert("Successfully Logged Out");
        })
       }


      const handleSearch=()=>{
        setshowUpdatePatient(false);
        setshowAddPatient(false);
        setshowGetAllPatients(false);
        const newArray=patients.filter((patient)=>{return (patient.name.toLowerCase()===searchInput.toLowerCase())});
        console.log(newArray);
        if(newArray.length>0){
          setSearchData(newArray);
          setSearchInput('');
          setShowSearch(true);
        }
        else{
          alert("Please Enter a Valid Patient Name");
          setSearchInput('');
        }
      }

      const handleAppointment=()=>{
        const userId=localStorage.getItem('user-token');
        navigate(`/appointments/${userId}`);
      }

  return (
    <div className='container'>
        <div className='sub-container'>
        <h1>User Dashboard</h1>
        <div className="logout btn btn-danger" onClick={handleLogout}>Logout</div>
        </div>
        <div class='flex-container'>
        <button className='btn btn-primary' onClick={handleGetAllPatients}>Get All Patients</button>
        <button className='btn btn-primary' onClick={handleAddPatient}>Add patient</button>
        <button className='btn btn-primary' onClick={handleReportsDashboard}>Reports Dashboard</button>
        <button className='btn btn-primary' onClick={handleAppointment}>Appointments</button>
        <div className='Search-bar'>
        <input type='text' placeholder='Enter Patient Name' value={searchInput} onChange={(e)=>{setSearchInput(e.target.value);}}/>
        <button className='btn btn-success' onClick={handleSearch}>Search</button>
        </div>
        </div>
        {showGetAllPatients && (
            <>
        <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Medical History</th>
                <th colSpan={2}>Actions</th>
                </tr>
           </thead>
           <tbody>
            {
                patients.map(patient=>(
                    <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td>{patient.name}</td>
                        <td>{patient.age}</td>
                        <td>{patient.gender}</td>
                        <td>{patient.contact}</td>
                        <td>{patient.medicalhistory}</td>
                        <td>
                          <button className='btn btn-success' onClick={()=>handleUpdateUser(patient)}>Update</button>
                        </td>
                        <td> 
                          <button className='btn btn-danger' onClick={()=>handleDeleteUser(patient.id)}>Delete</button>
                        </td>
                    </tr>
                ))
            }
           </tbody>
        </table>
        </>
       )}

       {showAddPatient && (
        <>
        <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container p-5 rounded bg-white'>
        <form>
          <h3 className='text-center'>Add Patient</h3>
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input type="text"  class="form-control" id="Name" placeholder="Enter Name" required value={name} onChange={(event) => { setName(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='age'>Age</label>
            <input type="text"  class="form-control" id="Age" placeholder="Enter Age" required value={age} onChange={(event) => { setAge(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='gender'>Gender</label>
            <input type="text"  class="form-control" id="Gender" placeholder="Enter Gender" required value={gender} onChange={(event) => {setGender(event.target.value);}}
            />
          </div>
         <div className='mb-2'>
            <label htmlFor='contact'>Contact</label>
            <input type="text"  class="form-control" id="Contact" placeholder="Enter Contact" required value={contact} onChange={(event) => {setContact(event.target.value);}}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='medicalhistory'>Medical History</label>
            <input type="text"  class="form-control" id="Medical History" placeholder="Enter Medical History" required value={medicalhistory} onChange={(event) => {setMedicalhistory(event.target.value);}}
            />
          </div>
          <br/>
          <div className='d-grid'>
            <button className='btn btn-primary' onClick={AddPatient}>Add</button>
          </div>
          </form>
          </div>
          </div>
        </>
    )}

   {showUpdatePatient && (
        <>
        <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container p-5 rounded bg-white'>
        <form>
          <h3 className='text-center'>Update Patient</h3>
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input type="text"  class="form-control" id="Name" placeholder="Enter Name" required value={name} onChange={(event) => { setName(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='age'>Age</label>
            <input type="text"  class="form-control" id="Age" placeholder="Enter Age" required value={age} onChange={(event) => { setAge(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='gender'>Gender</label>
            <input type="text"  class="form-control" id="Gender" placeholder="Enter Gender" required value={gender} onChange={(event) => {setGender(event.target.value);}}
            />
          </div>
         <div className='mb-2'>
            <label htmlFor='contact'>Contact</label>
            <input type="text"  class="form-control" id="Contact" placeholder="Enter Contact" required value={contact} onChange={(event) => {setContact(event.target.value);}}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='medicalhistory'>Medical History</label>
            <input type="text"  class="form-control" id="Medical History" placeholder="Enter Medical History" required value={medicalhistory} onChange={(event) => {setMedicalhistory(event.target.value);}}
            />
          </div>
          <br/>
          <div className='d-grid'>
            <button className='btn btn-primary' onClick={UpdatePatient}>Update</button>
          </div>
          </form>
          </div>
          </div>
        </>
    )}
       {showSearch && (
            <>
        <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Medical History</th>
                </tr>
           </thead>
           <tbody>
            {
                     searchData.map(patient=>(
                      <tr key={patient.id}>
                          <td>{patient.id}</td>
                          <td>{patient.name}</td>
                          <td>{patient.age}</td>
                          <td>{patient.gender}</td>
                          <td>{patient.contact}</td>
                          <td>{patient.medicalhistory}</td>
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

export default Dashboard