import * as React from 'react';
import './components.css';

const Button = ({ text }) => {
    return (
        <button className='button'>
            {text}
        </button>
    );
}

export default Button;