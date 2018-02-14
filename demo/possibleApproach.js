import { addHelpTopics } from '../ContextualHelp';

class Parent extends React.Component {

  closeDrawer() {
    this.setState({
      stateToShow: 'list',
      openContextualHelp: false
    });
  }

  render() {
    <ContextualHelp
      helpTopics={this.state.helpTopics}
      show={this.state.openContextualHelp}
      toggleDrawer={this.closeDrawer}
      stateToShow={this.state.stateToShow}
    />
  }
}

// maybe instead of stateToShow it might be topicToShow. If it is empty
// show the list. If it has a topic, show that topic.


class ContextualHelp extends React.Component {
  componentDidMount() {
    this.setState({
      topics: [...this.getHelpTopics(), ...this.props.helpTopics]
    });
  }

// compare nextProps.topics to currentProps.topics. Use filter to create
// a list of new topics and a list of removed topics. then call appropriate
// methods addTopic and removeTopic. Problem to consider is removeAllTopics.
// Maybe a callback into ContextualHelp to get the list of props topics to know
// which ones to keep.

  componentDidUpate(nextProps) {
    this.setState(this.getHelpTopics(nextProps));
  }

  getHelpTopics(helpTopics) {

  }

  render() {
    this.state.topics.map(() => {
      <helpTopics>
    })
  }
}

export default {
  helpTopics: [],
  addHelpTopics(topic) {
    this.helpTopics.push(topic);
  },
  getHelpTopics() {
    return this.helpTopics;
  }
}
