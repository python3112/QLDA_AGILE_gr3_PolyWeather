import { StyleSheet, Text, View, Image, TouchableOpacity, Switch, ActivityIndicator, SafeAreaView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import firebase from '../db/firebase';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get, getDatabase, ref, query, equalTo, orderByChild } from 'firebase/database';


;

const Setting = (props) => {
  const { navigation } = props;
  const [dataUserSetting, setdataUserSetting] = useState(null);
  const [darkMode, setdarkMode] = useState(false);
  const [ModalVip, setModalVip] = useState(true);
const [resetData, setresetData] = useState(true);

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
    if(resetData){
      firebase();
      fetchUserData().then((userData) => {
        setdataUserSetting(userData);
      });
      setresetData(false);
    }
  
    // Initialize Firebase here if necessary

  }, [resetData]);

  const toggleSwitch = () => setdarkMode(previousState => !previousState);
  console.log(dataUserSetting);
  const openDraw = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView>

    
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: darkMode ? '#2A3132' : 'rgba(220,220,220 , 0.1)',
    }}>



      <View style={{
        width: '100%',
        height: '10%',
        backgroundColor: darkMode ? 'black' : '#FFA500',
        justifyContent: 'center'
      }}>
        <View style={{ flexDirection: 'row' ,marginTop:10 }}>
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
      {dataUserSetting !== null ? (
        <>
        <View style={{ alignItems:'center', width:'100%', height:'90%'}}>
          {/* //////// phần đầu  ////////////// */}
          <View style={styles.viewHeader}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
              <Image style={{ width: 100, height: 100, borderRadius: 5, }} source={require('../image/rainy.jpg')} />
              <View style={{ flexDirection: 'column', marginStart: '5%' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: darkMode ? 'white' : 'black' }}>
                  {dataUserSetting[Object.keys(dataUserSetting)]['userFullName']}
                </Text>
                <Text style={{ margin: 5, opacity: 0.5, fontSize: 17, color: darkMode ? 'white' : 'black' }}>
                  Account : {dataUserSetting[Object.keys(dataUserSetting)]['userStatus'] ? "VIP" : "Nomarl"}
                </Text>
                <Text style={{ margin: 5, opacity: 0.5, fontSize: 17, color: darkMode ? 'white' : 'black' }} >
                  Address : {dataUserSetting[Object.keys(dataUserSetting)]['userAdress']}
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
            <View style={{
              width: '100%',
              marginTop:20,
              height: 70,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              

            }}>
              <Text style={{ color: darkMode ? 'white' : 'black', fontSize: 20, marginStart: 10 , marginTop:10}}>
               UpdateVip
              </Text>
             <TouchableOpacity style={{
              borderWidth:1,
              paddingStart:15,
              paddingEnd:15,
              paddingTop:5,
              paddingBottom:5,
              borderRadius: 5,
              borderColor: darkMode ? 'rgba(255 , 255 , 255 , 0.5)' : 'rgba(0 , 0 , 0 , 0.5)',
             }}>
                  <FontAwesome name='diamond' size={25} color={darkMode ?  'white' :  '#F0810F'}>
                  </FontAwesome>
             </TouchableOpacity>
            </View>

          </View>

          </View>

        </>

      ) : (
        // Hiển thị nếu dữ liệu null
        <View
          style={{
            marginTop:'100%',
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={50} color="orange" />
        </View>
      )}
      
    </View>

    </SafeAreaView>
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

    marginTop: '5%'

  },
})