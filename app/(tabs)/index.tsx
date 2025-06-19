import FixedContainerWithScroll from '@/components/Horizontal';
import LogCard from '@/components/LogCard';
import PageLayout from '@/components/PageLayout';
import { mockLogs } from '@/data/mockLogs';
import { Log } from '@/types/types';
import { useBottomMargin } from '@/utils/safeArea';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LogScreen = () => {
  const [logs, setLogs] = useState<Log[]>(mockLogs);
  const [buttonVisible, setButtonVisible] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const bottomMargin = useBottomMargin();
  const insets = useSafeAreaInsets();

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
    const month = today.getMonth() + 1; // 月份从0开始，需要加1
    const day = today.getDate();
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekday = weekdays[today.getDay()];

    // 定义月份名称
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[month - 1];

    // 定义序数词
    const getOrdinal = (n: number) => {
        if (n > 3 && n < 21) return 'th';
        switch (n % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };
    const dayWithOrdinal = `${day}${getOrdinal(day)}`;

    return `${dayWithOrdinal} ${monthName}, ${year}, ${weekday}.`;
};

  // 按钮动画
  const buttonTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const renderItem: ListRenderItem<Log> = ({ item }) => <LogCard log={item} />;

  const screenHeight = Dimensions.get('window').height;
  const data = Array.from({ length: 2 }, (_, index) => ({
    id: `item-${index}`,
    text: `Item ${index + 1}`
  }));

  return (
    <PageLayout 
      title="Today's Logs" 
      // headerRight={
      //   <TouchableOpacity>
      //     <Ionicons name="filter" size={20} color="#000000" />
      //   </TouchableOpacity>
      // }
    >
      {/* <View style={styles.container}>

        <View style={styles.capsule}>
          <Text style={styles.dateText}>{getCurrentDate()}</Text>
        </View>

        <FlatList
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          data={data}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <View />
          }
          renderItem={({ item }) => (
            <Text style={styles.itemText}>{item.text}</Text>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View> */}

      <View style={styles.capsule}>
        <Text style={styles.dateText}>{getCurrentDate()}</Text>
      </View>
      
      <FixedContainerWithScroll/>

      {/* 主内容卡片 - 带模糊效果 */}
      {/* <View style={styles.cardContainer}> */}

        
        
        {/* 日志列表 */}
        {/* {logs.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={logs}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <LogCard log={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="journal-outline" size={48} color="#94a3b8" />
            <Text style={styles.emptyText}>No log yet</Text>
          </View>
        )}
      </View> */}

      {/* 新建日志按钮 */}
      {/* <Animated.View 
        style={[
          styles.buttonWrapper,
          { transform: [{ translateY: buttonTranslateY }],
            bottom: insets.bottom + 24}
        ]}
      >
        <NewLogButton onAddLog={addLog} />
      </Animated.View>*/}
    </PageLayout> 
  );

  // return (
  //   <ScrollView
  //     style={styles.scrollView}
  //     contentContainerStyle={styles.container}
  //   >
  //     {/* 圆角矩形内容 */}
  //     <View style={styles.roundedRectangle}>
  //       {Array.from({ length: 20 }, (_, index) => (
  //         <Text key={index} style={styles.container}>
  //           Item {index + 1}
  //         </Text>
  //       ))}
  //     </View>
  //   </ScrollView>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // paddingHorizontal: 16,
    // paddingTop: 16,
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
  cardContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60, // 为日期胶囊留出空间
  },
  emptyText: {
    fontSize: 18,
    color: '#94a3b8',
    marginTop: 16,
  },
  scrollView: {
    flex: 1,
    // backgroundColor: '#d1d1d1',
    backgroundColor: 'transparent',
    marginTop: 12,
    // marginBottom: 20,
    // paddingBottom: 120,
    // paddingVertical: 20,
    // paddingHorizontal: 16,
    // borderRadius: 20,
  },
  scrollContainer: {
    // flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'black',
    // paddingTop: 20,
    borderRadius: 14,
    // marginBottom: 20,
    overflow: 'hidden',
    minHeight: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
  },
  roundedRectangle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
  },
  itemText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
    marginTop: 8,
  },
  logContainer: {
    marginTop: 100,
    marginBottom: 100,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  capsule: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    // marginRight: 120,
    width: 150,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: 12,
  },
  dateText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    alignSelf: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
});

export default LogScreen;