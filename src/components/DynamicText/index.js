import React from "react";
import TypeIt from "typeit";

class DynamicText extends React.Component {
  componentDidMount() {
    new TypeIt(this.el, this.props).go();
  }

  render() {
    return (
      <span className={this.props.className}
        ref={el => this.el = el}
      >
        {this.props.children}
      </span>
    );
  }
}

export default DynamicText;
