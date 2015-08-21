import React from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import MapLocator from './MapLocator';
import request from 'superagent'

var Checkbox = FRC.Checkbox;
var CheckboxGroup = FRC.CheckboxGroup;
var Input = FRC.Input;
var RadioGroup = FRC.RadioGroup;
var Row = FRC.Row;
var Select = FRC.Select;
var File = FRC.File;
var Textarea = FRC.Textarea;

var AddSite = React.createClass({

    resetForm: function() {
        this.refs.form.reset();
    },

    submitForm: function(data) {
        console.log("hey");
        console.log(data);
       var r = request.post('api/upload');
       for(var key in data){
        if(data[key] != undefined && data[key] != null){

            //attach files
            if(key == 'foto' || key == 'sonido'){
                if(data[key].length > 0){
                    console.log(data[key][0]);
                    r.attach(key, data.foto[0]);
                }

            //send other fields as part of request
            } else {

                //format coords for mongo 2d
                 if(key == 'coords'){
                    data[key] = [ data[key].lng, data[key].lat ]
                }
                r.field(key, data[key]);
            }
        }
       // console.log(key + " " + typeof(data[key]));
        }
            console.log(data.coords);
           // r.send(data);
         r.end(function(err, res){
             if (res.ok) {
               console.log('yay got ' + JSON.stringify(res.body));
             } else {
                console.log('Oh no! error ' + res.text);
             }
        });
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
                        <Select
                            {...sharedProps}
                            name="localidad"
                            label="Localidad"
                            value={this.props.data.localidad}
                            options={selectOptions}
                            required
                        />
                        <Input
                            {...sharedProps}
                            name="barrio"
                            value={this.props.data.barrio}
                            label="Barrio"
                        />
                         <Input
                            {...sharedProps}
                            name="direccion"
                            value={this.props.data.direccion}
                            label="Dirrección"
                        />
                         <MapLocator 
                             {...sharedProps}
                            rows={3}
                            cols={40}
                            name="coords"
                            value={this.props.data.coords}
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