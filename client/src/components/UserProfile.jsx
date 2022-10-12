import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function UserProfile() {
    
    const [inputs, setInputs] = useState({
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
        editEmployeeFirstName,
        editEmployeeLastName,
        editEmployeeGender,
        editEmployeeMobile,
        editEmployeeAddress,
        editEmployeeEmail,
        editEmployeePass
    } = inputs

    const onSubmitEmployeeForm = async (e) => {
        e.preventDefault()
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
            }
            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/userinfo/"+localStorage.getItem("id"),
                {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )
            // parse response
            const parseRes = await response.json();
            // display message
            alert(parseRes.msg);

            // refresh page to see changes on sidebar
            window.location = "/Dashboard";
        } catch (error) {
            console.log(error)
        }
    }

    const getEmployeeInfo = async () => {
        try {
            const response = await fetch("http://localhost:8000/userinfo/"+localStorage.getItem("id"))
            const jsonData = await response.json()

            setInputs({
                editEmployeeFirstName: jsonData.first_name,
                editEmployeeLastName: jsonData.last_name,
                editEmployeeGender: jsonData.user_gender,
                editEmployeeMobile: jsonData.user_mobile,
                editEmployeeAddress: jsonData.user_addr,
                editEmployeeEmail: jsonData.user_email,
                editEmployeePass: jsonData.user_pass
            });
        } catch (err) {
            console.error(err.message)
        }
    }


    useEffect(() => { getEmployeeInfo(); }, []);

    return (
        <div class="container m-5">
            <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3">
                    <Sidebar/>
                </div>
                <div className="col col-lg-9 col-md-6 col-sm-6 mt-3">
                    <form onSubmit={onSubmitEmployeeForm}>
                    <h4 className="col">User Profile</h4>
                    
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

                    
                    <div class="d-grid gap-1 p-2 mt-3">
                        <input type="submit" className="btn btn-primary mt-3" value="Update Profile" />
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default UserProfile