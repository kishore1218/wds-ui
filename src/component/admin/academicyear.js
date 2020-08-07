import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';
import '../../nn.css';


class AcademicYear extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            academicyears:[],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false,
            pageCount:0,
            pageLimit:'active',
            pageStart:'diaabled'
         }
        this.getAcademicYears();
    }

    toggleAcademicYear=(id,status)=>{

        let p=ApiUtils.put('/admin/acedemicyearActivatation/'+id+"/"+status,null,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,}); 
           this.getAcademicYears();
        }).catch((error)=>{
            this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
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

        let p=ApiUtils.post('/admin/academicyear',data,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,}); 
           this.getAcademicYears();
        }).catch((error)=>{
            this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
        });
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
    deleteAcademicYear=(id)=>{

        let p = ApiUtils.remove('/admin/academicyear/'+id,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Deleted successfully!",isError:false,isMsg:true,});   
             this.getAcademicYears();
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
                    <h2>Academic Year Configuration</h2>
                    <hr/>
                </div> 
                {errorbutton}{infobutton} 

                <form class="form" role="form" onSubmit={this.handleSubmit} >

                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">From: </label>
                            <div class="col-lg-6">
                            <input type="date" className="form-control" name="fromYear" id="toYear" placeholder="From" required/>
                            </div>                       
                    </div>
                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">To: </label>
                            <div class="col-lg-6">
                            <input type="date" className="form-control" name="toYear" id="toYear" placeholder="To" required/>
                            </div>                       
                    </div>

                    <div class="form-group row">
                        <label class="col-lg-3 col-form-label form-control-label">Code: </label>
                            <div class="col-lg-6">
                            <input type="text" className="form-control" name="code" id="code" placeholder="Code" required/>
                            </div>                       
                    </div>
  

                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Status:</label>
                                    <div className="col-lg-2">
                                            <input type="radio" id="status1" name="status" class="custom-control-input" value="Active"/>
                                            <label class="custom-control-label" for="status1">Active</label>
                                    </div>
                                    <div class="col-lg-2">
                                        <input type="radio" id="status2" name="status" class="custom-control-input" value="De-Active"/>
                                        <label class="custom-control-label" for="status2">De-Active</label>
                                    </div>
                                </div>
                                <div class="form-group row">    
                                <label className="col-lg-3 col-form-label form-control-label"></label>                               
                                    <div class="col-lg-4">
                                         <input type="submit" className="form-control btn btn-info" value="Add"/>
                                    </div>                                    
                                </div>
                            </form>
                            <table className="table ">
                                    <thead class="thead-light">
                                    <tr>
                                        <th>Academic Year</th>
                                        <th>Code</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-primary">
                                        {this.state.academicyears.map((item) => (
                                        <tr>
                                        <td><h6>{item.period}</h6></td>
                                        <td><h6>{item.code}</h6></td>
                                        <td><h6>{item.status}</h6></td>
                                        <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>this.deleteAcademicYear(item.id)} ><i className="fa fa-trash text-danger" ></i></button>{item.status==='Active'?<div><button className="btn btn-default btn-sm" onClick={()=>{this.toggleAcademicYear(item.id,'De-Active')}}><i class="fa fa-toggle-off text-success" aria-hidden="true"></i></button></div>:<div><button className="btn btn-default btn-sm" placeholder="Activate"onClick={()=>{this.toggleAcademicYear(item.id,'Active')}}><i class="fa fa-toggle-on text-warning" aria-hidden="true"></i></button></div>}</div></td>
                                        </tr>
                                        ))}
                                    </tbody>
                            </table>  
        </div>
        );
    }
}

export default AcademicYear;