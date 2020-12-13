import React,{useState} from 'react'

import Aux from '../../hoc/Auxiliary'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import BackDrop from '../../components/UI/Backdrop/Backdrop'
import './Layout.css'

const Layout = (props) => {

    const [openSearch,setOpenSearch] = useState(false);

    const openSearchHandler = () => {
        console.log("haha")
        setOpenSearch(true);
    }

    const closeOpenSearchHandler = () => {
        setOpenSearch(false);
    }

    return (
        <div className="layout">
            <BackDrop show={openSearch} click={closeOpenSearchHandler}/>
            <Toolbar search={openSearchHandler}/>
            <main>
            {props.children}
            </main>
        </div>
    )
}

export default Layout;