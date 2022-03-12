import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getMarvelCharacters, getMarvelCharactersSearchResult } from './api'
import { Grid, Loading, Text, Input, Row } from '@nextui-org/react'
import { MockItem } from '../components/MockItem'
import { useEffect, useCallback, useState } from 'react'
import { createCharacterBasic } from '../helpers/helper'
import Image from 'next/image'
import { GiSpiderMask } from "react-icons/gi";
import { useSelector, useDispatch } from 'react-redux'
import { loadData, loadingDataFailure } from '../store'
import icon from '../public/spiderman.png'
import InfiniteScroll from 'react-infinite-scroller';
import { debounce } from 'lodash';

const GridItem = ({ characters }) => {
  return (
    <Grid.Container gap={2} justify="left" >
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

export default function Home() {

  const dispatch = useDispatch()
  const characters = useSelector((state) => state.characters)
  const error = useSelector((state) => state.error)
  const totalCharactersCount = useSelector((state) => state.totalCount)
  const [searchedCharacters, setSearchedCharacters] = useState([])
  const [searchedCharactersCount, setSearchedCharactersCount] = useState(0)

  useEffect(async () => {
    if (characters.length === 0) {
      //getNextCharacters(0);
      var response = await getMarvelCharacters(length);
      dispatch(loadData(response))
    }
  }, []);

  const getNextCharacters = useCallback(async (e, length) => {
    if (length !== undefined) {
      var response = await getMarvelCharacters(length);
    }

    dispatch(loadData(response))
  }, [dispatch]);

  const getNextSearchedCharacters = useCallback(async (term) => {
    let temp = []
    let response = await getMarvelCharactersSearchResult(searchedCharacters.length, term);

    response.data.forEach(element => {
      temp.push(createCharacterBasic(element))
    })
    const final = [...searchedCharacters, ...temp]
    
    setSearchedCharacters(final)
    setSearchedCharactersCount(response.numberOfCharacters)

  }, [getMarvelCharactersSearchResult, searchedCharacters, searchedCharactersCount]);

  const search = useCallback(debounce((term) => {
    console.log("searching... ", term)
    getNextSearchedCharacters(term)
  }, 300), []);

  const onInputChange = useCallback((e) => {
    search(e.target.value);
  }, [search])

  return (
    <div className={styles.container}>
      <Head>
        <title>Marvel Characters</title>
        <meta name="description" content="Marvel Characters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ position: "sticky", top: "0", zIndex: "1000", background: "#ffff", height: "100px" }}>
        <Grid.Container gap={2} justify="left" >
          <Grid xs={12} md={6} lg={6} xl={6} >
            <div style={{ position: "absolute", left: "15px", paddingTop: "10px" }}>
              <Image onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} alt="Marvel" src={icon} width={80} height={80} />
            </div>
            <div style={{ position: "absolute", left: "110px" }}>
              <Text h1 size={60} css={{ textGradient: '45deg, $red500 -20%, $blue500 50%' }} weight="bold" >
                Marvel Characters
              </Text>
            </div>
          </Grid>
          <Grid xs={12} md={6} lg={6} xl={6} >
            <div style={{ position: "absolute", right: "15px", paddingTop: "30px" }}>
              <Input
                underlined
                color="error"
                onChange={onInputChange}
                labelPlaceholder="Search a Marvel character"
                contentRight={<GiSpiderMask width="16" height="10" fill="#DF1F2D" />}
              />
            </div>
          </Grid>
        </Grid.Container>
      </div>
      <main className={styles.main}>
        {
          searchedCharacters.length === 0 ?
            <InfiniteScroll
              pageStart={1}
              loadMore={(e) => getNextCharacters(e, characters.length)}
              hasMore={totalCharactersCount > characters.length}
              loader={<div style={{ textAlign: "center" }}><Loading>Loading</Loading></div>}
            >
              <GridItem characters={characters} />
            </InfiniteScroll> :
            <InfiniteScroll
              pageStart={1}
              loadMore={getNextSearchedCharacters}
              hasMore={searchedCharactersCount > searchedCharacters.length}
              loader={<div style={{ textAlign: "center" }}><Loading>Loading</Loading></div>}
            >
              <GridItem characters={searchedCharacters} />
            </InfiniteScroll>
        }
      </main>
    </div>
  )
}

export async function getServerSideProps() {

  return { props: {} };
}