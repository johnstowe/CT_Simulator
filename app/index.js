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
    <div>
      <h2>{this.props.name}</h2>
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
    var optionsKv = ['80','110','130']
    var optionsKernal = ['B10','B30','B40','B50','B70']
    var optionsMa = generateList(50,500,50)
    var optionsSlice = ['2','3','4','6','10']
    var optionsDetect = ['0.6','1.2']
    var optionsMeasure = ['On','Off']
    return (
      <div>
      <Input name="kV" options = {optionsKv}/>
      <Input name="ma" options = {optionsMa}/>
      <Input name="Kernal" options = {optionsKernal}/>
      <Input name="Slice" options = {optionsSlice}/>
      <Input name="Detector Size" options = {optionsDetect}/>
      <Input name="Measurement" options = {optionsMeasure}/>
      </div>
    )
  }


});
var Image = React.createClass({
  render: function () {
    return (
      //image display in html taking in the image name
    )
  }
});
var ImagePanel = React.createClass({
  render: function () {
    return (
      //
    )
  }
});
var App = React.createClass({
  render: function () {
    return (
    <div>
      <InputPanel/>
      <ImagePanel/>
    </div>
    )
  }
});
ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
