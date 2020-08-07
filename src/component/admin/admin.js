import React from 'react';
import GenericComponent from '../generic';
import Header2 from '../Header2.js';
import Footer from '../Footer.js';
import {Route,Link, BrowserRouter as Router } from "react-router-dom";
import Role from './role.js';
import RoleModules from './rolemodules';
import Disciplines from './discipline';
import AcademicYear from './academicyear';
import AClass from './academicclass';
import AcademicDisciplineClass from './academicdisiplineclass';
import SyllabusUpload from './syllabus.js';


class AdminDashboard extends GenericComponent{

    constructor(props){
        super(props);
    }

    render(){

        return(<div>
                    <Header2 history={this.props.history}/>
                    <div className="page-header ">
                        <h1 >Admin</h1>
                    </div> 
                    <div id="mySidenav" className="sidenav">
                        <a href="#" className="closebtn" onClick={()=>{this.closeNav()}}>&times;</a>

                        <ul class="nav flex-column">
                        <li class="dropdown-divider"></li>
                        <li class="nav-item">
                            <Link to="/dashboard/home"  className="nav-link "><i className="fa fa-home fa-1x text-success"> </i> Home</Link>
                        </li>
                        <li class="dropdown-divider"></li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/academicYears"><i className="fa fa-calendar text-warning"> </i>  Academic Year</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/disciplines"><i className="fa fa-graduation-cap  text-info"> </i> Disciplines</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/syllabus"><i className="fa fa-book  text-success"> </i> Syllabus</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/academicClasses"><i className="fa fa-th-large  text-danger"> </i> Classes</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/academicDispClasses"><i className="fa fa fa-cubes  text-info"> </i> Academic Class</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/roles"><i className="fa fa-snowflake-o  text-warning"> </i> Roles</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/roleModules"><i className="fa fa-sitemap fa-1x text-primary"> </i> Role Modules</a>
                        </li>
                        
                        <li class="dropdown-divider"></li>
                        <li class="nav-item">
                            <a href="#" onClick={this.logout}  className="nav-link  " > <i className="fa fa-power-off text-danger"> </i> Logout</a>
                        </li>
                        </ul>
                    </div>

                    <div id="main" className="text-center">                    
                            <Route path="/admin/roles"  component={Role}/> 
                            <Route path="/admin/roleModules"  component={RoleModules}/>
                            <Route path="/admin/disciplines" component={Disciplines}/>
                            <Route path="/admin/academicYears" component={AcademicYear}/>
                            <Route path="/admin/academicClasses" component={AClass}/>
                            <Route path="/admin/academicDispClasses" component={AcademicDisciplineClass}/>
                            <Route path="/admin/syllabus" component={SyllabusUpload}/>
                    </div>                      
                <Footer/>
        </div>)
    }
}

export default AdminDashboard;