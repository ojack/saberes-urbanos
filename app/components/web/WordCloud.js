import React from 'react';
//import './../util/wordcloud2.js'



var WordCloud = React.createClass({

  render() {
  var containerStyle = {
    position: "absolute",
    backgroundColor: "rgba(160, 160, 160, 0.6)",
    top: "0px",
    right: "10px",
    color: "#fff",
    //width: "300px",
    pointerEvents: "none",
    padding: "20px",
    paddingLeft: "60px",
    paddingRight: "60px",
    textAlign: "center",
    opacity: 0.4,
    height: "100%"
    //lineHeight: "100%"
   // zIndex: 200
  }
  var words = this.props.words.map(function(obj){
    var style = {};
    style.fontSize = (obj.count+1)*10;
    style.lineHeight = "100%";
    //style.marginLeft = fontSize*5+"px";
    return (<span style={style}> {"  "+obj.word+"  "}</span>);
  });
  // var words =[];
  // for(var word in this.props.words){
  //   var style = {};
  //   style.fontSize = this.props.words[word]*10;
  //   var obj = (<span style={style}> {word}</span>);
  //   words.push(obj);
  // }
    return (
      <div style={containerStyle}>
        {words}
      </div>
    )
  }
});

export default WordCloud;