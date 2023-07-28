// React
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
// Calendar from react-native-calendar
import {Calendar} from 'react-native-calendars';
// Icons
import MIcon from 'react-native-vector-icons/MaterialIcons';
// Resources
import {COLORS} from '../Resources/Resources';
import {MainJSON} from '../Resources/MainJSON';

export default function CustomCalendar(props) {
  const selectedMonth = props.selectedMonth;
  // selected month name for custom calendar header
  const [currentMonthName, setCurrentMonthName] = useState();
  // initail date to show when month is selected
  const [initialDate, setInitialDate] = useState();

  // getting month name and initial date from selected month number
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

  // Adding custom arrow to switch month
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
  const currentDate = new Date().toISOString().slice(0, 10)
  console.log("curre-->", currentDate)

  //  marking date which are booked and avaliable in calendar
  const markedDates = {
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
  // Loop through the 'bookings' array
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
    markedDates[currentDate] = {
      selected: true,
      selectedColor: COLORS.primaryDark,
    }
  });

  return (
    <Calendar
      disableAllTouchEventsForDisabledDays={true}
      onMonthChange={month => {
        props.onChangeMonth(month.month);
        const date = new Date(0, month.month, 1);
        const monthName = date.toLocaleString('default', {month: 'long'});
        setCurrentMonthName(monthName);
      }}
      initialDate={initialDate}
      renderArrow={renderArrow}
      customHeaderTitle={
        <Text style={{color: COLORS.black, fontSize: 17}}>
          {currentMonthName}
        </Text>
      }
      markedDates={markedDates}
    />
  );
}
