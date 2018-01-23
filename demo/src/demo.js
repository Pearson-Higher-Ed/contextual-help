/*global require*/
require('../../node_modules/pearson-elements/scss/elements.scss');
require('../../main');

document.addEventListener('DOMContentLoaded', function() {
  "use strict";
  document.dispatchEvent(new CustomEvent('o.InitContextualHelp'));
});

var testContent = {
  title: 'Test Accordion',
  excerpt: 'A test of the accordion for content.',
  content: '<div class="o-contextual-help__accordion"> <h3><button class="o-disclosure pe-label pe-label--bold" aria-controls="item-1" aria-expanded="false"><svg aria-hidden="true" focusable="false" class="pe-icon--pivot-close-18"><use xlink:href="#pivot-close-18"></use></svg>Item 1</button></h3> <div id="item-1" class="o-panel--closed"> <p >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </div> <h3><button class="o-disclosure pe-label pe-label--bold" aria-controls="item-2" aria-expanded="false"><svg aria-hidden="true" focusable="false" class="pe-icon--pivot-close-18"><use xlink:href="#pivot-close-18"></use></svg>Item 2</button></h3> <div id="item-2" class="o-panel--closed"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </div> <h3><button class="o-disclosure pe-label pe-label--bold" aria-controls="item-3" aria-expanded="false"><svg aria-hidden="true" focusable="false" class="pe-icon--pivot-close-18"><use xlink:href="#pivot-close-18"></use></svg>Item 3</button></h3> <div id="item-3" class="o-panel--closed"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </div> <h3><button class="o-disclosure pe-label pe-label--bold" aria-controls="item-4" aria-expanded="false"><svg aria-hidden="true" focusable="false" class="pe-icon--pivot-close-18"><use xlink:href="#pivot-close-18"></use></svg>Item 4</button></h3> <div id="item-4" class="o-panel--closed"> <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </div> </div>'
};
window.getAndConsoleLogHelp = function() {
  var help = document.getElementById('o-contextual-help-drawer').oContextualHelp;
  window.console && console.log(help);
}

window.openSpecificArticle = function(topic) {
  var help = document.getElementById('o-contextual-help-drawer').oContextualHelp;
  help.openHelpTopic(topic);
}

window.issueHelpClickFromHeader = function() {
  var el = document.querySelector('.o-app-header');
  // now make it emit and oAppHeader.help.toggle
  if (document.createEvent && el.dispatchEvent) {
    var evt = document.createEvent('Event');
    evt.initEvent('oAppHeader.help.toggle', true, true)
    el.dispatchEvent(evt);
  }
}

window.openThenAddATopicsAfterTime = function(topics, delay) {
  var help = document.getElementById('o-contextual-help-drawer').oContextualHelp;
  help.open();
  setTimeout(function() {
    help.addTopics(topics)
  }, delay);
}

window.openThenRemoveTopics = function(topics, delay) {
  var help = document.getElementById('o-contextual-help-drawer').oContextualHelp;
  help.open();
  setTimeout(function() {
    help.removeTopics(topics)
  }, delay);
}

window.openThenRemoveAll = function() {
  var help = document.getElementById('o-contextual-help-drawer').oContextualHelp;
  help.open();
  setTimeout(function() {
    help.removeAllTopics()
  }, 500);
}

window.openAndRandomSort = function() {
  if (window.loop) {
    clearInterval(window.loop);
  }
  var help = document.getElementById('o-contextual-help-drawer').oContextualHelp;
  help.open();
  function rndSort() {
    var ts = help.getTopics(),
        l = ts.length; 
    ts.sort(function() {
      return Math.floor(Math.random()*l) - 1;
    });
    help._el.querySelector('.o-contextual-help__excerpt-list').innerHTML = '';
    help.addTopics(ts);
  }
  setTimeout(function() {
    window.loop = setInterval(rndSort, 300);
  }, 500);
  setTimeout(function() {
    clearInterval(window.loop);
  }, 5500);
}

window.testAccordion = function(){
  var help = document.getElementById('o-contextual-help-drawer').oContextualHelp;
  help.cache.accordion = testContent;
  help.openHelpTopic('accordion');
}

window.signinTest = function(){
  var help = document.getElementById('o-contextual-help-drawer').oContextualHelp;
  help.removeAllTopics();
  var newTopics = [
      'console/instructor/validationtime',
      'console/instructor/validatedinstructor',
      'console/instructor/courseregsettings',
      'console/instructor/educatorresources',
      'console/instructor/contactsupport'
  ];
  help.addTopics(newTopics);
}

window.setLanguageThenOpen = function(){
  var help = document.getElementById('o-contextual-help-drawer').oContextualHelp;
  help.removeAllTopics();
  help.setLanguage('fr');
  var newTopics = [
    'pi/forgot_creds_next',
    'contactsupport'
  ];
  help.addTopics(newTopics);
  help.open();
}

window.setLanguageThenOpen = function(){
  var help = document.getElementById('o-contextual-help-drawer').oContextualHelp;
  help.removeAllTopics();
  help.setLanguage('fr');
  var newTopics = [
    'pi/forgot_creds_next',
    'contactsupport'
  ];
  help.addTopics(newTopics);
  help.open();
}

window.directLoader = function() {
  var help = document.getElementById('o-contextual-help-drawer').oContextualHelp;
  var testCache = {
    title: 'test content',
    excerpt: 'lorem ipsum',
    content: '<p>Lorem Ipsum dolar sit amet.</p>'
  };
  help.cache = {
    test: testCache
  };
  help.openHelpTopic('test');
}

window.addRemoveTopics = function() {
  var fakeHelp = {
    title: 'Fake Content',
    excerpt: 'This is the fake content for the test.',
    content: '<p>This is fake.</p>'
  };

  var help = document.getElementById('o-contextual-help-drawer').oContextualHelp;
  help.cache = {
    fake: fakeHelp
  };
  help.addTopics('fake');
  help.openHelpTopic('fake');
}


window.testCustomContent = function(){
  var customContent = document.getElementById('custom-content').value,
      secretDOM = document.getElementById('secret-dom');
  window.console && console.log('customContent', customContent);
  secretDOM.innerHTML = customContent;
  var data = {
    title: false,
    excerpt: '',
    content: false
  };
  var titleEl = secretDOM.getElementsByTagName('h1');
  if(titleEl && titleEl.length > 0){
    titleEl = titleEl[0];
    data.title = titleEl.innerHTML;
    titleEl.parentNode.removeChild(titleEl);
    data.content = secretDOM.innerHTML;
  }
  var contentWords = [];
  var contentParagraphs = secretDOM.querySelectorAll('p');
  for(var i=0, l=contentParagraphs.length; i<l; i++){
    var para = contentParagraphs[i];
    var words = para.innerHTML.split(' ');
    contentWords.push(words);
  }
  contentWords.forEach(function(w){
  // 80 character excerpt limit
    if(data.excerpt.length + w.length + 1 < 80){
      data.excerpt += w + ' ';
    }
  });

  var now = new Date().getTime();
  var help = document.getElementById('o-contextual-help-drawer').oContextualHelp;
  help.cache['help-'+now] = data;
  help.openHelpTopic('help-'+now);
}
