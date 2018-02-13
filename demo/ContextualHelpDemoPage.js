import React, { Component } from 'react';
import { Button } from '@pearson-components/elements-sdk/build/dist.elements-sdk';
import { ContextualHelp } from '../index';

import './ContextualHelpDemoPage.css';

class ContextualHelpDemoPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerIsOpen: false,
      position: 'left'
    };

    setTimeout(() => {
      this.contextualHelp.addTopics('console/instructor/validatedinstructor');
    }, 400);

    setTimeout(() => {
      this.contextualHelp.addTopics('console/instructor/courseregsettings');
    }, 1000);

    setTimeout(() => {
      this.contextualHelp.addTopics(['console/instructor/courseregsettings',
        'console/instructor/educatorresources',
        'console/student/studentresources',
        // 'invalid/topic/name',
        'console/student/freetrial',
        'console/student/studentresources',
        'contactsupport'
      ]);
    }, 1300);
  }

  render() {
    return (

      <div className="demo-container">
        <Button btnType="cta" btnSize="xlarge" onClick={() => { this.contextualHelp.openDrawer(); }}>Toggle Drawer</Button>
        <br />
        <br />

        <span>Contextual Help Component</span>

        <ContextualHelp 
          ref={(instance) => { this.contextualHelp = instance }}
        />
      </div>

    )
  }
}

export default ContextualHelpDemoPage;