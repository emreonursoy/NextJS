import { Modal, Button, useModal, Text, Card, Grid } from '@nextui-org/react';

export function CharacterDetailModal(props) {

  const { setVisible, bindings } = useModal();
  return (
    <div>
      <Button flat rounded css={{ color: '#ffff', bg: '#94f9f026' }} onClick={() => setVisible(true)}>
        <Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
          {props.detail.name}
        </Text>
      </Button>
      <Modal
        scroll
        width="1000px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Body>
          <Grid xs={12} sm={12}>
            <Grid.Container gap={2} justify="center">
              <Grid xs={4}>
                <Card cover css={{ w: '100%', p: 0 }}>
                  <Card.Body>
                    <Card.Image
                      src={props.detail.thumbnail.path + "/portrait_incredible." + props.detail.thumbnail.extension}
                      height={600}
                      width="100%"
                      alt={props.detail.name}
                    />
                  </Card.Body>
                </Card>
              </Grid>
              <Grid xs={8}>
                <Text h2 size={40} css={{ textGradient: '45deg, $red500 -20%, $blue500 0%' }} weight="bold" >
                  {props.detail.name}
                </Text>
              </Grid>
            </Grid.Container>

          </Grid>
        </Modal.Body>
      </Modal>
    </div>
  );
}
