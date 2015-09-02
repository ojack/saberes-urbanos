(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var Checkbox = _formsyReactComponents2['default'].Checkbox;
var CheckboxGroup = _formsyReactComponents2['default'].CheckboxGroup;
var Input = _formsyReactComponents2['default'].Input;
var RadioGroup = _formsyReactComponents2['default'].RadioGroup;
var Row = _formsyReactComponents2['default'].Row;
var Select = _formsyReactComponents2['default'].Select;
var File = _formsyReactComponents2['default'].File;
var Textarea = _formsyReactComponents2['default'].Textarea;

var AddSite = _react2['default'].createClass({
    displayName: 'AddSite',

    getInitialState: function getInitialState() {

        return { direccion: this.props.data.direccion, localidades: null, barrios: null };
    },
    resetForm: function resetForm() {
        this.refs.form.reset();
    },
    updateDireccion: function updateDireccion(val) {
        //console.log("updating direccion state");
        this.setState({ direccion: val });
        //console.log(this.state);
    },
    submitForm: function submitForm(data) {
        console.log(data);
        var r = _superagent2['default'].post('api/upload');
        for (var key in data) {
            if (data[key] != undefined && data[key] != null) {

                //attach files
                if (key == 'foto' || key == 'sonido') {
                    if (data[key].length > 0) {
                        //console.log(data[key][0]);
                        r.attach(key, data.foto[0]);
                    }

                    //send other fields as part of request
                } else {

                        //format coords for mongo 2d
                        if (key == 'coords') {
                            data[key] = [data[key].lng, data[key].lat];
                        } else if (key == 'localidad') {
                            var result = this.state.localidades.filter(function (obj) {
                                //   console.log(obj);
                                return obj.properties.COD_LOC_IN == parseInt(data[key]);
                            });
                            console.log(data[key]);
                            console.log(result);
                            data[key] = result[0].properties.NOMBRE;
                        } else if (key == 'barrio') {
                            var result = this.state.barrios.filter(function (obj) {
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
        r.end(function (err, res) {
            if (res.ok) {
                //console.log('yay got ' + JSON.stringify(res.body));
            } else {
                    //console.log('Oh no! error ' + res.text);
                }
        });
    },
    updateBarrioList: function updateBarrioList(code) {
        console.log("time to update barrios " + code);
        _superagent2['default'].get('/api/barrios').query({ code: code }).end((function (err, res) {
            console.log(res.body);
            // this.initSitios(res.body);
            this.setState({ barrios: res.body });
        }).bind(this));
    },
    componentDidMount: function componentDidMount() {
        _superagent2['default'].get('/api/localidades').query({ limit: 50 }).end((function (err, res) {
            console.log(res.body);
            // this.initSitios(res.body);
            this.setState({ localidades: res.body });
        }).bind(this));
    },
    render: function render() {

        var radioOptions = [{ value: 'true', label: 'Existe' }, { value: 'false', label: 'Ya no existe' }];

        var selectOptions = [{ value: 'Santa Fe', label: 'Santa Fe' }, { value: 'Chapinero', label: 'Chapinero' }];

        var localidadOptions = [];
        if (this.state.localidades != null) {
            localidadOptions = this.state.localidades.map(function (obj) {
                return { value: obj.properties.COD_LOC_IN, label: obj.properties.NOMBRE };
            });
            //console.log(localidadOptions);
        }

        var barrioOptions = [];
        if (this.state.barrios != null) {
            barrioOptions = this.state.barrios.map(function (obj) {
                return { value: obj.properties.OBJECTID, label: obj.properties.NOMBRE };
            });
            console.log(barrioOptions);
        }

        selectOptions.unshift({ value: '', label: 'Seleccionar uno…' });

        var formClassName = '';

        var sharedProps = {
            /*  layout: this.state.layout,
              validatePristine: this.state.validatePristine,
              disabled: this.state.disabled */
        };

        return _react2['default'].createElement(
            'div',
            { className: 'row' },
            _react2['default'].createElement(
                'div',
                { className: 'page-header' },
                _react2['default'].createElement(
                    'h1',
                    null,
                    'Add Sitio'
                )
            ),
            _react2['default'].createElement(
                _formsyReact2['default'].Form,
                { className: formClassName, onSubmit: this.submitForm, ref: 'form' },
                _react2['default'].createElement(
                    'fieldset',
                    null,
                    _react2['default'].createElement(Input, _extends({}, sharedProps, {
                        name: 'respuesta',
                        value: this.props.data.respuesta,
                        label: 'Repuesta',
                        type: 'text',
                        required: true
                    })),
                    _react2['default'].createElement(Textarea, _extends({}, sharedProps, {
                        rows: 3,
                        cols: 40,
                        value: this.props.data.porque,
                        name: 'porque',
                        label: 'Porque'
                    })),
                    _react2['default'].createElement(RadioGroup, _extends({}, sharedProps, {
                        name: 'temporalidad',
                        type: 'inline',
                        value: this.props.data.temporalidad,
                        label: 'Temporalidad',
                        options: radioOptions,
                        required: true
                    })),
                    _react2['default'].createElement(_FormsyDropdown2['default'], _extends({}, sharedProps, {
                        name: 'localidad',
                        label: 'Localidad',
                        updateBarrioList: this.updateBarrioList,
                        value: this.props.data.localidad,
                        options: localidadOptions,
                        required: true
                    })),
                    _react2['default'].createElement(_FormsyDropdown2['default'], _extends({}, sharedProps, {
                        name: 'barrio',
                        value: this.props.data.barrio,
                        options: barrioOptions,
                        label: 'Barrio'
                    })),
                    _react2['default'].createElement(_FormsyInput2['default'], _extends({}, sharedProps, {
                        name: 'direccion',
                        value: this.props.data.direccion,
                        updateParent: this.updateDireccion,
                        label: 'Dirección'
                    })),
                    _react2['default'].createElement(_MultipleDropdown2['default'], _extends({}, sharedProps, {
                        name: 'categoria',
                        value: this.props.data.direccion,
                        updateParent: this.updateDireccion,
                        label: 'Categoría'
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
                        label: 'Link to video',
                        validations: 'isUrl',
                        validationError: 'Must be valid URL'
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
                    _react2['default'].createElement('input', { className: 'btn btn-primary', formNoValidate: true, type: 'submit', defaultValue: 'Submit' })
                )
            )
        );
    }
});

exports['default'] = AddSite;
module.exports = exports['default'];

},{"./FormsyDropdown":7,"./FormsyInput":8,"./MapLocator":14,"./MultipleDropdown":15,"formsy-react":90,"formsy-react-components":82,"react":"react","superagent":114}],2:[function(require,module,exports){
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
	existente: false,
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
	visible: false
};

var Admin = _react2['default'].createClass({
	displayName: 'Admin',

	render: function render() {
		return _react2['default'].createElement(_AddSite2['default'], { data: data });
	}
});

exports['default'] = Admin;
module.exports = exports['default'];

},{"./AddSite":1,"./AdminList":3,"react":"react"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _fixedDataTable = require('fixed-data-table');

var _fixedDataTable2 = _interopRequireDefault(_fixedDataTable);

var Table = _fixedDataTable2['default'].Table;
var Column = _fixedDataTable2['default'].Column;

var data = {
	respuesta: null,
	porque: null,
	existente: false,
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
	visible: false
};

var rows = [['a1', 'b1', 'c1'], ['a2', 'b2', 'c2'], ['a3', 'b3', 'c3']];

// .... and more
function rowGetter(rowIndex) {
	return rows[rowIndex];
}

function editButton(id) {
	return _react2['default'].createElement(
		'button',
		{ id: id, onClick: handleClick },
		'Edit '
	);
}

function handleClick(e) {
	console.log(e.target);
}

function renderCell(cellData) {
	if (typeof cellData == 'boolean') {
		return _react2['default'].createElement(
			'div',
			null,
			_react2['default'].createElement('input', { type: 'checkbox', defaultValue: cellData }),
			' '
		);
	} else {
		return _react2['default'].createElement(
			'div',
			null,
			' ',
			cellData,
			' '
		);
	}
}

var AdminList = _react2['default'].createClass({
	displayName: 'AdminList',

	getInitialState: function getInitialState() {
		//create array
		var colArray = [];
		for (var field in this.props.data) {
			colArray.push(field);
		}
		console.log(colArray);
		return { sitios: [], columns: colArray };
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
		var cols = this.state.columns.map(function (field, index) {
			return _react2['default'].createElement(Column, {
				label: field.toUpperCase(),
				cellRenderer: renderCell,
				width: 80,
				dataKey: index
			});
		});
		return _react2['default'].createElement(
			Table,
			{
				rowHeight: 50,
				rowGetter: this.getItem,
				rowsCount: this.state.sitios.length,
				width: 1000,
				height: 1000,
				headerHeight: 50 },
			cols,
			_react2['default'].createElement(Column, {
				label: "",
				cellRenderer: editButton,
				width: 80
			})
		);
	}
});

exports['default'] = AdminList;
module.exports = exports['default'];

},{"fixed-data-table":76,"react":"react","superagent":114}],4:[function(require,module,exports){
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

},{"react":"react","react-router":"react-router"}],5:[function(require,module,exports){
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

var _dataLightV7EditJson = require('./data/light-v7-edit.json');

var _dataLightV7EditJson2 = _interopRequireDefault(_dataLightV7EditJson);

var _InfoWindow = require('./InfoWindow');

var _InfoWindow2 = _interopRequireDefault(_InfoWindow);

var BaseMap = _react2['default'].createClass({
	displayName: 'BaseMap',

	getInitialState: function getInitialState() {
		return { coords: {
				lat: 4.597,
				lng: -74.09
			}, sitios: null,
			selected: null,
			mapLoaded: false,
			dataLoadedToMap: false };
	},
	initSitios: function initSitios(sitios) {
		var sit = sitios.map(function (obj, index) {
			obj.properties.tempId = index;
			return obj;
		});
		this.setState({ sitios: sit }, this.addGeoJSON);
	},
	updatePixelCoords: function updatePixelCoords() {
		if (this.state.sitios != null && this.state.mapLoaded) {
			var sit = this.state.sitios.map((function (obj, index) {

				obj.properties.screenCoords = this.map.project({ lat: obj.geometry.coordinates[1], lng: obj.geometry.coordinates[0] });
				return obj;
			}).bind(this));
			this.setState({ sitios: sit }, this.renderCanvas);
			//console.log(sit);
		}
	},
	renderCanvas: function renderCanvas() {
		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		for (var i = 0; i < this.state.sitios.length; i++) {
			var obj = this.state.sitios[i];
			var size = 10;
			if (this.state.selected != null && obj.properties.tempId == this.state.selected.tempId) {
				size = 20;
			}
			this.ctx.fillStyle = "#FF3366";
			//console.log(obj.properties.screenCoords.x);
			this.ctx.fillRect(Math.floor(obj.properties.screenCoords.x) - size / 2, Math.floor(obj.properties.screenCoords.y) - size / 2, size, size);
			//this.ctx.fillRect(i*10, i*10,8, 8);
			//this.ctx.fillRect(100,100, 8, 8);
		}
	},
	addGeoJSON: function addGeoJSON() {
		//only load data if map has been initialized, data has been received, and data has no already been loaded
		if (this.state.sitios != null && this.state.mapLoaded && !this.state.dataLoadedToMap) {

			console.log("adding data");
			// console.log(this.state.sitios);
			this.map.addSource("markers", {
				"type": "geojson",
				// "data": this.state.sitios,
				"data": {
					"type": "FeatureCollection",
					"features": this.state.sitios
				}
			});

			this.map.addLayer({
				"id": "markers",
				"type": "symbol",
				"source": "markers",
				"interactive": true,
				"layout": {
					"icon-image": "default_marker",
					// "text-field": "{respuesta}",
					// "text-font": "Open Sans Semibold, Arial Unicode MS Bold",

					// "text-offset": [0, 0.6],
					"text-anchor": "left",
					"text-justy": true,
					"text-optional": true
				},
				"paint": {
					"icon-opacity": 0.05
					// "text-size": 18,
					//  "text-halo-color": "#000",
					//  "text-halo-width": 4,
					//   "text-color": "#fff"
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
						this.setState({ selected: features[0].properties }, this.renderCanvas);
						this.map.flyTo({ center: e.latLng, zoom: 16, pitch: 100 });
					} else {
						this.setState({ selected: null }, this.renderCanvas);
						this.map.flyTo({ center: e.latLng, zoom: 15, pitch: 40 });
					}
				}).bind(this));
			}).bind(this));
		}
	},
	componentDidMount: function componentDidMount() {
		console.log("calling component mount");
		console.log(this.props);
		_superagent2['default'].get('/api/sitios').query({ limit: 50 }).end((function (err, res) {
			console.log(res.body);
			this.initSitios(res.body);
			//this.setState({sitios: res.body}, this.addGeoJSON);
		}).bind(this));
		mapboxgl.accessToken = 'pk.eyJ1Ijoib2oiLCJhIjoiSEw0cDJaNCJ9.9ffK1AU2O26zvS5Zsa6eqw';
		this.map = new mapboxgl.Map({
			container: 'map-fullscreen', // container id
			style: _dataLightV7EditJson2['default'], //stylesheet location
			// style: lightMapStyle,
			center: [this.state.coords.lat, this.state.coords.lng], // starting position
			zoom: 5, // starting zoom
			pitch: 45
		});

		//this.map.rotateTo(100);
		// Add zoom and rotation controls to the map.
		this.map.addControl(new mapboxgl.Navigation({ position: 'top-left' }));
		this.map.on('style.load', (function () {
			this.setState({ mapLoaded: true }, this.addGeoJSON);
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
				}).bind(this));
			}).bind(this), 400);
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
	render: function render() {
		//console.l	<label>{this.props.label}</label>og("rerendering maplocator");
		var info = {};
		if (this.state.selected != null) {
			info = _react2['default'].createElement(_InfoWindow2['default'], { info: this.state.selected });
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

},{"./InfoWindow":11,"./data/light-v7-edit.json":23,"react":"react","superagent":114}],6:[function(require,module,exports){
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

},{"react":"react"}],7:[function(require,module,exports){
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
    if (this.props.updateBarrioList) {
      this.props.updateBarrioList(e.target.value);
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

},{"formsy-react":90,"react":"react"}],8:[function(require,module,exports){
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

},{"formsy-react":90,"react":"react"}],9:[function(require,module,exports){
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
		//when user hasnt touched search box, value is set from props
		return { updateFromProps: true, querystring: this.props.querystring };
	},
	handleSearchChange: function handleSearchChange(e) {
		this.setState({ querystring: e.target.value, updateFromProps: false });
	},

	handleKeyUp: function handleKeyUp(e) {
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
			var query = { query: this.state.querystring, lat: this.props.coords.lat, lng: this.props.coords.lng };
			//console.log(query);
			_superagent2['default'].get('/api/geocode').query(query).end((function (err, res) {
				if (err) {
					//console.log(err);
				} else {
						//console.log(res);
						this.props.updateCoords(res.body);
					}
			}).bind(this));
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

},{"react":"react","superagent":114}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var hex = [{ number: 2, color: '#C1AFD1' }, { number: 4, color: '#D6C9E0' }, { number: 5, color: '#EAE4F0' }, { number: 7, color: '#FFD6E0' }, { number: 8, color: '#FFADC2' }, { number: 9, color: '#FF85A3' }, { number: 7, color: '#FF5C85' }, { number: 6, color: '#FF3366' }, { number: 4, color: '#BF264D' }, { number: 4, color: '#801A33' }];
var hex_radius = 40;
//width: @hex-size; height: (@hex-size * 1.7);
// margin-left: (@hex-size / 1.30);

var HexGrid = _react2['default'].createClass({
  displayName: 'HexGrid',

  getInitialState: function getInitialState() {
    return { hidden: true };
  },
  unfold: function unfold() {
    console.log("unfold");
    var folded = this.state.hidden == true ? false : true;
    this.setState({ hidden: folded });
  },
  render: function render() {

    var key = 0;
    var hexArray = hex.map((function (hex, index) {
      var rowClass = index % 2 == 0 ? "even" : "odd";
      var hexes = [];
      var right = -index % 2 / 2 * hex_radius * 1.732;

      for (var i = 0; i < hex.number; i++) {
        if (!this.state.hidden) right = (i - index % 2 / 2) * hex_radius * 1.732;
        var style = {
          backgroundColor: hex.color,
          top: index * (hex_radius * 3 / 2),
          right: right,
          width: hex_radius, // actual width = sqrt(3)/2 * height
          height: hex_radius * 1.7 // actual height is hex_radius*2
        };
        hexes.push(_react2['default'].createElement('div', { key: key, className: 'hex', style: style }));
        key++;
      }

      return { hexes: hexes };
    }).bind(this));
    console.log(hexArray);
    return _react2['default'].createElement(
      'div',
      { className: 'hex-container', onMouseDown: this.unfold },
      hexArray
    );
  }

});

exports['default'] = HexGrid;
module.exports = exports['default'];

},{"react":"react"}],11:[function(require,module,exports){
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
    console.log(this.props.info);
    return _react2["default"].createElement(
      "div",
      { style: container_style },
      _react2["default"].createElement(
        "h3",
        { style: header_style },
        " EDIFICIO "
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

},{"react":"react"}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Intro = _react2["default"].createClass({
	displayName: "Intro",

	render: function render() {
		return _react2["default"].createElement(
			"div",
			{ onMouseDown: this.props.nextStep },
			_react2["default"].createElement(
				"div",
				{ className: "header" },
				_react2["default"].createElement("img", { src: "./img/logo-complete-01.png" })
			),
			_react2["default"].createElement(
				"div",
				{ className: "container" },
				_react2["default"].createElement(
					"div",
					{ className: "row intro-container" },
					_react2["default"].createElement(
						"h4",
						{ className: "intro-text" },
						"El Observatorio de Saberes Bogotanos ",
						_react2["default"].createElement("br", null),
						" toma vida gracias a usted, a su amor y a sus experiencias vividas como habitante de la ciudad."
					),
					_react2["default"].createElement(
						"button",
						{ className: "button-large" },
						"Entrar"
					)
				)
			)
		);
	}

});

exports["default"] = Intro;
module.exports = exports["default"];

},{"react":"react"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseMap = require('./BaseMap');

var _BaseMap2 = _interopRequireDefault(_BaseMap);

var _HexGrid = require('./HexGrid');

var _HexGrid2 = _interopRequireDefault(_HexGrid);

var _Navigation = require('./Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

var Main = _react2['default'].createClass({
  displayName: 'Main',

  render: function render() {
    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(_BaseMap2['default'], null),
      _react2['default'].createElement(_HexGrid2['default'], null),
      _react2['default'].createElement(_Navigation2['default'], null)
    );
  }

});

exports['default'] = Main;
module.exports = exports['default'];

},{"./BaseMap":5,"./HexGrid":10,"./Navigation":16,"react":"react"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

//import mapboxgl from 'mapbox-gl';

var _Geocode = require('./Geocode');

var _Geocode2 = _interopRequireDefault(_Geocode);

var MapLocator = _react2['default'].createClass({
	displayName: 'MapLocator',

	mixins: [_formsyReact2['default'].Mixin],
	// componentWillReceiveProps(nextProps){
	// 	if(nextProps.location != this.props.location){
	// 		this.map.flyTo({center: [nextProps.location.lat, nextProps.location.lng], zoom: 16});
	// 	}

	// },
	// changeValue: function(lat, lng){
	// 	this.setValue(event.currentTarget.value);
	// },
	updateCoords: function updateCoords(data) {
		//console.log("updating");
		//console.log(data);
		this.setValue({ lat: data.coords.lat, lng: data.coords.lng });
		this.map.flyTo({ center: [data.coords.lat, data.coords.lng], zoom: 16 });
	},
	componentDidMount: function componentDidMount() {
		//console.log("calling component mount");
		//console.log(this.props);
		mapboxgl.accessToken = 'pk.eyJ1Ijoib2oiLCJhIjoiSEw0cDJaNCJ9.9ffK1AU2O26zvS5Zsa6eqw';
		this.map = new mapboxgl.Map({
			container: 'map', // container id
			style: 'https://www.mapbox.com/mapbox-gl-styles/styles/light-v7.json', //stylesheet location
			// style: lightMapStyle,
			center: [this.getValue().lat, this.getValue().lng], // starting position
			zoom: 11 });
		// starting zoom
		// pitch: 45
		this.map.rotateTo(100);
		// Add zoom and rotation controls to the map.
		this.map.addControl(new mapboxgl.Navigation());
		this.map.on('style.load', (function () {
			/*if(this.props.localidadData!=null){
   	this.loadMapData(this.props.localidadData);
   }*/
			//this.loadMapData(LOCALIDAD_DATA);
		}).bind(this));
		this.map.on('move', (function () {
			var coords = this.map.getCenter();
			this.setValue({ lat: coords.lat, lng: coords.lng });
		}).bind(this));
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		//console.log("locator received props");
		//console.log(nextProps);
	},
	render: function render() {
		//console.log("rerendering maplocator");
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
				_react2['default'].createElement(_Geocode2['default'], { coords: this.getValue(), querystring: this.props.direccion, updateCoords: this.updateCoords }),
				_react2['default'].createElement('div', { id: 'block-text' })
			)
		);
	}
});

exports['default'] = MapLocator;
module.exports = exports['default'];

},{"./Geocode":9,"formsy-react":90,"react":"react"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _dataCategoriasJson = require('./data/categorias.json');

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
        this.props.label
      ),
      dropdowns
    );
  }

});
exports['default'] = MultipleDropdown;
module.exports = exports['default'];

},{"./Dropdown":6,"./data/categorias.json":22,"formsy-react":90,"react":"react"}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Navigation = _react2["default"].createClass({
	displayName: "Navigation",

	render: function render() {
		return _react2["default"].createElement(
			"form",
			{ id: "navigator" },
			_react2["default"].createElement("input", { className: "u-full-width", type: "text", placeholder: "Buscar..", id: "exampleEmailInput" }),
			_react2["default"].createElement(
				"select",
				{ className: "u-full-width", id: "localidad" },
				_react2["default"].createElement(
					"option",
					{ value: "Option 1" },
					"Localidad"
				),
				_react2["default"].createElement(
					"option",
					{ value: "Option 2" },
					"Admiration"
				),
				_react2["default"].createElement(
					"option",
					{ value: "Option 3" },
					"Can I get your number?"
				)
			),
			_react2["default"].createElement(
				"select",
				{ className: "u-full-width", id: "barrio" },
				_react2["default"].createElement(
					"option",
					{ value: "Option 1" },
					"Barrio"
				),
				_react2["default"].createElement(
					"option",
					{ value: "Option 2" },
					"BELEN"
				),
				_react2["default"].createElement(
					"option",
					{ value: "Option 3" },
					"7 DE AGOSTO"
				)
			),
			_react2["default"].createElement(
				"select",
				{ className: "u-full-width", id: "barrio" },
				_react2["default"].createElement(
					"option",
					{ value: "Option 1" },
					"Temporalidad"
				),
				_react2["default"].createElement(
					"option",
					{ value: "Option 2" },
					"existe"
				),
				_react2["default"].createElement(
					"option",
					{ value: "Option 3" },
					"ya no existe"
				)
			)
		);
	}

});

exports["default"] = Navigation;
module.exports = exports["default"];

},{"react":"react"}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Words = require('./Words');

var _Words2 = _interopRequireDefault(_Words);

var _Pregunta = require('./Pregunta');

var _Pregunta2 = _interopRequireDefault(_Pregunta);

//TODO: send this from server
var fieldValues = {
  respuesta: null,
  ubicacion: { localidad: null, barrio: null, direccion: null },
  temporalidad: null,
  porque: null,
  categoria: null,
  existente: true
};

var PatrimonioForm = _react2['default'].createClass({
  displayName: 'PatrimonioForm',

  getInitialState: function getInitialState() {
    return {
      step: 0
    };
  },
  nextStep: function nextStep() {
    this.setState({
      step: this.state.step + 1
    });
  },

  previousStep: function previousStep() {
    this.setState({
      step: this.state.step - 1
    });
  },

  saveValues: function saveValues(field_value) {
    return (function () {
      fieldValues = Object.assign({}, fieldValues, field_value);
    }).bind(this)();
  },
  render: function render() {
    switch (this.state.step) {
      case 0:
        return _react2['default'].createElement(_Words2['default'], { nextStep: this.nextStep });
      case 1:
        return _react2['default'].createElement(_Pregunta2['default'], { fieldValues: fieldValues,
          saveValues: this.saveValues,
          nextStep: this.nextStep });
    }
  }
});

exports['default'] = PatrimonioForm;
module.exports = exports['default'];

},{"./Pregunta":18,"./Words":21,"react":"react"}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var preguntas = ["¿Qué conservaría usted de su barrio?", "¿Qué mostraría usted de su barrio?", "¿Qué vale la pena conocer de su barrio?", "¿Para usted, qué es imprescindible de su barrio?"];

var Pregunta = _react2["default"].createClass({
  displayName: "Pregunta",

  render: function render() {
    var rand = Math.floor(Math.random() * preguntas.length);
    return _react2["default"].createElement(
      "div",
      null,
      _react2["default"].createElement(
        "h1",
        null,
        preguntas[rand]
      ),
      _react2["default"].createElement(
        "label",
        null,
        "Respuesta"
      ),
      _react2["default"].createElement("input", { className: "u-full-width", type: "text", ref: "respuesta", defaultValue: this.props.fieldValues.respuesta }),
      _react2["default"].createElement(
        "label",
        { "for": "Porque" },
        "¿Por qué?"
      ),
      _react2["default"].createElement("textarea", { className: "u-full-width", placeholder: "Por que...", id: "Descripcion" }),
      _react2["default"].createElement(
        "label",
        null,
        "Temporalidad"
      ),
      _react2["default"].createElement(
        "label",
        { className: "temporalidad" },
        _react2["default"].createElement("input", { type: "checkbox" }),
        _react2["default"].createElement(
          "span",
          { className: "label-body" },
          "Existe"
        ),
        _react2["default"].createElement("input", { type: "checkbox" }),
        _react2["default"].createElement(
          "span",
          { className: "label-body" },
          "Ya no existe"
        )
      ),
      _react2["default"].createElement(
        "button",
        { className: "button-primary", onClick: this.saveAndContinue },
        "Guardar y Continuar"
      )
    );
  },

  saveAndContinue: function saveAndContinue(e) {
    e.preventDefault();

    // Get values via this.refs
    var data = {
      respuesta: this.refs.respuesta.getDOMNode().value
    };

    this.props.saveValues(data);
    this.props.nextStep();
  }
});

exports["default"] = Pregunta;
module.exports = exports["default"];

},{"react":"react"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseMap = require('./BaseMap');

var _BaseMap2 = _interopRequireDefault(_BaseMap);

var Projeccion = _react2['default'].createClass({
  displayName: 'Projeccion',

  render: function render() {
    return _react2['default'].createElement(_BaseMap2['default'], null);
  }
});

exports['default'] = Projeccion;
module.exports = exports['default'];

},{"./BaseMap":5,"react":"react"}],20:[function(require,module,exports){
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

},{"./Intro":12,"./Main":13,"react":"react"}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTapEventPlugin = require("react-tap-event-plugin");

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

(0, _reactTapEventPlugin2['default'])();
var list = [['metropolitano', 12], ['viviendas', 2], ['espacios', 6], ['urbanos', 6], ['humedales', 6], ['arte', 10], ['barrio', 6], ['ambulante', 4], ['iglesias', 6], ['verdes', 30], ['orientales', 30], ['comercial', 30], ['reservas', 30], ['pasaje', 30], ['obras', 30], ['almacén', 30], ['infantil', 30], ['quebradas', 30], ['alaedas', 30], ['bolsillo', 30], ['parques', 30], ['fábrica', 30], ['edificios', 30], ['conjunto', 30], ['imprenta', 30], ['academia', 30], ['canales', 30], ['arborizado', 30], ['formal', 30], ['almacen', 30], ['rios', 30], ['centro', 30], ['público', 30], ['zonal', 30], ['educación', 30], ['almacen', 30], ['barrio', 30], ['colegio', 30], ['taller', 30], ['vecinal', 30], ['ambulante', 30], ['conjuntos', 30], ['cerros', 30], ['jardín', 30], ['y/o', 30], ['corredores', 30], ['instituto', 30], ['forestales', 30], ['personajes', 30], ['viales', 30], ['públicos', 30], ['zonas', 30]];

var Words = _react2['default'].createClass({
  displayName: 'Words',

  getInitialState: function getInitialState() {
    return {
      width: 100,
      height: 100
    };
  },
  componentDidMount: function componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    }, function () {
      for (var i = 0; i < list.length; i++) {
        list[i][1] = Math.floor(Math.random() * 30) + 8;
      }
      console.log(this.refs.canvas.getDOMNode());
      WordCloud(document.getElementById('canvas'), { list: list, fontFamily: 'monospace', color: 'white', weightFactor: 2, backgroundColor: 'black', wait: 200, gridSize: 10, rotateRatio: 0.25 });
    });
  },
  render: function render() {

    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement('canvas', { id: 'canvas', ref: 'canvas', width: this.state.width, height: this.state.height, onTouchTap: this.props.nextStep, onMouseDown: this.props.nextStep })
    );
  }
});

