import { Modal, Button, useModal, Text, Card, Grid, Col } from '@nextui-org/react';

export function CharacterDetailModal(props) {
  
    const { setVisible, bindings } = useModal();
    return (
    <div>
        <Button flat auto rounded css={{ color: '#aa0505', bg: '#fbca03' }} onClick={() => setVisible(true)}>
          <Text css={{ color: 'inherit' }} size={12} weight="bold" transform="uppercase">
            {props.detail.name}
          </Text>
        </Button>
        <Modal 
            scroll 
            width="700px" 
            aria-labelledby="modal-title"   
            aria-describedby="modal-description" 
            {...bindings}
        >
            <Modal.Body>
            <Grid xs={12} sm={12}>
      <Card cover css={{ w: '100%', p: 0 }}>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Col>
            <Text h3 color="white">
              Your checklist for better sleep
            </Text>
          </Col>
        </Card.Header>
        <Card.Body>
          <Card.Image
             src= {props.detail.thumbnail.path + "/portrait_incredible." + props.detail.thumbnail.extension}
             height={800}
             width="100%"
             alt={props.detail.name}
          />
        </Card.Body>
      </Card>
    </Grid>
              <Text id="modal-description">
                Emre
              </Text>
            </Modal.Body>
        </Modal>
    </div>
    );    
}
       