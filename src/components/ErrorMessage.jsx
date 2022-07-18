import React from 'react';

const ErrorMessage = ({errorMessage}) => {
    return (
        <span style={{fontSize: "14px", color: "red"}}>
           {errorMessage.name.length > 0 ?
               <div>{errorMessage.name}</div> : <div>{errorMessage.internalError}</div>
           }
        </span>
    );
};

export default ErrorMessage;