exports['default'] = Words;
module.exports = exports['default'];

},{"react":"react","react-tap-event-plugin":96}],22:[function(require,module,exports){
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
},{}],23:[function(require,module,exports){
module.exports={
  "version": 7,
  "name": "Light",
  "constants": {
    "@road-motorway-width": {
      "base": 1,
      "stops": [[3, 0.5], [9, 1.25], [20, 10]]
    },
    "@road-width-minor": {
      "base": 1,
      "stops": [[14, 0.5], [18, 12]]
    },
    "@sans_md": "DIN Offc Pro Medium, Arial Unicode MS Bold",
    "@admin-2-boundary": {
      "base": 1,
      "stops": [[3, 0.5], [10, 2]]
    },
    "@snow": "#fff",
    "@label-park": "#4f4f4f",
    "@road-major-width": {
      "base": 1.4,
      "stops": [[6, 0.5], [20, 30]]
    },
    "@color-1": {
      "base": 1,
      "stops": [[0, "#393939"], [20, "#393939"]]
    },
    "@road-minor": "#efefef",
    "@road-street-width": {
      "base": 1.55,
      "stops": [[4, 0.25], [20, 20]]
    },
    "@rail-track-width": {
      "base": 1.5,
      "stops": [[14, 4], [20, 8]]
    },
    "@building-outline": "#c0c0c0",
    "@park": "#e4e4e4",
    "@rail-width": {
      "base": 1.5,
      "stops": [[14, 0.5], [20, 1]]
    },
    "@land": "#eee",
    "@name": "{name_en}",
    "@road-major": "#fff",
    "@wood": "#dcdcdc",
    "@number-2": {
      "base": 1.5,
      "stops": [[12.5, 0.3], [14, 2], [18, 18]]
    },
    "@sans_bd": "DIN Offc Pro Bold, Arial Unicode MS Bold",
    "@scrub": "#e3e3e3",
    "@crop": "#ececec",
    "@label-waterway": "#929292",
    "@road-high-z-fadein": {
      "base": 1,
      "stops": [[5, 0], [5.5, 1]]
    },
    "@sans": "DIN Offc Pro Regular, Arial Unicode MS Regular",
    "@motorway-width": {
      "base": 1.5,
      "stops": [[5, 0.75], [18, 32]]
    },
    "@label": "#666",
    "@label-halo": "#fff",
    "@grass": "#e5e5e5",
    "@water": "#d6d6d6",
    "@state-label": {
      "base": 1,
      "stops": [[0, "#929292"], [20, "#929292"]]
    },
    "@label-road": "#929292",
    "@label-secondary": "#5a5a5a",
    "@building-fill": "#cbcbcb",
    "@street-width": {
      "base": 1.5,
      "stops": [[12.5, 0.5], [14, 2], [18, 18]]
    },
    "@path-width": {
      "base": 1.5,
      "stops": [[15, 1], [18, 4]]
    },
    "@road-main-width": {
      "base": 1.5,
      "stops": [[6, 0.5], [18, 26]]
    }
  },
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
  "sprite": "https://www.mapbox.com/mapbox-gl-styles/sprites/light",
  "glyphs": "mapbox://fontstack/{fontstack}/{range}.pbf",
  "layers": [{
    "id": "background",
    "type": "background",
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "background-color": "@land"
    }
  }, {
    "id": "landcover_snow",
    "type": "fill",
    "source": "mapbox://mapbox.mapbox-terrain-v2",
    "source-layer": "landcover",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "class", "snow"]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "@snow",
      "fill-opacity": 0.5
    }
  }, {
    "id": "landcover_crop",
    "type": "fill",
    "source": "mapbox://mapbox.mapbox-terrain-v2",
    "source-layer": "landcover",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "class", "crop"]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "@crop",
      "fill-opacity": 0.5
    }
  }, {
    "id": "landcover_grass",
    "type": "fill",
    "source": "mapbox://mapbox.mapbox-terrain-v2",
    "source-layer": "landcover",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "class", "grass"]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "@grass",
      "fill-opacity": 0.5
    }
  }, {
    "id": "landcover_scrub",
    "type": "fill",
    "source": "mapbox://mapbox.mapbox-terrain-v2",
    "source-layer": "landcover",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "class", "scrub"]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "@scrub",
      "fill-opacity": 0.5
    }
  }, {
    "id": "landcover_wood",
    "type": "fill",
    "source": "mapbox://mapbox.mapbox-terrain-v2",
    "source-layer": "landcover",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "class", "wood"]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "@wood",
      "fill-opacity": 0.5
    }
  }, {
    "id": "landuse_industrial",
    "type": "fill",
    "source": "mapbox",
    "source-layer": "landuse",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "class", "industrial"], ["==", "$type", "Polygon"]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "#fff",
      "fill-opacity": 0.5
    }
  }, {
    "id": "landuse_park",
    "type": "fill",
    "source": "mapbox",
    "source-layer": "landuse",
    "filter": ["all", ["==", "class", "park"]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "@park"
    }
  }, {
    "id": "landuse_wood",
    "type": "fill",
    "source": "mapbox",
    "source-layer": "landuse",
    "filter": ["all", ["==", "class", "wood"]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "#e0e0e0"
    }
  }, {
    "id": "hillshade_highlight_bright",
    "type": "fill",
    "source": "mapbox://mapbox.mapbox-terrain-v2",
    "source-layer": "hillshade",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "level", 94]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "#fff",
      "fill-opacity": {
        "base": 1,
        "stops": [[15, 0.15], [17, 0.05]]
      }
    }
  }, {
    "id": "hillshade_highlight_med",
    "type": "fill",
    "source": "mapbox://mapbox.mapbox-terrain-v2",
    "source-layer": "hillshade",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "level", 90]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "#fff",
      "fill-opacity": {
        "base": 1,
        "stops": [[15, 0.15], [17, 0.05]]
      }
    }
  }, {
    "id": "hillshade_shadow_faint",
    "type": "fill",
    "source": "mapbox://mapbox.mapbox-terrain-v2",
    "source-layer": "hillshade",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "level", 89]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "#666",
      "fill-opacity": {
        "base": 1,
        "stops": [[14, 0.06], [17, 0.01]]
      }
    }
  }, {
    "id": "hillshade_shadow_med",
    "type": "fill",
    "source": "mapbox://mapbox.mapbox-terrain-v2",
    "source-layer": "hillshade",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "level", 78]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "#666",
      "fill-opacity": {
        "base": 1,
        "stops": [[14, 0.06], [17, 0.01]]
      }
    }
  }, {
    "id": "hillshade_shadow_dark",
    "type": "fill",
    "source": "mapbox://mapbox.mapbox-terrain-v2",
    "source-layer": "hillshade",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "level", 67]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "#888888",
      "fill-opacity": {
        "base": 1,
        "stops": [[14, 0.06], [17, 0.01]]
      }
    }
  }, {
    "id": "hillshade_shadow_extreme",
    "type": "fill",
    "source": "mapbox://mapbox.mapbox-terrain-v2",
    "source-layer": "hillshade",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "level", 56]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "#999",
      "fill-opacity": {
        "base": 1,
        "stops": [[14, 0.06], [17, 0.01]]
      }
    }
  }, {
    "id": "building",
    "type": "fill",
    "source": "mapbox",
    "source-layer": "building",
    "minzoom": 15,
    "paint": {
      "fill-outline-color": "@building-outline",
      "fill-opacity": {
        "base": 1,
        "stops": [[15, 0], [16.5, 1]]
      },
      "fill-antialias": true,
      "fill-color": "@building-fill"
    }
  }, {
    "id": "waterway",
    "type": "line",
    "source": "mapbox",
    "source-layer": "waterway",
    "filter": ["all", ["==", "$type", "LineString"], ["in", "class", "river", "canal"]],
    "paint": {
      "line-color": "@water",
      "line-width": {
        "base": 1,
        "stops": [[6, 0.25], [20, 6]]
      }
    }
  }, {
    "id": "waterway_stream",
    "type": "line",
    "source": "mapbox",
    "source-layer": "waterway",
    "filter": ["all", ["==", "$type", "LineString"], ["in", "class", "stream"]],
    "paint": {
      "line-color": "@water",
      "line-width": {
        "base": 1,
        "stops": [[13, 0.75], [20, 4]]
      }
    }
  }, {
    "id": "water",
    "type": "fill",
    "source": "mapbox",
    "source-layer": "water",
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "fill-color": "@water"
    }
  }, {
    "id": "aeroway_runway",
    "type": "line",
    "source": "mapbox",
    "source-layer": "aeroway",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "$type", "LineString"], ["==", "type", "runway"]],
    "layout": {
      "line-join": "miter",
      "visibility": "visible"
    },
    "paint": {
      "line-width": {
        "base": 1.15,
        "stops": [[11, 3], [20, 32]]
      },
      "line-color": "#fff",
      "line-opacity": {
        "base": 1,
        "stops": [[9, 0.5], [11, 1]]
      }
    }
  }, {
    "id": "aeroway_taxiway",
    "type": "line",
    "source": "mapbox",
    "source-layer": "aeroway",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "$type", "LineString"], ["==", "type", "taxiway"]],
    "layout": {
      "line-join": "miter"
    },
    "paint": {
      "line-width": {
        "base": 1.15,
        "stops": [[10, 0.25], [11, 1], [20, 8]]
      },
      "line-color": "#fff"
    }
  }, {
    "id": "tunnel_minor",
    "type": "line",
    "source": "mapbox",
    "source-layer": "tunnel",
    "filter": ["all", ["==", "$type", "LineString"], ["in", "class", "motorway_link", "street", "street_limited", "service", "driveway", "path"]],
    "paint": {
      "line-color": "@road-minor",
      "line-width": "@road-street-width",
      "line-dasharray": [0.36, 0.18]
    }
  }, {
    "id": "tunnel_major",
    "type": "line",
    "source": "mapbox",
    "source-layer": "tunnel",
    "filter": ["all", ["==", "$type", "LineString"], ["in", "class", "motorway", "main"]],
    "paint": {
      "line-color": "@road-major",
      "line-width": "@road-major-width",
      "line-dasharray": [0.28, 0.14]
    }
  }, {
    "id": "road-path",
    "type": "line",
    "source": "mapbox",
    "source-layer": "road",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "class", "path"]],
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": {
        "base": 1,
        "stops": [[15, 1], [18, 4]]
      }
    }
  }, {
    "id": "road-street-low-zoom",
    "type": "line",
    "source": "mapbox",
    "source-layer": "road",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["in", "class", "street", "street_limited"], ["==", "$type", "LineString"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@street-width",
      "line-opacity": {
        "base": 1,
        "stops": [[11.5, 0], [12, 1]]
      }
    }
  }, {
    "id": "road-service-driveway",
    "type": "line",
    "source": "mapbox",
    "source-layer": "road",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["in", "class", "service", "driveway"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@road-width-minor"
    }
  }, {
    "id": "road-motorway_link",
    "type": "line",
    "source": "mapbox",
    "source-layer": "road",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["in", "class", "motorway_link"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@street-width"
    }
  }, {
    "id": "road-street_limited",
    "type": "line",
    "source": "mapbox",
    "source-layer": "road",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "class", "street_limited"], ["==", "$type", "LineString"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@street-width"
    }
  }, {
    "id": "road-street",
    "type": "line",
    "source": "mapbox",
    "source-layer": "road",
    "minzoom": 14,
    "maxzoom": 22,
    "filter": ["all", ["in", "class", "street"], ["==", "$type", "LineString"]],
    "layout": {
      "line-cap": "round",
      "line-join": "round",
      "visibility": "visible"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@number-2",
      "line-opacity": 1
    }
  }, {
    "id": "road-main",
    "type": "line",
    "source": "mapbox",
    "source-layer": "road",
    "filter": ["all", ["==", "$type", "LineString"], ["in", "class", "main"]],
    "layout": {
      "line-cap": "round",
      "line-join": "round",
      "visibility": "visible"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@road-main-width",
      "line-opacity": "@road-high-z-fadein"
    }
  }, {
    "id": "road-trunk",
    "type": "line",
    "source": "mapbox",
    "source-layer": "road",
    "filter": ["all", ["in", "class", "main"], ["==", "type", "trunk"]],
    "layout": {
      "line-cap": "round",
      "line-join": "round",
      "visibility": "visible"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@motorway-width",
      "line-opacity": 1
    }
  }, {
    "id": "road-motorway",
    "type": "line",
    "source": "mapbox",
    "source-layer": "road",
    "minzoom": 0,
    "filter": ["all", ["in", "class", "motorway"]],
    "layout": {
      "line-cap": "round",
      "line-join": "round",
      "visibility": "visible"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@motorway-width",
      "line-opacity": "@road-high-z-fadein"
    }
  }, {
    "id": "road-rail",
    "type": "line",
    "source": "mapbox",
    "source-layer": "road",
    "minzoom": 13,
    "filter": ["all", ["in", "class", "major_rail", "minor_rail"]],
    "layout": {
      "line-cap": "round",
      "line-join": "round",
      "visibility": "visible"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@rail-width",
      "line-opacity": 1
    }
  }, {
    "id": "road-rail-tracks",
    "type": "line",
    "source": "mapbox",
    "source-layer": "road",
    "minzoom": 13,
    "filter": ["all", ["in", "class", "major_rail", "minor_rail"]],
    "layout": {
      "line-cap": "butt",
      "line-join": "miter",
      "visibility": "visible"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@rail-track-width",
      "line-opacity": 1
    }
  }, {
    "id": "bridge_minor_case",
    "type": "line",
    "source": "mapbox",
    "source-layer": "bridge",
    "filter": ["all", ["==", "$type", "LineString"], ["in", "class", "motorway_link", "street", "street_limited", "service", "driveway", "path"]],
    "paint": {
      "line-color": "@land",
      "line-width": {
        "base": 1.6,
        "stops": [[12, 0.5], [20, 10]]
      },
      "line-gap-width": "@road-street-width"
    }
  }, {
    "id": "bridge-path",
    "type": "line",
    "source": "mapbox",
    "source-layer": "bridge",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "class", "path"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "@road-minor",
      "line-width": "@path-width"
    }
  }, {
    "id": "bridge-street-low-zoom",
    "type": "line",
    "source": "mapbox",
    "source-layer": "bridge",
    "minzoom": 11,
    "maxzoom": 14.1,
    "filter": ["all", ["in", "class", "street", "street_limited"], ["==", "$type", "LineString"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "@road-minor",
      "line-width": "@street-width",
      "line-opacity": {
        "base": 1,
        "stops": [[11.5, 0], [12, 1]]
      }
    }
  }, {
    "id": "bridge-motorway_link",
    "type": "line",
    "source": "mapbox",
    "source-layer": "bridge",
    "minzoom": 10,
    "maxzoom": 22,
    "filter": ["all", ["in", "class", "motorway_link"], ["==", "$type", "LineString"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@street-width",
      "line-opacity": 1
    }
  }, {
    "id": "bridge-street_limited",
    "type": "line",
    "source": "mapbox",
    "source-layer": "bridge",
    "minzoom": 14,
    "maxzoom": 22,
    "filter": ["all", ["in", "class", "street_limited"], ["==", "$type", "LineString"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@street-width",
      "line-opacity": 1
    }
  }, {
    "id": "bridge-street",
    "type": "line",
    "source": "mapbox",
    "source-layer": "bridge",
    "minzoom": 14,
    "maxzoom": 22,
    "filter": ["all", ["in", "class", "street"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@street-width",
      "line-opacity": 1
    }
  }, {
    "id": "bridge-main",
    "type": "line",
    "source": "mapbox",
    "source-layer": "bridge",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["in", "class", "main"], ["!=", "type", "trunk"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@road-main-width",
      "line-opacity": "@road-high-z-fadein"
    }
  }, {
    "id": "bridge-trunk",
    "type": "line",
    "source": "mapbox",
    "source-layer": "bridge",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["in", "class", "main"], ["==", "type", "trunk"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@road-motorway-width",
      "line-opacity": 1
    }
  }, {
    "id": "bridge-motorway",
    "type": "line",
    "source": "mapbox",
    "source-layer": "bridge",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["in", "class", "motorway"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@road-motorway-width",
      "line-opacity": 1
    }
  }, {
    "id": "bridge-rail",
    "type": "line",
    "source": "mapbox",
    "source-layer": "bridge",
    "minzoom": 13,
    "maxzoom": 22,
    "filter": ["all", ["in", "class", "major_rail", "minor_rail"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "butt",
      "line-join": "miter",
      "line-round-limit": 2
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@rail-width",
      "line-opacity": 1
    }
  }, {
    "id": "bridge-rail-tracks",
    "type": "line",
    "source": "mapbox",
    "source-layer": "bridge",
    "minzoom": 14,
    "maxzoom": 22,
    "filter": ["all", ["in", "class", "major_rail", "minor_rail"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "butt",
      "line-join": "miter",
      "line-round-limit": 2
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@rail-track-width",
      "line-opacity": 1
    }
  }, {
    "id": "bridge-rail-tracks_copy",
    "type": "line",
    "source": "mapbox",
    "source-layer": "bridge",
    "minzoom": 14,
    "maxzoom": 22,
    "filter": ["all", ["in", "class", "aerialway"]],
    "layout": {
      "visibility": "visible",
      "line-cap": "butt",
      "line-join": "miter",
      "line-round-limit": 2
    },
    "paint": {
      "line-color": "@road-major",
      "line-width": "@rail-width",
      "line-opacity": 1
    }
  }, {
    "id": "admin-3-4-boundaries-bg",
    "type": "line",
    "source": "mapbox",
    "source-layer": "admin",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", [">=", "admin_level", 3], ["==", "maritime", 0]],
    "layout": {
      "visibility": "visible",
      "line-join": "bevel"
    },
    "paint": {
      "line-width": {
        "base": 1,
        "stops": [[3, 3.5], [12, 6]]
      },
      "line-opacity": {
        "base": 1,
        "stops": [[2, 0], [5, 0.75]]
      },
      "line-color": "#fff"
    }
  }, {
    "id": "admin-2-boundaries-bg",
    "type": "line",
    "source": "mapbox",
    "source-layer": "admin",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "admin_level", 2], ["==", "maritime", 0], ["==", "disputed", 2]],
    "layout": {
      "visibility": "visible",
      "line-join": "miter"
    },
    "paint": {
      "line-color": "#fff",
      "line-opacity": {
        "base": 1,
        "stops": [[3, 0], [4, 0.75]]
      },
      "line-width": {
        "base": 1,
        "stops": [[2, 3.5], [10, 10]]
      }
    }
  }, {
    "id": "admin-3-4-boundaries",
    "type": "line",
    "source": "mapbox",
    "source-layer": "admin",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", [">=", "admin_level", 3], ["==", "maritime", 0]],
    "layout": {
      "visibility": "visible",
      "line-join": "miter"
    },
    "paint": {
      "line-color": "#b5b5b5",
      "line-opacity": {
        "base": 1,
        "stops": [[2, 0], [3, 1]]
      },
      "line-width": {
        "base": 1,
        "stops": [[3, 0.5], [12, 2]]
      },
      "line-dasharray": {
        "base": 1,
        "stops": [[4, [2, 0]], [5, [2, 2, 6, 2]]]
      }
    }
  }, {
    "id": "admin-2-boundaries",
    "type": "line",
    "source": "mapbox",
    "source-layer": "admin",
    "minzoom": 1,
    "maxzoom": 22,
    "filter": ["all", ["==", "admin_level", 2], ["==", "maritime", 0], ["==", "disputed", 0]],
    "layout": {
      "visibility": "visible",
      "line-join": "round",
      "line-cap": "round"
    },
    "paint": {
      "line-color": "#c0c0c0",
      "line-opacity": 1,
      "line-width": "@admin-2-boundary"
    }
  }, {
    "id": "country-label-lg",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "country_label",
    "maxzoom": 12,
    "filter": ["all", ["in", "scalerank", 1, 2]],
    "layout": {
      "text-field": "@name",
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Regular",
      "text-max-size": 18,
      "text-max-width": 6
    },
    "paint": {
      "text-color": {
        "base": 1,
        "stops": [[0, "#444"], [10, "#888"]]
      },
      "text-halo-color": "@label-halo",
      "text-halo-width": 1,
      "text-halo-blur": 1,
      "text-size": {
        "stops": [[1, 9], [5, 18]],
        "base": 0.9
      }
    }
  }, {
    "id": "country-label-md",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "country_label",
    "minzoom": 1,
    "maxzoom": 8,
    "filter": ["all", ["in", "scalerank", 3, 4]],
    "layout": {
      "text-field": {
        "base": 1,
        "stops": [[0, "{code}"], [2, "{name_en}"]]
      },
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Regular",
      "text-max-size": 18,
      "text-max-width": 7
    },
    "paint": {
      "text-color": {
        "base": 1,
        "stops": [[0, "#444"], [10, "#888"]]
      },
      "text-halo-color": "@label-halo",
      "text-halo-width": 1,
      "text-halo-blur": 1,
      "text-size": {
        "stops": [[2, 8], [7, 18]],
        "base": 0.9
      }
    }
  }, {
    "id": "country-label-sm",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "country_label",
    "minzoom": 1,
    "maxzoom": 10,
    "filter": ["all", [">=", "scalerank", 5]],
    "layout": {
      "text-field": "{name_en}",
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Regular",
      "text-max-size": 18,
      "text-max-width": 7
    },
    "paint": {
      "text-color": {
        "base": 1,
        "stops": [[0, "#444"], [10, "#888"]]
      },
      "text-halo-color": "@label-halo",
      "text-halo-width": 1,
      "text-halo-blur": 1,
      "text-size": {
        "stops": [[3, 8], [9, 18]],
        "base": 0.9
      }
    }
  }, {
    "id": "state-label-lg",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "state_label",
    "minzoom": 3,
    "maxzoom": 7,
    "filter": ["all", [">=", "area", 80000]],
    "layout": {
      "text-transform": "uppercase",
      "visibility": "visible",
      "text-field": {
        "base": 1,
        "stops": [[0, "{abbr}"], [4, "{name_en}"]]
      },
      "text-font": "DIN Offc Pro Bold, Arial Unicode MS Regular",
      "text-max-size": 10,
      "text-letter-spacing": 0.15,
      "text-max-width": 7
    },
    "paint": {
      "text-color": "@state-label",
      "text-size": {
        "base": 1,
        "stops": [[4, 9], [7, 18]]
      }
    }
  }, {
    "id": "marine_label_line_1",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "marine_label",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "$type", "LineString"], ["==", "labelrank", 1]],
    "layout": {
      "text-max-width": 15,
      "visibility": "visible",
      "symbol-placement": "line",
      "text-field": "@name",
      "text-max-size": 30,
      "text-line-height": 1.2,
      "text-letter-spacing": 0.4,
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Regular"
    },
    "paint": {
      "text-color": "@label",
      "text-size": {
        "base": 1,
        "stops": [[3, 25], [4, 30]]
      },
      "text-opacity": 0.25
    }
  }, {
    "id": "marine_label_line_2",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "marine_label",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "$type", "LineString"], ["==", "labelrank", 2]],
    "layout": {
      "text-max-width": 15,
      "visibility": "visible",
      "symbol-placement": "line",
      "text-field": "@name",
      "text-max-size": 24,
      "text-line-height": 1.2,
      "text-letter-spacing": 0,
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Regular"
    },
    "paint": {
      "text-color": "@label",
      "text-size": {
        "base": 1,
        "stops": [[3, 14], [5, 24]]
      },
      "text-opacity": 0.25
    }
  }, {
    "id": "marine_label_line_3",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "marine_label",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "$type", "LineString"], ["==", "labelrank", 3]],
    "layout": {
      "text-max-width": 15,
      "visibility": "visible",
      "symbol-placement": "line",
      "text-field": "@name",
      "text-max-size": 18,
      "text-line-height": 1.2,
      "text-letter-spacing": 0,
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Regular"
    },
    "paint": {
      "text-color": "@label",
      "text-size": {
        "base": 1,
        "stops": [[3, 13], [5, 18]]
      },
      "text-opacity": 0.25
    }
  }, {
    "id": "marine_label_line_other",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "marine_label",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "$type", "LineString"], ["in", "labelrank", 4, 5, 6]],
    "layout": {
      "text-max-width": 15,
      "visibility": "visible",
      "symbol-placement": "line",
      "text-field": "@name",
      "text-max-size": 16,
      "text-line-height": 1.2,
      "text-letter-spacing": 0,
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Regular"
    },
    "paint": {
      "text-color": "@label",
      "text-size": {
        "base": 1,
        "stops": [[4, 12], [6, 16]]
      },
      "text-opacity": 0.25
    }
  }, {
    "id": "marine_label_point_1",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "marine_label",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "$type", "Point"], ["==", "labelrank", 1]],
    "layout": {
      "text-max-width": 4,
      "visibility": "visible",
      "symbol-placement": "point",
      "text-field": "@name",
      "text-max-size": 30,
      "text-line-height": 1.5,
      "text-letter-spacing": 0.25,
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Regular"
    },
    "paint": {
      "text-color": "@label",
      "text-size": {
        "base": 1,
        "stops": [[1, 12], [4, 30]]
      },
      "text-opacity": 0.25
    }
  }, {
    "id": "marine_label_point_2",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "marine_label",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "$type", "Point"], ["==", "labelrank", 2]],
    "layout": {
      "text-max-width": 8,
      "visibility": "visible",
      "symbol-placement": "point",
      "text-field": "@name",
      "text-max-size": 24,
      "text-line-height": 1.2,
      "text-letter-spacing": 0,
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Regular"
    },
    "paint": {
      "text-color": "@label",
      "text-size": {
        "base": 1,
        "stops": [[3, 14], [5, 24]]
      },
      "text-opacity": 0.25
    }
  }, {
    "id": "marine_label_point_3",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "marine_label",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "$type", "Point"], ["==", "labelrank", 3]],
    "layout": {
      "text-max-width": 8,
      "visibility": "visible",
      "symbol-placement": "point",
      "text-field": "@name",
      "text-max-size": 18,
      "text-line-height": 1.3,
      "text-letter-spacing": 0.1,
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Regular"
    },
    "paint": {
      "text-color": "@label",
      "text-size": {
        "base": 1,
        "stops": [[3, 13], [5, 18]]
      },
      "text-opacity": 0.25
    }
  }, {
    "id": "marine_label_point_other",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "marine_label",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "$type", "Point"], ["in", "labelrank", 4, 5, 6]],
    "layout": {
      "text-max-width": 8,
      "visibility": "none",
      "symbol-placement": "point",
      "text-field": "@name",
      "text-max-size": 16,
      "text-line-height": 1.2,
      "text-letter-spacing": 0.1,
      "text-font": "DIN Offc Pro Regular, Arial Unicode MS Regular"
    },
    "paint": {
      "text-color": "@label",
      "text-size": {
        "base": 1,
        "stops": [[4, 12], [6, 16]]
      }
    }
  }, {
    "id": "place_label_city_large_n",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "place_label",
    "maxzoom": 16,
    "filter": ["all", ["<=", "scalerank", 1], ["in", "ldir", "N", "NE", "NW", "W"], ["==", "type", "city"]],
    "layout": {
      "text-field": "@name",
      "text-font": "@sans_bd",
      "text-max-width": 5,
      "text-max-size": 20,
      "text-transform": "none",
      "text-anchor": {
        "base": 1,
        "stops": [[0, "bottom"], [6, "center"]]
      },
      "text-offset": {
        "base": 1,
        "stops": [[0, [0, -0.2]], [6, [0, 0]]]
      },
      "symbol-avoid-edges": false
    },
    "paint": {
      "text-color": "@label",
      "text-halo-color": "@label-halo",
      "text-halo-width": 1.5,
      "text-halo-blur": 0,
      "text-size": {
        "stops": [[4, 11], [10, 20]],
        "base": 0.9
      }
    }
  }, {
    "id": "place_label_city_large_s",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "place_label",
    "maxzoom": 16,
    "filter": ["all", ["==", "type", "city"], ["<=", "scalerank", 1], ["in", "ldir", "S", "SE", "SW", "E"]],
    "layout": {
      "text-field": "@name",
      "text-font": "@sans_bd",
      "text-max-width": 15,
      "text-max-size": 20,
      "text-transform": "none",
      "text-anchor": {
        "base": 1,
        "stops": [[0, "top"], [6, "center"]]
      },
      "text-offset": {
        "base": 1,
        "stops": [[0, [0, 0.1]], [6, [0, 0]]]
      }
    },
    "paint": {
      "text-color": "@label",
      "text-halo-color": "@label-halo",
      "text-halo-width": 1.5,
      "text-halo-blur": 0,
      "text-size": {
        "stops": [[4, 11], [10, 20]],
        "base": 0.9
      }
    }
  }, {
    "id": "place_label_city_medium_n",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "place_label",
    "maxzoom": 16,
    "filter": ["all", ["==", "type", "city"], ["<=", "scalerank", 4], [">", "scalerank", 1], ["in", "ldir", "N", "W", "NW", "NE"]],
    "layout": {
      "text-field": "@name",
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Bold",
      "text-max-width": 10,
      "text-max-size": 19,
      "text-anchor": {
        "base": 1,
        "stops": [[0, "bottom"], [6, "center"]]
      },
      "text-offset": {
        "base": 1,
        "stops": [[0, [0, -0.2]], [6, [0, 0]]]
      }
    },
    "paint": {
      "text-color": "@label",
      "text-halo-color": "@label-halo",
      "text-halo-width": 1.5,
      "text-halo-blur": 0,
      "text-size": {
        "stops": [[5, 11], [12, 19]],
        "base": 0.9
      }
    }
  }, {
    "id": "place_label_city_medium_s",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "place_label",
    "maxzoom": 16,
    "filter": ["all", ["==", "type", "city"], ["<=", "scalerank", 4], [">", "scalerank", 1], ["in", "ldir", "S", "E", "SE", "SW"]],
    "layout": {
      "text-field": "@name",
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Bold",
      "text-max-width": 10,
      "text-max-size": 19,
      "text-anchor": {
        "base": 1,
        "stops": [[0, "top"], [6, "center"]]
      },
      "text-offset": {
        "base": 1,
        "stops": [[0, [0, 0.1]], [6, [0, 0]]]
      }
    },
    "paint": {
      "text-color": "@label",
      "text-halo-color": "@label-halo",
      "text-halo-width": 1.5,
      "text-halo-blur": 0,
      "text-size": {
        "stops": [[5, 11], [12, 19]],
        "base": 0.9
      }
    }
  }, {
    "id": "place_label_city_small_n",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "place_label",
    "maxzoom": 16,
    "filter": ["all", ["==", "type", "city"], [">", "scalerank", 4], ["in", "ldir", "N", "W", "NW", "NE"]],
    "layout": {
      "text-field": "@name",
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Bold",
      "text-max-width": 10,
      "text-max-size": 19,
      "text-anchor": {
        "base": 1,
        "stops": [[0, "bottom"], [6, "center"]]
      },
      "text-offset": {
        "base": 1,
        "stops": [[0, [0, -0.2]], [6, [0, 0]]]
      }
    },
    "paint": {
      "text-color": "@label",
      "text-halo-color": "@label-halo",
      "text-halo-width": 1.5,
      "text-halo-blur": 0,
      "text-size": {
        "stops": [[6, 11], [14, 19]]
      }
    }
  }, {
    "id": "place_label_city_small_s",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "place_label",
    "maxzoom": 16,
    "filter": ["all", ["==", "type", "city"], [">", "scalerank", 4], ["in", "ldir", "S", "E", "SE", "SW"]],
    "layout": {
      "text-field": "@name",
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Bold",
      "text-max-width": 10,
      "text-max-size": 19,
      "text-anchor": {
        "base": 1,
        "stops": [[0, "top"], [6, "center"]]
      },
      "text-offset": {
        "base": 1,
        "stops": [[0, [0, 0.1]], [6, [0, 0]]]
      }
    },
    "paint": {
      "text-color": "@label",
      "text-halo-color": "@label-halo",
      "text-halo-width": 1.5,
      "text-halo-blur": 0,
      "text-size": {
        "stops": [[6, 11], [14, 19]]
      }
    }
  }, {
    "id": "place_label_other",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "place_label",
    "minzoom": 8,
    "filter": ["all", ["==", "$type", "Point"], ["in", "type", "town", "village", "hamlet"]],
    "layout": {
      "text-field": "@name",
      "text-font": "DIN Offc Pro Regular, Arial Unicode MS Bold",
      "text-max-width": 15,
      "text-max-size": 18
    },
    "paint": {
      "text-color": "@label",
      "text-halo-color": "@label-halo",
      "text-halo-width": 1,
      "text-halo-blur": 1,
      "text-size": {
        "stops": [[6, 10], [12, 13]]
      }
    }
  }, {
    "id": "place_label_neighborhood",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "place_label",
    "minzoom": 12,
    "filter": ["all", ["==", "$type", "Point"], ["in", "type", "suburb", "neighbourhood"]],
    "layout": {
      "text-field": "@name",
      "text-font": "DIN Offc Pro Bold, Arial Unicode MS Bold",
      "text-max-width": 7,
      "text-max-size": 14,
      "text-letter-spacing": 0.1,
      "text-transform": "uppercase"
    },
    "paint": {
      "text-color": "@label",
      "text-halo-color": "@label-halo",
      "text-halo-width": 1,
      "text-halo-blur": 1,
      "text-size": {
        "stops": [[12, 10], [16, 14]]
      },
      "text-opacity": {
        "base": 1,
        "stops": [[0, 0], [12, 0.66], [13, 1]]
      }
    }
  }, {
    "id": "water-label",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "water_label",
    "minzoom": 5,
    "maxzoom": 22,
    "layout": {
      "text-font": "DIN Offc Pro Italic, Arial Unicode MS Regular",
      "visibility": "visible",
      "text-field": "{name_en}",
      "text-max-width": 7
    },
    "paint": {
      "text-color": "@state-label",
      "text-size": {
        "base": 1,
        "stops": [[13, 12], [18, 16]]
      }
    }
  }, {
    "id": "poi-scalerank1",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "poi_label",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["!in", "maki", "rail-light", "rail-metro", "rail", "airport", "airfield", "heliport", "rocket", "park", "golf", "cemetary", "zoo", "campsite", "swimming", "dog-park"], ["<=", "scalerank", 1]],
    "layout": {
      "text-max-width": 8,
      "visibility": "visible",
      "text-field": "{name_en}",
      "text-max-size": 14,
      "text-font": "DIN Offc Pro Regular, Arial Unicode MS Regular"
    },
    "paint": {
      "text-color": "@label-secondary",
      "text-size": {
        "base": 1,
        "stops": [[10, 10], [18, 14]]
      },
      "text-halo-color": "@label-halo",
      "text-halo-width": 1
    }
  }, {
    "id": "poi-parks-scalerank1",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "poi_label",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["==", "maki", "park"], ["<=", "scalerank", 1]],
    "layout": {
      "text-max-width": 8,
      "visibility": "visible",
      "text-field": "{name_en}",
      "text-max-size": 14,
      "text-font": "DIN Offc Pro Regular, Arial Unicode MS Regular"
    },
    "paint": {
      "text-color": "@label-park",
      "text-size": {
        "base": 1,
        "stops": [[10, 10], [18, 14]]
      },
      "text-halo-color": "@label-halo",
      "text-halo-width": 1
    }
  }, {
    "id": "airport-label",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "poi_label",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["in", "maki", "airport", "heliport", "rocket"], ["<=", "scalerank", 2]],
    "layout": {
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Regular",
      "visibility": "visible",
      "text-field": {
        "base": 1,
        "stops": [[12, ""], [13, "{name_en}"]]
      },
      "text-max-size": 18,
      "text-max-width": 9
    },
    "paint": {
      "text-color": "@label",
      "text-size": {
        "base": 1,
        "stops": [[10, 10], [18, 18]]
      },
      "text-halo-color": "@label-halo",
      "text-halo-width": 1,
      "text-halo-blur": 0
    }
  }, {
    "id": "road-label-large",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "road_label",
    "filter": ["all", ["in", "class", "motorway", "main"]],
    "layout": {
      "symbol-placement": "line",
      "text-field": "{name_en}",
      "text-font": "DIN Offc Pro Medium, Arial Unicode MS Bold",
      "text-transform": "none",
      "text-letter-spacing": 0,
      "text-max-size": 16,
      "text-padding": 0
    },
    "paint": {
      "text-size": {
        "base": 1,
        "stops": [[8, 8], [20, 17]]
      },
      "text-halo-color": "@label-halo",
      "text-halo-width": 2,
      "text-color": "@label-road"
    }
  }, {
    "id": "road-label-med",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "road_label",
    "filter": ["all", ["in", "class", "street", "street_limited"]],
    "layout": {
      "symbol-placement": "line",
      "text-field": "{name_en}",
      "text-font": "@sans_md",
      "text-transform": "none",
      "text-letter-spacing": 0,
      "text-max-size": 16,
      "text-padding": 0
    },
    "paint": {
      "text-size": {
        "base": 1,
        "stops": [[8, 8], [20, 16]]
      },
      "text-halo-color": "@label-halo",
      "text-halo-width": 2,
      "text-color": "@label-road"
    }
  }, {
    "id": "road-label-sm",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "road_label",
    "minzoom": 12,
    "filter": ["all", ["!in", "class", "motorway", "main", "street_limited", "street"], ["==", "$type", "LineString"]],
    "layout": {
      "symbol-placement": "line",
      "text-field": "{name_en}",
      "text-font": "@sans_md",
      "text-transform": "none",
      "text-letter-spacing": 0,
      "text-max-size": 16,
      "text-padding": 0
    },
    "paint": {
      "text-size": {
        "base": 1,
        "stops": [[8, 8], [20, 15]]
      },
      "text-halo-color": "@label-halo",
      "text-halo-width": 2,
      "text-color": "@label-road"
    }
  }, {
    "id": "waterway-label",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "waterway_label",
    "minzoom": 12,
    "maxzoom": 22,
    "filter": ["all", ["==", "class", "river"]],
    "layout": {
      "text-font": "DIN Offc Pro Italic, Arial Unicode MS Regular",
      "visibility": "visible",
      "symbol-placement": "line",
      "text-field": "{name_en}"
    },
    "paint": {
      "text-color": "@label-waterway",
      "text-size": {
        "base": 1,
        "stops": [[13, 12], [18, 16]]
      }
    }
  }, {
    "id": "interstate-motorway_shields",
    "type": "symbol",
    "source": "mapbox",
    "source-layer": "road_label",
    "minzoom": 0,
    "maxzoom": 22,
    "filter": ["all", ["in", "shield", "us-interstate", "us-interstate-business", "us-interstate-duplex"], ["<=", "reflen", 6]],
    "layout": {
      "symbol-min-distance": {
        "base": 1,
        "stops": [[10, 200], [15, 600]]
      },
      "icon-image": "default-4-small",
      "text-max-angle": 38,
      "text-max-size": 11,
      "text-font": "DIN Offc Pro Bold, Arial Unicode MS Regular",
      "symbol-placement": "line",
      "visibility": "none",
      "text-field": "{ref}",
      "text-letter-spacing": 0.05
    },
    "paint": {
      "text-color": "@label-road",
      "text-size": {
        "base": 1,
        "stops": [[15.95, 9], [16, 11]]
      },
      "text-halo-color": "@label-halo",
      "icon-color": "white",
      "icon-halo-width": 1,
      "icon-halo-color": "rgba(0, 0, 0, 1)"
    }
  }],
  "owner": "andreasviglakis",
  "modified": "2015-04-27T23:19:35.558Z",
  "created": "2015-04-27T23:19:35.558Z",
  "id": "andreasviglakis.3081d695"
}

},{}],24:[function(require,module,exports){
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

},{"./routes":25,"react":"react","react-router":"react-router"}],25:[function(require,module,exports){
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

var _componentsAdmin = require('./components/Admin');

var _componentsAdmin2 = _interopRequireDefault(_componentsAdmin);

var _componentsProjeccion = require('./components/Projeccion');

var _componentsProjeccion2 = _interopRequireDefault(_componentsProjeccion);

var _componentsWeb = require('./components/Web');

var _componentsWeb2 = _interopRequireDefault(_componentsWeb);

var _componentsPatrimonioForm = require('./components/PatrimonioForm');

var _componentsPatrimonioForm2 = _interopRequireDefault(_componentsPatrimonioForm);

exports['default'] = _react2['default'].createElement(
  _reactRouter.Route,
  { handler: _componentsApp2['default'] },
  _react2['default'].createElement(_reactRouter.Route, { path: '/admin', handler: _componentsAdmin2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/projeccion', handler: _componentsProjeccion2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/web', handler: _componentsWeb2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: '/', handler: _componentsPatrimonioForm2['default'] })
);
module.exports = exports['default'];

},{"./components/Admin":2,"./components/App":4,"./components/PatrimonioForm":17,"./components/Projeccion":19,"./components/Web":20,"react":"react","react-router":"react-router"}],26:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],27:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule BrowserSupportCore
 */

'use strict';

var getVendorPrefixedName = require('./getVendorPrefixedName');

var BrowserSupportCore = {
  /**
   * @return {bool} True if browser supports css animations.
   */
  hasCSSAnimations: function hasCSSAnimations() {
    return !!getVendorPrefixedName('animationName');
  },

  /**
   * @return {bool} True if browser supports css transforms.
   */
  hasCSSTransforms: function hasCSSTransforms() {
    return !!getVendorPrefixedName('transform');
  },

  /**
   * @return {bool} True if browser supports css 3d transforms.
   */
  hasCSS3DTransforms: function hasCSS3DTransforms() {
    return !!getVendorPrefixedName('perspective');
  },

  /**
   * @return {bool} True if browser supports css transitions.
   */
  hasCSSTransitions: function hasCSSTransitions() {
    return !!getVendorPrefixedName('transition');
  }
};

