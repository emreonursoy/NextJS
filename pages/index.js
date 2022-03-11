import Head from 'next/head'
import styles from '../styles/Home.module.css'
import getMarvelCharacters from './api/hello'
import { Grid, Loading } from '@nextui-org/react'
import { MockItem } from '../components/MockItem'
import { useEffect, useState } from 'react'
import { createCharacterBasic } from '../helpers/helper'
import InfiniteScroll from "react-infinite-scroll-component";
import Image from 'next/image'

import { useSelector, useDispatch } from 'react-redux'
import { loadData, loadingDataFailure } from '../store'


const GridItem = (characters) => {
  return (
    <Grid.Container gap={2} justify="center" >
      {
        characters.map(element => {
          return(
            <MockItem key={element.id} element={element} />
          )
        })
      }      
    </Grid.Container>
  )
}

export default function Home({characterData, dataCount}) {
  const dispatch = useDispatch()
  const [offset, setOffset] = useState(200)
  const [characters, setCharacters] = useState(characterData);
  const [hasMore, setHasMore] = useState(true);
  const [numberOfCharacters, setNumberOfCharacters] = useState(dataCount)

  dispatch(loadData(characterData))
  const data = useSelector((state) => state.data)
  const error = useSelector((state) => state.error)
  

  const getMoreCharacters = async () => {
    let characterData = []
    let data = await getMarvelCharacters(offset);

    data.data.forEach(element => {
      characterData.push(createCharacterBasic(element))
    })
    let newData = characters.concat(characterData)
    setCharacters(newData)
    dispatch(loadData(newData))
    let newOffset = offset + 200
    setOffset(newOffset)
  }

  useEffect(() => {
    setHasMore(numberOfCharacters > characters.length ? true : false);
  }, [characters]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Marvel Characters</title>
        <meta name="description" content="Marvel Characters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
          
      </header>

      <main className={styles.main}>
        {
          <InfiniteScroll
          dataLength={numberOfCharacters}
          next={getMoreCharacters}
          hasMore={hasMore}
          loader={<div style={{ textAlign: "center"}}><Loading>Loading</Loading></div>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
        {GridItem(characters)}
          
        </InfiniteScroll>
        }
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  let characterData = []

  let marvelData = await getMarvelCharacters(0);
  
  marvelData.data.forEach(element => {
    characterData.push(createCharacterBasic(element))
  })
  let dataCount = marvelData.numberOfCharacters
  return { props: { characterData, dataCount }, };
}