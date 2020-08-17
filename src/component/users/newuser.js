import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';


class NewUser extends GenericComponent{

    constructor(){
        super();
        this.state={
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false,
            roles:[],
            supervisors:[]
        }
        this.getRoles();
        this.getSupervisors();
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
         let p=ApiUtils.post('/accounts/employee',data,this.props);
         p.then((response)=>{
            this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,});  
            this.golink("/users/userslist",{}) ;
         }).catch((error)=>{
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
        return(
        <div> 
            {/* <div class="page-header">
                 <h1>Patient Registration</h1>
            </div>         */}
                {errorbutton}{infobutton} 
                <div class="card card-outline-secondary">
                        <div class="card-header bg-info text-white">
                            <h3 class="mb-0">User Registration</h3>
                        </div>
                      
                        <div class="card-body">
                            <form class="form" role="form" onSubmit={this.handleSubmit} >
                            <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Date of Joining:</label>
                                    <div class="col-lg-9">
                                        <input type="date" className="form-control" name="doj" id="doj" placeholder="dd/mm/yyyy" required/> 
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">First name</label>
                                    <div class="col-lg-6">
                                        <input type="text" className="form-control" name="firstName" id="firstName" placeholder="First name" required/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Last name</label>
                                    <div class="col-lg-6">
                                    <input type="text" className="form-control" name="lastName" id="lastName" placeholder="SurName" required/>
                                    </div>
                                </div>

                                 <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Email</label>
                                    <div class="col-lg-9">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Email" required/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Mobile</label>
                                    <div class="col-lg-9">
                                    <input type="mobile" className="form-control"  name="mobile" id="mobile" placeholder="### ### ####" required/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Date of Birth:</label>
                                    <div class="col-lg-9">
                                        <input type="date" className="form-control" name="dob" id="dob" placeholder="dd/mm/yyyy" required/> 
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Gender </label>
                                    {/* <div class="col-lg-9"> */}
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="gender1" name="gender" class="custom-control-input" value="M" />
                                            <label class="custom-control-label" for="gender1">Male</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="gender2" name="gender" class="custom-control-input" value="F"/>
                                            <label class="custom-control-label" for="gender2">Female</label>
                                        </div>
                                    {/* </div> */}
                                </div>
                                <hr class="my-5"/>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">PAN</label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control"  name="pan" id="pan" placeholder="##########" required/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Qualification</label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control"  name="qualification" id="qualification" placeholder="Qualification" required/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Designation</label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control"  name="designation" id="designation" placeholder="Designation" required/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Role</label>
                                    <div class="col-lg-9">
                                    <select className="form-control"  id="role" name="role" required>
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
                                            <input type="radio" id="isSupervisor1" name="isSupervisor" class="custom-control-input" value="Y"/>
                                            <label class="custom-control-label" for="isSupervisor1">Yes</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="isSupervisor2" name="gender" class="custom-control-input" value="N"/>
                                            <label class="custom-control-label" for="isSupervisor2">No</label>
                                        </div>
                                    {/* </div> */}
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Supervisor</label>
                                    <div class="col-lg-9">
                                    <select className="form-control"  id="supervisor" name="supervisor">
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
                                            <input type="radio" id="employmentType1" name="employmentType" class="custom-control-input" value="Permanent"/>
                                            <label class="custom-control-label" for="employmentType1">Permanent</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="employmentType2" name="employmentType" class="custom-control-input" value="Outsourcing"/>
                                            <label class="custom-control-label" for="employmentType2">Outsourcing</label>
                                        </div>
                                    {/* </div> */}
                                </div>
                                <hr class="my-5"/>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Address</label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control" name="addrLine1" id="addrLine1" placeholder="Street Address" required/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control" name ="city" id="city" placeholder="City" required /> 
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control" name="state" id="state" placeholder="State" required/>  
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control" name="country" id="country" placeholder="Country" required/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <input type="number" className="form-control" name="zipCode" id="zipCode" placeholder="Zipcode" required/>
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
                                    <input type="password" className="form-control" name ="defaultPassword" id="password" placeholder="Default Password" required/> 
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

export default NewUser;