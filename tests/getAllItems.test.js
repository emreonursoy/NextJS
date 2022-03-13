import { getMarvelCharacters } from '../pages/api';

const OFFSET = 10

describe("Check we get characters from api", () => {
    test("check if we have any characters", async() => {
        const characters = await getMarvelCharacters(OFFSET);

        expect(characters.numberOfCharacters > 0).toBeTruthy();
    }, 10000);
});