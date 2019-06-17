import React from "react";
import "./mapInput.css";
import { DynamicText } from "./../index";

class MapInputArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      value: "",
      validationMessage:""
    };
  }
  handleChange = e => {
    const value = e.target.value;
    const isValid = !new RegExp("[^v#><\\s^]|[v><^].*?[v><^]").test(value); //only allowed characters and one person occurence
    this.setState({
      isValid,
      value,
      validationMessage:"Please match pattern!"
    });
  };
  process = () => {
    if(this.preValidate()){
      this.props.submitMap(this.state.value);
    }
  };
  preValidate=()=>{
    if(!this.state.isValid||!this.state.value){
      return false;
    }
    const pattern=new RegExp("[vV><^]");
    const personPresent=this.state.value.match(pattern);
    if(!personPresent){
      this.setState({ 
        isValid:false,
        validationMessage:"Seems you forgot to place yourself!"
      });
      return false;
    }
    return true;
  }
  render() {
    return (
      <section className="nes-container with-title area-container">
        <h3 className="title area-title">Map Input</h3>
        <div id="textarea" className="item">
          <label htmlFor="textarea_field">
            Only spaces,# and one of &#62;&#44;&#60;&#44;v&#44;^&#44;
          </label>
          <textarea
            id="textarea_field"
            className={`nes-textarea ${this.state.isValid ? "" : "is-error"}`}
            style={{ marginTop: "4px", marginBottom: "24px", height: "119px" }}
            onInput={this.handleChange}
          />
          {this.state.isValid ? null : (
            <div className="error-text">
              <DynamicText
                className="nes-text is-error"
                strings={[this.state.validationMessage]}
                nextStringDelay={1000}
                speed={40}
              />
            </div>
          )}
          <button
            type="button"
            className={`nes-btn is-primary ${
              this.state.isValid && this.state.value ? "" : "is-disabled"
            }`}
            onClick={this.process}
          >
            Process
          </button>
        </div>
      </section>
    );
  }
}

export default MapInputArea;
