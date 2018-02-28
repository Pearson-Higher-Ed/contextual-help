import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, BasicView, DetailView } from '@pearson-components/drawer';
import { addTopics, removeTopics, setUpdate, fetchOneTopic, setLanguage } from './topicsList';

import '../scss/ContextualHelp.scss';
import '@pearson-components/elements-sdk';

class ContextualHelp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      drawerIsOpen: false
    };

    this.updateTopics = this._updateTopics.bind(this);
  }

  componentDidMount() {
    setUpdate(this.updateTopics);
    addTopics(this.props.topics);
  }

  componentWillReceiveProps(nextProps) {
    const newTopics = nextProps.topics.filter((topic) => this.props.topics.indexOf(topic) === -1);
    const droppedTopics = this.props.topics.filter((topic) => nextProps.topics.indexOf(topic) === -1);
    addTopics(newTopics);
    removeTopics(droppedTopics);
    if (nextProps.directTopic) {
      fetchOneTopic(nextProps.directTopic, (topicInfo) => {
        this.setState({ directTopic: topicInfo });
      });
    }
    if (nextProps.language !== this.props.language) {
      setLanguage(nextProps.language);
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  _updateTopics = (newTopics) => {
    this.setState({topics: newTopics});
  };

  basicView = (topic, idx) => {
    return (
      <BasicView 
        className="contextual-help-basic-view"
        key={`basicView-${idx}`}
        mapToDetail={`detailView-${idx}`}
        myKind='BasicView'
      >
        <h3 className="po-label pe-bold contextual-help-basic-view" >{topic.title || ''}</h3>
        <p className="pe-label contextual-help-basic-view">{ topic.excerpt || '' }</p>
      </BasicView>
    )
  };

  detailView = (topic, idx) => {
    return (
      <DetailView 
        id={`detailView-${idx}`}
        myKind='DetailView'
        key={`detailView-${idx}`}
      >
       <h2 className="pe-title pe-title--small pe-bold">{topic.title || ''}</h2>
       <div dangerouslySetInnerHTML={{__html: topic.content || ''}}>
       </div>
      </DetailView>
    )
  };

  directTopicView = (topic) => {
    return (
      <BasicView 
        mapToDetail={undefined}
        myKind='BasicView'
        key={`basicView-0`}
      >
        <h2 className="po-label pe-bold">{topic.title || ''}</h2>
        <div dangerouslySetInnerHTML={{__html: topic.content || ''}}>
        </div>
      </BasicView>
    )
  };

  drawerContents = () => {
    if (this.props.directTopic) {
      return (
        <div>
          {this.directTopicView(this.state.directTopic || { title: '', content: ''})}
        </div>
      )
    }

    return (
      <div>
        {this.state.topics.map((topic, idx) => this.basicView(topic, idx))}
        {this.state.topics.map((topic, idx) => this.detailView(topic, idx))}
      </div>
    )
  };

  render() {
    return (
      <Drawer 
        drawerHandler={this.props.handleHelp}
        drawerOpen={this.props.showHelp}
        drawerTop={this.props.drawerTop}
        position={'right'}
        text="Help Topics"
      >
        {this.drawerContents()}
      </Drawer>
    )
  }
}

ContextualHelp.propTypes = {
  directTopic: PropTypes.string,
  drawerTop: PropTypes.string,
  handleHelp: PropTypes.func,
  language: PropTypes.string,
  showHelp: PropTypes.bool,
  topics: PropTypes.array
};

export default ContextualHelp;
