import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Calendar} from 'react-native-calendars';
import CustomCalendar from './CustomCalendar';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import EnIcon from 'react-native-vector-icons/Entypo';
import {COLORS} from '../Resources/Resources';

export default function Bookings() {
  return (
    <View style={{}}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookings</Text>
        <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.detailsBtn}>Details</Text>
            <MIcon name="arrow-forward" size={25} color={COLORS.primaryDark} />
          </View>
        </TouchableOpacity>
      </View>
      <CustomCalendar
        onDayPress={day => console.log(`Date pressed: ${day.dateString}`)}
      />
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <EnIcon name="dot-single" color="red" size={30} />
          <Text style={styles.legends}>Nights Booked</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <EnIcon name="dot-single" color="green" size={30} />
          <Text style={styles.legends}>Nights Avaliable</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  detailsBtn: {
    fontSize: 18,

    color: COLORS.primaryDark,
    marginHorizontal: 10,
  },
  legends: {
    color: COLORS.black,
    fontSize: 17,
    fontWeight: '500',
  },
});
