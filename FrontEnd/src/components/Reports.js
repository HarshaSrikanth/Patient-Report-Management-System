import axios from 'axios';
import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../style.css";
import UserService from '../services/UserService';

const Reports = () => {
    const [patients,setPatients]=useState([]);
    const[users,setUsers]=useState([]);
    const[userId,setUserId]=useState('');
    const[patientId,setPatientId]=useState('')
    const[testResults,setTestResults]=useState('');
    const[diagnosisInfo,setDiagnosisInfo]=useState('');
    const[date,setDate]=useState('');
    const[reports,setReports]=useState([]);
    const[reportId,setReportId]=useState('');
    const[showGetAllReports,setshowGetAllReports]=useState(false);
    const[showAddReport,setshowAddReport]=useState(false);
    const[showUpdateReport,setshowUpdateReport]=useState(false);
    const[searchInput,setSearchInput]=useState('');
    const[showSearch,setShowSearch]=useState('');
    const[searchData,setSearchData]=useState('');
    const navigate=useNavigate();
    const userService=new UserService();
  
    const handleGetAllReports=()=>{
        setshowGetAllReports(true);
        setshowAddReport(false);
        setshowUpdateReport(false);
        setShowSearch(false);

        //axios.get("http://localhost:8080/User/getAllPatients")
        userService.getAllPatients()
        .then((res)=>{
        setPatients(res.data);
        console.log(res.data);
        })

       // axios.get("http://localhost:8080/User/getAllUsers")
       userService.getAllUsers()
        .then((res)=>{
        setUsers(res.data);
        console.log(res.data);
           })

      //axios.get("http://localhost:8080/User/getAllReports")
      userService.getAllReports()
        .then((res)=>{
            setReports(res.data);
            console.log(res.data);        
          })
        .catch((err)=>{
            console.error(err)
        });
    }


    const handleAddReport=()=>{
        setshowAddReport(true);
        setshowGetAllReports(false);
        setshowUpdateReport(false);
        setShowSearch(false);

    }


    const handlePatientsDashBoard=()=>{
      const userId=localStorage.getItem('user-token');
        navigate(`/dashboard/${userId}`);
    }


    async function AddReport(event) {
        event.preventDefault();
        const userId=localStorage.getItem('user-token');
        setUserId(userId);
        if(!userId || !patientId || !testResults || !diagnosisInfo || !date){
          alert("Please fill out all fields")
        }
      // eslint-disable-next-line
       else if(!users.some(user => user.id == userId) || !patients.some(patient => patient.id == patientId)){
           alert("Please Enter Valid user id and Patient Id");
         }
      else{
        try {
          /*await axios.post("http://localhost:8080/User/addReport", {
            userId:userId,
            patientId:patientId,
            testResults:testResults,
            diagnosisInfo:diagnosisInfo,
            date:date
            })*/
            userService.addReport(userId,patientId,testResults,diagnosisInfo,date)
            .then((res) => 
            {
             console.log(res.data);
             alert("Report added Successfully")
             setUserId('');
             setPatientId('');
             setTestResults('');
             setDiagnosisInfo('');
             setDate('');
             handleGetAllReports();
          }, fail => {
           console.error(fail);
         });
        } 
         catch (err) {
          console.log(err);
        }
      } 
}

const handleUpdateReport=(report)=>{
  setReportId(report.id)
  console.log(report.id);
  setshowUpdateReport(true);
  setshowAddReport(false);
  setshowGetAllReports(false);
  setShowSearch(false);
}

async function  UpdateReport(event){
  event.preventDefault();
    const userId=localStorage.getItem('user-token');
    setUserId(userId);
    if(!userId || !patientId || !testResults || !diagnosisInfo || !date){
      alert("Please fill out all fields")
    }
    else{
    try {
    /*await axios.put(`http://localhost:8080/User/Report/update/${reportId}`,
     { userId:userId,
      patientId:patientId,
      testResults:testResults,
      diagnosisInfo:diagnosisInfo,
      date:date
    })*/
    userService.updateReport(reportId,userId,patientId,testResults,diagnosisInfo,date)
      .then((res) => 
        {
          console.log(res.data);
          alert("Report Updated Successfully")
          setUserId('');
          setPatientId('');
          setTestResults('');
          setDiagnosisInfo('');
          setDate('');
          handleGetAllReports();
          setReportId('');
      }, fail => {
       console.error(fail);
     });
    } 
     catch (err) {
      console.log(err);
     }
    }
  }


 const handleDeleteReport=(id)=>{
    try{
      
    console.log(id);
   //axios.delete(`http://localhost:8080/User/Report/delete/${id}`)
   userService.deleteReport(id)
    .then((res) => 
    {
      console.log(res.data);
      alert("Report deleted Successfully")
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
      setshowGetAllReports(false);
      setshowAddReport(false);
      const newArray=reports.filter((user)=>{return (user.u_name_addedBy.toLowerCase()===searchInput.toLowerCase())});
      console.log(newArray);
      if(newArray.length>0){
        setSearchData(newArray);
        setSearchInput('');
        setShowSearch(true);
      }
      else{
        alert("Please Enter a Valid User Name");
        setSearchInput('');
      }
    }


  return (
    <div className='container'>
      <div className='sub-container'>
       <h1>Reports Dashboard</h1>
       <div className="logout btn btn-danger" onClick={handleLogout}>Logout</div>
      </div>
    <div class='flex-container'>
    <button className='btn btn-primary' onClick={handleGetAllReports}>Get All Reports</button>
    <button className='btn btn-primary' onClick={handleAddReport}>Add Report</button>
    <button className='btn btn-primary' onClick={handlePatientsDashBoard}>Patients Information Dashboard</button>
    <div className='Search-bar'>
    <input type='text' placeholder='Enter User Name' value={searchInput} onChange={(e)=>{setSearchInput(e.target.value);}}/>
    <button className='btn btn-success' onClick={handleSearch}>Search</button>
    </div>
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
            <th colSpan={2}>Actions</th>
            </tr>
       </thead>
       <tbody>
        {
            reports.map(report=>(
                <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.patient.id}</td>
                    <td>{report.patient.name}</td>
                    <td>{report.testResults}</td>
                    <td>{report.diagnosisInfo}</td>
                    <td>{report.date}</td>
                    <td>{report.addedBy.id}</td>
                    <td>{report.addedBy.name}</td>
                    <td>
                    <button className='btn btn-success' onClick={()=>handleUpdateReport(report)}>Update</button>
                    </td>
                    <td> 
                    <button className='btn btn-danger' onClick={()=>handleDeleteReport(report.id)}>Delete</button>
                    </td>
                    
                </tr>
            ))
        }
       </tbody>
    </table>
    </>
    )}
    {showAddReport && (
        <>
        <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container p-5 rounded bg-white'>
        <form>
          <h3 className='text-center'>Add Report</h3>
           { /*<div className='mb-2'>
            <label htmlFor='user id'>User Id</label>
            <input type="text"  class="form-control" id="userid" placeholder="Enter UserId" required value={userId} onChange={(event) => { setUserId(event.target.value); }}
             /> 
    </div> */}
          <div className='mb-2'>
            <label htmlFor='patient id'>Patient Id</label>
            <input type="text"  class="form-control" id="patientId" placeholder="Enter Patient Id" required value={patientId} onChange={(event) => { setPatientId(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='test results'>Test Results</label>
            <input type="text"  class="form-control" id="testResults" placeholder="Enter Test Results" required value={testResults} onChange={(event) => {setTestResults(event.target.value);}}
            />
          </div>
         <div className='mb-2'>
            <label htmlFor='diagnosis Info'>Diagnosis Info</label>
            <input type="text"  class="form-control" id="diagnosis" placeholder="Enter Diagnosis Info" required value={diagnosisInfo} onChange={(event) => {setDiagnosisInfo(event.target.value);}}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='date'>Date</label>
            <input type="date"  class="form-control" id="date" placeholder="Enter date"  required value={date} onChange={(event) => {setDate(event.target.value);}}
            />
          </div>
          <br/>
          <div className='d-grid'>
            <button className='btn btn-primary' onClick={AddReport}>Add</button>
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
        {
            searchData.map(report=>(
                <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.patient.id}</td>
                    <td>{report.patient.name}</td>
                    <td>{report.testResults}</td>
                    <td>{report.diagnosisInfo}</td>
                    <td>{report.date}</td>
                    <td>{report.addedBy.id}</td>
                    <td>{report.u_name_addedBy}</td>
                </tr>
            ))
        }
       </tbody>
    </table>
    </>
    )}
    {showUpdateReport && (
        <>
        <div className='d-flex justify-content-center align-items-center 100-w'>
        <div className='form-container p-5 rounded bg-white'>
        <form>
         {/*} <h3 className='text-center'>Update Report</h3>
          <div className='mb-2'>
            <label htmlFor='user id'>User Id</label>
            <input type="text"  class="form-control" id="userid" placeholder="Enter UserId" required value={userId} onChange={(event) => { setUserId(event.target.value); }}
            /> 
    </div> */}
          <div className='mb-2'>
            <label htmlFor='patient id'>Patient Id</label>
            <input type="text"  class="form-control" id="patientId" placeholder="Enter Patient Id" required value={patientId} onChange={(event) => { setPatientId(event.target.value); }}
             />
          </div>
          <div className='mb-2'>
            <label htmlFor='test results'>Test Results</label>
            <input type="text"  class="form-control" id="testResults" placeholder="Enter Test Results" required value={testResults} onChange={(event) => {setTestResults(event.target.value);}}
            />
          </div>
         <div className='mb-2'>
            <label htmlFor='diagnosis Info'>Diagnosis Info</label>
            <input type="text"  class="form-control" id="diagnosis" placeholder="Enter Diagnosis Info" required value={diagnosisInfo} onChange={(event) => {setDiagnosisInfo(event.target.value);}}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='date'>Date</label>
            <input type="date"  class="form-control" id="date" placeholder="Enter date"  required value={date} onChange={(event) => {setDate(event.target.value);}}
            />
          </div>
          <br/>
          <div className='d-grid'>
            <button className='btn btn-primary' onClick={UpdateReport}>Update</button>
          </div>
          </form>
          </div>
          </div>
        </>
    )}
    </div>
  )
}

export default Reports