import React, { Component } from 'react';
import HelpTopics from './HelpTopics';
import HelpTopicContent from './HelpTopicContent';

import '../scss/component-specific.scss';

const helpList = [
  { 
    title: 'Here is Title #1',
    excerpt: 'These are the first few words of the topic so that',
    content: 'These are the first few words of the topic so that we can demonstrate the new control without having any fetch working yet'
  },
  {
    title: 'Help Topic #2 Title',
    excerpt: 'This is the second entry in the list of dummy help',
    content: 'This is the second entry in the list of dummy help topics. It is being used to allow the control to be developed for multiple entries.'
  },
  {
    title: 'Number 3 Help Topic Title',
    excerpt: 'This is the third and final entry for the dummy help',
    content: 'This is the third and final entry for the dummy help data. I dont have any additional ideas for what to put down for help information.'
  }
];


class ContextualHelp extends Component {

  constructor(props) {

    super(props);
    //
    // FOR DEMO - use state when you need to respond to user input, a server request or the passage of time
    //
    this.state = {
      text: '',
      topics: helpList,
      currentTopic: { title: '', content: '' }
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

  _topicClick = (topic) => {
    this.setState({
      currentTopic: topic,
      hideTopics: topic.title !== ''
    });
  };

  _backToTopics = () => {
    this.setState({
      currentTopic: { title: '', content: '' },
      hideTopics: false
    });
  }

  render() {
    const { data } = this.props;
    //
    // FOR DEMO and should be refactored for your purposes:
    //
    return (
      <div
        className={`${this.state.hideTopics ? 'o-contextual-help__content--visible' : ''}`}
      >
        <HelpTopics
          helpList={this.state.topics}
          topicClick={this._topicClick}
        />
        <HelpTopicContent 
          title={this.state.currentTopic.title}
          content={this.state.currentTopic.content}
          backToTopics={this._backToTopics}
        />
      </div>
    )
  }

}


export default ContextualHelp;
