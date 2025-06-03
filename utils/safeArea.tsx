import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useTabBarHeight = () => {
  const insets = useSafeAreaInsets();
  
  return Platform.select({
    ios: 60 + (insets.bottom > 0 ? insets.bottom : 20),
    android: 60 + insets.bottom, // Android 增加额外高度
  });
};

export const useBottomMargin = () => {
  const insets = useSafeAreaInsets();
  
  return Platform.select({
    ios: 24,
    android: 24 + insets.bottom,
  });
};