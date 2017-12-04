// root.jsx
import React from 'react';
import { Provider } from 'react-redux';
import App from './app';
import { HashRouter } from 'react-router-dom';

const Root = ({store}) => (
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);

export default Root;
