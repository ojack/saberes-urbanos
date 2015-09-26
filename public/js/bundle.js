(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var App = (function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_reactRouter.RouteHandler, null)
      );
    }
  }]);

  return App;
})(_react2['default'].Component);

exports['default'] = App;
module.exports = exports['default'];

},{"react":"react","react-router":"react-router"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _webBaseMap = require('./web/BaseMap');

var _webBaseMap2 = _interopRequireDefault(_webBaseMap);

var Projeccion = _react2['default'].createClass({
  displayName: 'Projeccion',

  render: function render() {
    return _react2['default'].createElement(_webBaseMap2['default'], null);
  }
});

exports['default'] = Projeccion;
module.exports = exports['default'];

},{"./web/BaseMap":20,"react":"react"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var Register = _react2['default'].createClass({
	displayName: 'Register',

	getInitialState: function getInitialState() {
		return { username: "", password: "" };
	},
	sendLoginRequest: function sendLoginRequest() {
		_superagent2['default'].post("/api/register").send({ username: this.state.username }).send({ password: this.state.password }).end(function (err, res) {
			console.log(err);
			console.log(res);
		});
	},
	handleUserChange: function handleUserChange(e) {
		this.setState({ username: e.target.value });
	},
	handlePasswordChange: function handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'row' },
			_react2['default'].createElement(
				'h1',
				null,
				'Login'
			),
			_react2['default'].createElement(
				'label',
				{ 'for': 'username' },
				'Username'
			),
			_react2['default'].createElement('input', { type: 'text', placeholder: 'username', id: 'username', onChange: this.handleUserChange, value: this.state.username }),
			_react2['default'].createElement(
				'label',
				{ 'for': 'password' },
				'Password'
			),
			_react2['default'].createElement('input', { type: 'password', placeholder: 'password', value: this.state.password, onChange: this.handlePasswordChange, id: 'password' }),
			_react2['default'].createElement(
				'button',
				{ onClick: this.sendLoginRequest },
				'Login '
			)
		);
	}
});

exports['default'] = Register;
module.exports = exports['default'];

},{"react":"react","superagent":56}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _formsyReactComponents = require('formsy-react-components');

var _formsyReactComponents2 = _interopRequireDefault(_formsyReactComponents);

var _MapLocator = require('./MapLocator');

var _MapLocator2 = _interopRequireDefault(_MapLocator);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _FormsyInput = require('./FormsyInput');

var _FormsyInput2 = _interopRequireDefault(_FormsyInput);

var _FormsyDropdown = require('./FormsyDropdown');

var _FormsyDropdown2 = _interopRequireDefault(_FormsyDropdown);

var _MultipleDropdown = require('./MultipleDropdown');

var _MultipleDropdown2 = _interopRequireDefault(_MultipleDropdown);

var _ConfirmSubmit = require('./ConfirmSubmit');

var _ConfirmSubmit2 = _interopRequireDefault(_ConfirmSubmit);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var Checkbox = _formsyReactComponents2['default'].Checkbox;
var CheckboxGroup = _formsyReactComponents2['default'].CheckboxGroup;
var Input = _formsyReactComponents2['default'].Input;
var RadioGroup = _formsyReactComponents2['default'].RadioGroup;
var Row = _formsyReactComponents2['default'].Row;

var File = _formsyReactComponents2['default'].File;
var Textarea = _formsyReactComponents2['default'].Textarea;

var AddSite = _react2['default'].createClass({
    displayName: 'AddSite',

    getInitialState: function getInitialState() {

        return { direccion: this.props.data.direccion, showSubmit: false, submitData: null, localidades: null, barrios: null };
    },
    resetForm: function resetForm() {
        this.refs.form.reset();
    },
    updateDireccion: function updateDireccion(val) {
        //console.log("updating direccion state");
        this.setState({ direccion: val });
        //console.log(this.state);
    },
    submitForm: function submitForm() {
        console.log("show submit");
        this.setState({ showSubmit: true });
    },
    updateData: function updateData(data) {
        // var data = this.props.data;
        // console.log(this.props.data);
        console.log("updating data");
        var submitData = {};
        if (this.state.barrio != null) submitData.barrio = this.state.barrios[this.state.barrio].properties.NOMBRE;
        if (this.state.localidad != null) submitData.localidad = this.state.localidades[this.state.localidad].properties.NOMBRE;
        for (var key in data) {
            if (data[key] != null) submitData[key] = data[key];
        }
        if (this.props.id) submitData.id = this.props.id;
        this.setState({ submitData: submitData }); //, showSubmit: true});
    },
    updateLocalidad: function updateLocalidad(index) {
        if (index != this.state.localidad) {
            this.setState({ localidad: index, barrio: null });
            var code = this.state.localidades[index].properties.COD_LOC_IN;
            this.updateBarrioList(code, false);
        }
    },
    updateBarrioList: function updateBarrioList(code, selectBarrio) {
        console.log("getting code ");
        console.log(code);
        _superagent2['default'].get('/api/barrios').query({ code: code }).query({ bbox: true }).end((function (err, res) {
            // console.log(res.body);
            // this.initSitios(res.body);
            var barrioIndex = null;

            if (selectBarrio == true) {
                for (var i = 0; i < res.body.length; i++) {
                    var obj = res.body[i];

                    if (obj.properties.NOMBRE == this.props.data.barrio) {
                        barrioIndex = i;
                    }
                }
                console.log(barrioIndex);
            }
            this.setState({ barrios: res.body, barrio: barrioIndex });
        }).bind(this));
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
    updateBarrio: function updateBarrio(index) {
        console.log(" barrio " + index);
        this.setState({ barrio: index });
    },
    handleBlur: function handleBlur(e) {
        console.log(e.target);
    },
    componentDidMount: function componentDidMount() {
        _superagent2['default'].get('/api/localidades').query({ limit: 50 }).end((function (err, res) {
            //console.log(res.body);
            // this.initSitios(res.body);
            var localidadIndex = null;
            if (this.props.data.localidad != null) {
                for (var i = 0; i < res.body.length; i++) {
                    var obj = res.body[i];
                    if (obj.properties.NOMBRE == this.props.data.localidad) {
                        localidadIndex = i;
                        this.updateBarrioList(obj.properties.COD_LOC_IN, true);
                    }
                }
            }
            //console.log(localidadIndex);
            this.setState({ localidades: res.body, localidad: localidadIndex });
        }).bind(this));
    },
    hideSubmit: function hideSubmit(e) {
        e.preventDefault();
        console.log("hiding");
        this.setState({ showSubmit: false });
    },
    render: function render() {

        var radioOptions = [{ value: 'true', label: 'Existe' }, { value: 'false', label: 'Ya no existe' }];

        var localidadOptions = [];
        if (this.state.localidades != null) {
            localidadOptions = this.state.localidades.map(function (obj, index) {
                return { value: index, label: obj.properties.NOMBRE };
            });
            //console.log(localidadOptions);
        }
        var barrioOptions = [];
        if (this.state.barrios != null) {
            barrioOptions = this.state.barrios.map(function (obj, index) {
                return { value: index, label: obj.properties.NOMBRE };
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

        var title = this.props.id == null ? "Agregar Sitio" : "Editar Sitio";
        var confirm = {};
        if (this.state.showSubmit) confirm = _react2['default'].createElement(_ConfirmSubmit2['default'], { submitData: this.state.submitData, resetForm: this.resetForm, hideSubmit: this.hideSubmit });
        return _react2['default'].createElement(
            'div',
            { style: style, className: 'row' },
            _react2['default'].createElement(
                'div',
                { className: 'page-header' },
                _react2['default'].createElement(
                    'h1',
                    null,
                    title
                )
            ),
            _react2['default'].createElement(
                _formsyReact2['default'].Form,
                { className: formClassName, onSubmit: this.updateData, ref: 'form' },
                _react2['default'].createElement(
                    'fieldset',
                    null,
                    _react2['default'].createElement(Input, _extends({}, sharedProps, {
                        name: 'respuesta',
                        value: this.props.data.respuesta,
                        label: 'Repuesta',
                        type: 'text'
                    })),
                    _react2['default'].createElement(Textarea, _extends({}, sharedProps, {
                        rows: 3,
                        cols: 40,
                        value: this.props.data.porque,
                        name: 'porque',
                        label: 'Porque'
                    })),
                    _react2['default'].createElement(RadioGroup, _extends({}, sharedProps, {
                        name: 'existente',
                        type: 'inline',
                        value: JSON.stringify(this.props.data.existente),
                        label: 'Temporalidad',
                        options: radioOptions
                    })),
                    _react2['default'].createElement(_reactSelect2['default'], {
                        name: 'localidad',
                        searchPromptText: 'Localidad',
                        placeholder: 'Localidad',
                        options: localidadOptions,
                        value: this.state.localidad,
                        onChange: this.updateLocalidad,
                        onBlur: this.handleBlur,
                        noResultsText: ''
                    }),
                    _react2['default'].createElement(_reactSelect2['default'], {
                        name: 'barrio',
                        searchPromptText: 'Barrio',
                        placeholder: 'Barrio',
                        value: this.state.barrio,
                        options: barrioOptions,
                        onChange: this.updateBarrio,
                        noResultsText: ''
                    }),
                    _react2['default'].createElement(_FormsyInput2['default'], _extends({}, sharedProps, {
                        name: 'direccion',
                        value: this.props.data.direccion,
                        updateParent: this.updateDireccion,
                        label: 'Dirección'
                    })),
                    _react2['default'].createElement(_MultipleDropdown2['default'], _extends({}, sharedProps, {
                        name: 'categoria',
                        value: this.props.data.categoria,

                        label: "Categoría"
                    })),
                    _react2['default'].createElement(_MapLocator2['default'], _extends({}, sharedProps, {
                        rows: 3,
                        cols: 40,
                        name: 'coords',
                        value: this.props.data.coords,
                        direccion: this.state.direccion,
                        label: 'Ubique el sitio en el mapa de Bogotá'
                    })),
                    _react2['default'].createElement(File, _extends({}, sharedProps, {
                        name: 'foto',
                        value: this.props.data.foto,
                        label: 'Foto'
                    })),
                    _react2['default'].createElement(File, _extends({}, sharedProps, {
                        name: 'sonido',
                        value: this.props.data.sonido,
                        label: 'Sonido'
                    })),
                    _react2['default'].createElement(Input, _extends({}, sharedProps, {
                        name: 'videoUrl',
                        value: this.props.data.videoUrl,
                        label: 'Link to video'
                    })),
                    _react2['default'].createElement(Checkbox, _extends({}, sharedProps, {
                        name: 'visible',
                        value: this.props.data.visible,
                        label: 'Visible'
                    }))
                ),
                _react2['default'].createElement(
                    Row,
                    null,
                    _react2['default'].createElement('input', { className: 'btn btn-default', onClick: this.resetForm, type: 'reset', defaultValue: 'Reset' }),
                    ' ',
                    _react2['default'].createElement(
                        'button',
                        { className: 'btn btn-primary', onClick: this.submitForm },
                        'Submit '
                    )
                )
            ),
            confirm
        );
    }
});

exports['default'] = AddSite;
module.exports = exports['default'];

},{"./ConfirmSubmit":7,"./FormsyDropdown":9,"./FormsyInput":10,"./MapLocator":14,"./MultipleDropdown":15,"formsy-react":46,"formsy-react-components":38,"react":"react","react-select":51,"superagent":56}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AddSite = require('./AddSite');

var _AddSite2 = _interopRequireDefault(_AddSite);

var _AdminList = require('./AdminList');

var _AdminList2 = _interopRequireDefault(_AdminList);

// <AdminList/>
// <AddSite data={data}/>

var data = {
	respuesta: null,
	porque: null,
	existente: null,
	localidad: null,
	barrio: null,
	direccion: null,
	coords: {
		lat: 4.597,
		lng: -74.09
	},
	foto: null,
	sonido: null,
	videoUrl: null,
	visible: null
};

var Admin = _react2['default'].createClass({
	displayName: 'Admin',

	render: function render() {
		return _react2['default'].createElement(_AddSite2['default'], { data: data });
	}
});

exports['default'] = Admin;
module.exports = exports['default'];

},{"./AddSite":4,"./AdminList":6,"react":"react"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _ListEntry = require('./ListEntry');

var _ListEntry2 = _interopRequireDefault(_ListEntry);

var _AddSite = require('./AddSite');

var _AddSite2 = _interopRequireDefault(_AddSite);

var AdminList = _react2['default'].createClass({
	displayName: 'AdminList',

	getInitialState: function getInitialState() {
		//create array

		return { sitios: [], selected: null };
	},
	onEdit: function onEdit(info) {
		console.log("edit");
		console.log(info);
		this.setState({ selected: info });
	},
	onDelete: function onDelete(info, index) {
		console.log("edit");
		console.log(info);
		var r = confirm("Eliminar?");
		console.log(index);
		if (r) {
			_superagent2['default'].del('/api/sitio').query({ id: info._id }).end((function (err, res) {
				console.log(res);
				var sitios = this.state.sitios;
				console.log(sitios);
				sitios.splice(index, 1);
				console.log(sitios);
				this.setState({ sitios: sitios });
				//this.setState({sitios: res.body});
			}).bind(this));
		}
	},
	componentDidMount: function componentDidMount() {
		_superagent2['default'].get('/api/sitios').query({ limit: 50 }).end((function (err, res) {
			console.log(res.body);
			this.setState({ sitios: res.body });
		}).bind(this));
	},

	getItem: function getItem(index) {
		var arr = [];
		var obj = this.state.sitios[index];
		for (var i = 0; i < this.state.columns.length; i++) {
			arr[i] = obj[this.state.columns[i]];
		}
		arr[i * 1] = obj['_id'];
		console.log(arr);
		return arr;
	},
	handleRowClick: function handleRowClick(e) {
		console.log(e);
	},
	render: function render() {
		var header = ["respuesta", "existente", "categoria", "localidad", "barrio", "foto", "sonido", "visible"];
		var headerRender = header.map(function (title) {
			return _react2['default'].createElement(
				'td',
				null,
				title
			);
		});
		console.log(this.state.sitios);
		var listRender = this.state.sitios.map((function (object, index) {
			//console.log(object);
			var coords = { lat: object.geometry.coordinates[1], lng: object.geometry.coordinates[0] };
			object.properties.coords = coords;
			return _react2['default'].createElement(_ListEntry2['default'], { index: index, data: object, onEdit: this.onEdit, onDelete: this.onDelete });
		}).bind(this));
		if (this.state.selected != null) {
			return _react2['default'].createElement(_AddSite2['default'], { data: this.state.selected.properties, id: this.state.selected._id });
		}
		return _react2['default'].createElement(
			'table',
			null,
			_react2['default'].createElement(
				'th',
				null,
				headerRender
			),
			listRender
		);
	}
});

exports['default'] = AdminList;
module.exports = exports['default'];

},{"./AddSite":4,"./ListEntry":12,"react":"react","superagent":56}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function upload_file(file, signed_request, url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", signed_request);
  xhr.setRequestHeader('x-amz-acl', 'public-read');
  xhr.onload = function () {
    if (xhr.status === 200) {
      callback(null, url);
    }
  };
  xhr.onerror = function () {
    callback("couldnt upload file", null);
  };
  xhr.send(file);
}

var ConfirmSubmit = _react2['default'].createClass({
  displayName: 'ConfirmSubmit',

  getInitialState: function getInitialState() {

    return { confirmationState: "form", statusMessage: [], numCallbacks: 0 };
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault(); // maybe remove this when more figured out

    var numCallbacks = 1; // hacky way to know when all callbacks have terminated
    var url = "/api/add-sitio";
    if (this.props.submitData.id && this.props.submitData.id != null) {
      url = "/api/update-sitio";
    }

    console.log(url);
    var r = _superagent2['default'].post(url).send(this.props.submitData);
    if (this.props.submitData.foto && this.props.submitData.foto != null) {
      numCallbacks++;
      var foto = this.props.submitData.foto[0];
      r.send({ foto_name: foto.name }).send({ foto_type: foto.type });
    }
    if (this.props.submitData.sonido && this.props.submitData.sonido != null) {
      numCallbacks++;
      var sonido = this.props.submitData.sonido[0];
      r.send({ sonido_name: sonido.name }).send({ sonido_type: sonido.type });
    }
    this.setState({ confirmationState: "loading", statusMessage: ["adding to database"] });
    this.setState({ numCallbacks: numCallbacks });
    r.end((function (err, res) {
      this.setState({ numCallbacks: this.state.numCallbacks - 1 });
      console.log(res);
      if (err) {
        this.setState({ statusMessage: [" ERROR " + err] });
      } else {
        var response = JSON.parse(res.text);
        var status = [];
        status.push("+ sitio agregado al base de datos");
        console.log(response);
        if (response.foto) {
          var foto = this.props.submitData.foto[0];
          status.push("subiendo foto");

          upload_file(foto, response.foto.signed_request, response.foto.url, (function (err, url) {
            if (err) {
              console.log(err);
            } else {
              console.log(url);
              _superagent2['default'].put('/api/add-url').send({ id: response.foto.id, type: "foto", url: url }).end((function (err, res) {
                if (err) {
                  this.setState({ statusMessage: ["ERROR subiendo foto: " + err] });
                } else {
                  this.setState({ statusMessage: ["foto subido :)" + url], numCallbacks: this.state.numCallbacks - 1 });
                }
              }).bind(this));
            }
          }).bind(this));
        }
        if (response.sonido) {
          status.push("subiendo audio");

          var sonido = this.props.submitData.sonido[0];
          upload_file(sonido, response.sonido.signed_request, response.sonido.url, (function (err, url) {
            if (err) {
              console.log(err);
            } else {
              console.log(url);
              _superagent2['default'].put('/api/add-url').send({ id: response.sonido.id, type: "sonido", url: url }).end((function (err, res) {
                if (err) {
                  this.setState({ statusMessage: ["ERROR subiendo audio: " + err] });
                } else {
                  this.setState({ statusMessage: ["audio subido :) " + url], numCallbacks: this.state.numCallbacks - 1 });
                }
              }).bind(this));
            }
          }).bind(this));
        }
        this.setState({ statusMessage: status });
      }
      //    console.log(response);
      // console.log(res);
    }).bind(this));
  },
  render: function render() {
    console.log(" data is ");
    console.log(this.props.submitData);
    var style = {
      position: "fixed",
      top: "0px",
      left: "0px",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)"

    };

    var popupStyle = {
      backgroundColor: "#000",
      width: "600px",
      padding: "20px",
      margin: "auto",
      position: "absolute",
      top: 0, left: 0, bottom: 0, right: 0, height: "300"

    };
    var popupContents = [];
    if (this.state.confirmationState == "form") {

      var buttonStyle = {
        marginLeft: "10px"
      };
      var submitData = [];
      for (var key in this.props.submitData) {
        var val = "";
        if (key == "foto" || key == "sonido") {
          val = JSON.stringify(this.props.submitData[key][0].name);
        } else {
          val = JSON.stringify(this.props.submitData[key]);
        }
        submitData.push(_react2['default'].createElement(
          'li',
          null,
          key + ": " + val
        ));
      }

      popupContents = _react2['default'].createElement(
        'div',
        { id: 'confirm' },
        _react2['default'].createElement(
          'h3',
          null,
          ' Confirmar '
        ),
        _react2['default'].createElement(
          'ul',
          null,
          submitData
        ),
        _react2['default'].createElement(
          'button',
          { onClick: this.props.hideSubmit },
          'Keep editing '
        ),
        _react2['default'].createElement(
          'button',
          { style: buttonStyle, onClick: this.handleSubmit },
          'Submit'
        )
      );
    } else if (this.state.confirmationState == "loading") {
      console.log(" callbacks " + this.state.numCallbacks);
      if (this.state.numCallbacks <= 0) {
        popupContents = _react2['default'].createElement(
          'h1',
          null,
          'Success!'
        );
        setTimeout(function () {
          location.reload();
        }, 500);
      } else {
        var status = this.state.statusMessage.map(function (string) {
          console.log(string);
          return _react2['default'].createElement(
            'div',
            null,
            string
          );
        });
        popupContents = _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'div',
            { className: 'loader' },
            'Loading...'
          ),
          _react2['default'].createElement(
            'div',
            null,
            status
          )
        );
      }
    }

    return _react2['default'].createElement(
      'div',
      { style: style },
      _react2['default'].createElement(
        'div',
        { style: popupStyle },
        popupContents
      )
    );
  }

});

exports['default'] = ConfirmSubmit;

// // var r = request.post('api/upload');
//       for(var key in data){
//        if(data[key] != undefined && data[key] != null){

//            //attach files
//            if(key == 'foto' || key == 'sonido'){
//                if(data[key].length > 0){
//                    //console.log(data[key][0]);
//                    // r.attach(key, data.foto[0]);
//                }

//            //send other fields as part of request
//            } else {

//                //format coords for mongo 2d
//                if(key == 'coords'){
//                    data[key] = [ data[key].lng, data[key].lat ]
//                } else if(key=='localidad'){
//                    var result = this.state.localidades.filter(function( obj ) {
//                  //   console.log(obj);
//                    return obj.properties.COD_LOC_IN == parseInt(data[key]);
//                   });
//                    console.log(data[key]);
//                    console.log(result);
//                    data[key] = result[0].properties.NOMBRE;
//                } else if(key=='barrio'){
//                    var result = this.state.barrios.filter(function( obj ) {
//                  //   console.log(obj);
//                    return obj.properties.OBJECTID == data[key];
//                   });
//                    console.log(result);
//                    data[key] = result[0].properties.NOMBRE;
//                }
//                // r.field(key, data[key]);
//            }
//        }
//       // //console.log(key + " " + typeof(data[key]));
//        }

