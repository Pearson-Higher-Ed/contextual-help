import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, BasicView, DetailView } from '@pearson-components/drawer';
import { addTopics, removeTopics, getTopics, setUpdate, fetchOneTopic } from './topicsList2';

class ContextualHelp2 extends Component {
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
        this.setState({directTopic: topicInfo});
      });
    }
  }

  _updateTopics = (newTopics) => {
    this.setState({topics: newTopics});
  };

  basicView = (topic, idx) => {
    return (
      <BasicView 
        mapToDetail={`detailView-${idx}`}
        myKind='BasicView'
        key={`basicView-${idx}`}
      >
       <h3 className="po-label pe-bold" >{topic.title || ''}</h3>
       <p>{ topic.excerpt || '' }</p>
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
       <h2 className="pe-title">{topic.title || ''}</h2>
       <div dangerouslySetInnerHTML={{__html: topic.content || ''}}>
       </div>
      </DetailView>
    )
  };

  drawerContents = () => {
    if (this.props.directTopic) {
      return (
        <div>
          {this.detailView(this.state.directTopic || { title: '', content: ''}, 0)}
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
      <Drawer drawerOpen={this.props.showHelp} position={'right'} headerTitle="Header Title" drawerHandler={this.props.handleHelp} >
        {this.drawerContents()}
      </Drawer>
    )
  }
}

ContextualHelp2.propTypes = {
  directTopic: PropTypes.string,
  handleHelp: PropTypes.func,
  showHelp: PropTypes.bool,
  topics: PropTypes.array
};

export default ContextualHelp2;
