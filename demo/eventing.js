import ReactDOM from 'react-dom';
import React    from 'react';

import { ContextualHelp } from '../index';


document.body.addEventListener('o.InitComponent', e => {
  ReactDOM.render(
    React.createElement(ContextualHelp, e.detail.props, e.detail.props.children)
    , document.getElementById(e.detail.elementId)
  );
});
