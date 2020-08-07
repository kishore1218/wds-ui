import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';
import '../../nn.css';


class Role extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            roles:[],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false,
            pageCount:0,
            pageLimit:'active',
            pageStart:'diaabled'
         }

        this.getRoles(0,10);
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

        let p=ApiUtils.post('/admin/role',data,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,}); 
           this.getRoles(0,10);
        }).catch((error)=>{
            this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
        });
    }


    prev=(size)=>{
        let page=this.state.pageCount;
        let records= this.getRoles(page,size);

    }

     next= async (size)=>{

        // Promise.resolve('foo').
        // then(() => {return Promise.resolve('bar')}).
        // then((v) => alert(v))
        let p= await this.getRoles(this.state.pageCount,size);    
        p.then((records)=>{
            // if(records<size){
            //       this.setState({
            //           pageLimit:'disabled'
            //       });
            // }else{
            //     this.setState({
            //         pageLimit:'active'
            //     });
            // }
            // this.setState({
            //     pageCount:this.state.pageCount+records
            // });
        });
    }

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
            return Object.keys(json).length;       
        }).then((r)=>{
            return Promise.resolve(r);
        })
        .catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
        return p;
    }

    deleteRole=(roleId)=>{

        let p = ApiUtils.remove('/admin/role/'+roleId,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Deleted successfully!",isError:false,isMsg:true,});   
             this.getRoles();
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
            {/* <div class="page-header">
                 <h1>Patient Registration</h1>
            </div>         */}
                {errorbutton}{infobutton} 
                <div class="card card-outline-secondary ">
                        <div class="card-header bg-info text-white">
                            <h3 class="mb-0">Role Configuration</h3>
                        </div>                      
                        <div class="card-body ">
                           <div class="col-12 align-self-end">
                           <form class="form" role="form" onSubmit={this.handleSubmit} >
                           <div class="form-group row">
                                    <label class="col-lg-3 col-form-label form-control-label"></label>
                                        <div class="col-lg-6">
                                        <input type="text" className="form-control" name="name" id="name" placeholder="Role" required/>
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
                                        {this.state.roles.map((item) => (
                                        <tr>
                                        <td><h6>{item.name}</h6></td>
                                        <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>this.deleteRole(item.roleId)} ><i className="fa fa-trash text-danger" ></i></button></div></td>
                                        </tr>
                                        ))}
                                    </tbody>
                            </table>
                            <ul class="pagination justify-content-center">
                                <li class={'page-item '+this.state.pageStart}><a class="page-link" href="#" onClick={()=>{this.getRoles(5,-1)}}>Prev</a></li>
                                <li class={'page-item '+this.state.pageLimit}><a class="page-link" href="#" onClick={()=>{this.next(5)}}> Next </a></li>
                            </ul>
                            </div>
                        </div>
                    </div>
        </div>
        );
    }
}

export default Role;