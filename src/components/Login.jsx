import React, {useEffect, useRef, useState} from 'react';
import './csses/login.css'
import {useNavigate} from "react-router";
import ClassRoomService from "../API/ClassRoomService";


function Login({setUser}) {
    const [loginData, setLoginData] = useState({
        name: "",
        status: false
    });
    const navigate = useNavigate();

    const [msgError, setMsgError] = useState(false)

    /**
     * Main handler event by clicked button
     */
    const funSubmit = async function (event) {
        event.preventDefault()

        if (loginData.status === true) { // if is creator
            setUser({
                id : Date.now(),
                name: loginData.name,
                status: loginData.status,
                hand : false
            })
            navigate('/classroom')
            return
        }
        try { // else if is not creator
            const response = await ClassRoomService.createUser(loginData.name)
            console.log(response.status)
            if (response.status === 200) { // is created !
                setUser({
                    // id должно быть взято из сервера !
                    id: response.data.id,
                    name: loginData.name,
                    status: loginData.status,
                    hand : false
                })
                setMsgError(false)
                navigate('/classroom')
            } else {
                setMsgError(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="form-popup" id="myForm">
            <form className="form-container">
                <h1>Join class</h1>

                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Name Lastname"
                       value={loginData.name}
                       onChange={event => setLoginData({...loginData, name: event.target.value})}/>
                {msgError && <div style={{fontSize: "10px", color: "red"}}>Same name already exist</div>}

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