import Place from "../models/place";
import { ADD_PLACE, SET_PLACES } from "./places-actions";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        places: action.places.map(
          (pl) =>
            new Place(pl.id, pl.title, pl.imageUri, pl.address, pl.lat, pl.lng)
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placesData.id.toString(),
        action.placesData.title,
        action.placesData.image,
        action.placesData.address,
        action.placesData.coords.lat,
        action.placesData.coords.lng
      );
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
