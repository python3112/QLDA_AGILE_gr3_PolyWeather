import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, TextInput, ImageBackground } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, FacebookAuthProvider, signInWithPopup, signInWithRedirect, signInWithCredential } from "firebase/auth";
import { getDatabase, ref, set, push, get, child } from "firebase/database";
import { } from "firebase/firestore";
import { } from "firebase/functions";
import { } from "firebase/storage";


const SignupScreen = (props) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [re_password, setre_password] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBb4v-OQ0999gtPkgNdyJD28eB7n2iSP-A",
      authDomain: "test-reactnative-8b877.firebaseapp.com",
      databaseURL: "https://test-reactnative-8b877-default-rtdb.firebaseio.com",
      projectId: "test-reactnative-8b877",
      storageBucket: "test-reactnative-8b877.appspot.com",
      messagingSenderId: "977496658334",
      appId: "1:977496658334:web:30f8cb82c28b91aadf068f",
      measurementId: "G-6K4ZY7WGDC"
    };

    // Kiểm tra xem đã khởi tạo ứng dụng Firebase chưa
    if (!getApps.length) {
      const app = initializeApp(firebaseConfig);
      console.log("Kết nối thành công");
    }
  }, []);


  const checkRegister = async () => {
    if (username.length > 0 && password.length > 0 && PhoneNumber.length > 0) {
      const pattern = /^(0|\+84)[1-9][0-9]{8}$/;

      if (password === re_password && pattern.test(PhoneNumber)) {
        const db = getDatabase();
        const usersRef = ref(db, 'users');

        // Kiểm tra xem `username` đã tồn tại trong cơ sở dữ liệu chưa
        const usernameSnapshot = await get(child(usersRef, username));
        console.log(usernameSnapshot.exists())
        if (!usernameSnapshot.exists()) {
          // Nếu `username` chưa tồn tại, thêm người dùng mới vào cơ sở dữ liệu
          
          addNewUser(username , password , PhoneNumber)
          console.log('Đăng ký thành công');
        } else {
          console.log('Tên người dùng đã tồn tại');
        }
      } else {
        console.log('Sai định dạng số điện thoại hoặc mật khẩu không khớp');
      }
    } else {
      console.log('Vui lòng điền đầy đủ thông tin');
    }
  }

  const addNewUser = (name, pass, sdt) => {
    const db = getDatabase(); // Lấy tham chiếu đến cơ sở dữ liệu Firebase
    // Tạo một tham chiếu mới dưới nút 'users/' và sử dụng hàm `push()` để tạo một khóa duy nhất
    const newUserRef = push(ref(db, 'users'));
    // Lấy khóa duy nhất của người dùng mới
    const userId = newUserRef.key;

    // Tạo dữ liệu người dùng mới và đặt vào cơ sở dữ liệu
    set(newUserRef, {
      username: name,         // Gán tên người dùng
      password: pass,            // Gán email người dùng
      phonenumber: sdt   // Gán ảnh đại diện người dùng
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
            <Entypo
              name="old-phone"
              size={20}
              color="orange"
              style={{ marginEnd: 10 }}
            />
            <TextInput
              style={styles.tipUserName}
              placeholder="Phone"
              onChangeText={(text) => setPhoneNumber(text)}
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