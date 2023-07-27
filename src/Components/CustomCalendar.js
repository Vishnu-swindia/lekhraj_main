import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../Resources/Resources';

export default function CustomCalendar(props) {
  const [currentMonth, setCurrentMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
// const [currentDate, setCurrentDate] = useState(new Date().toLocaleString)

const renderArrow = (direction)  =>{
  if(direction === 'left') {
    return <MIcon name='arrow-back-ios' color={COLORS.primaryDark} size={25} style={{left:70}} />
} else {
  return <MIcon name='arrow-forward-ios' color={COLORS.primaryDark} size={25} style={{right:70}} />
}
}
const marked = {
  '2023-07-12': { marked: true },
  // '2023-07-22': { selected: true }
};

const markedDates={
  // '2023-07-16': {selected: true, marked: true, selectedColor: 'blue'},
  [new Date().toISOString().slice(0, 10)]: { selected: true, selectedColor: 'blue' },
  '2023-07-17': {marked: true},
  '2023-07-18': {marked: true, dotColor: 'red', activeOpacity: 0},
}

  return (
    <Calendar
      disableAllTouchEventsForDisabledDays={true}
      onMonthChange={month => {
        console.log('month changed', month);
        const date = new Date(0, month.month, 1);
        const monthName = date.toLocaleString('default', { month: 'long' });
      setCurrentMonth(monthName)
      }}
      renderArrow={renderArrow}
      customHeaderTitle={<Text>{currentMonth}</Text>}
      markedDates={markedDates}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  headerMonthTitle:{
    marginHorizontal:20,
    color:COLORS.black,
    fontSize:20,
    fontWeight:"500"
  }
});

