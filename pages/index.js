import Head from 'next/head'
import styles from '../styles/Home.module.css'
import getMarvelCharacters from './api/hello'
import { Grid, Loading, Text, Input, Row } from '@nextui-org/react'
import { MockItem } from '../components/MockItem'
import { useEffect, useState } from 'react'
import { createCharacterBasic } from '../helpers/helper'
import Image from 'next/image'
import { GiSpiderMask } from "react-icons/gi";
import { useSelector, useDispatch } from 'react-redux'
import { loadData, loadingDataFailure } from '../store'
import icon from '../public/spiderman.png'
import { DebounceInput } from 'react-debounce-input'
import InfiniteScroll from 'react-infinite-scroller';

const GridItem = (characters) => {
  return (
    <Grid.Container gap={2} justify="center" >
      {
        characters.map(element => {
          return (
            <MockItem key={element.id} element={element} />
          )
        })
      }
    </Grid.Container>
  )
}

export default function Home({ characterData, dataCount }) {
  console.log(dataCount)
  const dispatch = useDispatch()
  const [characters, setCharacters] = useState(characterData);
  const [searchInput, setSearchInput] = useState("")

  dispatch(loadData(characterData))
  const data = useSelector((state) => state.data)
  const error = useSelector((state) => state.error)

  const getMoreCharacters = async () => {
    let characterData = []
    let data = await getMarvelCharacters(characters.length);

    data.data.forEach(element => {
      characterData.push(createCharacterBasic(element))
    })

    let newData = characters.concat(characterData)
    setCharacters(newData)
    dispatch(loadData(newData))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Marvel Characters</title>
        <meta name="description" content="Marvel Characters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ position: "sticky", top: "0", zIndex: "1000", background: "#ffff", height: "100px" }}>
        <Row>
          <div style={{ position: "absolute", left: "15px", paddingTop: "10px" }}>
            <Image onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} alt="Marvel" src={icon} width={80} height={80} />
          </div>
          <div style={{ position: "absolute", left: "110px" }}>
            <Text h1 size={60} css={{ textGradient: '45deg, $red500 -20%, $blue500 50%' }} weight="bold" >
              Marvel Characters
            </Text>
          </div>
          <div style={{ position: "absolute", right: "15px", paddingTop: "30px" }}>
            <Input
              clearable
              underlined
              color="error"
              value={searchInput}
              labelPlaceholder="Search a Marvel character"
              contentRight={<GiSpiderMask width="16" height="10" fill="#DF1F2D" />}
            />
            <DebounceInput
              debounceTimeout={300}
              value={searchInput}
              forceNotifyByEnter={true}
              forceNotifyOnBlur={true}
              minLength={1}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </Row>
      </div>
      <main className={styles.main}>
        {
          <InfiniteScroll
          pageStart={1}
          loadMore={getMoreCharacters}
          hasMore={dataCount > characters.length ? true : false}
          loader={<div style={{ textAlign: "center" }}><Loading>Loading</Loading></div>}
      >
          {GridItem(characters)}
      </InfiniteScroll>
        }
      </main>
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