/* global describe it expect jest */
jest.mock('../src/js/chFetch', () => {
  const helpTopics = {
    'help/topic/test/1': {
      title: 'Test Title 1',
      excerpt: 'This is a dummy help topic.',
      content: 'This is a dummy help topic. It is use only for unit testing purposes.'
    },
    'help/topic/test/2': {
      title: 'Test Title 2',
      excerpt: 'This is the second dummy help topic.',
      content: 'This is the second dummy help topic. This second help entry exists to have a distinct difference from the first.'
    }
  };
  
  return (url) => {
    return new Promise((resolve, reject) => {
      let lang = url.substr('https://help.pearsoncmg.com/csh/'.length);
      let helpTopicName = lang.replace('.json', '');
      lang = lang.substring(0, lang.indexOf('/'));
      helpTopicName = helpTopicName.substr(lang.length + 1);
  
      process.nextTick(
        () => {
          return helpTopics[helpTopicName]
            ? resolve(helpTopics[helpTopicName])
            : reject({
              error: `Help Topic ${helpTopicName} not found.`
            })
        }
      );
    });
  }
});

import {
  fetchOneTopic,
  addTopics,
  removeTopics,
  getTopics,
  setUpdate,
  demoAddTopic,
  setLanguage,
  buildUrl
} from '../src/js/TopicsList';

describe('TopicsList', () => {
  it('fetches one topic', (done) => {
    fetchOneTopic('help/topic/test/1', (topic) => {
      expect(topic).toEqual(
        {
          title: 'Test Title 1',
          excerpt: 'This is a dummy help topic.',
          content: 'This is a dummy help topic. It is use only for unit testing purposes.',
          fetching: false
        }
      );
      done();
    })
  });

  it('fetch handles a bad topic name', (done) => {
    return fetchOneTopic('help/topic/test/99', (topic) => {
      expect(topic).toEqual(
        {
          title: 'Help unavailable',
          excerpt: 'Help for this topic is currently unavailable',
          content: 'Help for this topic is currently unavailable',
          fetching: false,
          failed: true
        }
      );
      done();
    })
  });

  it('accomodates adding and removing individual topics', () => {
    let topics = getTopics();
    expect(topics.length).toEqual(0);
    addTopics('help/topic/test/1');
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
    const expectedUrl = `https://help.pearsoncmg.com/csh/${fakeLanguage}/${fakeTopicName}.json`;
    setLanguage(fakeLanguage);
    const url = buildUrl(fakeTopicName);
    expect(url).toEqual(expectedUrl);
  });
});
