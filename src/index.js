import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Home from './component/Home.js';
import Login from './component/Login.js';
import Header from "./component/Header.js";
import Footer from "./component/Footer.js";
import AdminDashboard from './component/admin/admin.js';
import UserDashboard from './component/users/users.js';
import WorkdoneDashboard from './component/wds/workdone.js';
import SupervisorDashboard from './component/supervisor/supervisorDashboard.js';
import ReportDashboard from './component/reports/report.js';
import Dashboard from './component/dashboard/dashboard.js';
import StudentDashboard from './component/students/studentdashboard.js';
import SessionExpiredComponent from './component/sessionerror.js';
class Appn extends React.Component {

  constructor(props){
    super(props);
    this.state={
      usertype:""
    }
           
  }
  
    render() {
      return (      
        <Router>
            <div>
                <div>
                  <Route path="/" exact component={Home}/>
                  <Route path="/dashboard"  component={Dashboard}/>   
                  <Route path="/login" component={Login} />
                  <Route path="/admin" component={AdminDashboard} />
                  <Route path="/users" component={UserDashboard}/>
                  <Route path="/workdone" component={WorkdoneDashboard}/>
                  <Route path="/supervisor" component={SupervisorDashboard}/>
                  <Route path="/reports" component={ReportDashboard}/>
                  <Route path="/students" component={StudentDashboard}/>
                  <Route path="/sessionerror" component={SessionExpiredComponent}/>
                </div>
          </div>
       </Router>
      );
    }
  }
  ReactDOM.render(<Appn />,document.getElementById("root"));
