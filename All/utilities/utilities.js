import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, get } from "firebase/database";

export const checkLogin = async (username, password, setIsVisible, settextErr, navigation,addressNow,getLocation) => {
  if(!addressNow){
    console.log("Địa chỉ null");
    getLocation();
    return;
  }
  try {
    const db = getDatabase();
    
    const userRef = ref(db, "users");

    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const users = snapshot.val();
      // Kiểm tra tài khoản có tồn tại không
      const user = Object.values(users).find(
        (userData) => userData.username === username,
      );
      //Kiểm tra mật khẩu
      if (user) {
        //Mật khẩu đúng => Chuyển sang màn hình Home
        if (user.password === password) {
          try {
            const jsonValue = JSON.stringify(user);
            await AsyncStorage.setItem('Data_User', jsonValue);
          } catch (e) {
            console.log("lưu data lỗi :" + e);
          }
          navigation.replace('home', { userNameLogin: username,addressNow: addressNow });
        } else {
          setIsVisible(true);
          settextErr('Wrong password !');
        }
      } else {
        setIsVisible(true);
        settextErr('Account does not exist !');
      }
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error reading data: ", error);
  }
};
export const getStoredUsername = async (setUserNameLogin) => {
  try {
    const jsonValue = await AsyncStorage.getItem("Data_User");
    if (jsonValue !== null) {
      const data = JSON.parse(jsonValue);
      if (data.username) {
        setUserNameLogin(data.username);
      }
    } else {
      console.log("Không tìm thấy dữ liệu.");
      return null;
    }
  } catch (e) {
    console.log("Lỗi khi đọc dữ liệu: ", e);
    return null;
  }
};
export const getHourlyForecast = (weatherDataForecast) => {
  const currentTime = moment();
  const startDateTime = currentTime.clone().add(0, "hour");
  const endDateTime = currentTime.clone().add(23, "hours");

  const filteredHourlyForecast =
    weatherDataForecast?.forecast?.forecastday[0]?.hour?.filter((hourData) => {
      const hourDateTime = moment(hourData.time);
      return hourDateTime.isBetween(startDateTime, endDateTime);
    });

  if (filteredHourlyForecast && filteredHourlyForecast.length < 24) {
    const nextDayForecast = weatherDataForecast?.forecast?.forecastday[1]?.hour;
    if (
      nextDayForecast &&
      nextDayForecast.length >= 24 - filteredHourlyForecast.length
    ) {
      const additionalHours = nextDayForecast.slice(
        0,
        24 - filteredHourlyForecast.length
      );
      filteredHourlyForecast.push(...additionalHours);
    }
  }
  return filteredHourlyForecast;
};

export const calculateSunMoon = (startTime, endTime) => {
  const start = moment(startTime, "hh:mmA");
  const end = moment(endTime, "hh:mmA");
  const duration = moment.duration(end.diff(start));

  const hours = duration.hours();
  const minutes = duration.minutes();

  return { hours, minutes };
};

export const getImagePath = (conditionText) => {
  let imagePath = "";

  switch (conditionText) {
    // Ít mây
    case "partly cloudy":
      imagePath = require("../image/partly_cloudy.jpg");
      break;
    case "clear":
      imagePath = require("../image/clear.jpg");
      break;
    // Sương mù
    case "mist":
      imagePath = require("../image/mist.jpg");
      break;
    // Âm u overcast
    case "overcast":
      imagePath = require("../image/overcast.jpg");
      break;
    // Mưa rải rác Moderate rain
    case "patchy rain possible":
    case "moderate rain":
    case "light rain":
      imagePath = require("../image/rainy.jpg");
      break;
    // Mưa và sấm sét
    case "patchy light rain with thunder":
      imagePath = require("../image/rain_with_thunder.jpg");
      break;
    // Nắng
    case "sunny":
      imagePath = require("../image/sunny.jpg");
      break;

    default:
      imagePath = require("../image/cloudy.jpg");
      break;
  }

  return imagePath;
};
