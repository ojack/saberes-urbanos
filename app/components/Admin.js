import React from 'react';
import AddSite from './AddSite';
import FormsyInput from './FormsyInput';
import FormsyPlayground from './FormsyPlayground';

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

var Admin = React.createClass({
  render() {
    return (
      <AddSite data={data}/>
    );
  }
});

export default Admin;