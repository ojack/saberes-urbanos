import React from 'react';

var ListEntry = React.createClass({
	handleEdit(){
		this.props.onEdit(this.props.data);
	},
  handleDelete(){
    this.props.onDelete(this.props.data, this.props.index);
  },
  render() {
  	var imgStyle={
  		width: "150px",
  		height: "60px"
  	}
  	var sonido = "";
  	var properties = this.props.data.properties;
  	if(properties.sonidoUrl) sonido = "X";
    return (
    	<tr>
    		<td>{properties.created}</td>
    		<td>{properties.respuesta}</td>
    		<td>{JSON.stringify(properties.existente)}</td>
    		<td>{properties.categoria}</td>
    		<td>{properties.localidad}</td>
    		<td>{properties.barrio}</td>
    		<td><img style={imgStyle} src={properties.fotoUrl}/></td>
    		<td>{sonido}</td>
    		<td><input type="checkbox" checked={this.props.visible}/></td>
    		<td><button onClick = {this.handleEdit}>Editar</button></td>
        <td><button onClick = {this.handleDelete}>Eliminar</button></td>
    	</tr>
    );
  }
});

export default ListEntry;