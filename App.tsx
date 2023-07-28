// import from react 
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
// navigators 
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './src/Router/BottomTab';
// Resources
import {COLORS} from './src/Resources/Resources';

export default function App() {
  return (
    <NavigationContainer>
      {/* ---------- Add styling to header ----------- */}
      <StatusBar
        backgroundColor={COLORS.white}
        translucent
        barStyle={'dark-content'}
      />

      {/* ---------- main navigator----------- */}
      <BottomTab />
    </NavigationContainer>
  );
}


