import React from 'react';
import request from 'superagent';

var Register = React.createClass({
	getInitialState(){
		return ({username: "", password: ""});
	},
	sendLoginRequest(){
		request
			.post("/api/register")
			.send({username: this.state.username})
			.send({password: this.state.password})
			.end(function(err, res){
                console.log(err);
                console.log(res);
            });
	},
	handleUserChange(e){
		this.setState({username: e.target.value});
	},
	handlePasswordChange(e){
		this.setState({password: e.target.value});
	},
  render() {
    return (
      <div className="row">
      	<h1>Login</h1>
        <label for="username">Username</label>
      <input type="text" placeholder="username" id="username" onChange={this.handleUserChange} value={this.state.username}/>
       <label for="password">Password</label>
      <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} id="password"/>
       <button onClick={this.sendLoginRequest}>Login </button>
      </div>
    );
  }
});

export default Register;