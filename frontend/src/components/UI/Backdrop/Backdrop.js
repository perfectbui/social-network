import React from 'react'

import './Backdrop.css'

const backDrop = (props) => {
    return props.show ? <div className="backdrop" onClick={props.click}></div>: null
}

export default backDrop;