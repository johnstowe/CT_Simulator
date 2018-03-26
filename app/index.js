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
    var style = {
      fontSize : '16'
    }

    return (
    <div className="col-md-6">
      <h3>{this.props.name}</h3>
      <ShowList style={style} options={this.props.options}
        alertParent = {this.props.alertParent} name={this.props.name}/>
    </div>
    );
  }
}

class InfoPanel extends React.Component{

    constructor(props){
      super(props);
    }
    render (){
      var background = {background : 'gray'}

      return(
//        <div style={background}>
          <div>
          <h2> <font color = "blue">
          CTSim </font> (v2.0) is licensed by </h2>
          <p>
          <img src={'UCD.png'} />
          <img src={'Norway.png'} />
          <br /> Lead developer Dr. John Stowe (UCD) under a <br />
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
              Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License  </a>
            <img src={'https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png'} />
            <br /><br />
          </p>
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
      //console.log(this.props.fileProps['CBone']);
      return(
        <div>
          <font color="lightgray">
            <p> {"Blank"} <br /></p>
            </font>
            <font color="green">
            <h3>Measurements</h3>
          </font>
          <p> <b>Soft Tissue: </b>
            Liver = {this.props.fileProps['Liver']} HU,
            Fat = {this.props.fileProps['Fat']} HU,
            Spleen = {this.props.fileProps['Spleen']} HU </p>
          <p> <b>Bone: </b>
            Trabecular Bone = {this.props.fileProps['TBone']} HU,
            Cortical Bone = {this.props.fileProps['CBone']} HU </p>
          <p> <b>Dose: </b>
            CTDIvol = {this.props.fileProps['CTDIvol']} mGy,
            DLP = {this.props.fileProps['DLP']} mGy.cm </p>
          <p> <b>Noise: </b>
            Liver Region of Interest (RoI) = {this.props.fileProps['Noise']} SD </p>
        </div>
      );
    }
    else{
      return null;
    }
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
      background : 'gray',
      border:'2px solid #000000',
      height: '270px',
      width: '400px',
      padding : '10px',
      fontSize: '16px',
      fontWeight: 'bold'
    }
    var optionsKv = ['80','110','130']
    var optionsKernal = ['Very Smooth','Smooth','Standard','Sharp','Very Sharp']
    var optionsMa = generateList(50,500,50)
    var optionsSlice = ['1','2','3','4','6','10']
    var optionsDetect = ['0.6','1.2']
    var optionsMeasure = ['Off','On']

    return (
      <div className="col-md-4">
        <div className="row" style={style}>
          <font color = "darkblue">
          <Input name="kVP" options = {optionsKv} alertParent = {this.props.alertParent}/>
          <Input name="mAS" options = {optionsMa} alertParent = {this.props.alertParent}/>
          <Input name="Kernal" options = {optionsKernal} alertParent = {this.props.alertParent}/>
          <Input name="Slice" options = {optionsSlice} alertParent = {this.props.alertParent}/>
          <Input name="Detector Size" options = {optionsDetect} alertParent = {this.props.alertParent}/>
          <Input name="Measurements" options = {optionsMeasure} alertParent = {this.props.alertParent}/>
          </font>
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
      padding:'20px',
      background: 'lightgray'
    };


    if (this.props.name[0]=='K' && this.props.fileProps['Measurements']=='2' ) {
      var fileString = "./catalog1/"+this.props.name+this.props.fileProps['Index']+"A"+".jpg";
    }
    else{
      var fileString = "./catalog1/"+this.props.name+this.props.fileProps['Index']+".jpg";
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
        <Image name="KSimage" fileProps = {this.props.fileProps}/>
        <Image name="KBimage" fileProps = {this.props.fileProps}/>
        <Image name="CRimage" fileProps = {this.props.fileProps}/>
        <Image name="SRimage" fileProps = {this.props.fileProps}/>
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
      'Index' : '11111',
      'Liver' : '11',
      'Fat' : '22',
      'Spleen' : '33',
      'TBone' : '44',
      'CBone' : '55',
      'CTDIvol' : '66',
      'DLP' : '77',
      'Noise' : '0.0'
    }
    this.handleChange = this.handleChange.bind(this);
  }
  updateMeasurement
  handleChange(inputName, value){
    var newState = this.state;
    newState[inputName] = value;
    // addition of [ ""+ ] needed for stability as type of return was changing
    var indexKVP = ""+this.state['kVP'];
    var indexMA = ""+this.state['mAS'];
    var indexDet = ""+this.state['Detector Size'];
    var indexSlice = ""+this.state['Slice'];
    var indexKernal = ""+this.state['Kernal'];
    var Measurement = ""+this.state['Measurements'];
    if(indexMA == 10)
    {
      indexMA = 'A';
    }
    var indexNum = indexKVP + indexMA + indexDet + indexSlice + indexKernal;
    this.state['Index']=indexNum;
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
      this.state['Liver']= extract[1];
      this.state['Fat']= extract[2];
      this.state['Spleen']= extract[3];
      this.state['TBone']= extract[4];
      this.state['CBone']= extract[5];
      this.state['CTDIvol']= extract[6];
      this.state['DLP']= extract[7];
      this.state['Noise']= extract[8];
      console.log(newState);
      this.setState(newState);
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

    parseData("./catalog1/0MeasCatalogV4.csv", showMeas);

    console.log(indexNum);
  }



  render() {
    var background = {background : 'lightgray'}
    return (
      <div className = "container-fluid">
        <div className="row" style={background}>
          <ImagePanel fileProps = {this.state}/>
          <InfoPanel fileProps = {this.state}/>
          <InputPanel alertParent = {this.handleChange}/>
          <MeasPanel fileProps = {this.state}/>
      </div>
    </div>
  );
  }
} // Put Meas last after debug

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
