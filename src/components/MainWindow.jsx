import React, {useState} from 'react';
import "./csses/MainWIndow.css";
import hand from './img/hand.png';
import btnCross from './img/btn-cross.png'
import RowTable from "./RowTable";

const MainWindow = () => {
    const [items, setItemsTable] = useState([
        {id: 5, userName: "Ilya Gorbachev", isHand: "visible"},
        {id: 4, userName: "Tomas Andersan", isHand: "visible"},
        {id: 3, userName: "Romigo Panamera", isHand: "visible"}
    ]);


    function btnViewAction(e) {
        e.preventDefault()
        document.getElementById("myDropdownAction").classList.toggle("show");
    }

    function btnViewUser(e) {
        e.preventDefault()
        document.getElementById("myDropdownUser").classList.toggle("show");
    }

    function handlerRiseHand(e){
        e.preventDefault()
        console.log("handRise")
    }

    function handlerLogout(e){
        e.preventDefault()
        console.log("logout")
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
                    <button onClick={btnViewAction} className="dropbtn">Actions</button>
                    <div id="myDropdownAction" className="dropdown-content"
                        onClick={handlerRiseHand}>
                        <div>Raise hand up</div>
                    </div>
                </div>

                <div className="dropdown-user">
                    <button onClick={btnViewUser} className="dropbtn">{items[0].userName}</button>
                    <div id="myDropdownUser" className="dropdown-content"
                    onClick={handlerLogout}>
                        <div>Logout</div>
                    </div>
                </div>
            </div>

            <div className="table-style">
                {items.map(value => <RowTable item={value} key={value.id}/>)}
            </div>
        </div>
    );
};

export default MainWindow;