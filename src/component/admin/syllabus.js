import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';


class SyllabusUpload extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            disciplines:[],
            dispSyllabus:[],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
        }
        this.getDesciplines();
        this.getDesciplineSyllabus();
    }
    getDesciplines = ()=> { 

        let p = ApiUtils.get('/admin/disciplines',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    disciplines:json
                })  ;
            }
      
        }).catch((error)=>{
            alert('System Error');
        });
    }

    getDesciplineSyllabus = ()=> { 

        let p = ApiUtils.get('/admin/syllabuses',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    dispSyllabus:json
                })  ;
            }
      
        }).catch((error)=>{
            alert('System Error');
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
    upload = () => {
         var selectedFile=document.getElementById("syllabus").files[0];
         var disciplineId=document.getElementById("disciplines").value;
         
        const formData = new FormData();
        formData.append('file', selectedFile);

       var p=ApiUtils.fileupload('/admin/upload/'+disciplineId,formData,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"uploaded successfully!",isError:false,isMsg:true,});   
            document.getElementById("syllabus").value = "";     
            this.getDesciplineSyllabus();
         }).catch((error)=>{
            this.setState({errormsg:"Error In Upload..!",isError:true,isMsg:false,}); 
            // alert('System Error: '+error);
         });
        
    };

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
                    <h2>Syllabus Upload</h2>
                    <hr/>
                </div> 

              {errorbutton}{infobutton}

              <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">Disciplines:</label>
                        <div class="col-lg-6">
                        <select className="form-control"  id="disciplines" required>
                        <option key="NA" value="-1">Select</option>
                            {
                                this.state.disciplines.map((discipline) => (
                                    <option key={discipline.id} value={discipline.id}>{discipline.name}</option>
                                ))
                            }
                        </select>
                        </div>                       
                </div>
                <div class="form-group row">
                    <label class="col-lg-3 col-form-label form-control-label">File:</label>
                        <div class="col-lg-6">
                        <input type="File" className="form-control" name="syllabus" id="syllabus"  required/>   
                        </div>                       
                </div>      
                <div class="form-group row">
                                <label class="col-lg-3 col-form-label form-control-label"></label>
                                    <div class="col-lg-6">
                                    <button type="submit" class="btn btn-info" onClick={()=>this.upload()} >Upload</button>
                                </div>
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
                                        {this.state.dispSyllabus.map((item) => (
                                        <tr>
                                        <td><h6>{item.name}</h6></td>
                                        <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>this.download(item.syllabus)} ><i className="fa fa-book text-success" ></i></button></div></td>
                                        </tr>
                                        ))}
                                    </tbody>
                            </table>                           
                         </div>
        </div>);
    }

}
export default SyllabusUpload;