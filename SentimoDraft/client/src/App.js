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
import Users from "./components/Users"
import Category from "./components/Category"
import Inventory from './components/Inventory';


import "./index.css";


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = boolean => {
    setIsAuthenticated(boolean)
  }

  return (
    <Routes>
      <Route path="/" element={ isAuthenticated ? ( <Navigate to='/Dashboard'/> ) : ( <Login setAuth={setAuth}/> ) } />
      <Route path="/PasswordRecovery" element={ <PasswordRecovery/> } />
      <Route path="/Dashboard" element={ isAuthenticated ? ( <Dashboard setAuth={setAuth}/> ) : ( <Navigate to='/'/> ) } />
      <Route path="/UserProfile" element={ isAuthenticated ? ( <UserProfile setAuth={setAuth}/> ) : ( <Navigate to='/'/> ) } />
      <Route path="/Users" element={ isAuthenticated ? ( <Users setAuth={setAuth}/> ) : ( <Navigate to='/'/> ) } />
      <Route path="/Category" element={ isAuthenticated ? ( <Category setAuth={setAuth}/> ) : ( <Navigate to='/'/> ) } />
      <Route path="/Inventory" element={ isAuthenticated ? ( <Inventory setAuth={setAuth}/> ) : ( <Navigate to='/'/> ) } />
      {/* <Route path="/Orders" element={ isAuthenticated ? ( <Orders setAuth={setAuth}/> ) : ( <Navigate to='/'/> ) } /> */}
      {/* <Route path="/CompanyProfile" element={ isAuthenticated ? ( <CompanyProfile setAuth={setAuth}/> ) : ( <Navigate to='/'/> ) } /> */}
      {/* <Route path="/Reports" element={ isAuthenticated ? ( <Reports setAuth={setAuth}/> ) : ( <Navigate to='/'/> ) } /> */}
      {/* <Route path="/Reports" element={<Reports/>} /> */}
      <Route path="/Logout" element={ <Login setAuth={null} /> } />
    </Routes>
  );

}
export default App;