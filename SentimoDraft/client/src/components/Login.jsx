import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    //setting the inputs
    const onChange = e => {    //username     : barney   
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    //deconstructing the username and password variable from the inputs
    const { username, password } = inputs

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {

            //making a body object from the values of username and password
            const body = { username, password }

            console.log(body);

            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/login",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )

            const parseRes = await response.json()

            if (parseRes.token) {
                //localstorage
                localStorage.setItem("token", parseRes.token)
                setAuth(true)
            } else {
                setAuth(false)
                
                alert(parseRes.msg);
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitForm}>
        <div className="row justify-content-center mx-auto mt-5 align-items-center">
            <div className="col-lg-4 col-md-6 col-sm-12 ">
                <div className="card rounded-0">
                    <div className="card-body p-5 text-center maincard">
                        
                    <img src="img/sample2.png" alt="Sentimo Logo" className="img-fluid mb-5"/>

                        
                        <input type="email" name="username" id="username" value={username} onChange={e => onChange(e)} className="form-control" placeholder="Email"/>

                        <input type="password" name="password" id="password" value={password} onChange={e => onChange(e)} className="form-control mt-3" placeholder="Password"/>

                        <input type="submit" className="btn btn-primary mt-5" value="Login" id="login-form-submit"/>
                    
                    </div>

                    <div className="card-footer maincard text-center">
                        <Link to="/PasswordRecovery"  className="text-link"> Forgot Password?</Link>
                    </div>
                </div>

            </div>
        </div>
        </form>
    );
}
export default Login;