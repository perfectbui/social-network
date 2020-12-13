import React from 'react'
import {NavLink} from 'react-router-dom'

import './NavigationItem.css'

const NavigationItem = (props) => {
    return (
        <NavLink className="navigation-item" exact to={props.link} activeClassName="active">
            <i className={props.icon}/>
            <span>{props.name}</span>
        </NavLink>
    )
}

export default NavigationItem;