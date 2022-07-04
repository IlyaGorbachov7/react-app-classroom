import React from 'react';
import btnCross from "./img/btn-cross.png";
import hand from "./img/hand.png";

const RowTable = ({item, status, ...props}) => {

    return (
        <div  style={{width:'100%', display:"flex", border :"2px solid"}}>
            <div style={{float: "left"}}>
                {item.userName}
            </div>
            <div style={{visibility:status, alignItems:"end", margin:"auto", marginRight:"inherit", border:"2px solid blue"}}>
                <button type="button"><img src={btnCross} className="img-btn-style"/></button>
                <img src={hand} alt="" className="img-style"/>
            </div>
        </div>
    );
};

export default RowTable;