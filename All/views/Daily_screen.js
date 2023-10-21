import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { styles } from "../css/styleHome";
import moment from "moment";
import { ScrollView } from "react-native";
const Daily_screen = ({ navigation, route }) => {
  const { data, date } = route.params;
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        paddingHorizontal: 16,
      }}
    >
      {/*Tiêu đề*/}
      <View
        style={{
          flexDirection: "row",
          height: "7%",
          width: "100%",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <FontAwesome5 name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
        <Text style={{ marginStart: 20, fontSize: 20, fontWeight: "500" }}>
          {date}
        </Text>
      </View>
      <ScrollView>
        <View
          style={{ flexDirection: "row", alignSelf: "center", marginTop: 20 }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: "http:" + data.day["condition"]["icon"] }}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 50 }}>{data.day["avgtemp_c"]}</Text>
            <Text style={{ fontSize: 30 }}>°C</Text>
          </View>
        </View>
        <Text style={{ textAlign:'center',fontSize: 20, color: "#454141", marginTop: 10 }}>
          {data.day["condition"]["text"]}
        </Text>
        <Text
          style={{
            fontSize: 25,
            marginTop: 20,
            fontWeight: "500",
            marginBottom: 10,
          }}
        >
          Detail
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            borderBottomWidth: 0.8,
            paddingBottom: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Max temperature</Text>
          <Text style={{ fontSize: 22, color: "red" }}>
            {data.day["maxtemp_c"]} °C
          </Text>
        </View>
        <View style={styless.containerDetail}>
          <Text style={{ fontSize: 18 }}>Min temperature</Text>
          <Text style={{ fontSize: 22, color: "#33CCFF" }}>
            {data.day["mintemp_c"]} °C
          </Text>
        </View>
        <View style={styless.containerDetail}>
          <Text style={{ fontSize: 18 }}>Avg humidity</Text>
          <Text style={{ fontSize: 22, color: "#1843DC" }}>
            {data.day["avghumidity"]}%
          </Text>
        </View>
        <View style={styless.containerDetail}>
          <Text style={{ fontSize: 18 }}>Rain probability</Text>
          <Text style={{ fontSize: 22, color: "#1843DC" }}>
            {data.day["daily_chance_of_rain"]}%
          </Text>
        </View>
        <View style={styless.containerDetail}>
          <Text style={{ fontSize: 18 }}>Max wind</Text>
          <Text style={{ fontSize: 22 }}>{data.day["maxwind_kph"]} km/h</Text>
        </View>
        <View style={styless.containerDetail}>
          <Text style={{ fontSize: 18 }}>Avg visibility</Text>
          <Text style={{ fontSize: 22 }}>{data.day["avgvis_km"]} km</Text>
        </View>
        <View style={styless.containerDetail}>
          <Text style={{ fontSize: 18 }}>UV index</Text>
          <Text style={{ fontSize: 22 }}>{data.day["uv"]}</Text>
        </View>
        {/* Mặt trời và mặt trăng */}
        <Text
          style={{
            fontSize: 25,
            marginTop: 10,
            fontWeight: "500",
            marginBottom: 10,
          }}
        >
          Sun & Moon
        </Text>
        <View
          style={{
            width: "100%",
            backgroundColor: "#eeeeee",
            padding: 10,
            borderRadius: 5,
            marginBottom: 20,
            flexDirection: "row",
          }}
        >
          {/* Mặt trời */}
          <View style={{ width: "50%", borderRightWidth: 1, paddingEnd: 10 }}>
            <View
              style={styles.containerSunMoon}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Sunrire</Text>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {moment(data["astro"]["sunrise"], "hh:mmA").format("HH:mm")}
              </Text>
            </View>
            <View
              style={styles.containerSunMoon}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Sunset</Text>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {moment(data["astro"]["sunset"], "hh:mmA").format("HH:mm")}
              </Text>
            </View>
          </View>
          {/* Mặt trăng */}
          <View style={{ width: "50%", paddingStart: 10 }}>
            <View
              style={styles.containerSunMoon}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Moonrire</Text>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {moment(data["astro"]["moonrise"], "hh:mmA").format("HH:mm")}
              </Text>
            </View>
            <View
              style={styles.containerSunMoon}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Moonset</Text>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {moment(data["astro"]["moonset"], "hh:mmA").format("HH:mm")}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Daily_screen;

const styless = StyleSheet.create({
  containerDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    borderBottomWidth: 0.8,
    paddingBottom: 10,
  },
});
