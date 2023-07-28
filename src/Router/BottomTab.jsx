import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import ADIcon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../Resources/Resources';
import Dashboard from '../Screens/Dashboard';
import TempScreen from '../Screens/TempScreen';

const Tab = createBottomTabNavigator();
export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerTitle: 'Dashboard',
          headerTitleStyle: {color: COLORS.black, fontWeight: '700'},
          headerShown: true,
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          headerStyle: {backgroundColor: null},
          headerShadowVisible: false,
          tabBarIcon: ({color, size}) => (
            <MIcon
              name="dashboard"
              color={color}
              size={30}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={TempScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <MIcon
              name="bar-chart"
              color={color}
              size={30}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={TempScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="calendar-clear"
              color={color}
              size={25}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={TempScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <MIcon
              name="person"
              color={color}
              size={30}
              style={styles.tabIcon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
