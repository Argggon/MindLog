import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const backgroundImage = require('@/assets/images/blueOcean.jpeg');
  return (
    // <SafeAreaProvider>
    //   <StatusBar style='dark' translucent={true}/>
    //   <Stack screenOptions={{
    //     contentStyle: { backgroundColor: 'black' },
    //     headerShown: false,
    //   }}>
    //     <Stack.Screen name="(tabs)" options={{ headerShown: false, contentStyle: {backgroundColor: 'black'} }} />
    //   </Stack>
    // </SafeAreaProvider>

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

    // // <SafeAreaProvider>
    //   {/* <view style={styles.container}> */}
    //     <ImageBackground
    //       source={backgroundImage}
    //       style={styles.background}
    //       resizeMode="cover"
    //     >
    //       <View style={{ flex: 1,}}>
    //         <Text>测试文字</Text>
    //       </View>

    //       <StatusBar barStyle="light-content" />
    //       {/* <TabLayout /> */}
    //       <Stack screenOptions={{
    //             contentStyle: { backgroundColor: 'black' }
    //           }}>
    //         <Stack.Screen name="(tabs)" options={{ headerShown: false, contentStyle: {backgroundColor: 'black'} }} />
    //       </Stack>

    //       <View style={{ flex: 1,}}>
    //         <Text>测试文字</Text>
    //       </View>

    //     </ImageBackground>
    //   {/* </view> */}
    // // </SafeAreaProvider>
  );
}

// export default function App() {
//   return (
//     <View style={{ flex: 1 }}>
//       <ImageBackground
//         source={require('@/assets/images/blueOcean.jpeg')}
//         style={{ flex: 1, justifyContent: 'center' }}
//       >
//         <Text style={{ color: 'white', textAlign: 'center' }}>背景测试</Text>
//       </ImageBackground>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent', // 设置为透明
  },
});