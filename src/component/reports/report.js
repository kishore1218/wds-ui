import React from 'react';
import GenericComponent from '../generic';
import Header2 from '../Header2.js';
import Footer from '../Footer.js';
import {Route,Link, BrowserRouter as Router } from "react-router-dom";
import WdsReport from './wdsreport';
import StudentReport from './studentreport';


class ReportDashboard extends GenericComponent{

    constructor(props){
        super(props);
    }

    render(){

        return(<div>
                    <Header2 history={this.props.history}/>
                    <div className="page-header ">
                        <h1 >Reports </h1>
                    </div> 

                    
                    <div id="mySidenav" className="sidenav bg-dark">
                        <a href="#" className="closebtn" onClick={()=>{this.closeNav()}}>&times;</a>

                        <ul class="nav flex-column">
                        <li class="nav-item">
                            <Link to="/dashboard/home"  className="nav-link "><i className="fa fa-home fa-1x text-success"> </i> Home</Link>
                        </li>
                        <li class="dropdown-divider"></li>
                        <li class="nav-item">
                            <a class="nav-link" href="/reports/wdsreport"><i className="fa fa-bar-chart text-danger"> </i> Wds Report</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/reports/students"><i className="fa fa-users  text-info"> </i> Students Report</a>
                        </li>

                        </ul>
                    </div>

                    <div id="main" className="text-center">                    
                            <Route path="/reports/wdsreport"  component={WdsReport}/> 
                            <Route path="/reports/students"  component={StudentReport}/>
                    </div>                      
                <Footer/>
        </div>)
    }
}

export default ReportDashboard;