import React from 'react';
import { mount, shallow } from 'enzyme';
import ContextualHelp from '../src/js/ContextualHelp';

jest.mock('../src/js/TopicsList', () => {
  return {
    addTopics: jest.fn((topic) => {
      if (!topic) {
        return;
      }
      if (typeof topic === 'string') {
        topic = [topic];
      }
      const topics = [];
      for(let i = 0; i < topic.length; i++) {
        topics.push({
          name: topic[i],
          title: 'Title for' + topic[i],
          content: 'Help for this topic is currently unavailable',
          excerpt: 'Help for this topic is currently unavailable',
          fetching: false,
          failed: false
        });
      }
    }),
    removeTopics: jest.fn(),
    update: jest.fn(),
    mockUpdate: jest.fn(),
    setUpdate: jest.fn(),
    setLanguage: jest.fn(),
    fetchOneTopic: jest.fn((topicName, callback) => {
      callback({
        name: topicName,
        title: 'Dummy Direct Help',
        content: 'Help for this topic is currently unavailable',
        excerpt: 'Help for this topic is currently unavailable',
        fetching: false,
        failed: false
      });
    })
  };
});
import { addTopics, removeTopics, setUpdate, fetchOneTopic } from '../src/js/TopicsList';

jest.mock('@pearson-components/drawer', () => {
  return {
    Drawer: jest.fn((props) => { return (<div>{props.children}</div>); }),
    BasicView: jest.fn((props) => { return (<div></div>); }),
    DetailView: jest.fn(() => { return (<div></div>); })
  };
});
import { Drawer, BasicView, DetailView } from '@pearson-components/drawer';

describe('ContextualHelp', () => {
  const testTopics = [
    'test/topic/1',
    'test/topic/2',
    'test/topic/3'
  ];
  const testTopicsFilled = [
    {
      name: 'test/topic/1',
      title: 'Help unavailable',
      content: 'Help for this topic is currently unavailable',
      excerpt: 'Help for this topic is currently unavailable',
      fetching: false,
      failed: false

    },
    {
      name: 'test/topic/2',
      title: 'Help unavailable',
      content: 'Help for this topic is currently unavailable',
      excerpt: 'Help for this topic is currently unavailable',
      fetching: false,
      failed: false

    },
    {
      name: 'test/topic/3',
      title: 'Help unavailable',
      content: 'Help for this topic is currently unavailable',
      excerpt: 'Help for this topic is currently unavailable',
      fetching: false,
      failed: false

    }
  ];
  const drawerHandler = function() {};
  const text = {
    headerTitle       : 'Help Topics',
    closeButtonSRText : 'Close',
    backButtonText    : 'Back'
  };

  beforeEach(() => {
    DetailView.mockClear();
    BasicView.mockClear();
    Drawer.mockClear();
  });

  it('updates topicsList for additions and subtractions', () => {
    const wrapper = shallow(
      <ContextualHelp
        appRootId="none"
        topics={testTopics} 
        handleHelp={drawerHandler}
        text={text}
      />
    );

    expect(addTopics).toHaveBeenCalledTimes(1);

    const changedTopicList = testTopics.filter((topic) => topic !== 'test/topic/2');
    wrapper.setProps({ topics: changedTopicList });
    expect(removeTopics).toHaveBeenCalledTimes(1);
  });

  it('should render topics', () => {
    const wrapper = mount(
      <ContextualHelp
        appRootId={'none'}
        topics={testTopicsFilled} 
        handleHelp={drawerHandler}
        text={text}
      />
    );

    wrapper.instance().updateTopics(testTopicsFilled);

    expect(BasicView).toHaveBeenCalledTimes(3);
  });

  it('should render direct to topic', () => {
    const wrapper = mount(
      <ContextualHelp 
        appRootId="none"
        directTopic={undefined}
        handleHelp={drawerHandler}
        text={text}
        topics={[]}
      />
    );

    setUpdate(wrapper.instance().updateTopics);
    expect(wrapper.find('li').length).toBe(0);

    wrapper.setProps({directTopic: 'test/topic/4'});
    expect(fetchOneTopic).toHaveBeenCalledTimes(1);
    expect(fetchOneTopic.mock.calls[0][0]).toEqual('test/topic/4');
    expect(DetailView).toHaveBeenCalledTimes(1);
  });
});
