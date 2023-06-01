import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminService from '../services/AdminService';


const AdminDashboard = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[role, setRole]=useState("");
    const [patients,setPatients]=useState([]);
    const[users,setUsers]=useState([]);
    const[age,setAge]=useState('')
    const[gender,setGender]=useState('');
    const[contact,setContact]=useState('');
    const[medicalhistory,setMedicalhistory]=useState('');
    const[showGetAllPatients,setshowGetAllPatients]=useState(false);
    const[showGetAllUsers,setshowGetAllUsers]=useState(false);
    const[showAddPatient,setshowAddPatient]=useState(false);
    const[showUpdatePatient,setshowUpdatePatient]=useState(false);
    const[showUpdateUser,setshowUpdateUser]=useState(false);
    const[showAddUser,setshowAddUser]=useState(false);
    const[patientId,setPatientId]=useState('');
    const[userId,setUserId]=useState('');
    const[searchInput,setSearchInput]=useState('');
    const[showSearch,setShowSearch]=useState('');
    const[searchData,setSearchData]=useState('');
    const navigate=useNavigate();
    const adminService=new AdminService();

    useEffect(()=>{

        //axios.get("http://localhost:8080/admin/getAllUsers")
        adminService.getAllUsers()
        .then((res)=>{
            
            setUsers(res.data);
        })
        .catch((err)=>{
            console.error(err)
        });
                    
        //axios.get("http://localhost:8080/admin/getAllPatients")
       adminService.getAllPatients()
        .then(res=>{
            setPatients(res.data);
        })
        .catch(err=>{
            console.log(err);
        });
    
    });


    const handleGetAllPatients=()=>{
        setshowGetAllUsers(false);
        setshowGetAllPatients(true);
        setshowAddPatient(false);
        setshowUpdatePatient(false);
        setShowSearch(false);
        setshowAddUser(false);
        setshowUpdateUser(false);
        
        if(!localStorage.getItem('isLoggedIn')){
            navigate("/login");
            return;
        }
        //axios.get("http://localhost:8080/admin/getAllPatients")
        adminService.getAllPatients()
        .then((res)=>{
            setPatients(res.data);
        })
        .catch((err)=>{
            console.error(err)
        });
    }


    const handleAddPatient=()=>{
        setshowAddPatient(true);
        setshowGetAllUsers(false);
        setshowGetAllPatients(false);
        setshowUpdatePatient(false);
        setShowSearch(false);
        setshowAddUser(false);
        setshowUpdateUser(false);
    }


    const handleReportsDashboard=()=>{
      navigate("/adminreports")
    }


    async function AddPatient(event) {
        event.preventDefault();
        if(!name || !age || !gender || !contact || !medicalhistory){
          alert("Please fill out all fields")
        }
        else{
        try {
          /*await axios.post("http://localhost:8080/admin/addPatient", {
            name:name,
            age:age,
            gender:gender,
            contact:contact,
            medicalhistory:medicalhistory
            })*/
            await adminService.addPatient(name,age,gender,contact,medicalhistory)
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
        setshowGetAllUsers(false);
        setShowSearch(false);
        setshowAddUser(false);
        setshowUpdateUser(false);
      }


     async function  UpdatePatient(event){
      event.preventDefault();
        if(!name || !age || !gender || !contact || !medicalhistory){
          alert("Please fill out all fields")
        }
        else{
        try {
        /*await axios.put(`http://localhost:8080/admin/Patient/update/${patientId}`,
         { name:name,
            age:age,
            gender:gender,
            contact:contact,
            medicalhistory:medicalhistory
        })*/
        adminService.updatePatient(patientId,name,age,gender,contact,medicalhistory)
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
        //axios.delete(`http://localhost:8080/admin/Patient/delete/${patientId}`)
        adminService.deletePatient(id)
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
          navigate("/adminlogin");
          localStorage.setItem('isLoggedIn',false);
          alert("Successfully Logged Out");
       }


      const handleSearch=()=>{
        setshowUpdatePatient(false);
        setshowAddPatient(false);
        setshowGetAllUsers(false);
        setshowGetAllPatients(false);
        setshowAddUser(false);
        setshowUpdateUser(false);
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
      const handleGetAllUsers=()=>{
        setshowGetAllUsers(true);
        setshowUpdatePatient(false);
        setshowAddPatient(false);
        setShowSearch(false);
        setshowGetAllPatients(false);
        setshowAddUser(false);
        setshowUpdateUser(false);
        
      }

      const handleDeleteAdminUser=(id)=>{
        
        try{
        //axios.delete(`http://localhost:8080/admin/user/delete/${userId}`)
        adminService.deleteUser(id)
        .then((res) => 
        {
          console.log(res.data);
          alert("User deleted Successfully")
          setUserId('');
        }, fail => {
       console.error(fail);
         });
        } 
       catch (err) {
      console.log(err);
       }   
       }

       const handleAppointment=()=>{
        navigate('/adminappointments');
       }

       const handleAddUser=()=>{
        setshowAddUser(true);
        setshowAddPatient(false);
        setshowGetAllUsers(false);
        setshowGetAllPatients(false);
        setshowUpdatePatient(false);
        setShowSearch(false);
        setshowUpdateUser(false);

       }

      function isValidEmail(email){
        return /\S+@\S+\.\S+/.test(email);
      }
       function AddUser(event) {
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
          /* axios.post("http://localhost:8080/admin/user/register", {
          name: name,
          email: email,
          password: password,
          role:role,
          });*/
          adminService.addUser(name,email,password,role)
          .then((res) => 
            {
              console.log(res.data);
          alert("Registration Successfully");
          setName('');
          setEmail('');
          setPassword('');
          setRole('');
            }, fail => {
              console.error(fail);
            });
      }
      }
      const handleUpdateAdminUser=(user)=>{
        setUserId(user.id);
        setshowUpdateUser(true);
        setshowAddUser(false);
        setshowAddPatient(false);
        setshowGetAllUsers(false);
        setshowGetAllPatients(false);
        setshowUpdatePatient(false);
        setShowSearch(false);

      }
      async function UpdateUser(event){
        event.preventDefault();
        if(!name || !email || !password || !role){
          alert("Please enter all the fields");
          }
       else{
        try {
          /*await axios.put(`http://localhost:8080/admin/user/update/${userId}`, {
          name: name,
          email: email,
          password: password,
          role:role,
          })*/
          adminService.updateUser(userId,name,email,password,role)
          .then((res)=>{
            console.log(res.data);
          alert("Updated Successfully");
            setName('');
              setEmail('');
            setPassword('');
            setRole('');
            handleGetAllUsers();
          }, fail => {
            console.error(fail);
          });
        } catch (err) {
          alert(err);
        }
      }     
     }
    


  return (
    <div className='container'>
        <div className='sub-container'>
        <h1>Admin Dashboard</h1>
        <div className="logout btn btn-danger" onClick={handleLogout}>Logout</div>
        </div>
        <div class='flex-container'>
        <button className='btn btn-primary' onClick={handleGetAllUsers}>Get All Users</button>
        <button className='btn btn-primary' onClick={handleAddUser}>Add User</button>
        <button className='btn btn-primary' onClick={handleGetAllPatients}>Get All Patients</button>
        <button className='btn btn-primary' onClick={handleAddPatient}>Add patient</button>
        <button className='btn btn-primary' onClick={handleReportsDashboard}>Reports Dashboard</button>
        <button className='btn btn-primary' onClick={handleAppointment}>Appointments</button>
        <div className='Search-bar'>
        <input type='text' placeholder='Enter Patient Name' value={searchInput} onChange={(e)=>{setSearchInput(e.target.value);}}/>
        <button className='btn btn-success' onClick={handleSearch}>Search</button>
        </div>
        </div>

        {showGetAllUsers && (
            <>
        <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th>Is Active</th>
                <th colSpan={2}>Actions</th>
                </tr>
           </thead>
           <tbody>
            {
                users.map(user=>(
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.role}</td>
                        <td>{user.isActive === true ? "Active" : "Not Active"}</td>
                        <td> 
                          <button className='btn btn-success' onClick={()=>handleUpdateAdminUser(user)}>Update</button>
                        </td>
                        <td> 
                          <button className='btn btn-danger' onClick={()=>handleDeleteAdminUser(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))
            }
           </tbody>
        </table>
        </>
       )}
       {showUpdateUser && (
       <>
       <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container p-5 rounded bg-white'>
        <form>
          <h3 className='text-center'>Update User</h3>
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input type="text"  class="form-control" id="Name" placeholder="Enter Name" required value={name} onChange={(event) => { setName(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input type="email"  class="form-control" id="Email" placeholder="Enter Email" required value={email} onChange={(event) => { setEmail(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='password'>Password</label>
            <input type="password"  class="form-control" id="Password" placeholder="Enter Password" required value={password} onChange={(event) => {setPassword(event.target.value);}}
            />
          </div>
         <div className='mb-2'>
            <label htmlFor='role'>Role</label>
            <input type="text"  class="form-control" id="Role" placeholder="Enter Role" required value={role} onChange={(event) => {setRole(event.target.value);}}
            />
          </div>
          <br/>
          <div className='d-grid'>
            <button className='btn btn-primary' onClick={UpdateUser}>Update User</button>
          </div>
          </form>
          </div>
          </div>
       </>
       )}
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
       {showAddUser && (
       <>
       <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container p-5 rounded bg-white'>
        <form>
          <h3 className='text-center'>Add User</h3>
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input type="text"  class="form-control" id="Name" placeholder="Enter Name" required value={name} onChange={(event) => { setName(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input type="email"  class="form-control" id="Email" placeholder="Enter Email" required value={email} onChange={(event) => { setEmail(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='password'>Password</label>
            <input type="password"  class="form-control" id="Password" placeholder="Enter Password" required value={password} onChange={(event) => {setPassword(event.target.value);}}
            />
          </div>
         <div className='mb-2'>
            <label htmlFor='role'>Role</label>
            <input type="text"  class="form-control" id="Role" placeholder="Enter Role" required value={role} onChange={(event) => {setRole(event.target.value);}}
            />
          </div>
          <br/>
          <div className='d-grid'>
            <button className='btn btn-primary' onClick={AddUser}>Add User</button>
          </div>
          </form>
          </div>
          </div>
       </>
       )}
        </div>
  )
}

export default AdminDashboard