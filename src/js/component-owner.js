import React, { Component } from 'react';


class ComponentOwner extends Component {

  constructor(props) {

    super(props);
    //
    // FOR DEMO - use state when you need to respond to user input, a server request or the passage of time
    //
    this.state = {
      text: ''
    };
  }

  //
  // Note that combining the fat arrow syntax with ES7 class properties (transpiled by Babel Stage 0), we eliminate the
  // need to do manual binding of the 'this' context in event handlers or callbacks. React binds all other contexts
  // as expected.
  //
  // FOR DEMO and should be removed:
  _change = () => {
    this.setState({text: this.props.data.text.greeting});
  };

  render() {
    const { data } = this.props;
    //
    // FOR DEMO and should be refactored for your purposes:
    //
    return (
      <div>
         <button type="button" className="pe-btn__primary" onClick={this._change}>{data.text.buttonText}</button>
         <br /><br />
         <label htmlFor="uniqueID">{data.text.label}</label>
         <input type="text" id="uniqueID" placeholder={data.text.placeholder} value={this.state.text} />
      </div>
    )
  }

}


export default ComponentOwner;
