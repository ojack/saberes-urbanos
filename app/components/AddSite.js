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
       
        return {direccion: this.props.data.direccion, showSubmit: false, submitData: null, localidades: null, barrios: null}
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
        var submitData = {};
        if(this.state.barrio!=null) submitData.barrio = this.state.barrios[this.state.barrio].properties.NOMBRE;
        if(this.state.localidad!=null) submitData.localidad = this.state.localidades[this.state.localidad].properties.NOMBRE;
        for(var key in data){
            if(data[key]!=null) submitData[key] = data[key];
            
        }
        this.setState({submitData: submitData});//, showSubmit: true});
     
    },
    updateBarrioList(index){
      if(index != this.state.localidad){
        this.setState({localidad: index, barrio: null});
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
    },
    componentDidMount: function(){
         request
           .get('/api/localidades')
           .query({ limit: 50 })
           .end(function(err, res){
                console.log(res.body);
               // this.initSitios(res.body);
                this.setState({localidades: res.body});
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

        var selectOptions = [
            {value: 'Santa Fe', label: 'Santa Fe'},
            {value: 'Chapinero', label: 'Chapinero'}
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
        selectOptions.unshift({value: '', label: 'Seleccionar uno…'});

        var formClassName = '';
      
        var sharedProps = {
          /*  layout: this.state.layout,
            validatePristine: this.state.validatePristine,
            disabled: this.state.disabled */
        };
        var style = {
            margin: "30px"
        };

        var confirm = {};
        if(this.state.showSubmit) confirm = (<ConfirmSubmit submitData={this.state.submitData} resetForm={this.resetForm} hideSubmit={this.hideSubmit}/>);
        return (
            <div style={style} className="row">
                <div className="page-header">
                    <h1>Agregar Sitio</h1>
                </div>
              
                <Formsy.Form className={formClassName} onSubmit={this.updateData} ref="form">

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
                            name="temporalidad"
                            type="inline"
                            value={this.props.data.temporalidad}
                            label="Temporalidad"
                            options={radioOptions}
                        />
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
                         <FormsyInput
                            {...sharedProps}
                            name="direccion"
                            value={this.props.data.direccion}
                            updateParent={this.updateDireccion}
                            label="Dirección"
                        />
                         <MultipleDropdown
                            {...sharedProps}
                            name="categoria"
                            value={this.props.data.direccion}
                            updateParent={this.updateDireccion}
                            label="Categoría"
                        />
                         <MapLocator 
                             {...sharedProps}
                            rows={3}
                            cols={40}
                            name="coords"
                            value={this.props.data.coords}
                            direccion={this.state.direccion}
                            label="Ubique el sitio en el mapa de Bogotá"
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
                        <input className="btn btn-primary" onClick={this.submitForm} formNoValidate={true} type="submit" defaultValue="Submit" />
                    </Row>
                </Formsy.Form>
                  {confirm}
            </div>
        );
    }
});

export default AddSite;