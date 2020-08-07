import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';


class UserProfile extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            errormsg:'',
            infoMsg:'',
            employee:{},
            isError: false,
            isMsg:false,
        }
        var userId =localStorage.getItem('userId');  
        this.getEmployee(userId);
    }

    getEmployee = (empId)=> {

        let p = ApiUtils.get('/accounts/user/'+empId,this.props);
        p.then((response)=>{
        return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    employee:json,
                }) ;
            }    
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
        return p;
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
        return(
        <div> 
                {errorbutton}{infobutton} 
                <div className="container-fluid" >
                <div className="row">
                    <div className="page-header">
                        <h1>User Profile</h1>
                    </div>
                </div>
                <hr/>

                    <div className="container">

                    <table className="table table-borderless text-left ">
                                                <tbody>
                                                    <tr><td >EmpId</td><td> <h6>: {this.state.employee.empId}</h6></td></tr>
                                                    <tr><td>Date of Joining</td><td> <h6>: {this.state.employee.doj}</h6></td></tr>
                                                    <tr><td>First name</td><td> <h6>: {this.state.employee.firstName}</h6></td></tr>
                                                    <tr><td>Last name</td><td> <h6>: {this.state.employee.lastName}</h6></td></tr>
                                                    <tr><td>Email</td><td> <h6>: {this.state.employee.email}</h6></td></tr>
                                                    <tr><td>Mobile</td><td> <h6>: {this.state.employee.mobile}</h6></td></tr>
                                                    <tr><td>Date of Birth</td><td> <h6>: {this.state.employee.dob}</h6></td></tr>
                                                    <tr><td>Date of Gender</td><td> <h6>: {this.state.employee.gender}</h6></td></tr>
                                                    <tr><td>PAN</td><td> <h6>: {this.state.employee.pan}</h6></td></tr>
                                                    <tr><td>Qualification</td><td> <h6>: {this.state.employee.qualification}</h6></td></tr>
                                                    <tr><td>Designation</td><td> <h6>: {this.state.employee.designation}</h6></td></tr>
                                                    <tr><td>Is Supervisor</td><td> <h6>: {this.state.employee.isSupervisor}</h6></td></tr>
                                                    <tr><td>Supervisor Id</td><td> <h6>: {this.state.employee.supervisor}</h6></td></tr>
                                                    <tr><td>Employee Type</td><td> <h6>: {this.state.employee.employmentType}</h6></td></tr>
                                                    <tr><td>Address</td><td> <h6>: {this.state.employee.addrLine1},{this.state.employee.addrLine1},{this.state.employee.city},{this.state.employee.state},{this.state.employee.zipCode}</h6></td></tr>
                                                </tbody>

                                                </table>
                    </div>

               </div>
        </div>);
    }
}

export default UserProfile;