import React, { Fragment } from "react";

function passwordRecovery() {
    return (
        <Fragment>
            <>
                <main id="main-holder">
                    <img src="img/sample2.png" alt="Sentimo Logo" className="img-fluid"/>
                    <h3> Forgot Password </h3>
                    <p> Enter your email and we will send {'\n'} you a  link to reset your password. </p>
                    <input type="text" name="forgot-password" id="forgot-password-field" className="login-form-field" placeholder="Enter Email Address"/>
                    <input type="submit" value="Submit" id="forgot-password-form-submit"/>
                    <a id="log-in" href="index.html"> Back to Login</a>
                </main>
            </>
        </Fragment>
    );
};

export default passwordRecovery;