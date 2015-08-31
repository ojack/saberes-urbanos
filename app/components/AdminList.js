import React from 'react';
import request from 'superagent';
import FixedDataTable from 'fixed-data-table';

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var data = {
	respuesta: null,
	porque: null,
	existente: false,
	localidad: null,
	barrio: null, 
	direccion: null, 
	coords: {
         lat: 4.597,
         lng: -74.09
     }, 
	foto: null,
	sonido: null, 
	videoUrl: null,
	visible: false
};

var rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  // .... and more
];

function rowGetter(rowIndex) {
  return rows[rowIndex];
}

function editButton(id){
	return <button id={id} onClick={handleClick}>Edit </button>;
}

function handleClick(e){
	console.log(e.target);
}

function renderCell(cellData){
	if(typeof(cellData)=='boolean'){
		return <div><input type="checkbox" defaultValue={cellData}/> </div>
	} else {
		return <div> {cellData} </div>
	}
}

var AdminList = React.createClass({
	getInitialState(){
		//create array 
		var colArray = [];
		for(var field in this.props.data){
			colArray.push(field);
		}
		console.log(colArray);
		return {sitios: [], columns: colArray}
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
  	var cols = this.state.columns.map(function(field, index){
  		return  (<Column
	      label={field.toUpperCase()}
	      cellRenderer={renderCell}
	      width={80}
	      dataKey={index}
   		 />)
  	});
    return (
     <Table
    rowHeight={50}
    rowGetter={this.getItem}
    rowsCount={this.state.sitios.length}
    width={1000}
    height={1000}
    headerHeight={50}>
   {cols}
   <Column
	      label={""}
	      cellRenderer={editButton}
	      width={80}
   		 />
  </Table>
    );
  }
});

export default AdminList;