//console.log(data.coords);
//    // r.send(data);
//  r.end(function(err, res){
//      if (res.ok) {
//        //console.log('yay got ' + JSON.stringify(res.body));
//      } else {
//         //console.log('Oh no! error ' + res.text);
//      }
// });
module.exports = exports['default'];

},{"react":"react","superagent":56}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Dropdown = _react2["default"].createClass({
  displayName: "Dropdown",

  handleChange: function handleChange(e) {
    var children;
    if (e.target.value != "default") {
      children = this.props.options[e.target.value].children;
    }
    // console.log("changed "+ e.target.id);
    this.props.changeValue(e.target.id, e.target.value, children);
  },
  render: function render() {

    var dropdown = this.props.options.map(function (obj, index) {

      return _react2["default"].createElement(
        "option",
        { value: index },
        obj.name
      );
    });
    dropdown.unshift(_react2["default"].createElement(
      "option",
      { value: "default" },
      "Seleccionar uno..."
    ));
    // console.log(this.props);
    return _react2["default"].createElement(
      "select",
      { id: this.props.index, value: this.props.selectedValue, onChange: this.handleChange },
      dropdown
    );
  }

});
exports["default"] = Dropdown;
module.exports = exports["default"];

},{"react":"react"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var FormsyDropdown = _react2['default'].createClass({
  displayName: 'FormsyDropdown',

  // Add the Formsy Mixin
  mixins: [_formsyReact2['default'].Mixin],

  handleChange: function handleChange(e) {
    var children;
    // console.log(event.target);
    //this.setValue(event.currentTarget.name);
    // var result = this.props.options.filter(function( obj ) {
    //   console.log(obj);
    //   return obj.value == e.target.value;
    // });
    //console.log(e.target.value);
    this.setValue(e.target.value);
    if (this.props.callback) {
      this.props.callback(e.target.value);
    }
    // if(e.target.value!="default"){
    //   children = this.props.options[e.target.value].children;
    // }
    //   console.log("changed "+ e.target.id);
    //   this.props.changeValue(e.target.id, e.target.value, children);
  },
  render: function render() {

    var dropdown = this.props.options.map(function (obj) {

      return _react2['default'].createElement(
        'option',
        { value: obj.value },
        obj.label
      );
    });
    dropdown.unshift(_react2['default'].createElement(
      'option',
      { value: 'default' },
      "Seleccionar uno..."
    ));
    //console.log(this.props);
    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'label',
        null,
        this.props.label
      ),
      _react2['default'].createElement(
        'select',
        { value: this.getValue(), onChange: this.handleChange },
        dropdown
      )
    );
  }

});
exports['default'] = FormsyDropdown;
module.exports = exports['default'];

},{"formsy-react":46,"react":"react"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var FormsyInput = _react2['default'].createClass({
  displayName: 'FormsyInput',

  // Add the Formsy Mixin
  mixins: [_formsyReact2['default'].Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue: function changeValue(event) {
    this.setValue(event.currentTarget.value);
  },
  handleBlur: function handleBlur() {
    this.props.updateParent(this.getValue());
  },
  render: function render() {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.getErrorMessage();

    return _react2['default'].createElement(
      'div',
      { className: className },
      _react2['default'].createElement(
        'label',
        null,
        this.props.label
      ),
      _react2['default'].createElement('input', { type: 'text', onChange: this.changeValue, onBlur: this.handleBlur, value: this.getValue() }),
      _react2['default'].createElement(
        'span',
        null,
        errorMessage
      )
    );
  }
});
exports['default'] = FormsyInput;
module.exports = exports['default'];

},{"formsy-react":46,"react":"react"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var Geocode = _react2['default'].createClass({
	displayName: 'Geocode',

	getInitialState: function getInitialState() {
		console.log(this.props.geocoder);
		//when user hasnt touched search box, value is set from props
		return { updateFromProps: true, querystring: this.props.querystring };
	},
	handleSearchChange: function handleSearchChange(e) {
		this.setState({ querystring: e.target.value, updateFromProps: false });
	},

	handleKeyUp: function handleKeyUp(e) {
		e.preventDefault();
		if (e.keyCode == 13) {
			//console.log("handling key up");
			//var query_string = "https://dev.virtualearth.net/REST/v1/Locations/1%20Microsoft%20Way%20Redmond%20WA%2098052?key=ArZ9iodclv6caCIXL7qFS8KBePoxP2a4etk2fVoy9Uw_BQEP3NEO7l_yNemfqQE2";
			this.geocode();
		}
	},
	handleBlur: function handleBlur(e) {
		//alert();
		this.geocode();
	},
	geocode: function geocode() {
		//console.log("query string is " + this.state.querystring);
		if (this.state.querystring != null) {
			console.log(this.props.bounds);
			this.props.geocoder.geocode({ 'address': this.state.querystring, 'componentRestrictions': { country: 'CO', locality: 'Bogotá' }, bounds: this.props.bounds, 'region': 'CO' }, (function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					// resultsMap.setCenter(results[0].geometry.location);
					// var marker = new google.maps.Marker({
					//   map: resultsMap,
					//   position: results[0].geometry.location
					// });
					// var data = {};
					// data.coords = {};
					// data.coords.lat = results[0].geometry.location.H;
					// data.coords.lng = results[0].geometry.location.L;
					this.props.updateCoords(results[0].geometry.location);
					console.log(results);
				} else {
					console.log('Geocode was not successful for the following reason: ' + status);
				}
			}).bind(this));
			// 	var query = { query: this.state.querystring, lat: this.props.coords.lat, lng: this.props.coords.lng };
			// 	//console.log(query);
			// 	 request
			// 	   .get('/api/geocode')
			// 	   .query(query)
			// 	   .end(function(err, res){
			// 	   		if(err){
			// 	   			//console.log(err);
			// 	   		} else {
			// 	   			//console.log(res);
			// 	   			this.props.updateCoords(res.body);
			// 	   		}
			// 	   }.bind(this));
		}
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		//console.log("received props");
		//console.log(nextProps);
		if (this.state.updateFromProps) {
			if (nextProps.querystring != this.state.querystring) {
				this.setState({ querystring: nextProps.querystring }, (function () {
					this.geocode();
				}).bind(this));
			}
		}
	},
	componentWillMount: function componentWillMount() {
		if (this.props.querystring != null) {
			this.geocode(this.state.querystring);
		}
	},
	render: function render() {
		//this.geocode(this.props.querystring);
		return _react2['default'].createElement('input', { type: 'text', id: 'geocode', onChange: this.handleSearchChange, value: this.state.querystring, onKeyUp: this.handleKeyUp, onBlur: this.handleBlur, placeholder: 'Buscar...' });
	}
});

exports['default'] = Geocode;
module.exports = exports['default'];

},{"react":"react","superagent":56}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var ListEntry = _react2["default"].createClass({
  displayName: "ListEntry",

  handleEdit: function handleEdit() {
    this.props.onEdit(this.props.data);
  },
  handleDelete: function handleDelete() {
    this.props.onDelete(this.props.data, this.props.index);
  },
  render: function render() {
    var imgStyle = {
      width: "150px",
      height: "60px"
    };
    var sonido = "";
    var properties = this.props.data.properties;
    if (properties.sonidoUrl) sonido = "X";
    return _react2["default"].createElement(
      "tr",
      null,
      _react2["default"].createElement(
        "td",
        null,
        properties.created
      ),
      _react2["default"].createElement(
        "td",
        null,
        properties.respuesta
      ),
      _react2["default"].createElement(
        "td",
        null,
        JSON.stringify(properties.existente)
      ),
      _react2["default"].createElement(
        "td",
        null,
        properties.categoria
      ),
      _react2["default"].createElement(
        "td",
        null,
        properties.localidad
      ),
      _react2["default"].createElement(
        "td",
        null,
        properties.barrio
      ),
      _react2["default"].createElement(
        "td",
        null,
        _react2["default"].createElement("img", { style: imgStyle, src: properties.fotoUrl })
      ),
      _react2["default"].createElement(
        "td",
        null,
        sonido
      ),
      _react2["default"].createElement(
        "td",
        null,
        _react2["default"].createElement("input", { type: "checkbox", checked: this.props.visible })
      ),
      _react2["default"].createElement(
        "td",
        null,
        _react2["default"].createElement(
          "button",
          { onClick: this.handleEdit },
          "Editar"
        )
      ),
      _react2["default"].createElement(
        "td",
        null,
        _react2["default"].createElement(
          "button",
          { onClick: this.handleDelete },
          "Eliminar"
        )
      )
    );
  }
});

exports["default"] = ListEntry;
module.exports = exports["default"];

},{"react":"react"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AdminList = require('./AdminList');

var _AdminList2 = _interopRequireDefault(_AdminList);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var Login = _react2['default'].createClass({
	displayName: 'Login',

	getInitialState: function getInitialState() {
		return { username: "", password: "", loggedIn: false };
	},
	sendLoginRequest: function sendLoginRequest() {
		_superagent2['default'].post("/api/login").send({ username: this.state.username }).send({ password: this.state.password }).end((function (err, res) {
			if (err) {
				console.log(err);
			} else {
				console.log(res.text);
				if (res.text == "valid") {
					this.setState({ loggedIn: true });
				}
			}
		}).bind(this));
	},
	handleUserChange: function handleUserChange(e) {
		this.setState({ username: e.target.value });
	},
	handlePasswordChange: function handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	},

	render: function render() {
		if (this.state.loggedIn) {
			return _react2['default'].createElement(_AdminList2['default'], null);
		} else {
			return _react2['default'].createElement(
				'div',
				{ className: 'container' },
				_react2['default'].createElement(
					'div',
					{ className: 'row' },
					_react2['default'].createElement(
						'h1',
						null,
						'Login'
					),
					_react2['default'].createElement(
						'label',
						{ 'for': 'username' },
						'Username'
					),
					_react2['default'].createElement('input', { type: 'text', placeholder: 'username', id: 'username', onChange: this.handleUserChange, value: this.state.username }),
					_react2['default'].createElement(
						'label',
						{ 'for': 'password' },
						'Password'
					),
					_react2['default'].createElement('input', { type: 'password', placeholder: 'password', value: this.state.password, onChange: this.handlePasswordChange, id: 'password' }),
					_react2['default'].createElement(
						'div',
						null,
						_react2['default'].createElement(
							'button',
							{ onClick: this.sendLoginRequest },
							'Login '
						)
					)
				)
			);
		}
	}
});

exports['default'] = Login;
module.exports = exports['default'];

},{"./AdminList":6,"react":"react","superagent":56}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _Geocode = require('./Geocode');

var _Geocode2 = _interopRequireDefault(_Geocode);

var ReactScriptLoaderModule = require('react-script-loader');
var ReactScriptLoaderMixin = ReactScriptLoaderModule.ReactScriptLoaderMixin;
var ReactScriptLoader = ReactScriptLoaderModule.ReactScriptLoader;

var API_KEY = "AIzaSyDSAaqtPycMHBfGlBjG-q-UzKm6T-YDHhA";

var scriptURL = "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&callback=initMap";

var MapLocator = _react2['default'].createClass({
  displayName: 'MapLocator',

  mixins: [_formsyReact2['default'].Mixin, ReactScriptLoaderMixin],
  // componentWillReceiveProps(nextProps){
  // 	if(nextProps.location != this.props.location){
  // 		this.map.flyTo({center: [nextProps.location.lat, nextProps.location.lng], zoom: 16});
  // 	}

  // },
  // changeValue: function(lat, lng){
  // 	this.setValue(event.currentTarget.value);
  // },
  getScriptURL: function getScriptURL() {
    return scriptURL;
  },
  // Ensure that onScriptLoaded is deferred until the
  // ReactScriptLoader.triggerOnScriptLoaded() call above is made in
  // initializeMaps().
  deferOnScriptLoaded: function deferOnScriptLoaded() {
    return true;
  },

  onScriptLoaded: function onScriptLoaded() {
    // Render a map with the center point given by the component's lat and lng
    // properties.
    console.log("script loaded");

    //[this.getValue().lng, this.getValue().lat]
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.getValue().lat, lng: this.getValue().lng },
      zoom: 13,
      streetViewControl: false
    });
    google.maps.event.addListenerOnce(this.map, 'idle', (function () {
      var bounds = this.map.getBounds();
      console.log("bounds are");
      console.log(bounds);
      this.setState({ scriptLoaded: true, bounds: bounds });
    }).bind(this));

    this.map.addListener('center_changed', (function () {
      var coords = this.map.getCenter();
      //console.log(coords);
      this.setValue({ lat: coords.H, lng: coords.L });
      var bounds = this.map.getBounds();
      this.setState({ bounds: bounds });
    }).bind(this));
    this.geocoder = new google.maps.Geocoder();
  },
  onScriptError: function onScriptError() {
    // Show the user an error message.
  },
  getInitialState: function getInitialState() {
    return { scriptLoaded: false, bounds: null };
  },
  updateCoords: function updateCoords(loc) {
    //console.log("updating");
    //console.log(data);
    //data.coords.lat = loc.H;
    // data.coords.lng = results[0].geometry.location.L;
    this.setValue({ lat: loc.H, lng: loc.L });
    this.map.setCenter(loc, 16);
    //this.map.flyTo({center: [data.coords.lng, data.coords.lat], zoom: 16});
  },
  componentDidMount: function componentDidMount() {
    //console.log("calling component mount");
    //console.log(this.props);
    window.initMap = function () {

      // This triggers the onScriptLoaded method call on all mounted Map components.
      ReactScriptLoader.triggerOnScriptLoaded(scriptURL);
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    //console.log("locator received props");
    //console.log(nextProps);
  },
  render: function render() {
    //console.log("rerendering maplocator");
    var geocode = {};
    if (this.state.scriptLoaded) {
      geocode = _react2['default'].createElement(_Geocode2['default'], { coords: this.getValue(), geocoder: this.geocoder, bounds: this.state.bounds, querystring: this.props.direccion, updateCoords: this.updateCoords });
    }
    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'label',
        null,
        this.props.label
      ),
      _react2['default'].createElement(
        'div',
        { id: 'map-container' },
        _react2['default'].createElement('div', { id: 'map' }),
        _react2['default'].createElement('img', { id: 'pin', src: '/img/pin-flat.png', alt: 'pin', height: '40', width: '25' }),
        geocode
      )
    );
  }
});

exports['default'] = MapLocator;
module.exports = exports['default'];

},{"./Geocode":11,"formsy-react":46,"react":"react","react-script-loader":49}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _dataCategoriasJson = require('./../data/categorias.json');

