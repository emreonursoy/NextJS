
export function createCharacterBasic(element) {
  return {
    id: element.id,
    name: element.name,
    thumbnail: element.thumbnail,
    comics: element.comics,
    description: element.description,
    series: element.series,
    url: element.urls[0]["url"],
  }
}

export function createComicsBasic(element) {
  return {
    id: element.id,
    name: element.title,
  }
}