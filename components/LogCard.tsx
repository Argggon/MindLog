import { Log } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.3)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* 时间标记 */}
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={14} color="#6366F1" />
          <Text style={styles.time}>{log.time}</Text>
        </View>

        {/* 日志内容 */}
        <Text style={styles.content}>
          {truncateText(log.content)}
        </Text>

        {/* 语音日志标记 */}
        {log.type === 'voice' && (
          <View style={styles.voiceBadge}>
            <Ionicons name="mic-outline" size={14} color="white" />
            <Text style={styles.duration}>{log.duration}</Text>
          </View>
        )}
      </LinearGradient>
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
  gradient: {
    padding: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  voiceBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default LogCard;