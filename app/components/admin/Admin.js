import React from 'react';
import AddSite from './AddSite';
import AdminList from './AdminList';

// <AdminList/>
// <AddSite data={data}/>

var data = {
	respuesta: null,
	porque: null,
	existente: null,
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
	visible: null
};

var Admin = React.createClass({
	
  render() {
    return (
     <AddSite data={data}/>
      
    );
  }
});

export default Admin;