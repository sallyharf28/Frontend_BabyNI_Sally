import React from 'react';  
import Logo from '.././img/YuvoLogo2.png'
import './Sidebar.css'

const Sidebar = () =>{
    return(
        <div className="Sidebar">
            {/*LOGO*/}
             <div className="logo" >
                <img src={Logo} alt="" />
                <span>
                      | <b> D<span>ashboard</span> </b>
                </span>
             </div>
        </div>
    )
}

export default Sidebar