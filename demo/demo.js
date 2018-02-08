import React         from 'react';
import ReactDOM      from 'react-dom';
import IntlInjection from './IntlInjection';
import { addLocaleData, IntlProvider } from 'react-intl';
// Import Translations...
import frJson       from './translations/fr.json';
import frLocaleData from 'react-intl/locale-data/fr';
import enUSJson       from './translations/en-US.json';
import enUSLocaleData from 'react-intl/locale-data/en';

//
// Example of consuming the component using React-Intl translation.
//
// Demo by adding the query string to the URL: "?lang=fr"
//
// The current philosophy is that all text, from external content to
// the component's labels and buttons, is passed into the component as
// properties. Therefore, it is the responsibility of the consumer to
// ensure that the text is customized for their use and internationalized.
//

let   language = 'en-US';
const search = window.location.search,
      getQueryParam = (paramName, defaultValue, search) => {
        let value = defaultValue;
        const name = paramName.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
        const results = regex.exec(search);

        if (results) {
          value = decodeURIComponent(results[1].replace(/\+/g, ' '));
        }

        return value;
      },
      // Associate Language Abbreviation with JSON filename...
      translations = {
        'en-US' : enUSJson,
        'fr'    : frJson
      };

// Add supported languages...
addLocaleData(frLocaleData);
addLocaleData(enUSLocaleData);

// Parse query string to determine demo language
if (search) {
  language = getQueryParam('lang', language, search);
}

// Get component's text translations based on user's language.
ReactDOM.render(
  <IntlProvider locale={language} key={language} messages={translations[language]}>
    <IntlInjection />
  </IntlProvider>,
  document.getElementById('conHelpDemo')
)
