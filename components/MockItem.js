import { Card, Text, Col, Row, Grid } from '@nextui-org/react'
import { CharacterDetailModal } from '../components/CharacterDetailModal'

export function MockItem(props) {
  return (
    <Grid xs={6} md={2} lg={1.2} xl={1.5} key={props.element.id}>
      <Card hoverable cover css={{ w: '100%', p: 0 }} key={props.element.id}>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Col>
            <Text h3 color="white">
              {props.element.name}
            </Text>
          </Col>
        </Card.Header>
        <Card.Body>
          <Card.Image
            src={props.element.thumbnail.path + "/portrait_xlarge." + props.element.thumbnail.extension}
            height={400}
            width="100%"
            alt={props.element.name}
          />
        </Card.Body>
        <Card.Footer
          blur
          css={{
            position: 'absolute',
            bgBlur: '#0f1114',
            borderTop: '$borderWeights$light solid $gray700',
            bottom: 0,
            zIndex: 1
          }}
        >
          <Row>
            <Col>
              <Row justify="center">
                <CharacterDetailModal detail={props.element} />
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
}