import React from "react";
import { RDialog, MapInputArea } from "../../components";
import MapUtils from "../../utils/MapUtils";

class MapInput extends React.Component {
  constructor() {
    super();
    this.state = {
      dialogVisible: false,
      textAreaVisible: false
    };
  }
  componentDidMount() {
    this.setState({ dialogVisible: true });
  }
  showTextArea = () => {
    this.setState({ textAreaVisible: true });
  };
  submitMap = val => {
    const matrix = MapUtils.convertString(val);
    const dimensions = MapUtils.getDimensions(matrix);
    console.log(matrix, dimensions);
  };
  render() {
    return (
      <React.Fragment>
        {this.state.textAreaVisible ? (
          <MapInputArea submitMap={this.submitMap} />
        ) : null}
        <RDialog
          shown={this.state.dialogVisible}
          className="nes-dialog is-rounded"
          id="dialog-rounded"
        >
          <form method="dialog">
            <p className="title">Please note that:</p>
            <p>
              Text Input accepts only spaces,# and one of
              &#62;&#44;&#60;&#44;v&#44;^&#44; characters
            </p>
            <menu className="dialog-menu">
              <button
                className="nes-btn is-primary"
                onClick={this.showTextArea}
              >
                Got It
              </button>
            </menu>
          </form>
        </RDialog>
      </React.Fragment>
    );
  }
}

export default MapInput;
