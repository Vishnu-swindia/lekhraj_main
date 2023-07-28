// React
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// bottom tab navigator
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
// Resources
import {COLORS} from '../Resources/Resources';
// Screens
import Dashboard from '../Screens/Dashboard';
import TempScreen from '../Screens/TempScreen';

const Tab = createBottomTabNavigator();
export default function BottomTab() {
  return (
    <Tab.Navigator

      screenOptions={({route}) => ({
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'gray',
       
        tabBarStyle: {
          paddingVertical: 7,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor:COLORS.white,
        },
      })}>
      {/* --------- Dashboard screen ---------- */}
      <Tab.Screen
        name="Dashboard"
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
      {/* --------- Temp screen --------------- */}
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
      {/* --------- Temp screen --------------- */}

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
      {/* --------- Temp screen --------------- */}
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
