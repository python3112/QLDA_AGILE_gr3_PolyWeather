import { getApps, initializeApp } from "firebase/app";
import { } from "firebase/firestore";
import { } from "firebase/functions";
import { } from "firebase/storage";


export default function firebase() {
 
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
        console.log("Kết nối  firebase thành công");
      }




}