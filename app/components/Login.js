import React from 'react';
import AdminList from './AdminList'
import request from 'superagent';

var Login = React.createClass({
	getInitialState(){
		return ({username: "", password: "", loggedIn: false});
	},
	sendLoginRequest(){
		request
			.post("/api/login")
			.send({username: this.state.username})
			.send({password: this.state.password})
			.end(function(err, res){
				if(err){
					console.log(err);
				} else {
					console.log(res.text);
					if(res.text =="valid"){
						this.setState({loggedIn: true});
					}
					
				}
                
                
            }.bind(this));
	},
	handleUserChange(e){
		this.setState({username: e.target.value});
	},
	handlePasswordChange(e){
		this.setState({password: e.target.value});
	},

  render() {
  	if(this.state.loggedIn){
		return <AdminList/>;
	} else {
		 return (
	      <div className="container">
	      	<div className="row">
		      	<h1>Login</h1>
		        <label for="username">Username</label>
		      <input type="text" placeholder="username" id="username" onChange={this.handleUserChange} value={this.state.username}/>
		       <label for="password">Password</label>
		      <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} id="password"/>
		       <div>
		       	<button onClick={this.sendLoginRequest}>Login </button>
		       	</div>
		       </div>
	      </div>
	    );
	  }
	}
});

export default Login;