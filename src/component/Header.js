import React from "react";
import ReactDOM from "react-dom";
import {  Link } from 'react-router-dom';
import logo from '../tswr_logo.svg';
import '../App.css';

const Header=()=>{
    return(<div>


<div>

    
                    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
                    <img class="navbar-brand" src={logo} alt="logo"/><h2 className="text-white">TSWR Fine Arts School</h2>
                        {/* <a class="navbar-brand d-lg-none" href="#"><h2><img src={logo} className="App-logo " alt="logo" />TSWR Fine Arts</h2></a> */}
                        <ul class="navbar-nav ml-auto text-white">
                            <li class="nav-item">
                             <a class="nav-link text-white" href="/login">Login <i class="fa fa-sign-in" aria-hidden="true"></i></a>
                            </li>
                            {/* <li class="nav-item">
                            <li><Link to="/login"><span className="glyphicon glyphicon-log-in "></span>  Login</Link></li>
                            </li> */}

                        </ul>
                    </nav>
               </div>
        </div>);
};

export default Header;


