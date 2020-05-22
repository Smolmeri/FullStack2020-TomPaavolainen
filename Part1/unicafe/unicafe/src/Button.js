import React from 'react';
import './Button.css';

const Button = ({handleClick, text, color}) => {

    return (
    <button className={color} onClick={handleClick}>
        {text}
    </button>
    );
    
}

export default Button;