import React              from 'react';
import { injectIntl }     from 'react-intl';
import { messages }       from './translations/defaultMessages';
import ContextualHelpDemoPage2 from './ContextualHelpDemoPage2';

const IntlInjection = (props) => {

      const { intl } = props;

      // do the string replacement...
      const intlText = {
        buttonText  : intl.formatMessage(messages.buttonText),
        placeholder : intl.formatMessage(messages.placeholder),
        greeting    : intl.formatMessage(messages.greeting),
        label       : intl.formatMessage(messages.label)
      }

      // add text to config data...
      let data  = {};
      data.text = intlText;

    return (
      <ContextualHelpDemoPage2 data={data} />
    )
}


export default injectIntl(IntlInjection);
