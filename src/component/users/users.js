import React from 'react';
import GenericComponent from '../generic.js';
import {Route,Link, BrowserRouter as Router } from "react-router-dom";
import Header2 from '../Header2.js';
import Footer from '../Footer.js';
import NewUser from './newuser.js';
import UserList from './userslist.js';
import FacultyAcdemics from './facultyacademics.js';
import EditUser from './edituser.js';

class UserDashboard extends GenericComponent{

constructor(props){

    super(props);
}


    render(){
        return(<div>
            <Header2 history={this.props.history}/>

                    <div id="mySidenav" className="sidenav">
                        <a href="#" className="closebtn" onClick={()=>{this.closeNav()}}>&times;</a>

                        <ul class="nav flex-column">
                        <li class="dropdown-divider"></li>
                        <li class="nav-item">
                            <Link to="/dashboard/home"  className="nav-link "><i className="fa fa-home fa-1x text-success"> </i> Home</Link>
                        </li>
                        <li class="dropdown-divider"></li>
                        <li class="nav-item">
                            <a class="nav-link" href="/users/new"><i className="fa fa-user  text-warning"> </i> Create Faculty</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/users/userslist"><i className="fa fa-users fa-1x text-info"> </i> Faculties</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/users/facultyAcademics"><i className="fa fa-briefcase fa-1x text-primary"> </i> Faculty Academics</a>
                        </li>
                        <li class="dropdown-divider"></li>
                        <li class="nav-item">
                            <a href="#" onClick={this.logout}  className="nav-link  " > <i className="fa fa-power-off text-danger"> </i> Logout</a>
                        </li>
                        </ul>
                    </div>

                    <div id="main" className="text-center">                    
                            <Route path="/users/new"  component={NewUser}/> 
                            <Route path="/users/userslist"  component={UserList}/>
                            <Route path="/users/facultyAcademics" component={FacultyAcdemics}/>
                            <Route path="/users/editUser" component={EditUser}/>
                    </div>    
            <Footer/>                
        </div>);
    }

}
export default UserDashboard;