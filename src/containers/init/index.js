import React from "react";
import { DynamicText } from "../../components";

class Init extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonVisible: false
    };
  }
  showButton = () => {
    this.setState({
      buttonVisible: true
    });
  };
  afterComplete = () => {
    setTimeout(this.showButton, 1500);
  };
  nextViewNavigation = () => {
    this.props.nextViewNavigation(this.props.nextView);
  };
  render() {
    return (
      <React.Fragment>
        <div className="pixel-man"></div>
        <DynamicText
          strings={[
            "This awwwesome tool will help you to find your path!",
            "... maybe :)"
          ]}
          nextStringDelay={1000}
          speed={40}
          afterComplete={this.afterComplete}
        />
        <button
          type="button"
          class="nes-btn is-primary"
          style={{
            visibility: this.state.buttonVisible ? "visible" : "hidden",
            marginTop: "50px"
          }}
          onClick={this.nextViewNavigation}
        >
          Let's try
        </button>
      </React.Fragment>
    );
  }
}

export default Init;
