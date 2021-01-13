import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <footer>
        <Row className="justify-content-md-center" style={{ backgroundColor: '#000' }}>
          <Col className="my-auto text-center " md="4">
            <FontAwesomeIcon className="hoverable" size="2x" color="#FFFFFF" icon={faHome} />
          </Col>
          <Col className="my-auto text-center" md="auto">
            <Image className="hoverable" src="/logo-white.png" alt="DPentagon Logo" width={60} height={60} />
          </Col>
          <Col className="my-auto text-center" md="4">
            <FontAwesomeIcon className="hoverable" size="2x" color="#FFFFFF" icon={faCaretDown} />
          </Col>
        </Row>
      </footer>
      <style jsx>{`
        footer {
          position: absolute;
          left: 0;
          bottom: 0;
          right: 0;
        }
      `}</style>
    </>
  );
}
