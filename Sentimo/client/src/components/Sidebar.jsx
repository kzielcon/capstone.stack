import React, { useState, useEffect } from "react";

import { SidebarData } from './SidebarData';
import { NavLink } from 'react-router-dom';
import "./Sidebar.css"


function Sidebar() {

    
    const [sidebarStyle, setSidebarStyle] = useState("");
    
    const sidebarButtonClicked = () => {
        // if(sidebarStyle=="")
        //     setSidebarStyle("active");
        // else
        //     setSidebarStyle("");
        (sidebarStyle==="") ? setSidebarStyle("active") : setSidebarStyle("");
    }

    const [userInfo, setUserInfo] = useState({
        userFirstName: "",
        userLastName: "",
        userRole: ""
    })
    
    //deconstructing the name and description variable from the inputs
    const {
        userFirstName,
        userLastName,
        userRole
    } = userInfo

    const getUserInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8000/userinfo/${localStorage.getItem("id")}`)
            const jsonData = await response.json()

            setUserInfo({userFirstName: jsonData.first_name, userLastName: jsonData.last_name, userRole: jsonData.user_role});
        } catch (err) {
            console.error(err.message)
        }
    }


    useEffect(() => { getUserInfo(); }, []);

  return (
        <div className={`sidebar ${sidebarStyle}`}>
                <div className="container logo-content">
                        <div className="logo">
                            <img src="img/logo.ico" alt="Logo"/>
                            <div className="logo-name"> Sentimo </div>
                        </div>
                        <div className="bx bxs-category sidebarIcon" onClick={sidebarButtonClicked} ></div>
                </div>
                <ul className="navbar">
                    <li>
                        <div class="profile-content">
                        <div class="profile">
                            <div class="profile-details">
                                <img src="img/admin.png" alt="User Profile"/>
                                <div className="name_role">
                                    <div className="name"> {userFirstName} {userLastName}</div>
                                    <div className="fw-bold pt-0"> {userRole} </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </li>
                    <li>         
                        {SidebarData.map((item, index) => (
                            <NavLink to={item.path} key={index}>
                                <div className="icon hover">{item.icon}</div>
                                <div className="pages">{item.name}</div>
                            </NavLink>
                        ))}
                    </li>
                </ul>
        </div>
  );
}

export default Sidebar;