import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingCenter = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingCenter;
