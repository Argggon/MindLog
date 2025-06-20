import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const backgroundImage = require('@/assets/images/blueOcean.jpeg');
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style='dark' />
        <Stack screenOptions={{
          contentStyle: { backgroundColor: 'black' },
          headerShown: false,
        }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, contentStyle: {backgroundColor: 'black'} }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // 设置为透明
  },
});