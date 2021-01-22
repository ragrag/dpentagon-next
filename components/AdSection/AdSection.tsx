import Image from 'next/image';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function AdSection() {
  const [sectionHovered, setSectionHovered] = React.useState(false);
  return (
    // <Image width="1024" height="480" src="/ads-space.jpg" alt="Card image"></Image>
    <Card
      className="bg-dark text-white"
      onMouseEnter={() => {
        setSectionHovered(true);
      }}
      onMouseLeave={() => {
        setSectionHovered(false);
      }}
    >
      <Card.Img as={Image} width="1024" height="480" src="/black-bg.jpg" alt="Card image" />
      {/* <div style={{ backgroundColor: '#000', width: '1024', height: '480' }}></div> */}
      <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
        <Card.Text>
          {sectionHovered ? (
            <h2 className="align-self-center mx-auto hoverable" style={{ fontFamily: 'Athelas' }}>
              Read More
            </h2>
          ) : (
            <h1 className="align-self-center mx-auto" style={{ fontFamily: 'Athelas' }}>
              Info & Ads
            </h1>
          )}
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}
