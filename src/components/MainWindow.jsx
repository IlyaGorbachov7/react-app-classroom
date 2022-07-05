import React, {useState} from 'react';
import "./csses/MainWIndow.css";
import hand from './img/hand.png';
import btnCross from './img/btn-cross.png'
import RowTable from "./RowTable";

const MainWindow = ({curUser, items, remove, action}) => {
    // State current logging consumer

    /**
     * Main handler event cliked on the button "Rise Hand up"
     */
    function handlerRiseHand(e) {
        e.preventDefault()
        if (curUser.isHand === true) {
            document.getElementById("idActionHand").innerHTML = "Rise hand up"
        } else {
            document.getElementById("idActionHand").innerHTML = "Dawn hand"
        }
        action(curUser)

        //... Code by sending request on the server
    }

    /**
     * Main  handler event clicked on the button "Logout"
     */
    function handlerLogout(e) {
        e.preventDefault()

        //... Code for sending request on the server
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

    function btnViewAction(e) {
        e.preventDefault()
        document.getElementById("myDropdownAction").classList.toggle("show");
    }

    function btnViewUser(e) {
        e.preventDefault()
        document.getElementById("myDropdownUser").classList.toggle("show");
    }

    return (
        <div>
            <div className="container">
                <div className="dropdown-action">
                    <button onClick={btnViewAction} className="dropbtn">Actions</button>
                    <div id="myDropdownAction" className="dropdown-content"
                         onClick={handlerRiseHand}>
                        <div id="idActionHand">Raise hand up</div>
                    </div>
                </div>

                <div className="dropdown-user">
                    <button onClick={btnViewUser} className="dropbtn">{curUser.userName}</button>
                    <div id="myDropdownUser" className="dropdown-content"
                         onClick={handlerLogout}>
                        <div id="idLogout">Logout</div>
                    </div>
                </div>
            </div>

            <div className="table-style">
                {items.map(item =>
                    <RowTable item={item} key={item.id} remove={remove} statusCurUser={curUser.status}/>
                )}
            </div>
        </div>
    );
};

export default MainWindow;