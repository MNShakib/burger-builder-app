import React from 'react';
import burgerLogo from '../../assests/images/burger-logo.png';
import './Logo.css';

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={burgerLogo} alt="Logo"/>
    </div>
);

export default logo;