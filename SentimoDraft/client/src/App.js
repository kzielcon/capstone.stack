import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PasswordRecovery from "./components/PasswordRecovery";
import UserProfile from "./components/UserProfile"
import Inventory from "./components/Inventory"
import Orders from "./components/Orders"
import CompanyProfile from "./components/CompanyProfile"
import Reports from "./components/Reports"


import "./index.css";


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = boolean => {
    setIsAuthenticated(boolean)

  }

  return (
    <Routes>
      <Route path="/" element={ isAuthenticated ? ( <Navigate to='/Dashboard'/> ) : ( <Login setAuth={setAuth}/> ) } />
      <Route path="/PasswordRecovery" element={<PasswordRecovery/>} />
      <Route path="/Dashboard" element={ isAuthenticated ? ( <Dashboard setAuth={setAuth}/> ) : ( <Navigate to='/'/> ) } />
        <Route path="/UserProfile" element={<UserProfile/>} />
        <Route path="/Inventory" element={<Inventory/>} />
        <Route path="/Orders" element={<Orders/>} />
        <Route path="/CompanyProfile" element={<CompanyProfile/>} />
        <Route path="/Reports" element={<Reports/>} />
    </Routes>
  );

}
export default App;