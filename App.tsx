import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTab from './src/Router/BottomTab'
import { COLORS } from './src/Resources/Resources'

export default function App() {
  return (
  <NavigationContainer>
    <StatusBar backgroundColor={COLORS.white} translucent barStyle={'dark-content'} />
    <BottomTab />
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({})