module.exports = BrowserSupportCore;
},{"./getVendorPrefixedName":63}],28:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This class listens to events on the document and then updates a react
 * component through callbacks.
 * Please note that captureMouseMove must be called in
 * order to initialize listeners on mousemove and mouseup.
 * releaseMouseMove must be called to remove them. It is important to
 * call releaseMouseMoves since mousemove is expensive to listen to.
 *
 * @providesModule DOMMouseMoveTracker
 * @typechecks
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EventListener = require('./EventListener');

var cancelAnimationFramePolyfill = require('./cancelAnimationFramePolyfill');
var requestAnimationFramePolyfill = require('./requestAnimationFramePolyfill');

var DOMMouseMoveTracker = (function () {
  /**
   * onMove is the callback that will be called on every mouse move.
   * onMoveEnd is called on mouse up when movement has ended.
   */

  function DOMMouseMoveTracker(
  /*function*/onMove,
  /*function*/onMoveEnd,
  /*DOMElement*/domNode) {
    _classCallCheck(this, DOMMouseMoveTracker);

    this._isDragging = false;
    this._animationFrameID = null;
    this._domNode = domNode;
    this._onMove = onMove;
    this._onMoveEnd = onMoveEnd;
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._didMouseMove = this._didMouseMove.bind(this);
  }

  /**
   * This is to set up the listeners for listening to mouse move
   * and mouse up signaling the movement has ended. Please note that these
   * listeners are added at the document.body level. It takes in an event
   * in order to grab inital state.
   */

  _createClass(DOMMouseMoveTracker, [{
    key: 'captureMouseMoves',
    value: function captureMouseMoves( /*object*/event) {
      if (!this._eventMoveToken && !this._eventUpToken) {
        this._eventMoveToken = EventListener.listen(this._domNode, 'mousemove', this._onMouseMove);
        this._eventUpToken = EventListener.listen(this._domNode, 'mouseup', this._onMouseUp);
      }

      if (!this._isDragging) {
        this._deltaX = 0;
        this._deltaY = 0;
        this._isDragging = true;
        this._x = event.clientX;
        this._y = event.clientY;
      }
      event.preventDefault();
    }

    /**
     * These releases all of the listeners on document.body.
     */
  }, {
    key: 'releaseMouseMoves',
    value: function releaseMouseMoves() {
      if (this._eventMoveToken && this._eventUpToken) {
        this._eventMoveToken.remove();
        this._eventMoveToken = null;
        this._eventUpToken.remove();
        this._eventUpToken = null;
      }

      if (this._animationFrameID !== null) {
        cancelAnimationFramePolyfill(this._animationFrameID);
        this._animationFrameID = null;
      }

      if (this._isDragging) {
        this._isDragging = false;
        this._x = null;
        this._y = null;
      }
    }

    /**
     * Returns whether or not if the mouse movement is being tracked.
     */
  }, {
    key: 'isDragging',
    value: function isDragging() /*boolean*/{
      return this._isDragging;
    }

    /**
     * Calls onMove passed into constructor and updates internal state.
     */
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove( /*object*/event) {
      var x = event.clientX;
      var y = event.clientY;

      this._deltaX += x - this._x;
      this._deltaY += y - this._y;

      if (this._animationFrameID === null) {
        // The mouse may move faster then the animation frame does.
        // Use `requestAnimationFramePolyfill` to avoid over-updating.
        this._animationFrameID = requestAnimationFramePolyfill(this._didMouseMove);
      }

      this._x = x;
      this._y = y;
      event.preventDefault();
    }
  }, {
    key: '_didMouseMove',
    value: function _didMouseMove() {
      this._animationFrameID = null;
      this._onMove(this._deltaX, this._deltaY);
      this._deltaX = 0;
      this._deltaY = 0;
    }

    /**
     * Calls onMoveEnd passed into constructor and updates internal state.
     */
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp() {
      if (this._animationFrameID) {
        this._didMouseMove();
      }
      this._onMoveEnd();
    }
  }]);

  return DOMMouseMoveTracker;
})();

module.exports = DOMMouseMoveTracker;
},{"./EventListener":29,"./cancelAnimationFramePolyfill":57,"./requestAnimationFramePolyfill":73}],29:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventListener
 * @typechecks
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function capture(target, eventType, callback) {
    if (!target.addEventListener) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
      }
      return {
        remove: emptyFunction
      };
    } else {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    }
  },

  registerDefault: function registerDefault() {}
};

module.exports = EventListener;
}).call(this,require('_process'))
},{"./emptyFunction":62,"_process":26}],30:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ExecutionEnvironment
 */

/*jslint evil: true */

'use strict';

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;
},{}],31:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTable.react
 * @typechecks
 */

/* jslint bitwise: true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var FixedDataTableHelper = require('./FixedDataTableHelper');
var React = require('./React');
var ReactComponentWithPureRenderMixin = require('./ReactComponentWithPureRenderMixin');
var ReactWheelHandler = require('./ReactWheelHandler');
var Scrollbar = require('./Scrollbar.react');
var FixedDataTableBufferedRows = require('./FixedDataTableBufferedRows.react');
var FixedDataTableColumnResizeHandle = require('./FixedDataTableColumnResizeHandle.react');
var FixedDataTableRow = require('./FixedDataTableRow.react');
var FixedDataTableScrollHelper = require('./FixedDataTableScrollHelper');
var FixedDataTableWidthHelper = require('./FixedDataTableWidthHelper');

var cx = require('./cx');
var debounceCore = require('./debounceCore');
var emptyFunction = require('./emptyFunction');
var invariant = require('./invariant');
var joinClasses = require('./joinClasses');
var shallowEqual = require('./shallowEqual');
var translateDOMPositionXY = require('./translateDOMPositionXY');

var PropTypes = React.PropTypes;

var ReactChildren = React.Children;

var renderToString = FixedDataTableHelper.renderToString;
var EMPTY_OBJECT = {};
var BORDER_HEIGHT = 1;

/**
 * Data grid component with fixed or scrollable header and columns.
 *
 * The layout of the data table is as follows:
 *
 * ```
 * +---------------------------------------------------+
 * | Fixed Column Group    | Scrollable Column Group   |
 * | Header                | Header                    |
 * |                       |                           |
 * +---------------------------------------------------+
 * |                       |                           |
 * | Fixed Header Columns  | Scrollable Header Columns |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * |                       |                           |
 * | Fixed Body Columns    | Scrollable Body Columns   |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * |                       |                           |
 * | Fixed Footer Columns  | Scrollable Footer Columns |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * ```
 *
 * - Fixed Column Group Header: These are the headers for a group
 *   of columns if included in the table that do not scroll
 *   vertically or horizontally.
 *
 * - Scrollable Column Group Header: The header for a group of columns
 *   that do not move while scrolling vertically, but move horizontally
 *   with the horizontal scrolling.
 *
 * - Fixed Header Columns: The header columns that do not move while scrolling
 *   vertically or horizontally.
 *
 * - Scrollable Header Columns: The header columns that do not move
 *   while scrolling vertically, but move horizontally with the horizontal
 *   scrolling.
 *
 * - Fixed Body Columns: The body columns that do not move while scrolling
 *   horizontally, but move vertically with the vertical scrolling.
 *
 * - Scrollable Body Columns: The body columns that move while scrolling
 *   vertically or horizontally.
 */
var FixedDataTable = React.createClass({
  displayName: 'FixedDataTable',

  propTypes: {

    /**
     * Pixel width of table. If all columns do not fit,
     * a horizontal scrollbar will appear.
     */
    width: PropTypes.number.isRequired,

    /**
     * Pixel height of table. If all rows do not fit,
     * a vertical scrollbar will appear.
     *
     * Either `height` or `maxHeight` must be specified.
     */
    height: PropTypes.number,

    /**
     * Maximum pixel height of table. If all rows do not fit,
     * a vertical scrollbar will appear.
     *
     * Either `height` or `maxHeight` must be specified.
     */
    maxHeight: PropTypes.number,

    /**
     * Pixel height of table's owner, this is used in a managed scrolling
     * situation when you want to slide the table up from below the fold
     * without having to constantly update the height on every scroll tick.
     * Instead, vary this property on scroll. By using `ownerHeight`, we
     * over-render the table while making sure the footer and horizontal
     * scrollbar of the table are visible when the current space for the table
     * in view is smaller than the final, over-flowing height of table. It
     * allows us to avoid resizing and reflowing table when it is moving in the
     * view.
     *
     * This is used if `ownerHeight < height` (or `maxHeight`).
     */
    ownerHeight: PropTypes.number,

    overflowX: PropTypes.oneOf(['hidden', 'auto']),
    overflowY: PropTypes.oneOf(['hidden', 'auto']),

    /**
     * Number of rows in the table.
     */
    rowsCount: PropTypes.number.isRequired,

    /**
     * Pixel height of rows unless `rowHeightGetter` is specified and returns
     * different value.
     */
    rowHeight: PropTypes.number.isRequired,

    /**
     * If specified, `rowHeightGetter(index)` is called for each row and the
     * returned value overrides `rowHeight` for particular row.
     */
    rowHeightGetter: PropTypes.func,

    /**
     * To get rows to display in table, `rowGetter(index)`
     * is called. `rowGetter` should be smart enough to handle async
     * fetching of data and return temporary objects
     * while data is being fetched.
     */
    rowGetter: PropTypes.func.isRequired,

    /**
     * To get any additional CSS classes that should be added to a row,
     * `rowClassNameGetter(index)` is called.
     */
    rowClassNameGetter: PropTypes.func,

    /**
     * Pixel height of the column group header.
     */
    groupHeaderHeight: PropTypes.number,

    /**
     * Pixel height of header.
     */
    headerHeight: PropTypes.number.isRequired,

    /**
     * Function that is called to get the data for the header row.
     * If the function returns null, the header will be set to the
     * Column's label property.
     */
    headerDataGetter: PropTypes.func,

    /**
     * Pixel height of footer.
     */
    footerHeight: PropTypes.number,

    /**
     * DEPRECATED - use footerDataGetter instead.
     * Data that will be passed to footer cell renderers.
     */
    footerData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

    /**
     * Function that is called to get the data for the footer row.
     */
    footerDataGetter: PropTypes.func,

    /**
     * Value of horizontal scroll.
     */
    scrollLeft: PropTypes.number,

    /**
     * Index of column to scroll to.
     */
    scrollToColumn: PropTypes.number,

    /**
     * Value of vertical scroll.
     */
    scrollTop: PropTypes.number,

    /**
     * Index of row to scroll to.
     */
    scrollToRow: PropTypes.number,

    /**
     * Callback that is called when scrolling starts with current horizontal
     * and vertical scroll values.
     */
    onScrollStart: PropTypes.func,

    /**
     * Callback that is called when scrolling ends or stops with new horizontal
     * and vertical scroll values.
     */
    onScrollEnd: PropTypes.func,

    /**
     * Callback that is called when `rowHeightGetter` returns a different height
     * for a row than the `rowHeight` prop. This is necessary because initially
     * table estimates heights of some parts of the content.
     */
    onContentHeightChange: PropTypes.func,

    /**
     * Callback that is called when a row is clicked.
     */
    onRowClick: PropTypes.func,

    /**
     * Callback that is called when a row is double clicked.
     */
    onRowDoubleClick: PropTypes.func,

    /**
     * Callback that is called when a mouse-down event happens on a row.
     */
    onRowMouseDown: PropTypes.func,

    /**
     * Callback that is called when a mouse-enter event happens on a row.
     */
    onRowMouseEnter: PropTypes.func,

    /**
     * Callback that is called when a mouse-leave event happens on a row.
     */
    onRowMouseLeave: PropTypes.func,

    /**
     * Callback that is called when resizer has been released
     * and column needs to be updated.
     *
     * Required if the isResizable property is true on any column.
     *
     * ```
     * function(
     *   newColumnWidth: number,
     *   dataKey: string,
     * )
     * ```
     */
    onColumnResizeEndCallback: PropTypes.func,

    /**
     * Whether a column is currently being resized.
     */
    isColumnResizing: PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() /*object*/{
    return {
      footerHeight: 0,
      groupHeaderHeight: 0,
      headerHeight: 0,
      scrollLeft: 0,
      scrollTop: 0
    };
  },

  getInitialState: function getInitialState() /*object*/{
    var props = this.props;
    var viewportHeight = (props.height === undefined ? props.maxHeight : props.height) - (props.headerHeight || 0) - (props.footerHeight || 0) - (props.groupHeaderHeight || 0);
    this._scrollHelper = new FixedDataTableScrollHelper(props.rowsCount, props.rowHeight, viewportHeight, props.rowHeightGetter);
    if (props.scrollTop) {
      this._scrollHelper.scrollTo(props.scrollTop);
    }
    this._didScrollStop = debounceCore(this._didScrollStop, 160, this);

    return this._calculateState(this.props);
  },

  componentWillMount: function componentWillMount() {
    var scrollToRow = this.props.scrollToRow;
    if (scrollToRow !== undefined && scrollToRow !== null) {
      this._rowToScrollTo = scrollToRow;
    }
    var scrollToColumn = this.props.scrollToColumn;
    if (scrollToColumn !== undefined && scrollToColumn !== null) {
      this._columnToScrollTo = scrollToColumn;
    }
    this._wheelHandler = new ReactWheelHandler(this._onWheel, this._shouldHandleWheelX, this._shouldHandleWheelY);
  },

  _shouldHandleWheelX: function _shouldHandleWheelX( /*number*/delta) /*boolean*/{
    if (this.props.overflowX === 'hidden') {
      return false;
    }

    delta = Math.round(delta);
    if (delta === 0) {
      return false;
    }

    return delta < 0 && this.state.scrollX > 0 || delta >= 0 && this.state.scrollX < this.state.maxScrollX;
  },

  _shouldHandleWheelY: function _shouldHandleWheelY( /*number*/delta) /*boolean*/{
    if (this.props.overflowY === 'hidden' || delta === 0) {
      return false;
    }

    delta = Math.round(delta);
    if (delta === 0) {
      return false;
    }

    return delta < 0 && this.state.scrollY > 0 || delta >= 0 && this.state.scrollY < this.state.maxScrollY;
  },

  _reportContentHeight: function _reportContentHeight() {
    var scrollContentHeight = this.state.scrollContentHeight;
    var reservedHeight = this.state.reservedHeight;
    var requiredHeight = scrollContentHeight + reservedHeight;
    var contentHeight;
    var useMaxHeight = this.props.height === undefined;
    if (useMaxHeight && this.props.maxHeight > requiredHeight) {
      contentHeight = requiredHeight;
    } else if (this.state.height > requiredHeight && this.props.ownerHeight) {
      contentHeight = Math.max(requiredHeight, this.props.ownerHeight);
    } else {
      contentHeight = this.state.height + this.state.maxScrollY;
    }
    if (contentHeight !== this._contentHeight && this.props.onContentHeightChange) {
      this.props.onContentHeightChange(contentHeight);
    }
    this._contentHeight = contentHeight;
  },

  componentDidMount: function componentDidMount() {
    this._reportContentHeight();
  },

  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {
    var scrollToRow = nextProps.scrollToRow;
    if (scrollToRow !== undefined && scrollToRow !== null) {
      this._rowToScrollTo = scrollToRow;
    }
    var scrollToColumn = nextProps.scrollToColumn;
    if (scrollToColumn !== undefined && scrollToColumn !== null) {
      this._columnToScrollTo = scrollToColumn;
    }

    var newOverflowX = nextProps.overflowX;
    var newOverflowY = nextProps.overflowY;
    if (newOverflowX !== this.props.overflowX || newOverflowY !== this.props.overflowY) {
      this._wheelHandler = new ReactWheelHandler(this._onWheel, newOverflowX !== 'hidden', // Should handle horizontal scroll
      newOverflowY !== 'hidden' // Should handle vertical scroll
      );
    }

    this.setState(this._calculateState(nextProps, this.state));
  },

  componentDidUpdate: function componentDidUpdate() {
    this._reportContentHeight();
  },

  render: function render() /*object*/{
    var state = this.state;
    var props = this.props;

    var groupHeader;
    if (state.useGroupHeader) {
      groupHeader = React.createElement(FixedDataTableRow, {
        key: 'group_header',
        className: joinClasses(cx('fixedDataTableLayout/header'), cx('public/fixedDataTable/header')),
        data: state.groupHeaderData,
        width: state.width,
        height: state.groupHeaderHeight,
        index: 0,
        zIndex: 1,
        offsetTop: 0,
        scrollLeft: state.scrollX,
        fixedColumns: state.groupHeaderFixedColumns,
        scrollableColumns: state.groupHeaderScrollableColumns
      });
    }

    var maxScrollY = this.state.maxScrollY;
    var showScrollbarX = state.maxScrollX > 0 && state.overflowX !== 'hidden';
    var showScrollbarY = maxScrollY > 0 && state.overflowY !== 'hidden';
    var scrollbarXHeight = showScrollbarX ? Scrollbar.SIZE : 0;
    var scrollbarYHeight = state.height - scrollbarXHeight - 2 * BORDER_HEIGHT - state.footerHeight;

    var headerOffsetTop = state.useGroupHeader ? state.groupHeaderHeight : 0;
    var bodyOffsetTop = headerOffsetTop + state.headerHeight;
    scrollbarYHeight -= bodyOffsetTop;
    var bottomSectionOffset = 0;
    var footOffsetTop = props.maxHeight != null ? bodyOffsetTop + state.bodyHeight : bodyOffsetTop + scrollbarYHeight;
    var rowsContainerHeight = footOffsetTop + state.footerHeight;

    if (props.ownerHeight !== undefined && props.ownerHeight < state.height) {
      bottomSectionOffset = props.ownerHeight - state.height;

      footOffsetTop = Math.min(footOffsetTop, props.ownerHeight - state.footerHeight - scrollbarXHeight);

      scrollbarYHeight = Math.max(0, footOffsetTop - bodyOffsetTop);
    }

    var verticalScrollbar;
    if (showScrollbarY) {
      verticalScrollbar = React.createElement(Scrollbar, {
        size: scrollbarYHeight,
        contentSize: scrollbarYHeight + maxScrollY,
        onScroll: this._onVerticalScroll,
        verticalTop: bodyOffsetTop,
        position: state.scrollY
      });
    }

    var horizontalScrollbar;
    if (showScrollbarX) {
      var scrollbarXWidth = state.width;
      horizontalScrollbar = React.createElement(HorizontalScrollbar, {
        contentSize: scrollbarXWidth + state.maxScrollX,
        offset: bottomSectionOffset,
        onScroll: this._onHorizontalScroll,
        position: state.scrollX,
        size: scrollbarXWidth
      });
    }

    var dragKnob = React.createElement(FixedDataTableColumnResizeHandle, {
      height: state.height,
      initialWidth: state.columnResizingData.width || 0,
      minWidth: state.columnResizingData.minWidth || 0,
      maxWidth: state.columnResizingData.maxWidth || Number.MAX_VALUE,
      visible: !!state.isColumnResizing,
      leftOffset: state.columnResizingData.left || 0,
      knobHeight: state.headerHeight,
      initialEvent: state.columnResizingData.initialEvent,
      onColumnResizeEnd: props.onColumnResizeEndCallback,
      columnKey: state.columnResizingData.key
    });

    var footer = null;
    if (state.footerHeight) {
      var footerData = props.footerDataGetter ? props.footerDataGetter() : props.footerData;

      footer = React.createElement(FixedDataTableRow, {
        key: 'footer',
        className: joinClasses(cx('fixedDataTableLayout/footer'), cx('public/fixedDataTable/footer')),
        data: footerData,
        fixedColumns: state.footFixedColumns,
        height: state.footerHeight,
        index: -1,
        zIndex: 1,
        offsetTop: footOffsetTop,
        scrollableColumns: state.footScrollableColumns,
        scrollLeft: state.scrollX,
        width: state.width
      });
    }

    var rows = this._renderRows(bodyOffsetTop);

    var header = React.createElement(FixedDataTableRow, {
      key: 'header',
      className: joinClasses(cx('fixedDataTableLayout/header'), cx('public/fixedDataTable/header')),
      data: state.headData,
      width: state.width,
      height: state.headerHeight,
      index: -1,
      zIndex: 1,
      offsetTop: headerOffsetTop,
      scrollLeft: state.scrollX,
      fixedColumns: state.headFixedColumns,
      scrollableColumns: state.headScrollableColumns,
      onColumnResize: this._onColumnResize
    });

    var topShadow;
    var bottomShadow;
    if (state.scrollY) {
      topShadow = React.createElement('div', {
        className: joinClasses(cx('fixedDataTableLayout/topShadow'), cx('public/fixedDataTable/topShadow')),
        style: { top: bodyOffsetTop }
      });
    }

    if (state.ownerHeight != null && state.ownerHeight < state.height && state.scrollContentHeight + state.reservedHeight > state.ownerHeight || state.scrollY < maxScrollY) {
      bottomShadow = React.createElement('div', {
        className: joinClasses(cx('fixedDataTableLayout/bottomShadow'), cx('public/fixedDataTable/bottomShadow')),
        style: { top: footOffsetTop }
      });
    }

    return React.createElement(
      'div',
      {
        className: joinClasses(cx('fixedDataTableLayout/main'), cx('public/fixedDataTable/main')),
        onWheel: this._wheelHandler.onWheel,
        style: { height: state.height, width: state.width } },
      React.createElement(
        'div',
        {
          className: cx('fixedDataTableLayout/rowsContainer'),
          style: { height: rowsContainerHeight, width: state.width } },
        dragKnob,
        groupHeader,
        header,
        rows,
        footer,
        topShadow,
        bottomShadow
      ),
      verticalScrollbar,
      horizontalScrollbar
    );
  },

  _renderRows: function _renderRows( /*number*/offsetTop) /*object*/{
    var state = this.state;

    return React.createElement(FixedDataTableBufferedRows, {
      defaultRowHeight: state.rowHeight,
      firstRowIndex: state.firstRowIndex,
      firstRowOffset: state.firstRowOffset,
      fixedColumns: state.bodyFixedColumns,
      height: state.bodyHeight,
      offsetTop: offsetTop,
      onRowClick: state.onRowClick,
      onRowDoubleClick: state.onRowDoubleClick,
      onRowMouseDown: state.onRowMouseDown,
      onRowMouseEnter: state.onRowMouseEnter,
      onRowMouseLeave: state.onRowMouseLeave,
      rowClassNameGetter: state.rowClassNameGetter,
      rowsCount: state.rowsCount,
      rowGetter: state.rowGetter,
      rowHeightGetter: state.rowHeightGetter,
      scrollLeft: state.scrollX,
      scrollableColumns: state.bodyScrollableColumns,
      showLastRowBorder: true,
      width: state.width,
      rowPositionGetter: this._scrollHelper.getRowPosition
    });
  },

  /**
   * This is called when a cell that is in the header of a column has its
   * resizer knob clicked on. It displays the resizer and puts in the correct
   * location on the table.
   */
  _onColumnResize: function _onColumnResize(
  /*number*/combinedWidth,
  /*number*/leftOffset,
  /*number*/cellWidth,
  /*?number*/cellMinWidth,
  /*?number*/cellMaxWidth,
  /*number|string*/columnKey,
  /*object*/event) {
    this.setState({
      isColumnResizing: true,
      columnResizingData: {
        left: leftOffset + combinedWidth - cellWidth,
        width: cellWidth,
        minWidth: cellMinWidth,
        maxWidth: cellMaxWidth,
        initialEvent: {
          clientX: event.clientX,
          clientY: event.clientY,
          preventDefault: emptyFunction
        },
        key: columnKey
      }
    });
  },

  _areColumnSettingsIdentical: function _areColumnSettingsIdentical(oldColumns, newColumns) {
    if (oldColumns.length !== newColumns.length) {
      return false;
    }
    for (var index = 0; index < oldColumns.length; ++index) {
      if (!shallowEqual(oldColumns[index].props, newColumns[index].props)) {
        return false;
      }
    }
    return true;
  },

  _populateColumnsAndColumnData: function _populateColumnsAndColumnData(columns, columnGroups, oldState) {
    var canReuseColumnSettings = false;
    var canReuseColumnGroupSettings = false;

    if (oldState && oldState.columns) {
      canReuseColumnSettings = this._areColumnSettingsIdentical(columns, oldState.columns);
    }
    if (oldState && oldState.columnGroups && columnGroups) {
      canReuseColumnGroupSettings = this._areColumnSettingsIdentical(columnGroups, oldState.columnGroups);
    }

    var columnInfo = {};
    if (canReuseColumnSettings) {
      columnInfo.bodyFixedColumns = oldState.bodyFixedColumns;
      columnInfo.bodyScrollableColumns = oldState.bodyScrollableColumns;
      columnInfo.headFixedColumns = oldState.headFixedColumns;
      columnInfo.headScrollableColumns = oldState.headScrollableColumns;
      columnInfo.footFixedColumns = oldState.footFixedColumns;
      columnInfo.footScrollableColumns = oldState.footScrollableColumns;
    } else {
      var bodyColumnTypes = this._splitColumnTypes(columns);
      columnInfo.bodyFixedColumns = bodyColumnTypes.fixed;
      columnInfo.bodyScrollableColumns = bodyColumnTypes.scrollable;

      var headColumnTypes = this._splitColumnTypes(this._createHeadColumns(columns));
      columnInfo.headFixedColumns = headColumnTypes.fixed;
      columnInfo.headScrollableColumns = headColumnTypes.scrollable;

      var footColumnTypes = this._splitColumnTypes(this._createFootColumns(columns));
      columnInfo.footFixedColumns = footColumnTypes.fixed;
      columnInfo.footScrollableColumns = footColumnTypes.scrollable;
    }

    if (canReuseColumnGroupSettings) {
      columnInfo.groupHeaderFixedColumns = oldState.groupHeaderFixedColumns;
      columnInfo.groupHeaderScrollableColumns = oldState.groupHeaderScrollableColumns;
    } else {
      if (columnGroups) {
        columnInfo.groupHeaderData = this._getGroupHeaderData(columnGroups);
        columnGroups = this._createGroupHeaderColumns(columnGroups);
        var groupHeaderColumnTypes = this._splitColumnTypes(columnGroups);
        columnInfo.groupHeaderFixedColumns = groupHeaderColumnTypes.fixed;
        columnInfo.groupHeaderScrollableColumns = groupHeaderColumnTypes.scrollable;
      }
    }

    columnInfo.headData = this._getHeadData(columns);

    return columnInfo;
  },

  _calculateState: function _calculateState( /*object*/props, /*?object*/oldState) /*object*/{
    invariant(props.height !== undefined || props.maxHeight !== undefined, 'You must set either a height or a maxHeight');

    var children = [];
    ReactChildren.forEach(props.children, function (child, index) {
      if (child == null) {
        return;
      }
      invariant(child.type.__TableColumnGroup__ || child.type.__TableColumn__, 'child type should be <FixedDataTableColumn /> or ' + '<FixedDataTableColumnGroup />');
      children.push(child);
    });

    var useGroupHeader = false;
    if (children.length && children[0].type.__TableColumnGroup__) {
      useGroupHeader = true;
    }

    var firstRowIndex = oldState && oldState.firstRowIndex || 0;
    var firstRowOffset = oldState && oldState.firstRowOffset || 0;
    var scrollX, scrollY;
    if (oldState && props.overflowX !== 'hidden') {
      scrollX = oldState.scrollX;
    } else {
      scrollX = props.scrollLeft;
    }
    if (oldState && props.overflowY !== 'hidden') {
      scrollY = oldState.scrollY;
    } else {
      scrollState = this._scrollHelper.scrollTo(props.scrollTop);
      firstRowIndex = scrollState.index;
      firstRowOffset = scrollState.offset;
      scrollY = scrollState.position;
    }

    if (this._rowToScrollTo !== undefined) {
      scrollState = this._scrollHelper.scrollRowIntoView(this._rowToScrollTo);
      firstRowIndex = scrollState.index;
      firstRowOffset = scrollState.offset;
      scrollY = scrollState.position;
      delete this._rowToScrollTo;
    }

    var groupHeaderHeight = useGroupHeader ? props.groupHeaderHeight : 0;

    if (oldState && props.rowsCount !== oldState.rowsCount) {
      // Number of rows changed, try to scroll to the row from before the
      // change
      var viewportHeight = (props.height === undefined ? props.maxHeight : props.height) - (props.headerHeight || 0) - (props.footerHeight || 0) - (props.groupHeaderHeight || 0);
      this._scrollHelper = new FixedDataTableScrollHelper(props.rowsCount, props.rowHeight, viewportHeight, props.rowHeightGetter);
      var scrollState = this._scrollHelper.scrollToRow(firstRowIndex, firstRowOffset);
      firstRowIndex = scrollState.index;
      firstRowOffset = scrollState.offset;
      scrollY = scrollState.position;
    } else if (oldState && props.rowHeightGetter !== oldState.rowHeightGetter) {
      this._scrollHelper.setRowHeightGetter(props.rowHeightGetter);
    }

    var columnResizingData;
    if (props.isColumnResizing) {
      columnResizingData = oldState && oldState.columnResizingData;
    } else {
      columnResizingData = EMPTY_OBJECT;
    }

    var columns;
    var columnGroups;

    if (useGroupHeader) {
      var columnGroupSettings = FixedDataTableWidthHelper.adjustColumnGroupWidths(children, props.width);
      columns = columnGroupSettings.columns;
      columnGroups = columnGroupSettings.columnGroups;
    } else {
      columns = FixedDataTableWidthHelper.adjustColumnWidths(children, props.width);
    }

    var columnInfo = this._populateColumnsAndColumnData(columns, columnGroups, oldState);

    if (this._columnToScrollTo !== undefined) {
      // If selected column is a fixed column, don't scroll
      var fixedColumnsCount = columnInfo.bodyFixedColumns.length;
      if (this._columnToScrollTo >= fixedColumnsCount) {
        var totalFixedColumnsWidth = 0;
        var i, column;
        for (i = 0; i < columnInfo.bodyFixedColumns.length; ++i) {
          column = columnInfo.bodyFixedColumns[i];
          totalFixedColumnsWidth += column.props.width;
        }

        var scrollableColumnIndex = Math.min(this._columnToScrollTo - fixedColumnsCount, columnInfo.bodyScrollableColumns.length - 1);

        var previousColumnsWidth = 0;
        for (i = 0; i < scrollableColumnIndex; ++i) {
          column = columnInfo.bodyScrollableColumns[i];
          previousColumnsWidth += column.props.width;
        }

        var availableScrollWidth = props.width - totalFixedColumnsWidth;
        var selectedColumnWidth = columnInfo.bodyScrollableColumns[scrollableColumnIndex].props.width;
        var minAcceptableScrollPosition = previousColumnsWidth + selectedColumnWidth - availableScrollWidth;

        if (scrollX < minAcceptableScrollPosition) {
          scrollX = minAcceptableScrollPosition;
        }

        if (scrollX > previousColumnsWidth) {
          scrollX = previousColumnsWidth;
        }
      }
      delete this._columnToScrollTo;
    }

    var useMaxHeight = props.height === undefined;
    var height = Math.round(useMaxHeight ? props.maxHeight : props.height);
    var totalHeightReserved = props.footerHeight + props.headerHeight + groupHeaderHeight + 2 * BORDER_HEIGHT;
    var bodyHeight = height - totalHeightReserved;
    var scrollContentHeight = this._scrollHelper.getContentHeight();
    var totalHeightNeeded = scrollContentHeight + totalHeightReserved;
    var scrollContentWidth = FixedDataTableWidthHelper.getTotalWidth(columns);

    var horizontalScrollbarVisible = scrollContentWidth > props.width && props.overflowX !== 'hidden';

    if (horizontalScrollbarVisible) {
      bodyHeight -= Scrollbar.SIZE;
      totalHeightNeeded += Scrollbar.SIZE;
      totalHeightReserved += Scrollbar.SIZE;
    }

    var maxScrollX = Math.max(0, scrollContentWidth - props.width);
    var maxScrollY = Math.max(0, scrollContentHeight - bodyHeight);
    scrollX = Math.min(scrollX, maxScrollX);
    scrollY = Math.min(scrollY, maxScrollY);

    if (!maxScrollY) {
      // no vertical scrollbar necessary, use the totals we tracked so we
      // can shrink-to-fit vertically
      if (useMaxHeight) {
        height = totalHeightNeeded;
      }
      bodyHeight = totalHeightNeeded - totalHeightReserved;
    }

    this._scrollHelper.setViewportHeight(bodyHeight);

    // The order of elements in this object metters and bringing bodyHeight,
    // height or useGroupHeader to the top can break various features
    var newState = _extends({
      isColumnResizing: oldState && oldState.isColumnResizing
    }, columnInfo, props, {

      columns: columns,
      columnGroups: columnGroups,
      columnResizingData: columnResizingData,
      firstRowIndex: firstRowIndex,
      firstRowOffset: firstRowOffset,
      horizontalScrollbarVisible: horizontalScrollbarVisible,
      maxScrollX: maxScrollX,
      maxScrollY: maxScrollY,
      reservedHeight: totalHeightReserved,
      scrollContentHeight: scrollContentHeight,
      scrollX: scrollX,
      scrollY: scrollY,

      // These properties may overwrite properties defined in
      // columnInfo and props
      bodyHeight: bodyHeight,
      height: height,
      groupHeaderHeight: groupHeaderHeight,
      useGroupHeader: useGroupHeader
    });

    // Both `headData` and `groupHeaderData` are generated by
    // `FixedDataTable` will be passed to each header cell to render.
    // In order to prevent over-rendering the cells, we do not pass the
    // new `headData` or `groupHeaderData`
    // if they haven't changed.
    if (oldState) {
      if (oldState.headData && newState.headData && shallowEqual(oldState.headData, newState.headData)) {
        newState.headData = oldState.headData;
      }
      if (oldState.groupHeaderData && newState.groupHeaderData && shallowEqual(oldState.groupHeaderData, newState.groupHeaderData)) {
        newState.groupHeaderData = oldState.groupHeaderData;
      }
    }

    return newState;
  },

  _createGroupHeaderColumns: function _createGroupHeaderColumns( /*array*/columnGroups) /*array*/{
    var newColumnGroups = [];
    for (var i = 0; i < columnGroups.length; ++i) {
      newColumnGroups[i] = React.cloneElement(columnGroups[i], {
        dataKey: i,
        children: undefined,
        columnData: columnGroups[i].props.columnGroupData,
        cellRenderer: columnGroups[i].props.groupHeaderRenderer || renderToString,
        isHeaderCell: true
      });
    }
    return newColumnGroups;
  },

  _createHeadColumns: function _createHeadColumns( /*array*/columns) /*array*/{
    var headColumns = [];
    for (var i = 0; i < columns.length; ++i) {
      var columnProps = columns[i].props;
      headColumns.push(React.cloneElement(columns[i], {
        cellRenderer: columnProps.headerRenderer || renderToString,
        columnData: columnProps.columnData,
        dataKey: columnProps.dataKey,
        isHeaderCell: true,
        label: columnProps.label
      }));
    }
    return headColumns;
  },

  _createFootColumns: function _createFootColumns( /*array*/columns) /*array*/{
    var footColumns = [];
    for (var i = 0; i < columns.length; ++i) {
      var columnProps = columns[i].props;
      footColumns.push(React.cloneElement(columns[i], {
        cellRenderer: columnProps.footerRenderer || renderToString,
        columnData: columnProps.columnData,
        dataKey: columnProps.dataKey,
        isFooterCell: true
      }));
    }
    return footColumns;
  },

  _getHeadData: function _getHeadData( /*array*/columns) /*?object*/{
    if (!this.props.headerDataGetter) {
      return null;
    }

    var headData = {};
    for (var i = 0; i < columns.length; ++i) {
      var columnProps = columns[i].props;
      headData[columnProps.dataKey] = this.props.headerDataGetter(columnProps.dataKey);
    }
    return headData;
  },

  _getGroupHeaderData: function _getGroupHeaderData( /*array*/columnGroups) /*array*/{
    var groupHeaderData = [];
    for (var i = 0; i < columnGroups.length; ++i) {
      groupHeaderData[i] = columnGroups[i].props.label || '';
    }
    return groupHeaderData;
  },

  _splitColumnTypes: function _splitColumnTypes( /*array*/columns) /*object*/{
    var fixedColumns = [];
    var scrollableColumns = [];
    for (var i = 0; i < columns.length; ++i) {
      if (columns[i].props.fixed) {
        fixedColumns.push(columns[i]);
      } else {
        scrollableColumns.push(columns[i]);
      }
    }
    return {
      fixed: fixedColumns,
      scrollable: scrollableColumns
    };
  },

  _onWheel: function _onWheel( /*number*/deltaX, /*number*/deltaY) {
    if (this.isMounted()) {
      if (!this._isScrolling) {
        this._didScrollStart();
      }
      var x = this.state.scrollX;
      if (Math.abs(deltaY) > Math.abs(deltaX) && this.props.overflowY !== 'hidden') {
        var scrollState = this._scrollHelper.scrollBy(Math.round(deltaY));
        var maxScrollY = Math.max(0, scrollState.contentHeight - this.state.bodyHeight);
        this.setState({
          firstRowIndex: scrollState.index,
          firstRowOffset: scrollState.offset,
          scrollY: scrollState.position,
          scrollContentHeight: scrollState.contentHeight,
          maxScrollY: maxScrollY
        });
      } else if (deltaX && this.props.overflowX !== 'hidden') {
        x += deltaX;
        x = x < 0 ? 0 : x;
        x = x > this.state.maxScrollX ? this.state.maxScrollX : x;
        this.setState({
          scrollX: x
        });
      }

      this._didScrollStop();
    }
  },

  _onHorizontalScroll: function _onHorizontalScroll( /*number*/scrollPos) {
    if (this.isMounted() && scrollPos !== this.state.scrollX) {
      if (!this._isScrolling) {
        this._didScrollStart();
      }
      this.setState({
        scrollX: scrollPos
      });
      this._didScrollStop();
    }
  },

  _onVerticalScroll: function _onVerticalScroll( /*number*/scrollPos) {
    if (this.isMounted() && scrollPos !== this.state.scrollY) {
      if (!this._isScrolling) {
        this._didScrollStart();
      }
      var scrollState = this._scrollHelper.scrollTo(Math.round(scrollPos));
      this.setState({
        firstRowIndex: scrollState.index,
        firstRowOffset: scrollState.offset,
        scrollY: scrollState.position,
        scrollContentHeight: scrollState.contentHeight
      });
      this._didScrollStop();
    }
  },

  _didScrollStart: function _didScrollStart() {
    if (this.isMounted() && !this._isScrolling) {
      this._isScrolling = true;
      if (this.props.onScrollStart) {
        this.props.onScrollStart(this.state.scrollX, this.state.scrollY);
      }
    }
  },

  _didScrollStop: function _didScrollStop() {
    if (this.isMounted() && this._isScrolling) {
      this._isScrolling = false;
      if (this.props.onScrollEnd) {
        this.props.onScrollEnd(this.state.scrollX, this.state.scrollY);
      }
    }
  }
});

var HorizontalScrollbar = React.createClass({
  displayName: 'HorizontalScrollbar',

  mixins: [ReactComponentWithPureRenderMixin],
  propTypes: {
    contentSize: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    onScroll: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired
  },

  render: function render() /*object*/{
    var outerContainerStyle = {
      height: Scrollbar.SIZE,
      width: this.props.size
    };
    var innerContainerStyle = {
      height: Scrollbar.SIZE,
      position: 'absolute',
      overflow: 'hidden',
      width: this.props.size
    };
    translateDOMPositionXY(innerContainerStyle, 0, this.props.offset);

    return React.createElement(
      'div',
      {
        className: joinClasses(cx('fixedDataTableLayout/horizontalScrollbar'), cx('public/fixedDataTable/horizontalScrollbar')),
        style: outerContainerStyle },
      React.createElement(
        'div',
        { style: innerContainerStyle },
        React.createElement(Scrollbar, _extends({}, this.props, {
          isOpaque: true,
          orientation: 'horizontal',
          offset: undefined
        }))
      )
    );
  }
});

module.exports = FixedDataTable;
// isColumnResizing should be overwritten by value from props if
// avaialble
},{"./FixedDataTableBufferedRows.react":32,"./FixedDataTableColumnResizeHandle.react":37,"./FixedDataTableHelper":38,"./FixedDataTableRow.react":40,"./FixedDataTableScrollHelper":42,"./FixedDataTableWidthHelper":43,"./React":51,"./ReactComponentWithPureRenderMixin":52,"./ReactWheelHandler":53,"./Scrollbar.react":54,"./cx":60,"./debounceCore":61,"./emptyFunction":62,"./invariant":64,"./joinClasses":67,"./shallowEqual":74,"./translateDOMPositionXY":75}],32:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableBufferedRows.react
 * @typechecks
 */

