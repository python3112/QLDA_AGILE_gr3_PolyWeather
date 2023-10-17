import { StyleSheet, Text, View, Image, TouchableOpacity, Switch, ActivityIndicator, } from 'react-native'
import React, { useState, useEffect } from 'react'
import firebase from '../db/firebase';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get, getDatabase, ref, query, equalTo, orderByChild } from 'firebase/database';

;

const Setting = (props) => {
  const { navigation } = props;
  const [dataUserSetting, setdataUserSetting] = useState(null);
  const [darkMode, setdarkMode] = useState(false);


  const fetchUserData = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('Data_User'));
      const db = getDatabase();
      const userRef = ref(db, 'users');
      const queryRef = query(userRef, orderByChild('username'), equalTo(user.username));
      const snapshot = await get(queryRef);
  
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }

  useEffect(() => {
    firebase();
    fetchUserData().then((userData) =>{
      setdataUserSetting(userData);
      console.log("kieeu du lieu : " +  typeof(dataUserSetting))

    } );
    // Initialize Firebase here if necessary
      
  }, []);

  const toggleSwitch = () => setdarkMode(previousState => !previousState);
  console.log(dataUserSetting);
  const openDraw = () => {
    navigation.openDrawer();
  };

  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: darkMode ? 'black' : 'white',
    }}>
      {dataUserSetting !== null ? (
        <>
          <View style={{
            width: '100%',
            height: 70,
            backgroundColor: darkMode ? 'black' : '#FFA500',
            justifyContent: 'center'
          }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => openDraw()}
                style={{
                  marginStart: 20,
                  marginTop: 20
                }}>
                <Entypo name='menu' size={30} color={darkMode ? 'white' : 'black'} />

              </TouchableOpacity>

              <Text style={{
                marginStart: 20,
                marginTop: 20,
                fontSize: 20,
                color: darkMode ? 'white' : 'black'
              }}>
                Setting Account
              </Text>
            </View>

          </View>
          {/* //////// phần đầu  ////////////// */}
          <View style={styles.viewHeader}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
              <Image style={{ width: 100, height: 100, borderRadius: 5, }} source={require('../image/rainy.jpg')} />
              <View style={{ flexDirection: 'column', marginStart: '5%' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: darkMode ? 'white' : 'black' }}>
                  {dataUserSetting.userFullName}
                </Text>
                <Text style={{ margin: 5, opacity: 0.5, fontSize: 17, color: darkMode ? 'white' : 'black' }}>
                  Account : {dataUserSetting.userStatus ?  "VIP" :  "Nomarl" }
                </Text>
                <Text style={{ width:100,margin: 5, opacity: 0.5, fontSize: 17, color: darkMode ? 'white' : 'black' }} >
                  Address : {dataUserSetting.username}
                </Text>
              </View>


            </View>



          </View>
          {/* ////////// các chức năng ////////// */}
          <View style={styles.viewBody}>

            <View style={{
              width: '100%',
              height: 50,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderWidth: 1.5,
              borderRadius: 5,
              borderColor: darkMode ? 'rgba(255 , 255 , 255 , 0.5)' : 'rgba(0 , 0 , 0 , 0.5)',

            }}>
              <Text style={{ color: darkMode ? 'white' : 'black', fontSize: 20, marginStart: 10 }}>
                {darkMode ? 'Nomarl' : 'Dark'}
              </Text>
              <Switch
                style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }], marginEnd: 10 }} // Điều chỉnh kích thước của nút switch
                trackColor={{ false: '#767577', true: 'white' }}
                thumbColor={darkMode ? '#FFA500' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={darkMode}
              />
            </View>

          </View>

        </>
      ) : (
        // Hiển thị nếu dữ liệu null
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="orange" />
        </View>
      )}
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({

  viewHeader: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  viewBody: {
    width: '90%',
    height: 200,
    marginTop: '5%'

  },
})