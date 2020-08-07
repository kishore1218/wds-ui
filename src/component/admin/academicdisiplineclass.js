import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';
import '../../nn.css';


class AcademicDisciplineClass extends GenericComponent{

    academics=[];

    constructor(props){
        super(props);
        this.state={
            acadispclasses:[],
            allClases:[],
            disciplines:[],
            academicyears:[],
            enable:false,
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
         }
        this.getDisciplines();
        this.getAllClasses();
        this.getAcademicYears();
    }
    enableDisableUnAssign=(flag)=>{
        this.setState({
            enable:flag
        })
    }
    getAcademicYears = ()=> {

        let p = ApiUtils.get('/admin/academicYears',this.props);
        p.then((response)=>{
        return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    academicyears:json,
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

    getAllClasses = ()=> {

        let p = ApiUtils.get('/admin/academicClasses',this.props);
        p.then((response)=>{
        return  response.json();
        }).then((json)=>{
            if(json){
                this.academics=json; 
            }  
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
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
                var unassignaca = JSON.parse(JSON.stringify(this.academics));
                var count = Object.keys(json).length;
                for(var j = 0; j < unassignaca.length; j++) {
                    for(var i = 0; i < count; i++) {
                        if(json[i].classId == unassignaca[j].id) {
                            unassignaca.splice(j, 1);
                           j--;
                           break;
                        }
                    }
                }
                this.setState({
                        allClases:unassignaca
                    }
                );                
                this.setState({
                    acadispclasses:json
                });
            }
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }
    
    addAcademic=()=>{
        var dispId = document.getElementById("disciplines").value;
        var yearId = document.getElementById("acaYears").value;
        var checkedacas = document.querySelectorAll('#academics input[type="checkbox"]:checked');        

        for (var i = 0; i < checkedacas.length; i++){   
            let object = {};

            object['acaYearId']=yearId;
            object['classId']=checkedacas[i].id;
            object['dispId']=dispId;

            var data = JSON.stringify(object);

            let p=ApiUtils.post('/admin/acaDispClass',data,this.props);
            p.then((response)=>{
                this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,});
            this.getAssignAcademics();
            }).catch((error)=>{
                this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
            });
        }
    }

    deleteAcademicDiscipline=(id)=>{

        let p = ApiUtils.remove('/wdsportal/admin/acaDispClasses/'+id,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Deleted successfully!",isError:false,isMsg:true,});            
            this.getAssignAcademics();
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
        return(

            <div> 
                <div className="page-header">
                    <h2>Academic Discipline Configuration</h2>
                    <hr/>
                </div> 
                {errorbutton}{infobutton} 

                
                <div class="form-row">
                    <div class="col-4 ">
                        <div className="form-group">
                        <label  for="port"><h6>Academic Years:</h6></label>
                        <select className="form-control"  id="acaYears" required>
                        <option key="NA" value="-1">Select</option>
                            {
                                this.state.academicyears.map((ayear) => (
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

                                    <div class="col-2 "> 
                                        <div className="form-group">
                                        <label  >   .</label>
                                        <button type="button" class="form-control btn btn-info" onClick={()=>{this.getAssignAcademics()}}>Search</button>
                                        </div>
                                    </div>

                            <hr/>

                                <div class="btn-block pull-right">
                                <button type="button" className="btn btn-success pull-right" onClick={()=>{this.enableDisableUnAssign(true)}}><i class="fa fa-plus" aria-hidden="true"></i> </button>
                                </div>
                                <br/><br/>
                                                   
                            <table className="table">
                                        <thead class="thead-light">
                                        <tr>                                        
                                            <th>Year</th>
                                            <th>Discipline</th>
                                            <th>Class</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody class="text-primary">
                                        {this.state.acadispclasses.map((item) => (
                                        <tr>
                                        <td><h6>{item.period}</h6></td>
                                        <td><h6>{item.discipline}</h6></td>
                                        <td><h6>{item.acaClass}</h6></td>
                                        <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>{this.deleteAcademicDiscipline(item.id)}} ><i className="fa fa-trash text-danger" ></i></button></div></td>
                                        </tr>
                                        ))}
                                    </tbody>
                        </table> 

                        <div class="col-md-12  mt-2">
                           {this.state.enable? <div className="card">
                            <div class="card-header bg-dark text-white">
                                <h6 class="mb-0">Un Assigned Classes</h6>
                            </div> 
                            <div className="card-body">
                                <div  className="form-check-inline" id="academics">
                                    {this.state.allClases.map((entry)=>(                   
                                        <h6><label className="form-check-label form-control text-dark"><input  class="form-check-input " type="checkbox" key={entry.id} name={entry.name} id={entry.id}/>{entry.name}</label></h6>
                                    )) }
                                </div>
<br/>
                                <div  className="form-check-inline" >
                                    <button type="button" className="form-check-label form-control btn btn-info align-right" onClick={this.addAcademic}>Assign</button>
                                    <button type="button" className="form-check-label form-control btn btn-success" onClick={()=>{this.enableDisableUnAssign(false)}}>Close</button>
                                </div>
                            </div>
                        </div>:<div></div>}              
                        </div>
                    </div>
        </div>
        );
    }
}

export default AcademicDisciplineClass;