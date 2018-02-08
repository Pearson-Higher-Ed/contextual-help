import React, { Component } from 'react';
import { ContextualHelp, ContextualHelp1st } from '../index';

import './ContextualHelpDemoPage.css';

class ContextualHelpDemoPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};

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

  render() {
    return (

      <div className="demo-container">
        <ContextualHelp1st ref={(instance) => { this.conHelp = instance }} />
        <ContextualHelp ref={(instance) => { this.contextualHelp = instance }} />
      </div>

    )
  }
}

export default ContextualHelpDemoPage;