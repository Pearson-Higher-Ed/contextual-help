import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import toLower from 'lodash/toLower';
import { Drawer, BasicView, DetailView } from '@pearson-components/drawer';
import { addTopics, removeTopics, setUpdate, fetchOneTopic, setLanguage } from './topicsList';

import '../scss/ContextualHelp.scss';

class ContextualHelp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      drawerIsOpen: false,
      skipTo: undefined
    };

    this.updateTopics = _updateTopics.bind(this);
    this.basicView = _basicView.bind(this);
    this.detailView = _detailView.bind(this);
    this.directTopicView = _directTopicView.bind(this);
    this.drawerContents = _drawerContents.bind(this);
  }

  componentDidMount() {
    setUpdate(this.updateTopics);
    setLanguage(this.props.defaultLanguage || 'en-us');
    if (this.props.intl && this.props.intl.locale) {
      setLanguage(toLower(this.props.intl.locale));
    }
    addTopics(this.props.topics);
    this.setState({ title: this.props.text.headerTitle})
  }

  componentWillReceiveProps(nextProps) {
    const newTopics = nextProps.topics.filter((topic) => this.props.topics.indexOf(topic) === -1);
    const droppedTopics = this.props.topics.filter((topic) => nextProps.topics.indexOf(topic) === -1);
    addTopics(newTopics);
    removeTopics(droppedTopics);

    if (nextProps.directTopic) {
      const d = new Date();
      fetchOneTopic(nextProps.directTopic, (topicInfo) => {
        this.setState({ directTopic: topicInfo, directKey: d.getTime() });
      });
    }

    if (nextProps.language !== this.props.language) {
      setLanguage(nextProps.language);
    }
  }

  render() {
    const { 
      drawerTop,
      handleHelp,
      showHelp,
      text
    } = this.props;
    const skipTo = this.props.directTopic ? `detailView-${this.state.directKey}` : undefined;
    return (
      <Drawer 
        drawerHandler={handleHelp}
        drawerOpen={showHelp}
        drawerTop={drawerTop}
        position={'right'}
        skipTo={skipTo}
        text={{
          headerTitle       : this.state.title,
          closeButtonSRText : text.closeButton,
          backButtonText    : text.backButton
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
  intl: PropTypes.object.isRequired,
  defaultLanguage: PropTypes.string,
  showHelp: PropTypes.bool,
  text: PropTypes.object.isRequired,
  topics: PropTypes.array
};

export default ContextualHelp;


function _updateTopics(newTopics) {
  this.setState({topics: newTopics});
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
      <h2 className="pe-title">{topic.title || ''}</h2>
      <div dangerouslySetInnerHTML={{__html: topic.content || ''}}>
      </div>
    </DetailView>
  )
};

function _directTopicView(topic) {
  const keyVal = this.state.directKey;
  return (
    <DetailView 
      id={`detailView-${keyVal}`}
      myKind="DetailView"
      key={`detailView-${keyVal}`}
    >
      <h2 className="pe-title">{topic.title || ''}</h2>
      <div dangerouslySetInnerHTML={{__html: topic.content || ''}}>
      </div>
    </DetailView>
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
