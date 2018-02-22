import React from 'react';
import { mount } from 'enzyme';
import ContextualHelp from '../src/js/ContextualHelp';

it('updates topics in state', () => {
  const testTopics = [
    'test/topic/1',
    'test/topic/2',
    'test/topic/3',
  ];
  const wrapper = mount(<ContextualHelp topics={testTopics} />);
  expect(wrapper.state.topics).toEqual(testTopics);
  console.log('state', wrapper.state.topics);
  console.log('testTopics', testTopics);
});