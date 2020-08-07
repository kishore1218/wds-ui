import React from 'react';

export default class GenericComponent extends React.Component{

    constructor(props){
        super(props);        
    }

    golink=(path,data)=>{        
        this.props.history.push(path,data);
    }

    closeNav=()=> {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    }

    logout=()=>{
        localStorage.removeItem('auth-token');
        localStorage.removeItem('refreshtoken');
        this.golink('/login');  
    }


    handleApiError=(response)=>{

        if(response.status==401){
            this.golink('/login');
        }
        if(response.status==500){
            this.golink('/error');
        }
    }
}