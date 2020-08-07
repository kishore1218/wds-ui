import React from "react";
import {  Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import GenericComponent from "./generic";
import Header from './Header.js';
import Footer from './Footer.js';

class SessionExpiredComponent extends GenericComponent{
    constructor(props){
        super(props);
    }


    render(){

        return(<div>
                <Header/>
                <div className="page-header text-center">
                    <br/><br/>
                    <h2 className="text-danger">Session Expired....!</h2>
                    <hr/>
                </div> 
                <Footer/>
        </div>);
    }
};
export default SessionExpiredComponent;


