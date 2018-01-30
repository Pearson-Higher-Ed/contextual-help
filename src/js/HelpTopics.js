import React from 'react';
import PropTypes from 'prop-types';
import HelpHeader from './HelpHeader';
import HelpTopicExcerpt from './HelpTopicExcerpt';

const HelpTopics = ({ helpList, topicClick, hide }) => {
  const helpTopicEntry = (helpTopic, idx) => {
    return (
      <HelpTopicExcerpt
        excerpt={helpTopic.excerpt}
        key={`helpTopic-${idx}`}
        title={helpTopic.title}
        onClick={() => topicClick(helpTopic)}
      />
    );
  };

  return (
    <div
      className={`o-contextual-help__topics ${hide ? 'hide' : ''}`}
    >
      <HelpHeader contentLevel={false} />
      <div
        aria-live="polite"
        className="o-contextual-help__excerpt-list"
      >
        {helpList.map((topic, idx) => helpTopicEntry(topic, idx))}
      </div>
    </div>
  );
};

HelpTopics.propTypes = {
  helpList: PropTypes.array,
  topicClick: PropTypes.func,
  hide: PropTypes.bool
};

export default HelpTopics;