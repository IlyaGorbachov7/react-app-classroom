import React, {useEffect, useState} from 'react';
import "./csses/MainWIndow.css";
import RowTable from "./RowTable";
import ClassRoomService from "../API/ClassRoomService";
import {useNavigate} from "react-router";
import {Stomp} from "@stomp/stompjs";
import SockJS from 'sockjs-client'
import {WS_CROSS_ORIGIN} from "../API/RemoteServer";


const MainWindow = ({curUser}) => {
    const navigate = useNavigate();

    let stompClient = React.useRef(null);

    const [connect, setConnect] = useState(false);

    const [users, setUsers] = useState([])

    useEffect(() => {
        if (connect === true) {
            return;
        }
        connection();
    }, [])

    function connection() {
        stompClient.current = Stomp.over(function () {
            return new SockJS(WS_CROSS_ORIGIN)
        });
        stompClient.current.connect({}, onConnected);
    }


    const onConnected = async () => {
        stompClient.current.subscribe('/topic/classroom/create', onCreatedUser);
        stompClient.current.subscribe('/topic/classroom/delete', onDeletedUser);
        stompClient.current.subscribe('/topic/classroom/update', onUpdatedUser);
        stompClient.current.subscribe('/user/' + curUser.id + '/delete', unSubscribe);
        setConnect(true);
        loadUsers();
    }

    async function loadUsers() {
        let list = await ClassRoomService.getAll();
        setUsers(list);
    }

    // ---------------------------------------------------------------

    const onCreatedUser = (payload) => {
        let user = JSON.parse(payload.body);
        setUsers(prevState => [...prevState, user])
    }

    const onDeletedUser = (payload) => {
        let uuid = JSON.parse(payload.body);
        setUsers(prevState => {
            return prevState.filter(user => user.id !== uuid)
        })
    }

    const onUpdatedUser = (payload) => {
        let userUpdate = JSON.parse(payload.body);
        setUsers(prevState => {
            let userExist = prevState.find(user => user.id === userUpdate.id)
            if (userExist !== undefined) {
                userExist.name = userUpdate.name;
                userExist.hand = userUpdate.hand;
            }
            return [...prevState]
        });
    }

    // ---------------------------------------------------------------
    function sendQueryToDeleteUser(uuid) {
        stompClient.current.send("/app/private/delete", {}, JSON.stringify(uuid))
    }

    // The method is triggered when the class administrator sends the user a request to delete himself
    const unSubscribe = (payload) => {
        let id = JSON.parse(payload.body);
        console.log("Deleted continue ..>>>>>>>>>>>>>>>>.")
        handlerLogout(null);
    }

    function disconnect() {
        if (stompClient.current !== null) {
            stompClient.current.disconnect();
        }

    }
    //----------------------------------------------------------------

    async function changeAction() {
        try {
            curUser.hand = curUser.hand === false
            let statusCode = await ClassRoomService.riseHand(curUser);
            console.log(statusCode)
            if (statusCode === 200) {// если все ОК
                if (curUser.hand !== true) {// if OK, then changed text inside html
                    document.getElementById("idActionHand").innerHTML = "Rise hand up"
                } else document.getElementById("idActionHand").innerHTML = "Dawn hand"


            } else curUser.hand = curUser.hand === false // возвращает обратно
        } catch (e) {
            console.log(e)
        }
    }

    async function handlerRiseHand(e) {
        e.preventDefault()
        await changeAction()
    }

    async function handlerLogout(e) {
        // This method used inside UnSubscribe() method
        // So this if - is very important !
        if (e !== null) e.preventDefault()

        try {
            await ClassRoomService.removeById(curUser.id)
            disconnect()
            navigate('/login');
        } catch (ex) {
            console.log(ex)
        }
    }

    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {

            let dropdowns = document.getElementsByClassName("dropdown-content");
            let i;
            for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    return (<div>
        <div className="container">
            <div className="dropdown-action">
                <button onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("myDropdownAction").classList.toggle("show");
                }} className="dropbtn">Actions
                </button>
                <div id="myDropdownAction" className="dropdown-content"
                     onClick={handlerRiseHand}>
                    <div id="idActionHand">Raise hand up</div>
                </div>
            </div>

            <div className="dropdown-user">
                <button onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("myDropdownUser").classList.toggle("show");
                }} className="dropbtn">{curUser.name}</button>
                <div id="myDropdownUser" className="dropdown-content"
                     onClick={handlerLogout}>
                    <div id="idLogout">Logout</div>
                </div>
            </div>
        </div>

        <div className="table-style">
            {users.map(user => <RowTable item={user} statusCurUser={curUser.status}
                                         sendQueryToDeleteUser={sendQueryToDeleteUser} key={user.id}/>)}
        </div>

    </div>);
};

export default MainWindow;