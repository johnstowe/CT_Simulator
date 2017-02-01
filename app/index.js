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

    if (this.props.fileProps['Measurements']==2){
      console.log(this.props.fileProps['CBone']);
      return(
        <div>
          <font color="green">
            <h3> Measurements </h3>
          </font>
          <p> <b>Soft Tissue: </b>
            Liver = {this.props.fileProps['Liver']} HU,
            Fat = {this.props.fileProps['Fat']} HU,
            Spleen = {this.props.fileProps['Spleen']} HU </p>
          <p> <b>Bone: </b>
            Trabecular Bone = {this.props.fileProps['TBone']} HU,
            Cortical Bone = {this.props.fileProps['CBone']} HU </p>
          <p> <b>Dose: </b>
            Reserved for display of <b>CTDIw</b></p>
        </div>
      );
    }
    else{
      return null;
    }
  }
}


  class TeachPanel extends React.Component{

    constructor(props){
      super(props);
    }
    render (){
      return(
        <div>
          <font color="blue">
            <h3> Teaching Unit</h3>
          </font>
          <p> <b><u> Dual Energy </u></b></p>
          <p> Select an 80kVP parameter combination. <br></br>
          Record the HU values for Spleen Trabecular and Cortical Bone</p>
          <p> Now change only the kV to 130kVP. <br></br>
          Again record the HU values for Spleen Trabecular and Cortical Bone. </p>
          <p> Note that while soft tissue remains almost the same, <br></br>
          the more dense materials exhibit a much greater change with different kV levels.</p>
          <p> This is how Dual Energy acquisitions can do material <br /> decomposition or separation!</p>
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
    console.log(indexNum);
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

    var showMeas = (function (data) {
      // Does this need to go in handle change?
      var extract = new Object();
      extract = data[0];
      var arrayLength = data.length;
      for (var i = 0; i < arrayLength; i++) {
      extract = data[i];
      if (extract[0]==indexNum) {
         i=arrayLength;
         }
      }
      this.props.fileProps['Liver']= extract[1];
      this.props.fileProps['Fat']= extract[2];
      this.props.fileProps['Spleen']= extract[3];
      //this.props.fileProps['TBone']= extract[4];
      var test = extract[5];
      this.props.fileProps['CBone']= extract[5];
      console.log(extract);
      console.log(indexNum);
    }).bind(this);

    function parseData(url, callBack) {
      Papa.parse(url, {
        download: true,
        dynamicTyping: true,
        complete: function(results) {
            callBack(results.data);
        }
      });
    }

    parseData("./catalog/0_meas_catalog.csv", showMeas);

    if (this.props.name[0]=='K' && Measurement=='2' ) {
      var fileString = "./catalog/"+this.props.name+indexNum+"_A"+".jpg";
    }
    else{
      var fileString = "./catalog/"+this.props.name+indexNum+".jpg";
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
      'Index' : '98765',
      'Liver' : '11',
      'Fat' : '22',
      'Spleen' : '33',
      'TBone' : '44',
      'CBone' : '55',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  updateMeasurement
  handleChange(inputName, value){
    var newState = this.state;
    newState[inputName] = value;
    //console.log(newState);
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
} // Put Meas last after debug

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
