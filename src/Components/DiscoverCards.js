// React
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
//  Resources
import {COLORS} from '../Resources/Resources';
import {MainJSON} from '../Resources/MainJSON';
// Icons
import MIcon from 'react-native-vector-icons/MaterialIcons';

export default function DiscoverCards(props) {
  const selectedMonth = props.selectedMonth;
  // function to get data from selected month
  function getBookingDataForMonth(selectedMonth) {
    return MainJSON.Bookings.bookings[selectedMonth];
  }
  // selected month data 
  const data = getBookingDataForMonth(selectedMonth);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainTitle}>Discover</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item, index) => index}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View style={styles.listContainer}>
              <Image
                style={styles.image}
                source={require('../assests/image1.jpg')}
              />
              <View>
                <View style={{marginTop:20}}>
                <Text style={styles.titleText}>Bohemian repsody</Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.fromDate}>
                    <Text style={{color: COLORS.black, fontWeight: '600'}}>
                      {item.fromDate.split('-').reverse().join('/')}
                    </Text>
                  </View>
                  <View style={styles.fromDate}>
                    <Text style={{color: COLORS.black, fontWeight: '600'}}>
                      {item.toDate.split('-').reverse().join('/')}
                    </Text>
                  </View>
                </View>
                <Text style={{color: COLORS.black, fontSize:16}}>{item.bookingDetails}</Text>
                <TouchableOpacity>
                  <View style={{flexDirection: 'row', alignItems: 'center',marginVertical:10}}>
                    <Text style={styles.detailsBtn}>Details</Text>
                    <MIcon
                      name="arrow-forward"
                      size={20}
                      color={COLORS.primaryDark}
                      style={{alignSelf: 'center', paddingTop: 2}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
                  </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 230,
    // resizeMode: 'contain',
    flex: 1,
    borderRadius: 20,
    alignSelf: 'center',
  },
  listContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    width: '70%',
    padding: 10,
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  titleText: {
    fontWeight: '700',
    fontSize: 19,
    color: COLORS.black,
  },
  fromDate: {
    padding: 8,
    paddingHorizontal:12,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 7,
    marginRight: 6,
    marginVertical: 6,
    
  },
  detailsBtn: {
    fontSize: 16,
    color: COLORS.primaryDark,
    marginRight: 10,
  },
  mainTitle:{
    color:COLORS.black,
    fontWeight:'700',
    fontSize:20,
    padding:10,
    left:30
  }
});
