import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DictionaryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>情绪词典</Text>
      <Text style={styles.description}>扩充情绪词典，提升情绪粒度</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1E293B',
  },
  description: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
});

export default DictionaryScreen;