'use strict';

var React = require('./React');
var FixedDataTableRowBuffer = require('./FixedDataTableRowBuffer');
var FixedDataTableRow = require('./FixedDataTableRow.react');

var cx = require('./cx');
var emptyFunction = require('./emptyFunction');
var joinClasses = require('./joinClasses');
var translateDOMPositionXY = require('./translateDOMPositionXY');

var PropTypes = React.PropTypes;

var FixedDataTableBufferedRows = React.createClass({
  displayName: 'FixedDataTableBufferedRows',

  propTypes: {
    defaultRowHeight: PropTypes.number.isRequired,
    firstRowIndex: PropTypes.number.isRequired,
    firstRowOffset: PropTypes.number.isRequired,
    fixedColumns: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    offsetTop: PropTypes.number.isRequired,
    onRowClick: PropTypes.func,
    onRowDoubleClick: PropTypes.func,
    onRowMouseDown: PropTypes.func,
    onRowMouseEnter: PropTypes.func,
    onRowMouseLeave: PropTypes.func,
    rowClassNameGetter: PropTypes.func,
    rowsCount: PropTypes.number.isRequired,
    rowGetter: PropTypes.func.isRequired,
    rowHeightGetter: PropTypes.func,
    rowPositionGetter: PropTypes.func.isRequired,
    scrollLeft: PropTypes.number.isRequired,
    scrollableColumns: PropTypes.array.isRequired,
    showLastRowBorder: PropTypes.bool,
    width: PropTypes.number.isRequired
  },

  getInitialState: function getInitialState() /*object*/{
    this._rowBuffer = new FixedDataTableRowBuffer(this.props.rowsCount, this.props.defaultRowHeight, this.props.height, this._getRowHeight);
    return {
      rowsToRender: this._rowBuffer.getRows(this.props.firstRowIndex, this.props.firstRowOffset)
    };
  },

  componentWillMount: function componentWillMount() {
    this._staticRowArray = [];
  },

  componentDidMount: function componentDidMount() {
    this._bufferUpdateTimer = setTimeout(this._updateBuffer, 1000);
  },

  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {
    if (nextProps.rowsCount !== this.props.rowsCount || nextProps.defaultRowHeight !== this.props.defaultRowHeight || nextProps.height !== this.props.height) {
      this._rowBuffer = new FixedDataTableRowBuffer(nextProps.rowsCount, nextProps.defaultRowHeight, nextProps.height, this._getRowHeight);
    }
    this.setState({
      rowsToRender: this._rowBuffer.getRows(nextProps.firstRowIndex, nextProps.firstRowOffset)
    });
    if (this._bufferUpdateTimer) {
      clearTimeout(this._bufferUpdateTimer);
    }
    this._bufferUpdateTimer = setTimeout(this._updateBuffer, 400);
  },

  _updateBuffer: function _updateBuffer() {
    this._bufferUpdateTimer = null;
    if (this.isMounted()) {
      this.setState({
        rowsToRender: this._rowBuffer.getRowsWithUpdatedBuffer()
      });
    }
  },

  shouldComponentUpdate: function shouldComponentUpdate() /*boolean*/{
    // Don't add PureRenderMixin to this component please.
    return true;
  },

  componentWillUnmount: function componentWillUnmount() {
    this._staticRowArray.length = 0;
  },

  render: function render() /*object*/{
    var props = this.props;
    var rowClassNameGetter = props.rowClassNameGetter || emptyFunction;
    var rowGetter = props.rowGetter;
    var rowPositionGetter = props.rowPositionGetter;

    var rowsToRender = this.state.rowsToRender;
    this._staticRowArray.length = rowsToRender.length;

    for (var i = 0; i < rowsToRender.length; ++i) {
      var rowIndex = rowsToRender[i];
      var currentRowHeight = this._getRowHeight(rowIndex);
      var rowOffsetTop = rowPositionGetter(rowIndex);

      var hasBottomBorder = rowIndex === props.rowsCount - 1 && props.showLastRowBorder;

      this._staticRowArray[i] = React.createElement(FixedDataTableRow, {
        key: i,
        index: rowIndex,
        data: rowGetter(rowIndex),
        width: props.width,
        height: currentRowHeight,
        scrollLeft: Math.round(props.scrollLeft),
        offsetTop: Math.round(rowOffsetTop),
        fixedColumns: props.fixedColumns,
        scrollableColumns: props.scrollableColumns,
        onClick: props.onRowClick,
        onDoubleClick: props.onRowDoubleClick,
        onMouseDown: props.onRowMouseDown,
        onMouseEnter: props.onRowMouseEnter,
        onMouseLeave: props.onRowMouseLeave,
        className: joinClasses(rowClassNameGetter(rowIndex), cx('public/fixedDataTable/bodyRow'), cx({
          'fixedDataTableLayout/hasBottomBorder': hasBottomBorder,
          'public/fixedDataTable/hasBottomBorder': hasBottomBorder
        }))
      });
    }

    var firstRowPosition = props.rowPositionGetter(props.firstRowIndex);

    var style = {
      position: 'absolute'
    };

    translateDOMPositionXY(style, 0, props.firstRowOffset - firstRowPosition + props.offsetTop);

    return React.createElement(
      'div',
      { style: style },
      this._staticRowArray
    );
  },

  _getRowHeight: function _getRowHeight( /*number*/index) /*number*/{
    return this.props.rowHeightGetter ? this.props.rowHeightGetter(index) : this.props.defaultRowHeight;
  }
});

module.exports = FixedDataTableBufferedRows;
},{"./FixedDataTableRow.react":40,"./FixedDataTableRowBuffer":41,"./React":51,"./cx":60,"./emptyFunction":62,"./joinClasses":67,"./translateDOMPositionXY":75}],33:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableCell.react
 * @typechecks
 */

'use strict';

var FixedDataTableHelper = require('./FixedDataTableHelper');
var ImmutableObject = require('./ImmutableObject');
var React = require('./React');
var ReactComponentWithPureRenderMixin = require('./ReactComponentWithPureRenderMixin');
var cx = require('./cx');
var joinClasses = require('./joinClasses');

var DIR_SIGN = FixedDataTableHelper.DIR_SIGN;

var PropTypes = React.PropTypes;

var DEFAULT_PROPS = new ImmutableObject({
  align: 'left',
  highlighted: false,
  isFooterCell: false,
  isHeaderCell: false
});

var FixedDataTableCell = React.createClass({
  displayName: 'FixedDataTableCell',

  mixins: [ReactComponentWithPureRenderMixin],

  propTypes: {
    align: PropTypes.oneOf(['left', 'center', 'right']),
    className: PropTypes.string,
    highlighted: PropTypes.bool,
    isFooterCell: PropTypes.bool,
    isHeaderCell: PropTypes.bool,
    width: PropTypes.number.isRequired,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    height: PropTypes.number.isRequired,

    /**
     * The cell data that will be passed to `cellRenderer` to render.
     */
    cellData: PropTypes.any,

    /**
     * The key to retrieve the cell data from the `rowData`.
     */
    cellDataKey: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),

    /**
     * The function to render the `cellData`.
     */
    cellRenderer: PropTypes.func.isRequired,

    /**
     * The column data that will be passed to `cellRenderer` to render.
     */
    columnData: PropTypes.any,

    /**
     * The row data that will be passed to `cellRenderer` to render.
     */
    rowData: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.array.isRequired]),

    /**
     * The row index that will be passed to `cellRenderer` to render.
     */
    rowIndex: PropTypes.number.isRequired,

    /**
     * Callback for when resizer knob (in FixedDataTableCell) is clicked
     * to initialize resizing. Please note this is only on the cells
     * in the header.
     * @param number combinedWidth
     * @param number left
     * @param number width
     * @param number minWidth
     * @param number maxWidth
     * @param number|string columnKey
     * @param object event
     */
    onColumnResize: PropTypes.func,

    /**
     * The left offset in pixels of the cell.
     */
    left: PropTypes.number
  },

  getDefaultProps: function getDefaultProps() /*object*/{
    return DEFAULT_PROPS;
  },

  render: function render() /*object*/{
    var props = this.props;

    var style = {
      height: props.height,
      width: props.width
    };
    if (DIR_SIGN === 1) {
      style.left = props.left;
    } else {
      style.right = props.left;
    }

    var className = joinClasses(cx({
      'fixedDataTableCellLayout/main': true,
      'fixedDataTableCellLayout/lastChild': props.lastChild,
      'fixedDataTableCellLayout/alignRight': props.align === 'right',
      'fixedDataTableCellLayout/alignCenter': props.align === 'center',
      'public/fixedDataTableCell/alignRight': props.align === 'right',
      'public/fixedDataTableCell/highlighted': props.highlighted,
      'public/fixedDataTableCell/main': true
    }), props.className);

    var content;
    if (props.isHeaderCell || props.isFooterCell) {
      content = props.cellRenderer(props.cellData, props.cellDataKey, props.columnData, props.rowData, props.width);
    } else {
      content = props.cellRenderer(props.cellData, props.cellDataKey, props.rowData, props.rowIndex, props.columnData, props.width);
    }

    var contentClass = cx('public/fixedDataTableCell/cellContent');
    if (React.isValidElement(content)) {
      content = React.cloneElement(content, {
        className: joinClasses(content.props.className, contentClass)
      });
    } else {
      content = React.createElement(
        'div',
        { className: contentClass },
        content
      );
    }

    var columnResizerComponent;
    if (props.onColumnResize) {
      var columnResizerStyle = {
        height: props.height
      };
      columnResizerComponent = React.createElement(
        'div',
        {
          className: cx('fixedDataTableCellLayout/columnResizerContainer'),
          style: columnResizerStyle,
          onMouseDown: this._onColumnResizerMouseDown },
        React.createElement('div', {
          className: joinClasses(cx('fixedDataTableCellLayout/columnResizerKnob'), cx('public/fixedDataTableCell/columnResizerKnob')),
          style: columnResizerStyle
        })
      );
    }

    var innerStyle = {
      height: props.height,
      width: props.width
    };

    return React.createElement(
      'div',
      { className: className, style: style },
      columnResizerComponent,
      React.createElement(
        'div',
        {
          className: joinClasses(cx('fixedDataTableCellLayout/wrap1'), cx('public/fixedDataTableCell/wrap1')),
          style: innerStyle },
        React.createElement(
          'div',
          {
            className: joinClasses(cx('fixedDataTableCellLayout/wrap2'), cx('public/fixedDataTableCell/wrap2')) },
          React.createElement(
            'div',
            {
              className: joinClasses(cx('fixedDataTableCellLayout/wrap3'), cx('public/fixedDataTableCell/wrap3')) },
            content
          )
        )
      )
    );
  },

  _onColumnResizerMouseDown: function _onColumnResizerMouseDown( /*object*/event) {
    this.props.onColumnResize(this.props.left, this.props.width, this.props.minWidth, this.props.maxWidth, this.props.cellDataKey, event);
  }
});

module.exports = FixedDataTableCell;
},{"./FixedDataTableHelper":38,"./ImmutableObject":45,"./React":51,"./ReactComponentWithPureRenderMixin":52,"./cx":60,"./joinClasses":67}],34:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableCellGroup.react
 * @typechecks
 */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FixedDataTableHelper = require('./FixedDataTableHelper');
var ImmutableObject = require('./ImmutableObject');
var React = require('./React');
var ReactComponentWithPureRenderMixin = require('./ReactComponentWithPureRenderMixin');
var FixedDataTableCell = require('./FixedDataTableCell.react');

var cx = require('./cx');
var renderToString = FixedDataTableHelper.renderToString;
var translateDOMPositionXY = require('./translateDOMPositionXY');

var PropTypes = React.PropTypes;

var DIR_SIGN = FixedDataTableHelper.DIR_SIGN;
var EMPTY_OBJECT = new ImmutableObject({});

var FixedDataTableCellGroupImpl = React.createClass({
  displayName: 'FixedDataTableCellGroupImpl',

  mixins: [ReactComponentWithPureRenderMixin],

  propTypes: {

    /**
     * Array of <FixedDataTableColumn />.
     */
    columns: PropTypes.array.isRequired,

    /**
     * The row data to render. The data format can be a simple Map object
     * or an Array of data.
     */
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

    left: PropTypes.number,

    onColumnResize: PropTypes.func,

    rowHeight: PropTypes.number.isRequired,

    rowIndex: PropTypes.number.isRequired,

    width: PropTypes.number.isRequired,

    zIndex: PropTypes.number.isRequired
  },

  render: function render() /*object*/{
    var props = this.props;
    var columns = props.columns;
    var cells = new Array(columns.length);

    var currentPosition = 0;
    for (var i = 0, j = columns.length; i < j; i++) {
      var columnProps = columns[i].props;
      if (!columnProps.allowCellsRecycling || currentPosition - props.left <= props.width && currentPosition - props.left + columnProps.width >= 0) {
        var key = 'cell_' + i;
        cells[i] = this._renderCell(props.data, props.rowIndex, props.rowHeight, columnProps, currentPosition, key);
      }
      currentPosition += columnProps.width;
    }

    var contentWidth = this._getColumnsWidth(columns);

    var style = {
      height: props.height,
      position: 'absolute',
      width: contentWidth,
      zIndex: props.zIndex
    };
    translateDOMPositionXY(style, -1 * DIR_SIGN * props.left, 0);

    return React.createElement(
      'div',
      {
        className: cx('fixedDataTableCellGroupLayout/cellGroup'),
        style: style },
      cells
    );
  },

  _renderCell: function _renderCell(
  /*?object|array*/rowData,
  /*number*/rowIndex,
  /*number*/height,
  /*object*/columnProps,
  /*number*/left,
  /*string*/key) /*object*/{
    var cellRenderer = columnProps.cellRenderer || renderToString;
    var columnData = columnProps.columnData || EMPTY_OBJECT;
    var cellDataKey = columnProps.dataKey;
    var isFooterCell = columnProps.isFooterCell;
    var isHeaderCell = columnProps.isHeaderCell;
    var cellData;

    if (isHeaderCell || isFooterCell) {
      if (rowData == null || rowData[cellDataKey] == null) {
        cellData = columnProps.label;
      } else {
        cellData = rowData[cellDataKey];
      }
    } else {
      var cellDataGetter = columnProps.cellDataGetter;
      cellData = cellDataGetter ? cellDataGetter(cellDataKey, rowData) : rowData[cellDataKey];
    }

    var cellIsResizable = columnProps.isResizable && this.props.onColumnResize;
    var onColumnResize = cellIsResizable ? this.props.onColumnResize : null;

    var className;
    if (isHeaderCell || isFooterCell) {
      className = isHeaderCell ? columnProps.headerClassName : columnProps.footerClassName;
    } else {
      className = columnProps.cellClassName;
    }

    return React.createElement(FixedDataTableCell, {
      align: columnProps.align,
      cellData: cellData,
      cellDataKey: cellDataKey,
      cellRenderer: cellRenderer,
      className: className,
      columnData: columnData,
      height: height,
      isFooterCell: isFooterCell,
      isHeaderCell: isHeaderCell,
      key: key,
      maxWidth: columnProps.maxWidth,
      minWidth: columnProps.minWidth,
      onColumnResize: onColumnResize,
      rowData: rowData,
      rowIndex: rowIndex,
      width: columnProps.width,
      left: left
    });
  },

  _getColumnsWidth: function _getColumnsWidth(columns) {
    var width = 0;
    for (var i = 0; i < columns.length; ++i) {
      width += columns[i].props.width;
    }
    return width;
  }
});

var FixedDataTableCellGroup = React.createClass({
  displayName: 'FixedDataTableCellGroup',

  mixins: [ReactComponentWithPureRenderMixin],

  propTypes: {
    /**
     * Height of the row.
     */
    height: PropTypes.number.isRequired,

    offsetLeft: PropTypes.number,

    /**
     * Z-index on which the row will be displayed. Used e.g. for keeping
     * header and footer in front of other rows.
     */
    zIndex: PropTypes.number.isRequired
  },

  getDefaultProps: function getDefaultProps() /*object*/{
    return {
      offsetLeft: 0
    };
  },

  render: function render() /*object*/{
    var _props = this.props;
    var offsetLeft = _props.offsetLeft;

    var props = _objectWithoutProperties(_props, ['offsetLeft']);

    var style = {
      height: props.height
    };

    if (DIR_SIGN === 1) {
      style.left = offsetLeft;
    } else {
      style.right = offsetLeft;
    }

    var onColumnResize = props.onColumnResize ? this._onColumnResize : null;

    return React.createElement(
      'div',
      {
        style: style,
        className: cx('fixedDataTableCellGroupLayout/cellGroupWrapper') },
      React.createElement(FixedDataTableCellGroupImpl, _extends({}, props, {
        onColumnResize: onColumnResize
      }))
    );
  },

  _onColumnResize: function _onColumnResize(
  /*number*/left,
  /*number*/width,
  /*?number*/minWidth,
  /*?number*/maxWidth,
  /*string|number*/cellDataKey,
  /*object*/event) {
    this.props.onColumnResize && this.props.onColumnResize(this.props.offsetLeft, left - this.props.left + width, width, minWidth, maxWidth, cellDataKey, event);
  }
});

module.exports = FixedDataTableCellGroup;
},{"./FixedDataTableCell.react":33,"./FixedDataTableHelper":38,"./ImmutableObject":45,"./React":51,"./ReactComponentWithPureRenderMixin":52,"./cx":60,"./translateDOMPositionXY":75}],35:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableColumn.react
 * @typechecks
 */

'use strict';

var React = require('./React');

var PropTypes = React.PropTypes;

/**
 * Component that defines the attributes of table column.
 */
var FixedDataTableColumn = React.createClass({
  displayName: 'FixedDataTableColumn',

  statics: {
    __TableColumn__: true
  },

  propTypes: {
    /**
     * The horizontal alignment of the table cell content.
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * className for this column's header cell.
     */
    headerClassName: PropTypes.string,

    /**
     * className for this column's footer cell.
     */
    footerClassName: PropTypes.string,

    /**
     * className for each of this column's data cells.
     */
    cellClassName: PropTypes.string,

    /**
     * The cell renderer that returns React-renderable content for table cell.
     * ```
     * function(
     *   cellData: any,
     *   cellDataKey: string,
     *   rowData: object,
     *   rowIndex: number,
     *   columnData: any,
     *   width: number
     * ): ?$jsx
     * ```
     */
    cellRenderer: PropTypes.func,

    /**
     * The getter `function(string_cellDataKey, object_rowData)` that returns
     * the cell data for the `cellRenderer`.
     * If not provided, the cell data will be collected from
     * `rowData[cellDataKey]` instead. The value that `cellDataGetter` returns
     * will be used to determine whether the cell should re-render.
     */
    cellDataGetter: PropTypes.func,

    /**
     * The key to retrieve the cell data from the data row. Provided key type
     * must be either `string` or `number`. Since we use this
     * for keys, it must be specified for each column.
     */
    dataKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

    /**
     * Controls if the column is fixed when scrolling in the X axis.
     */
    fixed: PropTypes.bool,

    /**
     * The cell renderer that returns React-renderable content for table column
     * header.
     * ```
     * function(
     *   label: ?string,
     *   cellDataKey: string,
     *   columnData: any,
     *   rowData: array<?object>,
     *   width: number
     * ): ?$jsx
     * ```
     */
    headerRenderer: PropTypes.func,

    /**
     * The cell renderer that returns React-renderable content for table column
     * footer.
     * ```
     * function(
     *   label: ?string,
     *   cellDataKey: string,
     *   columnData: any,
     *   rowData: array<?object>,
     *   width: number
     * ): ?$jsx
     * ```
     */
    footerRenderer: PropTypes.func,

    /**
     * Bucket for any data to be passed into column renderer functions.
     */
    columnData: PropTypes.object,

    /**
     * The column's header label.
     */
    label: PropTypes.string,

    /**
     * The pixel width of the column.
     */
    width: PropTypes.number.isRequired,

    /**
     * If this is a resizable column this is its minimum pixel width.
     */
    minWidth: PropTypes.number,

    /**
     * If this is a resizable column this is its maximum pixel width.
     */
    maxWidth: PropTypes.number,

    /**
     * The grow factor relative to other columns. Same as the flex-grow API
     * from http://www.w3.org/TR/css3-flexbox/. Basically, take any available
     * extra width and distribute it proportionally according to all columns'
     * flexGrow values. Defaults to zero (no-flexing).
     */
    flexGrow: PropTypes.number,

    /**
     * Whether the column can be resized with the
     * FixedDataTableColumnResizeHandle. Please note that if a column
     * has a flex grow, once you resize the column this will be set to 0.
     *
     * This property only provides the UI for the column resizing. If this
     * is set to true, you will need ot se the onColumnResizeEndCallback table
     * property and render your columns appropriately.
     */
    isResizable: PropTypes.bool,

    /**
     * Experimental feature
     * Whether cells in this column can be removed from document when outside
     * of viewport as a result of horizontal scrolling.
     * Setting this property to true allows the table to not render cells in
     * particular column that are outside of viewport for visible rows. This
     * allows to create table with many columns and not have vertical scrolling
     * performance drop.
     * Setting the property to false will keep previous behaviour and keep
     * cell rendered if the row it belongs to is visible.
     */
    allowCellsRecycling: PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() /*object*/{
    return {
      allowCellsRecycling: false,
      fixed: false
    };
  },

  render: function render() {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('Component <FixedDataTableColumn /> should never render');
    }
    return null;
  }
});

module.exports = FixedDataTableColumn;
}).call(this,require('_process'))
},{"./React":51,"_process":26}],36:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableColumnGroup.react
 * @typechecks
 */

'use strict';

var React = require('./React');

var PropTypes = React.PropTypes;

/**
 * Component that defines the attributes of a table column group.
 */
var FixedDataTableColumnGroup = React.createClass({
  displayName: 'FixedDataTableColumnGroup',

  statics: {
    __TableColumnGroup__: true
  },

  propTypes: {
    /**
     * The horizontal alignment of the table cell content.
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * Controls if the column group is fixed when scrolling in the X axis.
     */
    fixed: PropTypes.bool,

    /**
     * Bucket for any data to be passed into column group renderer functions.
     */
    columnGroupData: PropTypes.object,

    /**
     * The column group's header label.
     */
    label: PropTypes.string,

    /**
     * The cell renderer that returns React-renderable content for a table
     * column group header. If it's not specified, the label from props will
     * be rendered as header content.
     * ```
     * function(
     *   label: ?string,
     *   cellDataKey: string,
     *   columnGroupData: any,
     *   rowData: array<?object>, // array of labels of all columnGroups
     *   width: number
     * ): ?$jsx
     * ```
     */
    groupHeaderRenderer: PropTypes.func
  },

  getDefaultProps: function getDefaultProps() /*object*/{
    return {
      fixed: false
    };
  },

  render: function render() {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('Component <FixedDataTableColumnGroup /> should never render');
    }
    return null;
  }
});

module.exports = FixedDataTableColumnGroup;
}).call(this,require('_process'))
},{"./React":51,"_process":26}],37:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is to be used with the FixedDataTable. It is a read line
 * that when you click on a column that is resizable appears and allows
 * you to resize the corresponding column.
 *
 * @providesModule FixedDataTableColumnResizeHandle.react
 * @typechecks
 */

'use strict';

var DOMMouseMoveTracker = require('./DOMMouseMoveTracker');
var Locale = require('./Locale');
var React = require('./React');
var ReactComponentWithPureRenderMixin = require('./ReactComponentWithPureRenderMixin');

var clamp = require('./clamp');
var cx = require('./cx');

var PropTypes = React.PropTypes;

var FixedDataTableColumnResizeHandle = React.createClass({
  displayName: 'FixedDataTableColumnResizeHandle',

  mixins: [ReactComponentWithPureRenderMixin],

  propTypes: {
    visible: PropTypes.bool.isRequired,

    /**
     * This is the height of the line
     */
    height: PropTypes.number.isRequired,

    /**
     * Offset from left border of the table, please note
     * that the line is a border on diff. So this is really the
     * offset of the column itself.
     */
    leftOffset: PropTypes.number.isRequired,

    /**
     * Height of the clickable region of the line.
     * This is assumed to be at the top of the line.
     */
    knobHeight: PropTypes.number.isRequired,

    /**
     * The line is a border on a diff, so this is essentially
     * the width of column.
     */
    initialWidth: PropTypes.number,

    /**
     * The minimum width this dragger will collapse to
     */
    minWidth: PropTypes.number,

    /**
     * The maximum width this dragger will collapse to
     */
    maxWidth: PropTypes.number,

    /**
     * Initial click event on the header cell.
     */
    initialEvent: PropTypes.object,

    /**
     * When resizing is complete this is called.
     */
    onColumnResizeEnd: PropTypes.func,

    /**
     * Column key for the column being resized.
     */
    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  },

  getInitialState: function getInitialState() /*object*/{
    return {
      width: 0,
      cursorDelta: 0
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps( /*object*/newProps) {
    if (newProps.initialEvent && !this._mouseMoveTracker.isDragging()) {
      this._mouseMoveTracker.captureMouseMoves(newProps.initialEvent);
      this.setState({
        width: newProps.initialWidth,
        cursorDelta: newProps.initialWidth
      });
    }
  },

  componentDidMount: function componentDidMount() {
    this._mouseMoveTracker = new DOMMouseMoveTracker(this._onMove, this._onColumnResizeEnd, document.body);
  },

  componentWillUnmount: function componentWillUnmount() {
    this._mouseMoveTracker.releaseMouseMoves();
    this._mouseMoveTracker = null;
  },

  render: function render() /*object*/{
    var style = {
      width: this.state.width,
      height: this.props.height
    };
    if (Locale.isRTL()) {
      style.right = this.props.leftOffset;
    } else {
      style.left = this.props.leftOffset;
    }
    return React.createElement(
      'div',
      {
        className: cx({
          'fixedDataTableColumnResizerLineLayout/main': true,
          'fixedDataTableColumnResizerLineLayout/hiddenElem': !this.props.visible,
          'public/fixedDataTableColumnResizerLine/main': true
        }),
        style: style },
      React.createElement('div', {
        className: cx('fixedDataTableColumnResizerLineLayout/mouseArea'),
        style: { height: this.props.height }
      })
    );
  },

  _onMove: function _onMove( /*number*/deltaX) {
    if (Locale.isRTL()) {
      deltaX = -deltaX;
    }
    var newWidth = this.state.cursorDelta + deltaX;
    var newColumnWidth = clamp(this.props.minWidth, newWidth, this.props.maxWidth);

    // Please note cursor delta is the different between the currently width
    // and the new width.
    this.setState({
      width: newColumnWidth,
      cursorDelta: newWidth
    });
  },

  _onColumnResizeEnd: function _onColumnResizeEnd() {
    this._mouseMoveTracker.releaseMouseMoves();
    this.props.onColumnResizeEnd(this.state.width, this.props.columnKey);
  }
});

module.exports = FixedDataTableColumnResizeHandle;
},{"./DOMMouseMoveTracker":28,"./Locale":49,"./React":51,"./ReactComponentWithPureRenderMixin":52,"./clamp":58,"./cx":60}],38:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableHelper
 * @typechecks
 */

'use strict';

var Locale = require('./Locale');
var React = require('./React');
var FixedDataTableColumnGroup = require('./FixedDataTableColumnGroup.react');
var FixedDataTableColumn = require('./FixedDataTableColumn.react');

var DIR_SIGN = Locale.isRTL() ? -1 : +1;
// A cell up to 5px outside of the visible area will still be considered visible
var CELL_VISIBILITY_TOLERANCE = 5; // used for flyouts

function renderToString(value) /*string*/{
  if (value === null || value === undefined) {
    return '';
  } else {
    return String(value);
  }
}

/**
 * Helper method to execute a callback against all columns given the children
 * of a table.
 * @param {?object|array} children
 *    Children of a table.
 * @param {function} callback
 *    Function to excecute for each column. It is passed the column.
 */
function forEachColumn(children, callback) {
  React.Children.forEach(children, function (child) {
    if (child.type === FixedDataTableColumnGroup) {
      forEachColumn(child.props.children, callback);
    } else if (child.type === FixedDataTableColumn) {
      callback(child);
    }
  });
}

/**
 * Helper method to map columns to new columns. This takes into account column
 * groups and will generate a new column group if its columns change.
 * @param {?object|array} children
 *    Children of a table.
 * @param {function} callback
 *    Function to excecute for each column. It is passed the column and should
 *    return a result column.
 */
function mapColumns(children, callback) {
  var newChildren = [];
  React.Children.forEach(children, function (originalChild) {
    var newChild = originalChild;

    // The child is either a column group or a column. If it is a column group
    // we need to iterate over its columns and then potentially generate a
    // new column group
    if (originalChild.type === FixedDataTableColumnGroup) {
      var haveColumnsChanged = false;
      var newColumns = [];

      forEachColumn(originalChild.props.children, function (originalcolumn) {
        var newColumn = callback(originalcolumn);
        if (newColumn !== originalcolumn) {
          haveColumnsChanged = true;
        }
        newColumns.push(newColumn);
      });

      // If the column groups columns have changed clone the group and supply
      // new children
      if (haveColumnsChanged) {
        newChild = React.cloneElement(originalChild, {
          children: newColumns
        });
      }
    } else if (originalChild.type === FixedDataTableColumn) {
      newChild = callback(originalChild);
    }

    newChildren.push(newChild);
  });

  return newChildren;
}

var FixedDataTableHelper = {
  DIR_SIGN: DIR_SIGN,
  CELL_VISIBILITY_TOLERANCE: CELL_VISIBILITY_TOLERANCE,
  renderToString: renderToString,
  forEachColumn: forEachColumn,
  mapColumns: mapColumns
};

module.exports = FixedDataTableHelper;
},{"./FixedDataTableColumn.react":35,"./FixedDataTableColumnGroup.react":36,"./Locale":49,"./React":51}],39:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableRoot
 */

'use strict';

var FixedDataTable = require('./FixedDataTable.react');
var FixedDataTableColumn = require('./FixedDataTableColumn.react');
var FixedDataTableColumnGroup = require('./FixedDataTableColumnGroup.react');

