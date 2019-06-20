//React wrapper for dialog polyfill

import React from "react";
import dialogPolyfill from "dialog-polyfill";

class RDialog extends React.Component {
  componentDidMount() {
    this.dialog = dialogPolyfill.registerDialog(this.dialogEl);
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.shown !== prevProps.shown&&this.props.shown) {
        this.dialogEl.showModal();
    }
  }

  render() {
    return (
      <dialog
        ref={dialogEl => this.dialogEl = dialogEl}
      >
        {this.props.children}
      </dialog>
    );
  }
}

export default RDialog;