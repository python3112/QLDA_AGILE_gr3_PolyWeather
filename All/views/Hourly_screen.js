import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { FlatList } from "react-native";
import moment from "moment";
import { Image } from "react-native";

const Hourly_screen = ({ route, navigation }) => {
  const { data } = route.params;
  return (
    <View style={{ flex: 1, width: "100%", paddingHorizontal: 16 }}>
      {/*Tiêu đề*/}
      <View
        style={{
          flexDirection: "row",
          height: "7%",
          width: "100%",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity onPress={() => navigation.replace("home")}>
          <FontAwesome5 name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
        <Text style={{ marginStart: 20, fontSize: 20, fontWeight: "500" }}>
          Next 24 Hours
        </Text>
      </View>
      {/* Danh sách */}
      <View style={{ flex: 1, marginTop: 20, width: "100%" }}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                paddingVertical:5,
                width: "100%",
                flexDirection: "row",
                marginBottom: 7,
                backgroundColor: "#F7E4D4",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "gray",
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 5,
              }}
              key={index}
            >
              <View
                style={{
                  width: "30%",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Image
                  style={{ width: 60, height: 60 }}
                  source={{ uri: "http:" + item.condition.icon }}
                />
                <Text style={{ marginTop: -10, fontSize: 20, color: "red",fontWeight:'bold' }}>
                  {item.temp_c}°C
                </Text>
                <Text style={{ fontSize: 20, color: "#33CCFF" }}>
                  {item.will_it_rain}%
                </Text>
              </View>
              <View style={{ width: "70%" }}>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  {moment(item.time).format("HH:mm")}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>{item["condition"]["text"]}</Text>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>Humidity: {item.humidity}%</Text>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>Feels Like: {item.feelslike_c}°C</Text>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>Speeed Wind: {item.wind_kph} km/h</Text>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>UV Index: {item.uv}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Hourly_screen;

const styles = StyleSheet.create({});
