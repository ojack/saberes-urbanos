import React from 'react';
import Formsy from 'formsy-react'

  var FormsyDropdown = React.createClass({

     // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    handleChange(e){
      var children;
     // console.log(event.target);
      //this.setValue(event.currentTarget.name);
      // var result = this.props.options.filter(function( obj ) {
      //   console.log(obj);
      //   return obj.value == e.target.value;
      // });
      //console.log(e.target.value);
      this.setValue(e.target.value);
      if(this.props.callback){
        this.props.callback(e.target.value);
      } 
      // if(e.target.value!="default"){
      //   children = this.props.options[e.target.value].children;
      // }
      //   console.log("changed "+ e.target.id);
      //   this.props.changeValue(e.target.id, e.target.value, children);
    },
    render: function () {
   
      var dropdown = this.props.options.map(function(obj){
         
              return <option value={obj.value}>{obj.label}</option>;
          
      });
      dropdown.unshift(<option value="default">{"Seleccionar uno..."}</option>);
       //console.log(this.props);
      return (
        <div>
        <label>{this.props.label}</label>
         <select value={this.getValue()}  onChange={this.handleChange}>
            
                {dropdown}
             </select>
          </div>
      );
    }
  
  });
export default FormsyDropdown;