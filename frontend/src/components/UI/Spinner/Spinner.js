import React from 'react'

import './Spinner.css'
import Backdrop from '../Backdrop/Backdrop'

const Spinner = () => {
    return (
        <React.Fragment>
            <Backdrop show/>
            <div id="spinner" className="loader">Loading...</div>
        </React.Fragment>
    )
}

export default Spinner;