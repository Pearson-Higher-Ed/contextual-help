import TopicsList from './TopicsList';
import fetch from './fetch';

const HelpTopicsList = (updateTopics, lang = 'en-us') => ({
  topicList: new TopicsList(updateTopics, (topicName) => {
    const url = `https://raw.githubusercontent.com/Pearson-Higher-Ed/help-content/master/out/${lang}/${topicName}.json`;
    return fetch(url);
  }),

  addTopics: function(topic) {
    this.topicList.addTopics(topic);
  },

  removeTopics: function(topic) {
    this.topicList.removeTopics(topic);
  },

  removeAllTopics: function() {
    this.topicList.removeAllTopics();
  }
});

export default HelpTopicsList;