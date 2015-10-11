import React from 'react';

  var ReactiveInput = React.createClass({
    // setValue() will set the value of the component, which in 
    // turn will validate it and the rest of the form
    getIntialState: function(){
      return ({value: this.props.value});
    },
    changeValue: function (event) {
      this.setState({value: event.currentTarget.value});
    },
    handleBlur(){
      this.props.updateParent(this.state.value);
    },
    render: function () {
    

      return (
        <div>
          <label>{this.props.label}</label>
          <input className="u-fill-width" type="text" onChange={this.changeValue} onBlur={this.handleBlur} placeholder={this.props.placeholder} value={this.props.value}/>
        </div>
      );
    }
  });
export default ReactiveInput;