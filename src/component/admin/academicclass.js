import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';
import '../../nn.css';


class AClass extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            classes:[],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false,
         }
        this.getAllClasses();
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

        let p=ApiUtils.post('/admin/academicClass',data,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,}); 
           this.getAllClasses();
        }).catch((error)=>{
            this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
        });
    }

    getAllClasses = ()=> {

        let p = ApiUtils.get('/admin/academicClasses',this.props);
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
    deleteClass=(id)=>{

        let p = ApiUtils.remove('/admin/academicClass/'+id,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Deleted successfully!",isError:false,isMsg:true,});   
             this.getAllClasses();
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
                            <h3 class="mb-0">Classes Configuration</h3>
                        </div>                      
                        <div class="card-body ">
                           <div class="col-12 align-self-end">
                           <form class="form" role="form" onSubmit={this.handleSubmit} >
                               

                           <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                        <div class="col-lg-6">
                                        <input type="text" className="form-control" name="name" id="name" placeholder="Class" required/>
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
                                        {this.state.classes.map((item) => (
                                        <tr>
                                        <td><h6>{item.name}</h6></td>
                                        <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>this.deleteClass(item.id)} ><i className="fa fa-trash text-danger" ></i></button></div></td>
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

export default AClass;