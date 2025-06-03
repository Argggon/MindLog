import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>日历视图</Text>
      <Text style={styles.description}>按周、月、年查看日志记录情况</Text>
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

export default CalendarScreen;