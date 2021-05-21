import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className="Toolbar">
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <Logo className="Logo"/>
        <nav className="DesktopOnly">
            <NavigationItems isAuth={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;