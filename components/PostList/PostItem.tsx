import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Post from '../../lib/interfaces/post';
import User from '../../lib/interfaces/user';
import dayjs from 'dayjs';
import Link from 'next/link';

type Props = {
  post: Post;
  width?: number;
  height?: number;
  key?: number;
  setUserModalVisibility: (visible: boolean) => void;
  setSelectedUser: React.Dispatch<React.SetStateAction<User>>;
};
export default function PostItem({ post, width, height, setUserModalVisibility, setSelectedUser }: Props) {
  return (
    <div style={{ display: 'inline-block', margin: '5px' }}>
      <Card style={{ width: width ?? 250 }} key={post.id ?? null}>
        <Card.Header>
          <Row className="justify-content-left">
            <Col className="text-left" xs="8">
              <Link href={`/catalogue/${post.catalogue.id}`}>
                <span style={{ fontSize: 12 }} className="text-left">
                  {post.caption}
                </span>
              </Link>
            </Col>
          </Row>
        </Card.Header>
        <Card.Img
          className="hoverable"
          variant="bottom"
          key={post.id}
          width={width ?? 250}
          height={height ?? 250}
          src={post.url}
          alt={post.caption}
        />

        <Card.Footer>
          <Row className="justify-content-left">
            <Col className="text-left" xs="8">
              <Link href={`/catalogue/${post.catalogue.id}`}>
                <span style={{ fontSize: 12 }} className="text-left hoverable-anchor">
                  Catalogue: {post.catalogue.name}
                </span>
              </Link>
            </Col>
          </Row>
          <Row className="justify-content-left">
            <Col className="text-left" xs="6">
              <span
                style={{ fontSize: 12 }}
                className="text-left hoverable-anchor"
                onClick={() => {
                  setSelectedUser(post.catalogue.user);
                  setUserModalVisibility(true);
                }}
              >
                by: {post.catalogue.user.displayName}
              </span>
            </Col>
            <Col className="text-right" xs="6">
              <Link href={`/user/${post.catalogue.user.id}`}>
                <span style={{ fontSize: 12 }} className="text-left hoverable-anchor">
                  <FontAwesomeIcon size="2x" color="#000000" icon={faCaretRight} />
                </span>
              </Link>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="6">
              <Link href={`/post/${post.id}`}>
                <span style={{ fontSize: 12 }} className="text-center hoverable-anchor">
                  {dayjs(post.createdAt).fromNow()}
                </span>
              </Link>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
}
