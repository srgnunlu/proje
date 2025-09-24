import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import FeedScreen from './src/screens/FeedScreen';
import { store } from './src/store';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <FeedScreen />
          <StatusBar style="auto" />
        </SafeAreaView>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#f2f2f7'
  }
});
