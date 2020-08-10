import React from 'react';
import GenericComponent from '../generic.js';
import * as ApiUtils from '../api.js';

class StudentReport  extends GenericComponent {

    constructor(props){
        super(props);
        this.state={
            data: [],
            student:{},
            acaYears:[],
            classes:[],
            disciplines:[],
            studentAcademics:[]
        }        
        this.getAcademicYears();
        // this.getDisciplines();
    }

    download=()=>{

        var yearId=document.getElementById("academicYears").value;
        var dispId=document.getElementById("disciplines").value;
        var classId=document.getElementById("classes").value;

        let p = ApiUtils.get('/reports/studentReport/'+yearId+"/"+dispId+"/"+classId,this.props);
        p.then((response)=>{
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = "students.csv";
                a.click();
            });
    
        }).catch((error)=>{
            this.setState({errormsg:"Error In Download..!",isError:true,isMsg:false,}); 
        });
    }

        getAcademicYears = ()=> {

        let p = ApiUtils.get('/admin/academicYears',this.props);
        p.then((response)=>{
        return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    acaYears:json,
                }) ;
            }  
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    getClasses=()=>{

        var yearId=document.getElementById("academicYears").value;
        var dispId=document.getElementById("disciplines").value;
        let p = ApiUtils.get('/academics/academicClasses/'+yearId+"/"+dispId,this.props);
        p.then((response)=>{
        return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    classes:json,
                }) ;
            }  
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });

    }
    getDisciplines = ()=> {

        var yearId=document.getElementById("academicYears").value;
        let p = ApiUtils.get('/academics/disciplines/'+yearId,this.props);
        p.then((response)=>{
        return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    disciplines:json,
                }) ;
            }  
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }
    getStudents = ()=> { 
        var yearId=document.getElementById("academicYears").value;
        var dispId=document.getElementById("disciplines").value;
        var classId=document.getElementById("classes").value;

        let p = ApiUtils.get('/academics/students/'+yearId+"/"+dispId+"/"+classId,this.props);
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

    getUnassigendStudents = ()=> { 

        let p = ApiUtils.get('/academics/unassigendStudents',this.props);
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

    getAssignAcademics = ()=> { 

        var dispId = document.getElementById("disciplines").value;
        var yearId = document.getElementById("acaYears").value;

        let p = ApiUtils.get('/admin/acaDispClasses/'+yearId+"/"+dispId,this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{            
            if(json){                
                this.setState({
                        allClases:json
                    }
                );                

            }
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

      
    getStudentAcademics=(studId)=>{        

        let p = ApiUtils.get('/academics/studentAcademics/'+studId,this.props);

        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    studentAcademics:json
                }) ;
            }
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });

    }

    viewUser=(id)=>{
            let p = ApiUtils.get('/academics/student/'+id,this.props);
            p.then((response)=>{
                return  response.json();
            }).then((json)=>{
                    this.setState({
                        student:json
                    })   
             this.getStudentAcademics(id);      
            }).catch((error)=>{
                alert('System Error');
            });

      }
      editStudent=(id)=>{

      }

      deleteStudent=(id)=>{

    }

    render(){
        return(
            <div>
            <div className="page-header">
                <h1 >Students Report</h1>
                <hr/>
             </div> 

             <div class="btn-block pull-right">
                     <button type="button" className="btn btn-link pull-right" onClick={()=>{this.getUnassigendStudents()}}>Un Assigned List </button>
            </div>

             <div class="modal" id="myModal">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Student: </h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">

                             <table className="table table-borderless text-left">

                                    <tbody>
                                        <tr><td >Student Id</td><td> <h6>: {this.state.student.studId}</h6></td></tr>
                                        <tr><td>Date of Joining</td><td> <h6>: {this.state.student.doj}</h6></td></tr>
                                        <tr><td>First name</td><td> <h6>: {this.state.student.firstName}</h6></td></tr>
                                        <tr><td>Last name</td><td> <h6>: {this.state.student.lastName}</h6></td></tr>
                                        <tr><td>Gaurdian</td><td> <h6>: {this.state.student.gaurdian}</h6></td></tr>
                                        <tr><td>Email</td><td> <h6>: {this.state.student.email}</h6></td></tr>
                                        <tr><td>Mobile</td><td> <h6>: {this.state.student.mobile}</h6></td></tr>
                                        <tr><td>Date of Birth</td><td> <h6>: {this.state.student.dob}</h6></td></tr>
                                        <tr><td>Gender</td><td> <h6>: {this.state.student.gender}</h6></td></tr>
                                        <tr><td>Aadhar</td><td> <h6>: {this.state.student.aadhar}</h6></td></tr>                                       
                                        <tr><td>Address</td><td> <h6>: {this.state.student.addrLine1},{this.state.student.addrLine1},{this.state.student.city},{this.state.student.state},{this.state.student.zipCode}</h6></td></tr>
                                        <tr><td>Status</td><td> <h6>: {this.state.student.status==='Y'?'Active':'Disabled'}</h6></td></tr>
                                   </tbody>

                             </table>
                             <hr/>
                             <h4>Academics:</h4>
                             <hr/>

                             <table className="table">
                                        <thead class="thead-light">
                                        <tr>                                        
                                            <th>Discipline</th>
                                            <th>Class</th>
                                            <th>Period</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody class="text-primary">
                                        {this.state.studentAcademics.map((item) => (
                                        <tr>
                                        <td><h6>{item.discipline}</h6></td>
                                        <td><h6>{item.acaClass}</h6></td>
                                        <td><h6>{item.academicYear}</h6></td>
                                        <td><h6>{item.status}</h6></td>                                
                                        </tr>
                                        ))}
                                    </tbody>
                </table>   

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>                                                  
                        </div>

                        </div>
                    </div>
                    </div>


              <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">Academic Year:  </label>
                        <div class="col-lg-4">
                        <select className="form-control"  id="academicYears" name="academicYears" onChange={this.getDisciplines}>
                                        <option key="NA" value="-1">Select</option>
                                            {
                                                this.state.acaYears.map((ayear) => (
                                                    <option key={ayear.id} value={ayear.id}>{ayear.period}</option>
                                                ))
                                            }
                        </select>
                        </div>
            </div>

            <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">Disciplines:  </label>
                        <div class="col-lg-4">
                        <select className="form-control" id="disciplines" onChange={this.getClasses}>
                                            <option key="NA" value="-1">Select</option>
                                                {
                                                    this.state.disciplines.map((discipline) => (
                                                        <option key={discipline.id} value={discipline.id}>{discipline.name}</option>
                                                    ))
                                                }
                                            </select>
                        </div>
            </div>
            <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">Classes:  </label>
                        <div class="col-lg-4">
                        <select className="form-control" id="classes">
                                            <option key="NA" value="-1">Select</option>
                                                {
                                                    this.state.classes.map((clz) => (
                                                        <option key={clz.id} value={clz.id}>{clz.name}</option>
                                                    ))
                                                }
                                            </select>
                        </div>
            </div>
            <div class="form-group row">
                        <label  class="col-lg-3 col-form-label form-control-label"></label>
                              <div className="col-lg-2">                                      
                             <button type="button" class="form-control btn btn-info" onClick={()=>{this.getStudents()}}>Search</button>
                         
                         </div>
                 </div>
                 <hr/>



            <div class="btn-block pull-right">
                     <button type="button" className="btn btn-success pull-right" onClick={()=>{this.download()}}><i class="fa fa-file-excel-o" aria-hidden="true"> Report</i>  </button>
            </div>
             <br/><br/>

             

                <table className="table table-bordered table-stripped">
                        <thead class="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Student Id</th>
                            <th>Academic Year</th>
                            <th>Discipline</th>
                            <th>Class</th>
                            <th>Gender</th>
                            <th>DOJ</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map((item) => (
                        <tr>
                        <td> {item.lastName} {item.firstName}</td><td>{item.studId}</td><td>{item.acaYear}</td><td>{item.discipline}-{item.clazz}</td><td>{item.studClass}</td><td>{item.gender}</td><td>{item.doj}</td>
                        <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>{this.viewUser(item.studId)}} value={item.id} data-toggle="modal" data-target="#myModal"><i className="fa fa-eye text-primary" ></i></button></div>                        
                        </td>
                        </tr>
                    ))}
                        </tbody>
                </table>
        </div>
        );
    }
}

export default StudentReport;