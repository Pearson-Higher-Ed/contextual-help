jest.mock('../src/js/fetch');

import { fetchOneTopic } from '../src/js/topicsList';

it('does something', () => {
  expect.assertions(1);
  return fetchOneTopic('help/topic/test/1', (topic) => {
    expect(topic).toEqual(
      {
        title: 'Test Title 1',
        excerpt: 'This is a dummy help topic.',
        content: 'This is a dummy help topic. It is use only for unit testing purposes.'
      }
    )
  })
});