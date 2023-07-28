// React
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// Resources
import {COLORS} from '../Resources/Resources';
import {MainJSON} from '../Resources/MainJSON';
// Icons
import MIcon from 'react-native-vector-icons/MaterialIcons';
// Components
import CircularProgress from 'react-native-circular-progress-indicator';

export default function RevenueChart(props) {
  const selectedMonth = props.selectedMonth;
  //  data for the particularly selected month
  const [monthlyData, setMonthlyData] = useState();
  // tab values to filter months
  const [selectedTabValue, setSelectedTabValue] = useState(3);
  //  total month data after filtering it via selected tabs
  const [totalMonth, setTotalMonth] = useState([]);
  //  to refresh components
  const [refresh, setRefresh] = useState(false);

  //  Range data for month to filter according to selected tab
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

  // Fetching data for currently selected month or if selected month changes
  useEffect(() => {
    setMonthlyData(
      MainJSON.netRevenue.filter(item => item.month === selectedMonth)[0],
    );
    if (
      (props.selectedMonth > totalMonth?.slice(-1)[0]?.month ||
        props.selectedMonth < totalMonth?.[0]?.month) &&
      selectedTabValue <= 6
    ) {
      setRefresh(!refresh);
    } 
  
  }, [props.selectedMonth]);
  console.log('check', totalMonth, selectedMonth);

  // get the todays date
  const currentDate = new Date();
  // Get the current month (0 to 11, where 0 is January and 11 is December)
  const currentMonth = currentDate.getMonth();

  //  fetching data after selecting or changing the tabs and selected month  and
  //  adding normalizing length between 60 to 200 accoring to revenue for the bars
  useEffect(() => {
    // Calculate the last three months
    const lastMonths = [];
    for (let i = selectedTabValue - 1; i >= 0; i--) {
      const month = (selectedMonth - i + 12) % 12; // Handle wrapping around the year
      lastMonths.push(month + 1); // Add 1 to get the month number (1 to 12)
    }

    // getting months for which we have to show bars and getting data accoring to months
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

    // normilizing lenth for bars accoring to revenue
    // Original range
    const originalMin = Math.min(...revenueData);
    const originalMax = Math.max(...revenueData);

    // Target range
    const targetMin = 100;
    const targetMax = 190;

    // Function to normalize a single value from the original range to the target range
    const normalizeValue = value =>
      ((value - originalMin) * (targetMax - targetMin)) /
        (originalMax - originalMin) +
      targetMin;

    data.forEach(item => {
      item.length = normalizeValue(item.revenue);
    });
    console.log('data ------>', data);
    setTotalMonth(data);
  }, [selectedTabValue, refresh]);

  //  Render Chart Bars
  const RenderBars = monthData => {
    const data = monthData.data;
    // condition to check if the selected month is greater than current month
    //or if we dont have that month data
    return monthData.data.month <= currentMonth + 1 ? (
      <>
        <Pressable
          onPress={() => {
            props.onChangeMonth(data.month);
          }}>
          <View style={styles.container}>
            <View
              style={{
                ...styles.barStyle,
                backgroundColor:
                  selectedMonth === data.month
                    ? COLORS.primary
                    : COLORS.primaryLight,
                width: selectedTabValue > 6 ? 23 : 50,
                height: data.length,
                flex: null,
              }}
            />
          </View>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 5,
              color:
                selectedMonth === data.month
                  ? COLORS.primary
                  : COLORS.lightGrayText,
            }}>
            {new Date(0, data.month, 1)
              .toLocaleString('default', {month: 'long'})
              .slice(0, 3)}
          </Text>

          {/*------- showing toolTip for selected month -------- */}
          {selectedMonth === data.month && (
            <View style={styles.tooltipContainer}>
              <View style={styles.pointer} />
              <Text style={styles.tooltipText}>{data.revenue}K</Text>
            </View>
          )}
        </Pressable>
      </>
    ) : (
      //  showing Dashed bars
      <View>
        <View
          style={{...styles.dashedBar, width: selectedTabValue > 6 ? 23 : 50}}
        />
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 5,
            color:
              selectedMonth === data.month
                ? COLORS.primary
                : COLORS.lightGrayText,
          }}>
          {new Date(0, data.month, 1)
            .toLocaleString('default', {month: 'long'})
            .slice(0, 3)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* ---------- header ------- */}
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
      {/* ----------rendering chart ------- */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{alignSelf: 'center'}}>
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          {totalMonth.map((item, index) => (
            <View style={{marginHorizontal: 5}} key={index}>
              <RenderBars data={item} key={item.ID} />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* -----------sub header ------- */}
      <Text style={{...styles.title, alignSelf: 'center', marginVertical: 10}}>
        Net Revenue
      </Text>

      {/* --------- range filter component ------ */}
      <View style={{alignItems: 'flex-end'}}>
        <FlatList
          data={range}
          horizontal
          style={{alignSelf: 'flex-end'}}
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
      </View>

      {/* -----------------footer ----------------*/}
      <View style={styles.footer}>
        {/* ----- circular progress component --- */}
        <View style={{alignItems: 'center'}}>
          <CircularProgress
            value={monthlyData?.occupancy || 0}
            radius={45}
            progressValueColor={COLORS.primary}
            activeStrokeColor={COLORS.primary}
            inActiveStrokeColor={COLORS.primaryLight}
            inActiveStrokeOpacity={0.6}
            inActiveStrokeWidth={15}
            activeStrokeWidth={20}
            valueSuffix="%"
            rotation={130}
          />
          <Text style={{color: COLORS.black, fontSize: 20, fontWeight: '500'}}>
            Occupancy
          </Text>
        </View>
        {/* -----------avg room rate-------------- */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    marginVertical: 15,
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
    height: 510,
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
    elevation: 4,
    marginBottom: 5,
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
  toolTipMaincontainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipContainer: {
    position: 'absolute',
    minWidth: 50,
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 5,
    zIndex: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
    left: -10,
    top: -10,
  },
  pointer: {
    position: 'absolute',
    left: '50%',
    bottom: -10,
    marginLeft: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 10,

    borderTopColor: COLORS.white,
    zIndex: 10,
  },
  tooltipText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  dashedBar: {
    borderWidth: 1,
    borderRadius: 15,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    height: 100,
    flex: null,
  },
});
