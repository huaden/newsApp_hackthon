import React, { useState } from 'react';
import './components.css';

const Button = ({ text }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button 
            className={`button ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {text}
        </button>
    );
}

export default Button;