import React from 'react';
import IngresarHex from './IngresarHex';
import IngresarMapa from './IngresarMapa';
import request from 'superagent';
import Select from 'react-select';
import ReactiveInput from './ReactiveInput';

var Ubicacion = React.createClass({
   getInitialState(){
        return {localidades: null, direccion: this.props.data.direccion, localidad: null, barrio: null, barrios: null, bounds: null}
    },
  componentDidMount(){
    request
           .get('/api/localidades')
           .query({ bbox: true })
           .end(function(err, res){
               var localidadIndex = null;
               if(this.props.data.localidad!=null){
                  for(var i = 0; i < res.body.length; i++){
                    var obj = res.body[i];
                    if(obj.properties.NOMBRE == this.props.data.localidad){
                      localidadIndex = i;
                      this.updateBarrioList(obj.properties.COD_LOC_IN, true);
                    }  
                  }
                  
               }
               //console.log(localidadIndex);
                this.setState({localidades: res.body, localidad: localidadIndex});
           }.bind(this));
    },
     updateLocalidad(index){
       if(index != this.state.localidad){
        this.setState({localidad: index, barrio: null, bounds: this.state.localidades[index].bbox});
        var code = this.state.localidades[index].properties.COD_LOC_IN;
        this.updateBarrioList(code, false);
      }
    },
    updateBarrioList(code, selectBarrio){
        request
           .get('/api/barrios')
           .query({ code: code })
           .query({ bbox: true })
           .end(function(err, res){
               var barrioIndex = null;
               if(selectBarrio==true){
                   for(var i = 0; i < res.body.length; i++){
                    var obj = res.body[i];
                    if(obj.properties.NOMBRE == this.props.data.barrio){
                     barrioIndex = i;
                    }  
                  }
                  //console.log(barrioIndex);
               }
                this.setState({barrios: res.body, barrio: barrioIndex});
           }.bind(this));
        
    },
    updateBarrio(index){
       this.setState({barrio: index, bounds: this.state.barrios[index].bbox});
    },
  handleDireccionChange(value){
    this.setState({direccion: value});
  },
  updateCoords(coords){
    console.log("coords are ");
    console.log(coords);
    this.setState({coords: coords});
  },
  setValue(e){
    console.log("value is "+e.target.value);
    this.setState({value: e.target.value});
  },
  render() {
    console.log(this.state.localidades);
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
  var data = [];
  if(this.state.barrio!=null){
    data.push({
      attr: "barrio",
      value: this.state.barrios[this.state.barrio].properties.NOMBRE
    });
  }
  if(this.state.localidad!=null){
    data.push({
      attr: "localidad",
      value: this.state.localidades[this.state.localidad].properties.NOMBRE
    });
  }
 data.push({
    attr: "direccion",
    value: this.state.direccion
  });
  console.log(data);

 var style = {
    color: this.props.primaryColor
 }

 var buttonStyle = {
    backgroundColor: this.props.primaryColor,
    color: "#fff"
 }

 var hexFormContents = (<div>
                    <Select
                            name="localidad"
                            searchPromptText="Localidad"
                            placeholder="Localidad"
                            options={localidadOptions}
                            value={this.state.localidad}
                            onChange={this.updateLocalidad}
                            onBlur={this.handleBlur}
                            noResultsText=""
                        />
                     <Select
                            name="barrio"
                            searchPromptText="Barrio"
                            placeholder="Barrio"
                            value={this.state.barrio}
                            options={barrioOptions}
                            onChange={this.updateBarrio}
                            noResultsText=""
                       />
                    <ReactiveInput updateParent={this.handleDireccionChange} value={this.state.direccion} placeholder="Direccion..."/>
                     </div>);

   var hexContents = (<div><p style={style} className="ingresar-primary-heading">¿Donde estás?</p></div>);
   var mapContents = (<IngresarMapa coords={this.props.data.coords} bounds={this.state.bounds}  direccion={this.state.direccion} width={this.props.hexWidth} height={this.props.hexHeight} updateCoords={this.updateCoords}/>);
  	return (
  		<div className={"ingresar-component "+this.props.selectedState}>
          <IngresarHex contents={hexContents} position={this.props.hexPositions[6]} primaryColor={this.props.primaryColor} width={this.props.hexWidth} height={this.props.hexHeight}/>
  				<IngresarHex contents={hexFormContents} position={this.props.hexPositions[7]} backgroundColor="#333" width={this.props.hexWidth} height={this.props.hexHeight}/>
  		    <IngresarHex hexContents={mapContents} position={this.props.hexPositions[8]} noOverlay={true} backgroundColor="#333" width={this.props.hexWidth} height={this.props.hexHeight}/>
    
      </div>
  	);
  	// switch(this.state.step){
  	// 	case 0: 
   //     	 return <Intro nextStep={this.nextStep}/>
   //     	case 1: 
   //     		 return <Main nextStep={this.nextStep} />
   // 	}
  }
});

export default Ubicacion;