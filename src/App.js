import React from "react";
import "./App.css";
import { DynamicText } from "./components";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="pixel-man"></div>
        <DynamicText
          strings={["This awwwesome tool will help you to find your path!","...maybe:)"]}
          nextStringDelay={1000}
          speed={40}
        >
        </DynamicText> 
      </header>
    </div>
  );
}

export default App;
