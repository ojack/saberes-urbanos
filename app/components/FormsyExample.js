import React from 'react';
import Formsy from 'formsy-react';
import FormsyInput from './FormsyInput';

var FormsyExample = React.createClass({
  getInitialState: function() {
    return { canSubmit: false };
  },
  submit: function (data) {
    alert(JSON.stringify(data, null, 4));
  },
  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },
  render: function () {
    return (
      <Formsy.Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
        <FormsyInput name="nombre" title="Nombre" validations="isEmail" validationError="This is not a valid email" required />
        <FormsyInput name="password" title="Password" type="password" required />
        <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
      </Formsy.Form>
    );
  }
});



export default FormsyExample;