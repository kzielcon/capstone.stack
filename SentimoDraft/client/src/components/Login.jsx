import React from 'react';

function Login() {
    return (
        <body>
            <main id="main-holder">
                <img src="img/sample2.png" alt="Sentimo Logo" className="img-fluid"/>
                <div id="login-error-msg-holder">
                    <p id="login-error-msg">Invalid username <span id="error-msg-second-line">and/or password</span></p>
                </div>
                
                <form id="login-form">
                    <input type="text" name="username" id="username-field" className="login-form-field" placeholder="Username"/>
                    <input type="password" name="password" id="password-field" className="login-form-field" placeholder="Password"/>
                    <input type="submit" value="Login" id="login-form-submit"/>
                </form>
                <hr/>
                
                <a id="forgot-pass-text" href="password-recovery.html">Forgot Password?</a>
            </main>
        </body>
    );
}

export default Login;