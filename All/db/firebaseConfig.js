import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});