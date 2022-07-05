import React, {useState} from 'react';
import './csses/login.css'

/**
 *
 */
function Login({create}) {
    const [loginData, setLoginData] = useState({
        name: "",
        status: false
    });


    /**
     * Main handler event by clicked button
     */
    const funSubmit = function (event) {
        event.preventDefault()

        create({
            id: Date.now(),
            userName: loginData.name,
            status: loginData.status,
            isHand: false
        })
    }

    return (
        <div className="form-popup" id="myForm">
            <form className="form-container">
                <h1>Join class</h1>

                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Name Lastname"
                       value={loginData.name}
                       onChange={event => setLoginData({...loginData, name: event.target.value})}
                       required/>

                <label>
                    <input type="checkbox"
                           checked={loginData.status}
                           onChange={event => setLoginData({...loginData, status: event.target.checked})}/>
                    You are the creator ?
                </label>

                <button type="button" className="btn" onClick={funSubmit}>Login</button>
            </form>
        </div>
    );
}

export default Login;