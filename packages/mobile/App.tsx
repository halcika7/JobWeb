import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Login from './screens/auth/Login';

import { Provider, store } from '@job/redux';

import './axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Login />
        <StatusBar hidden />
      </View>
    </Provider>
  );
};

export default App;
