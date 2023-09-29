import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import LoginScreen from './All/views/Login_user';
import Splash_screen from './All/views/Splash_screen';
import SignupScreen from './All/views/Signup_user';
import Home_screen from './All/views/Home_screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerItemList, createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';


const CustomHeader = () => (
  <View
    style={{
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'lightblue'
    }}>
    <Text 
    style={{ fontSize: 20 }}>Custom Header</Text>
  </View>
);

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
