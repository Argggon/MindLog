import { useTabBarHeight } from '@/utils/safeArea';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  const tabBarHeight = useTabBarHeight();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'rgb(255, 161, 30)',
        tabBarInactiveTintColor: 'white',
        // TODO: 根据背景图片设置 activetint和 inactivetint
        tabBarStyle: {
          backgroundColor: 'rgba(107, 107, 107, 0.3)',
          // TODO: 根据背景图片设置 backgroundColor
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          shadowColor: 'transparent',
          borderTopWidth: 0,
          height: tabBarHeight,
          paddingBottom: 15,
          paddingTop: 5,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={50}
            tint="systemUltraThinMaterial"
            // tint="regular"
            style={StyleSheet.absoluteFill}
            experimentalBlurMethod='dimezisBlurView'
          />
        ),
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
        // tabBarPressColor: 'transparent',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Log',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "journal" : "journal-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "time" : "time-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dictionary"
        options={{
          title: 'Dictionary',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "book" : "book-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused? "settings" : "settings-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}