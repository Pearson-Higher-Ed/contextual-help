const TopicsList = (update, fetchTopic) => ({
  topics: [],
  update,
  fetchTopic,

  debugShow: function() {
    for(var i = 0; i < this.topics.length; i++) {
      console.log(i, this.topics[i]);
    }
  },

  retrieveNextTopic: function() {
    const topicToRetrieve = this.topics.find((element) => {
      return !element.title && !element.fetching && !element.failed;
    });
    if (topicToRetrieve) {
      this.retrieveTopic(topicToRetrieve);
    }
  },
  
  retrieveTopic: function(topic) {
    topic.fetching = true;

    this.fetchTopic(topic.name)
    .then((result) => {
      topic.title = result.title;
      topic.excerpt = result.excerpt;
      topic.content = result.content;
      topic.fetching = false;
      this.update(this.topics.filter(a => !a.fetching && !a.failed).map(a => ({...a})));
    })
    .catch(() => {
      topic.failed = true;
      topic.fetching = false;
    });

    this.retrieveNextTopic();
  },

  addTopics: function(topic) {
    if (!topic) {
      return;
    }
    if (typeof topic === 'string') {
      topic = [topic];
    }

    for(var i = 0; i < topic.length; i++) {
      const foundTopic = this.topics.find((element) => {
        return element.name === topic[i];
      });
      if (!foundTopic) {
        this.topics.push({ name: topic[i] });
      }
    }

    this.retrieveNextTopic();
  },

  removeTopics: function(topic) {
    if (!topic) {
      return;
    }
    if (typeof topic === 'string') {
      topic = [topic];
    }

    for(var i = 0; i < topic.length; i++) {
      const foundTopic = this.topics.find((element) => {
        return element.name === topic[i];
      });
      if (foundTopic) {
        this.topics.splice(this.topics.indexOf(foundTopic), 1);
      }
    }
  },

  removeAllTopics: function() {
    this.topics.splice(0, this.topics.length);
  }
});

export default TopicsList;
