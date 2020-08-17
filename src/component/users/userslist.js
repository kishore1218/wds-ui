import React from 'react';
import GenericComponent from '../generic.js';
import * as ApiUtils from '../api.js';

class UserList  extends GenericComponent {

    constructor(props){
        super(props);
        this.state={
            data: [],
            employee:[],
            role:{},
            disableEmp:'',
            lwd:''
        }
        this.getEmployees();
    }

    
    captureId=(id)=>{

        this.setState({
            disableEmp:id
        })
    }
    handleLwd=(event)=>{
        this.setState({ lwd: event.target.value });
    }
    getEmployees = ()=> { 

        let p = ApiUtils.get('/accounts/employees',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
                this.setState({
                    data:json
                })         
        }).catch((error)=>{
            alert('System Error');
        });
    }

    editEmployee=(id)=>{
        this.golink("/users/editUser",{"empId":id});
    }  
      

    deleteEmployee=()=>{

        if (confirm("Confirm Disable!")) {

                var id=this.state.disableEmp;
                var lwd=this.state.lwd;
                    let p = ApiUtils.remove('/accounts/disableEmp/'+id+"/"+lwd,this.props);
                    p.then((response)=>{
                        this.getEmployees();
                        this.setState({infoMsg:"Deleted successfully!",isError:false,isMsg:true,});   
                    }).catch((error)=>{
                        this.setState({errormsg:"Error In Deletion..!",isError:true,isMsg:false,}); 
                    });
        }
    }

    viewUser=(id)=>{
            let p = ApiUtils.get('/accounts/user/'+id,this.props);
            p.then((response)=>{
                return  response.json();
            }).then((json)=>{
                    this.setState({
                        employee:json,
                        role:json.role
                    })         
            }).catch((error)=>{
                alert('System Error');
            });

      }


    render(){
        return(
            <div>
            <div className="page-header">
                <h1>Users List</h1>
                <hr/>
             </div> 
             <div class="modal" id="empdisablemodal">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Disable Employee</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                                Last working day: <input type="date" name="lwd" onChange={this.handleLwd}/>          
                        </div>

                        <div class="modal-footer">                            
                            <button type="button" class="btn btn-danger" onClick={()=>{this.deleteEmployee()}} data-dismiss="modal">Submit</button>                                                      
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                        </div>
                    </div>
                    </div>

             <div class="modal" id="myModal">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">User: </h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">

                             <table className="table table-borderless text-left">

                                    <tbody>
                                        <tr><td >EmpId</td><td> <h6>: {this.state.employee.empId}</h6></td></tr>
                                        <tr><td>Date of Joining</td><td> <h6>: {this.state.employee.doj}</h6></td></tr>
                                        <tr><td>First name</td><td> <h6>: {this.state.employee.firstName}</h6></td></tr>
                                        <tr><td>Last name</td><td> <h6>: {this.state.employee.lastName}</h6></td></tr>
                                        <tr><td>Email</td><td> <h6>: {this.state.employee.email}</h6></td></tr>
                                        <tr><td>Mobile</td><td> <h6>: {this.state.employee.mobile}</h6></td></tr>
                                        <tr><td>Date of Birth</td><td> <h6>: {this.state.employee.dob}</h6></td></tr>
                                        <tr><td>Gender</td><td> <h6>: {this.state.employee.gender}</h6></td></tr>
                                        <tr><td>PAN</td><td> <h6>: {this.state.employee.pan}</h6></td></tr>
                                        <tr><td>Qualification</td><td> <h6>: {this.state.employee.qualification}</h6></td></tr>
                                        <tr><td>Designation</td><td> <h6>: {this.state.employee.designation}</h6></td></tr>
                                        <tr><td>Role</td><td> <h6>: {this.state.role.name}</h6></td></tr>
                                        <tr><td>Is Supervisor</td><td> <h6>: {this.state.employee.isSupervisor}</h6></td></tr>
                                        <tr><td>Supervisor Id</td><td> <h6>: {this.state.employee.supervisorName}({this.state.employee.supervisor})</h6></td></tr>
                                        <tr><td>Employee Type</td><td> <h6>: {this.state.employee.employmentType}</h6></td></tr>
                                        <tr><td>Address</td><td> <h6>: {this.state.employee.addrLine1},{this.state.employee.addrLine1},{this.state.employee.city},{this.state.employee.state},{this.state.employee.zipCode}</h6></td></tr>
                                        <tr><td>Status</td><td> <h6>: {this.state.employee.status==='Y'?'Active':'Disabled '}</h6></td></tr>
                                   </tbody>

                             </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>                                                  
                        </div>

                        </div>
                    </div>
                    </div>

                <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Emp Id</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Gender</th>
                            <th>DOJ</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map((item) => (
                        <tr>
                        <td> {item.lastName} {item.firstName}</td><td>{item.empId}</td><td>{item.email}</td><td>{item.mobile}</td><td>{item.gender}</td><td>{item.doj}</td>
                        <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>{this.viewUser(item.empId)}} value={item.id} data-toggle="modal" data-target="#myModal"><i className="fa fa-eye text-primary" ></i></button></div>
                        <div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>{this.editEmployee(item.empId)}} value={item.id}><i className="fa fa-pencil-square-o text-success" ></i></button></div>
                        {item.status==='Y'?<div className="btn-group"><button className="btn btn-default btn-sm"  value={item.id}  onClick={()=>{this.captureId(item.empId)}} data-toggle="modal" data-target="#empdisablemodal"><i className="fa fa-trash text-danger" ></i></button></div>:<div></div>}</td>
                        </tr>
                    ))}
                        </tbody>
                </table>
        </div>
        );
    }
}

export default UserList;