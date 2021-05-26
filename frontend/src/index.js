import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import LoadingApp from 'components/LoadingApp';
import { Provider } from 'react-redux';
import App from './App';

import { store } from './store';
import './i18n';
import 'antd/dist/antd.css';

ReactDOM.render(
  <Suspense fallback={<LoadingApp />}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.getElementById('root')
);
