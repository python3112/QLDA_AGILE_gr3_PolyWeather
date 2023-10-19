import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import LoginScreen from './All/views/Login_user';
import Splash_screen from './All/views/Splash_screen';
import SignupScreen from './All/views/Signup_user';
import Home_screen from './All/views/Home_screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DrawerItemList, createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react'
import Setting from './All/views/Setting';
import Favorite_address_screen from './All/views/Favorite_address_screen';


const CustomHeader = () => {
  const [Data, setData] = useState({});

  useEffect(() => {
    // Lấy dữ liệu từ AsyncStorage
    // async AsyncStorage.getItem('Data_User', (error, result) => {
    //   if (!error) {
    //     const user = await JSON.parse(result);
    //     setData(user);

    //   } else {
    //     console.log("Error reading data from AsyncStorage: " + error);
    //   }
    // });
    const getdata = async () => {
      await AsyncStorage.getItem('Data_User', (error, result) => {
        if (!error) {
          const user = JSON.parse(result);
          setData(user);

        } else {
          console.log("Error reading data from AsyncStorage: " + error);
        }
      });
    }

    getdata()

  }, []);


  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,165,0 , 0.5)'

      }}>
      <Image style={{ width: 100, height: 100, borderRadius: 50, marginTop: '10%' }} source={require('./All/image/man.png')}>

      </Image>

      <View style={{ flexDirection: 'row', marginBottom: '5%' }}>
        <Text
          style={{ fontSize: 20, color: 'rgba(255, 255, 255 , 1)', marginTop: 20, fontWeight: 'bold' }}>{Data == null ? 'User ' : Data.userFullName
          }</Text>
        <Text
          style={{ fontSize: 12, color: 'rgba(255, 0, 0 , 0.9)', marginTop: 20 }}>{Data.userStatus == false ? ' Normal' : ' Vip'
          }</Text>
      </View>


      <View style={{ backgroundColor: 'black', height: 1, width: '100%' }}>

      </View>
    </View >


  )
};



const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { navigation } = props;
  const handleLogout = () => {
    // Xóa thông tin đăng nhập từ AsyncStorage hoặc trạng thái đăng nhập trong Redux (tuỳ thuộc vào cách bạn quản lý)
    // Ví dụ với AsyncStorage

    // Điều hướng người dùng đến màn hình đăng nhập (hoặc màn hình khác tùy theo yêu cầu)
    AsyncStorage.clear();
    navigation.replace("login");
  };
  return (

    <View style={{ height: '100%', }}>
      <CustomHeader />
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView contentContainerStyle={{}} {...props}>

          <DrawerItemList {...props} />

        </DrawerContentScrollView>
      </View>
      <View style={{ marginBottom: '5%' }}>
        <TouchableOpacity
          style={{
            width: '90%',
            paddingVertical: 15,
            marginStart: '5%',
            borderColor: 'rgb(255, 0, 0)',
            borderWidth: 1.5,
            borderRadius: 10,

          }}
          onPress={handleLogout}


        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <AntDesign name="logout" size={23} color='black' />
            <Text style={{ color: 'black', fontWeight: 'bold', marginStart: 10 }}>Sign Out</Text>
          </View>

        </TouchableOpacity>
      </View>
    </View>
  )
};

const DrawerNav = (props) => {
  const {route } = props;
  const { userNameLogin } = route.params || {};
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: '#FFA500',
        drawerActiveTintColor: 'white'
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="homeA"
        component={Home_screen}
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={23} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorite"
        component={Favorite_address_screen}
        initialParams={{userNameLogin:userNameLogin}}
        options={{
          drawerLabel: "Favorite address",
          title: "Favorite address",
          drawerIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={23} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          drawerLabel: "Setting Account",
          title: "Setting Account",
          drawerIcon: ({ color }) => (
            <AntDesign name="setting" size={23} color={color} />
          ),
        }}
      />

    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={Splash_screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={DrawerNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="favorite"
          component={Favorite_address_screen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
