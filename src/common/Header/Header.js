import React,{ Component } from "react";
import AppBar from '@material-ui/core/AppBar';  
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import '../Header/Header.css'
import LogoName from '../../assets/logo.svg'
import { Button } from "@material-ui/core";
import Login from "../../screens/Login/Login";





function Header(){



    return(    
     <div className="Header">
      <img  className="logo" src={LogoName} alt="logo"/>  
     
    <span style={{float:"right"}} > 
     <Login/>
      </span>
    </div>

      

    );

}

export default Header;