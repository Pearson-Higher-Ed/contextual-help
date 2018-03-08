[![Build Status](https://travis-ci.org/Pearson-Higher-Ed/contextual-help.svg?branch=master)](https://travis-ci.org/Pearson-Higher-Ed/contextual-help)
## ContextualHelp

The contextual-help component provides for displaying help that is relevant to the users current actions within the context of the page. It uses the drawer component to keep this information hidden unless requested by the user.

UX Framework Design Page:

[http://uxframework.pearson.com/c/contextual-help/]
(http://uxframework.pearson.com/c/contextual-help/)

Demo Page:
[http://pearson-higher-ed.github.io/contextual-help/]
(http://pearson-higher-ed.github.io/contextual-help/)

## Getting Started

Initial Machine Setup
Install Git.
Install Node 6.0.0 or greater - Need to run multiple verions of Node? Use nvm.
On a Mac? You're all set. If you're on Windows, complete the steps for your OS below.
On Windows:

Install Ruby as the runtime engine for SCSS.
Install Python 2.7. Some node modules may rely on node-gyp, which requires Python on Windows.
On Chrome browser:

Optionally, install React developer tools.

installing the component:
```javascript

npm install @pearson-components/contextual-help --save

yarn add @pearson-components/contextual-help
```

### Quick Start
```javascript
git clone https://github.com/Pearson-Higher-Ed/contextual-help.git
cd contextual-help
npm install
npm start
```
Naviage to http://localhost:8081/contextual-help/, where the spawned Node server hosts a webpack-generated SPA using React Router for defining how to render the components.

As you save changes to the source, the changes are automatically reloaded in the browser.

### Usage

To use the ContextuaHelp in a React.js page:

import the contextual-help:

```javascript
  import { ContextualHelp } from "@pearson-components/contextual-help";
```

then configure the contextual-help:

```javascript
this.state = {
  directTopic: undefined,
  language: 'en-us',
  showHelp: false,
  helpTopics: [
    'console/student/freetrial',
    'pi/forgot_creds/next',
    'contactsupport'
  ]
};
```

```javascript
// The closeButton and backButton are specifically for accessibility
const languageSpecificText = {
  headerTitle: 'Help Topics',
  closeButton: 'Close',
  backButton: 'Back'
};
```

```javascript
<ContextualHelp
  directTopic={this.state.directTopic}
  drawerTop="61px"
  handleHelp={this.handleHelp}
  language={this.state.language}
  showHelp={this.state.showHelp}
  text={languageSpecificText}
  topics={this.state.helpTopics}
>
```

sample handler:
```javascript
_helpHandler = () => {
  this.setState({
    showHelp: !this.state.showHelp,
    directTopic: undefined
  });
}
```

ContextualHelp exists within a drawer component and the visibility is controlled by the showHelp property. A close 'X' is presented at the top of the drawer which executes the helpHandler.

ContextualHelp operates in one of two modes based upon the directTopic property. While this property is undefined, a list of topics (defined by the array passed to the topics property) will be presented. Each topic title will be displayed along with an excerpt. Clicking on a topic will replace the list of topics with the content of the topic selected. A Back button at the top of the control allows the user to go back to the list of topics.

When the directTopic property is set that topic will be presented in the drawer with no option to go back to the topic list. Hence, it is a good idea in the helpHandler to set the directTopic property back to undefined.

props for ContextualHelp:
```javascript
  directTopic : String  - portion of url that is specific to the topic.
  drawerTop   : String  - adjust the underlying drawer top property default "61px"
  handleHelp  : Function  - (required) sets state of showHelp to true or false
  language    : String    - portion of the url that is specific to the language of the topic.
  showHelp    : Boolean   - (required) sets visibility of drawer default false
  text        : Object    - text passed in for the title of the drawer and for accessibility vocalization of the buttons. Note that internationalization is the responsibility of the consuming code.
  topics      : Array     - array of strings which are the portion of the url that is specific to each topic.
```

## Test
The project is wired to unit test with [Jest](https://facebook.github.io/jest/).

```javascript
npm test
```
After running npm test && npm start, you may view the code coverage site at: http://localhost:8081/coverage/lcov-report

## Event Instantiation
Non React Apps may use the event harness by pulling in the eventInterface from the build directory. to instantiate a component use this format:

```javascript
document.body.dispatchEvent(new CustomEvent('o.InitComponent', {
  detail: {
    elementId: 'contextual-help',
    props: {
      directTopic: undefined,
      drawerTop: "61px",
      handleHelp: () => {},
      language: 'en-us',
      showHelp: true,
      text: {
        backButton:   'Back',
        closeButton:  'Close',
        headerTitle:  'Help Topics'
      },
      topics: [
        'console/student/freetrial',
        'pi/forgot_creds/next',
        'contactsupport'
      ]
    }
  }
}));
```

## Accessibility

### Keyboard focus
Refer to the [drawer](https://github.com/Pearson-Higher-Ed/drawer) documentation for accessibility on the drawer component. The drawer takes care of managin focus as the drawer is opened and closed.

Contextual-Help uses the BasicView and the DetailView of the drawer. The BasicView is used to present a list of topics and excerpts that are clickable. Clicking on one will cause the display to a DetailView containing the full text of the help topic. Only focusable elements within the specific view that is visible are available to assistive technologies (AT) and screen readers.

### Heading order
In the main topics list (BasicView), the phrase "Help Topics" is an h2 element. The name of each topic in the topics list is an h3 element.

On a specific topic (DetailView), the name of the topic is an h2 element. Any headings inside the topic should be smaller, starting with h3 for the main subtopics. They should not jump to h4, h5, or h6, but follow good content heading structure.

### Accordions/disclosure widgets
In order to include an accordion or disclosure widget inside content, the html5 <summary> and <detail> tags should be used. Placing the summary tag within the detail tag will cause the summary information only to be visible by default. Clicking on the summary will show/hide the content of the detail tag. 

## External Dependencies
React and ReactDOM(v0.14 or v15) are external dependencies required to use this component. They are npm-installable or availalbe from a third-party CDN.

This component targets the styling in the Pearson Elements SDK.

### Poly fills
React components with internationalization use React-Intl which relies on the ECMAScript Internationalization API. This was not supported in Safari until version 10. If you are supporting Safari older than 10, there is a polyfill from Andy Earnshaw (see below).

CusomeEvent support in IE is also polyfilled. Because many teams are supporting both IE 11 and Safari 9, we've combined the polyfills into a single script. The example below polyfills for CustomEvent and localization for English and French:

<script src="https://cdn.polyfill.io/v2/polyfill.js?features=CustomEvent,Intl.~locale.en,Intl.~locale.fr"></script>
Be sure to include the above script (a version of it that makes sense for your project and supported browsers) on your THML page running CompoundsSDK, if you need it.

## CodeCoverage site
After running npm test && npm start, you may view the code coverage site at: http://localhost:8081/coverage/lcov-report

## Guidelines
All submissions must be via pull request and approved before the pearson-design-accelerator@pearson.com team will merge and allow it to enter the release process. All submissions must pass this project's linting, test with 100% code coverage, and be compatible with the version(s) of React approved for the Pearson User Experience Platform.

## License
