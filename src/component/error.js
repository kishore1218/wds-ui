
import React from 'react';

export default class Error extends React.Component{

    constructor(props){
        super(props);
        this.props=props;
    }

    render(){
        return(<div><h3>{this.props.location.state.errormsg}</h3></div>)
    }
}