var _dataCategoriasJson2 = _interopRequireDefault(_dataCategoriasJson);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var MultipleDropdown = _react2['default'].createClass({
  displayName: 'MultipleDropdown',

  // Add the Formsy Mixin
  mixins: [_formsyReact2['default'].Mixin],
  getInitialState: function getInitialState() {
    var cat = this.getOptions(_dataCategoriasJson2['default']);
    var selection = { selectedValue: "", options: cat };
    var dropdownData = [];
    dropdownData[0] = selection;
    return { dropdownData: dropdownData };
  },

  handleChange: function handleChange(index, childIndex, children) {
    var cutIndex = parseInt(index) + 1;
    //console.log(" slice index is "+ cutIndex);
    var arr = this.state.dropdownData.slice(0, cutIndex);
    //console.log(" new array length is "+ arr);

    var selection = arr[index];
    //console.log(" child index is  "+ childIndex + " selected value "+ selection.selectedValue);
    if (childIndex != selection.selectedValue) {

      selection.selectedValue = childIndex;
      arr[index] = selection;
      if (children != undefined) {
        var newObj = { selectedValue: "", options: children };
        //console.log(newObj);
        arr.push(newObj);
      } else {
        if (index != "default") {
          this.setValue(selection.options[childIndex].name);
        } else {
          this.setValue(null);
        }
      }
      //console.log("data array is");
      //console.log(arr);
      this.setState({ dropdownData: arr });
    }
  },

  getOptions: function getOptions(arr) {
    return arr.map(function (obj) {
      return obj;
    });
  },
  render: function render() {
    //console.log(Categorias);
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.getErrorMessage();
    //console.log(Categorias.length);
    var dropdowns = this.state.dropdownData.map((function (obj, index) {
      return _react2['default'].createElement(_Dropdown2['default'], { options: obj.options, index: index, changeValue: this.handleChange, selectedValue: obj.selectedValue });
    }).bind(this));
    return _react2['default'].createElement(
      'div',
      { className: className },
      _react2['default'].createElement(
        'label',
        null,
        this.props.label + ": " + this.getValue()
      ),
      dropdowns
    );
  }

});
exports['default'] = MultipleDropdown;
module.exports = exports['default'];

},{"./../data/categorias.json":16,"./Dropdown":8,"formsy-react":46,"react":"react"}],16:[function(require,module,exports){
module.exports=[
	{
		"name": "monumental",
		"children":  [
			{"name": "mural"}, 
			{"name": "commemoración"}, 
			{"name": "evento religioso"}, 
			{"name": "cementerio"}, 
			{"name": "fantasma"}, 
			{"name": "escultura"}, 
			{"name": "personaje ilustre"}, 
			{"name": "plaza"},
			{"name": "escultura"}
		]
	},
	{
		"name": "esparcimiento y cultura",
		"children": [
			{"name": "espectáculo"}, 
			{"name": "bar"}, 
			{"name": "bazar"}, 
			{"name": "festival"}, 
			{"name": "club"}, 
			{"name": "discoteca"}, 
			{"name":  "sala de concierto"}, 
			{"name":  "museo"}, 
			{"name":  "biblioteca"}, 
			{"name":  "teatro"}, 
			{"name":  "cine"}, 
			{"name":  "café"}, 
			{"name":  "centro cultural"}, 
			{"name":  "chichería"}
		]
	},
	{
		"name": "arquitectónico",
		"children":[
			{"name": "técnica constructiva"}, 
			{"name": "conjunto cerrado"}, 
			{"name": "clínica"}, 
			{"name": "iglesia"}, 
			{"name": "barrio"}, 
			{"name": "asilo"}, 
			{"name": "hospital"}, 
			{"name": "vivienda"}
		]
	},
	{
		"name": "industrial",
		"children":[
			{"name": "medio de transporte"}, 
			{"name": "fábrica tradicional"}, 
			{"name": "taller"}, 
			{"name": "almacén"}, 
			{"name": "estrategias de ventas semi-sedentarias"}, 
			{"name": "centro comercial"}, 
			{"name": "pasaje comercial"}, 
			{"name": "técnica de produccion"}
		]
	},
	{
		"name": "natural",
		"children": [
			{
				"name": "zonas verdes",
				"children":[
					{"name": "alameda"},
					{"name": "espacio público"},
					{"name": "corredor vial"}
				]
			},
			{
				"name": "áreas protegidas",
				"children":[
					{"name": "humedal"},
					{"name": "cerros orientales"},
					{"name": "reserva forestal"}
				]
			},
			{
				"name": "áreas de manejo especial",
				"children":[
					{"name": "quebrada"},
					{"name": "canal"},
					{"name": "río"}
				]
			},
			{
				"name": "parques urbanos",
				"children":[
					{"name": "parque de bolsillo"},
					{"name": "parque vecinal"},
					{"name": "parque metropolitano"},
					{"name": "parque regional"}
				]
			}
		]
	}
]
},{}],17:[function(require,module,exports){
module.exports={
  "version": 8,
  "name": "Light",
  "sources": {
    "mapbox": {
      "url": "mapbox://mapbox.mapbox-streets-v6",
      "type": "vector"
    },
    "mapbox://mapbox.mapbox-terrain-v2": {
      "url": "mapbox://mapbox.mapbox-terrain-v2",
      "type": "vector"
    }
  },
  "sprite": "mapbox://sprites/mapbox/light-v8",
  "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "background-color": "#eee"
      }
    },
    {
      "id": "landcover_snow",
      "type": "fill",
      "source": "mapbox://mapbox.mapbox-terrain-v2",
      "source-layer": "landcover",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "class",
          "snow"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#fff",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "landcover_crop",
      "type": "fill",
      "source": "mapbox://mapbox.mapbox-terrain-v2",
      "source-layer": "landcover",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "class",
          "crop"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#ececec",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "landcover_grass",
      "type": "fill",
      "source": "mapbox://mapbox.mapbox-terrain-v2",
      "source-layer": "landcover",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "class",
          "grass"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#e5e5e5",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "landcover_scrub",
      "type": "fill",
      "source": "mapbox://mapbox.mapbox-terrain-v2",
      "source-layer": "landcover",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "class",
          "scrub"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#e3e3e3",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "landcover_wood",
      "type": "fill",
      "source": "mapbox://mapbox.mapbox-terrain-v2",
      "source-layer": "landcover",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "class",
          "wood"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#dcdcdc",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "landuse_industrial",
      "type": "fill",
      "source": "mapbox",
      "source-layer": "landuse",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "class",
          "industrial"
        ],
        [
          "==",
          "$type",
          "Polygon"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#fff",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "landuse_park",
      "type": "fill",
      "source": "mapbox",
      "source-layer": "landuse",
      "filter": [
        "all",
        [
          "==",
          "class",
          "park"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#e4e4e4"
      }
    },
    {
      "id": "landuse_wood",
      "type": "fill",
      "source": "mapbox",
      "source-layer": "landuse",
      "filter": [
        "all",
        [
          "==",
          "class",
          "wood"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#e0e0e0"
      }
    },
    {
      "id": "hillshade_highlight_bright",
      "type": "fill",
      "source": "mapbox://mapbox.mapbox-terrain-v2",
      "source-layer": "hillshade",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "level",
          94
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#fff",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              15,
              0.15
            ],
            [
              17,
              0.05
            ]
          ]
        }
      }
    },
    {
      "id": "hillshade_highlight_med",
      "type": "fill",
      "source": "mapbox://mapbox.mapbox-terrain-v2",
      "source-layer": "hillshade",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "level",
          90
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#fff",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              15,
              0.15
            ],
            [
              17,
              0.05
            ]
          ]
        }
      }
    },
    {
      "id": "hillshade_shadow_faint",
      "type": "fill",
      "source": "mapbox://mapbox.mapbox-terrain-v2",
      "source-layer": "hillshade",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "level",
          89
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#666",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              14,
              0.06
            ],
            [
              17,
              0.01
            ]
          ]
        }
      }
    },
    {
      "id": "hillshade_shadow_med",
      "type": "fill",
      "source": "mapbox://mapbox.mapbox-terrain-v2",
      "source-layer": "hillshade",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "level",
          78
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#666",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              14,
              0.06
            ],
            [
              17,
              0.01
            ]
          ]
        }
      }
    },
    {
      "id": "hillshade_shadow_dark",
      "type": "fill",
      "source": "mapbox://mapbox.mapbox-terrain-v2",
      "source-layer": "hillshade",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "level",
          67
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#888888",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              14,
              0.06
            ],
            [
              17,
              0.01
            ]
          ]
        }
      }
    },
    {
      "id": "hillshade_shadow_extreme",
      "type": "fill",
      "source": "mapbox://mapbox.mapbox-terrain-v2",
      "source-layer": "hillshade",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "level",
          56
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#999",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              14,
              0.06
            ],
            [
              17,
              0.01
            ]
          ]
        }
      }
    },
    {
      "id": "building",
      "type": "fill",
      "source": "mapbox",
      "source-layer": "building",
      "minzoom": 15,
      "paint": {
        "fill-outline-color": "#c0c0c0",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              15,
              0
            ],
            [
              16.5,
              1
            ]
          ]
        },
        "fill-antialias": true,
        "fill-color": "#cbcbcb"
      }
    },
    {
      "id": "waterway",
      "type": "line",
      "source": "mapbox",
      "source-layer": "waterway",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "river",
          "canal"
        ]
      ],
      "paint": {
        "line-color": "#d6d6d6",
        "line-width": {
          "base": 1,
          "stops": [
            [
              6,
              0.25
            ],
            [
              20,
              6
            ]
          ]
        }
      }
    },
    {
      "id": "waterway_stream",
      "type": "line",
      "source": "mapbox",
      "source-layer": "waterway",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "stream"
        ]
      ],
      "paint": {
        "line-color": "#d6d6d6",
        "line-width": {
          "base": 1,
          "stops": [
            [
              13,
              0.75
            ],
            [
              20,
              4
            ]
          ]
        }
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "mapbox",
      "source-layer": "water",
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "#d6d6d6"
      }
    },
    {
      "id": "aeroway_runway",
      "type": "line",
      "source": "mapbox",
      "source-layer": "aeroway",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "type",
          "runway"
        ]
      ],
      "layout": {
        "line-join": "miter",
        "visibility": "visible"
      },
      "paint": {
        "line-width": {
          "base": 1.15,
          "stops": [
            [
              11,
              3
            ],
            [
              20,
              32
            ]
          ]
        },
        "line-color": "#fff",
        "line-opacity": {
          "base": 1,
          "stops": [
            [
              9,
              0.5
            ],
            [
              11,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "aeroway_taxiway",
      "type": "line",
      "source": "mapbox",
      "source-layer": "aeroway",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "type",
          "taxiway"
        ]
      ],
      "layout": {
        "line-join": "miter"
      },
      "paint": {
        "line-width": {
          "base": 1.15,
          "stops": [
            [
              10,
              0.25
            ],
            [
              11,
              1
            ],
            [
              20,
              8
            ]
          ]
        },
        "line-color": "#fff"
      }
    },
    {
      "id": "tunnel_minor",
      "type": "line",
      "source": "mapbox",
      "source-layer": "tunnel",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "motorway_link",
          "street",
          "street_limited",
          "service",
          "driveway",
          "path"
        ]
      ],
      "paint": {
        "line-color": "#efefef",
        "line-width": {
          "base": 1.55,
          "stops": [
            [
              4,
              0.25
            ],
            [
              20,
              20
            ]
          ]
        },
        "line-dasharray": [
          0.36,
          0.18
        ]
      }
    },
    {
      "id": "tunnel_major",
      "type": "line",
      "source": "mapbox",
      "source-layer": "tunnel",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "motorway",
          "main"
        ]
      ],
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              6,
              0.5
            ],
            [
              20,
              30
            ]
          ]
        },
        "line-dasharray": [
          0.28,
          0.14
        ]
      }
    },
    {
      "id": "road-path",
      "type": "line",
      "source": "mapbox",
      "source-layer": "road",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "class",
          "path"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1,
          "stops": [
            [
              15,
              1
            ],
            [
              18,
              4
            ]
          ]
        }
      }
    },
    {
      "id": "road-street-low-zoom",
      "type": "line",
      "source": "mapbox",
      "source-layer": "road",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "class",
          "street",
          "street_limited"
        ],
        [
          "==",
          "$type",
          "LineString"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        "line-opacity": {
          "base": 1,
          "stops": [
            [
              11.5,
              0
            ],
            [
              12,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "road-service-driveway",
      "type": "line",
      "source": "mapbox",
      "source-layer": "road",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "class",
          "service",
          "driveway"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1,
          "stops": [
            [
              14,
              0.5
            ],
            [
              18,
              12
            ]
          ]
        }
      }
    },
    {
      "id": "road-motorway_link",
      "type": "line",
      "source": "mapbox",
      "source-layer": "road",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "class",
          "motorway_link"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        }
      }
    },
    {
      "id": "road-street_limited",
      "type": "line",
      "source": "mapbox",
      "source-layer": "road",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "class",
          "street_limited"
        ],
        [
          "==",
          "$type",
          "LineString"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        }
      }
    },
    {
      "id": "road-street",
      "type": "line",
      "source": "mapbox",
      "source-layer": "road",
      "minzoom": 14,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "class",
          "street"
        ],
        [
          "==",
          "$type",
          "LineString"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              12.5,
              0.3
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "road-main",
      "type": "line",
      "source": "mapbox",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "main"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              6,
              0.5
            ],
            [
              18,
              26
            ]
          ]
        },
        "line-opacity": {
          "base": 1,
          "stops": [
            [
              5,
              0
            ],
            [
              5.5,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "road-trunk",
      "type": "line",
      "source": "mapbox",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "in",
          "class",
          "main"
        ],
        [
          "==",
          "type",
          "trunk"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "road-motorway",
      "type": "line",
      "source": "mapbox",
      "source-layer": "road",
      "minzoom": 0,
      "filter": [
        "all",
        [
          "in",
          "class",
          "motorway"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              5,
              0.75
            ],
            [
              18,
              32
            ]
          ]
        },
        "line-opacity": {
          "base": 1,
          "stops": [
            [
              5,
              0
            ],
            [
              5.5,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "road-rail",
      "type": "line",
      "source": "mapbox",
      "source-layer": "road",
      "minzoom": 13,
      "filter": [
        "all",
        [
          "in",
          "class",
          "major_rail",
          "minor_rail"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              14,
              0.5
            ],
            [
              20,
              1
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "road-rail-tracks",
      "type": "line",
      "source": "mapbox",
      "source-layer": "road",
      "minzoom": 13,
      "filter": [
        "all",
        [
          "in",
          "class",
          "major_rail",
          "minor_rail"
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              14,
              4
            ],
            [
              20,
              8
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "bridge_minor_case",
      "type": "line",
      "source": "mapbox",
      "source-layer": "bridge",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "motorway_link",
          "street",
          "street_limited",
          "service",
          "driveway",
          "path"
        ]
      ],
      "paint": {
        "line-color": "#eee",
        "line-width": {
          "base": 1.6,
          "stops": [
            [
              12,
              0.5
            ],
            [
              20,
              10
            ]
          ]
        },
        "line-gap-width": {
          "base": 1.55,
          "stops": [
            [
              4,
              0.25
            ],
            [
              20,
              20
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-path",
      "type": "line",
      "source": "mapbox",
      "source-layer": "bridge",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "class",
          "path"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#efefef",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              15,
              1
            ],
            [
              18,
              4
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-street-low-zoom",
      "type": "line",
      "source": "mapbox",
      "source-layer": "bridge",
      "minzoom": 11,
      "maxzoom": 14.1,
      "filter": [
        "all",
        [
          "in",
          "class",
          "street",
          "street_limited"
        ],
        [
          "==",
          "$type",
          "LineString"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#efefef",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        "line-opacity": {
          "base": 1,
          "stops": [
            [
              11.5,
              0
            ],
            [
              12,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-motorway_link",
      "type": "line",
      "source": "mapbox",
      "source-layer": "bridge",
      "minzoom": 10,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "class",
          "motorway_link"
        ],
        [
          "==",
          "$type",
          "LineString"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "bridge-street_limited",
      "type": "line",
      "source": "mapbox",
      "source-layer": "bridge",
      "minzoom": 14,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "class",
          "street_limited"
        ],
        [
          "==",
          "$type",
          "LineString"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "bridge-street",
      "type": "line",
      "source": "mapbox",
      "source-layer": "bridge",
      "minzoom": 14,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "class",
          "street"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              12.5,
              0.5
            ],
            [
              14,
              2
            ],
            [
              18,
              18
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "bridge-main",
      "type": "line",
      "source": "mapbox",
      "source-layer": "bridge",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "class",
          "main"
        ],
        [
          "!=",
          "type",
          "trunk"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              6,
              0.5
            ],
            [
              18,
              26
            ]
          ]
        },
        "line-opacity": {
          "base": 1,
          "stops": [
            [
              5,
              0
            ],
            [
              5.5,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "bridge-trunk",
      "type": "line",
      "source": "mapbox",
      "source-layer": "bridge",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "class",
          "main"
        ],
        [
          "==",
          "type",
          "trunk"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1,
          "stops": [
            [
              3,
              0.5
            ],
            [
              9,
              1.25
            ],
            [
              20,
              10
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "bridge-motorway",
      "type": "line",
      "source": "mapbox",
      "source-layer": "bridge",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "class",
          "motorway"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1,
          "stops": [
            [
              3,
              0.5
            ],
            [
              9,
              1.25
            ],
            [
              20,
              10
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "bridge-rail",
      "type": "line",
      "source": "mapbox",
      "source-layer": "bridge",
      "minzoom": 13,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "class",
          "major_rail",
          "minor_rail"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "butt",
        "line-join": "miter",
        "line-round-limit": 2
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              14,
              0.5
            ],
            [
              20,
              1
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "bridge-rail-tracks",
      "type": "line",
      "source": "mapbox",
      "source-layer": "bridge",
      "minzoom": 14,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "class",
          "major_rail",
          "minor_rail"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "butt",
        "line-join": "miter",
        "line-round-limit": 2
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              14,
              4
            ],
            [
              20,
              8
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "bridge-rail-tracks_copy",
      "type": "line",
      "source": "mapbox",
      "source-layer": "bridge",
      "minzoom": 14,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "class",
          "aerialway"
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "butt",
        "line-join": "miter",
        "line-round-limit": 2
      },
      "paint": {
        "line-color": "#fff",
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              14,
              0.5
            ],
            [
              20,
              1
            ]
          ]
        },
        "line-opacity": 1
      }
    },
    {
      "id": "admin-3-4-boundaries-bg",
      "type": "line",
      "source": "mapbox",
      "source-layer": "admin",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          ">=",
          "admin_level",
          3
        ],
        [
          "==",
          "maritime",
          0
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-join": "bevel"
      },
      "paint": {
        "line-width": {
          "base": 1,
          "stops": [
            [
              3,
              3.5
            ],
            [
              12,
              6
            ]
          ]
        },
        "line-opacity": {
          "base": 1,
          "stops": [
            [
              2,
              0
            ],
            [
              5,
              0.75
            ]
          ]
        },
        "line-color": "#fff"
      }
    },
    {
      "id": "admin-2-boundaries-bg",
      "type": "line",
      "source": "mapbox",
      "source-layer": "admin",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "admin_level",
          2
        ],
        [
          "==",
          "maritime",
          0
        ],
        [
          "==",
          "disputed",
          2
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-join": "miter"
      },
      "paint": {
        "line-color": "#fff",
        "line-opacity": {
          "base": 1,
          "stops": [
            [
              3,
              0
            ],
            [
              4,
              0.75
            ]
          ]
        },
        "line-width": {
          "base": 1,
          "stops": [
            [
              2,
              3.5
            ],
            [
              10,
              10
            ]
          ]
        }
      }
    },
    {
      "id": "admin-3-4-boundaries",
      "type": "line",
      "source": "mapbox",
      "source-layer": "admin",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          ">=",
          "admin_level",
          3
        ],
        [
          "==",
          "maritime",
          0
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-join": "miter"
      },
      "paint": {
        "line-color": "#b5b5b5",
        "line-opacity": {
          "base": 1,
          "stops": [
            [
              2,
              0
            ],
            [
              3,
              1
            ]
          ]
        },
        "line-width": {
          "base": 1,
          "stops": [
            [
              3,
              0.5
            ],
            [
              12,
              2
            ]
          ]
        },
        "line-dasharray": {
          "base": 1,
          "stops": [
            [
              4,
              [
                2,
                0
              ]
            ],
            [
              5,
              [
                2,
                2,
                6,
                2
              ]
            ]
          ]
        }
      }
    },
    {
      "id": "admin-2-boundaries",
      "type": "line",
      "source": "mapbox",
      "source-layer": "admin",
      "minzoom": 1,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "admin_level",
          2
        ],
        [
          "==",
          "maritime",
          0
        ],
        [
          "==",
          "disputed",
          0
        ]
      ],
      "layout": {
        "visibility": "visible",
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#c0c0c0",
        "line-opacity": 1,
        "line-width": {
          "base": 1,
          "stops": [
            [
              3,
              0.5
            ],
            [
              10,
              2
            ]
          ]
        }
      }
    },
    {
      "id": "interstate-motorway_shields",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "road_label",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "shield",
          "us-interstate",
          "us-interstate-business",
          "us-interstate-duplex"
        ],
        [
          "<=",
          "reflen",
          6
        ]
      ],
      "layout": {
        "icon-image": "default-4-small",
        "text-max-angle": 38,
        "text-font": [
          "DIN Offc Pro Bold",
          "Arial Unicode MS Regular"
        ],
        "symbol-placement": "line",
        "visibility": "none",
        "text-field": "{ref}",
        "text-letter-spacing": 0.05,
        "symbol-spacing": {
          "base": 1,
          "stops": [
            [
              10,
              200
            ],
            [
              15,
              600
            ]
          ]
        },
        "text-size": {
          "base": 1,
          "stops": [
            [
              15.95,
              9
            ],
            [
              16,
              11
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#929292",
        "text-halo-color": "#fff",
        "icon-color": "white",
        "icon-halo-width": 1,
        "icon-halo-color": "rgba(0, 0, 0, 1)"
      }
    },
    {
      "id": "waterway-label",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "waterway_label",
      "minzoom": 12,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "class",
          "river"
        ]
      ],
      "layout": {
        "text-font": [
          "DIN Offc Pro Italic",
          "Arial Unicode MS Regular"
        ],
        "visibility": "visible",
        "symbol-placement": "line",
        "text-field": "{name_en}",
        "text-size": {
          "base": 1,
          "stops": [
            [
              13,
              12
            ],
            [
              18,
              16
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#929292"
      }
    },
    {
      "id": "road-label-sm",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "road_label",
      "minzoom": 12,
      "filter": [
        "all",
        [
          "!in",
          "class",
          "motorway",
          "main",
          "street_limited",
          "street"
        ],
        [
          "==",
          "$type",
          "LineString"
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Bold"
        ],
        "text-transform": "none",
        "text-letter-spacing": 0,
        "text-padding": 0,
        "text-size": {
          "base": 1,
          "stops": [
            [
              8,
              8
            ],
            [
              20,
              15
            ]
          ]
        }
      },
      "paint": {
        "text-halo-color": "#fff",
        "text-halo-width": 2,
        "text-color": "#929292"
      }
    },
    {
      "id": "road-label-med",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "road_label",
      "filter": [
        "all",
        [
          "in",
          "class",
          "street",
          "street_limited"
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Bold"
        ],
        "text-transform": "none",
        "text-letter-spacing": 0,
        "text-padding": 0,
        "text-size": {
          "base": 1,
          "stops": [
            [
              8,
              8
            ],
            [
              20,
              16
            ]
          ]
        }
      },
      "paint": {
        "text-halo-color": "#fff",
        "text-halo-width": 2,
        "text-color": "#929292"
      }
    },
    {
      "id": "road-label-large",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "road_label",
      "filter": [
        "all",
        [
          "in",
          "class",
          "motorway",
          "main"
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Bold"
        ],
        "text-transform": "none",
        "text-letter-spacing": 0,
        "text-padding": 0,
        "text-size": {
          "base": 1,
          "stops": [
            [
              8,
              8
            ],
            [
              20,
              17
            ]
          ]
        }
      },
      "paint": {
        "text-halo-color": "#fff",
        "text-halo-width": 2,
        "text-color": "#929292"
      }
    },
    {
      "id": "airport-label",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "poi_label",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "in",
          "maki",
          "airport",
          "heliport",
          "rocket"
        ],
        [
          "<=",
          "scalerank",
          2
        ]
      ],
      "layout": {
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Regular"
        ],
        "visibility": "visible",
        "text-field": {
          "base": 1,
          "stops": [
            [
              12,
              ""
            ],
            [
              13,
              "{name_en}"
            ]
          ]
        },
        "text-max-width": 9,
        "text-size": {
          "base": 1,
          "stops": [
            [
              10,
              10
            ],
            [
              18,
              18
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666",
        "text-halo-color": "#fff",
        "text-halo-width": 1,
        "text-halo-blur": 0
      }
    },
    {
      "id": "poi-parks-scalerank1",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "poi_label",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "maki",
          "park"
        ],
        [
          "<=",
          "scalerank",
          1
        ]
      ],
      "layout": {
        "text-max-width": 8,
        "visibility": "visible",
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Regular",
          "Arial Unicode MS Regular"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [
              10,
              10
            ],
            [
              18,
              14
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#4f4f4f",
        "text-halo-color": "#fff",
        "text-halo-width": 1
      }
    },
    {
      "id": "poi-scalerank1",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "poi_label",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "!in",
          "maki",
          "rail-light",
          "rail-metro",
          "rail",
          "airport",
          "airfield",
          "heliport",
          "rocket",
          "park",
          "golf",
          "cemetary",
          "zoo",
          "campsite",
          "swimming",
          "dog-park"
        ],
        [
          "<=",
          "scalerank",
          1
        ]
      ],
      "layout": {
        "text-max-width": 8,
        "visibility": "visible",
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Regular",
          "Arial Unicode MS Regular"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [
              10,
              10
            ],
            [
              18,
              14
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#5a5a5a",
        "text-halo-color": "#fff",
        "text-halo-width": 1
      }
    },
    {
      "id": "water-label",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "water_label",
      "minzoom": 5,
      "maxzoom": 22,
      "layout": {
        "text-font": [
          "DIN Offc Pro Italic",
          "Arial Unicode MS Regular"
        ],
        "visibility": "visible",
        "text-field": "{name_en}",
        "text-max-width": 7,
        "text-size": {
          "base": 1,
          "stops": [
            [
              13,
              12
            ],
            [
              18,
              16
            ]
          ]
        }
      },
      "paint": {
        "text-color": {
          "base": 1,
          "stops": [
            [
              0,
              "#929292"
            ],
            [
              20,
              "#929292"
            ]
          ]
        }
      }
    },
    {
      "id": "place_label_neighborhood",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "place_label",
      "minzoom": 12,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "in",
          "type",
          "suburb",
          "neighbourhood"
        ]
      ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Bold",
          "Arial Unicode MS Bold"
        ],
        "text-max-width": 7,
        "text-letter-spacing": 0.1,
        "text-transform": "uppercase",
        "text-size": {
          "stops": [
            [
              12,
              10
            ],
            [
              16,
              14
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#999",
        "text-halo-color": "#fff",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "text-opacity": {
          "base": 1,
          "stops": [
            [
              0,
              0
            ],
            [
              12,
              0.66
            ],
            [
              13,
              1
            ]
          ]
        }
      }
    },
    {
      "id": "place_label_other",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "place_label",
      "minzoom": 8,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "in",
          "type",
          "town",
          "village",
          "hamlet"
        ]
      ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Regular",
          "Arial Unicode MS Bold"
        ],
        "text-max-width": 15,
        "text-size": {
          "stops": [
            [
              6,
              10
            ],
            [
              12,
              13
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666",
        "text-halo-color": "#fff",
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "place_label_city_small_s",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "place_label",
      "maxzoom": 12,
      "filter": [
        "all",
        [
          "==",
          "type",
          "city"
        ],
        [
          ">",
          "scalerank",
          4
        ],
        [
          "in",
          "ldir",
          "S",
          "E",
          "SE",
          "SW"
        ]
      ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Bold"
        ],
        "text-max-width": 10,
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "top"
            ],
            [
              6,
              "center"
            ]
          ]
        },
        "text-offset": {
          "base": 1,
          "stops": [
            [
              0,
              [
                0,
                0.1
              ]
            ],
            [
              6,
              [
                0,
                0
              ]
            ]
          ]
        },
        "text-size": {
          "stops": [
            [
              6,
              11
            ],
            [
              14,
              19
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666",
        "text-halo-color": "#fff",
        "text-halo-width": 1.5,
        "text-halo-blur": 0
      }
    },
    {
      "id": "place_label_city_small_n",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "place_label",
      "maxzoom": 12,
      "filter": [
        "all",
        [
          "==",
          "type",
          "city"
        ],
        [
          ">",
          "scalerank",
          4
        ],
        [
          "in",
          "ldir",
          "N",
          "W",
          "NW",
          "NE"
        ]
      ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Bold"
        ],
        "text-max-width": 10,
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "bottom"
            ],
            [
              6,
              "center"
            ]
          ]
        },
        "text-offset": {
          "base": 1,
          "stops": [
            [
              0,
              [
                0,
                -0.2
              ]
            ],
            [
              6,
              [
                0,
                0
              ]
            ]
          ]
        },
        "text-size": {
          "stops": [
            [
              6,
              11
            ],
            [
              14,
              19
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666",
        "text-halo-color": "#fff",
        "text-halo-width": 1.5,
        "text-halo-blur": 0
      }
    },
    {
      "id": "place_label_city_medium_s",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "place_label",
      "maxzoom": 10,
      "filter": [
        "all",
        [
          "==",
          "type",
          "city"
        ],
        [
          "<=",
          "scalerank",
          4
        ],
        [
          ">",
          "scalerank",
          1
        ],
        [
          "in",
          "ldir",
          "S",
          "E",
          "SE",
          "SW"
        ]
      ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Bold"
        ],
        "text-max-width": 10,
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "top"
            ],
            [
              6,
              "center"
            ]
          ]
        },
        "text-offset": {
          "base": 1,
          "stops": [
            [
              0,
              [
                0,
                0.1
              ]
            ],
            [
              6,
              [
                0,
                0
              ]
            ]
          ]
        },
        "text-size": {
          "stops": [
            [
              5,
              11
            ],
            [
              12,
              19
            ]
          ],
          "base": 0.9
        }
      },
      "paint": {
        "text-color": "#666",
        "text-halo-color": "#fff",
        "text-halo-width": 1.5,
        "text-halo-blur": 0
      }
    },
    {
      "id": "place_label_city_medium_n",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "place_label",
      "maxzoom": 10,
      "filter": [
        "all",
        [
          "==",
          "type",
          "city"
        ],
        [
          "<=",
          "scalerank",
          4
        ],
        [
          ">",
          "scalerank",
          1
        ],
        [
          "in",
          "ldir",
          "N",
          "W",
          "NW",
          "NE"
        ]
      ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Bold"
        ],
        "text-max-width": 10,
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "bottom"
            ],
            [
              6,
              "center"
            ]
          ]
        },
        "text-offset": {
          "base": 1,
          "stops": [
            [
              0,
              [
                0,
                -0.2
              ]
            ],
            [
              6,
              [
                0,
                0
              ]
            ]
          ]
        },
        "text-size": {
          "stops": [
            [
              5,
              11
            ],
            [
              12,
              19
            ]
          ],
          "base": 0.9
        }
      },
      "paint": {
        "text-color": "#666",
        "text-halo-color": "#fff",
        "text-halo-width": 1.5,
        "text-halo-blur": 0
      }
    },
    {
      "id": "place_label_city_large_s",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "place_label",
      "maxzoom": 10,
      "filter": [
        "all",
        [
          "==",
          "type",
          "city"
        ],
        [
          "<=",
          "scalerank",
          1
        ],
        [
          "in",
          "ldir",
          "S",
          "SE",
          "SW",
          "E"
        ]
      ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Bold",
          "Arial Unicode MS Bold"
        ],
        "text-max-width": 15,
        "text-transform": "none",
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "top"
            ],
            [
              6,
              "center"
            ]
          ]
        },
        "text-offset": {
          "base": 1,
          "stops": [
            [
              0,
              [
                0,
                0.1
              ]
            ],
            [
              6,
              [
                0,
                0
              ]
            ]
          ]
        },
        "text-size": {
          "stops": [
            [
              4,
              11
            ],
            [
              10,
              20
            ]
          ],
          "base": 0.9
        }
      },
      "paint": {
        "text-color": "#666",
        "text-halo-color": "#fff",
        "text-halo-width": 1.5,
        "text-halo-blur": 0
      }
    },
    {
      "id": "place_label_city_large_n",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "place_label",
      "maxzoom": 10,
      "filter": [
        "all",
        [
          "<=",
          "scalerank",
          1
        ],
        [
          "in",
          "ldir",
          "N",
          "NE",
          "NW",
          "W"
        ],
        [
          "==",
          "type",
          "city"
        ]
      ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Bold",
          "Arial Unicode MS Bold"
        ],
        "text-max-width": 5,
        "text-transform": "none",
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "bottom"
            ],
            [
              6,
              "center"
            ]
          ]
        },
        "text-offset": {
          "base": 1,
          "stops": [
            [
              0,
              [
                0,
                -0.2
              ]
            ],
            [
              6,
              [
                0,
                0
              ]
            ]
          ]
        },
        "symbol-avoid-edges": false,
        "text-size": {
          "stops": [
            [
              4,
              11
            ],
            [
              10,
              20
            ]
          ],
          "base": 0.9
        }
      },
      "paint": {
        "text-color": "#666",
        "text-halo-color": "#fff",
        "text-halo-width": 1.5,
        "text-halo-blur": 0
      }
    },
    {
      "id": "marine_label_point_other",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "marine_label",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "in",
          "labelrank",
          4,
          5,
          6
        ]
      ],
      "layout": {
        "text-max-width": 8,
        "visibility": "none",
        "symbol-placement": "point",
        "text-field": "{name_en}",
        "text-line-height": 1.2,
        "text-letter-spacing": 0.1,
        "text-font": [
          "DIN Offc Pro Regular",
          "Arial Unicode MS Regular"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [
              4,
              12
            ],
            [
              6,
              16
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666"
      }
    },
    {
      "id": "marine_label_point_3",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "marine_label",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "labelrank",
          3
        ]
      ],
      "layout": {
        "text-max-width": 8,
        "visibility": "visible",
        "symbol-placement": "point",
        "text-field": "{name_en}",
        "text-line-height": 1.3,
        "text-letter-spacing": 0.1,
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Regular"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [
              3,
              13
            ],
            [
              5,
              18
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666",
        "text-opacity": 0.25
      }
    },
    {
      "id": "marine_label_point_2",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "marine_label",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "labelrank",
          2
        ]
      ],
      "layout": {
        "text-max-width": 8,
        "visibility": "visible",
        "symbol-placement": "point",
        "text-field": "{name_en}",
        "text-line-height": 1.2,
        "text-letter-spacing": 0,
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Regular"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [
              3,
              14
            ],
            [
              5,
              24
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666",
        "text-opacity": 0.25
      }
    },
    {
      "id": "marine_label_point_1",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "marine_label",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "labelrank",
          1
        ]
      ],
      "layout": {
        "text-max-width": 4,
        "visibility": "visible",
        "symbol-placement": "point",
        "text-field": "{name_en}",
        "text-line-height": 1.5,
        "text-letter-spacing": 0.25,
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Regular"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [
              1,
              12
            ],
            [
              4,
              30
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666",
        "text-opacity": 0.25
      }
    },
    {
      "id": "marine_label_line_other",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "marine_label",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "labelrank",
          4,
          5,
          6
        ]
      ],
      "layout": {
        "text-max-width": 15,
        "visibility": "visible",
        "symbol-placement": "line",
        "text-field": "{name_en}",
        "text-line-height": 1.2,
        "text-letter-spacing": 0,
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Regular"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [
              4,
              12
            ],
            [
              6,
              16
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666",
        "text-opacity": 0.25
      }
    },
    {
      "id": "marine_label_line_3",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "marine_label",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "labelrank",
          3
        ]
      ],
      "layout": {
        "text-max-width": 15,
        "visibility": "visible",
        "symbol-placement": "line",
        "text-field": "{name_en}",
        "text-line-height": 1.2,
        "text-letter-spacing": 0,
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Regular"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [
              3,
              13
            ],
            [
              5,
              18
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666",
        "text-opacity": 0.25
      }
    },
    {
      "id": "marine_label_line_2",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "marine_label",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "labelrank",
          2
        ]
      ],
      "layout": {
        "text-max-width": 15,
        "visibility": "visible",
        "symbol-placement": "line",
        "text-field": "{name_en}",
        "text-line-height": 1.2,
        "text-letter-spacing": 0,
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Regular"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [
              3,
              14
            ],
            [
              5,
              24
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666",
        "text-opacity": 0.25
      }
    },
    {
      "id": "marine_label_line_1",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "marine_label",
      "minzoom": 0,
      "maxzoom": 22,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "labelrank",
          1
        ]
      ],
      "layout": {
        "text-max-width": 15,
        "visibility": "visible",
        "symbol-placement": "line",
        "text-field": "{name_en}",
        "text-line-height": 1.2,
        "text-letter-spacing": 0.4,
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Regular"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [
              3,
              25
            ],
            [
              4,
              30
            ]
          ]
        }
      },
      "paint": {
        "text-color": "#666",
        "text-opacity": 0.25
      }
    },
    {
      "id": "state-label-lg",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "state_label",
      "minzoom": 3,
      "maxzoom": 7,
      "filter": [
        "all",
        [
          ">=",
          "area",
          80000
        ]
      ],
      "layout": {
        "text-transform": "uppercase",
        "visibility": "visible",
        "text-field": {
          "base": 1,
          "stops": [
            [
              0,
              "{abbr}"
            ],
            [
              4,
              "{name_en}"
            ]
          ]
        },
        "text-font": [
          "DIN Offc Pro Bold",
          "Arial Unicode MS Regular"
        ],
        "text-letter-spacing": 0.15,
        "text-max-width": 7,
        "text-size": {
          "base": 1,
          "stops": [
            [
              4,
              9
            ],
            [
              7,
              18
            ]
          ]
        }
      },
      "paint": {
        "text-color": {
          "base": 1,
          "stops": [
            [
              0,
              "#929292"
            ],
            [
              20,
              "#929292"
            ]
          ]
        }
      }
    },
    {
      "id": "country-label-sm",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "country_label",
      "minzoom": 1,
      "maxzoom": 10,
      "filter": [
        "all",
        [
          ">=",
          "scalerank",
          5
        ]
      ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Regular"
        ],
        "text-max-width": 7,
        "text-size": {
          "stops": [
            [
              3,
              8
            ],
            [
              9,
              18
            ]
          ],
          "base": 0.9
        }
      },
      "paint": {
        "text-color": {
          "base": 1,
          "stops": [
            [
              0,
              "#444"
            ],
            [
              10,
              "#888"
            ]
          ]
        },
        "text-halo-color": "#fff",
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "country-label-md",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "country_label",
      "minzoom": 1,
      "maxzoom": 8,
      "filter": [
        "all",
        [
          "in",
          "scalerank",
          3,
          4
        ]
      ],
      "layout": {
        "text-field": {
          "base": 1,
          "stops": [
            [
              0,
              "{code}"
            ],
            [
              2,
              "{name_en}"
            ]
          ]
        },
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Regular"
        ],
        "text-max-width": 7,
        "text-size": {
          "stops": [
            [
              2,
              8
            ],
            [
              7,
              18
            ]
          ],
          "base": 0.9
        }
      },
      "paint": {
        "text-color": {
          "base": 1,
          "stops": [
            [
              0,
              "#444"
            ],
            [
              10,
              "#888"
            ]
          ]
        },
        "text-halo-color": "#fff",
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    },
    {
      "id": "country-label-lg",
      "type": "symbol",
      "source": "mapbox",
      "source-layer": "country_label",
      "maxzoom": 12,
      "filter": [
        "all",
        [
          "in",
          "scalerank",
          1,
          2
        ]
      ],
      "layout": {
        "text-field": "{name_en}",
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Regular"
        ],
        "text-max-width": 6,
        "text-size": {
          "stops": [
            [
              1,
              9
            ],
            [
              5,
              18
            ]
          ],
          "base": 0.9
        }
      },
      "paint": {
        "text-color": {
          "base": 1,
          "stops": [
            [
              0,
              "#444"
            ],
            [
              10,
              "#888"
            ]
          ]
        },
        "text-halo-color": "#fff",
        "text-halo-width": 1,
        "text-halo-blur": 1
      }
    }
  ],
  "owner": "andreasviglakis",
  "modified": "2015-04-27T23:19:35.558Z",
  "created": "2015-04-27T23:19:35.558Z",
  "id": "andreasviglakis.3081d695"
}

},{}],18:[function(require,module,exports){
//import request from 'superagent';

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var HEIGHT = 400;
var WIDTH = 600;
var audioBuffer = null;
var source = null;

var AudioProcessing = (function () {
  function AudioProcessing(url, context, callback) {
    _classCallCheck(this, AudioProcessing);

    //window.AudioContext = window.AudioContext||window.webkitAudioContext;
    var analyser = context.createAnalyser();
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = (function () {
      context.decodeAudioData(request.response, (function (buffer) {
        //audioBuffer = buffer;
        source = context.createBufferSource(); // creates a sound source
        source.buffer = buffer; // tell the source which sound to play

        source.connect(analyser);

        this.analyser = analyser;

        // this.visualize();

        source.connect(context.destination); // connect the source to the context's destination (the speakers)
        source.start(0);
        callback(null);
      }).bind(this), function (error) {
        callback(error);
        console.error('decodeAudioData error', error);
      });
    }).bind(this);
    request.send();

    console.log(url);
    //  var input = context.createMediaStreamSource(stream);

    // var analyser = context.createAnalyser();

    // // Connect graph.
    // input.connect(analyser);

    // this.analyser = analyser;

    // this.visualize();
    //  console.log(context);
  }

  _createClass(AudioProcessing, [{
    key: 'getVolume',
    value: function getVolume() {
      var freqDomain = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(freqDomain);
      var values = 0;
      var average;

      var length = freqDomain.length;

      // get all the frequency amplitudes
      for (var i = 0; i < length; i++) {
        values += freqDomain[i];
      }

      average = values / length;
      return average;
    }
  }, {
    key: 'visualize',
    value: function visualize() {
      console.log("visualizing");
      var freqDomain = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(freqDomain);
      // console.log(freqDomain);
      //  //draw viz
      //   this.drawContext.clearRect(0, 0, WIDTH, HEIGHT);
      //   for (var i = 0; i <freqDomain.length; i++) {
      // var value = freqDomain[i];
      // var percent = value / 256;
      // var height = HEIGHT * percent;
      // var offset = HEIGHT - height - 1;
      // var barWidth = WIDTH/freqDomain.length;
      // var hue = i/freqDomain.length * 360;
      // this.drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
      // this.drawContext.fillRect(i * barWidth, offset, barWidth, height);
      //}
      // console.log(freqDomain);
      // requestAnimationFrame(this.visualize.bind(this));
    }
  }]);

  return AudioProcessing;
})();

exports['default'] = AudioProcessing;
module.exports = exports['default'];

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _utilAudioProcessing = require('./../util/AudioProcessing');

var _utilAudioProcessing2 = _interopRequireDefault(_utilAudioProcessing);

var url = "https://s3-sa-east-1.amazonaws.com/observatorio-urbano/55f1bcec18cceb8f022a3eb1.mp3";

var AudioContextManager = (function () {
  function AudioContextManager() {
    _classCallCheck(this, AudioContextManager);

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.sounds = {};
  }

  _createClass(AudioContextManager, [{
    key: "addSound",
    value: function addSound(id, url) {
      var sound = new _utilAudioProcessing2["default"](url, this.context, (function (err) {
        this.sounds[id] = sound;
      }).bind(this));
    }
  }, {
    key: "getVolume",
    value: function getVolume(id) {
      return this.sounds[id].getVolume();
    }

    // processSound(){
    //   var vol = this.sound.getVolume();
    //   console.log(vol);
    //   requestAnimationFrame(this.processSound);
    // }

  }]);

  return AudioContextManager;
})();

exports["default"] = AudioContextManager;
module.exports = exports["default"];

},{"./../util/AudioProcessing":18}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

//import mapboxgl from 'mapbox-gl';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _dataLightV8EditJson = require('./../data/light-v8-edit.json');

var _dataLightV8EditJson2 = _interopRequireDefault(_dataLightV8EditJson);

var _HexGrid = require('./HexGrid');

var _HexGrid2 = _interopRequireDefault(_HexGrid);

var _InfoDetail = require('./InfoDetail');

var _InfoDetail2 = _interopRequireDefault(_InfoDetail);

var _AudioContextManager = require('./AudioContextManager');

var _AudioContextManager2 = _interopRequireDefault(_AudioContextManager);

function drawHex(ctx, coords, rad) {

	var angle;
	for (var i = 0; i <= 6; i++) {
		angle = i * 2 * Math.PI / 6;

		ctx.lineTo(coords.x + rad * Math.cos(angle), coords.y + rad * Math.sin(angle));
	}

	//ctx.fillRect(Math.floor(coords.x)-rad/2, Math.floor(coords.y)-rad/2,rad, rad);
}

var BaseMap = _react2['default'].createClass({
	displayName: 'BaseMap',

	getInitialState: function getInitialState() {
		return { coords: {
				lat: 4.597,
				lng: -74.09
			},
			selected: null,
			mapLoaded: false,
			dataLoadedToMap: false };
	},
	// initSitios(sitios){
	// 	var sit = sitios.map(function(obj, index){
	// 		obj.properties.tempId = index;
	// 		if(obj.properties.sonidoUrl){
	// 			console.log(" has sound "+ obj.properties.sonidoUrl);
	// 			this.audioContext.addSound(index, obj.properties.sonidoUrl);
	// 			obj.properties.hasSound = true;
	// 		} else {
	// 			obj.properties.hasSound = false;
	// 		}
	// 		return obj;
	// 	}.bind(this));
	// 	this.setState({sitios: sit});
	// },
	updatePixelCoords: function updatePixelCoords() {
		if (this.props.sitios != null && this.state.mapLoaded) {
			var sit = this.props.sitios.map((function (obj, index) {

				obj.properties.screenCoords = this.map.project({ lat: obj.geometry.coordinates[1], lng: obj.geometry.coordinates[0] });
				return obj;
			}).bind(this));
			this.setState({ sitios: sit }, this.renderCanvas);
			//console.log(sit);
		}
	},
	renderCanvas: function renderCanvas() {
		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		var rad = 8;
		var outerRad;
		for (var i = 0; i < this.props.sitios.length; i++) {
			var obj = this.props.sitios[i];
			outerRad = rad + 3;
			var vol = 0;

			if (this.state.selected != null && obj.properties.tempId == this.state.selected.tempId) {}
			// = 20;

			//this.ctx.fillStyle = "#FF3366";
			//this.ctx.fillStyle = "#000";
			this.ctx.fillStyle = obj.properties.color;
			this.ctx.beginPath();
			drawHex(this.ctx, obj.properties.screenCoords, rad);
			this.ctx.closePath();
			this.ctx.fill();
			if (this.props.sitios[i].properties.hasSound) {
				vol = this.props.audioContext.getVolume(i);
				//console.log(vol);
				outerRad = outerRad + vol;
				var opacity = 0.7 * (1 - vol / 100);
				this.ctx.strokeStyle = "rgba(255, 51, 102, " + opacity + ")";
				//this.ctx.strokeStyle = "#FF3366";
				this.ctx.beginPath();
				drawHex(this.ctx, obj.properties.screenCoords, outerRad);
				this.ctx.closePath();
				this.ctx.stroke();

				this.ctx.beginPath();
				drawHex(this.ctx, obj.properties.screenCoords, outerRad - vol / 3);
				this.ctx.closePath();
				this.ctx.stroke();
				this.ctx.beginPath();
				drawHex(this.ctx, obj.properties.screenCoords, outerRad - vol * 2 / 3);
				this.ctx.closePath();
				this.ctx.stroke();
			} else {
				var opacity = 0.5 * (1 - vol / 100);
				this.ctx.strokeStyle = "rgba(255, 51, 102, " + opacity + ")";
				//this.ctx.strokeStyle = "#FF3366";
				this.ctx.beginPath();
				drawHex(this.ctx, obj.properties.screenCoords, outerRad);
				this.ctx.closePath();
				this.ctx.stroke();
			}

			//this.ctx.fillRect(i*10, i*10,8, 8);
			//this.ctx.fillRect(100,100, 8, 8);
		}
		requestAnimationFrame(this.renderCanvas);
	},
	addOutline: function addOutline(outline) {
		console.log("adding outline");

		if (this.outlineSource == null) {
			this.outlineSource = new mapboxgl.GeoJSONSource({ data: outline });
			this.map.addSource('outline', this.outlineSource); // add
			this.map.addLayer({
				"id": "outline",
				"type": "line",
				"source": "outline",
				"paint": {

					"line-color": "rgba(120, 120, 120, 1.0)",
					"line-width": 5

				}
			});
		} else // "fill-outline-color": "#333"
			// "interactive": true

			//paint.* : class-specific paint properties
			{
				this.outlineSource.setData(outline);
			}
	},
	addGeoJSON: function addGeoJSON() {
		//only load data if map has been initialized, data has been received, and data has no already been loaded
		if (this.props.sitios != null && this.state.mapLoaded && !this.state.dataLoadedToMap) {

			console.log("adding data");
			// console.log(this.state.sitios);
			this.map.addSource("markers", {
				"type": "geojson",
				// "data": this.state.sitios,
				"data": {
					"type": "FeatureCollection",
					"features": this.props.sitios
				}
			});
			//{respuesta}
			// "text-max-width": 40,
			// "text-transform": "uppercase",
			this.map.addLayer({
				"id": "markers",
				"type": "symbol",
				"source": "markers",
				"interactive": true,
				"layout": {
					"icon-image": "default_marker",
					"text-field": "{respuesta}",
					"text-font": ["Open Sans Semibold, Arial Unicode MS Bold"],

					"text-offset": [0.0, 1.0],
					"text-anchor": "top",
					"text-justify": "center",
					"text-optional": true,
					"text-size": 12
				},
				"paint": {
					"icon-opacity": 0.05,
					"text-color": "#111"
				}
			});

			this.map.on('click', (function (e) {
				console.log(e);
				// to do: scale radius based on zoom
				this.map.featuresAt(e.point, { radius: 50 }, (function (err, features) {
					if (err) console.log(err);
					if (features.length > 0) {
						//for(var i )
						console.log(e.point);
						console.log(e.lngLat);
						this.setState({ selected: features[0].properties, coords: { lat: e.lngLat.lat, lng: e.lngLat.lng } }, this.renderCanvas);
						this.map.flyTo({ center: e.lngLat, zoom: 16, pitch: 100 });
					} else {
						this.setState({ selected: null });
						//this.setState({selected: null, coords: {lat: e.lngLat.lat, lng: e.lngLat.lng}}, this.renderCanvas);
						//this.map.flyTo({center: e.lngLat, zoom: 15, pitch: 40});
					}
				}).bind(this));
			}).bind(this));
		}
	},
	componentDidMount: function componentDidMount() {
		console.log("calling component mount");
		console.log(this.props);

		mapboxgl.accessToken = 'pk.eyJ1Ijoib2oiLCJhIjoiSEw0cDJaNCJ9.9ffK1AU2O26zvS5Zsa6eqw';
		this.map = new mapboxgl.Map({
			container: 'map-fullscreen', // container id
			style: _dataLightV8EditJson2['default'], //stylesheet location
			// style: lightMapStyle,
			center: [this.state.coords.lng, this.state.coords.lat], // starting position
			zoom: 5, // starting zoom
			pitch: 45
		});

		//this.map.rotateTo(100);
		// Add zoom and rotation controls to the map.

		this.map.on('style.load', (function () {

			//this.map.on('moveend', this.addGeoJSON);
			setTimeout((function () {
				this.map.flyTo({
					zoom: 11,
					pitch: 45,
					speed: 1.2,
					bearing: 100,
					curve: 1,
					easing: function easing(t) {
						return t;
					}
				});
				this.map.on('move', (function (e) {
					this.updatePixelCoords();
					// console.log("moving");
					// console.log(this.map.getBounds());
				}).bind(this));
			}).bind(this), 400);
			setTimeout((function () {
				this.setState({ mapLoaded: true }, this.addGeoJSON);
				this.props.onMapLoaded();
				this.map.addControl(new mapboxgl.Navigation({ position: 'top-left' }));
			}).bind(this), 3000);
			/*if(this.props.localidadData!=null){
   	this.loadMapData(this.props.localidadData);
   }*/
			//this.loadMapData(LOCALIDAD_DATA);
		}).bind(this));

		// this.map.flyTo
		this.canvas = this.refs.canvas.getDOMNode();
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		window.addEventListener('resize', this.onResize, false);
	},
	onResize: function onResize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.updatePixelCoords();
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.bounds != this.props.bounds) {
			console.log("bounds changed");
			console.log(nextProps.bounds);
			this.map.fitBounds(nextProps.bounds, { bearing: 100 });
			this.setState({ selected: null });
		}
		if (nextProps.outline != this.props.outline) {
			this.addOutline(nextProps.outline);
		}
	},
	render: function render() {
		//console.l	<label>{this.props.label}</label>og("rerendering maplocator");
		var info = [];

		if (this.state.selected != null) {
			info.push(_react2['default'].createElement(_HexGrid2['default'], null));
			info.push(_react2['default'].createElement(_InfoDetail2['default'], { info: this.state.selected, coords: this.state.coords }));
			//info.push(<SvgHex coords={this.state.coords}/>);
		}
		return _react2['default'].createElement(
			'div',
			{ id: 'map-container-fullscreen' },
			_react2['default'].createElement('div', { id: 'map-fullscreen' }),
			_react2['default'].createElement('canvas', { id: 'map-canvas', ref: 'canvas' }),
			info
		);
	}
});

