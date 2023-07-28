import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../Resources/Resources';
import {MainJSON} from '../Resources/MainJSON';
import Bookings from '../Components/Bookings';
import CircularProgress from 'react-native-circular-progress-indicator';
import DiscoverCards from '../Components/DiscoverCards';
import RevenueChart from '../Components/RevenueChart';

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(7);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        {/* -------------- header Tabs ---------------- */}
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

   <RevenueChart selectedMonth={selectedMonth} onChangeMonth={setSelectedMonth}/>

        {/* <View>
          <CircularProgress
            value={30}
            radius={120}
            progressValueColor={COLORS.primary}
            activeStrokeColor={COLORS.primary}
            inActiveStrokeColor={'#9b59b6'}
            inActiveStrokeOpacity={0.3}
            inActiveStrokeWidth={20}
            activeStrokeWidth={30}
            // rotation={180}
            // circleBackgroundColor=
          />
        </View> */}

        {/* --------------bookings section ------------ */}
        <Bookings
          selectedMonth={selectedMonth}
          onChangeMonth={setSelectedMonth}
        />

        {/* --------Discover Cards Section ------- */}
        <DiscoverCards selectedMonth={selectedMonth} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerButtonList: {
    marginTop:15,
  },
  headerButtonLabelView: {
    flex: 0,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  headerButtonLabel: {
    color: COLORS.black,
    fontWeight: '600',
    fontSize: 18,
  },
});
