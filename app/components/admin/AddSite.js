import React from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import MapLocator from './MapLocator';
import request from 'superagent';
import FormsyInput from './FormsyInput';
import FormsyDropdown from './FormsyDropdown';
import MultipleDropdown from './MultipleDropdown';
import ConfirmSubmit from './ConfirmSubmit';
import Select from 'react-select';

var Checkbox = FRC.Checkbox;
var CheckboxGroup = FRC.CheckboxGroup;
var Input = FRC.Input;
var RadioGroup = FRC.RadioGroup;
var Row = FRC.Row;

var File = FRC.File;
var Textarea = FRC.Textarea;

var AddSite = React.createClass({
    getInitialState(){

        return {direccion: this.props.data.direccion, showSubmit: false, submitData: null, localidades: null, barrios: null, bounds: null}
    },
    resetForm() {
        this.refs.form.reset();
    },
    updateDireccion(val){
        //console.log("updating direccion state");
        this.setState({direccion: val});
        //console.log(this.state);
    },
    submitForm(){
        console.log("show submit");
         this.setState({showSubmit: true});
    },
    updateData(data) {
        // var data = this.props.data;
        // console.log(this.props.data);
        console.log("updating data");
        console.log(data);
        var submitData = {};
        if(this.state.barrio!=null) submitData.barrio = this.state.barrios[this.state.barrio].properties.NOMBRE;
        if(this.state.localidad!=null) submitData.localidad = this.state.localidades[this.state.localidad].properties.NOMBRE;
        for(var key in data){
            if(data[key]!=null) submitData[key] = data[key];
            
        }
        if(this.props.id) submitData.id = this.props.id;
        this.setState({submitData: submitData});//, showSubmit: true});
     
    },
    updateLocalidad(index){
       if(index != this.state.localidad){
        this.setState({localidad: index, barrio: null});
        var code = this.state.localidades[index].properties.COD_LOC_IN;
        this.updateBarrioList(code, false);
      }
      console.log(this.state.localidades[index]);
      this.setState({bounds: this.state.localidades[index].bbox})
    },
    updateBarrioList(code, selectBarrio){
       console.log("getting code ");
       console.log(code);
        request
           .get('/api/barrios')
           .query({ code: code })
           .query({ bbox: true })
           .end(function(err, res){
               // console.log(res.body);
               // this.initSitios(res.body);
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
   //  getOptions(input, callback) {
   // input = input.toLowerCase();
   // console.log(this.state.localidad);
   //  var barrioOptions = [];
   //      if(this.state.barrios!=null){
   //          barrioOptions = this.state.barrios.map(function(obj, index){
   //              return {value: index, label: obj.properties.NOMBRE}
   //          });
   //      }
      
   // console.log(input);
   //      var rtn = {
   //          options: barrioOptions,
   //          complete: false
   //      };
       
   //      setTimeout(function() {
   //          callback(null, rtn);
   //      }, 500);
   //  },
    updateBarrio(index){
        console.log(" barrio "+ index);
       this.setState({barrio: index, bounds: this.state.barrios[index].bbox});
    },
    handleBlur(e){
        console.log(e.target);
    },
    componentDidMount: function(){
         request
           .get('/api/localidades')
           .query({ bbox: true })
           .end(function(err, res){
                //console.log(res.body);
               // this.initSitios(res.body);
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
    hideSubmit(e){
        e.preventDefault();
        console.log("hiding");
        this.setState({showSubmit: false});

    },
    render: function() {

        var radioOptions = [
            {value: 'true', label: 'Existe'},
            {value: 'false', label: 'Ya no existe'}
        ];

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
        }

        var formClassName = '';
      
        var sharedProps = {
          /*  layout: this.state.layout,
            validatePristine: this.state.validatePristine,
            disabled: this.state.disabled */
        };
        var style = {
            margin: "30px"
        };

        var title = this.props.id==null ? "Agregar Sitio": "Editar Sitio";
        var confirm = {};
        if(this.state.showSubmit) confirm = (<ConfirmSubmit submitData={this.state.submitData} resetForm={this.resetForm} hideSubmit={this.hideSubmit}/>);
        return (
            <div style={style} className="row">
                <div className="page-header">
                    <h1>{title}</h1>
                </div>
              
                <Formsy.Form className={formClassName} onSubmit={this.updateData} onChange={this.updateData} onKeyUp={this.updateData} ref="form">

                    <fieldset>
                        <Input
                            {...sharedProps}
                            name="respuesta"
                            value={this.props.data.respuesta}
                            label="Repuesta"
                            type="text"
                        />
                        <Textarea
                            {...sharedProps}
                            rows={3}
                            cols={40}
                            value={this.props.data.porque}
                            name="porque"
                            label="Porque"
                        />
                         <RadioGroup
                            {...sharedProps}
                            name="existente"
                            type="inline"
                            value={JSON.stringify(this.props.data.existente)}
                            label="Temporalidad"
                            options={radioOptions}
                        />
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
                         <FormsyInput
                            {...sharedProps}
                            name="direccion"
                            value={this.props.data.direccion}
                            updateParent={this.updateDireccion}
                            label="Dirección"
                        />
                       
                         <MapLocator 
                             {...sharedProps}
                            rows={3}
                            cols={40}
                            name="coords"
                            value={this.props.data.coords}
                            direccion={this.state.direccion}
                            bounds={this.state.bounds}
                            label="Ubique el sitio en el mapa de Bogotá"
                        />
                          <MultipleDropdown
                            {...sharedProps}
                            name="categoria"
                            value={this.props.data.categoria}
                            
                            label={"Categoría"}
                        />
                         <File
                            {...sharedProps}
                            name="foto"
                            value={this.props.data.foto}
                            label="Foto"
                        />
                         <File
                            {...sharedProps}
                            name="sonido"
                            value={this.props.data.sonido}
                            label="Sonido"
                        />
                        <Input
                            {...sharedProps}
                            name="videoUrl"
                            value={this.props.data.videoUrl}
                            label="Link to video"
                        />
                        <Checkbox
                            {...sharedProps}
                            name="visible"
                            value={this.props.data.visible}
                            label="Visible"
                        />
                    </fieldset>
                   
                   
                    <Row >
                        <input className="btn btn-default" onClick={this.resetForm} type="reset" defaultValue="Reset" />
                        {' '}
                        <button type="button" className="btn btn-primary" onClick={this.submitForm}>Submit </button>
                    </Row>
                </Formsy.Form>
                  {confirm}
            </div>
        );
    }
});

export default AddSite;