exports['default'] = BaseMap;
module.exports = exports['default'];

},{"./../data/light-v8-edit.json":17,"./AudioContextManager":19,"./HexGrid":22,"./InfoDetail":23,"react":"react","superagent":56}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Categorias = _react2["default"].createClass({
  displayName: "Categorias",

  getInitialState: function getInitialState() {
    return {
      selected: null
    };
  },

  render: function render() {
    var divStyle = {
      marginBottom: "30px"
    };
    var categorias = [];
    for (var key in this.props.categorias) {
      // console.log(this.props.categorias[key]);
      var val = this.props.categorias[key].count;
      var fontSize = 16 + val * 5;
      var style = {
        color: this.props.categorias[key].color,
        textTransform: "uppercase",
        fontWeight: "900"
      };
      style.fontSize = fontSize + "px";
      //console.log(style);
      categorias.push(_react2["default"].createElement(
        "div",
        { style: style },
        key
      ));
    }
    return _react2["default"].createElement(
      "div",
      { style: divStyle },
      categorias
    );
  }
});

exports["default"] = Categorias;
module.exports = exports["default"];

},{"react":"react"}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var hex = [{ number: 2, color: '#C1AFD1' }, { number: 4, color: '#D6C9E0' }, { number: 5, color: '#EAE4F0' }, { number: 7, color: '#FFD6E0' }, { number: 8, color: '#FFADC2' }, { number: 9, color: '#FF85A3' }, { number: 7, color: '#FF5C85' }, { number: 6, color: '#FF3366' }, { number: 4, color: '#BF264D' }, { number: 4, color: '#801A33' }];
var hex_radius = 48.5;
//width: @hex-size; height: (@hex-size * 1.7);
// margin-left: (@hex-size / 1.30);

var HexGrid = _react2['default'].createClass({
  displayName: 'HexGrid',

  getInitialState: function getInitialState() {
    return { hidden: false };
  },
  unfold: function unfold() {
    console.log("unfold");
    var folded = this.state.hidden == true ? false : true;
    this.setState({ hidden: folded });
  },
  render: function render() {
    var topOffset = 55;
    var rightOffset = 12;
    var key = 0;
    var hexArray = hex.map((function (hex, index) {
      var rowClass = index % 2 == 0 ? "even" : "odd";
      var hexes = [];
      var right = -index % 2 / 2 * hex_radius * 1.732;

      for (var i = 0; i < hex.number; i++) {
        if (!this.state.hidden) right = (i - index % 2 / 2) * hex_radius * 1.732 + rightOffset;
        var style = {
          backgroundColor: hex.color,
          top: index * (hex_radius * 3 / 2) + topOffset,
          right: right,
          width: hex_radius, // actual width = sqrt(3)/2 * height
          height: hex_radius * 1.7 // actual height is hex_radius*2
        };
        hexes.push(_react2['default'].createElement('div', { key: key, className: 'hex', style: style }));
        key++;
      }

      return { hexes: hexes };
    }).bind(this));
    // var hexContainerStyle={
    //   position: "absolute",
    //   top: "45px",
    //   right: "0px"
    // }
    return _react2['default'].createElement(
      'div',
      { onMouseDown: this.unfold },
      hexArray
    );
  }

});

exports['default'] = HexGrid;
module.exports = exports['default'];

},{"react":"react"}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InfoWindow = require('./InfoWindow');

var _InfoWindow2 = _interopRequireDefault(_InfoWindow);

