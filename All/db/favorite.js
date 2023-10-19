import { getDatabase, ref, get, set, push } from "firebase/database";
import _ from "lodash";

export const removeFavoriteLocationByUsername = async (username, location, checkFavorite, setCheckFavorite, setImageFavorite) => {
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
  
            const existingLocation = _.find(
              favoriteLocations,
              (loc) => loc.locationAddress === location
            );
            if (existingLocation) {
              const existingLocationId = _.findKey(
                favoriteLocations,
                (data) => data.locationAddress === location
              );
              if (existingLocationId) {
                const locationRef = ref(
                  db,
                  `users/${userId}/favoriteLocations/${existingLocationId}`
                );
                await set(locationRef, null);
                setCheckFavorite(!checkFavorite);
                setImageFavorite(require("../image/heart_one.png"));
                return;
              }
            } else {
              setCheckFavorite(!checkFavorite);
              setImageFavorite(require("../image/heart_two.png"));
              return;
            }
          }
        }
      } catch (error) {
        console.error("Lỗi khi xóa dữ liệu:", error);
        throw error;
      }
};

export const addFavoriteLocationByUsername = async (username, location, checkFavorite, setCheckFavorite, setImageFavorite) => {
  
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
  
            const existingLocation = _.find(
              favoriteLocations,
              (loc) => loc.locationAddress === location
            );
            if (!existingLocation) {
              const newLocationRef = push(userFavoriteLocationsRef);
              await set(newLocationRef, { locationAddress: location });
              setCheckFavorite(!checkFavorite);
              setImageFavorite(require("../image/heart_two.png"));
              return;
            } else {
              setCheckFavorite(!checkFavorite);
              setImageFavorite(require("../image/heart_one.png"));
              return;
            }
          }
        }
      } catch (error) {
        console.error("Lỗi khi thêm dữ liệu:", error);
        throw error;
      }
};
export const checkIfLocationExists = async (userNameLogin, weatherDataForecast, setImageFavorite, setCheckFavorite) => {
    const db = getDatabase();
    const userRef = ref(db, "users");
    try {
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        const userId = _.findKey(
          users,
          (userData) => userData.username === userNameLogin
        );

        if (userId) {
          const userRef = ref(db, `users/${userId}/favoriteLocations`);
          const snapshot = await get(userRef);
          const favoriteLocations = snapshot.val();
          const existingLocation = _.find(
            favoriteLocations,
            (loc) =>
              loc.locationAddress === weatherDataForecast?.location?.name
          );

          if (existingLocation) {
            setImageFavorite(require("../image/heart_two.png"));
            setCheckFavorite(false);
          } else {
            setImageFavorite(require("../image/heart_one.png"));
            setCheckFavorite(true);
          }
        }
      }
    } catch (error) {
      console.error("Lỗi khi đọc dữ liệu:", error);
      throw error;
    }
};