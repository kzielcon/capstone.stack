import { useState, useEffect } from 'react';
import {
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

  const checkLogin = () => {
    // if(localStorage.getItem("token")!=="")
    // {
    //   setIsAuthenticated(true);
    // }
    // else
    // {
    //   setIsAuthenticated(false);
    // }
    setIsAuthenticated( localStorage.getItem("token")!=="" )
  }

  useEffect(() => { checkLogin(); }, []);

  return (
    <Routes>
      <Route path="/" element={ isAuthenticated ? ( <Navigate to='/Dashboard'/> ) : ( <Login setAuth={setAuth}/> ) } />
      <Route path="/PasswordRecovery" element={ <PasswordRecovery/> } />
      <Route path="/Dashboard" element={ <Dashboard /> } />
      <Route path="/UserProfile" element={ <UserProfile /> } />
      <Route path="/Users" element={ <Users /> } />
      <Route path="/Category" element={ <Category/> } />
      <Route path="/Inventory" element={ <Inventory />  } />
      {/* <Route path="/Orders" element={ <Orders />  } />
      <Route path="/CompanyProfile" element={ <CompanyProfile />  } />
      <Route path="/Reports" element={<Reports/>} /> */}
      <Route path="/Logout" element={ <Login setAuth={null} /> } />
    </Routes>
  );

}
export default App;