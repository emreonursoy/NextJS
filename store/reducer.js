import { actionTypes } from "./actionTypes";
import { createCharacterBasic } from "../helpers";

// REDUCERS
export const reducer = (state = dataInitialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_DATA:
      const { data, numberOfCharacters } = action.payload;

      const basicData = data.map(createCharacterBasic);

      return {
        ...state,
        characters: [...state.characters, ...basicData],
        totalCount: numberOfCharacters,
      };
    case actionTypes.LOADING_DATA_FAILURE:
      return { ...state, error: true };
    default:
      return state;
  }
};
