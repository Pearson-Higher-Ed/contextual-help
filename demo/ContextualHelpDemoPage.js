import React, { Component } from 'react';
import { Button } from '@pearson-components/elements-sdk/build/dist.elements-sdk';
import { ContextualHelp, ContextualHelp1st } from '../index';

import './ContextualHelpDemoPage.css';

class ContextualHelpDemoPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerIsOpen: false,
      position: 'left'
    };

    setTimeout(() => {
      this.conHelp.addTopics('console/instructor/validatedinstructor');
    }, 400);

    setTimeout(() => {
      this.conHelp.addTopics('console/instructor/courseregsettings');
    }, 1000);

    setTimeout(() => {
      this.conHelp.addTopics(['console/instructor/courseregsettings',
        'console/instructor/educatorresources',
        'console/student/studentresources',
        'invalid/topic/name',
        'console/student/freetrial',
        'console/student/studentresources',
        'contactsupport'
      ]);
    }, 1300);
  }
//  <ContextualHelp ref={(instance) => { this.contextualHelp = instance }} />
//  <ContextualHelp1st ref={(instance) => { this.conHelp = instance }} />

  render() {
    return (

      <div className="demo-container">


        <Button btnType="cta" btnSize="xlarge" onClick={() => { this.contextualHelp.openDrawer(); }}>Toggle Drawer</Button>
        <br />
        <br />
        <Button btnType="primary" btnSize="xlarge" onClick={() => {this.setState({position:"right"})}}>Drawer Position Right</Button>
        <br />
        <br />
        <Button btnType="primary" btnSize="xlarge" onClick={() => {this.setState({position:"left"})}}>Drawer Position Left</Button>
        <br />
        <br />




        <ContextualHelp ref={(instance) => { this.contextualHelp = instance }} />
      </div>

    )
  }
}

export default ContextualHelpDemoPage;