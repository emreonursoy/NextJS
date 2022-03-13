
import md5 from 'md5'

const baseUrl = "https://gateway.marvel.com/v1/public/characters"
const ts = Date.now();
const hash = md5(ts + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY)

export async function getMarvelCharacters(offset) {
    let res
    let urls = []
    let data = []
    let skip = 0
    for (let i = 0; i < 2; i++) {
        urls.push(
            baseUrl + "?orderBy=name&limit=100&offset=" + (offset + skip) + "&" + "ts=" + ts + "&apikey=" + process.env.PUBLIC_KEY + "&hash=" + hash
        )
        skip = skip + 100
    }
    for (let i = 0; i < 2; i++) {
        res = await fetch(urls[i])
        data[i] = await res.json()
    }
    const numberOfCharacters = data[0].data.total
    const mergedResult = [...data[0].data.results, ...data[1].data.results]
    const returnElement = {
        data: mergedResult,
        numberOfCharacters: numberOfCharacters
    }
    return returnElement
}

export async function getMarvelCharactersSearchResult(offset, nameStartsWith) {
    if(nameStartsWith.length > 0) {
        let res
        let urls = []
        let data = []
        let skip = 0
        for (let i = 0; i < 2; i++) {
            urls.push(
                baseUrl + "?nameStartsWith=" + nameStartsWith + "&orderBy=name&limit=100&offset=" + (offset + skip) + "&" + "ts=" + ts + "&apikey=" + process.env.PUBLIC_KEY + "&hash=" + hash
            )
            skip = skip + 100
        }
        for (let i = 0; i < 2; i++) {
            res = await fetch(urls[i])
            data[i] = await res.json()
        }
        const numberOfCharacters = data[0].data.total
        const mergedResult = [...data[0].data.results, ...data[1].data.results]
    
        let returnElement = {
            data: mergedResult,
            numberOfCharacters: numberOfCharacters
        }
        return returnElement
    }
    else {
        let returnElement = {
            data: [],
            numberOfCharacters: 0
        }
        return returnElement
    }
    
}

export async function getCharacterComics(offset, characterId) {
    const url = baseUrl + "/" + characterId + "/comics?" + "orderBy=onsaleDate&limit=100&offset=" + offset + "&" + "ts=" + ts + "&apikey=" + process.env.PUBLIC_KEY + "&hash=" + hash
    const res = await fetch(url)
    const data = await res.json()
    const numberOfComics = data.data.total
    const result = data.data.results
    const returnElement = {
        data: result,
        numberOfSeries: numberOfComics
    }
    return returnElement
}

export async function getCharacterSeries(offset, characterId) {
    const url = baseUrl + "/" + characterId + "/series?" + "orderBy=startYear&limit=100&offset=" + offset + "&" + "ts=" + ts + "&apikey=" + process.env.PUBLIC_KEY + "&hash=" + hash
    const res = await fetch(url)
    const data = await res.json()
    const numberOfSeries = data.data.total
    const result = data.data.results
    const returnElement = {
        data: result,
        numberOfSeries: numberOfSeries
    }
    return returnElement
}