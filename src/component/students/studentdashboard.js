import React from 'react';
import GenericComponent from '../generic.js';
import {Route,Link, BrowserRouter as Router } from "react-router-dom";
import Header2 from '../Header2.js';
import Footer from '../Footer.js';
import StudentAdmission from './admission.js';
import StudentsList from'./students.js';
import StudentAcdemics from './studentAcademics.js';


class StudentDashboard extends GenericComponent{

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
                            <a class="nav-link" href="/students/admission"><i className="fa fa-user  text-warning"> </i> New Admission</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/students/list"><i className="fa fa-users fa-1x text-info"> </i> Students</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/students/studentAcademics"><i className="fa fa-briefcase fa-1x text-primary"> </i> Student Academics</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/students/attandance"><i className="fa fa-clock-o fa-1x text-warning"> </i> Attendance</a>
                        </li>

                        <li class="dropdown-divider"></li>
                        <li class="nav-item">
                            <a href="#" onClick={this.logout}  className="nav-link  " > <i className="fa fa-power-off text-danger"> </i> Logout</a>
                        </li>
                        </ul>
                    </div>

                    <div id="main" className="text-center">
                        <Route path="/students/admission" component={StudentAdmission}/>    
                        <Route path="/students/list" component={StudentsList}/>    
                        <Route path="/students/studentAcademics" component={StudentAcdemics}/>            
                    </div>    
            <Footer/>                
        </div>);
    }

}
export default StudentDashboard;