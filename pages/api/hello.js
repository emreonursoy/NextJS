
import md5 from 'md5'

export default async function getMarvelCharacters(offset) {
    let res
    let urls = []
    let data = []
    let skip = 0
    let ts = Date.now();
    let publicKey = "0a8f644b4d294b4f1d452372bb34e10a"
    let privateKey = "c8bec8a7577d2a80f6e7fba5e9697ea8fb4ee1c7"
    let hash = md5(ts + privateKey + publicKey)
    for (let i = 0; i < 2; i++) {
        urls.push(
            "https://gateway.marvel.com/v1/public/characters?orderBy=name&limit=100&offset=" + (offset + skip) + "&" + "ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash
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