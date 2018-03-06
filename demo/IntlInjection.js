import React              from 'react';
import { injectIntl }     from 'react-intl';
import { messages }       from './translations/defaultMessages';
import ContextualHelpDemoPage from './ContextualHelpDemoPage';

const IntlInjection = (props) => {

  const { intl } = props;

  // do the string replacement...
  const intlText = {
    headerTitle : intl.formatMessage(messages.headerTitle),
    closeButton : intl.formatMessage(messages.closeButton),
    backButton  : intl.formatMessage(messages.backButton)
  }

  // add text to config data...
  const data  = {};
  data.text = intlText;

  return (
    <ContextualHelpDemoPage data={data} />
  )
}


export default injectIntl(IntlInjection);
