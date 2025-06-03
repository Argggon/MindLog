import LogCard from '@/components/LogCard';
import NewLogButton from '@/components/NewLogButton';
import { mockLogs } from '@/data/mockLogs';
import { Log } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    ListRenderItem,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const LogScreen = () => {
  const [logs, setLogs] = useState<Log[]>(mockLogs);
  const [buttonVisible, setButtonVisible] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  // 添加新日志
  const addLog = (newLog: Log) => {
    setLogs(prevLogs => [...prevLogs, newLog]);
    
    // 滚动到底部
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  // 处理滚动事件
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const scrollDirection = currentOffset > 0 && currentOffset > (prevOffset || 0);
        setButtonVisible(!scrollDirection);
        prevOffset = currentOffset;
      }
    }
  );
  
  let prevOffset = 0;

  // 获取当前日期
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[today.getDay()];
    
    return `${year}年${month}月${day}日 ${weekday}`;
  };

  // 按钮动画
  const buttonTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const renderItem: ListRenderItem<Log> = ({ item }) => <LogCard log={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{getCurrentDate()}</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#6366F1" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={logs}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      
      <Animated.View 
        style={[
          styles.buttonWrapper,
          { transform: [{ translateY: buttonTranslateY }] }
        ]}
      >
        <NewLogButton onAddLog={addLog} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  filterButton: {
    padding: 8,
  },
  listContent: {
    paddingBottom: 100,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default LogScreen;