var FixedDataTableRoot = {
  Column: FixedDataTableColumn,
  ColumnGroup: FixedDataTableColumnGroup,
  Table: FixedDataTable
};

FixedDataTableRoot.version = '0.4.6';

module.exports = FixedDataTableRoot;
},{"./FixedDataTable.react":31,"./FixedDataTableColumn.react":35,"./FixedDataTableColumnGroup.react":36}],40:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableRow.react
 * @typechecks
 */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('./React');
var ReactComponentWithPureRenderMixin = require('./ReactComponentWithPureRenderMixin');
var FixedDataTableCellGroup = require('./FixedDataTableCellGroup.react');

var cx = require('./cx');
var joinClasses = require('./joinClasses');
var translateDOMPositionXY = require('./translateDOMPositionXY');

var PropTypes = React.PropTypes;

/**
 * Component that renders the row for <FixedDataTable />.
 * This component should not be used directly by developer. Instead,
 * only <FixedDataTable /> should use the component internally.
 */
var FixedDataTableRowImpl = React.createClass({
  displayName: 'FixedDataTableRowImpl',

  mixins: [ReactComponentWithPureRenderMixin],

  propTypes: {
    /**
     * The row data to render. The data format can be a simple Map object
     * or an Array of data.
     */
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

    /**
     * Array of <FixedDataTableColumn /> for the fixed columns.
     */
    fixedColumns: PropTypes.array.isRequired,

    /**
     * Height of the row.
     */
    height: PropTypes.number.isRequired,

    /**
     * The row index.
     */
    index: PropTypes.number.isRequired,

    /**
     * Array of <FixedDataTableColumn /> for the scrollable columns.
     */
    scrollableColumns: PropTypes.array.isRequired,

    /**
     * The distance between the left edge of the table and the leftmost portion
     * of the row currently visible in the table.
     */
    scrollLeft: PropTypes.number.isRequired,

    /**
     * Width of the row.
     */
    width: PropTypes.number.isRequired,

    /**
     * Fire when a row is clicked.
     */
    onClick: PropTypes.func,

    /**
     * Fire when a row is double clicked.
     */
    onDoubleClick: PropTypes.func,

    /**
     * Callback for when resizer knob (in FixedDataTableCell) is clicked
     * to initialize resizing. Please note this is only on the cells
     * in the header.
     * @param number combinedWidth
     * @param number leftOffset
     * @param number cellWidth
     * @param number|string columnKey
     * @param object event
     */
    onColumnResize: PropTypes.func
  },

  render: function render() /*object*/{
    var style = {
      width: this.props.width,
      height: this.props.height
    };

    var className = cx({
      'fixedDataTableRowLayout/main': true,
      'public/fixedDataTableRow/main': true,
      'public/fixedDataTableRow/highlighted': this.props.index % 2 === 1,
      'public/fixedDataTableRow/odd': this.props.index % 2 === 1,
      'public/fixedDataTableRow/even': this.props.index % 2 === 0
    });

    var isHeaderOrFooterRow = this.props.index === -1;
    if (!this.props.data && !isHeaderOrFooterRow) {
      return React.createElement('div', {
        className: joinClasses(className, this.props.className),
        style: style
      });
    }

    var fixedColumnsWidth = this._getColumnsWidth(this.props.fixedColumns);
    var fixedColumns = React.createElement(FixedDataTableCellGroup, {
      key: 'fixed_cells',
      height: this.props.height,
      left: 0,
      width: fixedColumnsWidth,
      zIndex: 2,
      columns: this.props.fixedColumns,
      data: this.props.data,
      onColumnResize: this.props.onColumnResize,
      rowHeight: this.props.height,
      rowIndex: this.props.index
    });
    var columnsShadow = this._renderColumnsShadow(fixedColumnsWidth);
    var scrollableColumns = React.createElement(FixedDataTableCellGroup, {
      key: 'scrollable_cells',
      height: this.props.height,
      left: this.props.scrollLeft,
      offsetLeft: fixedColumnsWidth,
      width: this.props.width - fixedColumnsWidth,
      zIndex: 0,
      columns: this.props.scrollableColumns,
      data: this.props.data,
      onColumnResize: this.props.onColumnResize,
      rowHeight: this.props.height,
      rowIndex: this.props.index
    });

    return React.createElement(
      'div',
      {
        className: joinClasses(className, this.props.className),
        onClick: this.props.onClick ? this._onClick : null,
        onDoubleClick: this.props.onDoubleClick ? this._onDoubleClick : null,
        onMouseDown: this.props.onMouseDown ? this._onMouseDown : null,
        onMouseEnter: this.props.onMouseEnter ? this._onMouseEnter : null,
        onMouseLeave: this.props.onMouseLeave ? this._onMouseLeave : null,
        style: style },
      React.createElement(
        'div',
        { className: cx('fixedDataTableRowLayout/body') },
        fixedColumns,
        scrollableColumns,
        columnsShadow
      )
    );
  },

  _getColumnsWidth: function _getColumnsWidth( /*array*/columns) /*number*/{
    var width = 0;
    for (var i = 0; i < columns.length; ++i) {
      width += columns[i].props.width;
    }
    return width;
  },

  _renderColumnsShadow: function _renderColumnsShadow( /*number*/left) /*?object*/{
    if (left > 0) {
      var className = cx({
        'fixedDataTableRowLayout/fixedColumnsDivider': true,
        'fixedDataTableRowLayout/columnsShadow': this.props.scrollLeft > 0,
        'public/fixedDataTableRow/fixedColumnsDivider': true,
        'public/fixedDataTableRow/columnsShadow': this.props.scrollLeft > 0
      });
      var style = {
        left: left,
        height: this.props.height
      };
      return React.createElement('div', { className: className, style: style });
    }
  },

  _onClick: function _onClick( /*object*/event) {
    this.props.onClick(event, this.props.index, this.props.data);
  },

  _onDoubleClick: function _onDoubleClick( /*object*/event) {
    this.props.onDoubleClick(event, this.props.index, this.props.data);
  },

  _onMouseDown: function _onMouseDown( /*object*/event) {
    this.props.onMouseDown(event, this.props.index, this.props.data);
  },

  _onMouseEnter: function _onMouseEnter( /*object*/event) {
    this.props.onMouseEnter(event, this.props.index, this.props.data);
  },

  _onMouseLeave: function _onMouseLeave( /*object*/event) {
    this.props.onMouseLeave(event, this.props.index, this.props.data);
  }
});

var FixedDataTableRow = React.createClass({
  displayName: 'FixedDataTableRow',

  mixins: [ReactComponentWithPureRenderMixin],

  propTypes: {
    /**
     * Height of the row.
     */
    height: PropTypes.number.isRequired,

    /**
     * Z-index on which the row will be displayed. Used e.g. for keeping
     * header and footer in front of other rows.
     */
    zIndex: PropTypes.number,

    /**
     * The vertical position where the row should render itself
     */
    offsetTop: PropTypes.number.isRequired,

    /**
     * Width of the row.
     */
    width: PropTypes.number.isRequired
  },

  render: function render() /*object*/{
    var style = {
      width: this.props.width,
      height: this.props.height,
      zIndex: this.props.zIndex ? this.props.zIndex : 0
    };
    translateDOMPositionXY(style, 0, this.props.offsetTop);

    return React.createElement(
      'div',
      {
        style: style,
        className: cx('fixedDataTableRowLayout/rowWrapper') },
      React.createElement(FixedDataTableRowImpl, _extends({}, this.props, {
        offsetTop: undefined,
        zIndex: undefined
      }))
    );
  }
});

module.exports = FixedDataTableRow;
},{"./FixedDataTableCellGroup.react":34,"./React":51,"./ReactComponentWithPureRenderMixin":52,"./cx":60,"./joinClasses":67,"./translateDOMPositionXY":75}],41:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableRowBuffer
 * @typechecks
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var IntegerBufferSet = require('./IntegerBufferSet');

var clamp = require('./clamp');
var invariant = require('./invariant');
var MIN_BUFFER_ROWS = 3;
var MAX_BUFFER_ROWS = 6;

// FixedDataTableRowBuffer is a helper class that executes row buffering
// logic for FixedDataTable. It figures out which rows should be rendered
// and in which positions.

var FixedDataTableRowBuffer = (function () {
  function FixedDataTableRowBuffer(
  /*number*/rowsCount,
  /*number*/defaultRowHeight,
  /*number*/viewportHeight,
  /*?function*/rowHeightGetter) {
    _classCallCheck(this, FixedDataTableRowBuffer);

    invariant(defaultRowHeight !== 0, "defaultRowHeight musn't be equal 0 in FixedDataTableRowBuffer");

    this._bufferSet = new IntegerBufferSet();
    this._defaultRowHeight = defaultRowHeight;
    this._viewportRowsBegin = 0;
    this._viewportRowsEnd = 0;
    this._maxVisibleRowCount = Math.ceil(viewportHeight / defaultRowHeight) + 1;
    this._bufferRowsCount = clamp(MIN_BUFFER_ROWS, Math.floor(this._maxVisibleRowCount / 2), MAX_BUFFER_ROWS);
    this._rowsCount = rowsCount;
    this._rowHeightGetter = rowHeightGetter;
    this._rows = [];
    this._viewportHeight = viewportHeight;

    this.getRows = this.getRows.bind(this);
    this.getRowsWithUpdatedBuffer = this.getRowsWithUpdatedBuffer.bind(this);
  }

  _createClass(FixedDataTableRowBuffer, [{
    key: 'getRowsWithUpdatedBuffer',
    value: function getRowsWithUpdatedBuffer() /*array*/{
      var remainingBufferRows = 2 * this._bufferRowsCount;
      var bufferRowIndex = Math.max(this._viewportRowsBegin - this._bufferRowsCount, 0);
      while (bufferRowIndex < this._viewportRowsBegin) {
        this._addRowToBuffer(bufferRowIndex, this._viewportRowsBegin, this._viewportRowsEnd - 1);
        bufferRowIndex++;
        remainingBufferRows--;
      }
      bufferRowIndex = this._viewportRowsEnd;
      while (bufferRowIndex < this._rowsCount && remainingBufferRows > 0) {
        this._addRowToBuffer(bufferRowIndex, this._viewportRowsBegin, this._viewportRowsEnd - 1);
        bufferRowIndex++;
        remainingBufferRows--;
      }
      return this._rows;
    }
  }, {
    key: 'getRows',
    value: function getRows(
    /*number*/firstRowIndex,
    /*number*/firstRowOffset) /*array*/{
      var top = firstRowOffset;
      var totalHeight = top;
      var rowIndex = firstRowIndex;
      var endIndex = Math.min(firstRowIndex + this._maxVisibleRowCount, this._rowsCount);

      this._viewportRowsBegin = firstRowIndex;
      while (rowIndex < endIndex || totalHeight < this._viewportHeight && rowIndex < this._rowsCount) {
        this._addRowToBuffer(rowIndex, firstRowIndex, endIndex - 1);
        totalHeight += this._rowHeightGetter(rowIndex);
        ++rowIndex;
        // Store index after the last viewport row as end, to be able to
        // distinguish when there are no rows rendered in viewport
        this._viewportRowsEnd = rowIndex;
      }

      return this._rows;
    }
  }, {
    key: '_addRowToBuffer',
    value: function _addRowToBuffer(
    /*number*/rowIndex,
    /*number*/firstViewportRowIndex,
    /*number*/lastViewportRowIndex) {
      var rowPosition = this._bufferSet.getValuePosition(rowIndex);
      var viewportRowsCount = lastViewportRowIndex - firstViewportRowIndex + 1;
      var allowedRowsCount = viewportRowsCount + this._bufferRowsCount * 2;
      if (rowPosition === null && this._bufferSet.getSize() >= allowedRowsCount) {
        rowPosition = this._bufferSet.replaceFurthestValuePosition(firstViewportRowIndex, lastViewportRowIndex, rowIndex);
      }
      if (rowPosition === null) {
        // We can't reuse any of existing positions for this row. We have to
        // create new position
        rowPosition = this._bufferSet.getNewPositionForValue(rowIndex);
        this._rows[rowPosition] = rowIndex;
      } else {
        // This row already is in the table with rowPosition position or it
        // can replace row that is in that position
        this._rows[rowPosition] = rowIndex;
      }
    }
  }]);

  return FixedDataTableRowBuffer;
})();

module.exports = FixedDataTableRowBuffer;
},{"./IntegerBufferSet":47,"./clamp":58,"./invariant":64}],42:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableScrollHelper
 * @typechecks
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PrefixIntervalTree = require('./PrefixIntervalTree');
var clamp = require('./clamp');

var BUFFER_ROWS = 5;
var NO_ROWS_SCROLL_RESULT = {
  index: 0,
  offset: 0,
  position: 0,
  contentHeight: 0
};

var FixedDataTableScrollHelper = (function () {
  function FixedDataTableScrollHelper(
  /*number*/rowCount,
  /*number*/defaultRowHeight,
  /*number*/viewportHeight,
  /*?function*/rowHeightGetter) {
    _classCallCheck(this, FixedDataTableScrollHelper);

    this._rowOffsets = PrefixIntervalTree.uniform(rowCount, defaultRowHeight);
    this._storedHeights = new Array(rowCount);
    for (var i = 0; i < rowCount; ++i) {
      this._storedHeights[i] = defaultRowHeight;
    }
    this._rowCount = rowCount;
    this._position = 0;
    this._contentHeight = rowCount * defaultRowHeight;
    this._defaultRowHeight = defaultRowHeight;
    this._rowHeightGetter = rowHeightGetter ? rowHeightGetter : function () {
      return defaultRowHeight;
    };
    this._viewportHeight = viewportHeight;
    this.scrollRowIntoView = this.scrollRowIntoView.bind(this);
    this.setViewportHeight = this.setViewportHeight.bind(this);
    this.scrollBy = this.scrollBy.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scrollToRow = this.scrollToRow.bind(this);
    this.setRowHeightGetter = this.setRowHeightGetter.bind(this);
    this.getContentHeight = this.getContentHeight.bind(this);
    this.getRowPosition = this.getRowPosition.bind(this);

    this._updateHeightsInViewport(0, 0);
  }

  _createClass(FixedDataTableScrollHelper, [{
    key: 'setRowHeightGetter',
    value: function setRowHeightGetter( /*function*/rowHeightGetter) {
      this._rowHeightGetter = rowHeightGetter;
    }
  }, {
    key: 'setViewportHeight',
    value: function setViewportHeight( /*number*/viewportHeight) {
      this._viewportHeight = viewportHeight;
    }
  }, {
    key: 'getContentHeight',
    value: function getContentHeight() /*number*/{
      return this._contentHeight;
    }
  }, {
    key: '_updateHeightsInViewport',
    value: function _updateHeightsInViewport(
    /*number*/firstRowIndex,
    /*number*/firstRowOffset) {
      var top = firstRowOffset;
      var index = firstRowIndex;
      while (top <= this._viewportHeight && index < this._rowCount) {
        this._updateRowHeight(index);
        top += this._storedHeights[index];
        index++;
      }
    }
  }, {
    key: '_updateHeightsAboveViewport',
    value: function _updateHeightsAboveViewport( /*number*/firstRowIndex) {
      var index = firstRowIndex - 1;
      while (index >= 0 && index >= firstRowIndex - BUFFER_ROWS) {
        var delta = this._updateRowHeight(index);
        this._position += delta;
        index--;
      }
    }
  }, {
    key: '_updateRowHeight',
    value: function _updateRowHeight( /*number*/rowIndex) /*number*/{
      if (rowIndex < 0 || rowIndex >= this._rowCount) {
        return 0;
      }
      var newHeight = this._rowHeightGetter(rowIndex);
      if (newHeight !== this._storedHeights[rowIndex]) {
        var change = newHeight - this._storedHeights[rowIndex];
        this._rowOffsets.set(rowIndex, newHeight);
        this._storedHeights[rowIndex] = newHeight;
        this._contentHeight += change;
        return change;
      }
      return 0;
    }
  }, {
    key: 'getRowPosition',
    value: function getRowPosition( /*number*/rowIndex) /*number*/{
      this._updateRowHeight(rowIndex);
      return this._rowOffsets.sumUntil(rowIndex);
    }
  }, {
    key: 'scrollBy',
    value: function scrollBy( /*number*/delta) /*object*/{
      if (this._rowCount === 0) {
        return NO_ROWS_SCROLL_RESULT;
      }
      var firstRow = this._rowOffsets.greatestLowerBound(this._position);
      firstRow = clamp(0, firstRow, Math.max(this._rowCount - 1, 0));
      var firstRowPosition = this._rowOffsets.sumUntil(firstRow);
      var rowIndex = firstRow;
      var position = this._position;

      var rowHeightChange = this._updateRowHeight(rowIndex);
      if (firstRowPosition !== 0) {
        position += rowHeightChange;
      }
      var visibleRowHeight = this._storedHeights[rowIndex] - (position - firstRowPosition);

      if (delta >= 0) {

        while (delta > 0 && rowIndex < this._rowCount) {
          if (delta < visibleRowHeight) {
            position += delta;
            delta = 0;
          } else {
            delta -= visibleRowHeight;
            position += visibleRowHeight;
            rowIndex++;
          }
          if (rowIndex < this._rowCount) {
            this._updateRowHeight(rowIndex);
            visibleRowHeight = this._storedHeights[rowIndex];
          }
        }
      } else if (delta < 0) {
        delta = -delta;
        var invisibleRowHeight = this._storedHeights[rowIndex] - visibleRowHeight;

        while (delta > 0 && rowIndex >= 0) {
          if (delta < invisibleRowHeight) {
            position -= delta;
            delta = 0;
          } else {
            position -= invisibleRowHeight;
            delta -= invisibleRowHeight;
            rowIndex--;
          }
          if (rowIndex >= 0) {
            var change = this._updateRowHeight(rowIndex);
            invisibleRowHeight = this._storedHeights[rowIndex];
            position += change;
          }
        }
      }

      var maxPosition = this._contentHeight - this._viewportHeight;
      position = clamp(0, position, maxPosition);
      this._position = position;
      var firstRowIndex = this._rowOffsets.greatestLowerBound(position);
      firstRowIndex = clamp(0, firstRowIndex, Math.max(this._rowCount - 1, 0));
      firstRowPosition = this._rowOffsets.sumUntil(firstRowIndex);
      var firstRowOffset = firstRowPosition - position;

      this._updateHeightsInViewport(firstRowIndex, firstRowOffset);
      this._updateHeightsAboveViewport(firstRowIndex);

      return {
        index: firstRowIndex,
        offset: firstRowOffset,
        position: this._position,
        contentHeight: this._contentHeight
      };
    }
  }, {
    key: '_getRowAtEndPosition',
    value: function _getRowAtEndPosition( /*number*/rowIndex) /*number*/{
      // We need to update enough rows above the selected one to be sure that when
      // we scroll to selected position all rows between first shown and selected
      // one have most recent heights computed and will not resize
      this._updateRowHeight(rowIndex);
      var currentRowIndex = rowIndex;
      var top = this._storedHeights[currentRowIndex];
      while (top < this._viewportHeight && currentRowIndex >= 0) {
        currentRowIndex--;
        if (currentRowIndex >= 0) {
          this._updateRowHeight(currentRowIndex);
          top += this._storedHeights[currentRowIndex];
        }
      }
      var position = this._rowOffsets.sumTo(rowIndex) - this._viewportHeight;
      if (position < 0) {
        position = 0;
      }
      return position;
    }
  }, {
    key: 'scrollTo',
    value: function scrollTo( /*number*/position) /*object*/{
      if (this._rowCount === 0) {
        return NO_ROWS_SCROLL_RESULT;
      }
      if (position <= 0) {
        // If position less than or equal to 0 first row should be fully visible
        // on top
        this._position = 0;
        this._updateHeightsInViewport(0, 0);

        return {
          index: 0,
          offset: 0,
          position: this._position,
          contentHeight: this._contentHeight
        };
      } else if (position >= this._contentHeight - this._viewportHeight) {
        // If position is equal to or greater than max scroll value, we need
        // to make sure to have bottom border of last row visible.
        var rowIndex = this._rowCount - 1;
        position = this._getRowAtEndPosition(rowIndex);
      }
      this._position = position;

      var firstRowIndex = this._rowOffsets.greatestLowerBound(position);
      firstRowIndex = clamp(0, firstRowIndex, Math.max(this._rowCount - 1, 0));
      var firstRowPosition = this._rowOffsets.sumUntil(firstRowIndex);
      var firstRowOffset = firstRowPosition - position;

      this._updateHeightsInViewport(firstRowIndex, firstRowOffset);
      this._updateHeightsAboveViewport(firstRowIndex);

      return {
        index: firstRowIndex,
        offset: firstRowOffset,
        position: this._position,
        contentHeight: this._contentHeight
      };
    }

    /**
     * Allows to scroll to selected row with specified offset. It always
     * brings that row to top of viewport with that offset
     */
  }, {
    key: 'scrollToRow',
    value: function scrollToRow( /*number*/rowIndex, /*number*/offset) /*object*/{
      rowIndex = clamp(0, rowIndex, Math.max(this._rowCount - 1, 0));
      offset = clamp(-this._storedHeights[rowIndex], offset, 0);
      var firstRow = this._rowOffsets.sumUntil(rowIndex);
      return this.scrollTo(firstRow - offset);
    }

    /**
     * Allows to scroll to selected row by bringing it to viewport with minimal
     * scrolling. This that if row is fully visible, scroll will not be changed.
     * If top border of row is above top of viewport it will be scrolled to be
     * fully visible on the top of viewport. If the bottom border of row is
     * below end of viewport, it will be scrolled up to be fully visible on the
     * bottom of viewport.
     */
  }, {
    key: 'scrollRowIntoView',
    value: function scrollRowIntoView( /*number*/rowIndex) /*object*/{
      rowIndex = clamp(0, rowIndex, Math.max(this._rowCount - 1, 0));
      var rowBegin = this._rowOffsets.sumUntil(rowIndex);
      var rowEnd = rowBegin + this._storedHeights[rowIndex];
      if (rowBegin < this._position) {
        return this.scrollTo(rowBegin);
      } else if (this._position + this._viewportHeight < rowEnd) {
        var position = this._getRowAtEndPosition(rowIndex);
        return this.scrollTo(position);
      }
      return this.scrollTo(this._position);
    }
  }]);

  return FixedDataTableScrollHelper;
})();

module.exports = FixedDataTableScrollHelper;
},{"./PrefixIntervalTree":50,"./clamp":58}],43:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableWidthHelper
 * @typechecks
 */

'use strict';

var React = require('./React');

function getTotalWidth( /*array*/columns) /*number*/{
  var totalWidth = 0;
  for (var i = 0; i < columns.length; ++i) {
    totalWidth += columns[i].props.width;
  }
  return totalWidth;
}

function getTotalFlexGrow( /*array*/columns) /*number*/{
  var totalFlexGrow = 0;
  for (var i = 0; i < columns.length; ++i) {
    totalFlexGrow += columns[i].props.flexGrow || 0;
  }
  return totalFlexGrow;
}

function distributeFlexWidth(
/*array*/columns,
/*number*/flexWidth) /*object*/{
  if (flexWidth <= 0) {
    return {
      columns: columns,
      width: getTotalWidth(columns)
    };
  }
  var remainingFlexGrow = getTotalFlexGrow(columns);
  var remainingFlexWidth = flexWidth;
  var newColumns = [];
  var totalWidth = 0;
  for (var i = 0; i < columns.length; ++i) {
    var column = columns[i];
    if (!column.props.flexGrow) {
      totalWidth += column.props.width;
      newColumns.push(column);
      continue;
    }
    var columnFlexWidth = Math.floor(column.props.flexGrow / remainingFlexGrow * remainingFlexWidth);
    var newColumnWidth = Math.floor(column.props.width + columnFlexWidth);
    totalWidth += newColumnWidth;

    remainingFlexGrow -= column.props.flexGrow;
    remainingFlexWidth -= columnFlexWidth;

    newColumns.push(React.cloneElement(column, { width: newColumnWidth }));
  }

  return {
    columns: newColumns,
    width: totalWidth
  };
}

function adjustColumnGroupWidths(
/*array*/columnGroups,
/*number*/expectedWidth) /*object*/{
  var allColumns = [];
  var i;
  for (i = 0; i < columnGroups.length; ++i) {
    React.Children.forEach(columnGroups[i].props.children, function (column) {
      allColumns.push(column);
    });
  }
  var columnsWidth = getTotalWidth(allColumns);
  var remainingFlexGrow = getTotalFlexGrow(allColumns);
  var remainingFlexWidth = Math.max(expectedWidth - columnsWidth, 0);

  var newAllColumns = [];
  var newColumnGroups = [];

  for (i = 0; i < columnGroups.length; ++i) {
    var columnGroup = columnGroups[i];
    var currentColumns = [];

    React.Children.forEach(columnGroup.props.children, function (column) {
      currentColumns.push(column);
    });

    var columnGroupFlexGrow = getTotalFlexGrow(currentColumns);
    var columnGroupFlexWidth = Math.floor(columnGroupFlexGrow / remainingFlexGrow * remainingFlexWidth);

    var newColumnSettings = distributeFlexWidth(currentColumns, columnGroupFlexWidth);

    remainingFlexGrow -= columnGroupFlexGrow;
    remainingFlexWidth -= columnGroupFlexWidth;

    for (var j = 0; j < newColumnSettings.columns.length; ++j) {
      newAllColumns.push(newColumnSettings.columns[j]);
    }

    newColumnGroups.push(React.cloneElement(columnGroup, { width: newColumnSettings.width }));
  }

  return {
    columns: newAllColumns,
    columnGroups: newColumnGroups
  };
}

function adjustColumnWidths(
/*array*/columns,
/*number*/expectedWidth) /*array*/{
  var columnsWidth = getTotalWidth(columns);
  if (columnsWidth < expectedWidth) {
    return distributeFlexWidth(columns, expectedWidth - columnsWidth).columns;
  }
  return columns;
}

var FixedDataTableWidthHelper = {
  getTotalWidth: getTotalWidth,
  getTotalFlexGrow: getTotalFlexGrow,
  distributeFlexWidth: distributeFlexWidth,
  adjustColumnWidths: adjustColumnWidths,
  adjustColumnGroupWidths: adjustColumnGroupWidths
};

module.exports = FixedDataTableWidthHelper;
},{"./React":51}],44:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Heap
 * @typechecks
 * @preventMunge
 */

'use strict';

/*
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function defaultComparator(a, b) {
  return a < b;
}

var Heap = (function () {
  function Heap(items, comparator) {
    _classCallCheck(this, Heap);

    this._items = items || [];
    this._size = this._items.length;
    this._comparator = comparator || defaultComparator;
    this._heapify();
  }

  /*
   * @return {boolean}
   */

  _createClass(Heap, [{
    key: 'empty',
    value: function empty() {
      return this._size === 0;
    }

    /*
     * @return {*}
     */
  }, {
    key: 'pop',
    value: function pop() {
      if (this._size === 0) {
        return;
      }

      var elt = this._items[0];

      var lastElt = this._items.pop();
      this._size--;

      if (this._size > 0) {
        this._items[0] = lastElt;
        this._sinkDown(0);
      }

      return elt;
    }

    /*
     * @param {*} item
     */
  }, {
    key: 'push',
    value: function push(item) {
      this._items[this._size++] = item;
      this._bubbleUp(this._size - 1);
    }

    /*
     * @return {number}
     */
  }, {
    key: 'size',
    value: function size() {
      return this._size;
    }

    /*
     * @return {*}
     */
  }, {
    key: 'peek',
    value: function peek() {
      if (this._size === 0) {
        return;
      }

      return this._items[0];
    }
  }, {
    key: '_heapify',
    value: function _heapify() {
      for (var index = Math.floor((this._size + 1) / 2); index >= 0; index--) {
        this._sinkDown(index);
      }
    }

    /*
     * @parent {number} index
     */
  }, {
    key: '_bubbleUp',
    value: function _bubbleUp(index) {
      var elt = this._items[index];
      while (index > 0) {
        var parentIndex = Math.floor((index + 1) / 2) - 1;
        var parentElt = this._items[parentIndex];

        // if parentElt < elt, stop
        if (this._comparator(parentElt, elt)) {
          return;
        }

        // swap
        this._items[parentIndex] = elt;
        this._items[index] = parentElt;
        index = parentIndex;
      }
    }

    /*
     * @parent {number} index
     */
  }, {
    key: '_sinkDown',
    value: function _sinkDown(index) {
      var elt = this._items[index];

      while (true) {
        var leftChildIndex = 2 * (index + 1) - 1;
        var rightChildIndex = 2 * (index + 1);
        var swapIndex = -1;

        if (leftChildIndex < this._size) {
          var leftChild = this._items[leftChildIndex];
          if (this._comparator(leftChild, elt)) {
            swapIndex = leftChildIndex;
          }
        }

        if (rightChildIndex < this._size) {
          var rightChild = this._items[rightChildIndex];
          if (this._comparator(rightChild, elt)) {
            if (swapIndex === -1 || this._comparator(rightChild, this._items[swapIndex])) {
              swapIndex = rightChildIndex;
            }
          }
        }

        // if we don't have a swap, stop
        if (swapIndex === -1) {
          return;
        }

        this._items[index] = this._items[swapIndex];
        this._items[swapIndex] = elt;
        index = swapIndex;
      }
    }
  }]);

  return Heap;
})();

module.exports = Heap;
},{}],45:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ImmutableObject
 * @typechecks
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImmutableValue = require('./ImmutableValue');

var invariant = require('./invariant');
var keyOf = require('./keyOf');
var mergeHelpers = require('./mergeHelpers');

var checkMergeObjectArgs = mergeHelpers.checkMergeObjectArgs;
var isTerminal = mergeHelpers.isTerminal;

var SECRET_KEY = keyOf({ _DONT_EVER_TYPE_THIS_SECRET_KEY: null });

/**
 * Static methods creating and operating on instances of `ImmutableValue`.
 */
function assertImmutable(immutable) {
  invariant(immutable instanceof ImmutableValue, 'ImmutableObject: Attempted to set fields on an object that is not an ' + 'instance of ImmutableValue.');
}

/**
 * Static methods for reasoning about instances of `ImmutableObject`. Execute
 * the freeze commands in `process.env.NODE_ENV !== 'production'` mode to alert the programmer that something
 * is attempting to mutate. Since freezing is very expensive, we avoid doing it
 * at all in production.
 */

var ImmutableObject = (function (_ImmutableValue) {
  _inherits(ImmutableObject, _ImmutableValue);

  /**
   * @arguments {array<object>} The arguments is an array of objects that, when
   * merged together, will form the immutable objects.
   */

  function ImmutableObject() {
    _classCallCheck(this, ImmutableObject);

    _get(Object.getPrototypeOf(ImmutableObject.prototype), 'constructor', this).call(this, ImmutableValue[SECRET_KEY]);
    ImmutableValue.mergeAllPropertiesInto(this, arguments);
    if (process.env.NODE_ENV !== 'production') {
      ImmutableValue.deepFreezeRootNode(this);
    }
  }

  /**
   * DEPRECATED - prefer to instantiate with new ImmutableObject().
   *
   * @arguments {array<object>} The arguments is an array of objects that, when
   * merged together, will form the immutable objects.
   */

  _createClass(ImmutableObject, null, [{
    key: 'create',
    value: function create() {
      var obj = Object.create(ImmutableObject.prototype);
      ImmutableObject.apply(obj, arguments);
      return obj;
    }

    /**
     * Returns a new `ImmutableValue` that is identical to the supplied
     * `ImmutableValue` but with the specified changes, `put`. Any keys that are
     * in the intersection of `immutable` and `put` retain the ordering of
     * `immutable`. New keys are placed after keys that exist in `immutable`.
     *
     * @param {ImmutableValue} immutable Starting object.
     * @param {?object} put Fields to merge into the object.
     * @return {ImmutableValue} The result of merging in `put` fields.
     */
  }, {
    key: 'set',
    value: function set(immutable, put) {
      assertImmutable(immutable);
      invariant(typeof put === 'object' && put !== undefined && !Array.isArray(put), 'Invalid ImmutableMap.set argument `put`');
      return new ImmutableObject(immutable, put);
    }

    /**
     * Sugar for `ImmutableObject.set(ImmutableObject, {fieldName: putField})`.
     * Look out for key crushing: Use `keyOf()` to guard against it.
     *
     * @param {ImmutableValue} immutableObject Object on which to set properties.
     * @param {string} fieldName Name of the field to set.
     * @param {*} putField Value of the field to set.
     * @return {ImmutableValue} new ImmutableValue as described in `set`.
     */
  }, {
    key: 'setProperty',
    value: function setProperty(immutableObject, fieldName, putField) {
      var put = {};
      put[fieldName] = putField;
      return ImmutableObject.set(immutableObject, put);
    }

    /**
     * Returns a new immutable object with the given field name removed.
     * Look out for key crushing: Use `keyOf()` to guard against it.
     *
     * @param {ImmutableObject} immutableObject from which to delete the key.
     * @param {string} droppedField Name of the field to delete.
     * @return {ImmutableObject} new ImmutableObject without the key
     */
  }, {
    key: 'deleteProperty',
    value: function deleteProperty(immutableObject, droppedField) {
      var copy = {};
      for (var key in immutableObject) {
        if (key !== droppedField && immutableObject.hasOwnProperty(key)) {
          copy[key] = immutableObject[key];
        }
      }
      return new ImmutableObject(copy);
    }

    /**
     * Returns a new `ImmutableValue` that is identical to the supplied object but
     * with the supplied changes recursively applied.
     *
     * Experimental. Likely does not handle `Arrays` correctly.
     *
     * @param {ImmutableValue} immutable Object on which to set fields.
     * @param {object} put Fields to merge into the object.
     * @return {ImmutableValue} The result of merging in `put` fields.
     */
  }, {
    key: 'setDeep',
    value: function setDeep(immutable, put) {
      assertImmutable(immutable);
      return _setDeep(immutable, put);
    }

    /**
     * Retrieves an ImmutableObject's values as an array.
     *
     * @param {ImmutableValue} immutable
     * @return {array}
     */
  }, {
    key: 'values',
    value: function values(immutable) {
      return Object.keys(immutable).map(function (key) {
        return immutable[key];
      });
    }
  }]);

  return ImmutableObject;
})(ImmutableValue);

function _setDeep(obj, put) {
  checkMergeObjectArgs(obj, put);
  var totalNewFields = {};

  // To maintain the order of the keys, copy the base object's entries first.
  var keys = Object.keys(obj);
  for (var ii = 0; ii < keys.length; ii++) {
    var key = keys[ii];
    if (!put.hasOwnProperty(key)) {
      totalNewFields[key] = obj[key];
    } else if (isTerminal(obj[key]) || isTerminal(put[key])) {
      totalNewFields[key] = put[key];
    } else {
      totalNewFields[key] = _setDeep(obj[key], put[key]);
    }
  }

  // Apply any new keys that the base obj didn't have.
  var newKeys = Object.keys(put);
  for (ii = 0; ii < newKeys.length; ii++) {
    var newKey = newKeys[ii];
    if (obj.hasOwnProperty(newKey)) {
      continue;
    }
    totalNewFields[newKey] = put[newKey];
  }

  return obj instanceof ImmutableValue ? new ImmutableObject(totalNewFields) : put instanceof ImmutableValue ? new ImmutableObject(totalNewFields) : totalNewFields;
}

