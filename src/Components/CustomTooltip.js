import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomTooltip = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handlePressIn = () => {
    setShowTooltip(true);
  };

  const handlePressOut = () => {
    setShowTooltip(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text>Press and hold to see the tooltip</Text>
      </TouchableOpacity>
      {showTooltip && (
        <View style={styles.tooltipContainer}>
          <View style={styles.pointer} />
          <Text style={styles.tooltipText}>Hello</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 8,
    borderRadius: 5,
    zIndex: 1,
    bottom: 40,
  },
  pointer: {
    position: 'absolute',
    left: '50%',
    bottom: -10,
    marginLeft: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: 'rgba(0, 0, 0, 0.8)',
  },
  tooltipText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomTooltip;
