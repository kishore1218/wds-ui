import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';

class RoleModules extends GenericComponent{

    modules=[];

    constructor(props){
        super(props);
        this.state={
            roles:[],
            modules:[],
            roleModules:[],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false,
            enable:false
        }
        this.getRoles(0,10);
        this.getAllModules();
    }
    // getRoles = ()=> { 

    //     let p = ApiUtils.get('/wdsportal/admin/roles',this.props);
    //     p.then((response)=>{
    //         return  response.json();
    //     }).then((json)=>{
    //         if(json){
    //             this.setState({
    //                 roles:json
    //             })  ;
    //         }      
    //     }).catch((error)=>{
    //         this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
    //     });
    // }

    getRoles = (page,size)=> {

        let p = ApiUtils.get('/admin/roles?page='+page+'&next='+size,this.props);
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

    getAllModules = ()=> { 

        let p = ApiUtils.get('/admin/modules',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            this.modules=json;   
    
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    getAssignModules = ()=> { 

        this.setState({
            modules:[]
        }) ;

        this.setState({
            rolemodules:[]
        }) ;

        var roleId = document.getElementById("roles").value;

 
        let p = ApiUtils.get('/admin/roleModules/'+roleId,this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{            
               var usassignmodules = JSON.parse(JSON.stringify(this.modules));
               var count = Object.keys(json).length;
               if(json){
                for(var j = 0; j < usassignmodules.length; j++) {
                    for(var i = 0; i < count; i++) {
                        if(json[i].id == usassignmodules[j].id) {
                            usassignmodules.splice(j, 1);
                            j--;
                            break;
                        }
                    }
                }
                this.setState({
                    roleModules:json
                }) ;
            }
            if(usassignmodules){
                this.setState({
                    modules:usassignmodules
                }) ;
            }

            this.setState({
                enable:true
            }); 

        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    addModule=()=>{
        var roleId = document.getElementById("roles").value;
        var checkedModules = document.querySelectorAll('#modules input[type="checkbox"]:checked');        

        for (var i = 0; i < checkedModules.length; i++){   
            let object = {};

            object['roleId']=roleId;
            object['moduleId']=checkedModules[i].id;

            var data = JSON.stringify(object);

            let p=ApiUtils.post('/admin/roleModule',data,this.props);
            p.then((response)=>{
                this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,});   
            this.getAssignModules();
            }).catch((error)=>{
                this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
            });
        }
    }
    deleteRoleModule=(moduleId)=>{
        var roleId = document.getElementById("roles").value;

        let p = ApiUtils.remove('/admin/roleModule/'+roleId+'/'+moduleId,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Deleted successfully!",isError:false,isMsg:true,});   
            this.getAssignModules();
        }).catch((error)=>{
            this.setState({errormsg:"Error In Deletin..!",isError:true,isMsg:false,}); 
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
            {errorbutton}{infobutton}  
            <div class="card card-outline-secondary ">
                        <div class="card-header bg-info text-white">
                            <h3 class="mb-0">Role Module Configuration</h3>
                        </div>    
                                          
                        <div class="card-body ">
                        <div class="card">
                                <div class="card-body">

                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label">Roles: </label>
                                        <div class="col-lg-6">
                                        <select className="form-control" onChange={this.getAssignModules} id="roles">
                                        <option key="NA" value="-1">Select</option>
                                            {
                                                this.state.roles.map((role) => (
                                                    <option key={role.roleId} value={role.roleId}>{role.name}</option>
                                                ))
                                            }
                                        </select>
                                        </div>                       
                                </div>

                            </div>
                        </div>

                        {this.state.enable?
                        <div class="col-md-12  mt-2">

                       <div className="card">
                            <div class="card-header bg-dark text-white">
                                <h6 class="mb-0">Un Assigned Modules</h6>
                            </div> 
                            <div className="card-body">
                                <div  className="form-check-inline" id="modules">
                                    {this.state.modules.map((entry)=>(                   
                                        <h6><label className="form-check-label form-control text-dark"><input  class="form-check-input " type="checkbox" key={entry.id} name={entry.name} id={entry.id}/>{entry.name}</label></h6>
                                    )) }
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"> </label>
                                        <div class="col-lg-6">  
                                    <button type="button" className="form-control btn btn-info align-right" onClick={this.addModule}>Assign</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="card">
                        <div class="card-header bg-dark text-white">
                                <h6 class="mb-0"> Assigned Modules</h6>
                            </div> 
                            <div className="card-body">
                            <table className="table">
                                        <thead class="thead-light">
                                        <tr>                                        
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody class="text-primary">
                                        {this.state.roleModules.map((item) => (
                                        <tr>
                                        <td><h6>{item.name}</h6></td>
                                        <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>{this.deleteRoleModule(item.id)}} ><i className="fa fa-trash text-danger" ></i></button></div></td>
                                        </tr>
                                        ))}
                                    </tbody>
                        </table> 

                            </div>

                        </div>                         
                        </div>:<div></div>}
                        </div>
                    </div>
        </div>)
    }
}

export default RoleModules;