import React from 'react';
import { mount } from 'enzyme';
import ContextualHelp from '../src/js/ContextualHelp';
import { setUpdate } from '../src/js/topicsList';

jest.mock('../src/js/topicsList', () => {
  return {
    addTopics: jest.fn(),
    removeTopics: jest.fn(),
    update: jest.fn(),
    setUpdate: jest.fn(),
    setLanguage: jest.fn(),
    fetchOneTopic: jest.fn()
  };
});
import { addTopics, removeTopics } from '../src/js/topicsList';

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

  it('updates topicsList for additions and subtractions', () => {
    const wrapper = mount(
      <ContextualHelp 
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
        topics={[]} 
        handleHelp={drawerHandler}
        text={text}
      />
    );

    expect(wrapper.find('li').length).toBe(0);

    wrapper.instance().updateTopics(testTopicsFilled);
    wrapper.setProps({ topics: testTopicsFilled.map((topic) => topic.name) });
    expect(wrapper.find('li').length).toBe(3);

    const changedTopicList = testTopicsFilled.filter((topic) => topic.name !== 'test/topic/2');
    wrapper.instance().updateTopics(changedTopicList);
    wrapper.setProps({ topics: changedTopicList.map((topic) => topic.name) });
    expect(wrapper.find('li').length).toBe(2);
  });

  it('should render direct to topic', () => {
    const wrapper = mount(
      <ContextualHelp 
        handleHelp={drawerHandler}
        text={text}
        topics={testTopics}
      />
    );
    setUpdate(wrapper.instance().updateTopics);
    expect(wrapper.find('li').length).toBe(0);

    wrapper.setProps({directTopic: 'test/topic/4'});
    expect(wrapper.find('li').length).toBe(1);
  });
});
