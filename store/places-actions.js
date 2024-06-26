import * as FileSystem from "expo-file-system";

import { fetchPlaces, insertPlace } from "../helpers/db";
import ENV from "../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("Something Went Wrong");
    }

    const resData = await response.json();

    if (!resData.results) {
      throw new Error("Something Went Wrong");
    }

    // const address = resData.results[0].formatted_address;
    const address = "Santa Cruz de Tenerife, Spain";

    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      console.log(dbResult);
    } catch (err) {
      console.log(err);
      throw err;
    }

    dispatch({
      type: ADD_PLACE,
      placesData: {
        id: dbResult.insertId,
        title: title,
        image: newPath,
        address: address,
        coords: {
          lat: location.lat,
          lng: location.lng,
        },
      },
    });
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      console.log(dbResult);
      dispatch({
        type: SET_PLACES,
        places: dbResult.rows._array,
      });
    } catch (error) {
      throw error;
    }
  };
};
