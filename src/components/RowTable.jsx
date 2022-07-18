import React from 'react';
import btnCross from "./img/btn-cross.png";
import imgHand from "./img/hand.png";
import "./csses/RowTable.css"
import ClassRoomService from "../API/ClassRoomService";

const RowTable = ({item, statusCurUser, sendQueryToGetList}) => {

    async function btnDeleteItem(e) {
        e.preventDefault()
        try {
            await ClassRoomService.removeById(item.id)
            sendQueryToGetList()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="row-content">
            <div className="content-name">
                {item.name}
            </div>
            <div className="content-action">

                <button className="btn-style" type="button"
                        style={{visibility: ((statusCurUser === true) ? "visible" : "hidden")}}>
                    <img src={btnCross} className="img-btn-style" alt="image btn"
                         onClick={btnDeleteItem}/>
                </button>

                <img src={imgHand} className="img-style" alt="image hand"
                     style={{visibility: (item.hand === true) ? "visible" : "hidden"}}/>
            </div>
        </div>
    );
};

export default RowTable;