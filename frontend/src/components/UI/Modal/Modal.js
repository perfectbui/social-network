import React from 'react'

import Aux from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'
import './Modal.css'

const modal = (props) => {
    return (
        <Aux>
            <Backdrop show = {props.show} />
            <div className="modal">
                {props.children}
            </div>
        </Aux>
    )
}