import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../Resources/Resources';
import {MainJSON} from '../Resources/MainJSON';

export default function CustomCalendar(props) {
  
  const selectedMonth = props.selectedMonth;
  const [currentMonthName, setCurrentMonthName] = useState();
  const [initialDate, setInitialDate] = useState();

  useEffect(() => {
    if (selectedMonth !== undefined) {
      const date = new Date(2023, selectedMonth - 1, 2);
      const monthName = date.toLocaleString('default', {month: 'long'});
      setCurrentMonthName(monthName);
      setInitialDate(date.toISOString().slice(0, 10));
      // setCurrentMonth(selectedMonth)
    } else {
      setCurrentMonthName(
        new Date().toLocaleString('default', {month: 'long'}),
      );
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

  const markedDates = {
    [new Date().toISOString().slice(0, 10)]: {
      selected: true,
      selectedColor: 'blue',
    },
    '2023-07-17': {marked: true},
    '2023-07-18': {marked: true},
    '2023-07-19': {marked: true},
  };
  // Function to get all dates between 'fromDate' and 'toDate' (inclusive)
  function getDatesBetween(fromDate, toDate) {
    const dates = [];
    const current = new Date(fromDate);
    const last = new Date(toDate);

    while (current <= last) {
      dates.push(new Date(current).toISOString().slice(0, 10));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }
  // Loop through the 'data' array
  MainJSON.Bookings.bookings[selectedMonth].forEach(booking => {
    const {fromDate, toDate, bookingDetails} = booking;

    // Create a new object with properties to be added to 'markedDates'
    const bookingObject = {
      marked: true,
      dotColor: 'red',
      activeOpacity: 0,
      bookingDetails: bookingDetails,
    };

    // Get all dates between 'fromDate' and 'toDate'
    const datesInRange = getDatesBetween(fromDate, toDate);

    // Add the newly created object to the 'markedDates' object for each date in the range
    datesInRange.forEach(date => {
      markedDates[date] = bookingObject;
    });
  });

  return (
    <Calendar
      disableAllTouchEventsForDisabledDays={true}
      onMonthChange={month => {
        const date = new Date(0, month.month, 1);
        const monthName = date.toLocaleString('default', {month: 'long'});
        setCurrentMonthName(monthName);
        // setCurrentMonth(month.month)
        props.onChangeMonth(month.month);
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
