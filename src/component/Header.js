import React from "react";
import ReactDOM from "react-dom";
import {  Link } from 'react-router-dom';

const Header=()=>{
    return(<div>


<div>
                    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
                        <a class="navbar-brand" href="#"><h2><i class="fa fa-users fa-2x text-warning" aria-hidden="true"></i> TSWR Fine Arts</h2></a>
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


