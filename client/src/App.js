import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
  super(props);
  this.state={
	  emailId:'',
	  password:'',
    }
  }
  
 handleClick(){	 
 var apiBaseUrl = "/login";
 var self = this;
 const emailId = document.getElementById('usr').value;
 var password = document.getElementById('pwd').value;
 var querystring = require('querystring');
 axios.post(apiBaseUrl,
      querystring.stringify({"email":emailId,"password":password})

 )
 .then(function (response) {
 console.log(response);
 if(response.data.SvcStatus=="Success"){
 alert("Login success");
 }
 else{
 alert("Login failed");
 }
 }).catch(function(error){
  console.log(error);
 });
 }
 
  render() {
    return (
      <div className="container-fluid" style={{paddingTop:100, boxSizing:'borderBox'}}>
        <div className="loginFormDiv">
			<h3 style={{textAlign:'center', color:'rgb(247,150,70)', marginTop:20}}>Login here</h3>
			<form id="loginForm">
				<div className="form-group input-group" style={{marginTop:40, marginBottom:40}}>
				  <span className="has-float-label">
					  <input type="text" className="form-control" id="usr" placeholder="Username" />
					  <label htmlFor="usr">Username</label>
				  </span>
				</div>
				<div className="form-group input-group" style={{marginTop:40, marginBottom:40}}>
				  <span className="has-float-label">
					  <input type="password" className="form-control" id="pwd" placeholder="Password" />
					  <label htmlFor="pwd">Password</label>
				  </span>
				</div>
				<div className="form-group" style={{marginTop:40, marginBottom:40}}>
					<a style={{fontSize:18, float:'right', color:'rgb(247,150,70)', textDecoration:'underline'}} id="forgotPwd">Forgot password</a>
				</div>
				<div style={{marginTop:100}} className="text-center">
					<button style={{width:90, height:35, fontSize:18}} type="button" className="btn btn-warning text-center" id="loginBtn" onClick={this.handleClick}>Login</button>
				</div>
			</form>
		</div>
      </div>
    );
  }
}

export default App;
