import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import speech from './speech';
import LanguageProvider from './containers/LanguageProvider';
import { changeLocale } from './containers/LanguageProvider/actions';
import { getStore } from './store';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import './index.css';

async function init() {
  const store = await getStore();
  const state = store.getState();
  
  speech.getLocales().then(locales => {
    if (!state.language.locale) {
      const navigatorLocale = navigator.languages[0].slice(0, 2);
      let locale;

      if (locales.includes(navigatorLocale)) {
        locale = navigatorLocale;
      } else {
        locale = 'en';
      }
      store.dispatch(changeLocale(locale));
    }

    ReactDOM.render(
      <Provider store={store}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </Provider>,
      document.getElementById('root')
    );
  });
}

init();
registerServiceWorker();
