import Waveform from '@/components/Waveform';
import { Log } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface NewLogButtonProps {
  onAddLog: (log: Log) => void;
}

const NewLogButton: React.FC<NewLogButtonProps> = ({ onAddLog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [text, setText] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  
  const animation = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 处理动画效果
  useEffect(() => {
    Animated.timing(animation, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  // 开始录音
  const startRecording = async () => {
    try {
      setIsRecording(true);
      
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      
      // 开始计时
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (err) {
      console.error('Failed to start recording', err);
      setIsRecording(false);
    }
  };

  // 停止录音
  const stopRecording = async () => {
    setIsRecording(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
        
        const uri = recording.getURI();
        
        // 添加语音日志 - 使用固定文本占位
        onAddLog({
          id: Date.now().toString(),
          time: formatTime(new Date()),
          type: 'voice',
          duration: formatDuration(recordingTime),
          content: '语音记录已保存，点击可播放录音',
          audioUri: uri || '',
        });
      }
    } catch (err) {
      console.error('Failed to stop recording', err);
    } finally {
      setRecording(null);
      setRecordingTime(0);
    }
  };

  // 添加文字日志
  const addTextLog = () => {
    if (text.trim()) {
      onAddLog({
        id: Date.now().toString(),
        time: formatTime(new Date()),
        type: 'text',
        content: text,
      });
      setText('');
    }
    setIsExpanded(false);
    Keyboard.dismiss();
  };

  // 格式化时间
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // 格式化时长
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 按钮宽度动画
  const buttonWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 300],
  });

  // 按钮高度动画
  const buttonHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [56, 140],
  });

  // 文本按钮不透明度
  const textButtonOpacity = animation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // 语音按钮不透明度
  const voiceButtonOpacity = animation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // 文本输入框不透明度
  const inputOpacity = animation.interpolate({
    inputRange: [0.5, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // 录音界面不透明度
  const recordOpacity = animation.interpolate({
    inputRange: [0.5, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View 
      style={[
        styles.buttonContainer,
        { 
          width: buttonWidth,
          height: buttonHeight,
        }
      ]}
    >
      {!isRecording && (
        <>
          <Animated.View 
            style={[
              styles.halfButton, 
              styles.textButton, 
              { opacity: textButtonOpacity }
            ]}
          >
            <TouchableOpacity 
              style={styles.innerButton}
              onPress={() => {
                setIsExpanded(true);
                setIsRecording(false);
              }}
            >
              <Ionicons name="pencil" size={24} color="white" />
              <Text style={styles.buttonText}>文字记录</Text>
            </TouchableOpacity>
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.halfButton, 
              styles.voiceButton,
              { opacity: voiceButtonOpacity }
            ]}
          >
            <TouchableOpacity 
              style={styles.innerButton}
              onPress={() => {
                setIsExpanded(true);
                startRecording();
              }}
            >
              <Ionicons name="mic" size={24} color="white" />
              <Text style={styles.buttonText}>语音记录</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
      
      {isExpanded && !isRecording && (
        <Animated.View style={[styles.inputContainer, { opacity: inputOpacity }]}>
          <TextInput
            style={styles.input}
            placeholder="写下今天的想法..."
            multiline
            value={text}
            onChangeText={setText}
            autoFocus
          />
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => {
                setIsExpanded(false);
                setText('');
                Keyboard.dismiss();
              }}
            >
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={addTextLog}
            >
              <Ionicons name="checkmark" size={24} color="#6366F1" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
      
      {isRecording && (
        <Animated.View style={[styles.recordingContainer, { opacity: recordOpacity }]}>
          <Waveform isActive={true} />
          <Text style={styles.recordingTime}>{formatDuration(recordingTime)}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => {
                setIsExpanded(false);
                setIsRecording(false);
                if (recording) {
                  recording.stopAndUnloadAsync();
                }
                if (timerRef.current) {
                  clearInterval(timerRef.current);
                  timerRef.current = null;
                }
              }}
            >
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={stopRecording}
            >
              <Ionicons name="checkmark" size={24} color="#6366F1" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 28,
    flexDirection: 'row',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  halfButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    backgroundColor: '#818CF8',
  },
  voiceButton: {
    backgroundColor: '#6366F1',
  },
  innerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    marginTop: 4,
    fontSize: 12,
  },
  inputContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    padding: 0,
    textAlignVertical: 'top',
  },
  recordingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: 'space-between',
  },
  recordingTime: {
    position: 'absolute',
    right: 16,
    top: 16,
    color: '#6366F1',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  confirmButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewLogButton;