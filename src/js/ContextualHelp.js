import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toLower from 'lodash/toLower';
import { Drawer, BasicView, DetailView } from '@pearson-components/drawer';
import { addTopics, removeTopics, setUpdate, fetchOneTopic, setLanguage } from './TopicsList';

import '../scss/ContextualHelp.scss';

class ContextualHelp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      skipTo: undefined
    };

    this.updateTopics = _updateTopics.bind(this);
    this.basicView = _basicView.bind(this);
    this.basicViewHandler = _basicViewHandler.bind(this);
    this.detailView = _detailView.bind(this);
    this.directTopicView = _directTopicView.bind(this);
    this.drawerContents = _drawerContents.bind(this);
  }

  componentDidMount() {
    const element = document.getElementById('o-contextual-help-drawer');
    if (element && this.props.setDirectTopic) {
      element.oContextualHelp = {
        openHelpTopic: (directTopic) => { this.props.setDirectTopic(directTopic); }
      };
    }

    setUpdate(this.updateTopics);
    setLanguage(this.props.defaultLanguage || 'en-us');
    if (this.props.locale) {
      setLanguage(toLower(this.props.locale));
    }
    addTopics(this.props.topics);
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

    if (nextProps.locale !== this.props.locale) {
      setLanguage(nextProps.locale);
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
        appRootId={this.props.appRootId}
        basicViewClick={this.basicViewHandler}
        drawerHandler={handleHelp}
        drawerOpen={showHelp}
        drawerTop={drawerTop}
        id="o-contextual-help-drawer"
        position={'right'}
        skipTo={skipTo}
        text={{
          headerTitle       : text.headerTitle,
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
  appRootId : PropTypes.string.isRequired,
  defaultLanguage: PropTypes.string,
  directTopic: PropTypes.string,
  drawerTop: PropTypes.string,
  handleHelp: PropTypes.func.isRequired,
  locale: PropTypes.string,
  setDirectTopic: PropTypes.func,
  showHelp: PropTypes.bool,
  text: PropTypes.object.isRequired,
  topics: PropTypes.array,
  topicViewed: PropTypes.func
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
      <h3 className="po-label pe-bold contextualHelpBasicView" dangerouslySetInnerHTML={{__html: topic.title || ''}}></h3>
      <p className="pe-label contextualHelpBasicView contextualHelpExcerpt" dangerouslySetInnerHTML={{__html: topic.excerpt.split('<\\').join('<') || ''}}></p>
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
      <h2 className="pe-title" dangerouslySetInnerHTML={{__html: topic.title || ''}}></h2>
      <div className="detailViewBody" dangerouslySetInnerHTML={{__html: topic.content.split('<\\').join('<') || ''}}>
      </div>
    </DetailView>
  )
};

function _directTopicView(topic) {
  const keyVal = this.state.directKey;
  if (this.props.topicViewed && topic.title !== '') {
    setTimeout(() => {
      const el = document.getElementById(`detailView-${keyVal}`);
      if (el && this.props.showHelp) {
        this.props.topicViewed({ title: topic.title, fullElement: el });
      }
    }, 100);
  }

  return (
    <DetailView 
      id={`detailView-${keyVal}`}
      myKind="DetailView"
      key={`detailView-${keyVal}`}
    >
      <h2 className="pe-title" dangerouslySetInnerHTML={{__html: topic.title || ''}}></h2>
      <div className="detailViewBody" dangerouslySetInnerHTML={{__html: topic.content.split('<\\').join('<') || ''}}>
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

function _basicViewHandler(e) {
  if (this.props.topicViewed) {
    const tempElement = document.createElement('html');
    tempElement.innerHTML = e.currentTarget.innerHTML;
    const h3tags = tempElement.getElementsByTagName('h3');
    if (h3tags.length <= 0) {
      return;
    }
    this.props.topicViewed({ fullElement: e.currentTarget, title: h3tags[0].textContent })
  }
};
