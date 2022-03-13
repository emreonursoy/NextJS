import { getMarvelCharacters } from "../pages/api";

const OFFSET = 10;

describe("Check we get characters from api", () => {
  test("check if we have any characters", async () => {
    // Arrange
    global.fetch = jest.fn(() =>
      Promise.resolve({
        // status: 200,
        // statusText: "OK",

        json: () =>
          Promise.resolve({
            data: {
              results: [],
              total: 10,
            },
          }),
      })
    );

    // Act
    const characters = await getMarvelCharacters(OFFSET);

    // Assert
    expect(characters.numberOfCharacters).toBe(10);
    expect(global.fetch).toBeCalledTimes(2);
  });
});
