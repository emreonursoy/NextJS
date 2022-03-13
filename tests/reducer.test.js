import { reducer } from "../store/reducer";
import { actionTypes } from "../store/actionTypes";

describe("reducer tests", () => {
  it("should add characters to the store", () => {
    // Arrange
    const initialState = {
      something: "else",
      totalCount: 0,
      characters: [],
    };

    const action = {
      type: actionTypes.LOAD_DATA,
      payload: {
        numberOfCharacters: 1,
        data: [
          {
            id: 0,
            name: "name",
            thumbnail: "thumbnail",
            comics: [],
            description: "description",
            series: [],
            urls: [{ url: "url" }],
          },
        ],
      },
    };

    // Act
    const resultState = reducer(initialState, action);

    // Assert
    expect(resultState.characters.length).toBe(1);
    expect(resultState.totalCount).toBe(1);
    expect(resultState.something).toBe("else"); // rest of the state should not change
  });

  it("should add characters on top of existing ones in the store", () => {
    // Arrange
    const initialState = {
      totalCount: 1,
      characters: [
        {
          id: 0,
          name: "name",
          thumbnail: "thumbnail",
          comics: [],
          description: "description",
          series: [],
          url: "url",
        },
      ],
    };

    const action = {
      type: actionTypes.LOAD_DATA,
      payload: {
        numberOfCharacters: 10,
        data: [
          {
            id: 1,
            name: "name1",
            thumbnail: "thumbnail1",
            comics: [],
            description: "description1",
            series: [],
            urls: [{ url: "url1" }],
          },
        ],
      },
    };

    // Act
    const resultState = reducer(initialState, action);

    // Assert
    expect(resultState.characters.length).toBe(2);
  });

  it("should set error true when LOADING_DATA_FAILURE dispatched", () => {
    // Arrange
    const initialState = {
      error: false,
    };

    const action = {
      type: actionTypes.LOADING_DATA_FAILURE,
    };

    // Act
    const resultState = reducer(initialState, action);

    // Assert
    expect(resultState.error).toBe(true);
  });
});