module.exports = ImmutableObject;
}).call(this,require('_process'))
},{"./ImmutableValue":46,"./invariant":64,"./keyOf":69,"./mergeHelpers":70,"_process":26}],46:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ImmutableValue
 * @typechecks
 */

'use strict';

var invariant = require('./invariant');
var isNode = require('./isNode');
var keyOf = require('./keyOf');

var SECRET_KEY = keyOf({ _DONT_EVER_TYPE_THIS_SECRET_KEY: null });

/**
 * `ImmutableValue` provides a guarantee of immutability at developer time when
 * strict mode is used. The extra computations required to enforce immutability
 * are stripped out in production for performance reasons. `ImmutableValue`
 * guarantees to enforce immutability for enumerable, own properties. This
 * allows easy wrapping of `ImmutableValue` with the ability to store
 * non-enumerable properties on the instance that only your static methods
 * reason about. In order to achieve IE8 compatibility (which doesn't have the
 * ability to define non-enumerable properties), modules that want to build
 * their own reasoning of `ImmutableValue`s and store computations can define
 * their non-enumerable properties under the name `toString`, and in IE8 only
 * define a standard property called `toString` which will mistakenly be
 * considered not enumerable due to its name (but only in IE8). The only
 * limitation is that no one can store their own `toString` property.
 * https://developer.mozilla.org/en-US/docs/ECMAScript_DontEnum_attribute#JScript_DontEnum_Bug
 */

var ImmutableValue = (function () {
  /**
   * An instance of `ImmutableValue` appears to be a plain JavaScript object,
   * except `instanceof ImmutableValue` evaluates to `true`, and it is deeply
   * frozen in development mode.
   *
   * @param {number} secret Ensures this isn't accidentally constructed outside
   * of convenience constructors. If created outside of a convenience
   * constructor, may not be frozen. Forbidding that use case for now until we
   * have a better API.
   */

  function ImmutableValue(secret) {
    _classCallCheck(this, ImmutableValue);

    invariant(secret === ImmutableValue[SECRET_KEY], 'Only certain classes should create instances of `ImmutableValue`.' + 'You probably want something like ImmutableValueObject.create.');
  }

  /**
   * Helper method for classes that make use of `ImmutableValue`.
   * @param {ImmutableValue} destination Object to merge properties into.
   * @param {object} propertyObjects List of objects to merge into
   * `destination`.
   */

  _createClass(ImmutableValue, null, [{
    key: 'mergeAllPropertiesInto',
    value: function mergeAllPropertiesInto(destination, propertyObjects) {
      var argLength = propertyObjects.length;
      for (var i = 0; i < argLength; i++) {
        _extends(destination, propertyObjects[i]);
      }
    }

    /**
     * Freezes the supplied object deeply. Other classes may implement their own
     * version based on this.
     *
     * @param {*} object The object to freeze.
     */
  }, {
    key: 'deepFreezeRootNode',
    value: function deepFreezeRootNode(object) {
      if (isNode(object)) {
        return; // Don't try to freeze DOM nodes.
      }
      Object.freeze(object); // First freeze the object.
      for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
          ImmutableValue.recurseDeepFreeze(object[prop]);
        }
      }
      Object.seal(object);
    }

    /**
     * Differs from `deepFreezeRootNode`, in that we first check if this is a
     * necessary recursion. If the object is already an `ImmutableValue`, then the
     * recursion is unnecessary as it is already frozen. That check obviously
     * wouldn't work for the root node version `deepFreezeRootNode`!
     */
  }, {
    key: 'recurseDeepFreeze',
    value: function recurseDeepFreeze(object) {
      if (isNode(object) || !ImmutableValue.shouldRecurseFreeze(object)) {
        return; // Don't try to freeze DOM nodes.
      }
      Object.freeze(object); // First freeze the object.
      for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
          ImmutableValue.recurseDeepFreeze(object[prop]);
        }
      }
      Object.seal(object);
    }

    /**
     * Checks if an object should be deep frozen. Instances of `ImmutableValue`
     * are assumed to have already been deep frozen, so we can have large
     * `process.env.NODE_ENV !== 'production'` time savings by skipping freezing of them.
     *
     * @param {*} object The object to check.
     * @return {boolean} Whether or not deep freeze is needed.
     */
  }, {
    key: 'shouldRecurseFreeze',
    value: function shouldRecurseFreeze(object) {
      return typeof object === 'object' && !(object instanceof ImmutableValue) && object !== null;
    }
  }]);

  return ImmutableValue;
})();

ImmutableValue._DONT_EVER_TYPE_THIS_SECRET_KEY = Math.random();

module.exports = ImmutableValue;
},{"./invariant":64,"./isNode":66,"./keyOf":69}],47:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule IntegerBufferSet
 * @typechecks
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Heap = require('./Heap');

var invariant = require('./invariant');

// Data structure that allows to store values and assign positions to them
// in a way to minimize changing positions of stored values when new ones are
// added or when some values are replaced. Stored elements are alwasy assigned
// a consecutive set of positoins startin from 0 up to count of elements less 1
// Following actions can be executed
// * get position assigned to given value (null if value is not stored)
// * create new entry for new value and get assigned position back
// * replace value that is furthest from specified value range with new value
//   and get it's position back
// All operations take amortized log(n) time where n is number of elements in
// the set.

var IntegerBufferSet = (function () {
  function IntegerBufferSet() {
    _classCallCheck(this, IntegerBufferSet);

    this._valueToPositionMap = {};
    this._size = 0;
    this._smallValues = new Heap([], // Initial data in the heap
    this._smallerComparator);
    this._largeValues = new Heap([], // Initial data in the heap
    this._greaterComparator);

    this.getNewPositionForValue = this.getNewPositionForValue.bind(this);
    this.getValuePosition = this.getValuePosition.bind(this);
    this.getSize = this.getSize.bind(this);
    this.replaceFurthestValuePosition = this.replaceFurthestValuePosition.bind(this);
  }

  _createClass(IntegerBufferSet, [{
    key: 'getSize',
    value: function getSize() /*number*/{
      return this._size;
    }
  }, {
    key: 'getValuePosition',
    value: function getValuePosition( /*number*/value) /*?number*/{
      if (this._valueToPositionMap[value] === undefined) {
        return null;
      }
      return this._valueToPositionMap[value];
    }
  }, {
    key: 'getNewPositionForValue',
    value: function getNewPositionForValue( /*number*/value) /*number*/{
      invariant(this._valueToPositionMap[value] === undefined, "Shouldn't try to find new position for value already stored in BufferSet");
      var newPosition = this._size;
      this._size++;
      this._pushToHeaps(newPosition, value);
      this._valueToPositionMap[value] = newPosition;
      return newPosition;
    }
  }, {
    key: 'replaceFurthestValuePosition',
    value: function replaceFurthestValuePosition(
    /*number*/lowValue,
    /*number*/highValue,
    /*number*/newValue) /*?number*/{
      invariant(this._valueToPositionMap[newValue] === undefined, "Shouldn't try to replace values with value already stored value in " + "BufferSet");

      this._cleanHeaps();
      if (this._smallValues.empty() || this._largeValues.empty()) {
        // Threre are currently no values stored. We will have to create new
        // position for this value.
        return null;
      }

      var minValue = this._smallValues.peek().value;
      var maxValue = this._largeValues.peek().value;
      if (minValue >= lowValue && maxValue <= highValue) {
        // All values currently stored are necessary, we can't reuse any of them.
        return null;
      }

      var valueToReplace;
      if (lowValue - minValue > maxValue - highValue) {
        // minValue is further from provided range. We will reuse it's position.
        valueToReplace = minValue;
        this._smallValues.pop();
      } else {
        valueToReplace = maxValue;
        this._largeValues.pop();
      }
      var position = this._valueToPositionMap[valueToReplace];
      delete this._valueToPositionMap[valueToReplace];
      this._valueToPositionMap[newValue] = position;
      this._pushToHeaps(position, newValue);

      return position;
    }
  }, {
    key: '_pushToHeaps',
    value: function _pushToHeaps( /*number*/position, /*number*/value) {
      var element = {
        position: position,
        value: value
      };
      // We can reuse the same object in both heaps, because we don't mutate them
      this._smallValues.push(element);
      this._largeValues.push(element);
    }
  }, {
    key: '_cleanHeaps',
    value: function _cleanHeaps() {
      // We not usually only remove object from one heap while moving value.
      // Here we make sure that there is no stale data on top of heaps.
      this._cleanHeap(this._smallValues);
      this._cleanHeap(this._largeValues);
      var minHeapSize = Math.min(this._smallValues.size(), this._largeValues.size());
      var maxHeapSize = Math.max(this._smallValues.size(), this._largeValues.size());
      if (maxHeapSize > 10 * minHeapSize) {
        // There are many old values in one of heaps. We nned to get rid of them
        // to not use too avoid memory leaks
        this._recreateHeaps();
      }
    }
  }, {
    key: '_recreateHeaps',
    value: function _recreateHeaps() {
      var sourceHeap = this._smallValues.size() < this._largeValues.size() ? this._smallValues : this._largeValues;
      var newSmallValues = new Heap([], // Initial data in the heap
      this._smallerComparator);
      var newLargeValues = new Heap([], // Initial datat in the heap
      this._greaterComparator);
      while (!sourceHeap.empty()) {
        var element = sourceHeap.pop();
        // Push all stil valid elements to new heaps
        if (this._valueToPositionMap[element.value] !== undefined) {
          newSmallValues.push(element);
          newLargeValues.push(element);
        }
      }
      this._smallValues = newSmallValues;
      this._largeValues = newLargeValues;
    }
  }, {
    key: '_cleanHeap',
    value: function _cleanHeap( /*object*/heap) {
      while (!heap.empty() && this._valueToPositionMap[heap.peek().value] === undefined) {
        heap.pop();
      }
    }
  }, {
    key: '_smallerComparator',
    value: function _smallerComparator( /*object*/lhs, /*object*/rhs) /*boolean*/{
      return lhs.value < rhs.value;
    }
  }, {
    key: '_greaterComparator',
    value: function _greaterComparator( /*object*/lhs, /*object*/rhs) /*boolean*/{
      return lhs.value > rhs.value;
    }
  }]);

  return IntegerBufferSet;
})();

module.exports = IntegerBufferSet;
},{"./Heap":44,"./invariant":64}],48:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Keys
 */

"use strict";

module.exports = {
  BACKSPACE: 8,
  TAB: 9,
  RETURN: 13,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46,
  COMMA: 188,
  PERIOD: 190,
  A: 65,
  Z: 90,
  ZERO: 48,
  NUMPAD_0: 96,
  NUMPAD_9: 105
};
},{}],49:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Locale
 */

"use strict";

// Hard code this for now.
var Locale = {
  isRTL: function isRTL() {
    return false;
  },
  getDirection: function getDirection() {
    return 'LTR';
  }
};

module.exports = Locale;
},{}],50:[function(require,module,exports){
(function (global){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule PrefixIntervalTree
 * 
 * @typechecks
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var invariant = require('./invariant');

var parent = function parent(node) {
  return Math.floor(node / 2);
};

var Int32Array = global.Int32Array || function (size) {
  var xs = [];
  for (var i = size - 1; i >= 0; --i) {
    xs[i] = 0;
  }
  return xs;
};

/**
 * Computes the next power of 2 after or equal to x.
 */
function ceilLog2(x) {
  var y = 1;
  while (y < x) {
    y *= 2;
  }
  return y;
}

/**
 * A prefix interval tree stores an numeric array and the partial sums of that
 * array. It is optimized for updating the values of the array without
 * recomputing all of the partial sums.
 *
 *   - O(ln n) update
 *   - O(1) lookup
 *   - O(ln n) compute a partial sum
 *   - O(n) space
 *
 * Note that the sequence of partial sums is one longer than the array, so that
 * the first partial sum is always 0, and the last partial sum is the sum of the
 * entire array.
 */

var PrefixIntervalTree = (function () {
  function PrefixIntervalTree(xs) {
    _classCallCheck(this, PrefixIntervalTree);

    this._size = xs.length;
    this._half = ceilLog2(this._size);
    this._heap = new Int32Array(2 * this._half);

    var i;
    for (i = 0; i < this._size; ++i) {
      this._heap[this._half + i] = xs[i];
    }

    for (i = this._half - 1; i > 0; --i) {
      this._heap[i] = this._heap[2 * i] + this._heap[2 * i + 1];
    }
  }

  _createClass(PrefixIntervalTree, [{
    key: 'set',
    value: function set(index, value) {
      invariant(0 <= index && index < this._size, 'Index out of range %s', index);

      var node = this._half + index;
      this._heap[node] = value;

      node = parent(node);
      for (; node !== 0; node = parent(node)) {
        this._heap[node] = this._heap[2 * node] + this._heap[2 * node + 1];
      }
    }
  }, {
    key: 'get',
    value: function get(index) {
      invariant(0 <= index && index < this._size, 'Index out of range %s', index);

      var node = this._half + index;
      return this._heap[node];
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      return this._size;
    }

    /**
     * Returns the sum get(0) + get(1) + ... + get(end - 1).
     */
  }, {
    key: 'sumUntil',
    value: function sumUntil(end) {
      invariant(0 <= end && end < this._size + 1, 'Index out of range %s', end);

      if (end === 0) {
        return 0;
      }

      var node = this._half + end - 1;
      var sum = this._heap[node];
      for (; node !== 1; node = parent(node)) {
        if (node % 2 === 1) {
          sum += this._heap[node - 1];
        }
      }

      return sum;
    }

    /**
     * Returns the sum get(0) + get(1) + ... + get(inclusiveEnd).
     */
  }, {
    key: 'sumTo',
    value: function sumTo(inclusiveEnd) {
      invariant(0 <= inclusiveEnd && inclusiveEnd < this._size, 'Index out of range %s', inclusiveEnd);
      return this.sumUntil(inclusiveEnd + 1);
    }

    /**
     * Returns the sum get(begin) + get(begin + 1) + ... + get(end - 1).
     */
  }, {
    key: 'sum',
    value: function sum(begin, end) {
      invariant(begin <= end, 'Begin must precede end');
      return this.sumUntil(end) - this.sumUntil(begin);
    }

    /**
     * Returns the smallest i such that 0 <= i <= size and sumUntil(i) <= t, or
     * -1 if no such i exists.
     */
  }, {
    key: 'greatestLowerBound',
    value: function greatestLowerBound(t) {
      if (t < 0) {
        return -1;
      }

      var node = 1;
      if (this._heap[node] <= t) {
        return this._size;
      }

      while (node < this._half) {
        var leftSum = this._heap[2 * node];
        if (t < leftSum) {
          node = 2 * node;
        } else {
          node = 2 * node + 1;
          t -= leftSum;
        }
      }

      return node - this._half;
    }

    /**
     * Returns the smallest i such that 0 <= i <= size and sumUntil(i) < t, or
     * -1 if no such i exists.
     */
  }, {
    key: 'greatestStrictLowerBound',
    value: function greatestStrictLowerBound(t) {
      if (t <= 0) {
        return -1;
      }

      var node = 1;
      if (this._heap[node] < t) {
        return this._size;
      }

      while (node < this._half) {
        var leftSum = this._heap[2 * node];
        if (t <= leftSum) {
          node = 2 * node;
        } else {
          node = 2 * node + 1;
          t -= leftSum;
        }
      }

      return node - this._half;
    }

    /**
     * Returns the smallest i such that 0 <= i <= size and t <= sumUntil(i), or
     * size + 1 if no such i exists.
     */
  }, {
    key: 'leastUpperBound',
    value: function leastUpperBound(t) {
      return this.greatestStrictLowerBound(t) + 1;
    }

    /**
     * Returns the smallest i such that 0 <= i <= size and t < sumUntil(i), or
     * size + 1 if no such i exists.
     */
  }, {
    key: 'leastStrictUpperBound',
    value: function leastStrictUpperBound(t) {
      return this.greatestLowerBound(t) + 1;
    }
  }], [{
    key: 'uniform',
    value: function uniform(size, initialValue) {
      var xs = [];
      for (var i = size - 1; i >= 0; --i) {
        xs[i] = initialValue;
      }

      return new PrefixIntervalTree(xs);
    }
  }, {
    key: 'empty',
    value: function empty(size) {
      return PrefixIntervalTree.uniform(size, 0);
    }
  }]);

  return PrefixIntervalTree;
})();

module.exports = PrefixIntervalTree;

/**
 * Number of elements in the array
 */

/**
 * Half the size of the heap. It is also the number of non-leaf nodes, and the
 * index of the first element in the heap. Always a power of 2.
 */

/**
 * Binary heap
 */
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./invariant":64}],51:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */

'use strict';

module.exports = require('react');
},{"react":"react"}],52:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponentWithPureRenderMixin
 */

'use strict';

/**
 * Performs equality by iterating through keys on an object and returning
 * false when any key has values which are not strictly equal between
 * objA and objB. Returns true when the values of all keys are strictly equal.
 *
 * @return {boolean}
 */
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  var key;
  // Test for A's keys different from B.
  for (key in objA) {
    if (objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
      return false;
    }
  }
  // Test for B's keys missing from A.
  for (key in objB) {
    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

/**
 * If your React component's render function is "pure", e.g. it will render the
 * same result given the same props and state, provide this Mixin for a
 * considerable performance boost.
 *
 * Most React components have pure render functions.
 *
 * Example:
 *
 *   var ReactComponentWithPureRenderMixin =
 *     require('ReactComponentWithPureRenderMixin');
 *   React.createClass({
 *     mixins: [ReactComponentWithPureRenderMixin],
 *
 *     render: function() {
 *       return <div className={this.props.className}>foo</div>;
 *     }
 *   });
 *
 * Note: This only checks shallow equality for props and state. If these contain
 * complex data structures this mixin may have false-negatives for deeper
 * differences. Only mixin to components which have simple props and state, or
 * use `forceUpdate()` when you know deep data structures have changed.
 */
var ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }
};

module.exports = ReactComponentWithPureRenderMixin;
},{}],53:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is utility that hanlds onWheel events and calls provided wheel
 * callback with correct frame rate.
 *
 * @providesModule ReactWheelHandler
 * @typechecks
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var emptyFunction = require('./emptyFunction');
var normalizeWheel = require('./normalizeWheel');
var requestAnimationFramePolyfill = require('./requestAnimationFramePolyfill');

var ReactWheelHandler = (function () {
  /**
   * onWheel is the callback that will be called with right frame rate if
   * any wheel events happened
   * onWheel should is to be called with two arguments: deltaX and deltaY in
   * this order
   */

  function ReactWheelHandler(
  /*function*/onWheel,
  /*boolean|function*/handleScrollX,
  /*boolean|function*/handleScrollY,
  /*?boolean|?function*/stopPropagation) {
    _classCallCheck(this, ReactWheelHandler);

    this._animationFrameID = null;
    this._deltaX = 0;
    this._deltaY = 0;
    this._didWheel = this._didWheel.bind(this);
    if (typeof handleScrollX !== 'function') {
      handleScrollX = handleScrollX ? emptyFunction.thatReturnsTrue : emptyFunction.thatReturnsFalse;
    }

    if (typeof handleScrollY !== 'function') {
      handleScrollY = handleScrollY ? emptyFunction.thatReturnsTrue : emptyFunction.thatReturnsFalse;
    }

    if (typeof stopPropagation !== 'function') {
      stopPropagation = stopPropagation ? emptyFunction.thatReturnsTrue : emptyFunction.thatReturnsFalse;
    }

    this._handleScrollX = handleScrollX;
    this._handleScrollY = handleScrollY;
    this._stopPropagation = stopPropagation;
    this._onWheelCallback = onWheel;
    this.onWheel = this.onWheel.bind(this);
  }

  _createClass(ReactWheelHandler, [{
    key: 'onWheel',
    value: function onWheel( /*object*/event) {
      var normalizedEvent = normalizeWheel(event);
      var deltaX = this._deltaX + normalizedEvent.pixelX;
      var deltaY = this._deltaY + normalizedEvent.pixelY;
      var handleScrollX = this._handleScrollX(deltaX, deltaY);
      var handleScrollY = this._handleScrollY(deltaY, deltaX);
      if (!handleScrollX && !handleScrollY) {
        return;
      }

      this._deltaX += handleScrollX ? normalizedEvent.pixelX : 0;
      this._deltaY += handleScrollY ? normalizedEvent.pixelY : 0;
      event.preventDefault();

      var changed;
      if (this._deltaX !== 0 || this._deltaY !== 0) {
        if (this._stopPropagation()) {
          event.stopPropagation();
        }
        changed = true;
      }

      if (changed === true && this._animationFrameID === null) {
        this._animationFrameID = requestAnimationFramePolyfill(this._didWheel);
      }
    }
  }, {
    key: '_didWheel',
    value: function _didWheel() {
      this._animationFrameID = null;
      this._onWheelCallback(this._deltaX, this._deltaY);
      this._deltaX = 0;
      this._deltaY = 0;
    }
  }]);

  return ReactWheelHandler;
})();

module.exports = ReactWheelHandler;
},{"./emptyFunction":62,"./normalizeWheel":72,"./requestAnimationFramePolyfill":73}],54:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Scrollbar.react
 * @typechecks
 */

'use strict';

var DOMMouseMoveTracker = require('./DOMMouseMoveTracker');
var Keys = require('./Keys');
var React = require('./React');
var ReactComponentWithPureRenderMixin = require('./ReactComponentWithPureRenderMixin');
var ReactWheelHandler = require('./ReactWheelHandler');

var cssVar = require('./cssVar');
var cx = require('./cx');
var emptyFunction = require('./emptyFunction');
var translateDOMPositionXY = require('./translateDOMPositionXY');

var PropTypes = React.PropTypes;

var UNSCROLLABLE_STATE = {
  position: 0,
  scrollable: false
};

var FACE_MARGIN = parseInt(cssVar('scrollbar-face-margin'), 10);
var FACE_MARGIN_2 = FACE_MARGIN * 2;
var FACE_SIZE_MIN = 30;
var KEYBOARD_SCROLL_AMOUNT = 40;

var _lastScrolledScrollbar = null;

var Scrollbar = React.createClass({
  displayName: 'Scrollbar',

  mixins: [ReactComponentWithPureRenderMixin],

  propTypes: {
    contentSize: PropTypes.number.isRequired,
    defaultPosition: PropTypes.number,
    isOpaque: PropTypes.bool,
    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
    onScroll: PropTypes.func,
    position: PropTypes.number,
    size: PropTypes.number.isRequired,
    trackColor: PropTypes.oneOf(['gray']),
    zIndex: PropTypes.number,
    verticalTop: PropTypes.number
  },

  getInitialState: function getInitialState() /*object*/{
    var props = this.props;
    return this._calculateState(props.position || props.defaultPosition || 0, props.size, props.contentSize, props.orientation);
  },

  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {
    var controlledPosition = nextProps.position;
    if (controlledPosition === undefined) {
      this._setNextState(this._calculateState(this.state.position, nextProps.size, nextProps.contentSize, nextProps.orientation));
    } else {
      this._setNextState(this._calculateState(controlledPosition, nextProps.size, nextProps.contentSize, nextProps.orientation), nextProps);
    }
  },

  getDefaultProps: function getDefaultProps() /*object*/{
    return {
      defaultPosition: 0,
      isOpaque: false,
      onScroll: emptyFunction,
      orientation: 'vertical',
      zIndex: 99
    };
  },

  render: function render() /*?object*/{
    if (!this.state.scrollable) {
      return null;
    }

    var size = this.props.size;
    var mainStyle;
    var faceStyle;
    var isHorizontal = this.state.isHorizontal;
    var isVertical = !isHorizontal;
    var isActive = this.state.focused || this.state.isDragging;
    var faceSize = this.state.faceSize;
    var isOpaque = this.props.isOpaque;
    var verticalTop = this.props.verticalTop || 0;

    var mainClassName = cx({
      'ScrollbarLayout/main': true,
      'ScrollbarLayout/mainVertical': isVertical,
      'ScrollbarLayout/mainHorizontal': isHorizontal,
      'public/Scrollbar/main': true,
      'public/Scrollbar/mainOpaque': isOpaque,
      'public/Scrollbar/mainActive': isActive
    });

    var faceClassName = cx({
      'ScrollbarLayout/face': true,
      'ScrollbarLayout/faceHorizontal': isHorizontal,
      'ScrollbarLayout/faceVertical': isVertical,
      'public/Scrollbar/faceActive': isActive,
      'public/Scrollbar/face': true
    });

    var position = this.state.position * this.state.scale + FACE_MARGIN;

    if (isHorizontal) {
      mainStyle = {
        width: size
      };
      faceStyle = {
        width: faceSize - FACE_MARGIN_2
      };
      translateDOMPositionXY(faceStyle, position, 0);
    } else {
      mainStyle = {
        top: verticalTop,
        height: size
      };
      faceStyle = {
        height: faceSize - FACE_MARGIN_2
      };
      translateDOMPositionXY(faceStyle, 0, position);
    }

    mainStyle.zIndex = this.props.zIndex;

    if (this.props.trackColor === 'gray') {
      mainStyle.backgroundColor = cssVar('fbui-desktop-background-light');
    }

    return React.createElement(
      'div',
      {
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onKeyDown: this._onKeyDown,
        onMouseDown: this._onMouseDown,
        onWheel: this._wheelHandler.onWheel,
        className: mainClassName,
        style: mainStyle,
        tabIndex: 0 },
      React.createElement('div', {
        ref: 'face',
        className: faceClassName,
        style: faceStyle
      })
    );
  },

  componentWillMount: function componentWillMount() {
    var isHorizontal = this.props.orientation === 'horizontal';
    var onWheel = isHorizontal ? this._onWheelX : this._onWheelY;

    this._wheelHandler = new ReactWheelHandler(onWheel, this._shouldHandleX, // Should hanlde horizontal scroll
    this._shouldHandleY // Should handle vertical scroll
    );
  },

  componentDidMount: function componentDidMount() {
    this._mouseMoveTracker = new DOMMouseMoveTracker(this._onMouseMove, this._onMouseMoveEnd, document.documentElement);

    if (this.props.position !== undefined && this.state.position !== this.props.position) {
      this._didScroll();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this._nextState = null;
    this._mouseMoveTracker.releaseMouseMoves();
    if (_lastScrolledScrollbar === this) {
      _lastScrolledScrollbar = null;
    }
    delete this._mouseMoveTracker;
  },

  scrollBy: function scrollBy( /*number*/delta) {
    this._onWheel(delta);
  },

  _shouldHandleX: function _shouldHandleX( /*number*/delta) /*boolean*/{
    return this.props.orientation === 'horizontal' ? this._shouldHandleChange(delta) : false;
  },

  _shouldHandleY: function _shouldHandleY( /*number*/delta) /*boolean*/{
    return this.props.orientation !== 'horizontal' ? this._shouldHandleChange(delta) : false;
  },

  _shouldHandleChange: function _shouldHandleChange( /*number*/delta) /*boolean*/{
    var nextState = this._calculateState(this.state.position + delta, this.props.size, this.props.contentSize, this.props.orientation);
    return nextState.position !== this.state.position;
  },

  _calculateState: function _calculateState(
  /*number*/position,
  /*number*/size,
  /*number*/contentSize,
  /*string*/orientation) /*object*/{
    if (size < 1 || contentSize <= size) {
      return UNSCROLLABLE_STATE;
    }

    var stateKey = position + '_' + size + '_' + contentSize + '_' + orientation;
    if (this._stateKey === stateKey) {
      return this._stateForKey;
    }

    // There are two types of positions here.
    // 1) Phisical position: changed by mouse / keyboard
    // 2) Logical position: changed by props.
    // The logical position will be kept as as internal state and the `render()`
    // function will translate it into physical position to render.

    var isHorizontal = orientation === 'horizontal';
    var scale = size / contentSize;
    var faceSize = size * scale;

    if (faceSize < FACE_SIZE_MIN) {
      scale = (size - FACE_SIZE_MIN) / (contentSize - size);
      faceSize = FACE_SIZE_MIN;
    }

    var scrollable = true;
    var maxPosition = contentSize - size;

    if (position < 0) {
      position = 0;
    } else if (position > maxPosition) {
      position = maxPosition;
    }

    var isDragging = this._mouseMoveTracker ? this._mouseMoveTracker.isDragging() : false;

    // This function should only return flat values that can be compared quiclky
    // by `ReactComponentWithPureRenderMixin`.
    var state = {
      faceSize: faceSize,
      isDragging: isDragging,
      isHorizontal: isHorizontal,
      position: position,
      scale: scale,
      scrollable: scrollable
    };

    // cache the state for later use.
    this._stateKey = stateKey;
    this._stateForKey = state;
    return state;
  },

  _onWheelY: function _onWheelY( /*number*/deltaX, /*number*/deltaY) {
    this._onWheel(deltaY);
  },

  _onWheelX: function _onWheelX( /*number*/deltaX, /*number*/deltaY) {
    this._onWheel(deltaX);
  },

  _onWheel: function _onWheel( /*number*/delta) {
    var props = this.props;

    // The mouse may move faster then the animation frame does.
    // Use `requestAnimationFrame` to avoid over-updating.
    this._setNextState(this._calculateState(this.state.position + delta, props.size, props.contentSize, props.orientation));
  },

  _onMouseDown: function _onMouseDown( /*object*/event) {
    var nextState;

    if (event.target !== React.findDOMNode(this.refs.face)) {
      // Both `offsetX` and `layerX` are non-standard DOM property but they are
      // magically available for browsers somehow.
      var nativeEvent = event.nativeEvent;
      var position = this.state.isHorizontal ? nativeEvent.offsetX || nativeEvent.layerX : nativeEvent.offsetY || nativeEvent.layerY;

      // MouseDown on the scroll-track directly, move the center of the
      // scroll-face to the mouse position.
      var props = this.props;
      position = position / this.state.scale;
      nextState = this._calculateState(position - this.state.faceSize * 0.5 / this.state.scale, props.size, props.contentSize, props.orientation);
    } else {
      nextState = {};
    }

    nextState.focused = true;
    this._setNextState(nextState);

    this._mouseMoveTracker.captureMouseMoves(event);
    // Focus the node so it may receive keyboard event.
    React.findDOMNode(this).focus();
  },

  _onMouseMove: function _onMouseMove( /*number*/deltaX, /*number*/deltaY) {
    var props = this.props;
    var delta = this.state.isHorizontal ? deltaX : deltaY;
    delta = delta / this.state.scale;

    this._setNextState(this._calculateState(this.state.position + delta, props.size, props.contentSize, props.orientation));
  },

  _onMouseMoveEnd: function _onMouseMoveEnd() {
    this._nextState = null;
    this._mouseMoveTracker.releaseMouseMoves();
    this.setState({ isDragging: false });
  },

  _onKeyDown: function _onKeyDown( /*object*/event) {
    var keyCode = event.keyCode;

    if (keyCode === Keys.TAB) {
      // Let focus move off the scrollbar.
      return;
    }

    var distance = KEYBOARD_SCROLL_AMOUNT;
    var direction = 0;

    if (this.state.isHorizontal) {
      switch (keyCode) {
        case Keys.HOME:
          direction = -1;
          distance = this.props.contentSize;
          break;

        case Keys.LEFT:
          direction = -1;
          break;

        case Keys.RIGHT:
          direction = 1;
          break;

        default:
          return;
      }
    }

    if (!this.state.isHorizontal) {
      switch (keyCode) {
        case Keys.SPACE:
          if (event.shiftKey) {
            direction = -1;
          } else {
            direction = 1;
          }
          break;

        case Keys.HOME:
          direction = -1;
          distance = this.props.contentSize;
          break;

        case Keys.UP:
          direction = -1;
          break;

        case Keys.DOWN:
          direction = 1;
          break;

        case Keys.PAGE_UP:
          direction = -1;
          distance = this.props.size;
          break;

        case Keys.PAGE_DOWN:
          direction = 1;
          distance = this.props.size;
          break;

        default:
          return;
      }
    }

    event.preventDefault();

    var props = this.props;
    this._setNextState(this._calculateState(this.state.position + distance * direction, props.size, props.contentSize, props.orientation));
  },

  _onFocus: function _onFocus() {
    this.setState({
      focused: true
    });
  },

  _onBlur: function _onBlur() {
    this.setState({
      focused: false
    });
  },

  _blur: function _blur() {
    if (this.isMounted()) {
      try {
        this._onBlur();
        React.findDOMNode(this).blur();
      } catch (oops) {
        // pass
      }
    }
  },

  _setNextState: function _setNextState( /*object*/nextState, /*?object*/props) {
    props = props || this.props;
    var controlledPosition = props.position;
    var willScroll = this.state.position !== nextState.position;
    if (controlledPosition === undefined) {
      var callback = willScroll ? this._didScroll : undefined;
      this.setState(nextState, callback);
    } else if (controlledPosition === nextState.position) {
      this.setState(nextState);
    } else {
      // Scrolling is controlled. Don't update the state and let the owner
      // to update the scrollbar instead.
      if (nextState.position !== undefined && nextState.position !== this.state.position) {
        this.props.onScroll(nextState.position);
      }
      return;
    }

    if (willScroll && _lastScrolledScrollbar !== this) {
      _lastScrolledScrollbar && _lastScrolledScrollbar._blur();
      _lastScrolledScrollbar = this;
    }
  },

  _didScroll: function _didScroll() {
    this.props.onScroll(this.state.position);
  }
});

Scrollbar.KEYBOARD_SCROLL_AMOUNT = KEYBOARD_SCROLL_AMOUNT;
Scrollbar.SIZE = parseInt(cssVar('scrollbar-size'), 10);

module.exports = Scrollbar;
},{"./DOMMouseMoveTracker":28,"./Keys":48,"./React":51,"./ReactComponentWithPureRenderMixin":52,"./ReactWheelHandler":53,"./cssVar":59,"./cx":60,"./emptyFunction":62,"./translateDOMPositionXY":75}],55:[function(require,module,exports){
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule UserAgent_DEPRECATED
 */

/**
 *  Provides entirely client-side User Agent and OS detection. You should prefer
 *  the non-deprecated UserAgent module when possible, which exposes our
 *  authoritative server-side PHP-based detection to the client.
 *
 *  Usage is straightforward:
 *
 *    if (UserAgent_DEPRECATED.ie()) {
 *      //  IE
 *    }
 *
 *  You can also do version checks:
 *
 *    if (UserAgent_DEPRECATED.ie() >= 7) {
 *      //  IE7 or better
 *    }
 *
 *  The browser functions will return NaN if the browser does not match, so
 *  you can also do version compares the other way:
 *
 *    if (UserAgent_DEPRECATED.ie() < 7) {
 *      //  IE6 or worse
 *    }
 *
 *  Note that the version is a float and may include a minor version number,
 *  so you should always use range operators to perform comparisons, not
 *  strict equality.
 *
 *  **Note:** You should **strongly** prefer capability detection to browser
 *  version detection where it's reasonable:
 *
 *    http://www.quirksmode.org/js/support.html
 *
 *  Further, we have a large number of mature wrapper functions and classes
 *  which abstract away many browser irregularities. Check the documentation,
 *  grep for things, or ask on javascript@lists.facebook.com before writing yet
 *  another copy of "event || window.event".
 *
 */

'use strict';

var _populated = false;

// Browsers
var _ie, _firefox, _opera, _webkit, _chrome;

// Actual IE browser for compatibility mode
var _ie_real_version;

// Platforms
var _osx, _windows, _linux, _android;

// Architectures
var _win64;

// Devices
var _iphone, _ipad, _native;

var _mobile;

function _populate() {
  if (_populated) {
    return;
  }

  _populated = true;

  // To work around buggy JS libraries that can't handle multi-digit
  // version numbers, Opera 10's user agent string claims it's Opera
  // 9, then later includes a Version/X.Y field:
  //
  // Opera/9.80 (foo) Presto/2.2.15 Version/10.10
  var uas = navigator.userAgent;
  var agent = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(uas);
  var os = /(Mac OS X)|(Windows)|(Linux)/.exec(uas);

  _iphone = /\b(iPhone|iP[ao]d)/.exec(uas);
  _ipad = /\b(iP[ao]d)/.exec(uas);
  _android = /Android/i.exec(uas);
  _native = /FBAN\/\w+;/i.exec(uas);
  _mobile = /Mobile/i.exec(uas);

  // Note that the IE team blog would have you believe you should be checking
  // for 'Win64; x64'.  But MSDN then reveals that you can actually be coming
  // from either x64 or ia64;  so ultimately, you should just check for Win64
  // as in indicator of whether you're in 64-bit IE.  32-bit IE on 64-bit
  // Windows will send 'WOW64' instead.
  _win64 = !!/Win64/.exec(uas);

  if (agent) {
    _ie = agent[1] ? parseFloat(agent[1]) : agent[5] ? parseFloat(agent[5]) : NaN;
    // IE compatibility mode
    if (_ie && document && document.documentMode) {
      _ie = document.documentMode;
    }
    // grab the "true" ie version from the trident token if available
    var trident = /(?:Trident\/(\d+.\d+))/.exec(uas);
    _ie_real_version = trident ? parseFloat(trident[1]) + 4 : _ie;

    _firefox = agent[2] ? parseFloat(agent[2]) : NaN;
    _opera = agent[3] ? parseFloat(agent[3]) : NaN;
    _webkit = agent[4] ? parseFloat(agent[4]) : NaN;
    if (_webkit) {
      // We do not add the regexp to the above test, because it will always
      // match 'safari' only since 'AppleWebKit' appears before 'Chrome' in
      // the userAgent string.
      agent = /(?:Chrome\/(\d+\.\d+))/.exec(uas);
      _chrome = agent && agent[1] ? parseFloat(agent[1]) : NaN;
    } else {
      _chrome = NaN;
    }
  } else {
    _ie = _firefox = _opera = _chrome = _webkit = NaN;
  }

  if (os) {
    if (os[1]) {
      // Detect OS X version.  If no version number matches, set _osx to true.
      // Version examples:  10, 10_6_1, 10.7
      // Parses version number as a float, taking only first two sets of
      // digits.  If only one set of digits is found, returns just the major
      // version number.
      var ver = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(uas);

      _osx = ver ? parseFloat(ver[1].replace('_', '.')) : true;
    } else {
      _osx = false;
    }
    _windows = !!os[2];
    _linux = !!os[3];
  } else {
    _osx = _windows = _linux = false;
  }
}

var UserAgent_DEPRECATED = {

  /**
   *  Check if the UA is Internet Explorer.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  ie: function ie() {
    return _populate() || _ie;
  },

  /**
   * Check if we're in Internet Explorer compatibility mode.
   *
   * @return bool true if in compatibility mode, false if
   * not compatibility mode or not ie
   */
  ieCompatibilityMode: function ieCompatibilityMode() {
    return _populate() || _ie_real_version > _ie;
  },

  /**
   * Whether the browser is 64-bit IE.  Really, this is kind of weak sauce;  we
   * only need this because Skype can't handle 64-bit IE yet.  We need to remove
   * this when we don't need it -- tracked by #601957.
   */
  ie64: function ie64() {
    return UserAgent_DEPRECATED.ie() && _win64;
  },

  /**
   *  Check if the UA is Firefox.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  firefox: function firefox() {
    return _populate() || _firefox;
  },

  /**
   *  Check if the UA is Opera.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  opera: function opera() {
    return _populate() || _opera;
  },

  /**
   *  Check if the UA is WebKit.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  webkit: function webkit() {
    return _populate() || _webkit;
  },

  /**
   *  For Push
   *  WILL BE REMOVED VERY SOON. Use UserAgent_DEPRECATED.webkit
   */
  safari: function safari() {
    return UserAgent_DEPRECATED.webkit();
  },

  /**
   *  Check if the UA is a Chrome browser.
   *
   *
   *  @return float|NaN Version number (if match) or NaN.
   */
  chrome: function chrome() {
    return _populate() || _chrome;
  },

  /**
   *  Check if the user is running Windows.
   *
   *  @return bool `true' if the user's OS is Windows.
   */
  windows: function windows() {
    return _populate() || _windows;
  },

  /**
   *  Check if the user is running Mac OS X.
   *
   *  @return float|bool   Returns a float if a version number is detected,
   *                       otherwise true/false.
   */
  osx: function osx() {
    return _populate() || _osx;
  },

  /**
   * Check if the user is running Linux.
   *
   * @return bool `true' if the user's OS is some flavor of Linux.
   */
  linux: function linux() {
    return _populate() || _linux;
  },

  /**
   * Check if the user is running on an iPhone or iPod platform.
   *
   * @return bool `true' if the user is running some flavor of the
   *    iPhone OS.
   */
  iphone: function iphone() {
    return _populate() || _iphone;
  },

  mobile: function mobile() {
    return _populate() || (_iphone || _ipad || _android || _mobile);
  },

  nativeApp: function nativeApp() {
    // webviews inside of the native apps
    return _populate() || _native;
  },

  android: function android() {
    return _populate() || _android;
  },

  ipad: function ipad() {
    return _populate() || _ipad;
  }
};

module.exports = UserAgent_DEPRECATED;
},{}],56:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule camelize
 * @typechecks
 */

