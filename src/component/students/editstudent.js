import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';


class EditStudent extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false,
            student:{}
        }

        this.getStudent(props.location.state.studId);

    }

    getStudent=(id)=>{
        let p = ApiUtils.get('/academics/student/'+id,this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
                this.setState({
                    student:json
                })   
  
        }).catch((error)=>{
            alert('System Error');
        });

  }
    handleSubmit=(event)=>{
        event.preventDefault();
        let object = {};
        for(var i=0;i<event.target.elements.length;i++){
             var ele=event.target.elements[i];
             if(ele.value!=""){
                 if(ele.type=='radio'){
                    if(ele.checked){
                        object[ele.name] = ele.value;
                    }                    
                }else{
                    object[ele.name] = ele.value;
                }                 
             }
         } 
         var data = JSON.stringify(object);
         let p=ApiUtils.put('/academics/student',data,this.props);
         p.then((response)=>{
            this.setState({infoMsg:"Saved Student  successfully!",isError:false,isMsg:true,});  
            alert('Saved Student  successfully!');
            this.golink("/students/list",{}) ;
         })
         .catch((error)=>{
            this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
         });         
    }

    handleChange=(event)=>{
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        const stud = this.state.student;    
        stud[name] = event.target.value;
        this.setState({
            employee: stud 
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
                            <h3 class="mb-0">Student Details</h3>
                        </div>
                      
                        <div class="card-body">
                            <form class="form" role="form" id="sudform" onSubmit={this.handleSubmit} >
                            <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Date of Joining:</label>
                                    <div class="col-lg-9">
                                        <input type="date" className="form-control" name="doj" id="doj" placeholder="dd/mm/yyyy" disabled value={this.state.student.doj}/> 
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Student Id:</label>
                                    <div class="col-lg-9">
                                        <input type="text" className="form-control" name="studId" id="studId" value={this.state.student.studId} disabled/> 
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">First name</label>
                                    <div class="col-lg-6">
                                        <input type="text" className="form-control" name="firstName" id="firstName" placeholder="First name" required value={this.state.student.firstName} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Last name</label>
                                    <div class="col-lg-6">
                                    <input type="text" className="form-control" name="lastName" id="lastName" placeholder="SurName" required value={this.state.student.lastName} onChange={this.handleChange}/>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">S/o </label>
                                    <div class="col-lg-6">
                                    <input type="text" className="form-control" name="gaurdian" id="gaurdian" placeholder="Gaurdian" value={this.state.student.gaurdian} onChange={this.handleChange}/>
                                    </div>
                                </div>

                                 <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Email</label>
                                    <div class="col-lg-9">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Email" value={this.state.student.email} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Mobile</label>
                                    <div class="col-lg-9">
                                    <input type="mobile" className="form-control"  name="mobile" id="mobile" placeholder="### ### ####" value={this.state.student.mobile} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Date of Birth:</label>
                                    <div class="col-lg-9">
                                        <input type="date" className="form-control" name="dob" id="dob" placeholder="dd/mm/yyyy" value={this.state.student.dob} onChange={this.handleChange}/> 
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Gender </label>
                                    {/* <div class="col-lg-9"> */}
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="gender1" name="gender" class="custom-control-input" value="Male" checked={this.state.student.gender==='Male'} onChange={this.handleChange} />
                                            <label class="custom-control-label" for="gender1">Male</label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="gender2" name="gender" class="custom-control-input" value="female" checked={this.state.student.gender==='female'} onChange={this.handleChange}/>
                                            <label class="custom-control-label" for="gender2">Female</label>
                                        </div>
                                    {/* </div> */}
                                </div>
                                <hr class="my-5"/>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Aadhar</label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control"  name="aadhar" id="aadhar" placeholder="##########" value={this.state.student.aadhar} onChange={this.handleChange}/>
                                    </div>
                                </div>
                    
                                

                                
                                <hr class="my-5"/>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Address</label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control" name="addrLine1" id="addrLine1" placeholder="Street Address" value={this.state.student.addrLine1} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control" name ="city" id="city" placeholder="City"  value={this.state.student.city} onChange={this.handleChange}/> 
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control" name="state" id="state" placeholder="State" value={this.state.student.state} onChange={this.handleChange}/>  
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <input type="text" className="form-control" name="country" id="country" placeholder="Country" value={this.state.student.country} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-9">
                                    <input type="number" className="form-control" name="zipCode" id="zipCode" placeholder="Zipcode" value={this.state.student.zipCode} onChange={this.handleChange}/>
                                    </div>
                                </div>  
                                <hr class="my-5"/>

                

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

export default EditStudent;