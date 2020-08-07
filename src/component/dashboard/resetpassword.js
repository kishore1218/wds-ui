import React from 'react';
import QuickLink from './QuickLink.js';
import Header2 from '../Header2.js';
import Footer from '../Footer.js';
import {Link,BrowserRouter as Router,Route} from "react-router-dom";
import jwt from 'jwt-decode';

import * as ApiUtils from '../api.js';
import GenericComponent from '../generic.js';

class PasswordRest extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false,
        }
       
    }

    resetPassword=()=>{
        let object = {};
        var userId =localStorage.getItem('userId');  
        object['empId']=userId;
        object['password']=document.getElementById('password').value;
        var data = JSON.stringify(object);   

        ApiUtils.post('/accounts/resetpwd',data,this.props).then(res=>{
            this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,});
        }).catch(error=>{
            this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
        });
            }

    render(){

        const isError=this.state.isError;
        const isMsg=this.state.isMsg;
        let errorbutton;
        let infobutton;
        if(isError){
            errorbutton=<div className="alert alert-danger"><strong>{this.state.errormsg}</strong></div> ;
        };
        if(isMsg){
            infobutton=<div className="alert alert-success"><strong>{this.state.infoMsg}</strong></div> ;
        };
        return(<div>
            <div className="container-fluid" >
                <div className="row">
                    <div className="page-header">
                        <h1>Reset Password</h1>
                    </div>
                </div>
                <hr/>
                {errorbutton}{infobutton} 
            <div className="container">	
  
                        <div className="form-group" >
                            <label htmlFor="password"><span className="glyphicon glyphicon-user"></span> Password</label>
                            <input type="password" id="password" className="form-control" name="password" required/>
                        </div>
                        <div className="form-group">
			                <button type="submit"   className="btn btn-info btn-block" onClick={this.resetPassword}>Submit</button>
		                </div>
                </div>
                </div>
        </div>);
    }
}
export default PasswordRest;