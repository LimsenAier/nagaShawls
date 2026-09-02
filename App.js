import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, Dimensions, Animated } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './ThemeContext';
import { useTheme } from './ThemeContext';

import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';
import SettingsScreen from './SettingsScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import AoScreen from './Tribes/AoScreen';
import AngamiScreen from './Tribes/AngamiScreen';
import SangtamScreen from './Tribes/SangtamScreen';
import KonyakScreen from './Tribes/KonyakScreen';
import ZeliangScreen from './Tribes/ZeliangScreen';
import PhomScreen from './Tribes/PhomScreen';

const Tab = createBottomTabNavigator();
const SCREEN_WIDTH = Dimensions.get('window').width;
const TAB_BAR_WIDTH = SCREEN_WIDTH * 0.95;
const { width } = Dimensions.get('window');
const TAB_WIDTH = TAB_BAR_WIDTH / 3;
const Stack = createNativeStackNavigator();

function MyTabBar({ state, navigation }) {
  const { colors } = useTheme();
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <View style={{ 
      flexDirection: 'row',
     height: 60,
      backgroundColor: colors.tabBar,
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
      width: '95%',
      borderRadius: 30,
      elevation: 5,
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          width: TAB_WIDTH,
          height: 60,
          backgroundColor: colors.tabActive,
          borderRadius: 30,
          transform: [{ translateX }],
        }}
      />

      <View style={{ flexDirection: 'row', flex: 1 }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        let iconName;
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Camera') iconName = 'camera';
        else iconName = 'cog';

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <FontAwesome
              name={iconName}
              size={24}
              color={isFocused ? colors.tabIconActive : colors.tabIcon}
            />
          </TouchableOpacity>
        );
      })}
    </View>
    </View>
  );
}

 function TabNavigator() {
  return (
  
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    
  );
}


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* Tabs go here */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />

        {/* Tribe screens go here */}
        <Stack.Screen name="Ao" component={AoScreen} />
        <Stack.Screen name="Angami" component={AngamiScreen} />
        <Stack.Screen name="Sangtam" component={SangtamScreen} />
        <Stack.Screen name="Konyak" component={KonyakScreen} />
        <Stack.Screen name="Zeliang" component={ZeliangScreen} />
        <Stack.Screen name="Phom" component={PhomScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}