import { Provider } from 'react-redux';
import store from './client/store';

import * as React from 'react';
import Root from './routes';

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;
