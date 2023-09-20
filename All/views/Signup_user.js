import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, TextInput, ImageBackground } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';


const SignupScreen  = (props) =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [re_password, setre_password] = useState("");
    const [showPass, setShowPass] = useState(false);

    return (
        <ImageBackground source={require('../image/imgBack.jpg')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>

            <Image style={{ width: 150, height: 150 }} source={require('../image/logoWeather.png')} />
            <Text style={{fontSize:25, marginBottom:10,color:'white'  , letterSpacing:0.5,fontWeight:'bold'}}>
                    Đăng Kí Poly Weather
                </Text>
            {/* /////////////// phần text input đăng nhập vào /////////// */}
            <View style={styles.viewTip} >
                <View style={styles.tipUserNameContainer}>
                    <FontAwesome5 name="user-alt" size={25} color={'rgba(255 , 255 , 255 , 0.7)'} style={{ marginEnd: 10 }} />
                    <TextInput style={styles.tipUserName} placeholder="nhập user name" onChangeText={(text) => setUsername(text)} />
                </View>

                <View style={styles.tipUserNameContainer}>
                    <FontAwesome5 name="lock" size={23} color={'rgba(255 , 255 , 255 , 0.5)'} style={{ marginEnd: 10 }} />
                    <TextInput style={styles.tipPassword} placeholder="nhập user name"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={showPass ? false : true} />
                    <TouchableOpacity onPress={() => setShowPass(!showPass)} style={{ justifyContent: 'center', width: "10%", height: "100%" }}>
                        <Entypo name={showPass ? "eye" : "eye-with-line"} size={23} color={'rgba(77 , 77 , 255 , 0.6)'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.tipUserNameContainer}>
                    <FontAwesome5 name="lock" size={23} color={'rgba(255 , 255 , 255 , 0.5)'} style={{ marginEnd: 10 }} />
                    <TextInput style={styles.tipPassword} placeholder="nhập user name"
                        onChangeText={(text) => setre_password(text)}
                        secureTextEntry={showPass ? false : true} />
                    <TouchableOpacity onPress={() => setShowPass(!showPass)} style={{ justifyContent: 'center', width: "10%", height: "100%" }}>
                        <Entypo name={showPass ? "eye" : "eye-with-line"} size={23} color={'rgba(77 , 77 , 255 , 0.6)'} />
                    </TouchableOpacity>
                </View>


            </View>
            {/* <View style={styles.Signup_and_Forgot} >
                <TouchableOpacity style={{ justifyContent: 'center' , marginEnd:50 }}>
                    <Text style={styles.text}>
                       Đăng kí Account
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: 'center'  , marginStart:50 }}>
                    <Text style={styles.text}>
                       Quên mật khẩu?
                    </Text>
                </TouchableOpacity>
            </View> */}

            {/* /////////////// btn login ///////////////// */}

            <TouchableOpacity style={styles.btn_Login}>
                <Text style={{
                    color: "white",
                    alignSelf: 'center',
                    fontSize: 17,
                }}>
                    Đăng Kí
                </Text>
            </TouchableOpacity>
            {/* //////////////// đăng nhập với google hoặc phở bò  ///////////// */}
            {/* <View style={styles.loginWithOtherAccount}>
                <View style={styles.lineBlack}>
                    <View style={{ height: 2, backgroundColor: 'white', width: 100, marginTop: 20, marginEnd: 10 }} />
                    <Text style={{ fontSize: 20, color: 'white' }}>Or</Text>
                    <View style={{ height: 2, backgroundColor: 'white', width: 100, marginTop: 20, marginStart: 10 }} />


                </View> */}
                {/* ////////////////// logo đăng nhập bằng google hoặc phở bò /////////////// */}
                {/* <View style={styles.logoLogin}>
                    <TouchableOpacity style={styles.logo_Other_Login}>
                        <Image style={{ width: 50, height: 50 }} source={require('../image/logoFB.png')} />

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logo_Other_Login}>
                        <Image style={{ width: 50, height: 50 }} source={require('../image/logoGG.png')} />

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logo_Other_Login}>
                        <Image style={{ width: 50, height: 50 }} source={require('../image/logoTT.png')} />


                    </TouchableOpacity>

                </View> */}


            {/* </View> */}


        </View>

    </ImageBackground>
    )
}
export default SignupScreen;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',


    },
    textLogo: {
        marginBottom: 20,
        fontSize: 20,
        color: 'blue',


    },


    /////////// phần csss text input ///////////////


    viewTip: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',

    },

    tipUserNameContainer: {
        width: "90%",
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(255 , 255 , 255 , 0.5)',
        paddingStart: 10,
        marginTop: 20,
    },
    tipUserName: {
        width: '78%',
        maxWidth: 350,
        paddingStart: 10,
        color: 'black',
        fontSize: 15,
    },
    tipPassword: {
        width: '70%',
        maxWidth: 350,
        paddingStart: 15,
        color: 'black',
        fontSize: 15,
      
    },
    Signup_and_Forgot: {
        flexDirection: 'row',

        width: "80%",
        height: 40,
        justifyContent: "space-evenly",
        marginTop:15

    },
    text:{
        fontSize:17,
        color:'white',
    },

    /////////////////// css phần nút ấn và logo ///////////

    btn_Login: {
        width: 150,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: "rgba(128,0,128 , 0.8)",
    },

    loginWithOtherAccount: {
        flexDirection: 'column',
        width: "100%",
        height: 80,

    },

    lineBlack: {
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    logoLogin: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,

    },

    logo_Other_Login: {
        width: 50,
        height: 50,
        marginEnd: 20,
        marginStart: 20,
        borderRadius: 12,
        justifyContent: 'center',
    }

});