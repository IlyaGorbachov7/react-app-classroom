import React from 'react';
import btnCross from "./img/btn-cross.png";
import hand from "./img/hand.png";
import "./csses/RowTable.css"

const RowTable = ({item}) => {

    return (
        <div className="row-content">
            <div className="content-name">
                {item.userName}
            </div>
            <div className="content-action">
                <button className="btn-style" type="button">
                    <img src={btnCross} className="img-btn-style"/>
                </button>

                <img src={hand} className="img-style"/>
            </div>
        </div>
    );
};

export default RowTable;