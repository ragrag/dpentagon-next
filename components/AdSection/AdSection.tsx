import Image from 'next/image';
import { Card } from 'react-bootstrap';

export default function AdSection() {
  return (
    <Card className="bg-dark text-white">
      <Card.Img as={Image} width="1024" height="480" src="/ads-space.png" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title className="text-left">Ads & Info</Card.Title>
      </Card.ImgOverlay>
    </Card>
  );
}