var InfoDetail = _react2['default'].createClass({
  displayName: 'InfoDetail',

  render: function render() {
    var size = "250px";
    var container_style = {
      position: "fixed",
      top: 0,
      right: 0,
      color: "#333",
      width: "100%",
      height: "100%",
      pointerEvents: 'none',
      backgroundColor: "rgba(255, 255, 255, 0.8)"
    };
    var streetview_style = {
      position: "absolute",
      top: "118px",
      right: "82px",
      width: size,
      height: size
    };
    var img_style = {
      position: "absolute",
      top: "480px",
      right: "207px",
      width: size,
      height: size
    };
    var porque_style = {
      position: "absolute",
      top: "263px",
      right: "251px",
      width: size,
      textAlign: "center",
      backgroundColor: "ff3366",
      color: "#fff",
      height: size
    };
    var text_style = {
      margin: "60px 40px"
    };
    console.log(this.props);
    var streetViewSrc = "https://maps.googleapis.com/maps/api/streetview?size=250x250&location=" + this.props.coords.lat + "," + this.props.coords.lng + "&heading=151.78&pitch=-0.76&AIzaSyCkTdSqnWG-3LoDikXJRmM4UFB1CaraARc";

    return _react2['default'].createElement(
      'div',
      { style: container_style },
      _react2['default'].createElement('img', { className: 'hexClip', style: streetview_style, src: streetViewSrc }),
      _react2['default'].createElement(
        'div',
        { style: porque_style, className: 'hexClip' },
        _react2['default'].createElement(
          'div',
          { style: text_style },
          this.props.info.porque
        )
      ),
      _react2['default'].createElement('img', { className: 'hexClip', style: img_style, src: this.props.info.fotoUrl }),
      _react2['default'].createElement(_InfoWindow2['default'], { info: this.props.info }),
      ');'
    );
  }

});

exports['default'] = InfoDetail;
module.exports = exports['default'];

},{"./InfoWindow":24,"react":"react"}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var InfoWindow = _react2["default"].createClass({
  displayName: "InfoWindow",

  render: function render() {
    var container_style = {
      position: "fixed",
      top: 90,
      right: 450,
      color: "#333",
      width: 200,
      pointerEvents: 'none',
      textTransform: 'uppercase'
    };
    var element_style = {
      margin: "0px",
      fontSize: "15px"
    };
    var header_style = {
      margin: "0px",
      fontSize: "32px"
    };
    var respuesta_style = {
      margin: "0px",
      fontSize: "15px",
      color: "ff3366"
    };
    var element = [];
    console.log(this.props);
    return _react2["default"].createElement(
      "div",
      { style: container_style },
      _react2["default"].createElement(
        "h3",
        { style: header_style },
        " ",
        this.props.info.categoria,
        " "
      ),
      _react2["default"].createElement(
        "h5",
        { style: respuesta_style },
        " ",
        this.props.info.respuesta,
        " "
      ),
      _react2["default"].createElement(
        "h5",
        { style: element_style },
        " LOCALIDAD / ",
        this.props.info.localidad,
        " "
      ),
      _react2["default"].createElement(
        "h5",
        { style: element_style },
        " BARRIO / ",
        this.props.info.barrio,
        " "
      ),
      _react2["default"].createElement(
        "h5",
        { style: element_style },
        " DIRECCIÓN / ",
        this.props.info.direccion,
        " "
      ),
      _react2["default"].createElement(
        "h5",
        { style: element_style },
        " TEMPORALIDAD / ",
        this.props.info.temporalidad,
        " "
      )
    );
  }

});

exports["default"] = InfoWindow;
module.exports = exports["default"];

},{"react":"react"}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IngresarPregunta = require('./Ingresar/Pregunta');

var _IngresarPregunta2 = _interopRequireDefault(_IngresarPregunta);

var Ingresar = _react2['default'].createClass({
  displayName: 'Ingresar',

  getInitialState: function getInitialState() {
    return {
      step: 0
    };
  },
  nextStep: function nextStep() {
    console.log("going to next step");
    this.setState({
      step: this.state.step + 1
    });
  },

  previousStep: function previousStep() {
    this.setState({
      step: this.state.step - 1
    });
  },

  render: function render() {
    var shadeStyle = {
      position: "fixed",
      left: "0px",
      top: "0px",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)"
    };
    var containerStyle = {
      position: "fixed",
      left: "0px",
      top: "0px"
    };
    var formContents = {};
    switch (this.state.step) {
      case 0:
        formContents = _react2['default'].createElement(_IngresarPregunta2['default'], { nextStep: this.nextStep });
      case 1:
        formContents = _react2['default'].createElement(_IngresarPregunta2['default'], { nextStep: this.nextStep });
    }
    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement('div', { style: shadeStyle }),
      _react2['default'].createElement(
        'div',
        { className: 'container', style: containerStyle },
        formContents
      )
    );
  }
});

exports['default'] = Ingresar;
module.exports = exports['default'];

},{"./Ingresar/Pregunta":26,"react":"react"}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Pregunta = _react2["default"].createClass({
  displayName: "Pregunta",

  getInitialState: function getInitialState() {
    return {
      value: this.props.value
    };
  },

  render: function render() {
    var shadeStyle = {
      position: "fixed",
      left: "0px",
      top: "0px",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)"
    };
    return _react2["default"].createElement(
      "div",
      { className: "row" },
      _react2["default"].createElement(
        "div",
        { className: "six columns" },
        _react2["default"].createElement(
          "h3",
          null,
          "Responde la pregunta:"
        ),
        _react2["default"].createElement(
          "h4",
          null,
          "Que vale la pena conocer de tu barrio?"
        )
      ),
      _react2["default"].createElement(
        "div",
        { className: "six columns" },
        _react2["default"].createElement("textarea", { className: "u-full-width", placeholder: "Respuesta...", maxLength: "200", id: "exampleMessage" })
      )
    );
    // switch(this.state.step){
    // 	case 0:
    //     	 return <Intro nextStep={this.nextStep}/>
    //     	case 1:
    //     		 return <Main nextStep={this.nextStep} />
    // 	}
  }
});

exports["default"] = Pregunta;
module.exports = exports["default"];

},{"react":"react"}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Intro = _react2["default"].createClass({
	displayName: "Intro",

	getInitialState: function getInitialState() {
		return { showVideo: false };
	},
	showVideo: function showVideo() {
		this.setState({ showVideo: true });
	},
	componentDidMount: function componentDidMount() {
		var vid = document.getElementById("vid");
		vid.onended = (function () {
			//alert("video ended");
			this.props.nextStep();
		}).bind(this);
	},

	render: function render() {
		var videoStyle = {
			position: "fixed",
			top: "0px",
			left: "0px",
			width: "100%",
			height: "100%"
		};
		var closeButton = {};
		if (this.state.showVideo) {
			videoStyle.zIndex = 100;
			var closeStyle = {
				position: "fixed",
				top: "0px",
				right: "0px",
				zIndex: 101,
				fontSize: 28,
				fontWeight: "bold"
			};
			closeButton = _react2["default"].createElement(
				"div",
				{ style: closeStyle, onClick: this.props.nextStep },
				" X "
			);
		}

		var headerStyle = {
			position: "fixed",
			top: "0px",
			left: "0px",
			width: "100%",
			padding: "31px"
		};

		var shadeStyle = {
			width: "100%",
			height: "100%",
			position: "fixed",
			top: "0px",
			left: "0px",
			backgroundColor: "rgba(0, 0, 0, 0.6)"
		};

		var introStyle = {
			textAlign: "center",
			height: "100%",
			maxWidth: "750px"
		};

		var playButtonStyle = {
			cursor: "pointer",
			marginTop: "20px"
		};

		return _react2["default"].createElement(
			"div",
			null,
			_react2["default"].createElement(
				"video",
				{ id: "vid", style: videoStyle, autoPlay: true },
				_react2["default"].createElement("source", { src: "./video/enterprise-loop.mp4", type: "video/mp4" }),
				"Your browser does not support the video tag."
			),
			closeButton,
			_react2["default"].createElement("div", { style: shadeStyle }),
			_react2["default"].createElement(
				"div",
				{ className: "header", style: headerStyle },
				_react2["default"].createElement("img", { src: "./img/logo-complete-01.png" })
			),
			_react2["default"].createElement(
				"div",
				{ className: "container", style: introStyle },
				_react2["default"].createElement(
					"div",
					{ className: "row vertical-center" },
					_react2["default"].createElement(
						"h4",
						{ className: "intro-text" },
						"El Observatorio de Saberes Bogotanos toma vida gracias a usted, a su amor y a sus experiencias vividas como habitante de la ciudad."
					),
					_react2["default"].createElement(
						"button",
						{ className: "button-large", onMouseDown: this.props.nextStep },
						"Entrar"
					),
					_react2["default"].createElement(
						"div",
						{ style: playButtonStyle, onClick: this.showVideo },
						_react2["default"].createElement("img", { src: "./img/play-button.png" })
					)
				)
			)
		);
	}

});

exports["default"] = Intro;
module.exports = exports["default"];

},{"react":"react"}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseMap = require('./BaseMap');

var _BaseMap2 = _interopRequireDefault(_BaseMap);

var _Navigation = require('./Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

var _Ingresar = require('./Ingresar');

var _Ingresar2 = _interopRequireDefault(_Ingresar);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _AudioContextManager = require('./AudioContextManager');

var _AudioContextManager2 = _interopRequireDefault(_AudioContextManager);

// ne:
// lat: 4.838602784913988
// lng: -73.91643370363467

// sw:
// lat: 4.5155410235603455
// lng: -74.16126694164626
var colorArray = [
// '#C1AFD1',
// '#D6C9E0',
// '#EAE4F0',
// '#FFD6E0',
// '#FFADC2',
// '#FF85A3',
'#FF5C85', '#FF3366', '#BF264D', '#801A33'];

var Main = _react2['default'].createClass({
  displayName: 'Main',

  getInitialState: function getInitialState() {
    var sw = new mapboxgl.LngLat(-74.16126694164626, 4.5155410235603455);
    var ne = new mapboxgl.LngLat(-73.91643370363467, 4.838602784913988);
    var bounds = new mapboxgl.LngLatBounds(sw, ne);
    return { bounds: bounds, mapLoaded: false, sitios: null, color: "#ff3366", categorias: null, outline: null };
  },
  showElements: function showElements() {
    this.setState({ mapLoaded: true });
  },
  setBounds: function setBounds(bbox) {
    var ne = new mapboxgl.LngLat(bbox[0], bbox[1]);
    var sw = new mapboxgl.LngLat(bbox[2], bbox[3]);
    var bounds = new mapboxgl.LngLatBounds(sw, ne);
    this.setState({ bounds: bounds });
  },
  setOutline: function setOutline(outlineJson) {
    console.log("boundary is ");
    console.log(outlineJson);
    this.setState({ outline: outlineJson });
  },
  initSitios: function initSitios(sitios) {
    var categorias = {};

    var sit = sitios.map((function (obj, index) {
      obj.properties.tempId = index;
      if (obj.properties.sonidoUrl) {
        console.log(" has sound " + obj.properties.sonidoUrl);
        this.audioContext.addSound(index, obj.properties.sonidoUrl);
        obj.properties.hasSound = true;
      } else {
        obj.properties.hasSound = false;
      }
      var cat = obj.properties.categoria;
      if (cat) {
        if (categorias.hasOwnProperty(cat)) {
          categorias[cat].count += 1;
        } else {
          categorias[cat] = { count: 0, color: colorArray[Math.floor(Math.random() * colorArray.length)] };
        }
        obj.properties.color = categorias[cat].color;
      } else {
        obj.properties.color = "#ff3366";
      }

      return obj;
    }).bind(this));
    this.setState({ sitios: sit, categorias: categorias });
  },
  componentDidMount: function componentDidMount() {
    this.audioContext = new _AudioContextManager2['default']();
    _superagent2['default'].get('/api/sitios').query({ limit: 50 }).end((function (err, res) {
      console.log(res.body);
      this.initSitios(res.body);
      //this.setState({sitios: res.body}, this.addGeoJSON);
    }).bind(this));
  },
  render: function render() {
    var mapElements = [];
    if (this.state.sitios != null) {
      mapElements.push(_react2['default'].createElement(_BaseMap2['default'], { bounds: this.state.bounds, outline: this.state.outline, audioContext: this.audioContext, sitios: this.state.sitios, onMapLoaded: this.showElements }));
    }
    if (this.state.mapLoaded) {
      mapElements.push(_react2['default'].createElement(_Navigation2['default'], { setBounds: this.setBounds, setOutline: this.setOutline, categorias: this.state.categorias, color: this.state.color }));
    }

    return _react2['default'].createElement(
      'div',
      null,
      mapElements
    );
  }

});

exports['default'] = Main;
module.exports = exports['default'];

},{"./AudioContextManager":19,"./BaseMap":20,"./Ingresar":25,"./Navigation":29,"react":"react","superagent":56}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _Categorias = require('./Categorias');

var _Categorias2 = _interopRequireDefault(_Categorias);

var Navigation = _react2['default'].createClass({
  displayName: 'Navigation',

  getInitialState: function getInitialState() {

    return { localidades: null, localidad: null, barrio: null, barrios: null };
  },
  componentDidMount: function componentDidMount() {
    _superagent2['default'].get('/api/localidades').query({ bbox: true }).end((function (err, res) {
      console.log(res.body);
      // this.initSitios(res.body);
      this.setState({ localidades: res.body });
    }).bind(this));
  },
  updateBarrioList: function updateBarrioList(index) {
    if (index != this.state.localidad) {
      this.setState({ localidad: index, barrio: null });
      if (index && index != null) {
        this.props.setBounds(this.state.localidades[index].bbox);
        var id = this.state.localidades[index]._id;
        var code = this.state.localidades[index].properties.COD_LOC_IN;
        _superagent2['default'].get('/api/localidadJson').query({ id: id }).end((function (err, res) {
          // console.log(res);
          if (res.status == 200) {
            this.props.setOutline(res.body);
          }
          // this.initSitios(res.body);
          //this.setState({barrios: res.body});
        }).bind(this));

        _superagent2['default'].get('/api/barrios').query({ code: code }).query({ bbox: true }).end((function (err, res) {
          // console.log(res.body);
          // this.initSitios(res.body);
          this.setState({ barrios: res.body });
        }).bind(this));
      }
    }
  },
  updateBarrio: function updateBarrio(index) {
    this.setState({ barrio: index });
    var id = this.state.barrios[index]._id;
    this.props.setBounds(this.state.barrios[index].bbox);
    _superagent2['default'].get('/api/barrioJson').query({ id: id }).end((function (err, res) {
      // console.log(res);
      if (res.status == 200) {
        if (res.body != null) {
          this.props.setOutline(res.body);
        }
      }
      // this.initSitios(res.body);
      //this.setState({barrios: res.body});
    }).bind(this));
  },
  render: function render() {
    //

    var localidadOptions = [];
    if (this.state.localidades != null) {
      localidadOptions = this.state.localidades.map(function (obj, index) {
        return { value: index, label: obj.properties.NOMBRE };
      });
      //console.log(localidadOptions);
    }
    var barrioOptions = [];
    if (this.state.barrios != null) {
      barrioOptions = this.state.barrios.map(function (obj, index) {
        return { value: index, label: obj.properties.NOMBRE };
      });

      var options = [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }];
      // console.log(barrioOptions);
    }
    return _react2['default'].createElement(
      'form',
      { id: 'navigator' },
      _react2['default'].createElement(_Categorias2['default'], { color: this.props.color, categorias: this.props.categorias }),
      _react2['default'].createElement('input', { className: 'u-full-width', type: 'text', placeholder: 'Buscar..', id: 'exampleEmailInput' }),
      _react2['default'].createElement(_reactSelect2['default'], {
        name: 'form-field-name',
        searchPromptText: 'Localidad',
        placeholder: 'Localidad',
        options: localidadOptions,
        value: this.state.localidad,
        onChange: this.updateBarrioList
      }),
      _react2['default'].createElement(_reactSelect2['default'], {
        name: 'form-field-name',
        searchPromptText: 'Barrio',
        placeholder: 'Barrio',
        value: this.state.barrio,
        options: barrioOptions,
        onChange: this.updateBarrio
      })
    );
  }

});

exports['default'] = Navigation;
module.exports = exports['default'];

},{"./Categorias":21,"react":"react","react-select":51,"superagent":56}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Intro = require('./Intro');

var _Intro2 = _interopRequireDefault(_Intro);

var _Main = require('./Main');

var _Main2 = _interopRequireDefault(_Main);

var Web = _react2['default'].createClass({
  displayName: 'Web',

  getInitialState: function getInitialState() {
    return {
      step: 0
    };
  },
  nextStep: function nextStep() {
    console.log("going to next step");
    this.setState({
      step: this.state.step + 1
    });
  },

  previousStep: function previousStep() {
    this.setState({
      step: this.state.step - 1
    });
  },

  render: function render() {
    switch (this.state.step) {
      case 0:
        return _react2['default'].createElement(_Intro2['default'], { nextStep: this.nextStep });
      case 1:
        return _react2['default'].createElement(_Main2['default'], { nextStep: this.nextStep });
    }
  }
});

exports['default'] = Web;
module.exports = exports['default'];

},{"./Intro":27,"./Main":28,"react":"react"}],31:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

_reactRouter2['default'].run(_routes2['default'], _reactRouter2['default'].HistoryLocation, function (Handler) {
  _react2['default'].render(_react2['default'].createElement(Handler, null), document.getElementById('app'));
});

},{"./routes":32,"react":"react","react-router":"react-router"}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var _componentsAdminAdmin = require('./components/admin/Admin');

var _componentsAdminAdmin2 = _interopRequireDefault(_componentsAdminAdmin);

var _componentsAdminAdminList = require('./components/admin/AdminList');

var _componentsAdminAdminList2 = _interopRequireDefault(_componentsAdminAdminList);

var _componentsProjeccion = require('./components/Projeccion');

var _componentsProjeccion2 = _interopRequireDefault(_componentsProjeccion);

var _componentsWebWeb = require('./components/web/Web');

var _componentsWebWeb2 = _interopRequireDefault(_componentsWebWeb);

var _componentsAdminLogin = require('./components/admin/Login');

var _componentsAdminLogin2 = _interopRequireDefault(_componentsAdminLogin);

var _componentsRegister = require('./components/Register');

var _componentsRegister2 = _interopRequireDefault(_componentsRegister);

