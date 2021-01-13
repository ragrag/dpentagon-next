import { faCaretDown, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';

export default function Footer() {
  return (
    <>
      <footer>
        <Row className="justify-content-md-center" style={{ backgroundColor: '#000' }}>
          <Col className="my-auto text-center " xs="4" md="4">
            <FontAwesomeIcon className="hoverable" size="2x" color="#FFFFFF" icon={faHome} />
          </Col>
          <Col className="my-auto text-center" xs="auto" md="auto">
            <Image className="hoverable" src="/logo-white.png" alt="DPentagon Logo" width={60} height={60} />
          </Col>
          <Col className="my-auto text-center" xs="4" md="4">
            <FontAwesomeIcon className="hoverable" size="4x" color="#FFFFFF" icon={faCaretDown} />
          </Col>
        </Row>
      </footer>
      <style jsx>{`
        footer {
          left: 0;
          bottom: 0;
          right: 0;
        }
      `}</style>
    </>
  );
}
