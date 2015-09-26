import React from 'react';
import request from 'superagent';

function upload_file(file, signed_request, url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(null, url);
        }
    };
    xhr.onerror = function() {
        callback("couldnt upload file", null);
    };
    xhr.send(file);
}

var ConfirmSubmit = React.createClass({
  getInitialState(){

    return ({confirmationState: "form", statusMessage: [], numCallbacks: 0});
  },
  handleSubmit(e){
  	e.preventDefault(); // maybe remove this when more figured out
  	
  	
  		var numCallbacks = 1; // hacky way to know when all callbacks have terminated
      var url = "/api/add-sitio";
      if(this.props.submitData.id && this.props.submitData.id != null){
        url = "/api/update-sitio";
      }
      
      console.log(url);
	  	 var r = request
	           .post(url)
	           .send(this.props.submitData);
             if(this.props.submitData.foto && this.props.submitData.foto != null){
              numCallbacks++;
              var foto = this.props.submitData.foto[0];
  	           r.send({foto_name: foto.name})
  	           .send({foto_type: foto.type});
              }
            if(this.props.submitData.sonido && this.props.submitData.sonido != null){
              numCallbacks++;
              var sonido = this.props.submitData.sonido[0];
               r.send({sonido_name: sonido.name})
               .send({sonido_type: sonido.type});
              }
              this.setState({confirmationState: "loading", statusMessage: ["adding to database"]});
	           this.setState({numCallbacks: numCallbacks});
	           r.end(function(err, res){
                this.setState({numCallbacks: this.state.numCallbacks-1});
              console.log(res);
              if(err){
                this.setState({statusMessage:  [" ERROR "+err]});
              } else {
              var response = JSON.parse(res.text);
               var status = [];
               status.push("+ sitio agregado al base de datos");
	           		console.log(response);
              if(response.foto){
                var foto = this.props.submitData.foto[0];
                status.push("subiendo foto");
               
	           		upload_file(foto, response.foto.signed_request, response.foto.url, function(err, url){
	           			if(err){
	           				console.log(err);
	           			} else {
	           				console.log(url);
	           				request
	           					.put('/api/add-url')
	           					.send({id: response.foto.id, type: "foto", url: url})
	           					.end(function(err, res){
	           						if(err) {
                          this.setState({statusMessage: ["ERROR subiendo foto: " + err]});
                        } else {
                          this.setState({statusMessage: ["foto subido :)"+url], numCallbacks: this.state.numCallbacks-1});
                        }
	           					}.bind(this));
	           			}
	           		}.bind(this));
              }
              if(response.sonido){
                status.push("subiendo audio");
                
                var sonido = this.props.submitData.sonido[0];
                upload_file(sonido, response.sonido.signed_request, response.sonido.url, function(err, url){
                  if(err){
                    console.log(err);
                  } else {
                    console.log(url);
                    request
                      .put('/api/add-url')
                      .send({id: response.sonido.id, type: "sonido", url: url})
                      .end(function(err, res){
                        if(err) {
                          this.setState({statusMessage: ["ERROR subiendo audio: " + err]});
                        } else {
                          this.setState({statusMessage: ["audio subido :) "+url], numCallbacks: this.state.numCallbacks-1});
                        }
                      }.bind(this));
                  }
                }.bind(this));
              }
              this.setState({statusMessage: status});
            }
	             //    console.log(response);
	              // console.log(res);
	           }.bind(this));
       
  },
  render() {
    console.log(" data is ");
    console.log(this.props.submitData);
      var style = {
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",

      }

        var popupStyle = {
          backgroundColor: "#000",
          width: "600px",
          padding: "20px",
          margin: "auto",
        position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0, height: "300"

        }
      var popupContents = [];
      if(this.state.confirmationState == "form"){
         

        var buttonStyle = {
          marginLeft: "10px"
        }
        var submitData = [];
        for(var key in this.props.submitData){
          var val = "";
          if(key == "foto" || key == "sonido"){
            val = JSON.stringify(this.props.submitData[key][0].name);
          } else {
            val = JSON.stringify(this.props.submitData[key]);
          }
          submitData.push(<li>{key+": "+ val}</li>)
        }

        popupContents = (  <div  id="confirm">
                   <h3> Confirmar </h3>
                  <ul>{submitData}</ul>

                  <button onClick={this.props.hideSubmit}>Keep editing </button>
                  <button style={buttonStyle} onClick={this.handleSubmit}>Submit</button>
                </div>);
      } else if (this.state.confirmationState == "loading") {
        console.log(" callbacks "+ this.state.numCallbacks);
        if(this.state.numCallbacks <= 0){
          popupContents = (<h1>Success!</h1>)
          setTimeout(function(){location.reload();}, 500);
        } else {
          var status = this.state.statusMessage.map(function(string){
              console.log(string);
              return <div>{string}</div>;
          });
          popupContents = (<div>
            <div className="loader">Loading...</div>
            <div>{status}</div>
            </div>);
        }
      }

     
  	  return(<div style={style}>
             
              <div style={popupStyle}>
               {popupContents}
  	  		     </div>
              </div>)
   	}
  
});

export default ConfirmSubmit;

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