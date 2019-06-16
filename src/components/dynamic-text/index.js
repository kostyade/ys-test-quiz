import React from "react";
import TypeIt from "typeit";

class DynamicText extends React.Component {
  constructor(props){
    super(props);
    this.el = React.createRef();
  }
  componentDidMount() {
    new TypeIt(this.el.current, this.props).go();
  }

  render() {
    return (
      <span
        ref={this.el}
      >
        {this.props.children}
      </span>
    );
  }
}

export default DynamicText;
