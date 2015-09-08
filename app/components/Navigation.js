import React from 'react';
import SearchDropdown from './SearchDropdown'
import request from 'superagent';
import Select from 'react-select';

var Navigation = React.createClass({
	 getInitialState(){
       
        return {localidades: null, localidad: null, barrio: null, barrios: null}
    },
	componentDidMount: function(){
         request
           .get('/api/localidades')
           .query({ bbox: true })
           .end(function(err, res){
                console.log(res.body);
               // this.initSitios(res.body);
                this.setState({localidades: res.body});
           }.bind(this));
    },
    updateBarrioList(index){
      if(index != this.state.localidad){
        this.setState({localidad: index, barrio: null});
        this.props.setBounds(this.state.localidades[index].bbox);
        var code = this.state.localidades[index].properties.COD_LOC_IN;
        request
           .get('/api/barrios')
           .query({ code: code })
           .query({ bbox: true })
           .end(function(err, res){
               // console.log(res.body);
               // this.initSitios(res.body);
                this.setState({barrios: res.body});
           }.bind(this));
        }
    },
    updateBarrio(index){
       this.setState({barrio: index});
        this.props.setBounds(this.state.barrios[index].bbox);
    },
  render() {
  	var localidadOptions = [];
        if(this.state.localidades!=null){
            localidadOptions = this.state.localidades.map(function(obj, index){
                return {value: index, label: obj.properties.NOMBRE}
            });
            //console.log(localidadOptions);
        }
         var barrioOptions = [];
        if(this.state.barrios!=null){
            barrioOptions = this.state.barrios.map(function(obj, index){
                return {value: index, label: obj.properties.NOMBRE}
            });

            var options = [
			    { value: 'one', label: 'One' },
			    { value: 'two', label: 'Two' }
			];
           // console.log(barrioOptions);
        }
  	  return(<form id="navigator">
  	  			<input className="u-full-width" type="text" placeholder="Buscar.." id="exampleEmailInput"/>
  	  			
			   
              <Select
                    name="form-field-name"
                    searchPromptText="Localidad"
                    placeholder="Localidad"
                    options={localidadOptions}
                    value={this.state.localidad}
                    onChange={this.updateBarrioList}
             />
              <Select
      					    name="form-field-name"
                    searchPromptText="Barrio"
                    placeholder="Barrio"
                    value={this.state.barrio}
      					    options={barrioOptions}
                    onChange={this.updateBarrio}
					   />
			   		
			     
  	  		</form>)
   	}
  
});

export default Navigation;