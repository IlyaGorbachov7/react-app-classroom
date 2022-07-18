import React, {useState} from 'react';
import './csses/login.css'
import {useNavigate} from "react-router";
import ClassRoomService from "../API/ClassRoomService";
import ErrorMessage from "./ErrorMessage";


function Login({setUser}) {
    const [loginData, setLoginData] = useState({
        id: "",
        name: "",
        status: false
    });
    const navigate = useNavigate();

    const [error, setError] = useState({
        internalError: "",
        name: ""
    })

    const funSubmit = async function (event) {
        event.preventDefault()

        if (loginData.status === true) { // if is creator
            setUser({
                id: Date.now(),
                name: loginData.name,
                status: loginData.status,
                hand: false
            })
            navigate('/classroom')
            return
        }
        try { // else if is not creator
            const response = await ClassRoomService.createUser({
                name: loginData.name
            })
            setError({
                internalError: "",
                name: ""
            })

            setUser({
                // id должно быть взято из сервера !
                id: response.data.id,
                name: loginData.name,
                status: loginData.status,
                hand: false
            })
            navigate('/classroom')
        } catch (e) {
            let response = e.response;

            if (response.status === 400) {
                // console.log(response.data)
                if (response.data.name !== undefined) {
                    setError({
                        name: response.data.name,
                        internalError: ""
                    })
                }
            } else {
                if (response.status === 500) {
                    // console.log(response.data)
                    if (response.data.internalError !== undefined) {
                        setError({
                            name: "",
                            internalError: response.data.internalError
                        })
                    }
                }
            }
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
                <label>
                    <input type="checkbox"
                           checked={loginData.status}
                           onChange={event => setLoginData({...loginData, status: event.target.checked})}/>
                    You are the creator ?
                </label>
                <ErrorMessage errorMessage={error}/>
                <button type="button" className="btn" onClick={funSubmit}>Login</button>
            </form>

        </div>
    );
}

export default Login;