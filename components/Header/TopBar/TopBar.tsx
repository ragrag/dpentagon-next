import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import globalStyles from '../../../styles/globalStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
export default function TopBar() {
  return (
    <>
      <Row className={`${globalStyles.primaryBg} justify-content-md-center`}>
        <Col className="my-auto">
          <h4 className="text-center">LOG IN</h4>
        </Col>
        <Col className="text-center my-auto">
          <>
            <Image src="/logo-black.png" alt="DPentagon Logo" width={60} height={60} />
            <br />
            <h5 style={{ fontWeight: 'bold' }}>D.PENTAGON</h5>
          </>
        </Col>
        <Col className="my-auto text-center">
          <FontAwesomeIcon size="2x" color="#000000" icon={faSearch} />
        </Col>
      </Row>
      <style jsx>{``}</style>
    </>
  );
}
