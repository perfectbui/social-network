import React from 'react'

import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import './Toolbar.css'

const toolbar = (props) => {
    return (
        <header>
           <div className="toolbar">
                <Logo />
                <div className="search"><i className="fas fa-search"/><input placeholder="Search" onFocus={props.search}/></div>
                <NavigationItems/>
           </div>
        </header>
    )
}

export default toolbar;