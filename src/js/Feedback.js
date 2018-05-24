import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button, StaticAlert} from '@pearson-components/elements-sdk/build/dist.elements-sdk';
import '../scss/Feedback.scss';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 'choice'
    };
  }
  render() {
    const show = this.state.step;
    if (show === 'choice') {
      return (
        <div className="pe-contextual-feedback">
          <div className="feedback-choice">
            <h3 className="pe-label pe-label--bold">Was this article helpful?</h3>
            <Button 
              btnType="default"
              btnSize="small"
              className="pe-btn--btn_small"
              onClick={() => { 
                this.setState({
                  step: 'confirm'
                });
                setTimeout(() => {
                  this.setState({
                    step: ''})
                }, 3000);
              }}
            >Yes
            </Button>
            <Button 
              btnType="default"
              btnSize="small"
              className="pe-btn--btn_small"
              onClick={() => { 
                this.setState({
                  step: 'comment'
                });
              }}
            >No
            </Button>
          </div>
        </div>
      )
    } else if (show === 'comment') {
      return (
        <div className="pe-contextual-feedback">
          <div className="feedback-comment">
            <h3 className="pe-label pe-label--bold">Help make it better!</h3>
            <form 
              onSubmit={() => { 
                this.setState({
                  step: 'confirm'
                });
                setTimeout(() => {
                  this.setState({
                    step: ''})
                }, 3000);
              }}>
              <label className="pe-textLabelInput__label sr-only" for="feedbackComment">Please leave your comment</label> 
              <textarea className="pe-multiLineText" id="feedbackComment" rows="5" required></textarea>
              <button 
                className="pe-btn__primary--btn_small"   
                type="submit">Send</button> 
            </form>
          </div>
        </div>
      )
    } else if (show === 'confirm') {
      return (
        <div className="pe-contextual-feedback">
          <div className="feedback-confirm">
            <StaticAlert inline type="Success" title="Thanks for your feedback!"/>
          </div>
        </div>
      )
    } else {
      return (null)
    }
  }
}

Feedback.propTypes = {
  step: PropTypes.string
};

export default Feedback;