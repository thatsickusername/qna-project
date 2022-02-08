import React, { useState } from 'react';
import Login from './Login'
import Register from './Register'
import '../Css/LoginRegister.css'

function LoginRegister() {

    const [formToggle, setFormToggle] = useState('register')
    
    const displayToggle = ()=>{
        if(formToggle==='register'){
            return(
                <h4>already registered? <span onClick={()=>{setFormToggle('login')}}>Login here</span></h4>
            )
        }

        if(formToggle==='login'){
            return(
                <h4>don't have an account yet? <span onClick={()=>{setFormToggle('register')}}>Register here</span></h4>
            )
        }
    }

    const displayForm = ()=>{
        if(formToggle==='register'){
            return(
                <Register/>      
            )
        }

        if(formToggle==='login'){
            return(
                <Login/>
            )
        }
    }
    return (
        <div className="LoginRegisterContainer">
            <div className="LoginRegisterBox">
                <div className={formToggle==='register'? "RegisterImage": "disappear"} ></div>

                <div className="LoginRegisterForm">
                    {displayForm()}
                    <div className="LoginRegisterToggle">
                        {displayToggle()}
                    </div>
                </div>

                <div className={formToggle==='login'? "LoginImage": "disappear"} ></div>
            </div>
        </div>
    );
}

export default LoginRegister;