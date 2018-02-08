import React, { Component } from 'react';
import HelpTopics from './HelpTopics';
import HelpTopicContent from './HelpTopicContent';

import TopicsList from './TopicsList';
import fetch from './fetch';

import '../scss/ContextualHelp.scss';

class ContextualHelp1st extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      topics: [],
      displayTopics: true,
      currentTopic: { title: '', content: '' }
    };

    this.lang = props.language || 'en-us';
    this.helpTopicsList = new TopicsList(this._updateTopics, (topicName) => {
      //    const url = `https://raw.githubusercontent.com/Pearson-Higher-Ed/help-content/master/out/${lang}/${topicName}.json`;
      const url = `http://context-help.pearson.com/help/de6fde00-d9d7-4e45-b506-82c01fd7202a/Out/${this.lang}/${topicName}.json`;
      
      return fetch(url);
    });
  }

  _topicClick = (topic) => {
    this.setState({
      currentTopic: topic,
      displayTopics: false,
      hideTopicContent: false
    });
    setTimeout(() => {
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
      this.setState({ hideTopicContent: true });
    }, 450);
  };

  _updateTopics = (newList) => {
    this.setState({ topics: newList });
  };


  addTopics = (topic) => {
    this.helpTopicsList.addTopics(topic);
  };

  removeTopics = (topic) => {
    this.helpTopicsList.removeTopics(topic);
  };

  removeAllTopics = () => {
    this.helpTopicsList.removeAllTopics();
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

export default ContextualHelp1st;
