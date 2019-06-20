import React from "react";
import { Init, MapInput, EscapeMap } from "./containers";
import "./App.css";
import MapUtils from "./utils/MapUtils";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "init",
      escapeData: null
    };
  }
  nextViewNavigation = view => {
    this.setState({ view });
  };
  submitMap = mapStr => {
    const escapeData = MapUtils.getMap(mapStr);
    this.setState({
      view: "escapeMap",
      escapeData
    });
  };
  render() {
    return (
      <div className="App">
        <div className="App-wrapper">
          {this.state.view === "init" && (
            <Init
              nextView="mapInput"
              nextViewNavigation={this.nextViewNavigation}
            />
          )}
          {this.state.view === "mapInput" && (
            <MapInput submitMap={this.submitMap} />
          )}
          {this.state.view === "escapeMap" && (
            <EscapeMap
              nextView="mapInput"
              nextViewNavigation={this.nextViewNavigation}
              moves={this.state.escapeData.moves} initPosition={this.state.escapeData.initPosition} 
              wayMatrix={this.state.escapeData.wayMatrix} dimensions={this.state.escapeData.dimensions}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
