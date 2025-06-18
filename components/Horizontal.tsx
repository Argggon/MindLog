import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

// 获取屏幕宽度用于响应式设计
const { width } = Dimensions.get('window');

// 胶囊形日期组件
const DateCapsule = () => {
  const today = new Date();
  const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;
  
  return (
    <View style={styles.dateCapsule}>
      <Text style={styles.dateText}>{formattedDate}</Text>
    </View>
  );
};

// 列表项组件
const ListItem = ({ content }: { content: string }) => (
  <View style={styles.listItem}>
    <Text style={styles.itemText}>{content}</Text>
  </View>
);

// 主容器组件
const FixedContainerWithScroll = () => {
  const items = [
    "短文本",
    "中等长度的文本内容，占据两行空间",
    "较长的文本内容会占据更多垂直空间，这会导致组件高度增加",
    "短文本",
    "非常长的文本内容将自动换行并占据更多垂直空间，因为每个列表项的高度会根据内容自适应变化",
    "中等长度"
  ];

  return (
    <View style={styles.container}>
      <DateCapsule />
      
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((content, index) => (
          <ListItem key={index} content={content} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: width * 0.9,      // 屏幕宽度的90%
    height: 250,
    borderRadius: 20,
    backgroundColor: '#f7fafc',
    elevation: 4,            // Android阴影
    shadowColor: '#000',     // iOS阴影
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    paddingTop: 40,          // 为日期胶囊留出空间
    alignSelf: 'center'      // 居中显示
  },
  dateCapsule: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#4a5568',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    zIndex: 10
  },
  dateText: {
    color: 'white',
    fontSize: 14
  },
  scrollContent: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  listItem: {
    width: 150,
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 10,
    alignSelf: 'flex-start' // 允许不同高度
  },
  itemText: {
    flexWrap: 'wrap'
  }
});

export default FixedContainerWithScroll;