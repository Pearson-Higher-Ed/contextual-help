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

  addTopics = (topic) => {
    this.helpTopicsList.addTopics(topic);
  };

  removeTopics = (topic) => {
    this.helpTopicsList.removeTopics(topic);
  };

  removeAllTopics = () => {
    this.helpTopicsList.removeAllTopics();
  };

  basicView = (topic, idx) => {
    return (
      <BasicView 
        mapToDetail='detailView1'
        myKind='BasicView'
        key={`basicView-${idx}`}
      >
       <h3 className="po-label pe-bold" >{topic.title || ''}</h3>
       <p>{ topic.excerpt || '' }</p>
      </BasicView>
    )
  };

  detailView = (topic, idx) => {
    console.log('name:title:content', topic.name, ':', topic.title, ':', topic.content);
    return (
      <DetailView 
        id={`detailView-${idx}`}
        myKind='DetailView'
        key={`detailView-${idx}`}
      >
       <h2 className="pe-title">{topic.title || ''}</h2>
       <div dangerouslySetInnerHTML={{__html: topic.content || ''}}>
       </div>
      </DetailView>
    )
  };


  render() {
    console.log(this.state.topics);
    return (
      <div>
        <span>Contextual Help Component</span>

        <Drawer drawerOpen={this.state.drawerIsOpen} position={'right'} headerTitle="Header Title" drawerHandler={this.drawerHandler} >
          <div>
            {this.state.topics.map((topic, idx) => this.basicView(topic, idx))}
            {this.state.topics.map((topic, idx) => this.detailView(topic, idx))}
          </div>
        </Drawer>
      </div>
    )
  }
}

// {this.state.topics.map((topic, idx) => this.basicView(topic, idx))}
// {this.state.topics.map((topic, idx) => this.detailView(topic, idx))}


// <BasicView mapToDetail='detailView1' myKind='BasicView' >
// <h2>Basic View 1</h2>
// <ul>
//   <li>hi</li>
//   <li>there</li>
// </ul>
// </BasicView>
// <DetailView id='detailView1' myKind='DetailView'>
// <h3>Detail View 1</h3>
// </DetailView>


export default ContextualHelp;
