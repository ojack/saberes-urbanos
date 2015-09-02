import React from 'react';

  var Dropdown = React.createClass({

  
    handleChange(e){
      var children;
      if(e.target.value!="default"){
        children = this.props.options[e.target.value].children;
      }
       // console.log("changed "+ e.target.id);
        this.props.changeValue(e.target.id, e.target.value, children);
    },
    render: function () {
   
      var dropdown = this.props.options.map(function(obj, index){
         
              return <option value={index}>{obj.name}</option>;
          
      });
      dropdown.unshift(<option value="default">{"Seleccionar uno..."}</option>);
      // console.log(this.props);
      return (

         <select id={this.props.index} value={this.props.selectedValue}  onChange={this.handleChange}>
                {dropdown}
             </select>
      );
    }
  
  });
export default Dropdown;