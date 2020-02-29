/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import Home from './src/ui/home';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';

import {persistor, store} from './src/redux/';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Home />
    </PersistGate>
  </Provider>
);

export default App;
