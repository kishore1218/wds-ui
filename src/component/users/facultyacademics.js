import React from 'react';
import GenericComponent from '../generic.js';
import * as ApiUtils from '../api.js';

class FacultyAcdemics extends GenericComponent{

    constructor(props){
        super(props);
        this.state={

            faculties:[],
            disciplines:[],
            acaYears:[],
            disAcademics:[],
            facultyAcademics:[],
            enable:false,
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
        }
        this.getEmployees();
        this.getDisciplines();
        this.getAcademicYears();
    }

    enableDisableUnAssign=(flag)=>{
        this.setState({
            enable:flag
        })
    }

    getEmployees = ()=> { 

        let p = ApiUtils.get('/accounts/employees',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
                this.setState({
                    faculties:json
                })         
        }).catch((error)=>{
            alert('System Error');
        });
    }
    getAcademicYears = ()=> {

        let p = ApiUtils.get('/admin/activeacademicYears',this.props);
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
    getDisciplines = ()=> {

        let p = ApiUtils.get('/admin/disciplines',this.props);
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

    getAssignedFacultyAcademics=()=>{

        var facultyId = document.getElementById("faculties").value;

        let p = ApiUtils.get('/accounts/facultyAcademics/'+facultyId,this.props);

        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    facultyAcademics:json
                }) ;
            }
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    getUnAssAcademics = ()=> { 

        var dispId = document.getElementById("disciplines").value;
        var yearId = document.getElementById("academicYears").value;
        var facultyId = document.getElementById("faculties").value;

        let p = ApiUtils.get('/accounts/unassignedAcademics/'+yearId+"/"+dispId+"/"+facultyId,this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{            
            if(json){                
                this.setState({
                    disAcademics:json
                });
            }
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }
    
    addFacultyAcademic=()=>{
        var facultyId = document.getElementById("faculties").value;
        var checkedacas = document.querySelectorAll('#academics input[type="checkbox"]:checked');

        for (var i = 0; i < checkedacas.length; i++){   

            let object={};
            object['facultyId']=facultyId;
            object['acdDispClassId']=checkedacas[i].id;
            var data = JSON.stringify(object);

            let p = ApiUtils.post('/accounts/facultyAcademic',data,this.props);
            p.then((response)=>{
                this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,}); 
                this.getAssignedFacultyAcademics();
            }).catch((error)=>{
                this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
            });
        }
    }

    deleteFacultyAcademic=(facultyAcamedicId)=>{

        let p = ApiUtils.remove('/accounts/facultyAcademic/'+facultyAcamedicId,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Deleted successfully!",isError:false,isMsg:true,});
            this.getAssignedFacultyAcademics();
        }).catch((error)=>{
            this.setState({errormsg:"Error In Deletion..!",isError:true,isMsg:false,}); 
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
                    <h2>Faculty Academics</h2>
                    <hr/>
                </div> 
                {errorbutton}{infobutton}

                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Faculties</label>
                                    <div class="col-lg-4">
                                    <select className="form-control"  id="faculties" name="faculties" onChange={this.getAssignedFacultyAcademics}>
                                        <option key="-1" value="-1">Select</option>
                                        {
                                            this.state.faculties.map((faculty) => (
                                                <option key={faculty.id} value={faculty.id}>{faculty.firstName} {faculty.lastName}</option>
                                            ))
                                        }
                    </select>
                </div>
                </div>

                <div class="btn-block pull-right">
                    <button type="button" className="btn btn-success pull-right" onClick={()=>{this.enableDisableUnAssign(true)}}><i class="fa fa-plus" aria-hidden="true"></i> </button>
                 </div>
                 <br/><br/>
                <table className="table">
                                        <thead class="thead-light">
                                        <tr>                                        
                                            <th>Discipline</th>
                                            <th>Class</th>
                                            <th>Period</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody class="text-primary">
                                        {this.state.facultyAcademics.map((item) => (
                                        <tr>
                                        <td><h6>{item.discipline}</h6></td>
                                        <td><h6>{item.acaClass}</h6></td>
                                        <td><h6>{item.academicYear}</h6></td>
                                        <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>{this.deleteFacultyAcademic(item.id)}} ><i className="fa fa-trash text-danger" ></i></button></div></td>
                                        </tr>
                                        ))}
                                    </tbody>
                        </table> 

                
        {this.state.enable?<div className="card">
                            <div class="card-header bg-dark text-info">
                                <h6 class="mb-0">Un Assigned Classes</h6>
                            </div> 
                            <div className="card-body">
                            <div class="form-row">
                                    <div class="col-4 ">
                                        <div className="form-group">
                                        <label  for="port"><h6>Academic Years:</h6></label>
                                        <select className="form-control"  id="academicYears" name="academicYears">
                                        <option key="NA" value="-1">Select</option>
                                            {
                                                this.state.acaYears.map((ayear) => (
                                                    <option key={ayear.id} value={ayear.id}>{ayear.period}</option>
                                                ))
                                            }
                                        </select>
                                        </div> 
                                    </div>
                                    <div class="col-4 ">
                                            <div className="form-group">
                                            <label  for="port"><h6>Disciplines:</h6></label>
                                            <select className="form-control" id="disciplines">
                                            <option key="NA" value="-1">Select</option>
                                                {
                                                    this.state.disciplines.map((discipline) => (
                                                        <option key={discipline.id} value={discipline.id}>{discipline.name}</option>
                                                    ))
                                                }
                                            </select>
                                            </div> 
                                    </div>

                                    <div class="col-4 "> 
                                        <div className="form-group">
                                        <label  for="port">   .</label>
                                        <button type="button" class="form-control btn btn-info" onClick={()=>{this.getUnAssAcademics()}}>Search</button>
                                        </div>
                                    </div>
                            </div>

                           <hr/>


                                <div  className="form-check-inline" id="academics">
                                    {this.state.disAcademics.map((entry)=>(                   
                                         <h6><label className="form-check-label form-control text-dark"><input  class="form-check-input " type="checkbox" key={entry.id} name={entry.acaClass} id={entry.id}/>{entry.acaClass}</label></h6>
                                    )) }
                                </div>

                                <div  className="form-check-inline" >
                                    <button type="button" className="form-check-label form-control btn btn-info align-right" onClick={this.addFacultyAcademic}>Assign</button>
                                    <button type="button" className="form-check-label form-control btn btn-success" onClick={()=>{this.enableDisableUnAssign(false)}}>Close</button>
                                </div>
                            </div>
                    </div>:<div></div>}

        </div>);
    }
}

export default FacultyAcdemics;