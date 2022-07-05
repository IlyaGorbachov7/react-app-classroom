import React, {useState} from 'react';
import btnCross from "./img/btn-cross.png";
import hand from "./img/hand.png";
import "./csses/RowTable.css"

const RowTable = ({item, statusCurUser,remove}) => {

    function btnDeleteItem(e) {
        e.preventDefault()
        console.log(item.id)
        remove(item)
    }

    return (
        <div className="row-content">
            <div className="content-name">
                {item.userName}
            </div>
            <div className="content-action">

                <button className="btn-style" type="button"
                        style={{visibility: ((statusCurUser === true) ? "visible" : "hidden")}}>
                    <img src={btnCross} className="img-btn-style"
                         onClick={btnDeleteItem}/>
                </button>

                <img src={hand} className="img-style"
                     style={{visibility: (item.isHand === true) ? "visible" : "hidden"}}/>
            </div>
        </div>
    );
};

export default RowTable;