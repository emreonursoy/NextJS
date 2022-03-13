import { getMarvelCharactersSearchResult } from '../pages/api';

const OFFSET = 10
const SEARCH_INPUT = "Iron Man"

describe("Check we get searched characters from api", () => {
    test("check if we have any characters", async() => {
        const characters = await getMarvelCharactersSearchResult(OFFSET, SEARCH_INPUT);
        console.log(characters)
        expect(characters.numberOfCharacters > 0).toBeTruthy();
    }, 10000);
});