exports['default'] = _react2['default'].createElement(
  _reactRouter.Route,
  { handler: _componentsApp2['default'] },
  _react2['default'].createElement(_reactRouter.Route, { path: '/admin', handler: _componentsAdminAdmin2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/edit', handler: _componentsAdminAdminList2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/projeccion', handler: _componentsProjeccion2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/web', handler: _componentsWebWeb2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/login', handler: _componentsAdminLogin2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/register', handler: _componentsRegister2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/', handler: _componentsWebWeb2['default'] })
);
module.exports = exports['default'];

},{"./components/App":1,"./components/Projeccion":2,"./components/Register":3,"./components/admin/Admin":5,"./components/admin/AdminList":6,"./components/admin/Login":13,"./components/web/Web":30,"react":"react","react-router":"react-router"}],33:[function(require,module,exports){
/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var CheckboxGroup = React.createClass({
    displayName: 'CheckboxGroup',

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {
            label: '',
            help: null
        };
    },

    changeCheckbox: function changeCheckbox() {
        var value = [];
        this.props.options.forEach((function (option, key) {
            if (this.refs[key].getDOMNode().checked) {
                value.push(option.value);
            }
        }).bind(this));
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function renderElement() {
        var _this = this;
        var controls = this.props.options.map(function (checkbox, key) {
            var checked = _this.getValue().indexOf(checkbox.value) !== -1;
            var disabled = _this.isFormDisabled() || checkbox.disabled || _this.props.disabled;
            return React.createElement(
                'div',
                { className: 'checkbox', key: key },
                React.createElement(
                    'label',
                    null,
                    React.createElement('input', {
                        ref: key,
                        checked: checked,
                        type: 'checkbox',
                        value: checkbox.value,
                        onChange: _this.changeCheckbox,
                        disabled: disabled
                    }),
                    ' ',
                    checkbox.label
                )
            );
        });
        return controls;
    },

    render: function render() {

        if (this.getLayout() === 'elementOnly') {
            return React.createElement(
                'div',
                null,
                this.renderElement()
            );
        }

        return React.createElement(
            Row,
            {
                label: this.props.label,
                required: this.isRequired(),
                hasErrors: this.showErrors(),
                layout: this.getLayout(),
                fakeLabel: true
            },
            this.renderElement(),
            this.renderHelp(),
            this.renderErrorMessage()
        );
    }
});

module.exports = CheckboxGroup;
},{"./mixins/component":39,"./row":42,"formsy-react":46,"react":"react"}],34:[function(require,module,exports){
/*jshint node:true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Checkbox = React.createClass({
    displayName: 'Checkbox',

    mixins: [Formsy.Mixin, ComponentMixin],

    getDefaultProps: function getDefaultProps() {
        return {
            label: '',
            rowLabel: '',
            value: false
        };
    },

    changeValue: function changeValue(event) {
        var target = event.currentTarget;
        this.setValue(target.checked);
        this.props.onChange(this.props.name, target.checked);
    },

    renderElement: function renderElement() {
        return React.createElement(
            'div',
            { className: 'checkbox' },
            React.createElement(
                'label',
                null,
                React.createElement('input', _extends({}, this.props, {
                    id: this.getId(),
                    type: 'checkbox',
                    checked: this.getValue() === true,
                    onChange: this.changeValue,
                    disabled: this.isFormDisabled() || this.props.disabled
                })),
                ' ',
                this.props.label
            )
        );
    },

    render: function render() {

        var element = this.renderElement();

        if (this.getLayout() === 'elementOnly') {
            return element;
        }

        return React.createElement(
            Row,
            {
                label: this.props.rowLabel,
                required: this.isRequired(),
                hasErrors: this.showErrors(),
                layout: this.getLayout(),
                htmlFor: this.getId()
            },
            element,
            this.renderHelp(),
            this.renderErrorMessage()
        );
    }
});

module.exports = Checkbox;
},{"./mixins/component":39,"./row":42,"formsy-react":46,"react":"react"}],35:[function(require,module,exports){
'use strict';

var React = require('react');

var Icon = React.createClass({
    displayName: 'Icon',

    requiredProps: {
        symbol: React.PropTypes.string.isRequired,
        className: React.PropTypes.string
    },

    defaultProps: {
        className: ''
    },

    render: function render() {
        var className = 'glyphicon glyphicon-' + this.props.symbol + ' ' + this.props.className;
        return React.createElement('span', { className: className, 'aria-hidden': 'true' });
    }

});

module.exports = Icon;
},{"react":"react"}],36:[function(require,module,exports){
/*jshint node:true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');
var Icon = require('./icon');

var File = React.createClass({
    displayName: 'File',

    mixins: [Formsy.Mixin, ComponentMixin],

    getInitialState: function getInitialState() {
        return {
            fileList: []
        };
    },

    changeValue: function changeValue(event) {
        var target = event.currentTarget;
        var value = target.value;
        this.setState({ fileList: target.files });
        this.setValue(target.files);
        this.props.onChange(this.props.name, target.files, value);
    },

    render: function render() {
        var element = this.renderElement();

        if (this.getLayout() === 'elementOnly' || this.props.type === 'hidden') {
            return element;
        }

        var warningIcon = '';
        if (this.showErrors()) {
            warningIcon = React.createElement(Icon, { symbol: 'remove', className: 'form-control-feedback' });
        }

        return React.createElement(
            Row,
            {
                label: this.props.label,
                required: this.isRequired(),
                hasErrors: this.showErrors(),
                layout: this.getLayout(),
                htmlFor: this.getId()
            },
            element,
            warningIcon,
            this.renderHelp(),
            this.renderErrorMessage()
        );
    },

    renderElement: function renderElement() {
        return React.createElement('input', _extends({}, this.props, {
            id: this.getId(),
            type: 'file',
            label: null,
            onChange: this.changeValue,
            disabled: this.isFormDisabled() || this.props.disabled
        }));
    }

});

module.exports = File;
},{"./icon":35,"./mixins/component":39,"./row":42,"formsy-react":46,"react":"react"}],37:[function(require,module,exports){
/*jshint node:true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');
var Icon = require('./icon');

var Input = React.createClass({
    displayName: 'Input',

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        type: React.PropTypes.oneOf(['color', 'date', 'datetime', 'datetime-local', 'email', 'hidden', 'month', 'number', 'password', 'range', 'search', 'tel', 'text', 'time', 'url', 'week'])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            type: 'text'
        };
    },

    changeValue: function changeValue(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    render: function render() {
        var element = this.renderElement();

        if (this.getLayout() === 'elementOnly' || this.props.type === 'hidden') {
            return element;
        }

        var warningIcon = '';
        if (this.showErrors()) {
            warningIcon = React.createElement(Icon, { symbol: 'remove', className: 'form-control-feedback' });
        }

        return React.createElement(
            Row,
            {
                label: this.props.label,
                required: this.isRequired(),
                hasErrors: this.showErrors(),
                layout: this.getLayout(),
                htmlFor: this.getId()
            },
            element,
            warningIcon,
            this.renderHelp(),
            this.renderErrorMessage()
        );
    },

    renderElement: function renderElement() {
        var className = 'form-control';
        if (['range'].indexOf(this.props.type) !== -1) {
            className = null;
        }
        return React.createElement('input', _extends({
            className: className
        }, this.props, {
            id: this.getId(),
            label: null,
            value: this.getValue(),
            onChange: this.changeValue,
            disabled: this.isFormDisabled() || this.props.disabled
        }));
    }

});

module.exports = Input;
},{"./icon":35,"./mixins/component":39,"./row":42,"formsy-react":46,"react":"react"}],38:[function(require,module,exports){
'use strict';

module.exports = {
    Checkbox: require('./checkbox'),
    CheckboxGroup: require('./checkbox-group'),
    Icon: require('./icon'),
    Input: require('./input'),
    File: require('./input-file'),
    RadioGroup: require('./radio-group'),
    Row: require('./row'),
    Select: require('./select'),
    Textarea: require('./textarea'),
    ComponentMixin: require('./mixins/component'),
    ParentContextMixin: require('./mixins/parent-context')
};
},{"./checkbox":34,"./checkbox-group":33,"./icon":35,"./input":37,"./input-file":36,"./mixins/component":39,"./mixins/parent-context":40,"./radio-group":41,"./row":42,"./select":43,"./textarea":44}],39:[function(require,module,exports){
'use strict';

var React = require('react');

module.exports = {

    propTypes: {
        layout: React.PropTypes.string
    },

    contextTypes: {
        layout: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            disabled: false,
            validatePristine: false,
            onChange: function onChange() {},
            onFocus: function onFocus() {},
            onBlur: function onBlur() {}
        };
    },

    hashString: function hashString(string) {
        var hash = 0;
        for (var i = 0; i < string.length; i++) {
            hash = (hash << 5) - hash + string.charCodeAt(i) & 0xFFFFFFFF;
        }
        return hash;
    },

    getId: function getId() {
        return this.props.id || this.props.name.split('[').join('_').replace(']', '') + this.hashString(JSON.stringify(this.props));
    },

    getLayout: function getLayout() {
        var defaultLayout = this.context.layout || 'horizontal';
        return this.props.layout ? this.props.layout : defaultLayout;
    },

    renderHelp: function renderHelp() {
        if (!this.props.help) {
            return '';
        }
        return React.createElement(
            'span',
            { className: 'help-block' },
            this.props.help
        );
    },

    renderErrorMessage: function renderErrorMessage() {
        if (!this.showErrors()) {
            return '';
        }
        var errorMessage = this.getErrorMessage();
        if (!errorMessage) {
            return '';
        }
        return React.createElement(
            'span',
            { className: 'help-block validation-message' },
            errorMessage
        );
    },

    showErrors: function showErrors() {
        if (this.isPristine() === true) {
            if (this.props.validatePristine === false) {
                return false;
            }
        }
        return this.isValid() === false;
    }
};
},{"react":"react"}],40:[function(require,module,exports){
'use strict';

var React = require('react');

module.exports = {

    childContextTypes: {
        layout: React.PropTypes.string.isRequired,
        validatePristine: React.PropTypes.bool.isRequired
    },

    getChildContext: function getChildContext() {
        return {
            layout: this.props.layout || 'horizontal',
            validatePristine: this.props.validatePristine || true
        };
    },

    getLayoutClassName: function getLayoutClassName() {
        return 'form-' + this.getChildContext().layout;
    }

};
},{"react":"react"}],41:[function(require,module,exports){
/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var RadioGroup = React.createClass({
    displayName: 'RadioGroup',

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.oneOf(['inline', 'stacked']),
        options: React.PropTypes.array.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {
            type: 'stacked',
            label: '',
            help: null
        };
    },

    changeRadio: function changeRadio(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function renderElement() {
        var _this = this;
        var controls = this.props.options.map(function (radio, key) {
            var checked = _this.getValue() === radio.value;
            var disabled = _this.isFormDisabled() || radio.disabled || _this.props.disabled;
            var className = 'radio' + (disabled ? ' disabled' : '');
            if (_this.props.type === 'inline') {
                return React.createElement(
                    'label',
                    { className: 'radio-inline', key: key },
                    React.createElement('input', {
                        checked: checked,
                        type: 'radio',
                        value: radio.value,
                        onChange: _this.changeRadio,
                        disabled: disabled
                    }),
                    ' ',
                    radio.label
                );
            }
            return React.createElement(
                'div',
                { className: className, key: key },
                React.createElement(
                    'label',
                    null,
                    React.createElement('input', {
                        checked: checked,
                        type: 'radio',
                        value: radio.value,
                        onChange: _this.changeRadio,
                        disabled: disabled
                    }),
                    ' ',
                    radio.label
                )
            );
        });
        return controls;
    },

    render: function render() {

        if (this.getLayout() === 'elementOnly') {
            return React.createElement(
                'div',
                null,
                this.renderElement()
            );
        }

        return React.createElement(
            Row,
            {
                label: this.props.label,
                required: this.isRequired(),
                hasErrors: this.showErrors(),
                layout: this.getLayout(),
                fakeLabel: true
            },
            this.renderElement(),
            this.renderHelp(),
            this.renderErrorMessage()
        );
    }
});

module.exports = RadioGroup;
},{"./mixins/component":39,"./row":42,"formsy-react":46,"react":"react"}],42:[function(require,module,exports){
/*jshint node:true */

'use strict';

var React = require('react');

var Row = React.createClass({
    displayName: 'Row',

    propTypes: {
        label: React.PropTypes.string,
        required: React.PropTypes.bool,
        hasErrors: React.PropTypes.bool,
        fakeLabel: React.PropTypes.bool,
        layout: React.PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
        htmlFor: React.PropTypes.string
    },

    getDefaultProps: function getDefaultProps() {
        return {
            label: '',
            required: false,
            hasErrors: false,
            fakeLabel: false
        };
    },

    renderLabel: function renderLabel() {

        if (this.props.layout === 'elementOnly') {
            return '';
        }

        var labelWrapper = [];
        labelWrapper.push('control-label');

        if (this.props.layout === 'horizontal') {
            labelWrapper.push('col-sm-3');
        }

        if (this.props.fakeLabel) {
            return React.createElement(
                'div',
                { className: labelWrapper.join(' ') },
                React.createElement(
                    'strong',
                    null,
                    this.props.label,
                    this.props.required ? ' *' : null
                )
            );
        }
        return React.createElement(
            'label',
            { className: labelWrapper.join(' '), htmlFor: this.props.htmlFor },
            this.props.label,
            this.props.required ? ' *' : null
        );
    },

    render: function render() {

        if (this.props.layout === 'elementOnly') {
            return React.createElement(
                'span',
                null,
                this.props.children
            );
        }

        var classNames = {
            formGroup: ['form-group'],
            elementWrapper: []
        };

        if (this.props.layout === 'horizontal') {
            classNames.elementWrapper.push('col-sm-9');
        }

        if (this.props.hasErrors) {
            classNames.formGroup.push('has-error');
            classNames.formGroup.push('has-feedback');
        }

        var element = this.props.children;
        if (this.props.layout === 'horizontal') {
            element = React.createElement(
                'div',
                { className: classNames.elementWrapper.join(' ') },
                this.props.children
            );
        }

        return React.createElement(
            'div',
            { className: classNames.formGroup.join(' ') },
            this.renderLabel(),
            element
        );
    }

});

module.exports = Row;
},{"react":"react"}],43:[function(require,module,exports){
/*jshint node:true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Select = React.createClass({
    displayName: 'Select',

    mixins: [Formsy.Mixin, ComponentMixin],

    changeValue: function changeValue(event) {
        var target = event.currentTarget;
        var value;
        if (this.props.multiple) {
            value = [];
            for (var i = 0; i < target.length; i++) {
                var option = target.options[i];
                if (option.selected) {
                    value.push(option.value);
                }
            }
        } else {
            value = target.value;
        }
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    render: function render() {

        if (this.getLayout() === 'elementOnly') {
            return this.renderElement();
        }

        return React.createElement(
            Row,
            {
                label: this.props.label,
                required: this.isRequired(),
                hasErrors: this.showErrors(),
                layout: this.getLayout(),
                htmlFor: this.getId()
            },
            this.renderElement(),
            this.renderHelp(),
            this.renderErrorMessage()
        );
    },

    renderElement: function renderElement() {
        var optionNodes = this.props.options.map(function (item) {
            return React.createElement(
                'option',
                { key: item.value, value: item.value },
                item.label
            );
        });
        return React.createElement(
            'select',
            _extends({
                className: 'form-control'
            }, this.props, {
                id: this.getId(),
                value: this.getValue(),
                onChange: this.changeValue,
                disabled: this.isFormDisabled() || this.props.disabled
            }),
            optionNodes
        );
    }
});

module.exports = Select;
},{"./mixins/component":39,"./row":42,"formsy-react":46,"react":"react"}],44:[function(require,module,exports){
/*jshint node:true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var Textarea = React.createClass({
    displayName: 'Textarea',

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        rows: React.PropTypes.number,
        cols: React.PropTypes.number
    },

    getDefaultProps: function getDefaultProps() {
        return {
            rows: 3,
            cols: 0 // React doesn't render the cols attribute if it is zero
        };
    },

    changeValue: function changeValue(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    renderElement: function renderElement() {
        return React.createElement('textarea', _extends({
            className: 'form-control'
        }, this.props, {
            id: this.getId(),
            value: this.getValue(),
            onChange: this.changeValue,
            disabled: this.isFormDisabled() || this.props.disabled
        }));
    },

    render: function render() {

        if (this.getLayout() === 'elementOnly') {
            return this.renderElement();
        }

        return React.createElement(
            Row,
            {
                label: this.props.label,
                required: this.isRequired(),
                hasErrors: this.showErrors(),
                layout: this.getLayout(),
                htmlFor: this.getId()
            },
            this.renderElement(),
            this.renderHelp(),
            this.renderErrorMessage()
        );
    }
});

module.exports = Textarea;
},{"./mixins/component":39,"./row":42,"formsy-react":46,"react":"react"}],45:[function(require,module,exports){
var utils = require('./utils.js');

var convertValidationsToObject = function (validations) {

  if (typeof validations === 'string') {

    return validations.split(/\,(?![^{\[]*[}\]])/g).reduce(function (validations, validation) {
      var args = validation.split(':');
      var validateMethod = args.shift();

      args = args.map(function (arg) {
        try {
          return JSON.parse(arg);
        } catch (e) {
          return arg; // It is a string if it can not parse it
        }
      });

      if (args.length > 1) {
        throw new Error('Formsy does not support multiple args on string validations. Use object format of validations instead.');
      }

      validations[validateMethod] = args.length ? args[0] : true;
      return validations;
    }, {});

  }

  return validations || {};
};

module.exports = {
  getInitialState: function () {
    return {
      _value: this.props.value,
      _isRequired: false,
      _isValid: true,
      _isPristine: true,
      _pristineValue: this.props.value,
      _validationError: '',
      _externalError: null,
      _formSubmitted: false
    };
  },
  getDefaultProps: function () {
    return {
      validationError: '',
      validationErrors: {}
    };
  },

  componentWillMount: function () {
    var configure = function () {
      this.setValidations(this.props.validations, this.props.required);
      this.props._attachToForm(this);
    }.bind(this);

    if (!this.props.name) {
      throw new Error('Form Input requires a name property when used');
    }

    if (!this.props._attachToForm) {
      return setTimeout(function () {
        if (!this.isMounted()) return;
        if (!this.props._attachToForm) {
          throw new Error('Form Mixin requires component to be nested in a Form');
        }
        configure();
      }.bind(this), 0);
    }
    configure();
  },

  // We have to make the validate method is kept when new props are added
  componentWillReceiveProps: function (nextProps) {
    this.setValidations(nextProps.validations, nextProps.required);
  },

  componentDidUpdate: function (prevProps) {

    // If the value passed has changed, set it. If value is not passed it will
    // internally update, and this will never run
    if (!utils.isSame(this.props.value, prevProps.value)) {
      this.setValue(this.props.value);
    }
  },

  // Detach it when component unmounts
  componentWillUnmount: function () {
    this.props._detachFromForm(this);
  },

  setValidations: function (validations, required) {

    // Add validations to the store itself as the props object can not be modified
    this._validations = convertValidationsToObject(validations) || {};
    this._requiredValidations = required === true ? {isDefaultRequiredValue: true} : convertValidationsToObject(required);

  },

  // We validate after the value has been set
  setValue: function (value) {
    this.setState({
      _value: value,
      _isPristine: false
    }, function () {
      this.props._validate(this);
    }.bind(this));
  },
  resetValue: function () {
    this.setState({
      _value: this.state._pristineValue,
      _isPristine: true
    }, function () {
      this.props._validate(this);
    });
  },
  getValue: function () {
    return this.state._value;
  },
  hasValue: function () {
    return this.state._value !== '';
  },
  getErrorMessage: function () {
    return !this.isValid() || this.showRequired() ? (this.state._externalError || this.state._validationError) : null;
  },
  isFormDisabled: function () {
    return this.props._isFormDisabled();
  },
  isValid: function () {
    return this.state._isValid;
  },
  isPristine: function () {
    return this.state._isPristine;
  },
  isFormSubmitted: function () {
    return this.state._formSubmitted;
  },
  isRequired: function () {
    return !!this.props.required;
  },
  showRequired: function () {
    return this.state._isRequired;
  },
  showError: function () {
    return !this.showRequired() && !this.isValid();
  },
  isValidValue: function (value) {
    return this.props._isValidValue.call(null, this, value);
  }
};

},{"./utils.js":47}],46:[function(require,module,exports){
(function (global){
var React = global.React || require('react');
var Formsy = {};
var validationRules = require('./validationRules.js');
var utils = require('./utils.js');
var Mixin = require('./Mixin.js');
var options = {};

Formsy.Mixin = Mixin;

Formsy.defaults = function (passedOptions) {
  options = passedOptions;
};

Formsy.addValidationRule = function (name, func) {
  validationRules[name] = func;
};

Formsy.Form = React.createClass({
  getInitialState: function () {
    return {
      isValid: true,
      isSubmitting: false,
      canChange: false
    };
  },
  getDefaultProps: function () {
    return {
      onSuccess: function () {},
      onError: function () {},
      onSubmit: function () {},
      onValidSubmit: function () {},
      onInvalidSubmit: function () {},
      onSubmitted: function () {},
      onValid: function () {},
      onInvalid: function () {},
      onChange: function () {},
      validationErrors: null,
      preventExternalInvalidation: false
    };
  },

  // Add a map to store the inputs of the form, a model to store
  // the values of the form and register child inputs
  componentWillMount: function () {
    this.inputs = {};
    this.model = {};
  },

  componentDidMount: function () {
    this.validateForm();
  },

  componentWillUpdate: function () {

    // Keep a reference to input keys before form updates,
    // to check if inputs has changed after render
    this.prevInputKeys = Object.keys(this.inputs);

  },

  componentDidUpdate: function () {

    if (this.props.validationErrors) {
      this.setInputValidationErrors(this.props.validationErrors);
    }

    var newInputKeys = Object.keys(this.inputs);
    if (utils.arraysDiffer(this.prevInputKeys, newInputKeys)) {
      this.validateForm();
    }

  },

  // Allow resetting to specified data
  reset: function (data) {
    this.setFormPristine(true);
    this.resetModel(data);
  },

  // Update model, submit to url prop and send the model
  submit: function (event) {

    event && event.preventDefault();

    // Trigger form as not pristine.
    // If any inputs have not been touched yet this will make them dirty
    // so validation becomes visible (if based on isPristine)
    this.setFormPristine(false);
    this.updateModel();
    var model = this.mapModel();
    this.props.onSubmit(model, this.resetModel, this.updateInputsWithError);
    this.state.isValid ? this.props.onValidSubmit(model, this.resetModel, this.updateInputsWithError) : this.props.onInvalidSubmit(model, this.resetModel, this.updateInputsWithError);

  },

  mapModel: function () {
    if (this.props.mapping) {
      return this.props.mapping(this.model)
    } else {
      return Object.keys(this.model).reduce(function (mappedModel, key) {
        
        var keyArray = key.split('.');
        while (keyArray.length) {
          var currentKey = keyArray.shift();
          mappedModel[currentKey] = keyArray.length ? mappedModel[currentKey] || {} : this.model[key];
        }

        return mappedModel;

      }.bind(this), {});
    }
  },

  // Goes through all registered components and
  // updates the model values
  updateModel: function () {
    Object.keys(this.inputs).forEach(function (name) {
      var component = this.inputs[name];
      this.model[name] = component.state._value;
    }.bind(this));
  },

  // Reset each key in the model to the original / initial / specified value
  resetModel: function (data) {
    Object.keys(this.inputs).forEach(function (name) {
      if (data && data[name]) {
        this.inputs[name].setValue(data[name]);
      } else {
        this.inputs[name].resetValue();
      }
    }.bind(this));
    this.validateForm();
  },

  setInputValidationErrors: function (errors) {
    Object.keys(this.inputs).forEach(function (name, index) {
      var component = this.inputs[name];
      var args = [{
        _isValid: !(name in errors),
        _validationError: errors[name]
      }];
      component.setState.apply(component, args);
    }.bind(this));
  },

  // Checks if the values have changed from their initial value
  isChanged: function() {
    return !utils.isSame(this.getPristineValues(), this.getCurrentValues());
  },

   getPristineValues: function() {
    var inputs = this.inputs;
    return Object.keys(inputs).reduce(function (data, name) {
      var component = inputs[name];
      data[name] = component.props.value;
      return data;
    }, {});
  },

  // Go through errors from server and grab the components
  // stored in the inputs map. Change their state to invalid
  // and set the serverError message
  updateInputsWithError: function (errors) {
    Object.keys(errors).forEach(function (name, index) {
      var component = this.inputs[name];

      if (!component) {
        throw new Error('You are trying to update an input that does not exist. Verify errors object with input names. ' + JSON.stringify(errors));
      }
      var args = [{
        _isValid: this.props.preventExternalInvalidation || false,
        _externalError: errors[name]
      }];
      component.setState.apply(component, args);
    }.bind(this));
  },

  // Traverse the children and children of children to find
  // all inputs by checking the name prop. Maybe do a better
  // check here
  traverseChildrenAndRegisterInputs: function (children) {

    if (typeof children !== 'object' || children === null) {
      return children;
    }
    return React.Children.map(children, function (child) {

      if (typeof child !== 'object' || child === null) {
        return child;
      }

      if (child.props && child.props.name) {

        return React.cloneElement(child, {
          _attachToForm: this.attachToForm,
          _detachFromForm: this.detachFromForm,
          _validate: this.validate,
          _isFormDisabled: this.isFormDisabled,
          _isValidValue: function (component, value) {
            return this.runValidation(component, value).isValid;
          }.bind(this)
        }, child.props && child.props.children);
      } else {
        return React.cloneElement(child, {}, this.traverseChildrenAndRegisterInputs(child.props && child.props.children));
      }

    }, this);

  },

  isFormDisabled: function () {
    return this.props.disabled;
  },

  getCurrentValues: function () {
    return Object.keys(this.inputs).reduce(function (data, name) {
      var component = this.inputs[name];
      data[name] = component.state._value;
      return data;
    }.bind(this), {});
  },

  setFormPristine: function (isPristine) {
    var inputs = this.inputs;
    var inputKeys = Object.keys(inputs);

    this.setState({
        _formSubmitted: !isPristine
    })

    // Iterate through each component and set it as pristine
    // or "dirty".
    inputKeys.forEach(function (name, index) {
      var component = inputs[name];
      component.setState({
        _formSubmitted: !isPristine,
        _isPristine: isPristine
      });
    }.bind(this));
  },

  // Use the binded values and the actual input value to
  // validate the input and set its state. Then check the
  // state of the form itself
  validate: function (component) {

    // Trigger onChange
    if (this.state.canChange) {
      this.props.onChange(this.getCurrentValues(), this.isChanged());
    }

    var validation = this.runValidation(component);
    // Run through the validations, split them up and call
    // the validator IF there is a value or it is required
    component.setState({
      _isValid: validation.isValid,
      _isRequired: validation.isRequired,
      _validationError: validation.error,
      _externalError: null
    }, this.validateForm);

  },

  // Checks validation on current value or a passed value
  runValidation: function (component, value) {

    var currentValues = this.getCurrentValues();
    var validationErrors = component.props.validationErrors;
    var validationError = component.props.validationError;
    value = arguments.length === 2 ? value : component.state._value;

    var validationResults = this.runRules(value, currentValues, component._validations);
    var requiredResults = this.runRules(value, currentValues, component._requiredValidations);

    // the component defines an explicit validate function
    if (typeof component.validate === "function") {
      validationResults.failed = component.validate() ? [] : ['failed'];
    }

    var isRequired = Object.keys(component._requiredValidations).length ? !!requiredResults.success.length : false;
    var isValid = !validationResults.failed.length && !(this.props.validationErrors && this.props.validationErrors[component.props.name]);

    return {
      isRequired: isRequired,
      isValid: isRequired ? false : isValid,
      error: (function () {

        if (isValid && !isRequired) {
          return '';
        }

        if (validationResults.errors.length) {
          return validationResults.errors[0];
        }

        if (this.props.validationErrors && this.props.validationErrors[component.props.name]) {
          return this.props.validationErrors[component.props.name];
        }

        if (isRequired) {
          return validationErrors[requiredResults.success[0]] || null;
        }

        if (!isValid) {
          return validationErrors[validationResults.failed[0]] || validationError;
        }

      }.call(this))
    };

  },

  runRules: function (value, currentValues, validations) {

    var results = {
      errors: [],
      failed: [],
      success: []
    };
    if (Object.keys(validations).length) {
      Object.keys(validations).forEach(function (validationMethod) {

        if (validationRules[validationMethod] && typeof validations[validationMethod] === 'function') {
          throw new Error('Formsy does not allow you to override default validations: ' + validationMethod);
        }

        if (!validationRules[validationMethod] && typeof validations[validationMethod] !== 'function') {
          throw new Error('Formsy does not have the validation rule: ' + validationMethod);
        }

        if (typeof validations[validationMethod] === 'function') {
          var validation = validations[validationMethod](currentValues, value);
          if (typeof validation === 'string') {
            results.errors.push(validation);
            results.failed.push(validationMethod);
          } else if (!validation) {
            results.failed.push(validationMethod);
          }
          return;

        } else if (typeof validations[validationMethod] !== 'function') {
          var validation = validationRules[validationMethod](currentValues, value, validations[validationMethod]);
          if (typeof validation === 'string') {
            results.errors.push(validation);
            results.failed.push(validationMethod);
          } else if (!validation) {
            results.failed.push(validationMethod);
          } else {
            results.success.push(validationMethod);
          }
          return;

        }

        return results.success.push(validationMethod);

      });
    }

    return results;

  },

  // Validate the form by going through all child input components
  // and check their state
  validateForm: function () {
    var allIsValid = true;
    var inputs = this.inputs;
    var inputKeys = Object.keys(inputs);

    // We need a callback as we are validating all inputs again. This will
    // run when the last component has set its state
    var onValidationComplete = function () {
      inputKeys.forEach(function (name) {
        if (!inputs[name].state._isValid) {
          allIsValid = false;
        }
      }.bind(this));

      this.setState({
        isValid: allIsValid
      });

      if (allIsValid) {
        this.props.onValid();
      } else {
        this.props.onInvalid();
      }

      // Tell the form that it can start to trigger change events
      this.setState({
        canChange: true
      });

    }.bind(this);

    // Run validation again in case affected by other inputs. The
    // last component validated will run the onValidationComplete callback
    inputKeys.forEach(function (name, index) {
      var component = inputs[name];
      var validation = this.runValidation(component);
      if (validation.isValid && component.state._externalError) {
        validation.isValid = false;
      }
      component.setState({
        _isValid: validation.isValid,
        _isRequired: validation.isRequired,
        _validationError: validation.error,
        _externalError: !validation.isValid && component.state._externalError ? component.state._externalError : null
      }, index === inputKeys.length - 1 ? onValidationComplete : null);
    }.bind(this));

    // If there are no inputs, set state where form is ready to trigger
    // change event. New inputs might be added later
    if (!inputKeys.length && this.isMounted()) {
      this.setState({
        canChange: true
      });
    }
  },

  // Method put on each input component to register
  // itself to the form
  attachToForm: function (component) {
    this.inputs[component.props.name] = component;
    this.model[component.props.name] = component.state._value;
    this.validate(component);
  },

  // Method put on each input component to unregister
  // itself from the form
  detachFromForm: function (component) {
    delete this.inputs[component.props.name];
    delete this.model[component.props.name];
  },
  render: function () {

    return React.DOM.form({
        onSubmit: this.submit,
        className: this.props.className,
        autoComplete: this.props.autoComplete
      },
      this.traverseChildrenAndRegisterInputs(this.props.children)
    );

  }
});

if (!global.exports && !global.module && (!global.define || !global.define.amd)) {
  global.Formsy = Formsy;
}

module.exports = Formsy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Mixin.js":45,"./utils.js":47,"./validationRules.js":48,"react":"react"}],47:[function(require,module,exports){
module.exports = {
  arraysDiffer: function (a, b) {
    var isDifferent = false;
    if (a.length !== b.length) {
      isDifferent = true;
    } else {
      a.forEach(function (item, index) {
        if (!this.isSame(item, b[index])) {
          isDifferent = true;
        }
      }, this);
    }
    return isDifferent;
  },

  objectsDiffer: function (a, b) {
    var isDifferent = false;
    if (Object.keys(a).length !== Object.keys(b).length) {
      isDifferent = true;
    } else {
      Object.keys(a).forEach(function (key) {
        if (!this.isSame(a[key], b[key])) {
          isDifferent = true;
        }
      }, this);
    }
    return isDifferent;
  },

  isSame: function (a, b) {
    if (typeof a !== typeof b) {
      return false;
    } else if (Array.isArray(a)) {
      return !this.arraysDiffer(a, b);
    } else if (typeof a === 'object' && a !== null && b !== null) {
      return !this.objectsDiffer(a, b);
    }

    return a === b;
  }
};

},{}],48:[function(require,module,exports){
var isExisty = function (value) {
  return value !== null && value !== undefined;
};

var validations = {
  isDefaultRequiredValue: function (values, value) {
    return value === undefined || value === '';
  },
  isExisty: function (values, value) {
    return isExisty(value);
  },
  matchRegexp: function (values, value, regexp) {
    return isExisty(value) && regexp.test(value);
  },
  isUndefined: function (values, value) {
    return value === undefined;
  },
  isEmptyString: function (values, value) {
    return value === '';
  },
  isEmail: function (values, value) {
    return validations.matchRegexp(values, value, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
  },
  isUrl: function (values, value) {
    return validations.matchRegexp(values, value, /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i);
  },
  isTrue: function (values, value) {
    return value === true;
  },
  isFalse: function (values, value) {
    return value === false;
  },
  isNumeric: function (values, value) {
    if (!isExisty(value)) {
        return false;
    }
    if (typeof value === 'number') {
      return true;
    } else {
      var matchResults = value.match(/[-+]?(\d*[.])?\d+/);
      if (!!matchResults) {
        return matchResults[0] == value;
      } else {
        return false;
      }
    }
  },
  isAlpha: function (values, value) {
    return value && /^[a-zA-Z]+$/.test(value);
  },
  isWords: function (values, value) {
    return value && /^[a-zA-Z\s]+$/.test(value);
  },
  isSpecialWords: function (values, value) {
    return !value || /^[a-zA-Z\s\u00C0-\u017F]+$/.test(value);
  },
  isLength: function (values, value, length) {
    return isExisty(value) && value.length === length;
  },
  equals: function (values, value, eql) {
    return value == eql;
  },
  equalsField: function (values, value, field) {
    return value == values[field];
  },
  maxLength: function (values, value, length) {
    return isExisty(value) && value.length <= length;
  },
  minLength: function (values, value, length) {
    return isExisty(value) && value.length >= length;
  }
};

module.exports = validations;

},{}],49:[function(require,module,exports){

// A dictionary mapping script URLs to a dictionary mapping
// component key to component for all components that are waiting
// for the script to load.
var scriptObservers = {};

// A dictionary mapping script URL to a boolean value indicating if the script
// has already been loaded.
var loadedScripts = {};

// A dictionary mapping script URL to a boolean value indicating if the script
// has failed to load.
var erroredScripts = {};

// A counter used to generate a unique id for each component that uses
// ScriptLoaderMixin.
var idCount = 0;

var ReactScriptLoader = {
	componentDidMount: function(key, component, scriptURL) {
		if (typeof component.onScriptLoaded !== 'function') {
			throw new Error('ScriptLoader: Component class must implement onScriptLoaded()');
		}
		if (typeof component.onScriptError !== 'function') {
			throw new Error('ScriptLoader: Component class must implement onScriptError()');
		}
		if (loadedScripts[scriptURL]) {
			component.onScriptLoaded();
			return;
		}
		if (erroredScripts[scriptURL]) {
			component.onScriptError();
			return;
		}

		// If the script is loading, add the component to the script's observers
		// and return. Otherwise, initialize the script's observers with the component
		// and start loading the script.
		if (scriptObservers[scriptURL]) {
			scriptObservers[scriptURL][key] = component;
			return;
		}

		var observers = {};
		observers[key] = component;
		scriptObservers[scriptURL] = observers;

		var script = document.createElement('script');
		script.src = scriptURL;

		var callObserverFuncAndRemoveObserver = function(func) {
			var observers = scriptObservers[scriptURL];
			for (var key in observers) {
				observer = observers[key];
				var removeObserver = func(observer);
				if (removeObserver) {
					delete scriptObservers[scriptURL][key];
				}
			}
			//delete scriptObservers[scriptURL];
		}
		script.onload = function() {
			loadedScripts[scriptURL] = true;
			callObserverFuncAndRemoveObserver(function(observer) {
				if (observer.deferOnScriptLoaded && observer.deferOnScriptLoaded()) {
					return false;
				}
				observer.onScriptLoaded();
				return true;
			});
		};
		script.onerror = function(event) {
			erroredScripts[scriptURL] = true;
			callObserverFuncAndRemoveObserver(function(observer) {
				observer.onScriptError();
				return true;
			});
		};
		document.body.appendChild(script);
	},
	componentWillUnmount: function(key, scriptURL) {
		// If the component is waiting for the script to load, remove the
		// component from the script's observers before unmounting the component.
		var observers = scriptObservers[scriptURL];
		if (observers) {
			delete observers[key];
		}
	},
	triggerOnScriptLoaded: function(scriptURL) {
		if (!loadedScripts[scriptURL]) {
			throw new Error('Error: only call this function after the script has in fact loaded.');
		}
		var observers = scriptObservers[scriptURL];
		for (var key in observers) {
			var observer = observers[key];
			observer.onScriptLoaded();
		}
		delete scriptObservers[scriptURL];
	}
};

var ReactScriptLoaderMixin = {
	componentDidMount: function() {
		if (typeof this.getScriptURL !== 'function') {
			throw new Error("ScriptLoaderMixin: Component class must implement getScriptURL().")
		}
		ReactScriptLoader.componentDidMount(this.__getScriptLoaderID(), this, this.getScriptURL());
	},
	componentWillUnmount: function() {
		ReactScriptLoader.componentWillUnmount(this.__getScriptLoaderID(), this.getScriptURL());
	},
	__getScriptLoaderID: function() {
		return 'id' + idCount++;
	},
};

exports.ReactScriptLoaderMixin = ReactScriptLoaderMixin;
exports.ReactScriptLoader = ReactScriptLoader;

},{}],50:[function(require,module,exports){
'use strict';

var React = require('react');
var classes = require('classnames');

var Option = React.createClass({
	displayName: 'Option',

	propTypes: {
		addLabelText: React.PropTypes.string, // string rendered in case of allowCreate option passed to ReactSelect
		className: React.PropTypes.string, // className (based on mouse position)
		mouseDown: React.PropTypes.func, // method to handle click on option element
		mouseEnter: React.PropTypes.func, // method to handle mouseEnter on option element
		mouseLeave: React.PropTypes.func, // method to handle mouseLeave on option element
		option: React.PropTypes.object.isRequired, // object that is base for that option
		renderFunc: React.PropTypes.func // method passed to ReactSelect component to render label text
	},

	blockEvent: function blockEvent(event) {
		event.preventDefault();
		if (event.target.tagName !== 'A' || !('href' in event.target)) {
			return;
		}

		if (event.target.target) {
			window.open(event.target.href);
		} else {
			window.location.href = event.target.href;
		}
	},

	render: function render() {
		var obj = this.props.option;
		var renderedLabel = this.props.renderFunc(obj);
		var optionClasses = classes(this.props.className, obj.className);

		return obj.disabled ? React.createElement(
			'div',
			{ className: optionClasses,
				onMouseDown: this.blockEvent,
				onClick: this.blockEvent },
			renderedLabel
		) : React.createElement(
			'div',
			{ className: optionClasses,
				style: obj.style,
				onMouseEnter: this.props.mouseEnter,
				onMouseLeave: this.props.mouseLeave,
				onMouseDown: this.props.mouseDown,
				onClick: this.props.mouseDown,
				title: obj.title },
			obj.create ? this.props.addLabelText.replace('{label}', obj.label) : renderedLabel
		);
	}
});

module.exports = Option;
},{"classnames":54,"react":"react"}],51:[function(require,module,exports){
/* disable some rules until we refactor more completely; fixing them now would
   cause conflicts with some open PRs unnecessarily. */
/* eslint react/jsx-sort-prop-types: 0, react/sort-comp: 0, react/prop-types: 0 */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Input = require('react-input-autosize');
var classes = require('classnames');
var Value = require('./Value');
var SingleValue = require('./SingleValue');
var Option = require('./Option');

var requestId = 0;

var Select = React.createClass({

	displayName: 'Select',

	propTypes: {
		addLabelText: React.PropTypes.string, // placeholder displayed when you want to add a label on a multi-value input
		allowCreate: React.PropTypes.bool, // whether to allow creation of new entries
		asyncOptions: React.PropTypes.func, // function to call to get options
		autoload: React.PropTypes.bool, // whether to auto-load the default async options set
		backspaceRemoves: React.PropTypes.bool, // whether backspace removes an item if there is no text input
		cacheAsyncResults: React.PropTypes.bool, // whether to allow cache
		className: React.PropTypes.string, // className for the outer element
		clearAllText: React.PropTypes.string, // title for the "clear" control when multi: true
		clearValueText: React.PropTypes.string, // title for the "clear" control
		clearable: React.PropTypes.bool, // should it be possible to reset value
		delimiter: React.PropTypes.string, // delimiter to use to join multiple values
		disabled: React.PropTypes.bool, // whether the Select is disabled or not
		filterOption: React.PropTypes.func, // method to filter a single option: function(option, filterString)
		filterOptions: React.PropTypes.func, // method to filter the options array: function([options], filterString, [values])
		ignoreCase: React.PropTypes.bool, // whether to perform case-insensitive filtering
		inputProps: React.PropTypes.object, // custom attributes for the Input (in the Select-control) e.g: {'data-foo': 'bar'}
		matchPos: React.PropTypes.string, // (any|start) match the start or entire string when filtering
		matchProp: React.PropTypes.string, // (any|label|value) which option property to filter on
		multi: React.PropTypes.bool, // multi-value input
		name: React.PropTypes.string, // field name, for hidden <input /> tag
		newOptionCreator: React.PropTypes.func, // factory to create new options when allowCreate set
		noResultsText: React.PropTypes.string, // placeholder displayed when there are no matching search results
		onBlur: React.PropTypes.func, // onBlur handler: function(event) {}
		onChange: React.PropTypes.func, // onChange handler: function(newValue) {}
		onFocus: React.PropTypes.func, // onFocus handler: function(event) {}
		onOptionLabelClick: React.PropTypes.func, // onCLick handler for value labels: function (value, event) {}
		optionComponent: React.PropTypes.func, // option component to render in dropdown
		optionRenderer: React.PropTypes.func, // optionRenderer: function(option) {}
		options: React.PropTypes.array, // array of options
		placeholder: React.PropTypes.string, // field placeholder, displayed when there's no value
		searchable: React.PropTypes.bool, // whether to enable searching feature or not
		searchingText: React.PropTypes.string, // message to display whilst options are loading via asyncOptions
		searchPromptText: React.PropTypes.string, // label to prompt for search input
		singleValueComponent: React.PropTypes.func, // single value component when multiple is set to false
		value: React.PropTypes.any, // initial field value
		valueComponent: React.PropTypes.func, // value component to render in multiple mode
		valueRenderer: React.PropTypes.func // valueRenderer: function(option) {}
	},

	getDefaultProps: function getDefaultProps() {
		return {
			addLabelText: 'Add "{label}"?',
			allowCreate: false,
			asyncOptions: undefined,
			autoload: true,
			backspaceRemoves: true,
			cacheAsyncResults: true,
			className: undefined,
			clearAllText: 'Clear all',
			clearValueText: 'Clear value',
			clearable: true,
			delimiter: ',',
			disabled: false,
			ignoreCase: true,
			inputProps: {},
			matchPos: 'any',
			matchProp: 'any',
			name: undefined,
			newOptionCreator: undefined,
			noResultsText: 'No results found',
			onChange: undefined,
			onOptionLabelClick: undefined,
			optionComponent: Option,
			options: undefined,
			placeholder: 'Select...',
			searchable: true,
			searchingText: 'Searching...',
			searchPromptText: 'Type to search',
			singleValueComponent: SingleValue,
			value: undefined,
			valueComponent: Value
		};
	},

	getInitialState: function getInitialState() {
		return {
			/*
    * set by getStateFromValue on componentWillMount:
    * - value
    * - values
    * - filteredOptions
    * - inputValue
    * - placeholder
    * - focusedOption
   */
			isFocused: false,
			isLoading: false,
			isOpen: false,
			options: this.props.options
		};
	},

	componentWillMount: function componentWillMount() {
		var _this = this;

		this._optionsCache = {};
		this._optionsFilterString = '';
		this._closeMenuIfClickedOutside = function (event) {
			if (!_this.state.isOpen) {
				return;
			}
			var menuElem = React.findDOMNode(_this.refs.selectMenuContainer);
			var controlElem = React.findDOMNode(_this.refs.control);

			var eventOccuredOutsideMenu = _this.clickedOutsideElement(menuElem, event);
			var eventOccuredOutsideControl = _this.clickedOutsideElement(controlElem, event);

			// Hide dropdown menu if click occurred outside of menu
			if (eventOccuredOutsideMenu && eventOccuredOutsideControl) {
				_this.setState({
					isOpen: false
				}, _this._unbindCloseMenuIfClickedOutside);
			}
		};
		this._bindCloseMenuIfClickedOutside = function () {
			if (!document.addEventListener && document.attachEvent) {
				document.attachEvent('onclick', this._closeMenuIfClickedOutside);
			} else {
				document.addEventListener('click', this._closeMenuIfClickedOutside);
			}
		};
		this._unbindCloseMenuIfClickedOutside = function () {
			if (!document.removeEventListener && document.detachEvent) {
				document.detachEvent('onclick', this._closeMenuIfClickedOutside);
			} else {
				document.removeEventListener('click', this._closeMenuIfClickedOutside);
			}
		};
		this.setState(this.getStateFromValue(this.props.value));
	},

	componentDidMount: function componentDidMount() {
		if (this.props.asyncOptions && this.props.autoload) {
			this.autoloadAsyncOptions();
		}
	},

	componentWillUnmount: function componentWillUnmount() {
		clearTimeout(this._blurTimeout);
		clearTimeout(this._focusTimeout);
		if (this.state.isOpen) {
			this._unbindCloseMenuIfClickedOutside();
		}
	},

	componentWillReceiveProps: function componentWillReceiveProps(newProps) {
		var _this2 = this;

		var optionsChanged = false;
		if (JSON.stringify(newProps.options) !== JSON.stringify(this.props.options)) {
			optionsChanged = true;
			this.setState({
				options: newProps.options,
				filteredOptions: this.filterOptions(newProps.options)
			});
		}
		if (newProps.value !== this.state.value || newProps.placeholder !== this.props.placeholder || optionsChanged) {
			var setState = function setState(newState) {
				_this2.setState(_this2.getStateFromValue(newProps.value, newState && newState.options || newProps.options, newProps.placeholder));
			};
			if (this.props.asyncOptions) {
				this.loadAsyncOptions(newProps.value, {}, setState);
			} else {
				setState();
			}
		}
	},

	componentDidUpdate: function componentDidUpdate() {
		var _this3 = this;

		if (!this.props.disabled && this._focusAfterUpdate) {
			clearTimeout(this._blurTimeout);
			this._focusTimeout = setTimeout(function () {
				_this3.getInputNode().focus();
				_this3._focusAfterUpdate = false;
			}, 50);
		}
		if (this._focusedOptionReveal) {
			if (this.refs.focused && this.refs.menu) {
				var focusedDOM = React.findDOMNode(this.refs.focused);
				var menuDOM = React.findDOMNode(this.refs.menu);
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();

				if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
				}
			}
			this._focusedOptionReveal = false;
		}
	},

	focus: function focus() {
		this.getInputNode().focus();
	},

	clickedOutsideElement: function clickedOutsideElement(element, event) {
		var eventTarget = event.target ? event.target : event.srcElement;
		while (eventTarget != null) {
			if (eventTarget === element) return false;
			eventTarget = eventTarget.offsetParent;
		}
		return true;
	},

	getStateFromValue: function getStateFromValue(value, options, placeholder) {
		if (!options) {
			options = this.state.options;
		}
		if (!placeholder) {
			placeholder = this.props.placeholder;
		}

		// reset internal filter string
		this._optionsFilterString = '';

		var values = this.initValuesArray(value, options);
		var filteredOptions = this.filterOptions(options, values);

		var focusedOption;
		var valueForState = null;
		if (!this.props.multi && values.length) {
			focusedOption = values[0];
			valueForState = values[0].value;
		} else {
			focusedOption = this.getFirstFocusableOption(filteredOptions);
			valueForState = values.map(function (v) {
				return v.value;
			}).join(this.props.delimiter);
		}

		return {
			value: valueForState,
			values: values,
			inputValue: '',
			filteredOptions: filteredOptions,
			placeholder: !this.props.multi && values.length ? values[0].label : placeholder,
			focusedOption: focusedOption
		};
	},

	getFirstFocusableOption: function getFirstFocusableOption(options) {

		for (var optionIndex = 0; optionIndex < options.length; ++optionIndex) {
			if (!options[optionIndex].disabled) {
				return options[optionIndex];
			}
		}
	},

	initValuesArray: function initValuesArray(values, options) {
		if (!Array.isArray(values)) {
			if (typeof values === 'string') {
				values = values === '' ? [] : values.split(this.props.delimiter);
			} else {
				values = values !== undefined && values !== null ? [values] : [];
			}
		}
		return values.map(function (val) {
			if (typeof val === 'string' || typeof val === 'number') {
				for (var key in options) {
					if (options.hasOwnProperty(key) && options[key] && (options[key].value === val || typeof options[key].value === 'number' && options[key].value.toString() === val)) {
						return options[key];
					}
				}
				return { value: val, label: val };
			} else {
				return val;
			}
		});
	},

	setValue: function setValue(value, focusAfterUpdate) {
		if (focusAfterUpdate || focusAfterUpdate === undefined) {
			this._focusAfterUpdate = true;
		}
		var newState = this.getStateFromValue(value);
		newState.isOpen = false;
		this.fireChangeEvent(newState);
		this.setState(newState);
	},

	selectValue: function selectValue(value) {
		if (!this.props.multi) {
			this.setValue(value);
		} else if (value) {
			this.addValue(value);
		}
		this._unbindCloseMenuIfClickedOutside();
	},

	addValue: function addValue(value) {
		this.setValue(this.state.values.concat(value));
	},

	popValue: function popValue() {
		this.setValue(this.state.values.slice(0, this.state.values.length - 1));
	},

	removeValue: function removeValue(valueToRemove) {
		this.setValue(this.state.values.filter(function (value) {
			return value !== valueToRemove;
		}));
	},

	clearValue: function clearValue(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, ignore it.
		if (event && event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();
		this.setValue(null);
	},

	resetValue: function resetValue() {
		this.setValue(this.state.value === '' ? null : this.state.value);
	},

	getInputNode: function getInputNode() {
		var input = this.refs.input;
		return this.props.searchable ? input : React.findDOMNode(input);
	},

	fireChangeEvent: function fireChangeEvent(newState) {
		if (newState.value !== this.state.value && this.props.onChange) {
			this.props.onChange(newState.value, newState.values);
		}
	},

	handleMouseDown: function handleMouseDown(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();

		// for the non-searchable select, close the dropdown when button is clicked
		if (this.state.isOpen && !this.props.searchable) {
			this.setState({
				isOpen: false
			}, this._unbindCloseMenuIfClickedOutside);
			return;
		}

		if (this.state.isFocused) {
			this.setState({
				isOpen: true
			}, this._bindCloseMenuIfClickedOutside);
		} else {
			this._openAfterFocus = true;
			this.getInputNode().focus();
		}
	},

	handleMouseDownOnArrow: function handleMouseDownOnArrow(event) {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
			return;
		}
		// If not focused, handleMouseDown will handle it
		if (!this.state.isOpen) {
			return;
		}
		event.stopPropagation();
		event.preventDefault();
		this.setState({
			isOpen: false
		}, this._unbindCloseMenuIfClickedOutside);
	},

	handleInputFocus: function handleInputFocus(event) {
		var newIsOpen = this.state.isOpen || this._openAfterFocus;
		this.setState({
			isFocused: true,
			isOpen: newIsOpen
		}, function () {
			if (newIsOpen) {
				this._bindCloseMenuIfClickedOutside();
			} else {
				this._unbindCloseMenuIfClickedOutside();
			}
		});
		this._openAfterFocus = false;
		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	},

	handleInputBlur: function handleInputBlur(event) {
		var _this4 = this;

		this._blurTimeout = setTimeout(function () {
			if (_this4._focusAfterUpdate) return;
			_this4.setState({
				isFocused: false,
				isOpen: false
			});
		}, 50);
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
	},

	handleKeyDown: function handleKeyDown(event) {
		if (this.props.disabled) return;
		switch (event.keyCode) {
			case 8:
				// backspace
				if (!this.state.inputValue && this.props.backspaceRemoves) {
					this.popValue();
				}
				return;
			case 9:
				// tab
				if (event.shiftKey || !this.state.isOpen || !this.state.focusedOption) {
					return;
				}
				this.selectFocusedOption();
				break;
			case 13:
				// enter
				if (!this.state.isOpen) return;

				this.selectFocusedOption();
				break;
			case 27:
				// escape
				if (this.state.isOpen) {
					this.resetValue();
				} else if (this.props.clearable) {
					this.clearValue(event);
				}
				break;
			case 38:
				// up
				this.focusPreviousOption();
				break;
			case 40:
				// down
				this.focusNextOption();
				break;
			case 188:
				// ,
				if (this.props.allowCreate && this.props.multi) {
					event.preventDefault();
					event.stopPropagation();
					this.selectFocusedOption();
				} else {
					return;
				}
				break;
			default:
				return;
		}
		event.preventDefault();
	},

	// Ensures that the currently focused option is available in filteredOptions.
	// If not, returns the first available option.
	_getNewFocusedOption: function _getNewFocusedOption(filteredOptions) {
		for (var key in filteredOptions) {
			if (filteredOptions.hasOwnProperty(key) && filteredOptions[key] === this.state.focusedOption) {
				return filteredOptions[key];
			}
		}
		return this.getFirstFocusableOption(filteredOptions);
	},

	handleInputChange: function handleInputChange(event) {
		// assign an internal variable because we need to use
		// the latest value before setState() has completed.
		this._optionsFilterString = event.target.value;

		if (this.props.asyncOptions) {
			this.setState({
				isLoading: true,
				inputValue: event.target.value
			});
			this.loadAsyncOptions(event.target.value, {
				isLoading: false,
				isOpen: true
			}, this._bindCloseMenuIfClickedOutside);
		} else {
			var filteredOptions = this.filterOptions(this.state.options);
			this.setState({
				isOpen: true,
				inputValue: event.target.value,
				filteredOptions: filteredOptions,
				focusedOption: this._getNewFocusedOption(filteredOptions)
			}, this._bindCloseMenuIfClickedOutside);
		}
	},

	autoloadAsyncOptions: function autoloadAsyncOptions() {
		var _this5 = this;

		this.loadAsyncOptions(this.props.value || '', {}, function () {
			// update with fetched but don't focus
			_this5.setValue(_this5.props.value, false);
		});
	},

	loadAsyncOptions: function loadAsyncOptions(input, state, callback) {
		var _this6 = this;

		var thisRequestId = this._currentRequestId = requestId++;
		if (this.props.cacheAsyncResults) {
			for (var i = 0; i <= input.length; i++) {
				var cacheKey = input.slice(0, i);
				if (this._optionsCache[cacheKey] && (input === cacheKey || this._optionsCache[cacheKey].complete)) {
					var options = this._optionsCache[cacheKey].options;
					var filteredOptions = this.filterOptions(options);
					var newState = {
						options: options,
						filteredOptions: filteredOptions,
						focusedOption: this._getNewFocusedOption(filteredOptions)
					};
					for (var key in state) {
						if (state.hasOwnProperty(key)) {
							newState[key] = state[key];
						}
					}
					this.setState(newState);
					if (callback) callback.call(this, newState);
					return;
				}
			}
		}

		this.props.asyncOptions(input, function (err, data) {
			if (err) throw err;
			if (_this6.props.cacheAsyncResults) {
				_this6._optionsCache[input] = data;
			}
			if (thisRequestId !== _this6._currentRequestId) {
				return;
			}
			var filteredOptions = _this6.filterOptions(data.options);
			var newState = {
				options: data.options,
				filteredOptions: filteredOptions,
				focusedOption: _this6._getNewFocusedOption(filteredOptions)
			};
			for (var key in state) {
				if (state.hasOwnProperty(key)) {
					newState[key] = state[key];
				}
			}
			_this6.setState(newState);
			if (callback) callback.call(_this6, newState);
		});
	},

	filterOptions: function filterOptions(options, values) {
		var filterValue = this._optionsFilterString;
		var exclude = (values || this.state.values).map(function (i) {
			return i.value;
		});
		if (this.props.filterOptions) {
			return this.props.filterOptions.call(this, options, filterValue, exclude);
		} else {
			var filterOption = function filterOption(op) {
				if (this.props.multi && exclude.indexOf(op.value) > -1) return false;
				if (this.props.filterOption) return this.props.filterOption.call(this, op, filterValue);
				var valueTest = String(op.value),
				    labelTest = String(op.label);
				if (this.props.ignoreCase) {
					valueTest = valueTest.toLowerCase();
					labelTest = labelTest.toLowerCase();
					filterValue = filterValue.toLowerCase();
				}
				return !filterValue || this.props.matchPos === 'start' ? this.props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || this.props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : this.props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || this.props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
			};
			return (options || []).filter(filterOption, this);
		}
	},

	selectFocusedOption: function selectFocusedOption() {
		if (this.props.allowCreate && !this.state.focusedOption) {
			return this.selectValue(this.state.inputValue);
		}

		if (this.state.focusedOption) {
			return this.selectValue(this.state.focusedOption);
		}
	},

	focusOption: function focusOption(op) {
		this.setState({
			focusedOption: op
		});
	},

	focusNextOption: function focusNextOption() {
		this.focusAdjacentOption('next');
	},

	focusPreviousOption: function focusPreviousOption() {
		this.focusAdjacentOption('previous');
	},

	focusAdjacentOption: function focusAdjacentOption(dir) {
		this._focusedOptionReveal = true;
		var ops = this.state.filteredOptions.filter(function (op) {
			return !op.disabled;
		});
		if (!this.state.isOpen) {
			this.setState({
				isOpen: true,
				inputValue: '',
				focusedOption: this.state.focusedOption || ops[dir === 'next' ? 0 : ops.length - 1]
			}, this._bindCloseMenuIfClickedOutside);
			return;
		}
		if (!ops.length) {
			return;
		}
		var focusedIndex = -1;
		for (var i = 0; i < ops.length; i++) {
			if (this.state.focusedOption === ops[i]) {
				focusedIndex = i;
				break;
			}
		}
		var focusedOption = ops[0];
		if (dir === 'next' && focusedIndex > -1 && focusedIndex < ops.length - 1) {
			focusedOption = ops[focusedIndex + 1];
		} else if (dir === 'previous') {
			if (focusedIndex > 0) {
				focusedOption = ops[focusedIndex - 1];
			} else {
				focusedOption = ops[ops.length - 1];
			}
		}
		this.setState({
			focusedOption: focusedOption
		});
	},

	unfocusOption: function unfocusOption(op) {
		if (this.state.focusedOption === op) {
			this.setState({
				focusedOption: null
			});
		}
	},

	buildMenu: function buildMenu() {
		var focusedValue = this.state.focusedOption ? this.state.focusedOption.value : null;
		var renderLabel = this.props.optionRenderer || function (op) {
			return op.label;
		};
		if (this.state.filteredOptions.length > 0) {
			focusedValue = focusedValue == null ? this.state.filteredOptions[0] : focusedValue;
		}
		// Add the current value to the filtered options in last resort
		var options = this.state.filteredOptions;
		if (this.props.allowCreate && this.state.inputValue.trim()) {
			var inputValue = this.state.inputValue;
			options = options.slice();
			var newOption = this.props.newOptionCreator ? this.props.newOptionCreator(inputValue) : {
				value: inputValue,
				label: inputValue,
				create: true
			};
			options.unshift(newOption);
		}
		var ops = Object.keys(options).map(function (key) {
			var op = options[key];
			var isSelected = this.state.value === op.value;
			var isFocused = focusedValue === op.value;
			var optionClass = classes({
				'Select-option': true,
				'is-selected': isSelected,
				'is-focused': isFocused,
				'is-disabled': op.disabled
			});
			var ref = isFocused ? 'focused' : null;
			var mouseEnter = this.focusOption.bind(this, op);
			var mouseLeave = this.unfocusOption.bind(this, op);
			var mouseDown = this.selectValue.bind(this, op);
			var optionResult = React.createElement(this.props.optionComponent, {
				key: 'option-' + op.value,
				className: optionClass,
				renderFunc: renderLabel,
				mouseEnter: mouseEnter,
				mouseLeave: mouseLeave,
				mouseDown: mouseDown,
				click: mouseDown,
				addLabelText: this.props.addLabelText,
				option: op,
				ref: ref
			});
			return optionResult;
		}, this);

		if (ops.length) {
			return ops;
		} else {
			var noResultsText, promptClass;
			if (this.state.isLoading) {
				promptClass = 'Select-searching';
				noResultsText = this.props.searchingText;
			} else if (this.state.inputValue || !this.props.asyncOptions) {
				promptClass = 'Select-noresults';
				noResultsText = this.props.noResultsText;
			} else {
				promptClass = 'Select-search-prompt';
				noResultsText = this.props.searchPromptText;
			}

			return React.createElement(
				'div',
				{ className: promptClass },
				noResultsText
			);
		}
	},

	handleOptionLabelClick: function handleOptionLabelClick(value, event) {
		if (this.props.onOptionLabelClick) {
			this.props.onOptionLabelClick(value, event);
		}
	},

	render: function render() {
		var selectClass = classes('Select', this.props.className, {
			'is-multi': this.props.multi,
			'is-searchable': this.props.searchable,
			'is-open': this.state.isOpen,
			'is-focused': this.state.isFocused,
			'is-loading': this.state.isLoading,
			'is-disabled': this.props.disabled,
			'has-value': this.state.value
		});
		var value = [];
		if (this.props.multi) {
			this.state.values.forEach(function (val) {
				var onOptionLabelClick = this.handleOptionLabelClick.bind(this, val);
				var onRemove = this.removeValue.bind(this, val);
				var valueComponent = React.createElement(this.props.valueComponent, {
					key: val.value,
					option: val,
					renderer: this.props.valueRenderer,
					optionLabelClick: !!this.props.onOptionLabelClick,
					onOptionLabelClick: onOptionLabelClick,
					onRemove: onRemove,
					disabled: this.props.disabled
				});
				value.push(valueComponent);
			}, this);
		}

		if (!this.state.inputValue && (!this.props.multi || !value.length)) {
			var val = this.state.values[0] || null;
			if (this.props.valueRenderer && !!this.state.values.length) {
				value.push(React.createElement(Value, {
					key: 0,
					option: val,
					renderer: this.props.valueRenderer,
					disabled: this.props.disabled }));
			} else {
				var singleValueComponent = React.createElement(this.props.singleValueComponent, {
					key: 'placeholder',
					value: val,
					placeholder: this.state.placeholder
				});
				value.push(singleValueComponent);
			}
		}

		var loading = this.state.isLoading ? React.createElement('span', { className: 'Select-loading', 'aria-hidden': 'true' }) : null;
		var clear = this.props.clearable && this.state.value && !this.props.disabled ? React.createElement('span', { className: 'Select-clear', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText, 'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText, onMouseDown: this.clearValue, onClick: this.clearValue, dangerouslySetInnerHTML: { __html: '&times;' } }) : null;

		var menu;
		var menuProps;
		if (this.state.isOpen) {
			menuProps = {
				ref: 'menu',
				className: 'Select-menu',
				onMouseDown: this.handleMouseDown
			};
			menu = React.createElement(
				'div',
				{ ref: 'selectMenuContainer', className: 'Select-menu-outer' },
				React.createElement(
					'div',
					menuProps,
					this.buildMenu()
				)
			);
		}

		var input;
		var inputProps = {
			ref: 'input',
			className: 'Select-input ' + (this.props.inputProps.className || ''),
			tabIndex: this.props.tabIndex || 0,
			onFocus: this.handleInputFocus,
			onBlur: this.handleInputBlur
		};
		for (var key in this.props.inputProps) {
			if (this.props.inputProps.hasOwnProperty(key) && key !== 'className') {
				inputProps[key] = this.props.inputProps[key];
			}
		}

		if (!this.props.disabled) {
			if (this.props.searchable) {
				input = React.createElement(Input, _extends({ value: this.state.inputValue, onChange: this.handleInputChange, minWidth: '5' }, inputProps));
			} else {
				input = React.createElement(
					'div',
					inputProps,
					' '
				);
			}
		} else if (!this.props.multi || !this.state.values.length) {
			input = React.createElement(
				'div',
				{ className: 'Select-input' },
				' '
			);
		}

		return React.createElement(
			'div',
			{ ref: 'wrapper', className: selectClass },
			React.createElement('input', { type: 'hidden', ref: 'value', name: this.props.name, value: this.state.value, disabled: this.props.disabled }),
			React.createElement(
				'div',
				{ className: 'Select-control', ref: 'control', onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
				value,
				input,
				React.createElement('span', { className: 'Select-arrow-zone', onMouseDown: this.handleMouseDownOnArrow }),
				React.createElement('span', { className: 'Select-arrow', onMouseDown: this.handleMouseDownOnArrow }),
				loading,
				clear
			),
			menu
		);
	}

});

module.exports = Select;
},{"./Option":50,"./SingleValue":52,"./Value":53,"classnames":54,"react":"react","react-input-autosize":55}],52:[function(require,module,exports){
'use strict';

var React = require('react');
var classes = require('classnames');

var SingleValue = React.createClass({
	displayName: 'SingleValue',

	propTypes: {
		placeholder: React.PropTypes.string, // this is default value provided by React-Select based component
		value: React.PropTypes.object // selected option
	},
	render: function render() {

		var classNames = classes('Select-placeholder', this.props.value && this.props.value.className);
		return React.createElement(
			'div',
			{
				className: classNames,
				style: this.props.value && this.props.value.style,
				title: this.props.value && this.props.value.title
			},
			this.props.placeholder
		);
	}
});

module.exports = SingleValue;
},{"classnames":54,"react":"react"}],53:[function(require,module,exports){
'use strict';

var React = require('react');
var classes = require('classnames');

var Value = React.createClass({

	displayName: 'Value',

	propTypes: {
		disabled: React.PropTypes.bool, // disabled prop passed to ReactSelect
		onOptionLabelClick: React.PropTypes.func, // method to handle click on value label
		onRemove: React.PropTypes.func, // method to handle remove of that value
		option: React.PropTypes.object.isRequired, // option passed to component
		optionLabelClick: React.PropTypes.bool, // indicates if onOptionLabelClick should be handled
		renderer: React.PropTypes.func // method to render option label passed to ReactSelect
	},

	blockEvent: function blockEvent(event) {
		event.stopPropagation();
	},

	handleOnRemove: function handleOnRemove(event) {
		if (!this.props.disabled) {
			this.props.onRemove(event);
		}
	},

	render: function render() {
		var label = this.props.option.label;
		if (this.props.renderer) {
			label = this.props.renderer(this.props.option);
		}

		if (!this.props.onRemove && !this.props.optionLabelClick) {
			return React.createElement(
				'div',
				{
					className: classes('Select-value', this.props.option.className),
					style: this.props.option.style,
					title: this.props.option.title
				},
				label
			);
		}

		if (this.props.optionLabelClick) {

			label = React.createElement(
				'a',
				{ className: classes('Select-item-label__a', this.props.option.className),
					onMouseDown: this.blockEvent,
					onTouchEnd: this.props.onOptionLabelClick,
					onClick: this.props.onOptionLabelClick,
					style: this.props.option.style,
					title: this.props.option.title },
				label
			);
		}

		return React.createElement(
			'div',
			{ className: classes('Select-item', this.props.option.className),
				style: this.props.option.style,
				title: this.props.option.title },
			React.createElement(
				'span',
				{ className: 'Select-item-icon',
					onMouseDown: this.blockEvent,
					onClick: this.handleOnRemove,
					onTouchEnd: this.handleOnRemove },
				'×'
			),
			React.createElement(
				'span',
				{ className: 'Select-item-label' },
				label
			)
		);
	}

});

module.exports = Value;
},{"classnames":54,"react":"react"}],54:[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function () {
	'use strict';

	function classNames () {

		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if ('string' === argType || 'number' === argType) {
				classes += ' ' + arg;

			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);

			} else if ('object' === argType) {
				for (var key in arg) {
					if (arg.hasOwnProperty(key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}

		return classes.substr(1);
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd){
		// AMD. Register as an anonymous module.
		define(function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}

}());

},{}],55:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var sizerStyle = { position: 'absolute', visibility: 'hidden', height: 0, width: 0, overflow: 'scroll', whiteSpace: 'nowrap' };

var AutosizeInput = React.createClass({
	displayName: 'AutosizeInput',

	propTypes: {
		value: React.PropTypes.any, // field value
		defaultValue: React.PropTypes.any, // default field value
		onChange: React.PropTypes.func, // onChange handler: function(newValue) {}
		style: React.PropTypes.object, // css styles for the outer element
		className: React.PropTypes.string, // className for the outer element
		minWidth: React.PropTypes.oneOfType([// minimum width for input element
		React.PropTypes.number, React.PropTypes.string]),
		inputStyle: React.PropTypes.object, // css styles for the input element
		inputClassName: React.PropTypes.string // className for the input element
	},
	getDefaultProps: function getDefaultProps() {
		return {
			minWidth: 1
		};
	},
	getInitialState: function getInitialState() {
		return {
			inputWidth: this.props.minWidth
		};
	},
	componentDidMount: function componentDidMount() {
		this.copyInputStyles();
		this.updateInputWidth();
	},
	componentDidUpdate: function componentDidUpdate() {
		this.updateInputWidth();
	},
	copyInputStyles: function copyInputStyles() {
		if (!this.isMounted() || !window.getComputedStyle) {
			return;
		}
		var inputStyle = window.getComputedStyle(React.findDOMNode(this.refs.input));
		var widthNode = React.findDOMNode(this.refs.sizer);
		widthNode.style.fontSize = inputStyle.fontSize;
		widthNode.style.fontFamily = inputStyle.fontFamily;
		widthNode.style.letterSpacing = inputStyle.letterSpacing;
		if (this.props.placeholder) {
			var placeholderNode = React.findDOMNode(this.refs.placeholderSizer);
			placeholderNode.style.fontSize = inputStyle.fontSize;
			placeholderNode.style.fontFamily = inputStyle.fontFamily;
			placeholderNode.style.letterSpacing = inputStyle.letterSpacing;
		}
	},
	updateInputWidth: function updateInputWidth() {
		if (!this.isMounted() || typeof React.findDOMNode(this.refs.sizer).scrollWidth === 'undefined') {
			return;
		}
		var newInputWidth;
		if (this.props.placeholder) {
			newInputWidth = Math.max(React.findDOMNode(this.refs.sizer).scrollWidth, React.findDOMNode(this.refs.placeholderSizer).scrollWidth) + 2;
		} else {
			newInputWidth = React.findDOMNode(this.refs.sizer).scrollWidth + 2;
		}
		if (newInputWidth < this.props.minWidth) {
			newInputWidth = this.props.minWidth;
		}
		if (newInputWidth !== this.state.inputWidth) {
			this.setState({
				inputWidth: newInputWidth
			});
		}
	},
	getInput: function getInput() {
		return this.refs.input;
	},
	focus: function focus() {
		React.findDOMNode(this.refs.input).focus();
	},
	select: function select() {
		React.findDOMNode(this.refs.input).select();
	},
	render: function render() {
		var escapedValue = (this.props.value || '').replace(/\&/g, '&amp;').replace(/ /g, '&nbsp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
		var wrapperStyle = this.props.style || {};
		wrapperStyle.display = 'inline-block';
		var inputStyle = _extends({}, this.props.inputStyle);
		inputStyle.width = this.state.inputWidth;
		inputStyle.boxSizing = 'content-box';
		var placeholder = this.props.placeholder ? React.createElement(
			'div',
			{ ref: 'placeholderSizer', style: sizerStyle },
			this.props.placeholder
		) : null;
		return React.createElement(
			'div',
			{ className: this.props.className, style: wrapperStyle },
			React.createElement('input', _extends({}, this.props, { ref: 'input', className: this.props.inputClassName, style: inputStyle })),
			React.createElement('div', { ref: 'sizer', style: sizerStyle, dangerouslySetInnerHTML: { __html: escapedValue } }),
			placeholder
		);
	}
});

module.exports = AutosizeInput;
},{"react":"react"}],56:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var reduce = require('reduce');

/**
 * Root reference for iframes.
 */

var root = 'undefined' == typeof window
  ? (this || self)
  : window;

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(obj[key]));
    }
  }
  return pairs.join('&');
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text ? this.text : this.xhr.response)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }

  var type = status / 100 | 0;

  // status / class
  this.status = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  Emitter.call(this);
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {};
  this._header = {};
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      return self.callback(err);
    }

    self.emit('response', res);

    if (err) {
      return self.callback(err, res);
    }

    if (res.status >= 200 && res.status < 300) {
      return self.callback(err, res);
    }

    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
    new_err.original = err;
    new_err.response = res;
    new_err.status = res.status;

    self.callback(new_err, res);
  });
}

