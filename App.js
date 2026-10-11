import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';
import SettingsScreen from './SettingsScreen';

import Help from './Help';
import About from './About';

import AoScreen from './Tribes/AoScreen';
import AngamiScreen from './Tribes/AngamiScreen';
import KonyakScreen from './Tribes/KonyakScreen';
import PhomScreen from './Tribes/PhomScreen';
import SangtamScreen from './Tribes/SangtamScreen';
import ZeliangScreen from './Tribes/ZeliangScreen';

import { ThemeProvider, useTheme } from './ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TAB_COUNT = 3;

/* ---------------------------------------
   CUSTOM FLOATING IOS-STYLE TAB BAR
---------------------------------------- */

function FloatingTabBar({ state, descriptors, navigation }) {
  const { isDark, colors } = useTheme();

  const activeIndex = state.index;
  const tabWidth = 100 / TAB_COUNT;

  const position = useSharedValue(activeIndex);

  useEffect(() => {
    position.value = withSpring(activeIndex, {
      damping: 18,
      stiffness: 150,
      mass: 0.8,
    });
  }, [activeIndex, position]);

  const indicatorStyle = useAnimatedStyle(() => ({
    left: `${position.value * tabWidth}%`,
  }));

  const backgroundColor = isDark ? '#202A32' : '#E8F5FC';
  const indicatorColor = isDark ? '#344D5C' : '#B9E2FA';
  const activeColor = colors.tabIconActive || '#087FE8';
  const inactiveColor = isDark ? '#B6C2CC' : '#334155';

  return (
    <View
      style={[
        styles.tabBarOuter,
        {
          backgroundColor: isDark ? '#0C0C0C' : '#FFFFFF',
        },
      ]}
    >
      <View
        style={[
          styles.floatingBar,
          {
            backgroundColor,
            borderColor: isDark ? '#34434F' : '#D4EAF8',
          },
        ]}
      >
        <Animated.View
          style={[
            styles.activeIndicator,
            {
              width: `${tabWidth}%`,
              backgroundColor: indicatorColor,
            },
            indicatorStyle,
          ]}
        />

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          let iconName;

          if (route.name === 'Home') {
            iconName = isFocused ? 'home' : 'home-outline';
          } else if (route.name === 'Camera') {
            iconName = isFocused ? 'camera' : 'camera-outline';
          } else {
            iconName = isFocused ? 'settings' : 'settings-outline';
          }

          return (
            <View
              key={route.key}
              style={styles.tabItemContainer}
            >
            <View style={styles.tabItem}>
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={options.tabBarAccessibilityLabel || route.name}
    accessibilityState={{ selected: isFocused }}
    onPress={onPress}
    onLongPress={onLongPress}
    style={styles.touchArea}
  >
    <Ionicons
      name={iconName}
      size={24}
      color={isFocused ? activeColor : inactiveColor}
    />

    <Animated.Text
      style={[
        styles.tabLabel,
        {
          color: isFocused ? activeColor : inactiveColor,
          fontWeight: isFocused ? '600' : '400',
        },
      ]}
    >
      {route.name}
    </Animated.Text>
  </Pressable>
</View> 
            </View>
          );
        })}
      </View>
    </View>
  );
}

/* ---------------------------------------
   BOTTOM TABS
---------------------------------------- */

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: 'transparent',
        },
        animation: 'shift',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

/* ---------------------------------------
   MAIN STACK NAVIGATION
---------------------------------------- */

function MainNavigator() {
  const { isDark } = useTheme();

  const backgroundColor = isDark ? '#0C0C0C' : '#FFFFFF';

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor,
          },
          headerTintColor: isDark ? '#FFFFFF' : '#000000',
          contentStyle: {
            backgroundColor,
          },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Help"
          component={Help}
          options={{ title: 'Help' }}
        />

        <Stack.Screen
          name="About"
          component={About}
          options={{ title: 'About' }}
        />

        <Stack.Screen
          name="Ao"
          component={AoScreen}
          options={{ title: 'Ao Shawls' }}
        />

        <Stack.Screen
          name="Angami"
          component={AngamiScreen}
          options={{ title: 'Angami Shawls' }}
        />

        <Stack.Screen
          name="Konyak"
          component={KonyakScreen}
          options={{ title: 'Konyak Shawls' }}
        />

        <Stack.Screen
          name="Phom"
          component={PhomScreen}
          options={{ title: 'Phom Shawls' }}
        />

        <Stack.Screen
          name="Sangtam"
          component={SangtamScreen}
          options={{ title: 'Sangtam Shawls' }}
        />

        <Stack.Screen
          name="Zeliang"
          component={ZeliangScreen}
          options={{ title: 'Zeliang Shawls' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ---------------------------------------
   STYLES
---------------------------------------- */

const styles = StyleSheet.create({
  tabBarOuter: {
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
    paddingHorizontal: 24,
  },

  floatingBar: {
    height: 68,
    borderRadius: 36,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 5,
  },

  activeIndicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    borderRadius: 32,
  },

  tabItemContainer: {
    width: `${100 / TAB_COUNT}%`,
    height: '100%',
  },

  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabTouchable: {
    width: '100%',
    height: '100%',
  },

  touchArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },

  tabLabel: {
    fontSize: 12,
    letterSpacing: 0.1,
  },
});

/* ---------------------------------------
   APP ENTRY
---------------------------------------- */

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <MainNavigator />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}