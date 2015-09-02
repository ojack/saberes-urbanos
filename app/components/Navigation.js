import React from 'react';


var Navigation = React.createClass({

  render() {
  	  return(<form id="navigator">
  	  			<input className="u-full-width" type="text" placeholder="Buscar.." id="exampleEmailInput"/>
  	  			
			      <select className="u-full-width" id="localidad">
			        <option value="Option 1">Localidad</option>
			        <option value="Option 2">Admiration</option>
			        <option value="Option 3">Can I get your number?</option>
			      </select>
			   
			      <select className="u-full-width" id="barrio">
			        <option value="Option 1">Barrio</option>
			        <option value="Option 2">BELEN</option>
			        <option value="Option 3">7 DE AGOSTO</option>
			      </select>

			      <select className="u-full-width" id="barrio">
			        <option value="Option 1">Temporalidad</option>
			        <option value="Option 2">existe</option>
			        <option value="Option 3">ya no existe</option>
			      </select>
  	  		</form>)
   	}
  
});

export default Navigation;