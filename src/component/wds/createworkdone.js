import React from 'react';
import GenericComponent from '../generic.js';
import * as ApiUtils from '../api.js';

class NewWorkdone extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            facultyAcademics:[],
            wdsForDate:[],
            enable:false,
            nwdsenable:false,
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
        };
        this.facultyAssignAcademics();
    }

    enableDisableUnAssign=(flag)=>{
        this.setState({
            enable:flag
        })
    }
    
    facultyAssignAcademics=()=>{

        var facultyId =localStorage.getItem('userId');

        let p = ApiUtils.get('/accounts/facultyAssignAcademics/'+facultyId,this.props);

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

    

    fetchWDForSelectedDate=()=>{

        this.setState({
            enable:false
        })
        var date=document.getElementById("wdate").value;
         var facultyId =localStorage.getItem('userId');
         let p = ApiUtils.get('/workdone/workdone/'+facultyId+"/"+date,this.props); 
         p.then((response)=>{
             return  response.json();
         }).then((json)=>{
             if(json){
                 this.setState({
                    wdsForDate:json
                 }) ;
             }
         }).catch((error)=>{
             this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
         });
    }
    download=(fileName)=>{

        let p = ApiUtils.get('/admin/download/'+fileName,this.props);
        p.then((response)=>{
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.click();
            });
    
        }).catch((error)=>{
            this.setState({errormsg:"Error In Download..!",isError:true,isMsg:false,}); 
        });
    }
    createWds=()=>{

        let object={};

        let activityId=document.getElementById("activities").id;
        let activity=document.getElementById("activities").value;
        let hours=document.getElementById("hours").value;
        let syllabus=document.getElementById("syllabus").value;
        let comments=document.getElementById("comments").value;
        let date=document.getElementById("wdate").value;
        let facultyId=localStorage.getItem('userId');

        object['facultyId']=facultyId;
        object['activity']=activity;
        object['activitId']=activityId;
        object['hours']=hours;
        object['syllabus']=syllabus;
        object['comments']=comments;
        object['date']=date;

        var data = JSON.stringify(object);
        let p=ApiUtils.post('/workdone/workdone',data,this.props);
        p.then((response)=>{
           this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,});
           this.fetchWDForSelectedDate();
        }).catch((error)=>{
           this.setState({errormsg:"Error In Submission..!",isError:true,isMsg:false,}); 
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
                    <h2>Workdone Statement</h2>
                    <hr/>
                </div> 
                {errorbutton}{infobutton}
                <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"></label>
                        <div class="col-lg-6">
                        Choose Date: <input className="form-control" type="date" id="wdate" name="wdate" onChange={this.fetchWDForSelectedDate}/>
                        </div>                       
                </div>   

               
                <div class="btn-block pull-right">
                    <button type="button" className="btn btn-success pull-right" onClick={()=>{this.enableDisableUnAssign(true)}}><i class="fa fa-plus" aria-hidden="true"></i> </button>
                 </div>
                  <br/><br/>
                 <div class="card">
                    <div class="card-header bg-dark text-white"><h6 class="mb-0">Submitted For Selected Date:</h6></div>
                     <div class="body">
                         <br/><br/>
                         <div className="container">
                        <table className="table">
                                        <thead class="thead-light">
                                        <tr>               
                                        <th>Date</th>                         
                                            <th>Activity</th>
                                            <th>Hours</th>
                                            <th>Syllabus</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody class="text-primary">
                                        {this.state.wdsForDate.map((item) => (
                                        <tr>
                                        <td><h6>{item.date}</h6></td>
                                        <td>{item.activity}</td>
                                        <td>{item.hours}</td>                                        
                                        <td>{item.syllabus}</td>
                                        <td><h6 className="text-danger">{item.status}</h6></td>                                        
                                        </tr>
                                        ))}
                                    </tbody>
                        </table></div></div></div> 
                <br/><br/>
                {this.state.enable?
                <div class="card">
                    <div class="card-header bg-dark text-white"><h6 class="mb-0">New Workdone:</h6></div>
                    <div class="body">
                        <br/>
                        <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Activities:</label>
                                    <div class="col-lg-4">
                                    <select className="form-control"  id="activities" name="activities" required>
                                        <option key="" value="">None</option>
                                        {
                                            this.state.facultyAcademics.map((facademics) => (
                                                <option key={facademics.id} value={facademics.discipline +" "+ facademics.acaClass}>{facademics.discipline} {facademics.acaClass} ({facademics.academicYear} )</option>
                                            ))
                                        }
                            </select>
                        </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label form-control-label">Hours</label>
                                <div class="col-lg-6">
                                    <input type="number" id="hours" name="hours" className="form-control" required/>
                                </div>                       
                        </div>  
                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label form-control-label">Syllabus</label>
                                <div class="col-lg-6">
                                    <input type="text" id="syllabus" name="syllabus" className="form-control" required/>
                                </div>                       
                        </div> 
                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label form-control-label">Comments</label>
                                <div class="col-lg-6">
                                    <input type="text" id="comments" name="comments" className="form-control" required/>
                                </div>                       
                        </div> 

                        <div  className="form-check-inline" >
                                    <button type="button" className="form-check-label form-control btn btn-info align-right" onClick={this.createWds}>Submit</button>
                                    <button type="button" className="form-check-label form-control btn btn-success" onClick={()=>{this.enableDisableUnAssign(false)}}>Close</button>
                                </div>


                 </div>
                 <div className="card-footer">
                    <div className="text-right">
                    <strong className="text-danger"><em>Syllabus :</em> <div className="btn-group">{this.state.facultyAcademics.map((aca)=>(
                            <button className="btn btn-link text-primary" onClick={()=>this.download(aca.syllabus)} >{aca.discipline}</button>
                        ))}</div></strong>
                    </div>
                 </div>
                 </div>:<div></div>}
                
                <hr/>      
            </div>);
    }

}

export default NewWorkdone;