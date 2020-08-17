import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';


class EditUser extends GenericComponent{

    employee={};
    constructor(props){
        super(props);
        this.state={
            errormsg:'',
            infoMsg:'',
            employee:{},
            isError: false,
            isMsg:false,
            roles:[],
            supervisors:[],
            sRoleId:-1,
            sSupId:-1
        }
        this.getEmployee(props.location.state.empId);
        this.getRoles();
        this.getSupervisors();
    }
    

    getEmployee = (empId)=> {

        let p = ApiUtils.get('/accounts/user/'+empId,this.props);
        p.then((response)=>{
        return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    employee:json,
                    sRoleId:json.role.roleId,
                    sSupId:json.supervisor
                }) ;
            }    
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
        return p;
    }

    setValue=(itemId,value)=>{
        let index=0;
        var ele= document.getElementById("role");
        alert(value);
        for (var i=0; i<ele.options.length; i++){
            alert(ele.options[i].value );
            if (ele.options[i].value == value){
                alert(i);
                ele.selectedIndex = i;
                break;
            }
          }
    }

    getRoles = ()=> {

        let p = ApiUtils.get('/admin/roles',this.props);
        p.then((response)=>{
        return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    roles:json,
                }) ;
            }    
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
        return p;
    }

    getSupervisors = ()=> {

        let p = ApiUtils.get('/accounts/supervisors',this.props);
        p.then((response)=>{
        return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    supervisors:json,
                }) ;
            }    
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
        return p;
    }

   handleChange=(event)=>{
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const emp = this.state.employee;    
    emp[name] = event.target.value;
    this.setState({
        employee: emp 
    });    
   }

    handleSubmit=(event)=>{
        event.preventDefault();
        let object = {};
        for(var i=0;i<event.target.elements.length;i++){
             var ele=event.target.elements[i];
             if(ele.value!=""){
                if(ele.name=='role'){
                    let role={};
                    role['roleId'] =ele.value;
                    object['role']=role;       
                    // object['roleId']=ele.value;          
                }else if(ele.type=='radio'){
                    if(ele.checked){
                        object[ele.name] = ele.value;
                    }                    
                }else{
                    object[ele.name] = ele.value;
                }                 
             }
         } 
         var data = JSON.stringify(object);
         let p=ApiUtils.put('/accounts/employee',data,this.props);
         p.then((response)=>{
            this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,});   
            this.golink("/users/userslist",{}) ;
         }).catch((error)=>{
            this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
         });         
    }

    handleRoleChange=(event)=>{
        const selectedValue = event.target.value;
        this.setState({
            sRoleId: selectedValue
        });
    }

    handleSupervisorChange=(event)=>{
        const selectedValue = event.target.value;
        this.setState({
            sSupId: selectedValue
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
        return(
        <div> 

                {errorbutton}{infobutton} 
                <div class="card card-outline-secondary">
                        <div class="card-header bg-info text-white">
                            <h3 class="mb-0">Edit User </h3>
                        </div>
                      
                        <div class="card-body">
                            <form class="form" role="form" onSubmit={this.handleSubmit} >
                            <input type="hidden" name="id" value={this.state.employee.id}/>
                            <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Employee Id:</label>
                                    <div class="col-lg-9">
                                        <input type="text" className="form-control" name="empId" id="empId" value={this.state.employee.empId} disabled/> 
                                    </div>
                                </div>
                            <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Date of Joining:</label>
                                    <div class="col-lg-9">
                                        <input type="date" className="form-control" name="doj" id="doj" value={this.state.employee.doj} placeholder="dd/mm/yyyy" disabled/> 
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">First name</label>
                                    <div class="col-lg-6">
                                        <input type="text" className="form-control" name="firstName" id="firstName" placeholder="First name" value={this.state.employee.firstName} required onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Last name</label>
                                    <div class="col-lg-6">
                                    <input type="text" className="form-control" name="lastName" id="lastName" placeholder="SurName" value={this.state.employee.lastName} required onChange={this.handleChange}/>
                                    </div>
                                </div>

                                 <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Email</label>
                                    <div class="col-lg-9">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Email" value={this.state.employee.email} required onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Mobile</label>
                                    <div class="col-lg-9">
                                    <input type="mobile" className="form-control"  name="mobile" id="mobile" placeholder="### ### ####" value={this.state.employee.mobile} required onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Date of Birth:</label>
                                    <div class="col-lg-9">
                                        <input type="date" className="form-control" name="dob" id="dob" placeholder="dd/mm/yyyy" value={this.state.employee.dob} required onChange={this.handleChange}/> 
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Gender </label>
                                    {/* <div class="col-lg-9"> */}
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="gender1" name="gender" class="custom-control-input" value="Male" checked={this.state.employee.gender==='Male'} onChange={this.handleChange}/>
                                            <label class="custom-control-label" for="gender1">Male</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="gender2" name="gender" class="custom-control-input" value="female" checked={this.state.employee.gender==='female'} onChange={this.handleChange}/>
                                            <label class="custom-control-label" for="gender2">Female</label>
                                        </div>
                                    {/* </div> */}
                                </div>
                                <hr class="my-5"/>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">PAN</label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control"  name="pan" id="pan" value={this.state.employee.pan} placeholder="##########" required onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Qualification</label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control"  name="qualification" id="qualification" value={this.state.employee.qualification} placeholder="Qualification" required onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Designation</label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control"  name="designation" id="designation" value={this.state.employee.designation} placeholder="Designation" required onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Role</label>
                                    <div class="col-lg-9">
                                    <select className="form-control"  id="role" name="role" value={this.state.sRoleId} required  >
                                        <option key="-1" value="">None</option>
                                        {
                                            this.state.roles.map((role) => (
                                                <option key={role.roleId} value={role.roleId}>{role.name}</option>
                                            ))
                                        }
                                    </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Is Supervisor </label>
                                    {/* <div class="col-lg-9"> */}
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="isSupervisor1" name="isSupervisor" class="custom-control-input" value="Y" checked={this.state.employee.isSupervisor==='Y'} onChange={this.handleChange}/>
                                            <label class="custom-control-label" for="isSupervisor1">Yes</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="isSupervisor2" name="isSupervisor" class="custom-control-input" value="N" checked={this.state.employee.isSupervisor==='N'} onChange={this.handleChange}/>
                                            <label class="custom-control-label" for="isSupervisor2">No</label>
                                        </div>
                                    {/* </div> */}
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Supervisor</label>
                                    <div class="col-lg-9">
                                    <select className="form-control"  id="supervisor" name="supervisor" value={this.state.employee.supervisor} onChange={this.handleChange}>
                                        <option key="-1" value="-1">Select</option>
                                        {
                                            this.state.supervisors.map((sup) => (
                                                <option key={sup.id} value={sup.id}>{sup.firstName} {sup.lastName}</option>
                                            ))
                                        }
                                    </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Employee Type </label>
                                    {/* <div class="col-lg-9"> */}
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="employmentType1" name="employmentType" class="custom-control-input" value="Permanent" checked={this.state.employee.employmentType==='Permanent'} onChange={this.handleChange}/>
                                            <label class="custom-control-label" for="employmentType1">Permanent</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="employmentType2" name="employmentType" class="custom-control-input" value="Outsourcing" checked={this.state.employee.employmentType==='contractor'} onChange={this.handleChange}/>
                                            <label class="custom-control-label" for="employmentType2">Out Sourcing</label>
                                        </div>
                                    {/* </div> */}
                                </div>
                                <hr class="my-5"/>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Address</label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control" name="addrLine1" id="addrLine1" value={this.state.employee.addrLine1} placeholder="Street Address" required onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control" name ="city" id="city" placeholder="City" required value={this.state.employee.city} onChange={this.handleChange}/> 
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control" name="state" id="state" placeholder="State" required value={this.state.employee.state} onChange={this.handleChange}/>  
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control" name="country" id="country" placeholder="Country" required value={this.state.employee.country} onChange={this.handleChange}/>
                                    </div>
                                </div>r
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <input type="number" className="form-control" name="zipCode" id="zipCode" placeholder="Zipcode" required value={this.state.employee.zipCode} onChange={this.handleChange}/>
                                    </div>
                                </div>  
                                <hr class="my-5"/>
                                {/* <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Credentials</label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control" name="userName" id="userName" placeholder="User Name" />
                                    </div>
                                </div> */}
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <input type="password" className="form-control" name ="defaultPassword" id="password" placeholder="Default Password" /> 
                                    </div>
                                </div>
                

                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                        <input type="submit" class="btn btn-info" value="Submit"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
        </div>);
    }
}

export default EditUser;