"use strict";

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;
},{}],57:[function(require,module,exports){
(function (global){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule cancelAnimationFramePolyfill
 */

/**
 * Here is the native and polyfill version of cancelAnimationFrame.
 * Please don't use it directly and use cancelAnimationFrame module instead.
 */
"use strict";

var cancelAnimationFrame = global.cancelAnimationFrame || global.webkitCancelAnimationFrame || global.mozCancelAnimationFrame || global.oCancelAnimationFrame || global.msCancelAnimationFrame || global.clearTimeout;

module.exports = cancelAnimationFrame;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],58:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule clamp
 * @typechecks
 */

/**
 * @param {number} min
 * @param {number} value
 * @param {number} max
 * @return {number}
 */
"use strict";

function clamp(min, value, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

module.exports = clamp;
},{}],59:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule cssVar
 * @typechecks
 */

"use strict";

var CSS_VARS = {
  'scrollbar-face-active-color': '#7d7d7d',
  'scrollbar-face-color': '#c2c2c2',
  'scrollbar-face-margin': '4px',
  'scrollbar-face-radius': '6px',
  'scrollbar-size': '15px',
  'scrollbar-size-large': '17px',
  'scrollbar-track-color': 'rgba(255, 255, 255, 0.8)',
  'fbui-white': '#fff',
  'fbui-desktop-background-light': '#f6f7f8'
};

/**
 * @param {string} name
 */
function cssVar(name) {
  if (CSS_VARS.hasOwnProperty(name)) {
    return CSS_VARS[name];
  }

  throw new Error('cssVar' + '("' + name + '"): Unexpected class transformation.');
}

cssVar.CSS_VARS = CSS_VARS;

module.exports = cssVar;
},{}],60:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule cx
 */

'use strict';

var slashReplaceRegex = /\//g;
var cache = {};

function getClassName(className) {
  if (cache[className]) {
    return cache[className];
  }

  cache[className] = className.replace(slashReplaceRegex, '_');
  return cache[className];
}

/**
 * This function is used to mark string literals representing CSS class names
 * so that they can be transformed statically. This allows for modularization
 * and minification of CSS class names.
 *
 * In static_upstream, this function is actually implemented, but it should
 * eventually be replaced with something more descriptive, and the transform
 * that is used in the main stack should be ported for use elsewhere.
 *
 * @param string|object className to modularize, or an object of key/values.
 *                      In the object case, the values are conditions that
 *                      determine if the className keys should be included.
 * @param [string ...]  Variable list of classNames in the string case.
 * @return string       Renderable space-separated CSS className.
 */
function cx(classNames) {
  var classNamesArray;
  if (typeof classNames == 'object') {
    classNamesArray = Object.keys(classNames).filter(function (className) {
      return classNames[className];
    });
  } else {
    classNamesArray = Array.prototype.slice.call(arguments);
  }

  return classNamesArray.map(getClassName).join(' ');
}

module.exports = cx;
},{}],61:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule debounceCore
 * @typechecks
 */

/**
 * Invokes the given callback after a specified number of milliseconds have
 * elapsed, ignoring subsequent calls.
 *
 * For example, if you wanted to update a preview after the user stops typing
 * you could do the following:
 *
 *   elem.addEventListener('keyup', debounce(this.updatePreview, 250), false);
 *
 * The returned function has a reset method which can be called to cancel a
 * pending invocation.
 *
 *   var debouncedUpdatePreview = debounce(this.updatePreview, 250);
 *   elem.addEventListener('keyup', debouncedUpdatePreview, false);
 *
 *   // later, to cancel pending calls
 *   debouncedUpdatePreview.reset();
 *
 * @param {function} func - the function to debounce
 * @param {number} wait - how long to wait in milliseconds
 * @param {*} context - optional context to invoke the function in
 * @param {?function} setTimeoutFunc - an implementation of setTimeout
 *  if nothing is passed in the default setTimeout function is used
  * @param {?function} clearTimeoutFunc - an implementation of clearTimeout
 *  if nothing is passed in the default clearTimeout function is used
 */
"use strict";

function debounce(func, wait, context, setTimeoutFunc, clearTimeoutFunc) {
  setTimeoutFunc = setTimeoutFunc || setTimeout;
  clearTimeoutFunc = clearTimeoutFunc || clearTimeout;
  var timeout;

  function debouncer() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    debouncer.reset();

    var callback = function callback() {
      func.apply(context, args);
    };
    callback.__SMmeta = func.__SMmeta;
    timeout = setTimeoutFunc(callback, wait);
  }

  debouncer.reset = function () {
    clearTimeoutFunc(timeout);
  };

  return debouncer;
}

module.exports = debounce;
},{}],62:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule emptyFunction
 */

"use strict";

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
function emptyFunction() {}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],63:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getVendorPrefixedName
 * @typechecks
 */

'use strict';

var ExecutionEnvironment = require('./ExecutionEnvironment');

var camelize = require('./camelize');
var invariant = require('./invariant');

var memoized = {};
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
var prefixRegex = new RegExp('^(' + prefixes.join('|') + ')');
var testStyle = ExecutionEnvironment.canUseDOM ? document.createElement('div').style : {};

function getWithPrefix(name) {
  for (var i = 0; i < prefixes.length; i++) {
    var prefixedName = prefixes[i] + name;
    if (prefixedName in testStyle) {
      return prefixedName;
    }
  }
  return null;
}

/**
 * @param {string} property Name of a css property to check for.
 * @return {?string} property name supported in the browser, or null if not
 * supported.
 */
function getVendorPrefixedName(property) {
  var name = camelize(property);
  if (memoized[name] === undefined) {
    var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    if (prefixRegex.test(capitalizedName)) {
      invariant(false, 'getVendorPrefixedName must only be called with unprefixed' + 'CSS property names. It was called with %s', property);
    }
    memoized[name] = name in testStyle ? name : getWithPrefix(capitalizedName);
  }
  return memoized[name];
}

module.exports = getVendorPrefixedName;
},{"./ExecutionEnvironment":30,"./camelize":56,"./invariant":64}],64:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;
}).call(this,require('_process'))
},{"_process":26}],65:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isEventSupported
 */

'use strict';

var ExecutionEnvironment = require('./ExecutionEnvironment');

var useHasFeature;
if (ExecutionEnvironment.canUseDOM) {
  useHasFeature = document.implementation && document.implementation.hasFeature &&
  // always returns true in newer browsers as per the standard.
  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
  document.implementation.hasFeature('', '') !== true;
}

/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported(eventNameSuffix, capture) {
  if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
    return false;
  }

  var eventName = 'on' + eventNameSuffix;
  var isSupported = (eventName in document);

  if (!isSupported) {
    var element = document.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}

module.exports = isEventSupported;
},{"./ExecutionEnvironment":30}],66:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isNode
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
'use strict';

function isNode(object) {
  return !!(object && (typeof Node === 'function' ? object instanceof Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;
},{}],67:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule joinClasses
 * @typechecks static-only
 */

'use strict';

/**
 * Combines multiple className strings into one.
 * http://jsperf.com/joinclasses-args-vs-array
 *
 * @param {...?string} className
 * @return {string}
 */
function joinClasses(className /*, ... */) {
  if (!className) {
    className = '';
  }
  var nextClass;
  var argLength = arguments.length;
  if (argLength > 1) {
    for (var ii = 1; ii < argLength; ii++) {
      nextClass = arguments[ii];
      if (nextClass) {
        className = (className ? className + ' ' : '') + nextClass;
      }
    }
  }
  return className;
}

module.exports = joinClasses;
},{}],68:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyMirror
 * @typechecks static-only
 */

'use strict';

var invariant = require('./invariant');

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function keyMirror(obj) {
  var ret = {};
  var key;
  invariant(obj instanceof Object && !Array.isArray(obj), 'keyMirror(...): Argument must be an object.');
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;
},{"./invariant":64}],69:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyOf
 */

/**
 * Allows extraction of a minified key. Let's the build system minify keys
 * without losing the ability to dynamically use key strings as values
 * themselves. Pass in an object with a single key/val pair and it will return
 * you the string key of that single record. Suppose you want to grab the
 * value for a key 'className' inside of an object. Key/val minification may
 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
 * reuse those resolutions.
 */
"use strict";

var keyOf = function keyOf(oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};

module.exports = keyOf;
},{}],70:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule mergeHelpers
 *
 * requiresPolyfills: Array.isArray
 */

'use strict';

var invariant = require('./invariant');
var keyMirror = require('./keyMirror');

/**
 * Maximum number of levels to traverse. Will catch circular structures.
 * @const
 */
var MAX_MERGE_DEPTH = 36;

/**
 * We won't worry about edge cases like new String('x') or new Boolean(true).
 * Functions and Dates are considered terminals, and arrays are not.
 * @param {*} o The item/object/value to test.
 * @return {boolean} true iff the argument is a terminal.
 */
var isTerminal = function isTerminal(o) {
  return typeof o !== 'object' || o instanceof Date || o === null;
};

var mergeHelpers = {

  MAX_MERGE_DEPTH: MAX_MERGE_DEPTH,

  isTerminal: isTerminal,

  /**
   * Converts null/undefined values into empty object.
   *
   * @param {?Object=} arg Argument to be normalized (nullable optional)
   * @return {!Object}
   */
  normalizeMergeArg: function normalizeMergeArg(arg) {
    return arg === undefined || arg === null ? {} : arg;
  },

  /**
   * If merging Arrays, a merge strategy *must* be supplied. If not, it is
   * likely the caller's fault. If this function is ever called with anything
   * but `one` and `two` being `Array`s, it is the fault of the merge utilities.
   *
   * @param {*} one Array to merge into.
   * @param {*} two Array to merge from.
   */
  checkMergeArrayArgs: function checkMergeArrayArgs(one, two) {
    invariant(Array.isArray(one) && Array.isArray(two), 'Tried to merge arrays, instead got %s and %s.', one, two);
  },

  /**
   * @param {*} one Object to merge into.
   * @param {*} two Object to merge from.
   */
  checkMergeObjectArgs: function checkMergeObjectArgs(one, two) {
    mergeHelpers.checkMergeObjectArg(one);
    mergeHelpers.checkMergeObjectArg(two);
  },

  /**
   * @param {*} arg
   */
  checkMergeObjectArg: function checkMergeObjectArg(arg) {
    invariant(!isTerminal(arg) && !Array.isArray(arg), 'Tried to merge an object, instead got %s.', arg);
  },

  /**
   * @param {*} arg
   */
  checkMergeIntoObjectArg: function checkMergeIntoObjectArg(arg) {
    invariant((!isTerminal(arg) || typeof arg === 'function') && !Array.isArray(arg), 'Tried to merge into an object, instead got %s.', arg);
  },

  /**
   * Checks that a merge was not given a circular object or an object that had
   * too great of depth.
   *
   * @param {number} Level of recursion to validate against maximum.
   */
  checkMergeLevel: function checkMergeLevel(level) {
    invariant(level < MAX_MERGE_DEPTH, 'Maximum deep merge depth exceeded. You may be attempting to merge ' + 'circular structures in an unsupported way.');
  },

  /**
   * Checks that the supplied merge strategy is valid.
   *
   * @param {string} Array merge strategy.
   */
  checkArrayStrategy: function checkArrayStrategy(strategy) {
    invariant(strategy === undefined || strategy in mergeHelpers.ArrayStrategies, 'You must provide an array strategy to deep merge functions to ' + 'instruct the deep merge how to resolve merging two arrays.');
  },

  /**
   * Set of possible behaviors of merge algorithms when encountering two Arrays
   * that must be merged together.
   * - `clobber`: The left `Array` is ignored.
   * - `indexByIndex`: The result is achieved by recursively deep merging at
   *   each index. (not yet supported.)
   */
  ArrayStrategies: keyMirror({
    Clobber: true,
    IndexByIndex: true
  })

};

module.exports = mergeHelpers;
},{"./invariant":64,"./keyMirror":68}],71:[function(require,module,exports){
(function (global){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule nativeRequestAnimationFrame
 */

"use strict";

var nativeRequestAnimationFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame || global.msRequestAnimationFrame;

module.exports = nativeRequestAnimationFrame;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],72:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule normalizeWheel
 * @typechecks
 */

'use strict';

var UserAgent_DEPRECATED = require('./UserAgent_DEPRECATED');

var isEventSupported = require('./isEventSupported');

// Reasonable defaults
var PIXEL_STEP = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;

/**
 * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
 * complicated, thus this doc is long and (hopefully) detailed enough to answer
 * your questions.
 *
 * If you need to react to the mouse wheel in a predictable way, this code is
 * like your bestest friend. * hugs *
 *
 * As of today, there are 4 DOM event types you can listen to:
 *
 *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
 *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
 *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
 *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
 *
 * So what to do?  The is the best:
 *
 *   normalizeWheel.getEventType();
 *
 * In your event callback, use this code to get sane interpretation of the
 * deltas.  This code will return an object with properties:
 *
 *   spinX   -- normalized spin speed (use for zoom) - x plane
 *   spinY   -- " - y plane
 *   pixelX  -- normalized distance (to pixels) - x plane
 *   pixelY  -- " - y plane
 *
 * Wheel values are provided by the browser assuming you are using the wheel to
 * scroll a web page by a number of lines or pixels (or pages).  Values can vary
 * significantly on different platforms and browsers, forgetting that you can
 * scroll at different speeds.  Some devices (like trackpads) emit more events
 * at smaller increments with fine granularity, and some emit massive jumps with
 * linear speed or acceleration.
 *
 * This code does its best to normalize the deltas for you:
 *
 *   - spin is trying to normalize how far the wheel was spun (or trackpad
 *     dragged).  This is super useful for zoom support where you want to
 *     throw away the chunky scroll steps on the PC and make those equal to
 *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
 *     resolve a single slow step on a wheel to 1.
 *
 *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
 *     get the crazy differences between browsers, but at least it'll be in
 *     pixels!
 *
 *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
 *     should translate to positive value zooming IN, negative zooming OUT.
 *     This matches the newer 'wheel' event.
 *
 * Why are there spinX, spinY (or pixels)?
 *
 *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
 *     with a mouse.  It results in side-scrolling in the browser by default.
 *
 *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
 *
 *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
 *     probably is by browsers in conjunction with fancy 3D controllers .. but
 *     you know.
 *
 * Implementation info:
 *
 * Examples of 'wheel' event if you scroll slowly (down) by one step with an
 * average mouse:
 *
 *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
 *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
 *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
 *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
 *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
 *
 * On the trackpad:
 *
 *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
 *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
 *
 * On other/older browsers.. it's more complicated as there can be multiple and
 * also missing delta values.
 *
 * The 'wheel' event is more standard:
 *
 * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
 *
 * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
 * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
 * backward compatibility with older events.  Those other values help us
 * better normalize spin speed.  Example of what the browsers provide:
 *
 *                          | event.wheelDelta | event.detail
 *        ------------------+------------------+--------------
 *          Safari v5/OS X  |       -120       |       0
 *          Safari v5/Win7  |       -120       |       0
 *         Chrome v17/OS X  |       -120       |       0
 *         Chrome v17/Win7  |       -120       |       0
 *                IE9/Win7  |       -120       |   undefined
 *         Firefox v4/OS X  |     undefined    |       1
 *         Firefox v4/Win7  |     undefined    |       3
 *
 */
function normalizeWheel( /*object*/event) /*object*/{
  var sX = 0,
      sY = 0,
      // spinX, spinY
  pX = 0,
      pY = 0; // pixelX, pixelY

  // Legacy
  if ('detail' in event) {
    sY = event.detail;
  }
  if ('wheelDelta' in event) {
    sY = -event.wheelDelta / 120;
  }
  if ('wheelDeltaY' in event) {
    sY = -event.wheelDeltaY / 120;
  }
  if ('wheelDeltaX' in event) {
    sX = -event.wheelDeltaX / 120;
  }

  // side scrolling on FF with DOMMouseScroll
  if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in event) {
    pY = event.deltaY;
  }
  if ('deltaX' in event) {
    pX = event.deltaX;
  }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode == 1) {
      // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else {
      // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) {
    sX = pX < 1 ? -1 : 1;
  }
  if (pY && !sY) {
    sY = pY < 1 ? -1 : 1;
  }

  return { spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY };
}

/**
 * The best combination if you prefer spinX + spinY normalization.  It favors
 * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
 * 'wheel' event, making spin speed determination impossible.
 */
normalizeWheel.getEventType = function () /*string*/{
  return UserAgent_DEPRECATED.firefox() ? 'DOMMouseScroll' : isEventSupported('wheel') ? 'wheel' : 'mousewheel';
};

module.exports = normalizeWheel;
},{"./UserAgent_DEPRECATED":55,"./isEventSupported":65}],73:[function(require,module,exports){
(function (global){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule requestAnimationFramePolyfill
 */

'use strict';

var emptyFunction = require('./emptyFunction');
var nativeRequestAnimationFrame = require('./nativeRequestAnimationFrame');

var lastTime = 0;

/**
 * Here is the native and polyfill version of requestAnimationFrame.
 * Please don't use it directly and use requestAnimationFrame module instead.
 */
var requestAnimationFrame = nativeRequestAnimationFrame || function (callback) {
  var currTime = Date.now();
  var timeDelay = Math.max(0, 16 - (currTime - lastTime));
  lastTime = currTime + timeDelay;
  return global.setTimeout(function () {
    callback(Date.now());
  }, timeDelay);
};

// Works around a rare bug in Safari 6 where the first request is never invoked.
requestAnimationFrame(emptyFunction);

module.exports = requestAnimationFrame;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./emptyFunction":62,"./nativeRequestAnimationFrame":71}],74:[function(require,module,exports){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule shallowEqual
 */

'use strict';

/**
 * Performs equality by iterating through keys on an object and returning
 * false when any key has values which are not strictly equal between
 * objA and objB. Returns true when the values of all keys are strictly equal.
 *
 * @return {boolean}
 */
function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],75:[function(require,module,exports){
(function (global){
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule translateDOMPositionXY
 * @typechecks
 */

'use strict';

var BrowserSupportCore = require('./BrowserSupportCore');

var getVendorPrefixedName = require('./getVendorPrefixedName');

var TRANSFORM = getVendorPrefixedName('transform');
var BACKFACE_VISIBILITY = getVendorPrefixedName('backfaceVisibility');

var translateDOMPositionXY = (function () {
  if (BrowserSupportCore.hasCSSTransforms()) {
    var ua = global.window ? global.window.navigator.userAgent : 'UNKNOWN';
    var isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);
    // It appears that Safari messes up the composition order
    // of GPU-accelerated layers
    // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
    // Use 2D translation instead.
    if (!isSafari && BrowserSupportCore.hasCSS3DTransforms()) {
      return function ( /*object*/style, /*number*/x, /*number*/y) {
        style[TRANSFORM] = 'translate3d(' + x + 'px,' + y + 'px,0)';
        style[BACKFACE_VISIBILITY] = 'hidden';
      };
    } else {
      return function ( /*object*/style, /*number*/x, /*number*/y) {
        style[TRANSFORM] = 'translate(' + x + 'px,' + y + 'px)';
      };
    }
  } else {
    return function ( /*object*/style, /*number*/x, /*number*/y) {
      style.left = x + 'px';
      style.top = y + 'px';
    };
  }
})();

module.exports = translateDOMPositionXY;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./BrowserSupportCore":27,"./getVendorPrefixedName":63}],76:[function(require,module,exports){
module.exports = require('./internal/FixedDataTableRoot');

},{"./internal/FixedDataTableRoot":39}],77:[function(require,module,exports){
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
},{"./mixins/component":83,"./row":86,"formsy-react":90,"react":"react"}],78:[function(require,module,exports){
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
},{"./mixins/component":83,"./row":86,"formsy-react":90,"react":"react"}],79:[function(require,module,exports){
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
},{"react":"react"}],80:[function(require,module,exports){
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
},{"./icon":79,"./mixins/component":83,"./row":86,"formsy-react":90,"react":"react"}],81:[function(require,module,exports){
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
},{"./icon":79,"./mixins/component":83,"./row":86,"formsy-react":90,"react":"react"}],82:[function(require,module,exports){
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
},{"./checkbox":78,"./checkbox-group":77,"./icon":79,"./input":81,"./input-file":80,"./mixins/component":83,"./mixins/parent-context":84,"./radio-group":85,"./row":86,"./select":87,"./textarea":88}],83:[function(require,module,exports){
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
},{"react":"react"}],84:[function(require,module,exports){
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
},{"react":"react"}],85:[function(require,module,exports){
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
},{"./mixins/component":83,"./row":86,"formsy-react":90,"react":"react"}],86:[function(require,module,exports){
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
},{"react":"react"}],87:[function(require,module,exports){
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
},{"./mixins/component":83,"./row":86,"formsy-react":90,"react":"react"}],88:[function(require,module,exports){
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
},{"./mixins/component":83,"./row":86,"formsy-react":90,"react":"react"}],89:[function(require,module,exports){
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

},{"./utils.js":91}],90:[function(require,module,exports){
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
},{"./Mixin.js":89,"./utils.js":91,"./validationRules.js":92,"react":"react"}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ResponderEventPlugin
 */

"use strict";

var EventConstants = require('react/lib/EventConstants');
var EventPluginUtils = require('react/lib/EventPluginUtils');
var EventPropagators = require('react/lib/EventPropagators');
var SyntheticEvent = require('react/lib/SyntheticEvent');

var accumulateInto = require('react/lib/accumulateInto');
var keyOf = require('react/lib/keyOf');

var isStartish = EventPluginUtils.isStartish;
var isMoveish = EventPluginUtils.isMoveish;
var isEndish = EventPluginUtils.isEndish;
var executeDirectDispatch = EventPluginUtils.executeDirectDispatch;
var hasDispatches = EventPluginUtils.hasDispatches;
var executeDispatchesInOrderStopAtTrue =
  EventPluginUtils.executeDispatchesInOrderStopAtTrue;

/**
 * ID of element that should respond to touch/move types of interactions, as
 * indicated explicitly by relevant callbacks.
 */
var responderID = null;
var isPressing = false;

var eventTypes = {
  /**
   * On a `touchStart`/`mouseDown`, is it desired that this element become the
   * responder?
   */
  startShouldSetResponder: {
    phasedRegistrationNames: {
      bubbled: keyOf({onStartShouldSetResponder: null}),
      captured: keyOf({onStartShouldSetResponderCapture: null})
    }
  },

  /**
   * On a `scroll`, is it desired that this element become the responder? This
   * is usually not needed, but should be used to retroactively infer that a
   * `touchStart` had occured during momentum scroll. During a momentum scroll,
   * a touch start will be immediately followed by a scroll event if the view is
   * currently scrolling.
   */
  scrollShouldSetResponder: {
    phasedRegistrationNames: {
      bubbled: keyOf({onScrollShouldSetResponder: null}),
      captured: keyOf({onScrollShouldSetResponderCapture: null})
    }
  },

  /**
   * On a `touchMove`/`mouseMove`, is it desired that this element become the
   * responder?
   */
  moveShouldSetResponder: {
    phasedRegistrationNames: {
      bubbled: keyOf({onMoveShouldSetResponder: null}),
      captured: keyOf({onMoveShouldSetResponderCapture: null})
    }
  },

  /**
   * Direct responder events dispatched directly to responder. Do not bubble.
   */
  responderMove: {registrationName: keyOf({onResponderMove: null})},
  responderRelease: {registrationName: keyOf({onResponderRelease: null})},
  responderTerminationRequest: {
    registrationName: keyOf({onResponderTerminationRequest: null})
  },
  responderGrant: {registrationName: keyOf({onResponderGrant: null})},
  responderReject: {registrationName: keyOf({onResponderReject: null})},
  responderTerminate: {registrationName: keyOf({onResponderTerminate: null})}
};

/**
 * Performs negotiation between any existing/current responder, checks to see if
 * any new entity is interested in becoming responder, performs that handshake
 * and returns any events that must be emitted to notify the relevant parties.
 *
 * A note about event ordering in the `EventPluginHub`.
 *
 * Suppose plugins are injected in the following order:
 *
 * `[R, S, C]`
 *
 * To help illustrate the example, assume `S` is `SimpleEventPlugin` (for
 * `onClick` etc) and `R` is `ResponderEventPlugin`.
 *
 * "Deferred-Dispatched Events":
 *
 * - The current event plugin system will traverse the list of injected plugins,
 *   in order, and extract events by collecting the plugin's return value of
 *   `extractEvents()`.
 * - These events that are returned from `extractEvents` are "deferred
 *   dispatched events".
 * - When returned from `extractEvents`, deferred-dispatched events contain an
 *   "accumulation" of deferred dispatches.
 * - These deferred dispatches are accumulated/collected before they are
 *   returned, but processed at a later time by the `EventPluginHub` (hence the
 *   name deferred).
 *
 * In the process of returning their deferred-dispatched events, event plugins
 * themselves can dispatch events on-demand without returning them from
 * `extractEvents`. Plugins might want to do this, so that they can use event
 * dispatching as a tool that helps them decide which events should be extracted
 * in the first place.
 *
 * "On-Demand-Dispatched Events":
 *
 * - On-demand-dispatched events are not returned from `extractEvents`.
 * - On-demand-dispatched events are dispatched during the process of returning
 *   the deferred-dispatched events.
 * - They should not have side effects.
 * - They should be avoided, and/or eventually be replaced with another
 *   abstraction that allows event plugins to perform multiple "rounds" of event
 *   extraction.
 *
 * Therefore, the sequence of event dispatches becomes:
 *
 * - `R`s on-demand events (if any)   (dispatched by `R` on-demand)
 * - `S`s on-demand events (if any)   (dispatched by `S` on-demand)
 * - `C`s on-demand events (if any)   (dispatched by `C` on-demand)
 * - `R`s extracted events (if any)   (dispatched by `EventPluginHub`)
 * - `S`s extracted events (if any)   (dispatched by `EventPluginHub`)
 * - `C`s extracted events (if any)   (dispatched by `EventPluginHub`)
 *
 * In the case of `ResponderEventPlugin`: If the `startShouldSetResponder`
 * on-demand dispatch returns `true` (and some other details are satisfied) the
 * `onResponderGrant` deferred dispatched event is returned from
 * `extractEvents`. The sequence of dispatch executions in this case
 * will appear as follows:
 *
 * - `startShouldSetResponder` (`ResponderEventPlugin` dispatches on-demand)
 * - `touchStartCapture`       (`EventPluginHub` dispatches as usual)
 * - `touchStart`              (`EventPluginHub` dispatches as usual)
 * - `responderGrant/Reject`   (`EventPluginHub` dispatches as usual)
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {string} topLevelTargetID ID of deepest React rendered element.
 * @param {object} nativeEvent Native browser event.
 * @return {*} An accumulation of synthetic events.
 */
function setResponderAndExtractTransfer(
    topLevelType,
    topLevelTargetID,
    nativeEvent) {
  var shouldSetEventType =
    isStartish(topLevelType) ? eventTypes.startShouldSetResponder :
    isMoveish(topLevelType) ? eventTypes.moveShouldSetResponder :
    eventTypes.scrollShouldSetResponder;

  var bubbleShouldSetFrom = responderID || topLevelTargetID;
  var shouldSetEvent = SyntheticEvent.getPooled(
    shouldSetEventType,
    bubbleShouldSetFrom,
    nativeEvent
  );
  EventPropagators.accumulateTwoPhaseDispatches(shouldSetEvent);
  var wantsResponderID = executeDispatchesInOrderStopAtTrue(shouldSetEvent);
  if (!shouldSetEvent.isPersistent()) {
    shouldSetEvent.constructor.release(shouldSetEvent);
  }

  if (!wantsResponderID || wantsResponderID === responderID) {
    return null;
  }
  var extracted;
  var grantEvent = SyntheticEvent.getPooled(
    eventTypes.responderGrant,
    wantsResponderID,
    nativeEvent
  );

  EventPropagators.accumulateDirectDispatches(grantEvent);
  if (responderID) {
    var terminationRequestEvent = SyntheticEvent.getPooled(
      eventTypes.responderTerminationRequest,
      responderID,
      nativeEvent
    );
    EventPropagators.accumulateDirectDispatches(terminationRequestEvent);
    var shouldSwitch = !hasDispatches(terminationRequestEvent) ||
      executeDirectDispatch(terminationRequestEvent);
    if (!terminationRequestEvent.isPersistent()) {
      terminationRequestEvent.constructor.release(terminationRequestEvent);
    }

    if (shouldSwitch) {
      var terminateType = eventTypes.responderTerminate;
      var terminateEvent = SyntheticEvent.getPooled(
        terminateType,
        responderID,
        nativeEvent
      );
      EventPropagators.accumulateDirectDispatches(terminateEvent);
      extracted = accumulateInto(extracted, [grantEvent, terminateEvent]);
      responderID = wantsResponderID;
    } else {
      var rejectEvent = SyntheticEvent.getPooled(
        eventTypes.responderReject,
        wantsResponderID,
        nativeEvent
      );
      EventPropagators.accumulateDirectDispatches(rejectEvent);
      extracted = accumulateInto(extracted, rejectEvent);
    }
  } else {
    extracted = accumulateInto(extracted, grantEvent);
    responderID = wantsResponderID;
  }
  return extracted;
}

/**
 * A transfer is a negotiation between a currently set responder and the next
 * element to claim responder status. Any start event could trigger a transfer
 * of responderID. Any move event could trigger a transfer, so long as there is
 * currently a responder set (in other words as long as the user is pressing
 * down).
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @return {boolean} True if a transfer of responder could possibly occur.
 */
function canTriggerTransfer(topLevelType) {
  return topLevelType === EventConstants.topLevelTypes.topScroll ||
         isStartish(topLevelType) ||
         (isPressing && isMoveish(topLevelType));
}

/**
 * Event plugin for formalizing the negotiation between claiming locks on
 * receiving touches.
 */
var ResponderEventPlugin = {

  getResponderID: function() {
    return responderID;
  },

  eventTypes: eventTypes,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    var extracted;
    // Must have missed an end event - reset the state here.
    if (responderID && isStartish(topLevelType)) {
      responderID = null;
    }
    if (isStartish(topLevelType)) {
      isPressing = true;
    } else if (isEndish(topLevelType)) {
      isPressing = false;
    }
    if (canTriggerTransfer(topLevelType)) {
      var transfer = setResponderAndExtractTransfer(
        topLevelType,
        topLevelTargetID,
        nativeEvent
      );
      if (transfer) {
        extracted = accumulateInto(extracted, transfer);
      }
    }
    // Now that we know the responder is set correctly, we can dispatch
    // responder type events (directly to the responder).
    var type = isMoveish(topLevelType) ? eventTypes.responderMove :
      isEndish(topLevelType) ? eventTypes.responderRelease :
      isStartish(topLevelType) ? eventTypes.responderStart : null;
    if (type) {
      var gesture = SyntheticEvent.getPooled(
        type,
        responderID || '',
        nativeEvent
      );
      EventPropagators.accumulateDirectDispatches(gesture);
      extracted = accumulateInto(extracted, gesture);
    }
    if (type === eventTypes.responderRelease) {
      responderID = null;
    }
    return extracted;
  }

};

module.exports = ResponderEventPlugin;

},{"react/lib/EventConstants":97,"react/lib/EventPluginUtils":100,"react/lib/EventPropagators":101,"react/lib/SyntheticEvent":104,"react/lib/accumulateInto":107,"react/lib/keyOf":113}],94:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule TapEventPlugin
 * @typechecks static-only
 */

"use strict";

var EventConstants = require('react/lib/EventConstants');
var EventPluginUtils = require('react/lib/EventPluginUtils');
var EventPropagators = require('react/lib/EventPropagators');
var SyntheticUIEvent = require('react/lib/SyntheticUIEvent');
var TouchEventUtils = require('./TouchEventUtils');
var ViewportMetrics = require('react/lib/ViewportMetrics');

var keyOf = require('react/lib/keyOf');
var topLevelTypes = EventConstants.topLevelTypes;

var isStartish = EventPluginUtils.isStartish;
var isEndish = EventPluginUtils.isEndish;

var isTouch = function(topLevelType) {
  var touchTypes = [
    topLevelTypes.topTouchCancel,
    topLevelTypes.topTouchEnd,
    topLevelTypes.topTouchStart,
    topLevelTypes.topTouchMove
  ];
  return touchTypes.indexOf(topLevelType) >= 0;
}

/**
 * Number of pixels that are tolerated in between a `touchStart` and `touchEnd`
 * in order to still be considered a 'tap' event.
 */
var tapMoveThreshold = 10;
var ignoreMouseThreshold = 750;
var startCoords = {x: null, y: null};
var lastTouchEvent = null;

var Axis = {
  x: {page: 'pageX', client: 'clientX', envScroll: 'currentPageScrollLeft'},
  y: {page: 'pageY', client: 'clientY', envScroll: 'currentPageScrollTop'}
};

function getAxisCoordOfEvent(axis, nativeEvent) {
  var singleTouch = TouchEventUtils.extractSingleTouch(nativeEvent);
  if (singleTouch) {
    return singleTouch[axis.page];
  }
  return axis.page in nativeEvent ?
    nativeEvent[axis.page] :
    nativeEvent[axis.client] + ViewportMetrics[axis.envScroll];
}

function getDistance(coords, nativeEvent) {
  var pageX = getAxisCoordOfEvent(Axis.x, nativeEvent);
  var pageY = getAxisCoordOfEvent(Axis.y, nativeEvent);
  return Math.pow(
    Math.pow(pageX - coords.x, 2) + Math.pow(pageY - coords.y, 2),
    0.5
  );
}

var dependencies = [
  topLevelTypes.topMouseDown,
  topLevelTypes.topMouseMove,
  topLevelTypes.topMouseUp
];

if (EventPluginUtils.useTouchEvents) {
  dependencies.push(
    topLevelTypes.topTouchEnd,
    topLevelTypes.topTouchStart,
    topLevelTypes.topTouchMove
  );
}

var eventTypes = {
  touchTap: {
    phasedRegistrationNames: {
      bubbled: keyOf({onTouchTap: null}),
      captured: keyOf({onTouchTapCapture: null})
    },
    dependencies: dependencies
  }
};

var now = function() {
  if (Date.now) {
    return Date.now();
  } else {
    // IE8 support: http://stackoverflow.com/questions/9430357/please-explain-why-and-how-new-date-works-as-workaround-for-date-now-in
    return +new Date;
  }
}

var TapEventPlugin = {

  tapMoveThreshold: tapMoveThreshold,

  ignoreMouseThreshold: ignoreMouseThreshold,

  eventTypes: eventTypes,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {

    if (isTouch(topLevelType)) {
      lastTouchEvent = now();
    } else {
      if (lastTouchEvent && (now() - lastTouchEvent) < ignoreMouseThreshold) {
        return null;
      }
    }

    if (!isStartish(topLevelType) && !isEndish(topLevelType)) {
      return null;
    }
    var event = null;
    var distance = getDistance(startCoords, nativeEvent);
    if (isEndish(topLevelType) && distance < tapMoveThreshold) {
      event = SyntheticUIEvent.getPooled(
        eventTypes.touchTap,
        topLevelTargetID,
        nativeEvent
      );
    }
    if (isStartish(topLevelType)) {
      startCoords.x = getAxisCoordOfEvent(Axis.x, nativeEvent);
      startCoords.y = getAxisCoordOfEvent(Axis.y, nativeEvent);
    } else if (isEndish(topLevelType)) {
      startCoords.x = 0;
      startCoords.y = 0;
    }
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  }

};

module.exports = TapEventPlugin;

},{"./TouchEventUtils":95,"react/lib/EventConstants":97,"react/lib/EventPluginUtils":100,"react/lib/EventPropagators":101,"react/lib/SyntheticUIEvent":105,"react/lib/ViewportMetrics":106,"react/lib/keyOf":113}],95:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule TouchEventUtils
 */

