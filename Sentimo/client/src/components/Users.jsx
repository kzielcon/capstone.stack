/* eslint-disable no-throw-literal */
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

//jQuery libraries
import 'jquery/dist/jquery.min.js';
 
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

function Users() {

    const [inputs, setInputs] = useState({
        employeeFirstName: "",
        employeeLastName: "",
        employeeGender: "",
        employeeMobile: "",
        employeeAddress: "",
        employeeEmail: "",
        employeePass: "",
        editEmployeeFirstName: "",
        editEmployeeLastName: "",
        editEmployeeGender: "",
        editEmployeeMobile: "",
        editEmployeeAddress: "",
        editEmployeeEmail: "",
        editEmployeePass: ""
    })
    
    //setting the inputs
    const onChange = e => { setInputs({ ...inputs, [e.target.name]: e.target.value }) }

    //deconstructing the name and description variable from the inputs
    const {
        employeeFirstName,
        employeeLastName,
        employeeGender,
        employeeMobile,
        employeeAddress,
        employeeEmail,
        employeePass,
        editEmployeeFirstName,
        editEmployeeLastName,
        editEmployeeGender,
        editEmployeeMobile,
        editEmployeeAddress,
        editEmployeeEmail,
        editEmployeePass
    } = inputs

    const onSubmitAddUsersForm = async (e) => {
        e.preventDefault()
        try {
            if(employeeFirstName==="")
                throw "Failed to Add User. First Name is required.";
            if(employeeLastName==="")
                throw "Failed to Add User. Last Name is required.";
            if(employeeEmail==="")
                throw "Failed to Add User. Email is required.";
            if(employeePass==="")
                throw "Failed to Add User. Password is required.";

            const body = {
                employeeFirstName,
                employeeLastName,
                employeeGender,
                employeeMobile,
                employeeAddress,
                employeeEmail,
                employeePass
            }
            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/userinfo",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )
            // parse response
            const parseRes = await response.json();

            // refresh Users list
            getUsers();
            // display message
            alert(parseRes.msg);
        } catch (error) {
            alert(error);
        }
    }

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:8000/userinfo")
            const jsonData = await response.json()

            setUsers(jsonData);
            
            setTimeout(function(){ $('#table').DataTable() } , 1);
        } catch (err) {;
            console.error(err.message)
        }
    }

    const updateUser = async (e, id) => {
        e.preventDefault();
        try {
            if(editEmployeeFirstName==="")
                throw "Failed to Update. First Name is required.";
            if(editEmployeeLastName==="")
                throw "Failed to Update. Last Name is required.";
            if(editEmployeeEmail==="")
                throw "Failed to Update. Email is required.";
            if(editEmployeePass==="")
                throw "Failed to Update. Password is required.";

            const body = {
                editEmployeeFirstName,
                editEmployeeLastName,
                editEmployeeGender,
                editEmployeeMobile,
                editEmployeeAddress,
                editEmployeeEmail,
                editEmployeePass
            };

            const response = await fetch(`http://localhost:8000/userinfo/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            // parse response
            const parseRes = await response.json();

            // refresh Users list
            getUsers();
            // display message
            alert(parseRes.msg);
        } catch (err) {
            alert(err);
        }
    }

    //delete Users function
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/userinfo/${id}`, {
                method: "DELETE"
            });
            // parse response
            const parseRes = await response.json();

            // refresh Users list
            getUsers();
            // display message
            alert(parseRes.msg);
        } catch (err) {
            console.error(err.message);
        }
    }


    useEffect(() => { getUsers(); }, []);

    return (
        <div class="container m-5">
            <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3">
                    <Sidebar/>
                </div>
                
                <div className="col-lg-9 col-md-9 col-sm-9 mt-3">
                    
                    <div className="container border p-3 mt-3">
                        <div className="row">
                            <div className="col-lg-12">
                                <form onSubmit={onSubmitAddUsersForm}>
                                    <h4> Add User </h4>
                                    
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div class="form-group">
                                                    <label for="employeeFirstName">First Name</label>
                                                    <input
                                                        type="text"
                                                        name="employeeFirstName"
                                                        id="employeeFirstName"
                                                        value={employeeFirstName}
                                                        onChange={e => onChange(e)}
                                                        className="form-control"
                                                        placeholder="First Name"
                                                        maxLength={25}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div class="form-group">
                                                    <label for="employeeLastName">Last Name</label>
                                                    <input
                                                        type="text"
                                                        name="employeeLastName"
                                                        id="employeeLastName"
                                                        value={employeeLastName}
                                                        onChange={e => onChange(e)}
                                                        className="form-control"
                                                        placeholder="Last Name"
                                                        maxLength={25}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="container mt-3">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div class="form-group">
                                                    <label for="employeeGender">Gender</label>
                                                    <select
                                                        class="form-select"
                                                        aria-label="Default select example"
                                                        name="employeeGender"
                                                        id="employeeGender"
                                                        value={employeeGender}
                                                        onChange={e => onChange(e)}
                                                        required
                                                    >
                                                        <option value="">Select Gender here</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Lesbian">Lesbian</option>
                                                        <option value="Gay">Gay</option>
                                                        <option value="Bisexual">Bisexual</option>
                                                        <option value="Transgender">Transgender</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div class="form-group">
                                                    <label for="employeeMobile">Mobile Number</label>
                                                    <input
                                                        type="text"
                                                        name="employeeMobile"
                                                        id="employeeMobile"
                                                        value={employeeMobile}
                                                        onChange={e => onChange(e)}
                                                        className="form-control"
                                                        placeholder="Mobile Number"
                                                        maxLength={20}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="container mt-3">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div class="form-group">
                                                    <label for="employeeAddress">Address</label>
                                                    <input
                                                        type="text"
                                                        name="employeeAddress"
                                                        id="employeeAddress"
                                                        value={employeeAddress}
                                                        onChange={e => onChange(e)}
                                                        className="form-control"
                                                        placeholder="Address"
                                                        maxLength={200}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="container mt-3">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div class="form-group">
                                                    <label for="employeeEmail">Email</label>
                                                    <input
                                                        type="email"
                                                        name="employeeEmail"
                                                        id="employeeEmail"
                                                        value={employeeEmail}
                                                        onChange={e => onChange(e)}
                                                        className="form-control"
                                                        placeholder="Email"
                                                        maxLength={60}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div class="form-group">
                                                    <label for="employeePass">Password</label>
                                                    <input
                                                        type="password"
                                                        name="employeePass"
                                                        id="employeePass"
                                                        value={employeePass}
                                                        onChange={e => onChange(e)}
                                                        className="form-control"
                                                        placeholder="Password"
                                                        maxLength={10}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-grid gap-1">
                                        <input type="submit" className="btn btn-primary mt-3" value="Add User" />
                                    </div>
                                </form>
                            </div>

                            <div className="col-lg-12 mt-5">
                                <center><h4> Users List </h4></center>
                                <table className="table" id="table">
                                    <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Gender</th>
                                        <th>Mobile</th>
                                        <th>Address</th>
                                        <th>Email</th>
                                        <th width="5%">Edit</th>
                                        <th width="5%">Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td>{user.user_gender}</td>
                                                <td>{user.user_mobile}</td>
                                                <td>{user.user_addr}</td>
                                                <td>{user.user_email}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        class="btn btn-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target={`#id${user.id}`}
                                                        onClick={() =>
                                                            setInputs({
                                                                editEmployeeFirstName: user.first_name,
                                                                editEmployeeLastName: user.last_name,
                                                                editEmployeeGender: user.user_gender,
                                                                editEmployeeMobile: user.user_mobile,
                                                                editEmployeeAddress: user.user_addr,
                                                                editEmployeeEmail: user.user_email,
                                                                editEmployeePass: user.user_pass
                                                            })
                                                        }
                                                    >
                                                        <i class="bi-pencil-square"></i>
                                                    </button>
                                                    <div class="modal fade" id={`id${user.id}`} tabindex="-1" aria-labelledby="modalEditUserLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="modalEditUserLabel">Edit User</h5>
                                                            <button
                                                                type="button"
                                                                class="btn-close"
                                                                data-bs-dismiss="modal"
                                                                aria-label="Close"
                                                                >
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div className="container">
                                                                <div className="row">
                                                                    <div className="col-lg-6 col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="editEmployeeFirstName">First Name</label>
                                                                            <input
                                                                                type="text"
                                                                                name="editEmployeeFirstName"
                                                                                id="editEmployeeFirstName"
                                                                                value={editEmployeeFirstName}
                                                                                onChange={e => onChange(e)}
                                                                                className="form-control"
                                                                                placeholder="First Name"
                                                                                maxLength={25}
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="editEmployeeLastName">Last Name</label>
                                                                            <input
                                                                                type="text"
                                                                                name="editEmployeeLastName"
                                                                                id="editEmployeeLastName"
                                                                                value={editEmployeeLastName}
                                                                                onChange={e => onChange(e)}
                                                                                className="form-control"
                                                                                placeholder="Last Name"
                                                                                maxLength={25}
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="container mt-3">
                                                                <div className="row">
                                                                    <div className="col-lg-6 col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="editEmployeeGender">Gender</label>
                                                                            <select
                                                                                class="form-select"
                                                                                aria-label="Default select example"
                                                                                name="editEmployeeGender"
                                                                                id="editEmployeeGender"
                                                                                value={editEmployeeGender}
                                                                                onChange={e => onChange(e)}
                                                                                required
                                                                            >
                                                                                <option value="Male">Male</option>
                                                                                <option value="Female">Female</option>
                                                                                <option value="Lesbian">Lesbian</option>
                                                                                <option value="Gay">Gay</option>
                                                                                <option value="Bisexual">Bisexual</option>
                                                                                <option value="Transgender">Transgender</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="editEmployeeMobile">Mobile Number</label>
                                                                            <input
                                                                                type="text"
                                                                                name="editEmployeeMobile"
                                                                                id="editEmployeeMobile"
                                                                                value={editEmployeeMobile}
                                                                                onChange={e => onChange(e)}
                                                                                className="form-control"
                                                                                placeholder="Mobile Number"
                                                                                maxLength={20}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="container mt-3">
                                                                <div className="row">
                                                                    <div className="col-lg-12">
                                                                        <div class="form-group">
                                                                            <label for="editEmployeeAddress">Address</label>
                                                                            <input
                                                                                type="text"
                                                                                name="editEmployeeAddress"
                                                                                id="editEmployeeAddress"
                                                                                value={editEmployeeAddress}
                                                                                onChange={e => onChange(e)}
                                                                                className="form-control"
                                                                                placeholder="Address"
                                                                                maxLength={200}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="container mt-3">
                                                                <div className="row">
                                                                    <div className="col-lg-6 col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="editEmployeeEmail">Email</label>
                                                                            <input
                                                                                type="email"
                                                                                name="editEmployeeEmail"
                                                                                id="editEmployeeEmail"
                                                                                value={editEmployeeEmail}
                                                                                onChange={e => onChange(e)}
                                                                                className="form-control"
                                                                                placeholder="Email"
                                                                                maxLength={60}
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6 col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="editEmployeePass">Password</label>
                                                                            <input
                                                                                type="password"
                                                                                name="editEmployeePass"
                                                                                id="editEmployeePass"
                                                                                value={editEmployeePass}
                                                                                onChange={e => onChange(e)}
                                                                                className="form-control"
                                                                                placeholder="Password"
                                                                                maxLength={10}
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="modal-footer">
                                                            <button
                                                                type="button"
                                                                class="btn btn-warning"
                                                                data-bs-dismiss="modal"
                                                                
                                                                onClick={e => updateUser(e, user.id)}
                                                                >
                                                                    Edit
                                                                </button>
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => deleteUser(user.id)} >
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default Users