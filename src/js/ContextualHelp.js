import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, BasicView, DetailView } from '@pearson-components/drawer';
import { addTopics, removeTopics, setUpdate, fetchOneTopic, setLanguage } from './topicsList';

import '../scss/ContextualHelp.scss';

class ContextualHelp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      drawerIsOpen: false
    };

    this.updateTopics = _updateTopics.bind(this);
    this.basicView = _basicView.bind(this);
    this.detailView = _detailView.bind(this);
    this.directTopicView = _directTopicView.bind(this);
    this.drawerContents = _drawerContents.bind(this);
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

  render() {
    const { text } = this.props;
    return (
      <Drawer 
        drawerHandler={this.props.handleHelp}
        drawerOpen={this.props.showHelp}
        drawerTop={this.props.drawerTop}
        position={'right'}
        text={{
          headerTitle       : text.headerTitle,
          closeButtonSRText : text.closeButon,
          backButtonText    : text.backButon
        }}
      >
        {this.drawerContents()}
      </Drawer>
    )
  }
}

ContextualHelp.propTypes = {
  directTopic: PropTypes.string,
  drawerTop: PropTypes.string,
  handleHelp: PropTypes.func.isRequired,
  language: PropTypes.string,
  showHelp: PropTypes.bool,
  text: PropTypes.object.isRequired,
  topics: PropTypes.array
};

export default ContextualHelp;


function _updateTopics(newTopics) {
  this.setState({topics: newTopics});
  console.log('state updated', this.state.topics);
};

function _basicView(topic, idx) {
  return (
    <BasicView 
      className="contextualHelpBasicView"
      key={`basicView-${idx}`}
      mapToDetail={`detailView-${idx}`}
      myKind="BasicView"
    >
      <h3 className="po-label pe-bold contextualHelpBasicView" >{topic.title || ''}</h3>
      <p className="pe-label contextualHelpBasicView">{ topic.excerpt || '' }</p>
    </BasicView>
  )
};

function _detailView(topic, idx) {
  return (
    <DetailView 
      id={`detailView-${idx}`}
      myKind="DetailView"
      key={`detailView-${idx}`}
    >
      <h2 className="pe-title pe-title--small pe-bold">{topic.title || ''}</h2>
      <div dangerouslySetInnerHTML={{__html: topic.content || ''}}>
      </div>
    </DetailView>
  )
};

function _directTopicView(topic) {
  return (
    <BasicView 
      mapToDetail={undefined}
      myKind="BasicView"
      key={'basicView-0'}
    >
      <h2 className="pe-label pe-bold">{topic.title || ''}</h2>
      <div dangerouslySetInnerHTML={{__html: topic.content || ''}}>
      </div>
    </BasicView>
  )
};

function _drawerContents() {
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
