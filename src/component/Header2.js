import React from "react";
import {  Link } from 'react-router-dom';
import GenericComponent from "./generic.js";
import * as ApiUtils from "./api.js";
import '../nn.css';
import logo from '../tswr_logo.svg';
import '../App.css';

class Header2 extends GenericComponent{

    constructor(props){
        super(props);      
        this.state={username: localStorage.getItem('user')};
     }

    logout=()=>{
        localStorage.removeItem('auth-token');
        localStorage.removeItem('refreshtoken');
        this.golink('/login');  
    }

     openNav=()=> {
        if(document.getElementById("mySidenav")){
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        }
      }
      


    render(){
        return(
                <div>
                    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
                        <a class="navbar-brand" href="#"><h2><img src={logo} className="App-logo" alt="logo" />TSWR Fine Arts</h2></a>
                        <ul class="navbar-nav ml-auto text-white">
                            <li class="nav-item">
                                 <Link to="/dashboard/home"  className="nav-link text-white"><i className="fa fa-home fa-1x text-success"> </i> Home</Link>
                            </li>
                            <li class="nav-item">
                                <a className="nav-link text-white" href="#">{this.state.username} <span className="fa fa-user "> </span></a>
                            </li> 
                            <li class="nav-item">
                            <a className="nav-link text-white" href="#" onClick={()=>this.openNav()}><span class="fa fa-bars" ></span></a>
                            </li>
                        </ul>
                    </nav>
                    <br/>
               </div>
        )
    }
}
export default Header2;