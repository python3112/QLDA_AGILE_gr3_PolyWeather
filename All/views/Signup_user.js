import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View, Text, Image,
  TextInput,
  ImageBackground,
  Modal
} from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, set, push, get, child } from "firebase/database";

import firebase from "../db/firebase";


const SignupScreen = (props) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setfullName] = useState("");
  const [adress, setadress] = useState("");
  const [status, setstatus] = useState(false);
  const [re_password, setre_password] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [textErr, settextErr] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // modal////
  const closeModal = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    firebase()
  }, []);

  const checkLogin = async (name) => {
    const db = getDatabase();
    const userRef = ref(db, 'users');

    try {
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        const user = Object.values(users).find(
          (userData) => userData.username === name
        );
        console.log(!!user);
        return !!user; // Trả về true nếu tài khoản tồn tại, false nếu không tồn tại
      } else {
        console.log('checkLogin:Không có dữ liệu');
        return false;
      }
    } catch (error) {
      console.error('Lỗi khi đọc dữ liệu:', error);
      throw error;
    }
  };

  const checkRegister = async () => {
    if (username.length > 0 && password.length > 0 && adress.length > 0 && fullName > 0) {

      if (password === re_password || fullName.length > 20) {
        if (!await checkLogin(username)) {
          addNewUser(fullName, username, password, adress, status)
          console.log('checkRegister:đăng kí thành công')
          navigation.navigate('login');
        } else {
          setIsVisible(true);
          settextErr("Tên tài khoản đã tồn tại !");
          console.log('checkRegister:đã tồn tại')
        }
      } else {
        setIsVisible(true);
        settextErr("Sai họ tên   hoặc mật khẩu không khớp");
        console.log('Sai định dạng số điện thoại hoặc mật khẩu không khớp');
      }
    } else {
      setIsVisible(true);
      settextErr("Vui lòng điền đầy đủ thông tin");
      console.log('Vui lòng điền đầy đủ thông tin');
    }
  }

  const addNewUser = (fullName, name, pass, adress, status) => {
    const db = getDatabase(); // Lấy tham chiếu đến cơ sở dữ liệu Firebase
    // Tạo một tham chiếu mới dưới nút 'users/' và sử dụng hàm `push()` để tạo một khóa duy nhất
    const newUserRef = push(ref(db, 'users'));
    // Lấy khóa duy nhất của người dùng mới
    const userId = newUserRef.key;

    // Tạo dữ liệu người dùng mới và đặt vào cơ sở dữ liệu
    set(newUserRef, {
      userFullName: fullName,
      username: name,         // Gán tên người dùng
      password: pass,            // Gán email người dùng
      userAdress: adress,
      userStatus: status // Gán ảnh đại diện người dùng
    });

    return userId; // Trả về khóa duy nhất của người dùng mới (nếu cần)
  }


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
              placeholder="Full name"
              onChangeText={(text) => setfullName(text)}
            />
          </View>
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

          <View style={styles.viewInPut}>
            <FontAwesome5
              name="unlock-alt"
              size={20}
              color="orange"
              style={{ marginEnd: 10 }}
            />
            <TextInput
              style={styles.tipPassword}
              placeholder=" Repassword"
              onChangeText={(text) => setre_password(text)}
              secureTextEntry={showPass ? false : true}
            />
            <TouchableOpacity
              onPress={() => setShowPass(!showPass)}
              style={{
                justifyContent: "center",
                width: "10%",
                height: "100%"
              }}
            >
              <Entypo
                name={showPass ? "eye" : "eye-with-line"}
                size={20}
                color="orange"
              />
            </TouchableOpacity>
          </View>


          <View style={styles.viewInPut}>
            <Entypo
              name="location"
              size={20}
              color="orange"
              style={{ marginEnd: 10 }}
            />
            <TextInput
              style={styles.tipUserName}
              placeholder="Adress City "
              onChangeText={(text) => setadress(text)}
            />
          </View>
        </View>

        {/* Button Login => Click => Chuyển sang màn hình Home */}
        <TouchableOpacity
          style={styles.btnLogin}
          onPress={() => {
            checkRegister()
          }}
        >
          <Text style={styles.textBtnLogin}>Sign Up </Text>
        </TouchableOpacity>

        {/* Đăng nhặp bằng Facebook và Google */}
        {/* View text */}

      </View>


      {/* <Modal animationType="slide" transparent={true} visible={visModel}>
              <View>
                <Text>Đăng Nhập </Text>
              </View>
      </Modal> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              height: 163,
              backgroundColor: "white",
              borderRadius: 10,
              elevation: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "red",
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <FontAwesome5
                name="exclamation-triangle"
                size={30}
                color="white"
                style={{ marginStart: 10 }}
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                  marginStart: 15,
                }}
              >
                Sign up failed
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                height: 70,
                borderBottomWidth: 0.4,
                borderColor: "gray",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>
                {textErr}
              </Text>
            </View>
            <TouchableOpacity
              onPress={closeModal}
              style={{
                borderRadius: 5,
                borderColor: "grey",
                marginTop: 5,
                alignSelf: "flex-end",
                marginEnd: 10,
                borderWidth: 1,
                width: 60,
                padding: 5,
              }}
            >
              <Text style={{ textAlign: "center" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.containerSignUp}>
        <Text style={styles.textSignUp}>Already have an account ?</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("login");
        }}>
          <Text style={styles.textBtnSignUp}>Login With Account</Text>
        </TouchableOpacity>
      </View>

    </View>

  )
}
export default SignupScreen;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    position: "relative",
    top: 50,
    alignItems: "center",
  },
  body: {
    width: "93%",
    position: "relative",
    top: 80,
    alignItems: "center",
  },
  //Logo
  imageLogo: {
    width: 150,
    height: 150,
  },
  textLogo: {
    marginTop: 10,
    color: "orange",
    fontWeight: "400",
    fontSize: 24,
  },

  //  Nhập dữ liệu
  containerInput: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },

  viewInPut: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    alignItems: "center",
    paddingStart: 10,

    marginTop: 15,
    borderRadius: 10,
    borderColor: "orange",
    borderWidth: 1.5,
  },
  tipUserName: {
    width: "80%",
    maxWidth: 350,
    paddingStart: 10,
    color: "black",
    fontSize: 15,
  },
  tipPassword: {
    width: "82%",
    maxWidth: 350,
    paddingStart: 15,
    color: "black",
    fontSize: 15,
  },

  //Button quên mật khẩu
  btnForgot: {
    alignSelf: "flex-end",
  },
  textForgot: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "500",
    color: "grey",
  },

  //Button đăng nhập
  btnLogin: {
    width: "100%",
    height: 55,
    marginTop: 25,
    borderRadius: 5,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  textBtnLogin: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
  },



  containerSignUp: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textSignUp: {
    color: 'grey',
    fontSize: 16,
    marginEnd: 5
  },
  textBtnSignUp: {
    fontSize: 16,
    marginEnd: 5,
    fontWeight: '500'
  }

  //Đăng nhập với Facebook và Google



});