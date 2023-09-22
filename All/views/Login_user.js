import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = (props) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

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
        {/* Button Login => Click => Chuyển sang màn hình Home */}
        <TouchableOpacity
          style={styles.btnLogin}
          onPress={() => {
            navigation.navigate("signup");
          }}
        >
          <Text style={styles.textBtnLogin}>Login</Text>
        </TouchableOpacity>
        
        {/* Đăng nhặp bằng Facebook và Google */}
        <View style={styles.loginWithOtherAccount}>
          <View style={styles.lineBlack}>
            <View
              style={{
                height: 0.5,
                backgroundColor: "grey",
                width: '30%',
              }}
            />
            <Text style={{ fontSize: 16, color: "grey",marginHorizontal:15 }}>Or sign in with</Text>
            <View
              style={{
                height: 0.5,
                backgroundColor: "grey",
                width: '30%',
              }}
            />
          </View>
          {/* ////////////////// logo đăng nhập bằng google hoặc phở bò /////////////// */}
          <View style={styles.logoLogin}>
            <TouchableOpacity style={styles.logo_Other_Login}>
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../image/logoFB.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.logo_Other_Login}>
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../image/logoGG.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  // Chia bố cục
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
  
//Đăng nhập với Facebook và Google
  loginWithOtherAccount: {
    flexDirection: "column",
    width: "100%",
    marginTop:25,
  },
  lineBlack: {
    alignItems:'center',
    justifyContent: "center",
    flexDirection: "row",
  },
  logoLogin: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },

  logo_Other_Login: {
    width: 50,
    height: 50,
    marginEnd: 20,
    marginStart: 20,
    borderRadius: 12,
    justifyContent: "center",
  },
});
