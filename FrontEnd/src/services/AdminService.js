import axios from 'axios';

const BASE_PATH_URL="http://localhost:8080/admin";

class AdminService{

    adminLogin(email,password){
        return axios.post(BASE_PATH_URL+`/login/${email}/${password}`)
    }
    

    getAllUsers(){
    return axios.get(BASE_PATH_URL+"/getAllUsers")
    }

    deleteUser(id){
        return axios.delete(BASE_PATH_URL+`/user/delete/${id}`)
    }
    
    addUser(name,email,password,role){
        return axios.post(BASE_PATH_URL+"/user/register",{name,email,password,role}) 
    }

    updateUser(userId,name,email,password,role){
        return axios.put(BASE_PATH_URL+`/user/update/${userId}`,{name,email,password,role})
    }

   getAllPatients(){
    return axios.get(BASE_PATH_URL+"/getAllPatients");
   }

   addPatient(name,age,gender,contact,medicalhistory){
    return axios.post(BASE_PATH_URL+"/addPatient",{name,age,gender,contact,medicalhistory})
   }

   updatePatient(patientId,name,age,gender,contact,medicalhistory){
    return axios.put(BASE_PATH_URL+`/Patient/update/${patientId}`,{name,age,gender,contact,medicalhistory})
   }
   
   deletePatient(id){
    return axios.delete(BASE_PATH_URL+`/Patient/delete/${id}`)
   }


   getAllReports(){
    return axios.get(BASE_PATH_URL+"/getAllReports");
   }

   addReport(userId,patientId,testResults,diagnosisInfo,date){
    return axios.post(BASE_PATH_URL+"/addReport",{userId,patientId,testResults,diagnosisInfo,date})
   }

   updateReport(reportId,userId,patientId,testResults,diagnosisInfo,date){
    return axios.put(BASE_PATH_URL+`/Report/update/${reportId}`,{userId,patientId,testResults,diagnosisInfo,date})
   }

   deleteReport(id){
    return axios.delete(BASE_PATH_URL+`/Report/delete/${id}`)
   }

   getAllAppointments(){
    return axios.get(BASE_PATH_URL+"/getAllAppointments")
   }

   addAppointment(uid,pid,date){
    return axios.post(BASE_PATH_URL+"/request",{uid,pid,date})
   }

}

export default AdminService