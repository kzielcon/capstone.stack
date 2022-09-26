import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return ( 
    <div className="container-fluid no-padding">
            <div className="col-auto px-sm-0 px-0 sidebar">
                <div className="d-flex flex-column align-items-sm-start px-0 pt-2 text-white min-vh-100">  
                    <div className="row align-items-start m-0">
                        <div className="col al">
                            <img src="img/logo.ico"/>
                        </div>
                        <div className="col">
                            <h4>Sentimo</h4>
                        </div>
                        <div className="col">
                            <i className="bx bxs-category" id="btn"></i>
                        </div>
                    </div>

                    <ul className="col align-items-center">

                        <li>
                        <div className="profile-content">
                            <div className="profile">
                                <div className="profile-details">
                                    <img src="img/sample.jpg" alt="User Image"/>
                                    <div className="name_role">
                                        <p> Kayziel Contreras</p>
                                        <p> Admin </p>
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
                            <Link to="/Inventory">
                                <i class='bx bx-box'></i>
                                <span class="link-name">Inventory</span>
                            </Link>
                            <span class="tooltip"> Inventory </span>
                        </li>
                        <li>
                            <Link to="/Orders">
                                <i class='bx bx-notepad'></i>
                                <span class="link-name">Orders</span>
                            </Link>
                            <span class="tooltip"> Orders </span>
                        </li>
                        <li>
                            <Link to="/CompanyProfile">
                                <i class='bx bx-info-circle'></i>
                                <span class="link-name">Company Profile</span>
                            </Link>
                            <span class="tooltip"> Company Profile </span>
                        </li>
                        <li>
                            <Link to="/Reports">
                                <i class='bx bxs-report'></i>
                                <span class="link-name">Reports</span>
                            </Link>
                            <span class="tooltip"> Reports </span>
                        </li>
                        <li>
                            <a href="#">
                                <i class='bx bx-cog'></i>
                                <span class="link-name">Settings</span>
                            </a>
                            <span class="tooltip"> Settings </span>
                        </li>
                        <li>
                            <Link to="/">
                                <i class='bx bx-log-out'></i>
                                <span class="link-name"> Log out </span>
                            </Link>
                            <span class="tooltip"> Log out </span>
                        </li>
                    </ul>  
                </div>
            </div>
    </div>
  );
}

export default Sidebar;