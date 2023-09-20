import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './All/views/Login_user';
import Splash_screen from './All/views/Splash_screen';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name = 'Màn hình chào' component={Splash_screen} options={{headerShown:false}}  />
        <Stack.Screen name = 'Đăng nhập' component={LoginScreen} options={{headerShown:false}}  />
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