/**
 * Mixin `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Allow for extension
 */

Request.prototype.use = function(fn) {
  fn(this);
  return this;
}

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.timeout = function(ms){
  this._timeout = ms;
  return this;
};

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.clearTimeout = function(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set header `field` to `val`, or multiple fields with one object.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Get case-insensitive header `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api private
 */

Request.prototype.getHeader = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass){
  var str = btoa(user + ':' + pass);
  this.set('Authorization', 'Basic ' + str);
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.field = function(name, val){
  if (!this._formData) this._formData = new root.FormData();
  this._formData.append(name, val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  if (!this._formData) this._formData = new root.FormData();
  this._formData.append(field, file, filename);
  return this;
};

/**
 * Send `data`, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // querystring
 *       request.get('/search')
 *         .end(callback)
 *
 *       // multiple data "writes"
 *       request.get('/search')
 *         .send({ search: 'query' })
 *         .send({ range: '1..5' })
 *         .send({ order: 'desc' })
 *         .end(callback)
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"})
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this.getHeader('Content-Type');

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this.getHeader('Content-Type');
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj || isHost(data)) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
  err.crossDomain = true;
  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (0 == status) {
      if (self.timedout) return self.timeoutError();
      if (self.aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(e){
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    xhr.onprogress = handleProgress;
  }
  try {
    if (xhr.upload && this.hasListeners('progress')) {
      xhr.upload.onprogress = handleProgress;
    }
  } catch(e) {
    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
    // Reported here:
    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.timedout = true;
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  xhr.open(this.method, this.url, true);

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var contentType = this.getHeader('Content-Type');
    var serialize = request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  // send stuff
  this.emit('request', this);
  xhr.send(data);
  return this;
};

/**
 * Faux promise support
 *
 * @param {Function} fulfill
 * @param {Function} reject
 * @return {Request}
 */

Request.prototype.then = function (fulfill, reject) {
  return this.end(function(err, res) {
    err ? reject(err) : fulfill(res);
  });
}

/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(method, url) {
  // callback
  if ('function' == typeof url) {
    return new Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new Request('GET', method);
  }

  return new Request(method, url);
}

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.del = function(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * Expose `request`.
 */

module.exports = request;

},{"emitter":57,"reduce":58}],57:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],58:[function(require,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
},{}]},{},[31]);
