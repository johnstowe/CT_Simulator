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
      <input type="submit" value="Submit"/>
  </div>
    )
  }
});
var InputPanel = React.createClass({
  render: function () {
    var options = ['80','110','130']
    var optionsMa = ['50','100','500']
    return (
      <div>
      <Input name="kV" options = {options}/>
      <Input name="ma" options = {optionsMa}/>
      </div>
    )
  }

});

ReactDOM.render(
  <InputPanel/>,
  document.getElementById('app')
);
