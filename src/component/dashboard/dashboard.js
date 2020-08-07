import React from 'react';
import QuickLink from './QuickLink.js';
import Header2 from '../Header2.js';
import Footer from '../Footer.js';
import {Link,BrowserRouter as Router,Route} from "react-router-dom";
import jwt from 'jwt-decode';

import * as ApiUtils from '../api.js';
import GenericComponent from '../generic.js';
import HomeLinks from './home.js';
import UserProfile from './userprofile.js';
import PasswordRest from './resetpassword.js';

class Dashboard extends GenericComponent{

    constructor(props){
        super(props);
        let token=localStorage.getItem('auth-token');      
        let decoded = jwt(token);   
     }

    render(){
        return(
        <div>

            <Header2 history={this.props.history}/>
            <div className="container-fluid" >

                <div id="mySidenav" className="sidenav">
                    <a href="#" className="closebtn" onClick={()=>{this.closeNav()}}>&times;</a>

                    <ul class="nav flex-column">
                    <li class="nav-item">
                            <Link to="/dashboard/home"  className="nav-link "><i className="fa fa-home fa-1x text-success"> </i> Home</Link>
                        </li>
                        <li class="dropdown-divider"></li>
                        <li class="nav-item">
                            <Link to="/dashboard/profile"  className="nav-link "><i className="fa fa-user fa-1x text-primary"> </i> Profile</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/dashboard/resetPwd"  className="nav-link "><i className="fa fa-key fa-1x text-warning"> </i> Reset Password</Link>
                        </li>
                        <li class="dropdown-divider"></li>
                        <li class="nav-item">
                        <a href="#" onClick={this.logout}  className="nav-link  " > <i className="fa fa-power-off text-danger"> </i> Logout</a>
                        </li>
                    </ul>
                </div>
                <div id="main" className="text-center">                    
                        <Route path="/dashboard/home"  component={HomeLinks}/>    
                        <Route path="/dashboard/profile"  component={UserProfile}/>  
                        <Route path="/dashboard/resetPwd"  component={PasswordRest}/>  
                </div>    
 
            </div>
            <Footer/>        
                
        </div>
        )
    }
}
export default Dashboard;