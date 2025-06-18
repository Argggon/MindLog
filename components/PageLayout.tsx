import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  headerRight?: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children, headerRight }) => {
  const insets = useSafeAreaInsets();
  const backgroundImage = require('@/assets/images/蓝色海洋.jpeg');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* 标题栏 */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight && <View style={styles.headerRight}>{headerRight}</View>}
      </View>
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        resizeMode="cover"
      >
        {/* 页面内容 */}
        <View style={styles.content}>
            {children}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
  },
  headerRight: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default PageLayout;