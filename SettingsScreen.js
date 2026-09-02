import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

export default function SettingsScreen() {

  const { isDark, toggleTheme, colors } = useTheme();

  const Row = ({
    icon,
    title,
    rightText,
    isSwitch,
    switchValue,
    onSwitchChange,
  }) => (

    <TouchableOpacity style={styles.row}>

      {/* LEFT SIDE */}
      <View style={styles.left}>
        {icon}
        <Text
          style={[
            styles.title,
            { color: colors.text }
          ]}
        >
          {title}
        </Text>
      </View>
      {/* RIGHT SIDE */}
      <View style={styles.right}>

        {rightText && (
          <Text
            style={[
              styles.rightText,
              { color: colors.secondaryText }
            ]}
          >
            {rightText}
          </Text>
        )}
        {isSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{
              false: '#999',
              true: '#06618b'
            }}
          />
        ) : (

          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.secondaryText}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ height: 120 }} />

      {/* CARD */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
          },
        ]}
      >

        {/* SEARCH */}
        <View style={styles.searchBox}>

          <Ionicons
            name="search"
            size={20}
            color={colors.secondaryText}
          />

          <TextInput
            placeholder="Search"
            style={[
              styles.searchInput,
              { color: colors.text }
            ]}
            placeholderTextColor={colors.placeholder}
          />
        </View>
        {/* DARK MODE */}
        <Row
          title="Dark Mode"
          isSwitch
          switchValue={isDark}
          onSwitchChange={toggleTheme}
          icon={
            <Ionicons
              name="moon-outline"
              size={20}
              color={isDark ? '#fff' : '#020202'}
            />
          }
        />
        {/* HELP */}
        <Row
          title="Help"
          icon={
            <Ionicons
              name="help-circle-outline"
              size={22}
              color={isDark ? '#fff' : '#060606'}
            />
          }
        />
        {/* ABOUT */}
        <Row
          title="About"
          icon={
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={isDark ? '#fff' : '#080808'}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  /* BLUE BACKGROUND — NEVER CHANGES */
  container: {
    flex: 1,
    backgroundColor: '#004361',
  },

  /* CARD */
  card: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingHorizontal: 10,
    top: 50,
  },

  /* SEARCH */
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b4b3b355',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 50,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },

  /* ROW */
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cfcccc',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 16,
  },
  rightText: {
    fontSize: 14,
  },
});