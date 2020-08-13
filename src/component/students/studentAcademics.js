import React from 'react';
import GenericComponent from '../generic.js';
import * as ApiUtils from '../api.js';

class StudentAcdemics extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            enable:false,
            studentAcademics:[],
            allAcademics:[],
            studClasses:[],
            student:{},
            enableInfo:false,
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
        }
        this.allAcademics();
        this.getStudentClasses();
    }

    getStudent=(studId)=>{
        this.setState({
            enableInfo:false
        }) 

        let p = ApiUtils.get('/academics/student/'+studId,this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
                this.setState({
                    student:json,
                    enableInfo:true
                })         
        }).catch((error)=>{
            alert('System Error');
        });

  }

    getStudentAcademics=()=>{        

        var studId = document.getElementById("studentId").value;

        this.getStudent(studId);

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
    getStudentClasses = ()=> {

        let p = ApiUtils.get('/academics/studClasses',this.props);
        p.then((response)=>{
        return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    studClasses:json,
                }) ;
            }  
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }
    enableDisableUnAssign=(flag)=>{
        this.setState({
            enable:flag
        })
    }


    allAcademics=()=>{

        let p = ApiUtils.get('/academics/allAcademics',this.props);

        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    allAcademics:json
                }) ;
            }
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    addStudentAcademics=()=>{
        var studId = document.getElementById("studentId").value;

        var acadispId=document.getElementById("academicclass").value;
        var sclassId=document.getElementById("studClasses").value;

        
        let object={};
        object['studId']=studId;
        object['acdDispClassId']=acadispId;
        object['studentClassId']=sclassId;
        var data = JSON.stringify(object);

        let p = ApiUtils.post('/academics/studentAcademic',data,this.props);
            p.then((response)=>{
                this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,}); 
                this.getStudentAcademics();
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
        return(<div>

                <div className="page-header">
                    <h2>Student Academics</h2>
                    <hr/>
                </div> 
                {errorbutton}{infobutton}
                <center>
        <div className="input-group col-md-4 ">
            <input class="form-control py-2 border-right-0 border" type="search" placeholder="Student Id" name="student" id="studentId"/>

            <span class="input-group-append">
              <button class="btn btn-outline-secondary border-left-0 border" type="button"  onClick={()=>{this.getStudentAcademics()}}>
                    <i class="fa fa-search"></i>
              </button>
            </span>
        </div>

                 <hr/>

                 {this.state.enableInfo?
                
                        <table className="text-center text-success">
                          
                             <tr><td>Student Id:</td><td>{this.state.student.studId}</td><td>Name: </td><td>{this.state.student.firstName} {this.state.student.lastName} </td></tr>
                        </table>:<div></div>}
                        </center>
                 <div class="btn-block pull-right">
                    <button type="button" className="btn btn-success pull-right" onClick={()=>{this.enableDisableUnAssign(true)}}><i class="fa fa-plus" aria-hidden="true"></i> </button>
                 </div>
                 <br/><br/>
                <table className="table">
                                        <thead class="thead-light">
                                        <tr>                                        
                                            <th>Discipline</th>
                                            <th>Class</th>
                                            <th>Student Class</th>
                                            <th>Period</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody class="text-primary">
                                        {this.state.studentAcademics.map((item) => (
                                        <tr>
                                        <td><h6>{item.discipline}</h6></td>
                                        <td><h6>{item.acaClass}</h6></td>
                                        <td><h6>{item.studentClass}</h6></td>
                                        <td><h6>{item.academicYear}</h6></td>
                                        <td><h6>{item.status}</h6></td>
                                        <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>{this.deleteFacultyAcademic(item.id)}} ><i className="fa fa-trash text-danger" ></i></button></div></td>
                                        </tr>
                                        ))}
                                    </tbody>
                </table>   

                {this.state.enable?<div className="card">
                            <div class="card-header bg-dark text-info">
                                <h6 class="mb-0">Assign Academics</h6>
                            </div> 
                            <div className="card-body">

                            <div class="form-group row">
                                <label class="col-lg-3 col-form-label form-control-label">Academic Classes:</label>
                                    <div class="col-lg-6">
                                    <select className="form-control"  id="academicclass" name="academicclass">
                                        <option key="NA" value="-1">Select</option>
                                            {
                                                this.state.allAcademics.map((academic) => (
                                                    <option key={academic.id} value={academic.id}>{academic.discipline}-{academic.acaClass}({academic.period})</option>
                                                ))
                                            }
                                        </select>
                                    </div>                       
                            </div>
                            <div class="form-group row">
                                <label class="col-lg-3 col-form-label form-control-label">Student Classes:</label>
                                    <div class="col-lg-6">
                                    <select className="form-control"  id="studClasses" name="studClasses">
                                        <option key="NA" value="-1">Select</option>
                                            {
                                                this.state.studClasses.map((sclass) => (
                                                    <option key={sclass.id} value={sclass.id}>{sclass.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>                       
                            </div>

                           <hr/>

                                <div  className="form-check-inline" >
                                    <button type="button" className="form-check-label form-control btn btn-info align-right" onClick={this.addStudentAcademics}>Assign</button>
                                    <button type="button" className="form-check-label form-control btn btn-success" onClick={()=>{this.enableDisableUnAssign(false)}}>Close</button>
                                </div>
                            </div>
                    </div>:<div></div>}

        </div>);
    }
}

export default StudentAcdemics;