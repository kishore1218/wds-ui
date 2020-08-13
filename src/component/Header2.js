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
{/* <nav class="navbar navbar-expand-md navbar-light bg-light">
        <a href="#" class="navbar-brand">
            <img src={logo} height="128" alt="CoolBrand"/>
        </a>
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav">
                <a href="#" class="nav-item nav-link active">Home</a>
                <a href="#" class="nav-item nav-link">Profile</a>
                <a href="#" class="nav-item nav-link">Messages</a>
                <a href="#" class="nav-item nav-link disabled" tabindex="-1">Reports</a>
            </div>
            <div class="navbar-nav ml-auto">
                <a href="#" class="nav-item nav-link">Login</a>
            </div>
        </div>
    </nav> */}



                    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
                        {/* <a class="navbar-brand" href="#"><h2><img src={logo} className="" alt="logo" />TSWR Fine Arts</h2></a> */}
                        <img class="navbar-brand" src={logo} alt="logo"/><h2 className="text-white">TSWR Fine Arts School</h2>
                        <ul class="navbar-nav ml-auto text-white">
                            <li class="nav-item">
                                 <Link to="/dashboard/home"  className="nav-link text-white"><i className="fa fa-home fa-2x text-success"> </i> Home</Link>
                            </li>
                            <li class="nav-item">
                                <a className="nav-link text-white" href="#"><span className="fa fa-user fa-2x text-warning"> </span> {this.state.username}</a>
                            </li> 
                            <li class="nav-item">
                            <a className="nav-link text-white" href="#" onClick={()=>this.openNav()}><span class="fa fa-bars fa-2x text-primary" ></span></a>
                            </li>
                        </ul>
                    </nav>
                    <br/>
               </div>
        )
    }
}
export default Header2;