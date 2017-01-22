var React = require('react');
var ReactDOM = require('react-dom');

class ShowList extends React.Component{

  //componentDidUpdata
  constructor(props){
    super(props);
    this.state = {value:this.props.options[0]}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.props.alertParent(this.props.name,event.target.selectedIndex+1)
  }

  render(){
      var listItems = this.props.options.map(function(optionValue){
        return  <option value={optionValue}>{optionValue}</option>;
      });
      return (
          <select name={this.state.value} onChange={this.handleChange}>
            {listItems}
          </select>
      );
    }

}

class Input extends React.Component{
  constructor(props){
    super(props);
  }
  render () {
    return (
    <div className="col-md-6">
      <h3>{this.props.name}</h3>
      <ShowList options={this.props.options} alertParent = {this.props.alertParent} name={this.props.name}/>
    </div>
    );
  }
}

class InputPanel extends React.Component{

  // myFunction(){
  //   this.props.children();
  // }
  constructor(props){
    super(props);

  }




  render (){
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
    var optionsMeasure = ['Off','On']
    return (
      <div className="col-md-4">
        <div className="row" style={padding}>
          <Input name="kVP" options = {optionsKv} alertParent = {this.props.alertParent}/>
          <Input name="mA" options = {optionsMa} alertParent = {this.props.alertParent}/>
          <Input name="Kernal" options = {optionsKernal} alertParent = {this.props.alertParent}/>
          <Input name="Slice" options = {optionsSlice} alertParent = {this.props.alertParent}/>
          <Input name="Detector Size" options = {optionsDetect} alertParent = {this.props.alertParent}/>
          <Input name="Measurements" options = {optionsMeasure} alertParent = {this.props.alertParent}/>
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
    );
  }


}
class Image extends React.Component{
  constructor(props){
    super(props);
  }
  render () {
    var style = {
      height: '360px',
      width: '360px',
      padding:'20px'

    };
    var indexKvP = this.props.fileProps['kVP'];
    var indexMA = this.props.fileProps['mA'];
    var indexDet = this.props.fileProps['Detector Size'];
    var indexSlice = this.props.fileProps['Slice'];
    var indexKernal = this.props.fileProps['Kernal'];
    var Measurement = ""+this.props.fileProps['Measurements']
    if(indexMA == 10)
    {
      indexMA = 'A';
    }
    if (this.props.name[0]=='K' && Measurement=='2' ) {
      var fileString = "./catalog/"+this.props.name+indexKvP + indexMA +
      indexDet + indexSlice +indexKernal+"_A"+".jpg";
      console.log(this.props.name[0]);
    }
    else{
      var fileString = "./catalog/"+this.props.name+indexKvP + indexMA +
      indexDet + indexSlice +indexKernal+".jpg";
      console.log(this.props.name[0]);
    }


    return (
      <div className="col-md-6">
      <img src={fileString} style={style}/>
      </div>
    );
  }
}

class ImagePanel extends React.Component{
  constructor(props){
    super(props)
  }
  render() {
    return (

      <div className="col-md-8">
        <Image name="KS_image_" fileProps = {this.props.fileProps}/>
        <Image name="KB_image_" fileProps = {this.props.fileProps}/>
        <Image name="CR_image_" fileProps = {this.props.fileProps}/>
        <Image name="SR_image_" fileProps = {this.props.fileProps}/>
      </div>
    );
  }
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      'kVP' : '1',
      'Kernal' : '1',
      'mA' :'1',
      'Slice' : '1',
      'Detector Size' : '1',
      'Measurements' : '1'
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(inputName, value){
    var newState = this.state;
    console.log(newState['Slice']);
    newState[inputName] = value;
    console.log(newState);
    this.setState(newState);
  }
  render() {
    return (
      <div className = "container-fluid">
        <div className= "row">
          <ImagePanel fileProps = {this.state}/>
          <InputPanel alertParent = {this.handleChange}/>
      </div>
    </div>
  );
  }
}
ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
