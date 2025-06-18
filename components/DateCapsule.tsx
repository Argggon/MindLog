import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DateCapsuleProps {
  date: string;
}

const DateCapsule: React.FC<DateCapsuleProps> = ({ date }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(99, 102, 241, 0.7)', 'rgba(129, 140, 248, 0.7)']}
        style={styles.capsule}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.dateText}>{date}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  capsule: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  dateText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default DateCapsule;