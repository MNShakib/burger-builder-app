import React from 'react';
import './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxi from '../../../hoc/Auxi';

const sideDrawer = (props) => {
    let attachedClasses = ["Close","SideDrawer"];
    if(props.open){
        attachedClasses = ["Open","SideDrawer"];
    }
    return (
        <Auxi>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(" ")} onClick={props.closed}>
                    <Logo height="11%"/>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Auxi>
    )
}

export default sideDrawer;