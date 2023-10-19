import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getDatabase, ref, set, push, get, child } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWeatherForecast } from "../db/apiWeather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { styles } from "../css/styleFavorite";
import { getStoredUsername } from "../utilities/utilities";

const Favorite_address_screen = (props) => {
  const { navigation, route } = props;
  const { userNameLogin } = route.params;
  const _ = require("lodash");
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const [weatherIcons, setWeatherIcons] = useState({});
  const [temperatures, setTemperatures] = useState({});
  const [status, setStatus] = useState({});
  const [isVisibleYT, setIsVisibleYT] = useState(false);
  const [addressYT, setAddressYT] = useState("");

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (favoriteLocations.length > 0) {
      fetchWeatherData();
    }
  }, [favoriteLocations]);
  // Thay đổi ảnh theo thời tiết
  const setWeatherImage = (conditionText) => {
    let imagePath = require("../image/cloudy.jpg");
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
  // Lấy ra địa điểm yêu thích theo username
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
          const favoriteLocations = await snapshotFavoriteLocations.val();
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
  const fetchData = async () => {
    let locationsData = await getAllFavoriteLocationsByUsername(userNameLogin);

    while (Array.isArray(locationsData) && !locationsData.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      locationsData = await getAllFavoriteLocationsByUsername(userNameLogin);
    }

    if (locationsData) {
      const locationsArray = Object.keys(locationsData).map((key) => ({
        id: key,
        locationAddress: locationsData[key].locationAddress,
      }));
      setFavoriteLocations(locationsArray);
    } else {
      console.log("locationsData is null");
    }
  };

  const fetchWeatherData = async () => {
    const weatherData = {};
    const temperatureData = {};
    const statusData = {};
    for (const location of favoriteLocations) {
      const data = await fetchWeatherForecast(location.locationAddress);
      weatherData[location.id] =
        data.forecast.forecastday["0"]["day"]["condition"]["icon"];
      statusData[location.id] =
        data.forecast.forecastday["0"]["day"]["condition"]["text"];
      temperatureData[location.id] =
        data.forecast.forecastday["0"]["day"]["avgtemp_c"];
    }
    setWeatherIcons(weatherData);
    setTemperatures(temperatureData);
    setStatus(statusData);
  };

  // Xóa địa điểm yêu thích
  const removeFavoriteLocationByUsername = async (username) => {
    try {
      const db = getDatabase();
      const userRef = ref(db, "users");
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        const userId = _.findKey(
          users,
          (userData) => userData.username === username
        );

        if (userId) {
          const userFavoriteLocationsRef = ref(
            db,
            `users/${userId}/favoriteLocations`
          );
          const snapshotFavoriteLocations = await get(userFavoriteLocationsRef);
          const favoriteLocations = snapshotFavoriteLocations.val();

          const existingLocationId = Object.keys(favoriteLocations).find(
            (key) => favoriteLocations[key].locationAddress === addressYT
          );

          if (existingLocationId) {
            const locationRef = ref(
              db,
              `users/${userId}/favoriteLocations/${existingLocationId}`
            );
            await set(locationRef, null);

            // Xóa phần tử đã bị xóa khỏi mảng favoriteLocations
            const updatedFavoriteLocations = Object.keys(favoriteLocations)
              .filter((key) => key !== existingLocationId)
              .map((key) => ({
                id: key,
                locationAddress: favoriteLocations[key].locationAddress,
              }));
            setFavoriteLocations(updatedFavoriteLocations);
            closeModalYT();
          }
        }
      }
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
      throw error;
    }
  };
  const nextScreen = (address) => {
    navigation.navigate('homeA',{locationAddressFr: address});
  };
  // Mở đóng modal yêu thích
  const openModalYT = (address) => {
    setAddressYT(address);
    setIsVisibleYT(true);
  };
  const closeModalYT = () => {
    setIsVisibleYT(false);
  };
  // Xác nhận xóa
  const confirmDelete = () => {
    removeFavoriteLocationByUsername(userNameLogin);
  };
  return (
    <View style={styles.container}>
      {favoriteLocations.length ? (
        <>
          <FlatList
            data={favoriteLocations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              if (
                !status ||
                !temperatures ||
                !weatherIcons ||
                !status[item.id] ||
                !temperatures[item.id] ||
                !weatherIcons[item.id]
              ) {
                return (
                  <View
                    style={{
                      flex: 1,
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator size="large" color="orange" />
                  </View>
                );
              }

              return (
                <ImageBackground
                  key={index}
                  style={styles.backgroundImage}
                  source={setWeatherImage(status[item.id])}
                >
                  <TouchableOpacity
                    style={styles.topLeft}
                    onPress={() => nextScreen(item.locationAddress)}
                  >
                    <Text style={styles.textTopLeft}>
                      {item.locationAddress}
                    </Text>
                  </TouchableOpacity>

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
                    <Text style={styles.textBottomLeft}>
                      {temperatures[item.id]}°C
                    </Text>
                  </View>
                  <View style={styles.bottomRight}>
                    <TouchableOpacity
                      style={styles.smallImage}
                      onPress={() => openModalYT(item.locationAddress)}
                    >
                      <Image
                        style={styles.smallImage}
                        source={require("../image/delete.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              );
            }}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size="large" color="orange" />
              </View>
            )}
          />
        </>
      ) : (
        <View style={styles.centeredView}>
          <Image
            source={require("../image/smile.png")}
            style={styles.imageStyle}
          />
          <Text style={styles.noFavoriteText}>
            You don't have any favorite places yet
          </Text>
        </View>
      )}

      {/* Modal xóa địa điểm yêu thích */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisibleYT}
        onRequestClose={closeModalYT}
      >
        <View style={styles.containerModal}>
          <View style={styles.viewModal}>
            <View style={styles.headerModal}>
              <FontAwesome5
                name="exclamation-triangle"
                size={30}
                color="white"
                style={{ marginStart: 10 }}
              />
              <Text style={styles.textHeaderModal}>Message</Text>
            </View>
            <View style={styles.bodyModal}>
              <Text style={{ fontSize: 16 }}>
                {"Are you sure to delete the address " + addressYT + "?"}
              </Text>
            </View>
            <View style={styles.footerModal}>
              <TouchableOpacity onPress={closeModalYT} style={styles.btnModal}>
                <Text style={{ textAlign: "center" }}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete} style={styles.btnModal}>
                <Text style={{ textAlign: "center" }}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Favorite_address_screen;
