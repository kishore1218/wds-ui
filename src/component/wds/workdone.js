import React from 'react';
import GenericComponent from '../generic';
import Header2 from '../Header2.js';
import Footer from '../Footer.js';
import {Route,Link, BrowserRouter as Router } from "react-router-dom";
import NewWorkdone from './createworkdone';
import WorkdoneList from'./workdonelist';

class WorkdoneDashboard extends GenericComponent{

    constructor(props){
        super(props);
    }

    render(){

        return(<div>
                    <Header2 history={this.props.history}/>
                    <div className="page-header ">
                        <h1 >Workdone </h1>
                    </div> 

                    
                    <div id="mySidenav" className="sidenav bg-dark">
                        <a href="#" className="closebtn" onClick={()=>{this.closeNav()}}>&times;</a>

                        <ul class="nav flex-column">
                        <li class="dropdown-divider"></li>
                        <li class="nav-item">
                            <Link to="/dashboard/home"  className="nav-link "><i className="fa fa-home fa-1x text-success"> </i> Home</Link>
                        </li> 
                         <li class="dropdown-divider"></li>
                        <li class="nav-item">
                            <a class="nav-link" href="/workdone/createWordone"><i className="fa fa-calendar-plus-o text-warning"> </i> New</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/workdone/workdoneList"><i className="fa fa-calendar  text-primary"> </i> Submitted</a>
                        </li>
                        <li class="dropdown-divider"></li>
                        <li class="nav-item">
                            <a href="#" onClick={this.logout}  className="nav-link  " > <i className="fa fa-power-off text-danger"> </i> Logout</a>
                        </li>
                        </ul>
                    </div>

                    <div id="main" className="text-center">                    
                            <Route path="/workdone/createWordone"  component={NewWorkdone}/> 
                            <Route path="/workdone/workdoneList"  component={WorkdoneList}/>

                    </div>                      
                <Footer/>
        </div>)
    }
}

export default WorkdoneDashboard;