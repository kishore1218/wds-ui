
import { browserHistory } from 'react-router';
import jwt from 'jwt-decode';

const base_url='http://192.168.43.13:8082';
// const base_url='http://10.140.247.125:8086';



export  function get(url,props){
    renewAccessTokenIfExpire(props);
    // var ms = Date.now();
    // +"?random="+ms
   let p= fetch(base_url+url,{
       method: 'GET',
       headers: { 'authorization': 'Bearer ' + localStorage.getItem('auth-token')}    
   }).then(res=>{

       handleApiError(res,props);
       return res;    
    }).catch((error)=>{
        throw Error("Bad Request");
    });
    return p;
}



export  function post(url,data,props){

    if(url !=='/authenticate'){
        renewAccessTokenIfExpire(props);
    }
    let p=fetch(base_url+url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','authorization': 'Bearer ' + localStorage.getItem('auth-token')},
        body: data
    }).then(res=>{
        handleApiError(res,props);
        return res;
    }).catch((error)=>{
        throw Error("Bad Request "+error);
    });
    return p;
}

export  function fileupload(url,data,props){

    if(url !=='/authenticate'){
        renewAccessTokenIfExpire(props);
    }
    let p=fetch(base_url+url, {
        method: 'POST',
        headers: {'authorization': 'Bearer ' + localStorage.getItem('auth-token')},
        body: data
    }).then(res=>{
        handleApiError(res,props);
        return res;
    }).catch((error)=>{
        throw Error("Bad Request "+error);
    });
    return p;
}

export  function put(url,data,props){

    renewAccessTokenIfExpire(props);
    let p=fetch(base_url+url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json','authorization': 'Bearer ' + localStorage.getItem('auth-token')},
        body: data
    }).then(res=>{
        handleApiError(res,props);
        return res;
    }).catch((error)=>{
        throw Error("Bad Request");
    });
    return p;
}

export  function remove(url,props){

    renewAccessTokenIfExpire(props);

    let p=fetch(base_url+url, {
        method: 'delete',
        headers: { 'authorization': 'Bearer ' + localStorage.getItem('auth-token')},   
    }).then(res=>{
        handleApiError(res,props);
        return res;
    }).catch((error)=>{
        throw Error("Bad Request");
    });
    return p;
}

function handleApiError(response,props){
    if(response.status==401){
        // props.history.push('/login');  
        props.history.push('/sessionerror');
    }
    if(response.status==404){      
        props.history.push('/sessionerror');  
    }
    if(response.status==500){
        //alert('Technical Error');
        throw Error("Technical Error");
        //props.history.push('/error',{errormsg: "Unable to perform Operation: Technical Error"});
    }
    if(response.status==406){
        // alert('Integrity Error');
        throw Error("Integrity Error");
       // props.history.push('/error',{errormsg: "Unable to perform Operation: Data integrity violation"});
    }

    // alert('Request processed Successfully!');
 
}

  function renewAccessTokenIfExpire(props){
    let token=localStorage.getItem('auth-token');      
    let decoded = jwt(token);   
    let expDate=new Date(0);
    expDate.setUTCSeconds(decoded.exp);
    let currentTime=new Date();
    if(expDate.getTime() < currentTime.getTime()){
        refreshToken(props);
    }
}
    function refreshToken(props){
        let p=fetch(base_url+'/refreshtoken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','refresh-token': 'Bearer ' + localStorage.getItem('refreshtoken')},
            body: ''
        }).then(res=>{
            handleApiError(res,props);
            return res.json();
        }).then(json=>{
            localStorage.setItem('auth-token',json.authToken); 
            localStorage.setItem('refreshtoken',json.refreshToken); 
        }).catch((error)=>{
            throw Error("Bad Request "+error);
        });
        
    }



