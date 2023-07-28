import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../Resources/Resources';

export default function CustomCalendar(props) {
  const selectedMonth = props.selectedMonth;
  const [currentMonthName, setCurrentMonthName] = useState();
  const [currentMonth, setCurrentMonth] = useState();
  const [initialDate, setInitialDate] = useState();


 
  // let initialDate = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    if (selectedMonth !== undefined) {
      const date = new Date(2023, selectedMonth - 1, 2);
      const monthName = date.toLocaleString('default', {month: 'long'});
      setCurrentMonthName(monthName);
      setInitialDate(date.toISOString().slice(0, 10));
      setCurrentMonth(selectedMonth)
    } else {
      setCurrentMonthName(new Date().toLocaleString('default', {month: 'long'}));
      setInitialDate(new Date().toISOString().slice(0, 10));
    }
  }, [selectedMonth]);

  const renderArrow = direction => {
    if (direction === 'left') {
      return (
        <MIcon
          name="arrow-back-ios"
          color={COLORS.primaryDark}
          size={25}
          style={{left: 70}}
        />
      );
    } else {
      return (
        <MIcon
          name="arrow-forward-ios"
          color={COLORS.primaryDark}
          size={25}
          style={{right: 70}}
        />
      );
    }
  };

  console.log("check -->", new Date())

  const markedDates = {
    [new Date().toISOString().slice(0, 10)]: {
      selected: true,
      selectedColor: 'blue',
    },
    '2023-07-17': {marked: true},
    '2023-07-18': {marked: true, dotColor: 'red', activeOpacity: 0},
  };

  return (
    <Calendar
      disableAllTouchEventsForDisabledDays={true}
      onMonthChange={month => {
      
        const date = new Date(0, month.month, 1);
        const monthName = date.toLocaleString('default', {month: 'long'});
        setCurrentMonthName(monthName);
      setCurrentMonth(month.month)
      props.onChangeMonth(month.month)

      }}
      initialDate={initialDate}
      renderArrow={renderArrow}
      customHeaderTitle={<Text>{currentMonthName}</Text>}
      markedDates={markedDates}
      minDate={'2023-01-01'}
      maxDate={'2023-12-31'}
    />
  );
}

const styles = StyleSheet.create({
  headerMonthTitle: {
    marginHorizontal: 20,
    color: COLORS.black,
    fontSize: 20,
    fontWeight: '500',
  },
});
