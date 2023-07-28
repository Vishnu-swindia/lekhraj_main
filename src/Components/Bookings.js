// React
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// calendar component 
import CustomCalendar from './CustomCalendar';
// Icons
import MIcon from 'react-native-vector-icons/MaterialIcons';
import EnIcon from 'react-native-vector-icons/Entypo';
// Resources
import {COLORS} from '../Resources/Resources';

export default function Bookings(props) {
  const selectedMonth = props.selectedMonth;
  return (
    <View style={styles.mainContainer}>
      {/* -------- header --------- */}
      <View style={styles.header}>
        <Text style={styles.title}>Bookings</Text>
        <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.detailsBtn}>Details</Text>
            <MIcon name="arrow-forward" size={20} style={{paddingTop:2}} color={COLORS.primaryDark} />
          </View>
        </TouchableOpacity>
      </View>
      {/* ---------calendar section-------- */}
      <CustomCalendar
      selectedMonth={selectedMonth}
      onChangeMonth = {(month)=>props.onChangeMonth(month)}
        onDayPress={day => console.log(`Date pressed: ${day.dateString}`)}
      />
      {/* ---------- legends ---------- */}
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
  mainContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
    width: '97%',
    alignSelf: 'center',
  },
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
    fontSize: 16,

    color: COLORS.primaryDark,
    marginHorizontal: 10,
  },
  legends: {
    color: COLORS.black,
    fontSize: 17,
    fontWeight: '500',
    marginVertical: 20,
  },
});
