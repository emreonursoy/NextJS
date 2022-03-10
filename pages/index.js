import Head from 'next/head'
import styles from '../styles/Home.module.css'
import getMarvelCharacters from './api/hello'
import { Grid, Loading } from '@nextui-org/react'
import { MockItem } from '../components/MockItem'
import { useEffect, useState } from 'react'
import { createCharacterBasic } from '../helpers/helper'
import InfiniteScroll from "react-infinite-scroll-component";

const GridItem = (characters) => {
  return (
    <Grid.Container gap={2} justify="center" >
      {
        characters.map(element => {
          return(
            <Grid xs={4} md={2} lg={1.2} xl={1.2}><MockItem key={element.id} element={element} /></Grid>
          )
        })
      }      
    </Grid.Container>
  )
}

export default function Home({characterData, numberOfCharacters}) {
  const [offset, setOffset] = useState(2)
  const [characters, setCharacters] = useState(characterData);
  const [hasMore, setHasMore] = useState(true);

  const getMoreCharacters = async () => {
    let characterData = []
    let data = await getMarvelCharacters(offset);

    data.data.forEach(element => {
      characterData.push(createCharacterBasic(element))
    })
    setCharacters((characters) => [...characters, ...characterData]);
    let newOffset = offset + 2
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

  let data = await getMarvelCharacters(0);
  
  data.data.forEach(element => {
    characterData.push(createCharacterBasic(element))
  })
  let numberOfCharacters = data.numberOfCharacters
  return { props: { characterData, numberOfCharacters }, };
}