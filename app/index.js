var React = require('react');
var ReactDOM = require('react-dom');
var Papa = require('papaparse');

class ShowList extends React.Component{

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

class MeasPanel extends React.Component{

  constructor(props){
    super(props);
  }

  render (){
    var config = {
	    delimiter: "",	// auto-detect
	    newline: "",	// auto-detect
	    header: false,
	    dynamicTyping: false,
	    preview: 0,
	    encoding: "",
	    worker: false,
	    comments: false,
	    step: undefined,
	    complete: undefined,
	    error: undefined,
	    download: false,
	    skipEmptyLines: false,
	    chunk: undefined,
	    fastMode: undefined,
	    beforeFirstChunk: undefined,
	    withCredentials: undefined
    }

    function doStuff(data) {
      //The measurements data will be usable here
      console.log(data);
    }

    function parseData(url, callBack) {
      Papa.parse(url, {
        download: true,
        dynamicTyping: true,
        complete: function(results) {
            callBack(results.data);
        }
      });
    }

    parseData("./catalog/0_meas_catalog.csv", doStuff);

    return(
      <div>
        <h3> Measurements </h3>
        <p> <b>Soft Tissue: </b> Liver = xx HU, Fat = xx HU, Spleen = xx HU </p>
        <p> <b>Bone: </b> Trabecular Bone = xx HU, Cortical Bone = xx HU </p>
        <p> Test display of {this.props.fileProps['Index']}</p>
      </div>
  );
  }
}

  class TeachPanel extends React.Component{

    constructor(props){
      super(props);
    }
    render (){
      return(
        <div>
            <h3> Teaching Unit</h3>
            <p> <b><u> Dual Energy </u></b></p>
            <p> Select an 80kVP parameter combination. <br></br>
            Record the HU values for Spleen Trabecular and Cortical Bone</p>
            <p> Now change only the kV to 130kVP. <br></br>
            Again record the HU values for Spleen Trabecular and Cortical Bone. </p>
            <p> Note that while soft tissue remains almost the same, <br></br>
            the more dense materials exhibit a much greater change with different kV levels.</p>
            <p> This is how Dual Energy acquisitions can do material decomposition or separation!</p>
        </div>
    );
  }
}

  class InputPanel extends React.Component{

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
    var optionsSlice = ['1','2','3','4','6','10']
    var optionsDetect = ['0.6','1.2']
    var optionsMeasure = ['Off','On']

    return (
      <div className="col-md-4">
        <div className="row" style={padding}>
          <Input name="kVP" options = {optionsKv} alertParent = {this.props.alertParent}/>
          <Input name="mAS" options = {optionsMa} alertParent = {this.props.alertParent}/>
          <Input name="Kernal" options = {optionsKernal} alertParent = {this.props.alertParent}/>
          <Input name="Slice" options = {optionsSlice} alertParent = {this.props.alertParent}/>
          <Input name="Detector Size" options = {optionsDetect} alertParent = {this.props.alertParent}/>
          <Input name="Measurements" options = {optionsMeasure} alertParent = {this.props.alertParent}/>
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
    // addition of [ ""+ ] needed for stability as type of return was changing
    var indexKVP = ""+this.props.fileProps['kVP'];
    var indexMA = ""+this.props.fileProps['mAS'];
    var indexDet = ""+this.props.fileProps['Detector Size'];
    var indexSlice = ""+this.props.fileProps['Slice'];
    var indexKernal = ""+this.props.fileProps['Kernal'];
    var Measurement = ""+this.props.fileProps['Measurements'];
    if(indexMA == 10)
    {
      indexMA = 'A';
    }
    var indexNum = indexKVP + indexMA + indexDet + indexSlice + indexKernal;
    this.props.fileProps['Index']=indexNum;


    if (this.props.name[0]=='K' && Measurement=='2' ) {
      var fileString = "./catalog/"+this.props.name+indexNum+"_A"+".jpg";
      console.log(indexNum);
    }
    else{
      var fileString = "./catalog/"+this.props.name+indexNum+".jpg";
      console.log(indexNum);
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
      'mAS' :'1',
      'Slice' : '1',
      'Detector Size' : '1',
      'Measurements' : '1',
      'Index' : '98765'
    }
    this.handleChange = this.handleChange.bind(this);
  }
  updateMeasurement
  handleChange(inputName, value){
    var newState = this.state;
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
          <MeasPanel fileProps = {this.state}/>
          <TeachPanel fileProps = {this.state}/>
      </div>
    </div>
  );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
