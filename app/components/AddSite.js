import React from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import MapLocator from './MapLocator';
import request from 'superagent';
import FormsyInput from './FormsyInput';
import FormsyDropdown from './FormsyDropdown';
import MultipleDropdown from './MultipleDropdown';

var Checkbox = FRC.Checkbox;
var CheckboxGroup = FRC.CheckboxGroup;
var Input = FRC.Input;
var RadioGroup = FRC.RadioGroup;
var Row = FRC.Row;
var Select = FRC.Select;
var File = FRC.File;
var Textarea = FRC.Textarea;

var AddSite = React.createClass({
    getInitialState(){
       
        return {direccion: this.props.data.direccion, localidades: null, barrios: null}
    },
    resetForm() {
        this.refs.form.reset();
    },
    updateDireccion(val){
        //console.log("updating direccion state");
        this.setState({direccion: val});
        //console.log(this.state);
    },
    submitForm: function(data) {
        console.log(data);
       var r = request.post('api/upload');
       for(var key in data){
        if(data[key] != undefined && data[key] != null){

            //attach files
            if(key == 'foto' || key == 'sonido'){
                if(data[key].length > 0){
                    //console.log(data[key][0]);
                    r.attach(key, data.foto[0]);
                }

            //send other fields as part of request
            } else {

                //format coords for mongo 2d
                if(key == 'coords'){
                    data[key] = [ data[key].lng, data[key].lat ]
                } else if(key=='localidad'){
                    var result = this.state.localidades.filter(function( obj ) {
                  //   console.log(obj);
                    return obj.properties.COD_LOC_IN == parseInt(data[key]);
                   });
                    console.log(data[key]);
                    console.log(result);
                    data[key] = result[0].properties.NOMBRE;
                } else if(key=='barrio'){
                    var result = this.state.barrios.filter(function( obj ) {
                  //   console.log(obj);
                    return obj.properties.OBJECTID == data[key];
                   });
                    console.log(result);
                    data[key] = result[0].properties.NOMBRE;
                }
                r.field(key, data[key]);
            }
        }
       // //console.log(key + " " + typeof(data[key]));
        }
            //console.log(data.coords);
           // r.send(data);
         r.end(function(err, res){
             if (res.ok) {
               //console.log('yay got ' + JSON.stringify(res.body));
             } else {
                //console.log('Oh no! error ' + res.text);
             }
        });
    },
    updateBarrioList: function(code){
        console.log("time to update barrios " + code);
        request
           .get('/api/barrios')
           .query({ code: code })
           .end(function(err, res){
                console.log(res.body);
               // this.initSitios(res.body);
                this.setState({barrios: res.body});
           }.bind(this));
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
            localidadOptions = this.state.localidades.map(function(obj){
                return {value: obj.properties.COD_LOC_IN, label: obj.properties.NOMBRE}
            });
            //console.log(localidadOptions);
        }

         var barrioOptions = [];
        if(this.state.barrios!=null){
            barrioOptions = this.state.barrios.map(function(obj){
                return {value: obj.properties.OBJECTID, label: obj.properties.NOMBRE}
            });
            console.log(barrioOptions);
        }

        selectOptions.unshift({value: '', label: 'Seleccionar uno…'});

        var formClassName = '';
      
        var sharedProps = {
          /*  layout: this.state.layout,
            validatePristine: this.state.validatePristine,
            disabled: this.state.disabled */
        };

        return (
            <div className="row">
                <div className="page-header">
                    <h1>Add Sitio</h1>
                </div>
             
                <Formsy.Form className={formClassName} onSubmit={this.submitForm} ref="form">

                    <fieldset>
                        <Input
                            {...sharedProps}
                            name="respuesta"
                            value={this.props.data.respuesta}
                            label="Repuesta"
                            type="text"
                            required
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
                            required
                        />
                        <FormsyDropdown
                            {...sharedProps}
                            name="localidad"
                            label="Localidad"
                            updateBarrioList = {this.updateBarrioList}
                            value={this.props.data.localidad}
                            options={localidadOptions}
                            required
                        />
                        <FormsyDropdown
                            {...sharedProps}
                            name="barrio"
                            value={this.props.data.barrio}
                            options={barrioOptions}
                            label="Barrio"
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
                            validations="isUrl"
                            validationError="Must be valid URL"
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
                        <input className="btn btn-primary" formNoValidate={true} type="submit" defaultValue="Submit" />
                    </Row>
                </Formsy.Form>
            </div>
        );
    }
});

export default AddSite;