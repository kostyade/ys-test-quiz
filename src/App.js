import React from "react";
import {Init,MapInput} from "./containers"
import "./App.css";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      view: 'init'
    }
  }
  nextViewNavigation=(view)=>{
    this.setState({view})
  }
  render() {
    return (
      <div className="App">
        <div className="App-wrapper">
        {this.state.view==='init'?<Init nextView="mapInput" nextViewNavigation={this.nextViewNavigation}></Init>:null}
        {this.state.view==='mapInput'?<MapInput nextViewNavigation={this.nextViewNavigation}></MapInput>:null}
      </div>
      </div>
    );
  }
}

export default App;
