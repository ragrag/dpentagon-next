import { Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import globalStyles from '../../../styles/globalStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
export default function TopBar() {
  return (
    <>
      <Row className={`${globalStyles.primaryBg} justify-content-md-center`}>
        <Col className="my-auto">
          <Link href="/login">
            <h4 className="text-center hoverable">LOG IN</h4>
          </Link>
        </Col>
        <Col className="text-center my-auto">
          <>
            <Link href="/">
              <Image className="hoverable" src="/logo-black.png" alt="DPentagon Logo" width={60} height={60} />
            </Link>
            <br />
            <Link href="/">
              <h5 className="hoverable" style={{ fontWeight: 'bold' }}>
                D.PENTAGON
              </h5>
            </Link>
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
