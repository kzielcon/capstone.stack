import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function UserProfile() {
    
    const [inputs, setInputs] = useState({
        employeeFirstName: "",
        employeeLastName: "",
        employeeGender: "",
        employeeMobile: "",
        employeeAddress: "",
        employeeEmail: "",
        employeePass: ""
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
        employeePass
    } = inputs

    const onSubmitEmployeeForm = async (e) => {
        e.preventDefault()
        try {
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
        } catch (error) {
            console.log(error)
        }
    }

    const getEmployeeInfo = async () => {
        try {
            const response = await fetch("http://localhost:8000/userinfo/"+localStorage.getItem("id"))
            const jsonData = await response.json()

            setInputs({
                employeeFirstName: jsonData.first_name,
                employeeLastName: jsonData.last_name,
                employeeGender: jsonData.user_gender,
                employeeMobile: jsonData.user_mobile,
                employeeAddress: jsonData.user_addr,
                employeeEmail: jsonData.user_email,
                employeePass: jsonData.user_pass
            });
        } catch (err) {;
            console.error(err.message)
        }
    }


    useEffect(() => { getEmployeeInfo(); }, []);

    return (
        <div class="container no-padding">
            <div className="row">
                <div className="col col-lg-3 col-md-6 col-sm-6">
                    <Sidebar/>
                </div>
                <div className="col col-lg-9 col-md-6 col-sm-6 mt-3">
                    <form onSubmit={onSubmitEmployeeForm}>
                    <h4 className="col">User Profile</h4>
                    
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