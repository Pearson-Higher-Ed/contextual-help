import chFetch from './chFetch';

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

// This is used only for the component demo page. It is not published in the
// index. It allows users to test content appearance via the demo page.
export const demoAddTopic = (fullTopic) => {
  if (!fullTopic) {
    return;
  }

  const foundTopic = topics.find((element) => {
    return element.name === fullTopic.name;
  });
  if (!foundTopic) {
    topics.push(fullTopic);
  }
  update(topics.filter(a => !a.fetching && !a.failed).map(a => ({...a})));
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

export const getTopics = (ignoreStatus) => {
  return topics.filter(a => (!a.fetching && !a.failed) || ignoreStatus).map(a => ({...a}))
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
  topic.title = "Test Title";
  topic.excerpt = "Test excerpt";
  topic.content = "Test content";
  topic.fetching = false;
  topic.failed = false;
  update(topics.filter(a => !a.fetching && !a.failed).map(a => ({...a})));

  retrieveNextTopic();
};

let update = (newTopics) => {};

export const setUpdate = (newUpdate) => {
  update = newUpdate;
};

export const setLanguage = (language) => {
  if (language !== lang) {
    const currentTopics = topics.map((topic) => topic.name);
    topics.length = 0;
    update(topics.filter(a => !a.fetching && !a.failed).map(a => ({...a})));
    lang = language;
    currentTopics.forEach((topic) => addTopics(topic));
  }
};

export const buildUrl = (topicName) => {
  return `http://context-help.pearson.com/help/de6fde00-d9d7-4e45-b506-82c01fd7202a/Out/${lang}/${topicName}.json`;
};

const fetchTopic = (topicName) => {
  const url = buildUrl(topicName);
  return chFetch(url);
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
  .catch((error) => {
    callback({
      title: 'Help unavailable',
      content: 'Help for this topic is currently unavailable',
      excerpt: 'Help for this topic is currently unavailable',
      fetching: false,
      failed: true
    });
  });
};
