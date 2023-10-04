import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
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



const CustomHeader = () => {
  const [Data, setData] = useState(null);

  useEffect(() => {
      // Lấy dữ liệu từ AsyncStorage
      AsyncStorage.getItem('Data_User', (error, result) => {
        if (!error) {
          const user = JSON.parse(result);
          setData(user);
        } else {
          console.log('Error reading data from AsyncStorage: ' + error);
        }
      });
      
    }, []);


  return (

    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',

      }}>
      <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={require('./All/image/snowy.jpg')}>

      </Image>
      <Text
        style={{ fontSize: 20, color: 'rgba(0, 0, 0 , 0.5)', marginTop: 20 }}>{Data == null ? 'User ' : Data.userFullName
        }</Text>

        

      <View style={{ backgroundColor: 'black', height: 1, width: 400, marginTop: 20, marginBottom: 10 }}>

      </View>
    </View>


  )
};

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (


  <DrawerContentScrollView {...props}>
    <CustomHeader />
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

function DrawerNav() {

  return (

    <Drawer.Navigator screenOptions={{}}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name='homeA'
        component={Home_screen}
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          drawerIcon: () => (
            <Ionicons name='home-outline' size={23} color="black" />
          )
        }} />

      <Drawer.Screen name='Setting'
        component={Setting}
        options={{
          drawerLabel: 'Setting Account',
          title: 'Setting Account',
          drawerIcon: () => (
            <AntDesign name='setting' size={23} color="black" />
          )
        }} />


    </Drawer.Navigator>

  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (



    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='splash'
          component={Splash_screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='signup'
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='home'
          component={DrawerNav}
          options={{ headerShown: false }}
        />



      </Stack.Navigator>

    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});