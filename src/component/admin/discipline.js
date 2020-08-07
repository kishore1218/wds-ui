import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';
import '../../nn.css';


class Disciplines extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            disciplines:[],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false,
         }
        this.getDisciplines();
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        let object = {};

        for(var i=0;i<event.target.elements.length;i++){
            var ele=event.target.elements[i];
            if(ele.value!=""){
                object[ele.name] = ele.value;                
            }
        }

        var data = JSON.stringify(object);

        let p=ApiUtils.post('/admin/discipline',data,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,}); 
           this.getDisciplines();
        }).catch((error)=>{
            this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
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
    deleteDiscipline=(id)=>{

        let p = ApiUtils.remove('/admin/discipline/'+id,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Deleted successfully!",isError:false,isMsg:true,});   
             this.getDisciplines();
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
                {errorbutton}{infobutton} 
                <div class="card card-outline-secondary ">
                        <div class="card-header bg-info text-white">
                            <h3 class="mb-0">Discipline Configuration</h3>
                        </div>                      
                        <div class="card-body ">
                           <div class="col-12 align-self-end">
                           <form class="form" role="form" onSubmit={this.handleSubmit} >

                           <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                        <div class="col-lg-6">
                                        <input type="text" className="form-control" name="name" id="name" placeholder="Discipline" required/>
                                        </div>                       
                            </div>
                            <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"> </label>
                                        <div class="col-lg-6">
                                        <input type="submit" class="btn btn-info" value="Add"/>
                                        </div>                       
                            </div>
                            </form>
                            </div>
                        <div class="col-md-12  mt-2">
                            <table className="table table-stripped">
                                    <thead class="thead-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-primary">
                                        {this.state.disciplines.map((item) => (
                                        <tr>
                                        <td><h6>{item.name}</h6></td>
                                        <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>this.deleteDiscipline(item.id)} ><i className="fa fa-trash text-danger" ></i></button></div></td>
                                        </tr>
                                        ))}
                                    </tbody>
                            </table>                           
                            </div>
                        </div>
                    </div>
        </div>
        );
    }
}
export default Disciplines;