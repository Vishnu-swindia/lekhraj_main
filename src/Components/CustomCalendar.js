import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../Resources/Resources';

export default function CustomCalendar(props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const renderCustomArrow = direction => {
    // Use the direction parameter to render different arrows for left and right
    return direction === 'left' ? (
      <Text onPress={handlePrevMonth}>left</Text>
    ) : (
      <Text>right</Text>
    );
  };
  console.log('currentmonth --', currentMonth);
  return (
    <Calendar
      disableAllTouchEventsForDisabledDays={true}
      // hideExtraDays
      customHeader={() => {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <MIcon name="arrow-back-ios" size={30} color={COLORS.primaryDark} />
            <Text style={styles.headerMonthTitle}>Month</Text>
            <MIcon name="arrow-forward-ios" size={30} color={COLORS.primaryDark} />
          </View>
        );
      }}
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

