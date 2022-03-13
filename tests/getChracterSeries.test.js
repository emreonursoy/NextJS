import { getCharacterSeries } from '../pages/api';

const OFFSET = 10
const CHARACTER_ID = 1009368

describe("Check we get character's series from api", () => {
    test("check if we have any series", async() => {
        const series = await getCharacterSeries(OFFSET, CHARACTER_ID);
        
        expect(series.numberOfSeries > 0).toBeTruthy();
    }, 10000);
});