import Image from 'next/image';
import React from 'react';
import { Card, Modal } from 'react-bootstrap';

export default function AdSection() {
  const [sectionHovered, setSectionHovered] = React.useState(false);
  const [modalVisible, setModalVisibility] = React.useState(false);

  return (
    // <Image width="1024" height="480" src="/ads-space.jpg" alt="Card image"></Image>
    <>
      <Card
        className="bg-dark text-white hoverable"
        onMouseEnter={() => {
          setSectionHovered(true);
        }}
        onMouseLeave={() => {
          setSectionHovered(false);
        }}
        onClick={() => setModalVisibility(true)}
      >
        <Card.Img as={Image} width="1440" height="640" src={'/ad_cover_hover.jpg'} alt="Card image" />
        {/* <div style={{ backgroundColor: '#000', width: '1024', height: '480' }}></div> */}
        <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
          <Card.Text>
            {/* {sectionHovered ? (
            <h2 className="align-self-center mx-auto hoverable" style={{ fontFamily: 'Athelas' }}>
              Read More
            </h2>
          ) : (
            <h1 className="align-self-center mx-auto" style={{ fontFamily: 'Athelas' }}>
              Info & Ads
            </h1>
          )} */}
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
      <Modal show={modalVisible} onHide={() => setModalVisibility(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <img src="/ad_info.png" className="img-fluid"></img>
      </Modal>
    </>
  );
}
