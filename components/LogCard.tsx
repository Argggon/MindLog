import { Log } from '@/types/types';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface LogCardProps {
  log: Log;
}

const LogCard: React.FC<LogCardProps> = ({ log }) => {
  // 截断超过三行的文本
  const truncateText = (text: string, maxLines = 3) => {
    const lines = text.split('\n');
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).join('\n') + '...';
    }
    return text;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.time}>{log.time}</Text>
        {log.type === 'voice' && (
          <Text style={styles.duration}>{log.duration}</Text>
        )}
      </View>
      
      {log.type === 'voice' && (
        <View style={styles.voiceContainer}>
          <MaterialIcons name="keyboard-voice" size={24} color="#6366F1" />
          <View style={styles.waveform}>
            {[1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4].map((height, index) => (
              <View 
                key={index} 
                style={[styles.waveBar, { height: height * 4 }]} 
              />
            ))}
          </View>
        </View>
      )}
      
      <Text style={styles.content}>
        {truncateText(log.content)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  duration: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '500',
  },
  voiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  waveform: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    marginLeft: 8,
    justifyContent: 'space-around',
  },
  waveBar: {
    width: 2,
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1E293B',
  },
});

export default LogCard;