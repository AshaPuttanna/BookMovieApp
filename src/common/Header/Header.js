import React,{ Component } from "react";
import '../Header/Header.css'
import LogoName from '../../assets/logo.svg'
import Login from "../../screens/Login/Login";





function Header(){
return(    
      <div className="Header">
        <img className="logo" src={LogoName} alt="logo" />

        <span style={{ float: "right" }} >
          <Login />
        </span>
      </div>
 );

}

export default Header;