import { faCaretDown, faCaretUp, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';
import React from 'react';
import ScrollToTop from 'react-scroll-up';
export default function Footer() {
  const [isVisible, setIsVisible] = React.useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
  }, []);
  return (
    <>
      <footer style={{ alignContent: 'center' }} className="text-center">
        <Row className="justify-content-center" style={{ backgroundColor: '#000', width: '100%', marginBottom: '0px' }}>
          <Col className="my-auto text-center " xs="4" md="4">
            <Link href="/">
              <div>
                <FontAwesomeIcon className="hoverable" size="2x" color="#e9dccc" icon={faHome} />
              </div>
            </Link>
          </Col>
          <Col className="my-auto text-center" xs="auto" md="auto">
            <Link href="/user/profile">
              <div>
                <Image className="hoverable" src="/logo-custom.png" alt="DPentagon Logo" width={60} height={60} />
              </div>
            </Link>
            {/* <span style={{ fontSize: 10, color: '#FFF' }} className="hoverable-anchor">
              contact us
            </span> */}
          </Col>
          <Col className="my-auto text-center" xs="4" md="4">
            {isVisible ? (
              <FontAwesomeIcon className="hoverable" size="4x" color="#e9dccc" icon={faCaretUp} onClick={scrollToTop} />
            ) : (
              <FontAwesomeIcon className="hoverable" size="4x" color="#e9dccc" icon={faCaretDown} onClick={scrollToBottom} />
            )}
          </Col>
        </Row>
      </footer>
      <style jsx>{`
        footer {
          // left: 0;
          bottom: 0;
          // right: 0;
          width: 100%;
          background-color: #000000;
          position: fixed;
          z-index: 10000;
        }
      `}</style>
    </>
  );
}
