import React from 'react';
import { mount, shallow } from 'enzyme';
import ContextualHelp from '../src/js/ContextualHelp';
import BasicView from '../node_modules/@pearson-components/drawer/src/js/components/BasicView';
import { setUpdate } from '../src/js/topicsList';

jest.mock('../src/js/topicsList');

describe('ContextualHelp',() => {
  const testTopics = [
    'test/topic/1',
    'test/topic/2',
    'test/topic/3',
  ];
  const drawerHandler = function() {};

  it('updates topics in state', () => {
    const wrapper = mount(
      <ContextualHelp 
        topics={testTopics} 
        handleHelp={drawerHandler}
      />
    );
    expect(Array.isArray(wrapper.instance().state.topics)).toBeTruthy();
    expect(wrapper.instance().state.topics.length).toBe(3);

    const changedTopicList = testTopics.filter((topic) => topic != 'test/topic/2');
    wrapper.setProps({ topics: changedTopicList });
    expect(wrapper.instance().state.topics.length).toBe(2);
  });

  it('should render topics', () => {
    const wrapper = mount(
      <ContextualHelp
        topics={[]} 
        handleHelp={drawerHandler}
        showHelp={true}
      />
    );
    setUpdate(wrapper.instance().updateTopics);
    expect(wrapper.find('h3').length).toBe(0);

    wrapper.setProps({topics: testTopics});
    expect(wrapper.find('h3').length).toBe(3);

    const changedTopicList = testTopics.filter((topic) => topic != 'test/topic/2');
    wrapper.setProps({
      topics: changedTopicList,
      handleHelp: drawerHandler,
      showHelp: true
    });
    expect(wrapper.find('h3').length).toBe(2);
  });

  it('should render direct to topic', () => {
    const wrapper = mount(
      <ContextualHelp 
        topics={testTopics} 
        handleHelp={drawerHandler}
        showHelp={true}
      />
    );
    setUpdate(wrapper.instance().updateTopics);
    expect(wrapper.find('h2').length).toBe(0);

    wrapper.setProps({directTopic: 'test/topic/4'});
    expect(wrapper.find('h2').length).toBe(1);
  });
});
