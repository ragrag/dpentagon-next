import { faCaretRight, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import Post from '../../lib/interfaces/post';
import User from '../../lib/interfaces/user';
import dayjs from 'dayjs';
import Link from 'next/link';
import { userState } from '../../lib/store/user.store';
import { useRecoilState } from 'recoil';
import deletePostRequest from '../../lib/requests/mutators/deletePostRequest';
import { confirmAlert } from 'react-confirm-alert'; // Import
import Image from 'next/image';
type Props = {
  post: Post;
  width?: number;
  height?: number;
  key?: number;
  setUserModalVisibility?: (visible: boolean) => void;
  setSelectedUser?: React.Dispatch<React.SetStateAction<User>>;
};
export default function PostItem({ post, width, height, setUserModalVisibility, setSelectedUser }: Props) {
  const [postDeleted, setPostDeleted] = React.useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [deletionModalVisible, setDeletionModalVisible] = React.useState(false);

  if (postDeleted) return null;

  const postDeleteModal = (
    <Modal
      onHide={() => setDeletionModalVisible(false)}
      size="sm"
      show={deletionModalVisible}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete Post?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Are you sure you want to delete this post?</span>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant={'dark'} onClick={() => setDeletionModalVisible(false)}>
          Close
        </Button>
        <Button
          onClick={async () => {
            try {
              await deletePostRequest(post.id);
              setPostDeleted(true);
              setDeletionModalVisible(false);
            } catch (err) {
              if (err?.response?.status === 401) alert('Unauthorized');
              else alert('Failed to delete post');
            }
          }}
          size="sm"
          variant={'dark'}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );

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
        <Link href={`/post/${post.id}`}>
          <Card.Img
            as={Image}
            className="hoverable"
            variant="bottom"
            key={post.id}
            width={width ?? 250}
            height={height ?? 250}
            src={post.url}
            alt={post.caption}
          />
        </Link>
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
                  if (setSelectedUser) setSelectedUser(post.catalogue.user);
                  if (setUserModalVisibility) setUserModalVisibility(true);
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
            <Col className={`${post.catalogue.user.id === user?.id ? 'text-left' : 'text-center'}`} xs="6">
              <Link href={`/post/${post.id}`}>
                <span style={{ fontSize: 12 }} className="text-center hoverable-anchor">
                  {dayjs(post.createdAt).fromNow()}
                </span>
              </Link>
            </Col>
            {post.catalogue.user.id === user?.id ? (
              <Col className="text-right" xs="6">
                <span style={{ fontSize: 12 }} className="hoverable-anchor">
                  <FontAwesomeIcon
                    className="hoverable"
                    size="1x"
                    color="#000000"
                    icon={faTrashAlt}
                    onClick={() => {
                      setDeletionModalVisible(true);
                    }}
                  />
                </span>
              </Col>
            ) : null}
          </Row>
        </Card.Footer>
      </Card>
      {postDeleteModal}
    </div>
  );
}
