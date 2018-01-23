import {defineMessages} from 'react-intl';

//
// Default messages are 'en-US'
//
export const messages = defineMessages({
  buttonText: {
    id             : 'buttonText',
    description    : 'this is demo button text',
    defaultMessage : 'say hello'
  },
  placeholder: {
    id             : 'placeholder',
    description    : 'this is a demo placeholder',
    defaultMessage : 'placeholder'
  },
  greeting: {
    id             : 'greeting',
    description    : 'this is a greeting',
    defaultMessage : 'Hi There!'
  },
  label: {
    id             : 'label',
    description    : 'this is a greeting input label',
    defaultMessage : 'Greeting '
  }
});
