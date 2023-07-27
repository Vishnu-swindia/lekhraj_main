import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../Resources/Resources';
import {MainJSON} from '../Resources/MainJSON';
import Bookings from '../Components/Bookings';

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <FlatList
          data={MainJSON.topHeaderButton}
          horizontal
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.ID}
          style={styles.headerButtonList}
          renderItem={({item, index}) => {
            return (
              <View style={styles.headerButtonLabelView}>
                <Text style={styles.headerButtonLabel}>{item.label}</Text>
              </View>
            );
          }}
        />
      </View>
      <Bookings />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  headerButtonList: {
    marginVertical: 15,
  },
  headerButtonLabelView: {
    flex: 0,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  headerButtonLabel: {
    color: COLORS.black,
    fontWeight: '600',
    fontSize: 18,
  },
});
