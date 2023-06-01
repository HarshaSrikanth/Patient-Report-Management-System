import axios from 'axios';

const BASE_PATH_URL="http://localhost:8080/User";

class UserService{
    
    userLogin(email,password){
        return axios.post(BASE_PATH_URL+`/login/${email}/${password}`)
    }

    getAllUsers(){
    return axios.get(BASE_PATH_URL+"/getAllUsers")
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

   userLogout(userId){
    return axios.get(BASE_PATH_URL+`/logout/${userId}`)
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

   getReportById(newid){
    return axios.get(BASE_PATH_URL+`/Report/getbyId/${newid}`)
   }

   getAllAppointments(){
    return axios.get(BASE_PATH_URL+"/getAllAppointments")
   }

   addAppointment(uid,pid,date){
    return axios.post(BASE_PATH_URL+"/request",{uid,pid,date})
   }

   getAppointmentById(newid){
    return axios.get(BASE_PATH_URL+`/Appointment/getbyId/${newid}`)
   }

   getMyAppRequests(newid){
    return axios.get(BASE_PATH_URL+`/getMyRequests/${newid}`)
   }

   acceptRequest(newid){
    return axios.get(BASE_PATH_URL+`/acceptRequest/${newid}`)
   }

}

export default UserService