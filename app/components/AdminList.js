import React from 'react';
import request from 'superagent';
import ListEntry from './ListEntry';
import AddSite from './AddSite'



var AdminList = React.createClass({
	getInitialState(){
		//create array 
		
		return {sitios: [], selected: null}
	},
	onEdit(info){
		console.log("edit");
		console.log(info);
		this.setState({selected: info});
	},
	onDelete(info, index){
		console.log("edit");
		console.log(info);
		var r = confirm("Eliminar?");
		console.log(index);
		if(r){
		 request
		   .del('/api/sitio')
		   .query({ id: info._id })
		   .end(function(err, res){
		   		console.log(res);
		   		var sitios = this.state.sitios;
		   		console.log(sitios);
		   		sitios.splice(index, 1);
		   		console.log(sitios);
		   		this.setState({sitios: sitios});
		   		//this.setState({sitios: res.body});
		   }.bind(this));
		}
	},
	componentDidMount(){
		 request
		   .get('/api/sitios')
		   .query({ limit: 50 })
		   .end(function(err, res){
		   		console.log(res.body);
		   		this.setState({sitios: res.body});
		   }.bind(this));
	},

	getItem(index){
		var arr = [];
		var obj = this.state.sitios[index];
		for(var i = 0; i < this.state.columns.length; i++){
			arr[i] = obj[this.state.columns[i]];
		}
		arr[i*1] = obj['_id'];
		console.log(arr);
		return arr;
	},
	handleRowClick(e){
		console.log(e);
	},
  render() {
  	var header =["respuesta", "existente", "categoria", "localidad", "barrio", "foto", "sonido", "visible"];
  	var headerRender = header.map(function(title){
  		return <td>{title}</td>;
  	});
  	console.log(this.state.sitios);
  	var listRender = this.state.sitios.map(function(object, index){
  		//console.log(object);
  		var coords = {lat: object.geometry.coordinates[1], lng: object.geometry.coordinates[0]}
  		object.properties.coords = coords; 
		return <ListEntry index={index} data = {object} onEdit={this.onEdit} onDelete={this.onDelete}/>
  	}.bind(this));
  	if(this.state.selected!=null){
  		return <AddSite data={this.state.selected.properties} id={this.state.selected._id}/>
  	}
    return (
    	<table>
    		<th>{headerRender}</th>
    		{listRender}
    	</table>
    );
  }
});

export default AdminList;