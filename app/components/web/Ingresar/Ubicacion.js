import React from 'react';
import IngresarHex from './IngresarHex';
import request from 'superagent';
import Select from 'react-select';

var Ubicacion = React.createClass({
   getInitialState(){
        return {localidades: null, direccion: this.props.data.direccion, localidad: null, barrio: null, barrios: null}
    },
  componentDidMount(){
    request
           .get('/api/localidades')
           .query({ limit: 50 })
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
        this.setState({localidad: index, barrio: null});
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
                  console.log(barrioIndex);
               }
                this.setState({barrios: res.body, barrio: barrioIndex});
           }.bind(this));
        
    },
    updateBarrio(index){
       this.setState({barrio: index});
    },
  handleDireccionChange(e){
    this.setState({direccion: e.target.value});
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

  var width = 245;
  var height = 283;
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
                     <input type="text" className="u-full-width" onChange={this.handleDireccionChange} value={this.state.direccion} placeholder="Direccion..." />
                     </div>);

   var hexContents = (<div><p style={style} className="ingresar-primary-heading">¿Donde estás?</p></div>);

  	return (
  		<div className="row" >
  			<div className="six columns">
          <div className="ingresar-left-col">
            <IngresarHex contents={hexContents} primaryColor={this.props.primaryColor} width={width} height={height}/>
          </div>
            
          
        </div>
  			<div className="six columns">
  				<IngresarHex contents={hexFormContents} backgroundColor="#333" width={width} height={height}/>
  		  </div>
        <button className="ingresar-continuar" style={buttonStyle} onClick={this.props.nextStep.bind(null, data)}> Continuar </button>
        <h5 className="ingresar-cancelar" onClick={this.props.cancelar}> Cancelar </h5>
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