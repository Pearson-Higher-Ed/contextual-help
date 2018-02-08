import React, { Component } from 'react';
import Drawer from '@pearson-components/drawer/main';
import TopicsList from './TopicsList';

class ContextualHelp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: []
    };

    this.lang = props.language || 'en-us';
    this.helpTopicsList = new TopicsList(this._updateTopics, (topicName) => {
      const url = `http://context-help.pearson.com/help/de6fde00-d9d7-4e45-b506-82c01fd7202a/Out/${this.lang}/${topicName}.json`;
      return fetch(url);
    });
  }

  _updateTopics = (newList) => {
    this.setState({ topics: newList });
  }

  render() {
    return (
      <div>
        <span>Contextual Help Component</span>
      </div>
    )
  }
}

export default ContextualHelp;
