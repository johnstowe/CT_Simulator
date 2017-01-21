var React = require('react');
var ReactDOM = require('react-dom');

var ShowList = React.createClass({
  render: function(){
      var listItems = this.props.options.map(function(optionValue){
        return  <option value="{{optionValue}}">{optionValue}</option>;
      });
      return (
          <select name="values">
            {listItems}
          </select>
      )
    }

});

var Input = React.createClass({
  render: function () {
    return (
    <div className="col-md-6">
      <h3>{this.props.name}</h3>
      <ShowList options={this.props.options}/>
  </div>
    )
  }
});
var InputPanel = React.createClass({
  render: function () {
    function generateList(start,end,increment){
      var listToBeReturned = [];
      for(var i=start; i<=end; i+=increment){
        listToBeReturned.push(i)
      }
      return listToBeReturned;
    }
    var style = {
      background : 'blue'
    }
    var padding = {
      padding : '10px'
    }
    var optionsKv = ['80','110','130']
    var optionsKernal = ['B10','B30','B40','B50','B70']
    var optionsMa = generateList(50,500,50)
    var optionsSlice = ['2','3','4','6','10']
    var optionsDetect = ['0.6','1.2']
    var optionsMeasure = ['On','Off']
    return (
      <div className="col-md-4">
        <div className="row" style={padding}>
          <Input name="kVP" options = {optionsKv}/>
          <Input name="mA" options = {optionsMa}/>
          <Input name="Kernal" options = {optionsKernal}/>
          <Input name="Slice" options = {optionsSlice}/>
          <Input name="Detector Size" options = {optionsDetect}/>
          <Input name="Measurements" options = {optionsMeasure}/>
        </div>
        <div className = "row">
          <div>
            <h3> Measurement Box</h3>
            <p> ST sentence goes here </p>
            <p> Bone sentence goes here </p>
          </div>
        </div>
        <div className = "row">
          <div>
            <h3> Commentary Box</h3>
            <p> Sentences go here </p>
            <p> and hers and so on </p>
          </div>
        </div>
      </div>
    )
  }


});
var Image = React.createClass({
  render: function () {
    var style = {
      height: '360px',
      width: '360px',
      padding:'20px'

    };

    return (
      <div className="col-md-6">
      <img src={this.props.name} style={style}/>
      </div>
    )
  }
});

var ImagePanel = React.createClass({
  render: function () {
    return (

      <div className="col-md-8">
        <Image name="./catalog/KS_image_1A111_A.jpg"/>
        <Image name="./catalog/KB_image_1A111_A.jpg"/>
        <Image name="./catalog/CR_image_1A111.jpg"/>
        <Image name="./catalog/SR_image_1A111.jpg"/>
      </div>
    )
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div className = "container-fluid">
        <div className= "row">
          <ImagePanel/>
          <InputPanel/>
      </div>
    </div>
    )
  }
});
ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
