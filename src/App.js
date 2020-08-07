import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import jwt from 'jwt-decode';



class App extends Component {


  load=()=>{
      var ms = Date.now();
     let p= fetch("http://localhost:8080/wdsportal/message"+"?random="+ms,{
         method: 'GET', 
         headers: { 'Content-Type': 'application/json'}, 
     }).then(res=>{  
       alert(res.status);
         return res.json();    
      }).then(json=>{
        alert(json);
      }).catch((error)=>{
          throw Error("Bad Request"+error);
      });
      return p;
  }


  authenticate=()=>{

    let object = {};
    // object['grant_type']='password';
    object['userName']='admin';
    object['password']='admin';
    // object['password']='admin';
    var data = JSON.stringify(object);
    alert(data);
    let p=fetch('http://localhost:8080/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','authorization': 'Bearer ' + localStorage.getItem('auth-token')},
      body: data
      }).then(res=>{
          return res.json();
      }).then(json=>{
        let decoded = jwt(json.authToken);
      }).catch((error)=>{
          throw Error("Bad Request "+error);
      });
      return p;

  }

constructor(props){
  super(props);
 //this.load();
}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={()=>{this.authenticate()}}>Click</button>
      </div>
    );
  }
}

export default App;
