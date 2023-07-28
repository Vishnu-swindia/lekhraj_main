import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../Resources/Resources';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {MainJSON} from '../Resources/MainJSON';
import {Tooltip, lightColors} from '@rneui/themed';
import CircularProgress from 'react-native-circular-progress-indicator';
import {Popable} from 'react-native-popable';
import CustomTooltip from './CustomTooltip';

const ControlledTooltip = props => {
  const [open, setOpen] = React.useState(false);
  return (
    <Tooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      {...props}
    />
  );
};

export default function RevenueChart(props) {
  const selectedMonth = props.selectedMonth;
  console.log('selected month---->', selectedMonth);
  const barMaxHeight = 200;
  const barMaxWidth = 50;
  const [monthlyData, setMonthlyData] = useState();
  const [showPopover, setShowPopover] = useState(false);
  const [selectedTabValue, setSelectedTabValue] = useState(3);
  const [totalMonth, setTotalMonth] = useState([]);

  const range = [
    {
      value: 3,
      label: '3m',
    },
    {
      value: 6,
      label: '6m',
    },
    {
      value: 12,
      label: '1 yr',
    },
    {
      value: -1,
      label: '2 yr',
    },
    {
      value: -2,
      label: 'Max',
    },
  ];

  useEffect(() => {
    setMonthlyData(
      MainJSON.netRevenue.filter(item => item.month === selectedMonth)[0],
    );
  }, [props.selectedMonth]);

  const currentDate = new Date();
  // Get the current month (0 to 11, where 0 is January and 11 is December)
  const currentMonth = currentDate.getMonth();

  useEffect(() => {
    // Calculate the last three months
    const lastMonths = [];
    for (let i = selectedTabValue - 1; i >= 0; i--) {
      const month = (currentMonth - i + 12) % 12; // Handle wrapping around the year
      lastMonths.push(month + 1); // Add 1 to get the month number (1 to 12)
    }
    var data = [];
    var revenueData = [];
    lastMonths.forEach(m => {
      MainJSON.netRevenue.forEach(item => {
        if (item.month === m) {
          data.push(item);
          revenueData.push(item.revenue);
        }
      });
    });

    // Original range
    const originalMin = Math.min(...revenueData);
    const originalMax = Math.max(...revenueData);

    // Target range
    const targetMin = 60;
    const targetMax = 200;

    // Function to normalize a single value from the original range to the target range
    const normalizeValue = value =>
      ((value - originalMin) * (targetMax - targetMin)) /
        (originalMax - originalMin) +
      targetMin;

    data.forEach(item => {
      item.length = normalizeValue(item.revenue);
    });
    setTotalMonth(data);
  }, [selectedTabValue]);

  console.log('selected tab value -->', selectedTabValue);

  //   console.log('total months -->',  monthlyData.occupancy);

  const RenderBars = monthData => {
    const data = monthData.data;
    console.log('data----->', data);
    return (
      <ControlledTooltip
        popover={<Text>{data?.revenue}k</Text>}
        width={70}
        pointerColor={COLORS.lightGray}
        withPointer={true}
        backgroundColor={COLORS.white}
        withOverlay={false}
        containerStyle={styles.popover}
        visible={showPopover}
        onOpen={() => {
          setTimeout(() => {
            setShowPopover(false);
          }, 3000);
        }}>
        <Pressable
          onPress={() => {
            setShowPopover(true);

            props.onChangeMonth(data.month);
          }}>
          <View>
            {/* <CustomTooltip/> */}
            <View
              style={{
                ...styles.barStyle,
                backgroundColor:
                  selectedMonth === data.month
                    ? COLORS.primary
                    : COLORS.primaryLight,
                width: selectedTabValue > 6 ? 20 : 50,
                height: data.length,
                flex: null,
              }}
            />
            <Text
              style={{
                alignSelf: 'center',
                marginTop: 5,
                color: COLORS.lightGrayText,
              }}>
              {new Date(0, data.month - 1, 1)
                .toLocaleString('default', {month: 'long'})
                .slice(0, 3)}
            </Text>
          </View>
        </Pressable>
      </ControlledTooltip>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Stats</Text>
        <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.detailsBtn}>Details</Text>
            <MIcon
              name="arrow-forward"
              size={20}
              color={COLORS.primaryDark}
              style={{paddingTop: 2}}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {totalMonth.map(item => (
          <RenderBars data={item} key={item.ID} />
        ))}
      </View>

      <Text style={{...styles.title, alignSelf: 'center', marginVertical: 10}}>
        Net Revenue
      </Text>

      <FlatList
        data={range}
        horizontal
        style={{alignSelf: 'center'}}
        renderItem={({item, index}) => {
          return (
            <Pressable onPress={() => setSelectedTabValue(item.value)}>
              <View
                style={{
                  ...styles.tabs,
                  backgroundColor:
                    selectedTabValue === item.value
                      ? COLORS.white
                      : COLORS.primaryLight,
                }}>
                <Text
                  style={{
                    color:
                      selectedTabValue === item.value
                        ? COLORS.primaryDark
                        : COLORS.black,
                    fontWeight: '600',
                  }}>
                  {item.label}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />

      <View style={styles.footer}>
        <CircularProgress
          value={monthlyData?.occupancy || 0}
          radius={50}
          progressValueColor={COLORS.primary}
          activeStrokeColor={COLORS.primary}
          inActiveStrokeColor={COLORS.primaryLight}
          inActiveStrokeOpacity={0.6}
          inActiveStrokeWidth={13}
          activeStrokeWidth={20}
          valueSuffix="%"
          rotation={130}
        />
        <View style={{alignItems: 'center'}}>
          <Text
            style={{color: COLORS.primary, fontSize: 25, fontWeight: '900'}}>
            {monthlyData?.avgRoomRate}
          </Text>
          <Text style={{color: COLORS.black, fontSize: 20, fontWeight: '500'}}>
            Avg Room Rate
          </Text>
        </View>
      </View>

      <View
        style={{paddingHorizontal: 10, backgroundColor: COLORS.white}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    width: '96%',
    alignSelf: 'center',
    marginVertical: 15,
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
  barStyle: {
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
    flex: 1,
  },
  popover: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  tabs: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 50,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  footer: {
    flexDirection: 'row',
    margin: 15,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});
