import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../Resources/Resources';

export default function DiscoverCards() {
  return (
    <View style={styles.mainContainer}>
      <Image style={styles.image} source={require('../assests/image1.jpg')} />
      <View>
      <Text style={styles.titleText}>Bohemian repsody</Text>
      <View style={{flexDirection:"row"}}>
        <Text style={{}}>12-04-13</Text>
        <Text>12-04-13</Text>
      </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 230,
    // resizeMode: 'contain',
    flex: 1,
    borderRadius: 20,
    alignSelf:"center"
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    width: '70%',
    padding: 10,
    // alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    overflow:"hidden"
  },
  titleText:{
    fontWeight:"700",
    fontSize:19,
    color:COLORS.black,
    

  }
});
