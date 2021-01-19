import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { Card } from 'react-bootstrap';
import Catalogue from '../../lib/interfaces/catalogue';

type Props = {
  catalogue: Catalogue;
  onClick: (catalogueId: number) => void;
};

export default function CatalogueItem({ catalogue, onClick }: Props) {
  dayjs.extend(relativeTime);
  return (
    <Card
      className="bg-dark text-white hoverable"
      style={{ marginBottom: '10px' }}
      onClick={() => {
        onClick(catalogue.id);
      }}
    >
      <Card.Img src="/catalogue-img.jpeg" height="120" alt="Card image" />
      <Card.ImgOverlay className="text-center my-auto">
        <Card.Title className="mr-auto" style={{ color: '#000000', marginTop: '20px' }}>
          {catalogue.name}
        </Card.Title>

        <Card.Text className="mr-auto" style={{ color: '#000000', fontSize: 12 }}>
          {dayjs(catalogue.createdAt).fromNow()}
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}