import React from 'react';
import GenericComponent from '../generic.js';
import * as ApiUtils from '../api.js';

class ReviewWds extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            wds:[],
            faculties:[],
            workdone:{},
            reviewcomments:'',
            enable:false,
        }

        this.getEmployees();
    }

    handleReviewComment=(event)=>{
        this.setState({ reviewcomments: event.target.value });
    }


getEmployees = ()=> { 
    var supId =localStorage.getItem('userId');
        let p = ApiUtils.get('/mentor/employees/'+supId,this.props);
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

    getWorkdone=(id)=>{
        this.setState({
            enable:false
        });
        let p = ApiUtils.get('/workdone/workdone/'+id,this.props); 
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                   workdone:json
                }) ;
                 if('Submitted'==json.status){
                    this.setState(                        {
                            enable:true,
                        }
                    )
                }
            }
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    getWds=()=>{
        var facultyId =document.getElementById('faculties').value;
        if(facultyId > -1){
            this.getFacultyWds();           
        }else{
            this.getSupervisorWds();   
        }
    }

    getSupervisorWds=()=>{
        var supId =localStorage.getItem('userId');
        var status =document.getElementById('status').value;
        var fdate =document.getElementById('fdate').value;
        var tdate =document.getElementById('tdate').value;
        let p = ApiUtils.get('/mentor/wds/'+supId+"/"+status+"/"+fdate+"/"+tdate,this.props); 
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

    getFacultyWds=()=>{
         var facultyId =document.getElementById('faculties').value;
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

    reviewWds=(status)=>{

        let workdone=this.state.workdone;

        let modal=document.getElementById('myModal');
        var supId =localStorage.getItem('userId');
        workdone['status']=status;
        workdone['reviewComments']=this.state.reviewcomments;
        workdone['reviewedBy']=supId;

        var data = JSON.stringify(workdone);
        let p=ApiUtils.post('/mentor/reviewWds',data,this.props);
        p.then((response)=>{
           this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,});
           modal.style.display = "none";
           this.getWds();
        }).catch((error)=>{
           this.setState({errormsg:"Error In Submission..!",isError:true,isMsg:false,}); 
        }); 

    }

    render(){
        let isenabled=this.state.enable;
        return(<div>
                <div className="page-header">
                    <h2>Workdone Statements</h2>
                    <hr/>
                </div> 
                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Faculties</label>
                                    <div class="col-lg-4">
                                    <select className="form-control"  id="faculties" name="faculties" >
                                        <option key="-1" value="-1">All</option>
                                        {
                                            this.state.faculties.map((faculty) => (
                                                <option key={faculty.empId} value={faculty.empId}>{faculty.firstName} {faculty.lastName}</option>
                                            ))
                                        }
                    </select>
                </div>
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
                             <button type="button" class="form-control btn btn-info" onClick={()=>{this.getWds()}}>Search</button>
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

                            <table className="table table-borderless text-left">
                                <thead>
                                    <th></th><th></th>
                                </thead>
                               <tbody className="text-dark">
                                   <tr><td>Activity</td><td>: {this.state.workdone.facultyId}</td></tr>
                                   <tr><td>Activity</td><td>: {this.state.workdone.activity}</td></tr>
                                   <tr><td>Hours</td><td>: {this.state.workdone.hours}</td></tr>
                                   <tr><td>Syllabus</td><td>: {this.state.workdone.syllabus}</td></tr>
                                   <tr><td>Comments</td><td>: {this.state.workdone.comments}</td></tr>
                                   <tr><td>Submitted Date</td><td>: {this.state.workdone.submittedDate}</td></tr>
                                   {this.state.enable?
                                   <tr><td>Review Comments</td><td>: <input type="text" className="form-control" name="reviewcomments" id="reviewcomments" onChange={this.handleReviewComment}/></td></tr>:
                                   <tr><td>Review Comments</td><td>: {this.state.workdone.reviewComments}</td></tr>
                                   }
                               </tbody>
                            </table>
          
                        </div>

                        <div class="modal-footer">
                            {/* <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> */}
                            {this.state.enable?
                            <div class="form-row">
                               
                                    <div class="col-6">
                                        <div className="form-group">
                                        <button type="button" className="form-control btn btn-info" data-dismiss="modal" onClick={()=>{this.reviewWds('Approved')}}> Approve</button>
                                        </div>
                                    </div>
                                    <div class="col-6 ">
                                        <div className="form-group">
                                        <button type="button" className="form-control btn btn-danger" data-dismiss="modal" onClick={()=>{this.reviewWds('Rejected')}}> Reject</button>
                                        </div>
                                    </div>
                            </div>:<div><button type="button" class="btn btn-danger" data-dismiss="modal">Close</button></div>}                           
                        </div>

                        </div>
                    </div>
                    </div>

                    <table className="table">
                                        <thead class="thead-light">
                                        <tr>               
                                        <th>Date</th>    
                                        <th>Emp Id</th>                      
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
                                        <td><h6>{item.facultyId}</h6></td>
                                        <td>{item.activity}</td>
                                        <td>{item.hours}</td>                                        
                                        <td>{item.syllabus}</td>
                                        <td>{item.status}</td>   
                                        <td><div className="btn-group"><button className="btn btn-default btn-sm text-info" onClick={()=>this.getWorkdone(item.id)} data-toggle="modal" data-target="#myModal"><i className="fa fa-eye" ></i></button></div></td>                                     
                                        </tr>
                                        ))}
                                    </tbody>
                        </table> 
        
            </div>);
    }

}

export default ReviewWds;