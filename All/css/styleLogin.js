import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      alignItems: "center",
      backgroundColor: "white",
    },
    logo: {
      marginTop:40,
      minHeight:'30%',
      alignItems: "center",
    },
    body: {
      width: "93%",
      minHeight:'50%',
      alignItems: "center",
    },
    containerSignUp: {
      flex:1,
      flexDirection: "row",
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
      marginTop: 25,
    },
    logoOthers: {
      width: 35,
      height: 35,
    },
    //  SignUp
    textSignUp: {
      color: "grey",
      fontSize: 16,
      marginEnd: 5,
    },
    textBtnSignUp: {
      fontSize: 16,
      marginEnd: 5,
      fontWeight: "500",
    },
  
    // Modal 
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
      height: 163,
      backgroundColor: "white",
      borderRadius: 10,
      elevation: 10,
    },
    headerModal: {
      backgroundColor: "red",
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
      height: 70,
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
  
  });
  
