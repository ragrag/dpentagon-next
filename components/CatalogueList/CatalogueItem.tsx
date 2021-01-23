import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { Card } from 'react-bootstrap';
import Catalogue from '../../lib/interfaces/catalogue';
type Props = {
  catalogue: Catalogue;
  onClick: (catalogueId: number) => void;
};

export default function CatalogueItem({ catalogue, onClick }: Props) {
  return (
    <Card
      className="hoverable"
      style={{ marginBottom: '10px' }}
      onClick={() => {
        onClick(catalogue.id);
      }}
    >
      <Card.Header as="h5" className="text-left hoverable-anchor">
        {catalogue.name}
      </Card.Header>
      <Card.Img as={Image} src={catalogue.photo ? catalogue.photo : '/cover.jpeg'} width="820" height="312" alt="Card image" />
      <Card.Footer as="h6" className="text-center hoverable-anchor">
        {dayjs(catalogue.createdAt).fromNow()}
      </Card.Footer>
      {/* <Card.ImgOverlay className="text-center d-flex justify-content-center align-items-center">
        <Card.Text className="align-self-center mx-auto" style={{ color: '#000000', fontSize: 12 }}>
          <h5 className="align-self-center mx-auto hoverable" style={{ fontFamily: 'Athelas', fontWeight: 900 }}>
            {catalogue.name}
          </h5>
            <h6 className="align-self-center mx-auto" style={{ fontWeight: 900 }}>
          {dayjs(catalogue.createdAt).fromNow()}
        </h6>
        </Card.Text>
      </Card.ImgOverlay> */}
    </Card>
  );
}
