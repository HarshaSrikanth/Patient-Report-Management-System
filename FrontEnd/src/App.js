import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from "./components/Dashboard";
import Reports from "./components/Reports";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AdminReports from "./components/AdminReports";
import AdminAppointments from "./components/AdminAppointments";
import UserAppointments from "./components/UserAppointments";
import PatientLogin from "./components/PatientLogin";
import PatientDashboard from "./components/PatientDashboard";


 
function App() {
  const dash=localStorage.getItem('isLoggedIn');
  return (
    <div>
      <BrowserRouter>
            <Routes>
              <Route path="/" element= {<Home/>} />
              <Route path="/login" element= {<Login/>} />
              <Route path="/register" element= {<Register/>} />
              <Route path="/dashboard/:userId" element={
                <Dashboard/>
               } />
              <Route path="/reports/:userId" element={
               <Reports/>
              } />
              <Route path='/appointments/:userId' element={<UserAppointments/>} />
              <Route path="/adminlogin" element= {<AdminLogin/>} />
              <Route path="/admindashboard" element= {<AdminDashboard/>} />
              <Route path="/adminreports" element={<AdminReports/>} />
              <Route path="/adminappointments" element={<AdminAppointments/>} />
              <Route path="/patientlogin" element={<PatientLogin/>} />
              <Route path="/patientdashboard" element={<PatientDashboard/>} />
            </Routes>
        </BrowserRouter>
      
    </div>
  );
}
 
export default App;
