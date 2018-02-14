import fetch from './fetch';

let topics = [];
let lang = 'en-us';

export const addTopics = (topic) => {
  if (!topic) {
    return;
  }
  if (typeof topic === 'string') {
    topic = [topic];
  }

  for(var i = 0; i < topic.length; i++) {
    const foundTopic = topics.find((element) => {
      return element.name === topic[i];
    });
    if (!foundTopic) {
      topics.push({ name: topic[i] });
    }
  }

  retrieveNextTopic();
};

export const removeTopics = (topic) => {
  if (!topic) {
    return;
  }
  if (typeof topic === 'string') {
    topic = [topic];
  }

  for(var i = 0; i < topic.length; i++) {
    const foundTopic = topics.find((element) => {
      return element.name === topic[i];
    });
    if (foundTopic) {
      topics.splice(topics.indexOf(foundTopic), 1);
    }
  }
  update(topics.filter(a => !a.fetching && !a.failed).map(a => ({...a})));
};

export const getTopics = () => {
  return topics.filter(a => !a.fetching && !a.failed).map(a => ({...a}))
};

const retrieveNextTopic = () => {
  const topicToRetrieve = topics.find((element) => {
    return !element.title && !element.fetching && !element.failed;
  });
  if (topicToRetrieve) {
    retrieveTopic(topicToRetrieve);
  }
};

const retrieveTopic = (topic) => {
  topic.fetching = true;

  fetchTopic(topic.name)
  .then((result) => {
    topic.title = result.title;
    topic.excerpt = result.excerpt;
    topic.content = result.content;
    topic.fetching = false;
    update(topics.filter(a => !a.fetching && !a.failed).map(a => ({...a})));
  })
  .catch(() => {
    topic.failed = true;
    topic.fetching = false;
  });

  retrieveNextTopic();
};

let update = (newTopics) => {};

export const setUpdate = (newUpdate) => {
  update = newUpdate;
};

export const setLanguage = (language) => {
  lang = language;
};

const fetchTopic = (topicName) => {
  const url = `http://context-help.pearson.com/help/de6fde00-d9d7-4e45-b506-82c01fd7202a/Out/${lang}/${topicName}.json`;
  return fetch(url);
};

export const fetchOneTopic = (topicName, callback) => {
  fetchTopic(topicName)
  .then((result) => {
    const topic = {
      title: result.title,
      excerpt: result.excerpt,
      content: result.content,
      fetching: false
      };
    callback(topic);
  })
  .catch(() => {
    callback({
      title: 'Help unavailable',
      content: 'Help for this topic is currently unavailable',
      excerpt: 'Help for this topic is currently unavailable',
      fetching: false,
      failed: true
    });
  });
};
