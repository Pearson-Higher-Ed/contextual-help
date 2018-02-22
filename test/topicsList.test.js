jest.mock('../src/js/chFetch');

import { fetchOneTopic, addTopics, removeTopics, getTopics, setUpdate, demoAddTopic, setLanguage, buildUrl } from '../src/js/topicsList';

it('fetches one topic', () => {
  return fetchOneTopic('help/topic/test/1', (topic) => {
    expect(topic).toEqual(
      {
        title: 'Test Title 1',
        excerpt: 'This is a dummy help topic.',
        content: 'This is a dummy help topic. It is use only for unit testing purposes.',
        fetching: false
      }
    )
  })
});

it('fetches handles a bad topic name', () => {
  return fetchOneTopic('help/topic/test/99', (topic) => {
    expect(topic).toEqual(
      {
        title: 'Help unavailable',
        excerpt: 'Help for this topic is currently unavailable',
        content: 'Help for this topic is currently unavailable',
        fetching: false,
        failed: true
      }
    )
  })
});

it('accomodates adding and removing individual topics', () => {
  let topics = getTopics();
  expect(topics.length).toEqual(0);
  addTopics('help/topic/test/1');
  // let i = 0;
  // while (i < 10) {
  //   topics = getTopics(true);
  //   console.log(topics);
  //   process.nextTick(() => {});
  //   i += 1;    
  // }
  topics = getTopics(true);
  expect(topics.length).toEqual(1);
  removeTopics('help/topic/test/1');
  topics = getTopics(true);
  expect(topics.length).toEqual(0);
});

it('accomodates adding and removing multiple topics', () => {
  let topics = getTopics();
  expect(topics.length).toEqual(0);
  addTopics([
    'help/topic/test/1',
    'help/topic/test/2',
    'help/topic/test/3'
  ]);
  topics = getTopics(true);
  expect(topics.length).toEqual(3);
  removeTopics([
    'help/topic/test/1',
    'help/topic/test/2'
  ]);
  topics = getTopics(true);
  expect(topics.length).toEqual(1);
  removeTopics([
    'help/topic/test/3'
  ]);
  topics = getTopics(true);
  expect(topics.length).toEqual(0);
});

it('allows setting of the update function', () => {
  const mockUpdate = jest.fn();
  setUpdate(mockUpdate);
  demoAddTopic({
    name: 'help/topic/test/5',
    title: 'Dummy Title',
    excerpt: 'This is the excerpt',
    content: 'This is the content',
    fetching: false,
    failed: false
  });
  expect(mockUpdate.mock.calls.length).toBe(1);
  removeTopics('help/topic/test/5');
  expect(mockUpdate.mock.calls.length).toBe(2);
});

it('uses language to build URL', () => {
  const fakeLanguage = 'humpseyFrats';
  const fakeTopicName = 'fake/topic/name';
  const expectedUrl = `http://context-help.pearson.com/help/de6fde00-d9d7-4e45-b506-82c01fd7202a/Out/${fakeLanguage}/${fakeTopicName}.json`;
  setLanguage(fakeLanguage);
  const url = buildUrl(topicName);
  expect(url).toEqual(expectedUrl);
});