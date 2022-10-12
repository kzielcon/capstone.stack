import React, { useState } from "react";
import { Link } from "react-router-dom";


function PasswordRecovery() {
    
    const [inputs, setInputs] = useState({
        username: ""
    })

    //setting the inputs
    const onChange = e => {    //username     : barney   
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    //deconstructing the username and password variable from the inputs
    const { username } = inputs


    return (
        
        // <form onSubmit={onSubmitForm}>
        <div className="row justify-content-center mx-auto mt-5 align-items-center">
            <div className="col-lg-4 col-md-6 col-sm-12 ">
                    
                <div className="card rounded-0">
                    <div className="card-body p-5 text-center maincard ">
                        
                    <img src="img/sample2.png" alt="Sentimo Logo" className="img-fluid mb-5"/>
                        <p> Enter your email and we will send {'\n'} you a  link to reset your password. </p>
                        <input type="email" name="username" id="username" value={username} onChange={e => onChange(e)} className="form-control" placeholder="Email"/>
                        <input type="submit" className="btn btn-primary mt-5" value="Submit" id="login-form-submit"/>
                    </div>
                    <div className="card-footer maincard text-center">
                        <Link to="/" className="text-link"> Back to Login </Link>
                    </div>
                </div>

            </div>
        </div>
        // </form>

    );
};


export default PasswordRecovery;