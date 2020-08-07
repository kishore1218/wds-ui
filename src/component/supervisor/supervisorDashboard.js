import React from 'react';
import GenericComponent from '../generic';
import Header2 from '../Header2.js';
import Footer from '../Footer.js';
import {Route,Link, BrowserRouter as Router } from "react-router-dom";
import ReviewWds from './reviewwds';

class SupervisorDashboard extends GenericComponent
{

    constructor(props){
        super(props);
    }

    render(){
        return(<div>
            <Header2 history={this.props.history}/>

                <div className="page-header">
                        <h2>Supervisor:</h2>
                        <hr/>
                </div> 
                <div id="mySidenav" className="sidenav">
                        <a href="#" className="closebtn" onClick={()=>{this.closeNav()}}>&times;</a>

                        <ul class="nav flex-column">
                        <li class="dropdown-divider"></li>
                        <li class="nav-item">
                            <Link to="/dashboard/home"  className="nav-link "><i className="fa fa-home fa-1x text-success"> </i> Home</Link>
                        </li>
                        {/* <li class="dropdown-divider"></li> */}
                        {/* <li class="nav-item">
                            <a class="nav-link" href="/supervisor/pendingwds"><i className="fa fa-calendar text-warning"> </i> Pending </a>
                        </li> */}
                        <li class="nav-item">
                            <a class="nav-link" href="/supervisor/reviewwds"><i className="fa fa-calendar-check-o  text-warning"> </i> Reviewed WDS</a>
                        </li>
                       
                        <li class="dropdown-divider"></li>
                        <li class="nav-item">
                            <a href="#" onClick={this.logout}  className="nav-link  " > <i className="fa fa-power-off text-danger"> </i> Logout</a>
                        </li>
                        </ul>
                    </div>

                    <div id="main" className="text-center">                    
                            {/* <Route path="/admin/roles"  component={Role}/>  */}
                            <Route path="/supervisor/reviewwds" component={ReviewWds}/>

                    </div>   
             <Footer/>
        </div>);
    }

}

export default SupervisorDashboard;
