import { BlurView } from 'expo-blur';
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
  const backgroundImage = require('@/assets/images/flowers.jpeg');

  return (
    <View style={[
      styles.container, 
      // { paddingTop: insets.top }
    ]}>
      {/* <StatusBar barStyle="light-content" backgroundColor='black'/> */}
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        // resizeMode="cover"
      >
        {/* 标题栏添加模糊效果 */}
        <BlurView 
          intensity={50} 
          tint="systemUltraThinMaterial"
          // tint="regular"
          style={styles.header}
          experimentalBlurMethod="dimezisBlurView"
        >
          <Text style={styles.title}>{title}</Text>
          {headerRight && <View style={styles.headerRight}>{headerRight}</View>}
        </BlurView>
        
        {/* 页面内容 */}
        <View style={styles.content}>
          {children}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'transparent',
  },
  header: {
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical:10,
    backgroundColor: 'transparent',
    // marginTop: 40, // 为状态栏留出空间
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: 'white',
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
  background: {
    flex: 1,
  },
});

export default PageLayout;