import React, { Component } from 'react';
import { Drawer, BasicView, DetailView } from '@pearson-components/drawer';
import TopicsList from './TopicsList';

class ContextualHelp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      drawerIsOpen: false
    };

    this.drawerHandler = this._drawerHandler.bind(this);
    this.openDrawer = this._openDrawer.bind(this);

    this.lang = props.language || 'en-us';
    this.helpTopicsList = new TopicsList(this._updateTopics, (topicName) => {
      const url = `http://context-help.pearson.com/help/de6fde00-d9d7-4e45-b506-82c01fd7202a/Out/${this.lang}/${topicName}.json`;
      return fetch(url);
    });
  }

  _updateTopics = (newList) => {
    this.setState({ topics: newList });
  }

  _drawerHandler = () => {
    this.setState({drawerIsOpen: !this.state.drawerIsOpen});
  }

  _openDrawer = () => {
    this.setState({drawerIsOpen: true});
  }

  render() {
    return (
      <div>
        <span>Contextual Help Component</span>

        <Drawer drawerOpen={this.state.drawerIsOpen} position={'right'} headerTitle="Header Title" drawerHandler={this.drawerHandler} >
          <div>
            <BasicView mapToDetail='detailView1'>
              <h2>Basic View 1</h2>
              <ul>
                <li>hi</li>
                <li>there</li>
              </ul>
            </BasicView>
            <DetailView id='detailView1'>
              <h3>Detail View 1</h3>
            </DetailView>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default ContextualHelp;
