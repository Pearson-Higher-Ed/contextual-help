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

const chFetch = (url) => {
  return new Promise((resolve, reject) => {
    let lang = url.substr('http://context-help.pearson.com/help/de6fde00-d9d7-4e45-b506-82c01fd7202a/Out/'.length);
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

export default chFetch;
