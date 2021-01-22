import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function LoadingSpinner() {
  return (
    <Row className="justify-content-center">
      <Col className="my-auto text-center">
        <FontAwesomeIcon spin size="3x" color="#000000" icon={faCircleNotch} />
      </Col>
    </Row>
  );
}
