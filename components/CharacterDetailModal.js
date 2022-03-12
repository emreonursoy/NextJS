import { Modal, Button, Text, Card, Grid, Row, Col, Link, Spacer } from '@nextui-org/react';
import { FiExternalLink } from "react-icons/fi";
import { getCharacterComics, getCharacterSeries } from '../pages/api/hello'
import { useEffect, useCallback, useState } from 'react'
import { createComicsBasic } from '../helpers/helper'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

const gridStyle = { minHeight: 250, marginTop: 10 };

const columns = [
  { name: 'name', defaultFlex: 2, header: 'Name', showColumnMenuTool: false },
];

const filterValue = [
  { name: 'name', operator: 'startsWith', type: 'string', value: '' },
];

export function CharacterDetailModal(props) {
  const [visible, setVisible] = useState(false)
  const [comics, setComics] = useState(props.detail.comics.items)
  const [series, setSeries] = useState(props.detail.series.items)
  const [loadingComics, setLoadingComics] = useState(false)
  const [loadingSeries, setLoadingSeries] = useState(false)

  const getNextComics = useCallback(async () => {
    setLoadingComics(true)
    let response = await getCharacterComics(comics.length, props.detail.id);
    let temp = []

    response.data.forEach(element => {
      temp.push(createComicsBasic(element))
    })

    const final = [...comics, ...temp]

    setComics(final)
    setLoadingComics(false)
  }, [getCharacterComics, comics]);

  const getNextSeries = useCallback(async () => {
    setLoadingSeries(true)
    let response = await getCharacterSeries(series.length, props.detail.id);
    let temp = []

    response.data.forEach(element => {
      temp.push(createComicsBasic(element))
    })
    const final = [...series, ...temp]
    setSeries(final)
    setLoadingSeries(false)
  }, [getCharacterSeries, series]);

  return (
    <div>
      <Button flat rounded css={{ color: '#ffff', bg: '#94f9f026' }} onClick={() => setVisible(true)}>
        <Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
          {props.detail.name}
        </Text>
      </Button>
      <Modal
        scroll={false}
        width="1200px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={visible}
        closeButton
        fullScreen
        onClose={() => {setVisible(false)}}
      >
        <Modal.Body>
          <Grid xs={12} sm={12}>
            <Grid.Container gap={2} justify="center">
              <Grid xs={4}>
                <Card cover css={{ h:'100%', p: 0 }}>
                  <Card.Body>
                    <Card.Image
                      src={props.detail.thumbnail.path + "/portrait_incredible." + props.detail.thumbnail.extension}
                      height="100%"
                      width="100%"
                      alt={props.detail.name}
                    />
                  </Card.Body>
                </Card>
              </Grid>
              <Grid xs={8}>
                <Col>
                  <Row>
                    <Text h2 size={40} css={{ textGradient: '45deg, $red500 -20%, $blue500 0%' }} weight="bold" >
                      {props.detail.name}
                    </Text>
                  </Row>
                  <Spacer />
                  <Row>
                    <Col>
                      <Row>
                        <Text h3 size={15} weight="regular" >
                          {props.detail.description.length === 0 ? "The description of the " + props.detail.name + " is not available." : props.detail.description}
                        </Text>
                      </Row>
                      <Spacer />
                      <Row>
                        <Text h3 size={15} weight="regular" >
                          {props.detail.url === undefined ? "" : <Link target="_blank" href={props.detail.url}>{"For the detailed information of the " + props.detail.name}<FiExternalLink /></Link>}
                        </Text>
                      </Row>
                      <Spacer />
                      <Row>
                        {props.detail.comics.available === 0 ?
                          <Text h3 size={15} weight="regular" >No comics available</Text> :
                          <Col>
                            <Row>
                              <Text h3 size={15} weight="regular" css={{ textGradient: '45deg, $red500 -20%, $blue500 0%' }}>Comics</Text>
                            </Row>
                            <Row>
                              <ReactDataGrid
                                idProperty="name"
                                style={gridStyle}
                                columns={columns}
                                dataSource={comics}
                                loading={loadingComics}
                                defaultFilterValue={filterValue}
                              />
                            </Row>
                            
                            <div style={{position:"absolute", left:"15px", paddingTop:"10px"}}>
                              {
                                props.detail.comics.available > comics.length ? <div style={{paddingTop: "10px"}}>
                                    <Button disabled={loadingComics} onClick={getNextComics}>Laod More</Button></div> : <></>
                              }
                            </div>
                            <div style={{position:"absolute", right:"15px", paddingTop:"10px"}}>
                              <Text h3 size={15} weight="bold" css={{ textGradient: '45deg, $red500 -20%, $blue500 0%' }}>Laoded: {comics.length} / Total: {props.detail.comics.available}</Text>
                            </div>
                          </Col>
                        }
                      </Row>
                      <Spacer y={4} />
                      <Row>
                        {props.detail.series.available === 0 ?
                          <Text h3 size={15} weight="regular" >No series available</Text> :
                          <Col>
                            <Row>
                              <Text h3 size={15} weight="regular" css={{ textGradient: '45deg, $red500 -20%, $blue500 0%' }}>Series</Text>
                            </Row>
                            <Row>
                              <ReactDataGrid
                                idProperty="name"
                                style={gridStyle}
                                columns={columns}
                                dataSource={series}
                                loading={loadingSeries}
                                defaultFilterValue={filterValue}
                              />
                            </Row>
                            <div style={{position:"absolute", left:"15px", paddingTop:"10px"}}>
                              {
                                props.detail.series.available > series.length ? 
                                  <Button disabled={loadingSeries} onClick={getNextSeries}>Laod More</Button> : <></>
                              }
                            </div>
                            <div style={{position:"absolute", right:"15px", paddingTop:"10px"}}>
                              <Text h3 size={15} weight="bold" css={{ textGradient: '45deg, $red500 -20%, $blue500 0%' }}> Laoded: {series.length} / Total: {props.detail.series.available}</Text>
                            </div>
                          </Col>
                        }
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Grid>
            </Grid.Container>
          </Grid>
        </Modal.Body>
      </Modal>
    </div>
  );
}
