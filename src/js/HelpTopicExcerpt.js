import React from 'react';
import PropTypes from 'prop-types';

const HelpTopicExcerpt = ({ title, excerpt, onClick }) => (
  <div 
    className="o-contextual-help__topic o-contextual-help__excerpt"
    onClick={ onClick }
  >
    <h3 className="po-label pe-bold" >
      <a href="#">{ title }</a>
    </h3>
    <p>{ excerpt }</p>
  </div>
);

HelpTopicExcerpt.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
  onClick: PropTypes.func
};

export default HelpTopicExcerpt;