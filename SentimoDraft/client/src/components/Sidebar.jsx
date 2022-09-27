import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Sidebar() {

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
            const response = await fetch("http://localhost:8000/userinfo/"+localStorage.getItem("id"))
            const jsonData = await response.json()

            setUserInfo({userFirstName: jsonData.first_name, userLastName: jsonData.last_name, userRole: jsonData.user_role});
        } catch (err) {
            console.error(err.message)
        }
    }


    useEffect(() => { getUserInfo(); }, []);

  return ( 
        <div className="text-white min-vh-100 sidebar">
                <div className="container">
                    <div className="row">
                        <div className="col lg-3">
                            <img src="img/logo.ico"/>
                        </div>
                        <div className="col lg-6">
                            <h4>Sentimo</h4>
                        </div>
                        <div className="col lg-3">
                            <i className="bx bxs-category" id="btn"></i>
                        </div>
                    </div>
                </div>

                <ul>
                    <li>
                        <div className="profile-content">
                            <div className="profile">
                                <div className="profile-details">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <img src="img/sample.jpg" alt="User Image"/>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="name">
                                                    {userFirstName} {userLastName}
                                                </div> 
                                                <div className="role">
                                                    {userRole}
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <i className="bx bx-search"></i>
                        <input type="text" id="search-field" placeholder=" Search..."/>
                        <span className="tooltip"> Search </span>
                    </li>
                    <li>
                        <Link to="/Dashboard">
                            <i className="bx bx-grid-alt"></i>
                            <span className="link-name">Dashboard</span>
                        </Link>
                        <span className="tooltip"> Dashboard </span>
                    </li>
                    <li>
                        <Link to="/UserProfile">
                            <i class="bx bx-user"></i>
                            <span class="link-name">User Profile</span>
                        </Link>
                        <span class="tooltip"> User Profile </span>
                    </li>
                    <li>
                        <Link to="/Users">
                            <i class="bi bi-people"></i>
                            <span class="link-name">Users</span>
                        </Link>
                        <span class="tooltip"> Users </span>
                    </li>
                    <li>
                        <Link to="/Category">
                            <i class="bi bi-bounding-box"></i>
                            <span class="link-name">Category</span>
                        </Link>
                        <span class="tooltip"> Category </span>
                    </li>
                    <li>
                        <Link to="/Inventory">
                            <i class='bx bx-box'></i>
                            <span class="link-name">Inventory</span>
                        </Link>
                        <span class="tooltip"> Inventory </span>
                    </li>
                    {/* <li>
                        <Link to="/Orders">
                            <i class='bx bx-notepad'></i>
                            <span class="link-name">Orders</span>
                        </Link>
                        <span class="tooltip"> Orders </span>
                    </li> */}
                    {/* <li>
                        <Link to="/CompanyProfile">
                            <i class='bx bx-info-circle'></i>
                            <span class="link-name">Company Profile</span>
                        </Link>
                        <span class="tooltip"> Company Profile </span>
                    </li> */}
                    {/* <li>
                        <Link to="/Reports">
                            <i class='bx bxs-report'></i>
                            <span class="link-name">Reports</span>
                        </Link>
                        <span class="tooltip"> Reports </span>
                    </li> */}
                    {/* <li>
                        <a href="#">
                            <i class='bx bx-cog'></i>
                            <span class="link-name">Settings</span>
                        </a>
                        <span class="tooltip"> Settings </span>
                    </li> */}
                    <li>
                        <Link to="/Logout">
                            <i class='bx bx-log-out'></i>
                            <span class="link-name"> Log out </span>
                        </Link>
                        <span class="tooltip"> Log out </span>
                    </li>
                </ul>  
        </div>
  );
}

export default Sidebar;