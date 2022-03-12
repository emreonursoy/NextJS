
import md5 from 'md5'

const baseUrl = "https://gateway.marvel.com/v1/public/characters"
const ts = Date.now();
const publicKey = "0a8f644b4d294b4f1d452372bb34e10a"
const privateKey = "c8bec8a7577d2a80f6e7fba5e9697ea8fb4ee1c7"
const hash = md5(ts + privateKey + publicKey)

export async function getMarvelCharacters(offset) {
    let res
    let urls = []
    let data = []
    let skip = 0

    for (let i = 0; i < 2; i++) {
        urls.push(
            baseUrl + "?orderBy=name&limit=100&offset=" + (offset + skip) + "&" + "ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash
        )
        skip = skip + 100
    }

    for (let i = 0; i < 2; i++) {
        res = await fetch(urls[i])
        data[i] = await res.json()
    }

    let numberOfCharacters = data[0].data.total
    const mergedResult = data[0].data.results.concat(data[1].data.results)

    let returnElement = {
        data: mergedResult,
        numberOfCharacters: numberOfCharacters
    }

    return returnElement
}

export async function getMarvelCharactersSearchResult(offset, nameStartsWith) {
    let res
    let urls = []
    let data = []
    let skip = 0

    for (let i = 0; i < 2; i++) {
        urls.push(
            baseUrl + "?nameStartsWith=" + nameStartsWith + "&orderBy=name&limit=100&offset=" + (offset + skip) + "&" + "ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash
        )
        skip = skip + 100
    }

    for (let i = 0; i < 2; i++) {
        res = await fetch(urls[i])
        data[i] = await res.json()
    }

    let numberOfCharacters = data[0].data.total
    const mergedResult = data[0].data.results.concat(data[1].data.results)

    let returnElement = {
        data: mergedResult,
        numberOfCharacters: numberOfCharacters
    }

    return returnElement
}

export async function getCharacterComics(offset, characterId) {
    console.log(offset)
    
    const url = baseUrl + "/" + characterId + "/comics?" + "orderBy=onsaleDate&limit=100&offset=" + offset + "&" + "ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash

    const res = await fetch(url)
    const data = await res.json()

    const numberOfComics = data.data.total
    const result = data.data.results

    let returnElement = {
        data: result,
        numberOfSeries: numberOfComics
    }

    console.log(returnElement)

    return returnElement
}

export async function getCharacterSeries(offset, characterId) {
    console.log(offset)
    
    const url = baseUrl + "/" + characterId + "/series?" + "orderBy=startYear&limit=100&offset=" + offset + "&" + "ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash

    const res = await fetch(url)
    const data = await res.json()

    const numberOfSeries = data.data.total
    const result = data.data.results

    let returnElement = {
        data: result,
        numberOfSeries: numberOfSeries
    }

    console.log(returnElement)

    return returnElement
}