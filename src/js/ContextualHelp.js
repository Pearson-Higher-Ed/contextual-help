import React, { Component } from 'react';
import HelpTopics from './HelpTopics';
import HelpTopicContent from './HelpTopicContent';

import HelpTopicsList from './HelpTopicsList';

import '../scss/ContextualHelp.scss';

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
    this.state = {
      text: '',
      topics: [],
      displayTopics: true,
      currentTopic: { title: '', content: '' }
    };

    this.helpTopicsList = new HelpTopicsList(this._updateTopics, 'en-us');

    setTimeout(() => {
      this.helpTopicsList.addTopics('console/instructor/validatedinstructor');
    }, 400);


    setTimeout(() => {
      this.helpTopicsList.addTopics('console/instructor/courseregsettings');
    }, 1000);

    setTimeout(() => {
      this.helpTopicsList.addTopics(['console/instructor/courseregsettings',
        'console/instructor/educatorresources',
        'console/student/studentresources',
        'invalid/topic/name',
        'console/student/freetrial',
        'console/student/studentresources',
        'contactsupport'
      ]);
    }, 1300);
  }

  _topicClick = (topic) => {
    this.setState({
      currentTopic: topic,
      displayTopics: false,
      hideTopicContent: false
    });
    setTimeout(() => {
      // closeTopicsBtn.focus();
      this.setState({ hideTopics: true });
    }, 450);
  };

  _backToTopics = () => {
    this.setState({
      currentTopic: { title: '', content: '' },
      hideTopics: false,
      displayTopics: true
    });
    setTimeout(() => {
      // setFocus to appropriate close button
      this.setState({ hideTopicContent: true });
    }, 450);
  };

  _updateTopics = (newList) => {
    this.setState({ topics: newList });
  };

  render() {
    const { data } = this.props;

    return (
      <div
        className={`${this.state.displayTopics ? '' : 'o-contextual-help__content--visible'}`}
      >
        <HelpTopics
          helpList={this.state.topics}
          topicClick={this._topicClick}
          hide={this.state.hideTopics}
        />
        <HelpTopicContent 
          title={this.state.currentTopic.title}
          content={this.state.currentTopic.content}
          backToTopics={this._backToTopics}
          hide={this.state.hideTopicContent}
        />
      </div>
    )
  }

}

//ContextualHelp.defaultProps = {
//  indexDetailList: helpList
//};

export default ContextualHelp;
