/*global describe, it*/
'use strict';

var expect = require('expect.js');

var ContextualHelp = require('./../src/js/ContextualHelp');

describe('ContextualHelp Init', function() {

  it('should initialise', function() {
    var ch = new ContextualHelp(document.body);
    expect(ch).to.not.be(null);
  });

  it('should return itself', function() {
    var ch = new ContextualHelp(document.body);
    expect(ch).to.have.property('openHelpTopic');
  });

  it('should attach itself to el as .oContextualHelp', function() {
    new ContextualHelp(document.body);
    expect(document.body).to.have.property('oContextualHelp');
  });
});

describe('ContextualHelp config loader (no config)', function() {

  it('should not have topics if there is no config', function() {
    var ch = new ContextualHelp(document.body);
    expect(ch.topics).to.be.an('array');
    expect(ch.topics).to.have.length(0);
  });

});

describe('ContextualHelp config loader (with config)', function() {

  it('should have topics if there IS a valid config', function() {
    var demoConf = {
      "helpTopics": [
        "console/student/freetrial",
        "console/student/studentresources",
        "console/student/contactsupport"
      ]
    };
    document.body.innerHTML = '';
    var confEl = document.createElement('script');
    confEl.setAttribute('type', 'application/json');
    confEl.setAttribute('data-o-contextual-help-config');
    confEl.innerText = JSON.stringify(demoConf);
    document.body.appendChild(confEl);

    var ct = document.createElement('div');
    document.body.appendChild(ct);

    var ch = new ContextualHelp(ct);
    expect(ch.topics).to.be.an('array');
    expect(ch.topics).to.have.length(3);
  });
});

describe('ContextualHelp remove topics', function() {
  var fakeHelp = {
    title: 'Fake Content',
    excerpt: 'This is the fake content for the test.',
    content: '<p>This is fake.</p>'
  };
  var fakeHelp2 = {
    title: 'Fake Content 2',
    excerpt: 'This is the fake content for the test, second.',
    content: '<p>This is also fake.</p>'
  };

  it('removeAllTopics() should empty the topics list', function() {
    var ch = new ContextualHelp(document.body);
    ch.cache = {
      fake: fakeHelp,
      fake2: fakeHelp2
    };
    ch.addTopics(['fake', 'fake2']);
    expect(ch.topics).to.contain('fake');
    expect(ch.topics).to.contain('fake2');
    ch.removeAllTopics();
    expect(ch.topics).to.have.length(0);
  });

  it('removeTopics() should remove topic from list by name', function() {
    var ch = new ContextualHelp(document.body);
    ch.cache = {
      fake: fakeHelp,
      fake2: fakeHelp2
    };
    ch.addTopics(['fake', 'fake2']);
    expect(ch.topics).to.contain('fake');
    expect(ch.topics).to.contain('fake2');
    ch.removeTopics('fake');
    expect(ch.topics).to.have.length(1);
    expect(ch.topics).to.contain('fake2');
  });
});

describe('setLanguage()', function() {
  it('should change the language code', function() {
    var ch = new ContextualHelp(document.body);
    expect(ch.lang).to.be('en-us');
    ch.setLanguage('ru');
    expect(ch.lang).to.be('ru');
  });
});

describe('checks for app-header\'s existence', function() {
  it('should add a class if app-header exists', function() {
    var header = document.createElement('header');
    header.classList.add('o-app-header');
    document.body.appendChild(header);
    var ct = document.createElement('div');
    document.body.appendChild(ct);

    var ch = new ContextualHelp(ct),
        el = ch._el;
    expect(el.className).to.be('exists-o-header');
  });
});
