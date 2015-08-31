import React from 'react';
import Formsy from 'formsy-react'
import Categorias from './data/categorias.json'
import Dropdown from './Dropdown'

  var MultipleDropdown = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],
    getInitialState(){
      var cat = this.getOptions(Categorias);
      var selection = {selectedValue: "", options: cat};
      var dropdownData = [];
      dropdownData[0] = selection;
      return {dropdownData: dropdownData}
    },

    handleChange(index, childIndex, children){
      var cutIndex = parseInt(index)+1;
      console.log(" slice index is "+ cutIndex);
       var arr = this.state.dropdownData.slice(0, cutIndex);
       console.log(" new array length is "+ arr);
        
      var selection = arr[index];
      console.log(" child index is  "+ childIndex + " selected value "+ selection.selectedValue);
      if(childIndex!=selection.selectedValue){
        
        selection.selectedValue = childIndex;
        arr[index] = selection;
        if(children!=undefined){
          var newObj = {selectedValue: "", options: children};
          console.log(newObj);
          arr.push(newObj);
        } else {
          if(index!="default"){
            this.setValue(selection.options[childIndex].name);
          } else {
             this.setValue(null);
          }
        }
        console.log("data array is");
        console.log(arr);
        this.setState({dropdownData: arr});
      }
    
    },

    getOptions(arr){
        return arr.map(function(obj){
          return obj;
        });
    },
    render: function () {
      console.log(Categorias);
      // Set a specific className based on the validation
      // state of this component. showRequired() is true 
      // when the value is empty and the required prop is 
      // passed to the input. showError() is true when the 
      // value typed is invalid
      var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

      // An error message is returned ONLY if the component is invalid
      // or the server has returned an error message
      var errorMessage = this.getErrorMessage();
      console.log(Categorias.length);
    var dropdowns = this.state.dropdownData.map(function(obj, index){
          return <Dropdown options={obj.options} index={index} changeValue={this.handleChange} selectedValue={obj.selectedValue}/>
     }.bind(this));
      return (
        <div className={className}>
          <label>{this.props.label}</label>
          {dropdowns}
        </div>
      );
    }
  
  });
export default MultipleDropdown;