var TouchEventUtils = {
  /**
   * Utility function for common case of extracting out the primary touch from a
   * touch event.
   * - `touchEnd` events usually do not have the `touches` property.
   *   http://stackoverflow.com/questions/3666929/
   *   mobile-sarai-touchend-event-not-firing-when-last-touch-is-removed
   *
   * @param {Event} nativeEvent Native event that may or may not be a touch.
   * @return {TouchesObject?} an object with pageX and pageY or null.
   */
  extractSingleTouch: function(nativeEvent) {
    var touches = nativeEvent.touches;
    var changedTouches = nativeEvent.changedTouches;
    var hasTouches = touches && touches.length > 0;
    var hasChangedTouches = changedTouches && changedTouches.length > 0;

    return !hasTouches && hasChangedTouches ? changedTouches[0] :
           hasTouches ? touches[0] :
           nativeEvent;
  }
};

module.exports = TouchEventUtils;

},{}],96:[function(require,module,exports){
module.exports = function injectTapEventPlugin () {
  var React = require("react");
  React.initializeTouchEvents(true);

  require('react/lib/EventPluginHub').injection.injectEventPluginsByName({
    "ResponderEventPlugin": require('./ResponderEventPlugin.js'),
    "TapEventPlugin":       require('./TapEventPlugin.js')
  });
};

},{"./ResponderEventPlugin.js":93,"./TapEventPlugin.js":94,"react":"react","react/lib/EventPluginHub":98}],97:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventConstants
 */

'use strict';

var keyMirror = require("./keyMirror");

var PropagationPhases = keyMirror({bubbled: null, captured: null});

/**
 * Types of raw signals from the browser caught at the top level.
 */
var topLevelTypes = keyMirror({
  topBlur: null,
  topChange: null,
  topClick: null,
  topCompositionEnd: null,
  topCompositionStart: null,
  topCompositionUpdate: null,
  topContextMenu: null,
  topCopy: null,
  topCut: null,
  topDoubleClick: null,
  topDrag: null,
  topDragEnd: null,
  topDragEnter: null,
  topDragExit: null,
  topDragLeave: null,
  topDragOver: null,
  topDragStart: null,
  topDrop: null,
  topError: null,
  topFocus: null,
  topInput: null,
  topKeyDown: null,
  topKeyPress: null,
  topKeyUp: null,
  topLoad: null,
  topMouseDown: null,
  topMouseMove: null,
  topMouseOut: null,
  topMouseOver: null,
  topMouseUp: null,
  topPaste: null,
  topReset: null,
  topScroll: null,
  topSelectionChange: null,
  topSubmit: null,
  topTextInput: null,
  topTouchCancel: null,
  topTouchEnd: null,
  topTouchMove: null,
  topTouchStart: null,
  topWheel: null
});

var EventConstants = {
  topLevelTypes: topLevelTypes,
  PropagationPhases: PropagationPhases
};

module.exports = EventConstants;

},{"./keyMirror":112}],98:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventPluginHub
 */

'use strict';

var EventPluginRegistry = require("./EventPluginRegistry");
var EventPluginUtils = require("./EventPluginUtils");

var accumulateInto = require("./accumulateInto");
var forEachAccumulated = require("./forEachAccumulated");
var invariant = require("./invariant");

/**
 * Internal store for event listeners
 */
var listenerBank = {};

/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */
var eventQueue = null;

/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @private
 */
var executeDispatchesAndRelease = function(event) {
  if (event) {
    var executeDispatch = EventPluginUtils.executeDispatch;
    // Plugins can provide custom behavior when dispatching events.
    var PluginModule = EventPluginRegistry.getPluginModuleForEvent(event);
    if (PluginModule && PluginModule.executeDispatch) {
      executeDispatch = PluginModule.executeDispatch;
    }
    EventPluginUtils.executeDispatchesInOrder(event, executeDispatch);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};

/**
 * - `InstanceHandle`: [required] Module that performs logical traversals of DOM
 *   hierarchy given ids of the logical DOM elements involved.
 */
var InstanceHandle = null;

function validateInstanceHandle() {
  var valid =
    InstanceHandle &&
    InstanceHandle.traverseTwoPhase &&
    InstanceHandle.traverseEnterLeave;
  ("production" !== process.env.NODE_ENV ? invariant(
    valid,
    'InstanceHandle not injected before use!'
  ) : invariant(valid));
}

/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */
var EventPluginHub = {

  /**
   * Methods for injecting dependencies.
   */
  injection: {

    /**
     * @param {object} InjectedMount
     * @public
     */
    injectMount: EventPluginUtils.injection.injectMount,

    /**
     * @param {object} InjectedInstanceHandle
     * @public
     */
    injectInstanceHandle: function(InjectedInstanceHandle) {
      InstanceHandle = InjectedInstanceHandle;
      if ("production" !== process.env.NODE_ENV) {
        validateInstanceHandle();
      }
    },

    getInstanceHandle: function() {
      if ("production" !== process.env.NODE_ENV) {
        validateInstanceHandle();
      }
      return InstanceHandle;
    },

    /**
     * @param {array} InjectedEventPluginOrder
     * @public
     */
    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

    /**
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     */
    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

  },

  eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,

  registrationNameModules: EventPluginRegistry.registrationNameModules,

  /**
   * Stores `listener` at `listenerBank[registrationName][id]`. Is idempotent.
   *
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {?function} listener The callback to store.
   */
  putListener: function(id, registrationName, listener) {
    ("production" !== process.env.NODE_ENV ? invariant(
      !listener || typeof listener === 'function',
      'Expected %s listener to be a function, instead got type %s',
      registrationName, typeof listener
    ) : invariant(!listener || typeof listener === 'function'));

    var bankForRegistrationName =
      listenerBank[registrationName] || (listenerBank[registrationName] = {});
    bankForRegistrationName[id] = listener;
  },

  /**
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @return {?function} The stored callback.
   */
  getListener: function(id, registrationName) {
    var bankForRegistrationName = listenerBank[registrationName];
    return bankForRegistrationName && bankForRegistrationName[id];
  },

  /**
   * Deletes a listener from the registration bank.
   *
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   */
  deleteListener: function(id, registrationName) {
    var bankForRegistrationName = listenerBank[registrationName];
    if (bankForRegistrationName) {
      delete bankForRegistrationName[id];
    }
  },

  /**
   * Deletes all listeners for the DOM element with the supplied ID.
   *
   * @param {string} id ID of the DOM element.
   */
  deleteAllListeners: function(id) {
    for (var registrationName in listenerBank) {
      delete listenerBank[registrationName][id];
    }
  },

  /**
   * Allows registered plugins an opportunity to extract events from top-level
   * native browser events.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @internal
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    var events;
    var plugins = EventPluginRegistry.plugins;
    for (var i = 0, l = plugins.length; i < l; i++) {
      // Not every plugin in the ordering may be loaded at runtime.
      var possiblePlugin = plugins[i];
      if (possiblePlugin) {
        var extractedEvents = possiblePlugin.extractEvents(
          topLevelType,
          topLevelTarget,
          topLevelTargetID,
          nativeEvent
        );
        if (extractedEvents) {
          events = accumulateInto(events, extractedEvents);
        }
      }
    }
    return events;
  },

  /**
   * Enqueues a synthetic event that should be dispatched when
   * `processEventQueue` is invoked.
   *
   * @param {*} events An accumulation of synthetic events.
   * @internal
   */
  enqueueEvents: function(events) {
    if (events) {
      eventQueue = accumulateInto(eventQueue, events);
    }
  },

  /**
   * Dispatches all synthetic events on the event queue.
   *
   * @internal
   */
  processEventQueue: function() {
    // Set `eventQueue` to null before processing it so that we can tell if more
    // events get enqueued while processing.
    var processingEventQueue = eventQueue;
    eventQueue = null;
    forEachAccumulated(processingEventQueue, executeDispatchesAndRelease);
    ("production" !== process.env.NODE_ENV ? invariant(
      !eventQueue,
      'processEventQueue(): Additional events were enqueued while processing ' +
      'an event queue. Support for this has not yet been implemented.'
    ) : invariant(!eventQueue));
  },

  /**
   * These are needed for tests only. Do not use!
   */
  __purge: function() {
    listenerBank = {};
  },

  __getListenerBank: function() {
    return listenerBank;
  }

};

module.exports = EventPluginHub;

}).call(this,require('_process'))
},{"./EventPluginRegistry":99,"./EventPluginUtils":100,"./accumulateInto":107,"./forEachAccumulated":109,"./invariant":111,"_process":26}],99:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventPluginRegistry
 * @typechecks static-only
 */

'use strict';

var invariant = require("./invariant");

/**
 * Injectable ordering of event plugins.
 */
var EventPluginOrder = null;

/**
 * Injectable mapping from names to event plugin modules.
 */
var namesToPlugins = {};

/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */
function recomputePluginOrdering() {
  if (!EventPluginOrder) {
    // Wait until an `EventPluginOrder` is injected.
    return;
  }
  for (var pluginName in namesToPlugins) {
    var PluginModule = namesToPlugins[pluginName];
    var pluginIndex = EventPluginOrder.indexOf(pluginName);
    ("production" !== process.env.NODE_ENV ? invariant(
      pluginIndex > -1,
      'EventPluginRegistry: Cannot inject event plugins that do not exist in ' +
      'the plugin ordering, `%s`.',
      pluginName
    ) : invariant(pluginIndex > -1));
    if (EventPluginRegistry.plugins[pluginIndex]) {
      continue;
    }
    ("production" !== process.env.NODE_ENV ? invariant(
      PluginModule.extractEvents,
      'EventPluginRegistry: Event plugins must implement an `extractEvents` ' +
      'method, but `%s` does not.',
      pluginName
    ) : invariant(PluginModule.extractEvents));
    EventPluginRegistry.plugins[pluginIndex] = PluginModule;
    var publishedEvents = PluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      ("production" !== process.env.NODE_ENV ? invariant(
        publishEventForPlugin(
          publishedEvents[eventName],
          PluginModule,
          eventName
        ),
        'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',
        eventName,
        pluginName
      ) : invariant(publishEventForPlugin(
        publishedEvents[eventName],
        PluginModule,
        eventName
      )));
    }
  }
}

/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */
function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
  ("production" !== process.env.NODE_ENV ? invariant(
    !EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName),
    'EventPluginHub: More than one plugin attempted to publish the same ' +
    'event name, `%s`.',
    eventName
  ) : invariant(!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName)));
  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(
          phasedRegistrationName,
          PluginModule,
          eventName
        );
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(
      dispatchConfig.registrationName,
      PluginModule,
      eventName
    );
    return true;
  }
  return false;
}

/**
 * Publishes a registration name that is used to identify dispatched events and
 * can be used with `EventPluginHub.putListener` to register listeners.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */
function publishRegistrationName(registrationName, PluginModule, eventName) {
  ("production" !== process.env.NODE_ENV ? invariant(
    !EventPluginRegistry.registrationNameModules[registrationName],
    'EventPluginHub: More than one plugin attempted to publish the same ' +
    'registration name, `%s`.',
    registrationName
  ) : invariant(!EventPluginRegistry.registrationNameModules[registrationName]));
  EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
  EventPluginRegistry.registrationNameDependencies[registrationName] =
    PluginModule.eventTypes[eventName].dependencies;
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */
var EventPluginRegistry = {

  /**
   * Ordered list of injected plugins.
   */
  plugins: [],

  /**
   * Mapping from event name to dispatch config
   */
  eventNameDispatchConfigs: {},

  /**
   * Mapping from registration name to plugin module
   */
  registrationNameModules: {},

  /**
   * Mapping from registration name to event name
   */
  registrationNameDependencies: {},

  /**
   * Injects an ordering of plugins (by plugin name). This allows the ordering
   * to be decoupled from injection of the actual plugins so that ordering is
   * always deterministic regardless of packaging, on-the-fly injection, etc.
   *
   * @param {array} InjectedEventPluginOrder
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginOrder}
   */
  injectEventPluginOrder: function(InjectedEventPluginOrder) {
    ("production" !== process.env.NODE_ENV ? invariant(
      !EventPluginOrder,
      'EventPluginRegistry: Cannot inject event plugin ordering more than ' +
      'once. You are likely trying to load more than one copy of React.'
    ) : invariant(!EventPluginOrder));
    // Clone the ordering so it cannot be dynamically mutated.
    EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
    recomputePluginOrdering();
  },

  /**
   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
   * in the ordering injected by `injectEventPluginOrder`.
   *
   * Plugins can be injected as part of page initialization or on-the-fly.
   *
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginsByName}
   */
  injectEventPluginsByName: function(injectedNamesToPlugins) {
    var isOrderingDirty = false;
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }
      var PluginModule = injectedNamesToPlugins[pluginName];
      if (!namesToPlugins.hasOwnProperty(pluginName) ||
          namesToPlugins[pluginName] !== PluginModule) {
        ("production" !== process.env.NODE_ENV ? invariant(
          !namesToPlugins[pluginName],
          'EventPluginRegistry: Cannot inject two different event plugins ' +
          'using the same name, `%s`.',
          pluginName
        ) : invariant(!namesToPlugins[pluginName]));
        namesToPlugins[pluginName] = PluginModule;
        isOrderingDirty = true;
      }
    }
    if (isOrderingDirty) {
      recomputePluginOrdering();
    }
  },

  /**
   * Looks up the plugin for the supplied event.
   *
   * @param {object} event A synthetic event.
   * @return {?object} The plugin that created the supplied event.
   * @internal
   */
  getPluginModuleForEvent: function(event) {
    var dispatchConfig = event.dispatchConfig;
    if (dispatchConfig.registrationName) {
      return EventPluginRegistry.registrationNameModules[
        dispatchConfig.registrationName
      ] || null;
    }
    for (var phase in dispatchConfig.phasedRegistrationNames) {
      if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
        continue;
      }
      var PluginModule = EventPluginRegistry.registrationNameModules[
        dispatchConfig.phasedRegistrationNames[phase]
      ];
      if (PluginModule) {
        return PluginModule;
      }
    }
    return null;
  },

  /**
   * Exposed for unit testing.
   * @private
   */
  _resetEventPlugins: function() {
    EventPluginOrder = null;
    for (var pluginName in namesToPlugins) {
      if (namesToPlugins.hasOwnProperty(pluginName)) {
        delete namesToPlugins[pluginName];
      }
    }
    EventPluginRegistry.plugins.length = 0;

    var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
    for (var eventName in eventNameDispatchConfigs) {
      if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
        delete eventNameDispatchConfigs[eventName];
      }
    }

    var registrationNameModules = EventPluginRegistry.registrationNameModules;
    for (var registrationName in registrationNameModules) {
      if (registrationNameModules.hasOwnProperty(registrationName)) {
        delete registrationNameModules[registrationName];
      }
    }
  }

};

module.exports = EventPluginRegistry;

}).call(this,require('_process'))
},{"./invariant":111,"_process":26}],100:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventPluginUtils
 */

'use strict';

var EventConstants = require("./EventConstants");

var invariant = require("./invariant");

/**
 * Injected dependencies:
 */

/**
 * - `Mount`: [required] Module that can convert between React dom IDs and
 *   actual node references.
 */
var injection = {
  Mount: null,
  injectMount: function(InjectedMount) {
    injection.Mount = InjectedMount;
    if ("production" !== process.env.NODE_ENV) {
      ("production" !== process.env.NODE_ENV ? invariant(
        InjectedMount && InjectedMount.getNode,
        'EventPluginUtils.injection.injectMount(...): Injected Mount module ' +
        'is missing getNode.'
      ) : invariant(InjectedMount && InjectedMount.getNode));
    }
  }
};

var topLevelTypes = EventConstants.topLevelTypes;

function isEndish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseUp ||
         topLevelType === topLevelTypes.topTouchEnd ||
         topLevelType === topLevelTypes.topTouchCancel;
}

function isMoveish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseMove ||
         topLevelType === topLevelTypes.topTouchMove;
}
function isStartish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseDown ||
         topLevelType === topLevelTypes.topTouchStart;
}


var validateEventDispatches;
if ("production" !== process.env.NODE_ENV) {
  validateEventDispatches = function(event) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchIDs = event._dispatchIDs;

    var listenersIsArr = Array.isArray(dispatchListeners);
    var idsIsArr = Array.isArray(dispatchIDs);
    var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
    var listenersLen = listenersIsArr ?
      dispatchListeners.length :
      dispatchListeners ? 1 : 0;

    ("production" !== process.env.NODE_ENV ? invariant(
      idsIsArr === listenersIsArr && IDsLen === listenersLen,
      'EventPluginUtils: Invalid `event`.'
    ) : invariant(idsIsArr === listenersIsArr && IDsLen === listenersLen));
  };
}

/**
 * Invokes `cb(event, listener, id)`. Avoids using call if no scope is
 * provided. The `(listener,id)` pair effectively forms the "dispatch" but are
 * kept separate to conserve memory.
 */
function forEachEventDispatch(event, cb) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchIDs = event._dispatchIDs;
  if ("production" !== process.env.NODE_ENV) {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and IDs are two parallel arrays that are always in sync.
      cb(event, dispatchListeners[i], dispatchIDs[i]);
    }
  } else if (dispatchListeners) {
    cb(event, dispatchListeners, dispatchIDs);
  }
}

/**
 * Default implementation of PluginModule.executeDispatch().
 * @param {SyntheticEvent} SyntheticEvent to handle
 * @param {function} Application-level callback
 * @param {string} domID DOM id to pass to the callback.
 */
function executeDispatch(event, listener, domID) {
  event.currentTarget = injection.Mount.getNode(domID);
  var returnValue = listener(event, domID);
  event.currentTarget = null;
  return returnValue;
}

/**
 * Standard/simple iteration through an event's collected dispatches.
 */
function executeDispatchesInOrder(event, cb) {
  forEachEventDispatch(event, cb);
  event._dispatchListeners = null;
  event._dispatchIDs = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches, but stops
 * at the first dispatch execution returning true, and returns that id.
 *
 * @return id of the first dispatch execution who's listener returns true, or
 * null if no listener returned true.
 */
function executeDispatchesInOrderStopAtTrueImpl(event) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchIDs = event._dispatchIDs;
  if ("production" !== process.env.NODE_ENV) {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and IDs are two parallel arrays that are always in sync.
      if (dispatchListeners[i](event, dispatchIDs[i])) {
        return dispatchIDs[i];
      }
    }
  } else if (dispatchListeners) {
    if (dispatchListeners(event, dispatchIDs)) {
      return dispatchIDs;
    }
  }
  return null;
}

/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */
function executeDispatchesInOrderStopAtTrue(event) {
  var ret = executeDispatchesInOrderStopAtTrueImpl(event);
  event._dispatchIDs = null;
  event._dispatchListeners = null;
  return ret;
}

/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return The return value of executing the single dispatch.
 */
function executeDirectDispatch(event) {
  if ("production" !== process.env.NODE_ENV) {
    validateEventDispatches(event);
  }
  var dispatchListener = event._dispatchListeners;
  var dispatchID = event._dispatchIDs;
  ("production" !== process.env.NODE_ENV ? invariant(
    !Array.isArray(dispatchListener),
    'executeDirectDispatch(...): Invalid `event`.'
  ) : invariant(!Array.isArray(dispatchListener)));
  var res = dispatchListener ?
    dispatchListener(event, dispatchID) :
    null;
  event._dispatchListeners = null;
  event._dispatchIDs = null;
  return res;
}

/**
 * @param {SyntheticEvent} event
 * @return {bool} True iff number of dispatches accumulated is greater than 0.
 */
function hasDispatches(event) {
  return !!event._dispatchListeners;
}

/**
 * General utilities that are useful in creating custom Event Plugins.
 */
var EventPluginUtils = {
  isEndish: isEndish,
  isMoveish: isMoveish,
  isStartish: isStartish,

  executeDirectDispatch: executeDirectDispatch,
  executeDispatch: executeDispatch,
  executeDispatchesInOrder: executeDispatchesInOrder,
  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
  hasDispatches: hasDispatches,
  injection: injection,
  useTouchEvents: false
};

module.exports = EventPluginUtils;

}).call(this,require('_process'))
},{"./EventConstants":97,"./invariant":111,"_process":26}],101:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventPropagators
 */

'use strict';

var EventConstants = require("./EventConstants");
var EventPluginHub = require("./EventPluginHub");

var accumulateInto = require("./accumulateInto");
var forEachAccumulated = require("./forEachAccumulated");

var PropagationPhases = EventConstants.PropagationPhases;
var getListener = EventPluginHub.getListener;

/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */
function listenerAtPhase(id, event, propagationPhase) {
  var registrationName =
    event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return getListener(id, registrationName);
}

/**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */
function accumulateDirectionalDispatches(domID, upwards, event) {
  if ("production" !== process.env.NODE_ENV) {
    if (!domID) {
      throw new Error('Dispatching id must not be null');
    }
  }
  var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
  var listener = listenerAtPhase(domID, event, phase);
  if (listener) {
    event._dispatchListeners =
      accumulateInto(event._dispatchListeners, listener);
    event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
  }
}

/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We can not perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(
      event.dispatchMarker,
      accumulateDirectionalDispatches,
      event
    );
  }
}


/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */
function accumulateDispatches(id, ignoredDirection, event) {
  if (event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = getListener(id, registrationName);
    if (listener) {
      event._dispatchListeners =
        accumulateInto(event._dispatchListeners, listener);
      event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
    }
  }
}

/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */
function accumulateDirectDispatchesSingle(event) {
  if (event && event.dispatchConfig.registrationName) {
    accumulateDispatches(event.dispatchMarker, null, event);
  }
}

function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}

function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
  EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(
    fromID,
    toID,
    accumulateDispatches,
    leave,
    enter
  );
}


function accumulateDirectDispatches(events) {
  forEachAccumulated(events, accumulateDirectDispatchesSingle);
}



/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing event a
 * single one.
 *
 * @constructor EventPropagators
 */
var EventPropagators = {
  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
  accumulateDirectDispatches: accumulateDirectDispatches,
  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
};

module.exports = EventPropagators;

}).call(this,require('_process'))
},{"./EventConstants":97,"./EventPluginHub":98,"./accumulateInto":107,"./forEachAccumulated":109,"_process":26}],102:[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

'use strict';

function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
}

module.exports = assign;

},{}],103:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule PooledClass
 */

'use strict';

var invariant = require("./invariant");

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function(copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function(a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function(a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4, a5);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4, a5);
  }
};

var standardReleaser = function(instance) {
  var Klass = this;
  ("production" !== process.env.NODE_ENV ? invariant(
    instance instanceof Klass,
    'Trying to release an instance into a pool of a different type.'
  ) : invariant(instance instanceof Klass));
  if (instance.destructor) {
    instance.destructor();
  }
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances (optional).
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function(CopyConstructor, pooler) {
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fiveArgumentPooler: fiveArgumentPooler
};

module.exports = PooledClass;

}).call(this,require('_process'))
},{"./invariant":111,"_process":26}],104:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticEvent
 * @typechecks static-only
 */

'use strict';

var PooledClass = require("./PooledClass");

var assign = require("./Object.assign");
var emptyFunction = require("./emptyFunction");
var getEventTarget = require("./getEventTarget");

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var EventInterface = {
  type: null,
  target: getEventTarget,
  // currentTarget is set when dispatching; no use in copying it here
  currentTarget: emptyFunction.thatReturnsNull,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function(event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 */
function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  this.dispatchConfig = dispatchConfig;
  this.dispatchMarker = dispatchMarker;
  this.nativeEvent = nativeEvent;

  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) {
      continue;
    }
    var normalize = Interface[propName];
    if (normalize) {
      this[propName] = normalize(nativeEvent);
    } else {
      this[propName] = nativeEvent[propName];
    }
  }

  var defaultPrevented = nativeEvent.defaultPrevented != null ?
    nativeEvent.defaultPrevented :
    nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  } else {
    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
  }
  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
}

assign(SyntheticEvent.prototype, {

  preventDefault: function() {
    this.defaultPrevented = true;
    var event = this.nativeEvent;
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  },

  stopPropagation: function() {
    var event = this.nativeEvent;
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
  },

  /**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */
  persist: function() {
    this.isPersistent = emptyFunction.thatReturnsTrue;
  },

  /**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */
  isPersistent: emptyFunction.thatReturnsFalse,

  /**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */
  destructor: function() {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      this[propName] = null;
    }
    this.dispatchConfig = null;
    this.dispatchMarker = null;
    this.nativeEvent = null;
  }

});

SyntheticEvent.Interface = EventInterface;

/**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */
SyntheticEvent.augmentClass = function(Class, Interface) {
  var Super = this;

  var prototype = Object.create(Super.prototype);
  assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = assign({}, Super.Interface, Interface);
  Class.augmentClass = Super.augmentClass;

  PooledClass.addPoolingTo(Class, PooledClass.threeArgumentPooler);
};

PooledClass.addPoolingTo(SyntheticEvent, PooledClass.threeArgumentPooler);

module.exports = SyntheticEvent;

},{"./Object.assign":102,"./PooledClass":103,"./emptyFunction":108,"./getEventTarget":110}],105:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticUIEvent
 * @typechecks static-only
 */

'use strict';

var SyntheticEvent = require("./SyntheticEvent");

var getEventTarget = require("./getEventTarget");

/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var UIEventInterface = {
  view: function(event) {
    if (event.view) {
      return event.view;
    }

    var target = getEventTarget(event);
    if (target != null && target.window === target) {
      // target is a window object
      return target;
    }

    var doc = target.ownerDocument;
    // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
    if (doc) {
      return doc.defaultView || doc.parentWindow;
    } else {
      return window;
    }
  },
  detail: function(event) {
    return event.detail || 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);

module.exports = SyntheticUIEvent;

},{"./SyntheticEvent":104,"./getEventTarget":110}],106:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ViewportMetrics
 */

'use strict';

var ViewportMetrics = {

  currentScrollLeft: 0,

  currentScrollTop: 0,

  refreshScrollValues: function(scrollPosition) {
    ViewportMetrics.currentScrollLeft = scrollPosition.x;
    ViewportMetrics.currentScrollTop = scrollPosition.y;
  }

};

module.exports = ViewportMetrics;

},{}],107:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule accumulateInto
 */

'use strict';

var invariant = require("./invariant");

/**
 *
 * Accumulates items that must not be null or undefined into the first one. This
 * is used to conserve memory by avoiding array allocations, and thus sacrifices
 * API cleanness. Since `current` can be null before being passed in and not
 * null after this function, make sure to assign it back to `current`:
 *
 * `a = accumulateInto(a, b);`
 *
 * This API should be sparingly used. Try `accumulate` for something cleaner.
 *
 * @return {*|array<*>} An accumulation of items.
 */

function accumulateInto(current, next) {
  ("production" !== process.env.NODE_ENV ? invariant(
    next != null,
    'accumulateInto(...): Accumulated items must not be null or undefined.'
  ) : invariant(next != null));
  if (current == null) {
    return next;
  }

  // Both are not empty. Warning: Never call x.concat(y) when you are not
  // certain that x is an Array (x could be a string with concat method).
  var currentIsArray = Array.isArray(current);
  var nextIsArray = Array.isArray(next);

  if (currentIsArray && nextIsArray) {
    current.push.apply(current, next);
    return current;
  }

  if (currentIsArray) {
    current.push(next);
    return current;
  }

  if (nextIsArray) {
    // A bit too dangerous to mutate `next`.
    return [current].concat(next);
  }

  return [current, next];
}

module.exports = accumulateInto;

}).call(this,require('_process'))
},{"./invariant":111,"_process":26}],108:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule emptyFunction
 */

function makeEmptyFunction(arg) {
  return function() {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
function emptyFunction() {}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function() { return this; };
emptyFunction.thatReturnsArgument = function(arg) { return arg; };

module.exports = emptyFunction;

},{}],109:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule forEachAccumulated
 */

'use strict';

/**
 * @param {array} an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 */
var forEachAccumulated = function(arr, cb, scope) {
  if (Array.isArray(arr)) {
    arr.forEach(cb, scope);
  } else if (arr) {
    cb.call(scope, arr);
  }
};

module.exports = forEachAccumulated;

},{}],110:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEventTarget
 * @typechecks static-only
 */

'use strict';

/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */
function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;
  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
  // @see http://www.quirksmode.org/js/events_properties.html
  return target.nodeType === 3 ? target.parentNode : target;
}

module.exports = getEventTarget;

},{}],111:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if ("production" !== process.env.NODE_ENV) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":26}],112:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyMirror
 * @typechecks static-only
 */

'use strict';

var invariant = require("./invariant");

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function(obj) {
  var ret = {};
  var key;
  ("production" !== process.env.NODE_ENV ? invariant(
    obj instanceof Object && !Array.isArray(obj),
    'keyMirror(...): Argument must be an object.'
  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;

}).call(this,require('_process'))
},{"./invariant":111,"_process":26}],113:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyOf
 */

/**
 * Allows extraction of a minified key. Let's the build system minify keys
 * without loosing the ability to dynamically use key strings as values
 * themselves. Pass in an object with a single key/val pair and it will return
 * you the string key of that single record. Suppose you want to grab the
 * value for a key 'className' inside of an object. Key/val minification may
 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
 * reuse those resolutions.
 */
var keyOf = function(oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};


module.exports = keyOf;

},{}],114:[function(require,module,exports){
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

},{"emitter":115,"reduce":116}],115:[function(require,module,exports){

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

},{}],116:[function(require,module,exports){

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
},{}]},{},[24]);
