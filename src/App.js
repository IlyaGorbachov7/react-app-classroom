import React, {useState} from 'react';
import Login from "./components/Login";
import {Route, BrowserRouter} from "react-router-dom";
import {Navigate, Routes} from "react-router";
import ErrorPage from "./components/Error";
import MainWindow from "./components/MainWindow";

function App() {

    const [curUser, setCurUser] = useState({
        id: 0,
        name: "",
        status: false,
        isHand: false
    })


    function setUser(user) {
        setCurUser(user)
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login"
                       element={<Login setUser={setUser}/>}/>

                <Route path="/classroom" element={<MainWindow curUser={curUser}/>}/>

                <Route path="/" element={<Navigate to={'/login'}/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    );

}

export default App;
