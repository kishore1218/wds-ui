import React from 'react';
import QuickLink from './QuickLink.js';
import Header2 from '../Header2.js';
import Footer from '../Footer.js';
import {Link,BrowserRouter as Router,Route} from "react-router-dom";
import jwt from 'jwt-decode';

import * as ApiUtils from '../api.js';
import GenericComponent from '../generic.js';

class HomeLinks extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            modules: [],
        }
        let token=localStorage.getItem('auth-token');      
        let decoded = jwt(token);   
        this.getUserModules(decoded.role);
    }

    getUserModules=(roleId)=>{
        let p = ApiUtils.get('/admin/roleModules/'+roleId,this.props);
  
      p.then((response)=>{
          return  response.json();
      }).then((json)=>{
              this.setState({
                  modules:json
              })         
      }).catch((error)=>{
          alert('System Error');
      });

   }
    render(){

        return(<div>
                <div className="container-fluid" >
                <div className="row">
                    <div className="page-header">
                        <h1>Quick Links</h1>
                    </div>
                </div>
            <div className="container">	
                 <div className="row"> 
                    { this.state.modules.map((module) => (
                         <QuickLink path={module.path} paneltype={module.desc} quicklink={""+module.name} classtype={""+module.icon}/>   
                     ))}
            
                    </div>
            </div>      
            </div>        
        </div>);
    }
}

export default HomeLinks;

