import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  Modal,
  ActivityIndicator
} from "react-native";
import "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import firebase from "../db/firebase";
import { styles } from "../css/styleLogin";
import { checkLogin } from "../utilities/utilities";
import * as Location from "expo-location";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../db/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();
const LoginScreen = (props) => {
const{navigation } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [textErr, settextErr] = useState("");

  // Modal
  const [isVisible, setIsVisible] = useState(false);
  const closeModal = () => {
    setIsVisible(false);
  };
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: "319387099135-8m53iimevr7ac1vhb269dhqekn6snvic.apps.googleusercontent.com",
  });

 

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

 
  //Kết nối firebase
  useEffect(() => {
    firebase();
  }, []);
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = null;
    let isLocationLoaded = false;
    while (!isLocationLoaded) {
      try {
        location = await Location.getCurrentPositionAsync({});
        if (location) {
          console.log("Đang tải vị trí");
          setLocationNow(
            `${location.coords.latitude},${location.coords.longitude}`
          );
          isLocationLoaded = true;
        }
      } catch (error) {
        console.log("Error getting location: ", error);
      }
    }
  };
  const [locationNow, setLocationNow] = useState(null);
  useEffect(() => {
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = null;
    let isLocationLoaded = false;
    while (!isLocationLoaded) {
      try {
        location = await Location.getCurrentPositionAsync({});
        if (location) {
          console.log("Đang tải vị trí");
          setLocationNow(
            `${location.coords.latitude},${location.coords.longitude}`
          );
          isLocationLoaded = true;
        }
      } catch (error) {
        console.log("Error getting location: ", error);
      }
    }
  };
  getLocation();
 
}, []);


  
  return (
    <View style={styles.container}>
      {/* Phần logo */}
      <View style={styles.logo}>
        <Image style={styles.imageLogo} source={require("../image/logo.png")} />
        <Text style={styles.textLogo}>POLY WEATHER</Text>
      </View>
      <View style={styles.body}>
        {/* Phần nhập dữ liệu */}
        <View style={styles.containerInput}>
          {/* Tài khoản */}
          <View style={styles.viewInPut}>
            <FontAwesome5
              name="user"
              size={20}
              color="orange"
              style={{ marginEnd: 10 }}
            />
            <TextInput
              style={styles.tipUserName}
              placeholder="Username"
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          {/* Mật khẩu */}
          <View style={styles.viewInPut}>
            <FontAwesome5
              name="unlock-alt"
              size={20}
              color="orange"
              style={{ marginEnd: 10 }}
            />
            <TextInput
              style={styles.tipPassword}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={showPass ? false : true}
            />
            <TouchableOpacity
              onPress={() => setShowPass(!showPass)}
              style={{ justifyContent: "center", width: "10%", height: "100%" }}
            >
              <Entypo
                name={showPass ? "eye" : "eye-with-line"}
                size={20}
                color="orange"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.btnForgot}>
          <Text style={styles.textForgot}>Forgot password ?</Text>
        </TouchableOpacity>

        {/* Thông báo */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={closeModal}
        >
          <View
            style={styles.containerModal}
          >
            <View style={styles.viewModal}>
              <View
                style={styles.headerModal}
              >
                <FontAwesome5
                  name="exclamation-triangle"
                  size={30}
                  color="white"
                  style={{ marginStart: 10 }}
                />
                <Text
                  style={styles.textHeaderModal}
                >
                  Login failed
                </Text>
              </View>
              <View
                style={styles.bodyModal}
              >
                <Text style={{ fontSize: 16 }}>
                  {textErr}
                </Text>
              </View>
              <TouchableOpacity
                onPress={closeModal}
                style={styles.btnModal}
              >
                <Text style={{ textAlign: "center" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Button Login => Click => Chuyển sang màn hình Home */}
        <TouchableOpacity style={styles.btnLogin} onPress={() => checkLogin(username, password, setIsVisible, settextErr, navigation,locationNow,getLocation)}>
          <Text style={styles.textBtnLogin}>Sign in</Text>
        </TouchableOpacity>

        {/* Đăng nhặp bằng Google */}
        <View style={styles.loginWithOtherAccount}>
          <TouchableOpacity onPress={()=>promptAsync()}>
            <View style={{backgroundColor:'white',height:55,flexDirection:"row",alignItems:'center',borderRadius:5,borderWidth:1.5}}>
            <View style={{marginStart:10,width:"24%"}}>
            <Image style={styles.logoOthers} source={require("../image/logoGG.png")}/>
            </View>
            <Text style={{color:'black',fontSize:19,fontWeight:'500',flex:1}}>Sign In with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Đăng ký */}
      <View style={styles.containerSignUp}>
        <Text style={styles.textSignUp}>Not register yet?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("signup");
          }}
        >
          <Text style={styles.textBtnSignUp}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;


