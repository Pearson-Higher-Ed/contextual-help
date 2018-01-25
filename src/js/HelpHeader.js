import React from 'react';
import PropTypes from 'prop-types';

const HelpHeader = ({ backToTopics, contentLevel }) => {
  const titleId = contentLevel ? "close_sub" : "close_main"
  console.log('contentLevel', contentLevel);

  const showHeaderText = () => {
    if (!contentLevel) {
      return (
        <h2 className="topic_heading pe-title">Help Topics</h2>
      );
    }

    return (
      <button
        className="pe-icon--btn back-to-help"
        id="contextual-help-close-content"
        onClick={backToTopics}
      >
        <svg 
          aria-hidden="false"
          className="pe-icon--chevron-back-18"
          focusable="false"
        >
          <use xlinkHref="#chevron-back-18" ></use>
        </svg>
        <span>Back to Help Topics</span>
      </button>
    );
  };

  return (
    <div className="o-contextual-help__header" >
      <button
        aria-label="Close help"
        className="pe-icon--btn close-help"
        data-close="o-drawer"
        data-target="#ocontextual-help-drawer"
        type="button"
      >
        <svg
          aria-labelledby={titleId}
          className="pe-icon--remove-sm-24"
          focusable="false"
          role="img"
        >
          <title id={titleId}>Close Help</title>
          <use xlinkHref="#remove-sm-24"></use>
        </svg>
      </button>
      {showHeaderText()}
    </div>
  );
};

HelpHeader.propTypes = {
  backToTopics: PropTypes.func,
  contentLevel: PropTypes.bool
}

export default HelpHeader;