import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, push, get, child } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWeatherForecast } from "../db/apiWeather";

const Favorite_address_screen = () => {
  const _ = require("lodash");
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const [userNameLogin, setUserNameLogin] = useState("null");
 

  
  const setWeatherImage = (conditionText) => {
    let imagePath = require("../image/cloudy.jpg"); // Set a default image path
  
    if (conditionText) {
      switch (conditionText.toLowerCase()) {
        case "partly cloudy":
          imagePath = require("../image/partly_cloudy.jpg");
          break;
        case "clear":
          imagePath = require("../image/clear.jpg");
          break;
        case "mist":
          imagePath = require("../image/mist.jpg");
          break;
        case "overcast":
          imagePath = require("../image/overcast.jpg");
          break;
        case "patchy rain possible":
        case "moderate rain":
        case "light rain":
          imagePath = require("../image/rainy.jpg");
          break;
        case "patchy light rain with thunder":
          imagePath = require("../image/rain_with_thunder.jpg");
          break;
        case "sunny":
          imagePath = require("../image/sunny.jpg");
          break;
        default:
          imagePath = require("../image/cloudy.jpg");
          break;
      }
    }
  
    return imagePath;
  };
  
  useEffect(() => {
    const getStoredUsername = async () => {
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

    getStoredUsername(); // Gọi hàm ở đây để nó tự chạy khi vào màn hình
  }, []);
  const getAllFavoriteLocationsByUsername = async (userNameLogin) => {
    try {
      const db = getDatabase();
      const userRef = ref(db, "users");
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        const userId = _.findKey(
          users,
          (userData) => userData.username === userNameLogin
        );
        if (userId) {
          const userFavoriteLocationsRef = ref(
            db,
            `users/${userId}/favoriteLocations`
          );
          const snapshotFavoriteLocations = await get(userFavoriteLocationsRef);
          const favoriteLocations = snapshotFavoriteLocations.val();
          return favoriteLocations;
        } else {
          return [];
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách địa điểm yêu thích:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const locationsData = await getAllFavoriteLocationsByUsername(
        userNameLogin
      );
      const locationsArray = Object.keys(locationsData).map((key) => ({
        id: key,
        locationAddress: locationsData[key].locationAddress,
      }));
      setFavoriteLocations(locationsArray);
    };
    fetchData();
  }, [userNameLogin]);

  const [weatherIcons, setWeatherIcons] = useState({});
  const [temperatures, setTemperatures] = useState({});
  const [status, setStatus] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      const weatherData = {};
      const temperatureData = {};
      const statusData = {};
      for (const location of favoriteLocations) {
        const data = await fetchWeatherForecast(location.locationAddress);
        weatherData[location.id] = data.forecast.forecastday["0"]["day"]['condition']['icon'];
        statusData[location.id] = data.forecast.forecastday["0"]["day"]['condition']['text'];
        temperatureData[location.id] = data.forecast.forecastday["0"]["day"]['avgtemp_c'];
        
      }
      setWeatherIcons(weatherData);
      setTemperatures(temperatureData);
      setStatus(statusData);
    };
    fetchWeatherData();
  }, [favoriteLocations]);

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteLocations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ImageBackground
            key={index}
            style={styles.backgroundImage}
            source={setWeatherImage(status[item.id])}
          >
            <View style={styles.topLeft}>
              <Text style={styles.textTopLeft}>{item.locationAddress}</Text>
            </View>
            <View style={styles.topRight}>
            <Image
                style={{ width: 60, height: 60 }}
                source={{
                  uri: weatherIcons[item.id]
                    ? "http:" + weatherIcons[item.id]
                    : null,
                }}
              />
            </View>
            <View style={styles.bottomLeft}>
            <Text style={styles.textBottomLeft}>{temperatures[item.id]}°C</Text>
            </View>
            <View style={styles.bottomRight}>
              <Image
                style={styles.smallImage}
                source={require("../image/delete.png")}
              />
            </View>
          </ImageBackground>
        )}
        ListEmptyComponent={() => <Text>No favorite locations found</Text>}
      />
    </View>
  );
};

export default Favorite_address_screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  backgroundImage: {
    height: 200,
    justifyContent: "center",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 5,
  },
  topLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 10,
  },
  topRight: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  bottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingHorizontal: 10,
  },
  bottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 10,
  },
  textTopLeft: {
    color: "white",
    fontSize: 25,
    fontWeight: "500",
  },
  textBottomLeft: {
    color: "white",
    fontWeight: "200",
    fontSize: 50,
  },
  smallImage: {
    width: 40,
    height: 40,
  },
});
