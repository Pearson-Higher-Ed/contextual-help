import React, { Component } from 'react';
import { Button } from '@pearson-components/elements-sdk/build/dist.elements-sdk';
import { ContextualHelp2 } from '../index';

import { addTopics, removeTopics, getTopics, setUpdate } from '../index';

import './ContextualHelpDemoPage.css';

class ContextualHelpDemoPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      testTopics: ['console/student/freetrial'],
      showHelp: false,
      directTopic: undefined
    };
    
    // this.updateTopics = this._updateTopics.bind(this);
    // setUpdate(this.updateTopics);
    this.handleHelp = this._handleHelp.bind(this);

    // setTimeout(() => {
    //   addTopics('console/instructor/validatedinstructor');
    // }, 400);

    // setTimeout(() => {
    //   addTopics('console/instructor/courseregsettings');
    // }, 1000);

    // setTimeout(() => {
    //   addTopics([ // 'console/instructor/courseregsettings',
    //     'console/instructor/educatorresources',
    //     'console/student/studentresources',
    //     'invalid/topic/name',
    //     'console/student/freetrial',
    //     'console/student/studentresources',
    //     'contactsupport'
    //   ]);
    // }, 2000);
  }

  showTopic(topic) {
    console.log(topic);
    return (
      <div>
        `${topic.name} -- ${topic.title} -- ${topic.excerpt}`
      </div>
    )
  };

  _handleHelp() {
    this.setState({
      showHelp: !this.state.showHelp,
      directTopic: this.state.showHelp ? undefined : this.state.directTopic
    });
  }

  render() {
    return (

      <div className="demo-container">
        <Button btnType="cta" btnSize="xlarge" onClick={() => { this.setState({showHelp: true}); }}>Show Help</Button>
        <br />
        <br />
        <Button btnType="cta" btnSize="xlarge" onClick={() => { this.setState({testTopics: getTopics()}); }}>Get Topics</Button>
        <br />
        <br />
        <Button 
          btnType="cta" 
          btnSize="xlarge" 
          onClick={() => { 
            this.setState({
              testTopics: [...this.state.testTopics, 'console/instructor/courseregsettings']
            });
          }}>Add Help To state
        </Button>
        <br />
        <br />
        <Button 
          btnType="cta" 
          btnSize="xlarge" 
          onClick={() => { 
            this.setState({
              testTopics: this.state.testTopics.filter((topic) => topic !== 'console/student/freetrial')
            });
          }}>Remove from state
        </Button>
        <br />
        <br />
        <Button 
          btnType="cta" 
          btnSize="xlarge" 
          onClick={() => { 
            this.setState({
              directTopic: 'console/student/studentresources',
              showHelp: true
            });
          }}>Direct to topic
        </Button>
        <br />
        <br />

        <ContextualHelp2
          topics= {this.state.testTopics}
          showHelp= {this.state.showHelp}
          handleHelp={this.handleHelp}
          directTopic={this.state.directTopic}
        />

      </div>

    )
  }
}


export default ContextualHelpDemoPage;