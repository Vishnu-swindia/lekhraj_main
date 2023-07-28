import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../Resources/Resources';
import {MainJSON} from '../Resources/MainJSON';
import Bookings from '../Components/Bookings';
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

       

        {/* --------------bookings section ------------ */}
        <Bookings
          selectedMonth={selectedMonth}
          onChangeMonth={setSelectedMonth}
        />

        {/* --------Discover Cards Section ------- */}
        <DiscoverCards selectedMonth={selectedMonth} />

        
        <View style={{flexDirection:'row' , alignItems:"center", justifyContent:"space-between", backgroundColor:COLORS.white, margin:10,borderRadius:10, paddingHorizontal:10}}>
          <Text>Contact Us</Text>
          <View style={{flexDirection: 'row', alignItems:"center"}}>
            <Image source={require('../assests/call.png')}  style={{width:30,marginHorizontal:7, resizeMode:"contain"}}/>
            <Image source={require('../assests/email.png')}  style={{width:30, resizeMode:"contain", marginHorizontal:7,}}/>
            <Image source={require('../assests/whatsapp.png')}  style={{width:30, resizeMode:"contain",marginHorizontal:7,}}/>
          </View>
        </View>

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
