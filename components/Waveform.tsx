import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface WaveformProps {
  isActive: boolean;
}

const Waveform: React.FC<WaveformProps> = ({ isActive }) => {
  const bars = Array(12).fill(0);
  const animations = bars.map(() => new Animated.Value(1));

  useEffect(() => {
    if (isActive) {
      const animate = () => {
        bars.forEach((_, index) => {
          const randomHeight = Math.random() * 0.8 + 0.2;
          Animated.timing(animations[index], {
            toValue: randomHeight,
            duration: 200,
            useNativeDriver: true,
          }).start();
        });
        
        setTimeout(animate, 200);
      };
      
      animate();
    } else {
      animations.forEach(anim => anim.setValue(1));
    }
  }, [isActive]);

  return (
    <View style={styles.container}>
      {bars.map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              transform: [
                {
                  scaleY: animations[index].interpolate({
                    inputRange: [0.2, 1],
                    outputRange: [0.2, 1],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 24,
    width: '100%',
  },
  bar: {
    width: 3,
    backgroundColor: '#6366F1',
    borderRadius: 3,
    height: '100%',
  },
});

export default Waveform;