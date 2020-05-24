import React from 'react';

const Button = (props) => {

    return (
        <div className="buttonContainer">
            <button onClick={props.handler}>{props.text}</button>
        </div>
    );
}

export default Button;