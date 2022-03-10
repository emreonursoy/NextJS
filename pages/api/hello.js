
import md5 from 'md5'

export default async function getMarvelCharacters(offset) {
    console.log(offset)
    let res = ""
    let urls = []
    let skip = 0
    let numberOfCharacters = 0
    let ts = Date.now();
    let publicKey = "0a8f644b4d294b4f1d452372bb34e10a"
    let privateKey = "c8bec8a7577d2a80f6e7fba5e9697ea8fb4ee1c7"
    let hash = md5(ts+privateKey+publicKey)
    for(let i=0; i<2; i++){
        urls.push(
            "https://gateway.marvel.com/v1/public/characters?orderBy=name&limit=100&offset=" + (offset+skip) + "&" + "ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash
        )
        skip = skip + 100
    }
    console.log(urls)
    res = await fetch(urls[0])
    const data1 = await res.json()
    let returnData1 = data1.data.results

    res = await fetch(urls[1])
    const data2 = await res.json()
    let returnData2 = data2.data.results

    numberOfCharacters = data1.data.total
    const mergedResult = returnData1.concat(returnData2)

    let returnElement = {
        data: mergedResult,
        numberOfCharacters: numberOfCharacters
    }
    
    return returnElement
}