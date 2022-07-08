import React, {useEffect, useState} from 'react';
import "./csses/MainWIndow.css";
import RowTable from "./RowTable";
import ClassRoomService from "../API/ClassRoomService";

const MainWindow = ({curUser}) => {
    const [users, setUsers] = useState([])

    let bul = React.useRef(false)
    useEffect(() => {
        if (bul === true) {
            return;
        }
        loadUsers()
        bul = true
    }, [])

    async function loadUsers() {
        let persons = await ClassRoomService.getAll();
        setUsers(persons)
    }

    async function changeAction() {
        try {
            // Делаем запрос на сервер, Делаем предварительное изминение isHand
            let statusCode = await ClassRoomService.riseHand(curUser.id, curUser.isHand === false);
            if (statusCode === 200) {// если все ОК
                // Тогда ЯВНО изменяем состояние isHand у текущего объекта
                curUser.isHand = curUser.isHand === false
                if (curUser.isHand === true) {// if OK, then changed text inside html
                    document.getElementById("idActionHand").innerHTML = "Rise hand up"
                } else document.getElementById("idActionHand").innerHTML = "Dawn hand"

            }
        } catch (e) {
            console.log(e)
        }
    }

    async function handlerRiseHand(e) {
        e.preventDefault()
        await changeAction()
        loadUsers();
    }

    async function handlerLogout(e) {
        e.preventDefault()
        try {
            await ClassRoomService.removeById(curUser.id)
            loadUsers()
        } catch (e) {
            console.log(e)
        }
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {

            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    return (
        <div>
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
                {users.map(user =>
                    <RowTable item={user} statusCurUser={curUser.status}
                              loadUsers={loadUsers} key={user.id}/>
                )}
            </div>

        </div>
    );
};

export default MainWindow;