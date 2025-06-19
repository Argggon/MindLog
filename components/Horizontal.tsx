import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View
} from 'react-native';

const { width } = Dimensions.get('window');
const CONTAINER_WIDTH = width * 0.9;
const ITEM_WIDTH = CONTAINER_WIDTH * 0.7; // 左右各20边距
const ITEM_SPACING = 10;
const SNAP_INTERVAL = ITEM_WIDTH + ITEM_SPACING; // 吸附间隔

interface ListItemProps {
  time: string;
  content: string;
}

// 列表项组件
const ListItem = ({ time, content }: ListItemProps) => (
  <View style={styles.listItem}>
    <Text style={styles.timeText}>{time}</Text>
    <Text 
      style={styles.contentText} 
      numberOfLines={5} 
      ellipsizeMode="tail"
    >
      {content}
    </Text>
  </View>
);

// 翻页指示器组件
const Pagination = ({ count, activeIndex }: { count: number; activeIndex: number }) => (
  <View style={styles.pagination}>
    {Array.from({ length: count }).map((_, index) => (
      <View 
        key={index} 
        style={[
          styles.dot,
          index === activeIndex && styles.activeDot
        ]} 
      />
    ))}
  </View>
);

// 主容器组件
const FixedContainerWithScroll = () => {
  const items = [
    { time: "09:30", content: "会议讨论项目进度" },
    { time: "10:15", content: "与设计团队评审新界面方案" },
    { time: "11:00", content: "技术分享会：React Native性能优化技术分享会：React Native性能优化技术分享会：React Native性能优化技术分享会：React Native性能优化技术分享会：React Native性能优化技术分享会：React Native性能优化" },
    { time: "14:30", content: "产品需求评审" },
    { time: "16:00", content: "与客户进行项目演示" },
    { time: "15:45", content: "总结今天的工作，规划明天的任务" }
  ].sort((a, b) => a.time.localeCompare(b.time));

  
  const [currentIndex, setCurrentIndex] = useState(items.length - 1); //初始页面为最后一页
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / SNAP_INTERVAL);
    setCurrentIndex(index);
  };

  return (
    <View style={[styles.container, { width: CONTAINER_WIDTH }]}>      
      <FlatList
        ref={flatListRef}
        data={items}
        horizontal
        pagingEnabled={false}
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: (CONTAINER_WIDTH - ITEM_WIDTH) / 2 // 左右留白
        }}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        initialScrollIndex={items.length - 1} // 初始滚动到最后一页
        onScrollToIndexFailed={({ index }) => {
          // 处理滚动失败的情况
          flatListRef.current?.scrollToIndex({ index, animated: true });
        }}
        keyExtractor={(item, index) => `${item.time}-${index}`}
        renderItem={({ item }) => (
          <View style={[styles.page, { width: ITEM_WIDTH, marginHorizontal: ITEM_SPACING/2 }]}>
            <ListItem content={item.content} time={item.time}/>
          </View>
        )}
        getItemLayout={(_, index) => ({
          length: SNAP_INTERVAL,
          offset: SNAP_INTERVAL * index,
          index
        })}
      />
      
      <Pagination count={items.length} activeIndex={currentIndex} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    borderRadius: 18,
    backgroundColor: '#f7fafc',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    paddingTop: 20,
    alignSelf: 'center'
  },
  dateText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500'
  },
  page: {
    justifyContent: 'center',
    shadowColor: '#000', // 添加阴影增强层次感
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listItem: {
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    minHeight: 150,
    maxHeight: 180,
    width: '100%', // 确保填满容器
  },
  timeText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start'
  },
  contentText: {
    fontSize: 16,
    lineHeight: 22
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    marginBottom: 10
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cbd5e0',
    marginHorizontal: 4
  },
  activeDot: {
    backgroundColor: '#4a5568',
    width: 12
  }
});

export default FixedContainerWithScroll;