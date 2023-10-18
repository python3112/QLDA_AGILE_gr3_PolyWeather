import { StyleSheet, Text, View, Image, TouchableOpacity, Switch, ActivityIndicator, SafeAreaView, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import firebase from '../db/firebase';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get, getDatabase, ref, query, equalTo, orderByChild, update } from 'firebase/database';


;

const Setting = (props) => {
  const { navigation } = props;
  const [dataUserSetting, setdataUserSetting] = useState(null);
  const [darkMode, setdarkMode] = useState(false);
  const [ModalVip, setModalVip] = useState(false);
  const [resetData, setresetData] = useState(true);

  const fetchUserData = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('Data_User'));
      const db = getDatabase();
      const userRef = ref(db, 'users');

      const queryRef = query(userRef, orderByChild('username'), equalTo(user.username));
      const snapshot = await get(queryRef);

      if (snapshot.exists()) {
        console.log("user lấy được " + JSON.stringify(snapshot.val()));
        return snapshot.val();
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }


  useEffect(() => {
    if (resetData) {
      firebase();
      fetchUserData().then((userData) => {
        setdataUserSetting(userData);
      });
      setresetData(false);
    }

    // Initialize Firebase here if necessary

  }, [resetData]);

  const toggleSwitch = () => setdarkMode(previousState => !previousState);
  const openDraw = () => {
    navigation.openDrawer();
  };

  const updateData = (id, newData) => {
    const db = getDatabase();// Truy cập thuộc tính username trong đối tượng id
    const itemRef = ref(db, 'users/' + id); // Sử dụng username trong đường dẫn
    update(itemRef,
      newData).then(() => {

        console.log("Data updated");
        setresetData(true);

        setModalVip(false)
      }).catch((e) => {
        console.log(e);
      })
  }

  const updateVip = () => {
    console.log('updatevip')
    const idUser = Object.keys(dataUserSetting)[0];
    console.log('iduser ' + JSON.stringify(Object.keys(dataUserSetting)[0]))
    const newData = {
      userStatus: true,
    }
    updateData(idUser, newData);
  }

  const updatePass = () => {
    console.log('updatevip')
    const idUser = Object.keys(dataUserSetting)[0];
    console.log('iduser ' + JSON.stringify(Object.keys(dataUserSetting)[0]))
    const newData = {
      userStatus: true,
    }
    updateData(idUser, newData);
  }

  const closeModalVip = () => {
    setModalVip(false);
  }

  const openModalVip = () => {
    setModalVip(true);
  }

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
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
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
            <View style={{ alignItems: 'center', width: '100%', height: '90%' }}>
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

                {/* ////////// update vip /////////// */}
                <View style={{
                  width: '100%',
                  marginTop: 20,
                  height: 70,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  display: dataUserSetting[Object.keys(dataUserSetting)]['userStatus'] ? 'none' : 'flex',

                }}>
                  <Text style={{ color: darkMode ? 'white' : 'black', fontSize: 20, marginStart: 10, marginTop: 10 }}>
                    UpdateVip
                  </Text>
                  <TouchableOpacity style={{
                    borderWidth: 1,
                    paddingStart: 15,
                    paddingEnd: 15,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderRadius: 5,
                    borderColor: darkMode ? 'rgba(255 , 255 , 255 , 0.5)' : 'rgba(0 , 0 , 0 , 0.5)',
                  }}
                    onPress={() => { setModalVip(true) }}
                  >
                    <FontAwesome name='diamond' size={25} color={darkMode ? 'white' : '#F0810F'}>
                    </FontAwesome>
                  </TouchableOpacity>
                </View>
                {/* ////////////////////// đổi mk Account ////////////// */}
                <View style={{
                  width: '100%',
                  marginTop: 10,
                  height: 50,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: darkMode ? 'rgb(192,192,192)' : 'rgba(192,192,192 , 0.5)',
                  borderRadius: 5
                }}>
                  <Text style={{ color: darkMode ? 'rgb(255,127,80)' : 'black', fontSize: 20, marginStart: 10, }}>
                    PassWord
                  </Text>
                  <TouchableOpacity style={{


                  }}>
                    <Entypo name='chevron-right' size={28} color={darkMode ? 'black' : '#F0810F'} />

                  </TouchableOpacity>
                </View>

                <View style={{
                  width: '100%',
                  marginTop: 10,
                  height: 50,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: darkMode ? 'rgb(192,192,192)' : 'rgba(192,192,192 , 0.5)',
                  borderRadius: 5
                }}>
                  <Text style={{ color: darkMode ? 'rgb(255,127,80)' : 'black', fontSize: 20, marginStart: 10, }}>
                    Full name
                  </Text>
                  <TouchableOpacity style={{


                  }}>
                    <Entypo name='chevron-right' size={28} color={darkMode ? 'black' : '#F0810F'} />

                  </TouchableOpacity>
                </View>
                <View style={{
                  width: '100%',
                  marginTop: 10,
                  height: 50,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: darkMode ? 'rgb(192,192,192)' : 'rgba(192,192,192 , 0.2)',
                  borderRadius: 5
                }}>
                  <Text style={{ color: darkMode ? 'rgb(255,127,80)' : 'black', fontSize: 20, marginStart: 10, }}>
                    Adress
                  </Text>
                  <TouchableOpacity style={{


                  }}>
                    <Entypo name='chevron-right' size={28} color={darkMode ? 'black' : '#F0810F'} />

                  </TouchableOpacity>
                </View>




              </View>

            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={ModalVip}
              onRequestClose={closeModalVip}
            >
              <View
                style={styles.containerModal}
              >
                <View style={styles.viewModal}>
                  <View
                    style={styles.headerModal}
                  >
                    <FontAwesome
                      name="diamond"
                      size={30}
                      color="white"
                      style={{ marginStart: 10 }}
                    />
                    <Text
                      style={styles.textHeaderModal}
                    >
                      Nâng cấp tài khoản Vip
                    </Text>
                  </View>
                  <View
                    style={styles.bodyModal}
                  >
                    <Text style={{ fontSize: 20, textAlign:'center' }}>
                      Nâng cấp vip 199.000VNĐ
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' , alignItems:'center' , marginTop:5 }}>
                    <TouchableOpacity
                      onPress={() => { closeModalVip() }}
                      style={styles.btnModal}
                    >
                      <Text style={{ textAlign: "center" }}>Close</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => updateVip()}
                      style={styles.btnModal}
                    >
                      <Text style={{ textAlign: "center" }}>Update</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </Modal>
          </>

        ) : (
          // Hiển thị nếu dữ liệu null
          <View
            style={{
              marginTop: '100%',
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

  messageLogin: {
    color: "red",
    alignSelf: "flex-start",
    marginTop: 10,
  },
  containerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  viewModal: {
    width: "80%",
    height: 200,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
  },
  headerModal: {
    backgroundColor: '#FFA500',
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textHeaderModal: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginStart: 15,
  },
  bodyModal: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 100,
    borderBottomWidth: 0.4,
    borderColor: "gray",
    justifyContent: "center",
  },
  btnModal: {
    borderRadius: 5,
    borderColor: "grey",
    marginTop: 5,
    alignSelf: "flex-end",
    marginEnd: 10,
    borderWidth: 1,
    width: 60,
    padding: 5,
  }
})