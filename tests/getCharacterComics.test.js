import { getCharacterComics } from '../pages/api';

const OFFSET = 10
const CHARACTER_ID = 1009368

describe("Check we get character's comics from api", () => {
    test("check if we have any comics", async() => {
        const series = await getCharacterComics(OFFSET, CHARACTER_ID);
        
        expect(series.numberOfSeries > 0).toBeTruthy();
    }, 10000);
});