import { Button } from "@material-ui/core";
import React from "react";
import LogoName from '../../assets/logo.svg'
import Login from "../Login/Login";
import './Details.css'

function Details(){



    return(    
     <div className="Details">
      <img  className="logo" src={LogoName} alt="logo"/>  
    <span tyle={{float:"right"}}>
        <Button color="primary" variant="contained">Book Show</Button>
        </span> 
    <span style={{float:"right"}} > 
     <Login/>
      </span>
    </div>

      

    );

}
export default Details;