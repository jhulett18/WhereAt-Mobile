// EventNews.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventNews = () => {
  return (
    <View style={styles.container}>
      <Text>Event News Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventNews;
