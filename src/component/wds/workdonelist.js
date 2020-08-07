import React from 'react';
import GenericComponent from '../generic.js';
import * as ApiUtils from '../api.js';

class WorkdoneList extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            wds:[],
            workdone:[],
            enable:false
        }

    }
    getWorkdone=(id)=>{
        let p = ApiUtils.get('/workdone/workdone/'+id,this.props); 
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                   workdone:json
                }) ;
                if('Submitted'!==json.status){
                    this.setState(
                        {
                            enable:true,
                        }
                    )
                }
            }
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });

    }
    getFacultyWds=()=>{
         var facultyId =localStorage.getItem('userId');
         var status =document.getElementById('status').value;
         var fdate =document.getElementById('fdate').value;
         var tdate =document.getElementById('tdate').value;
         let p = ApiUtils.get('/workdone/wds/'+facultyId+"/"+status+"/"+fdate+"/"+tdate,this.props); 
         p.then((response)=>{
             return  response.json();
         }).then((json)=>{
             if(json){
                 this.setState({
                    wds:json
                 }) ;
             }
         }).catch((error)=>{
             this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
         });
    }

    render(){

        return(<div>
                <div className="page-header">
                    <h2>Workdone Statements</h2>
                    <hr/>
                </div>
                <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label"> From Date:</label>
                        <div class="col-lg-6">
                        <input className="form-control" type="date" id="fdate" />
                        </div>                       
                </div>   
                <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">To Date:</label>
                        <div class="col-lg-6">
                         <input className="form-control" type="date" id="tdate" />
                        </div>                       
                </div>   
                    <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">Status: </label>
                        <div class="col-lg-6">
                        <select className="form-control"  id="status" name="status" >
                                        <option key="Submitted" value="Submitted">Submitted</option>
                                        <option key="Approved" value="Approved">Approved</option>
                                        <option key="Rejected" value="Rejected">Rejected</option>

                            </select>
                        </div>
                </div>
                <div class="form-group row">
                        <label  class="col-lg-3 col-form-label form-control-label"></label>
                              <div className="col-lg-2">                                      
                             <button type="button" class="form-control btn btn-info" onClick={()=>{this.getFacultyWds()}}>Search</button>
                         </div>
                </div>      

                <div class="modal" id="myModal">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Workdone Statment: {this.state.workdone.date}</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                        <div class="form-group row">
                                <label  class="col-lg-3 col-form-label form-control-label">Activity:</label>
                                    <div className="col-lg-4">                                      
                                    <h6>{this.state.workdone.activity}</h6>
                                </div>
                            </div> 
                            <div class="form-group row">
                                <label  class="col-lg-3 col-form-label form-control-label">Hours:</label>
                                    <div className="col-lg-4">                                      
                                    <h6>{this.state.workdone.hours}</h6>
                                </div>
                            </div> 

                            <div class="form-group row">
                                <label  class="col-lg-3 col-form-label form-control-label">Syllabus:</label>
                                    <div className="col-lg-4">                                      
                                    <h6> {this.state.workdone.syllabus}</h6>
                                </div>
                            </div> 

                        <div class="form-group row">
                            <label  class="col-lg-3 col-form-label form-control-label">comments:</label>
                                <div className="col-lg-4">                                      
                                <h6>{this.state.workdone.comments}</h6>
                            </div>
                        </div> 

                        <div class="form-group row">
                            <label  class="col-lg-3 col-form-label form-control-label">Submitted Date:</label>
                                <div className="col-lg-4">                                      
                                <h6>{this.state.workdone.submittedDate}</h6>
                            </div>
                        </div>    

                        <div class="form-group row">
                            <label  class="col-lg-3 col-form-label form-control-label">Review Comments:</label>
                                <div className="col-lg-4">                                      
                                <h6>{this.state.workdone.reviewcomments}</h6>
                            </div>
                        </div>             
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>                                                       
                        </div>

                        </div>
                    </div>
                    </div>

                    <table className="table">
                                        <thead class="thead-light">
                                        <tr>               
                                        <th>Date</th>                         
                                            <th>Activity</th>
                                            <th>Hours</th>
                                            <th>Syllabus</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody class="text-primary">
                                        {this.state.wds.map((item) => (
                                        <tr>
                                        <td><h6>{item.date}</h6></td>
                                        <td>{item.activity}</td>
                                        <td>{item.hours}</td>                                        
                                        <td>{item.syllabus}</td>
                                        <td><h6>{item.status}</h6></td>    
                                        <td><div className="btn-group"><button className="btn btn-default btn-sm text-info" onClick={()=>this.getWorkdone(item.id)} data-toggle="modal" data-target="#myModal"><i className="fa fa-eye" ></i></button></div></td>                                      
                                        </tr>
                                        ))}
                                    </tbody>
                        </table> 


            
            </div>);
    }

}

export default WorkdoneList;