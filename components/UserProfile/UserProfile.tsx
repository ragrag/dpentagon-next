import React from 'react';
import { Button, Col, Image, OverlayTrigger, Popover, Row, Modal, Form } from 'react-bootstrap';
import { mutateCallback } from 'swr/dist/types';
import User from '../../lib/interfaces/user';
import { v4 as uuid } from 'uuid';
import readImageFromFile from '../../lib/util/readImage';
import UserContactInfo from './UserContactInfo';
import updateUserCoverRequest from '../../lib/requests/mutators/updateUserCoverRequest';
import updateUserPhotoRequest from '../../lib/requests/mutators/updateUserPhotoRequest';
import LoadingSpinner from '../Loading/LoadingSpinner';
type Props = {
  user: User;
  mutateUser?: (data?: User | Promise<User> | mutateCallback<User>, shouldRevalidate?: boolean) => Promise<User>;
  editable: boolean;
};

export default function UserProfile({ user, mutateUser, editable }: Props) {
  const [modalVisible, setModalVisibility] = React.useState(false);

  const coverImageInput = React.useRef(null);
  const displayImageInput = React.useRef(null);

  const [updatingCoverPhoto, setUpdatingCoverPhoto] = React.useState(false);
  const [updatingPhoto, setUpdatingPhoto] = React.useState(false);

  const [coverEditVisible, setCoverEditVisible] = React.useState(false);
  const [displayImgEditVisible, setDisplayImgEditVisible] = React.useState(false);

  const updateCoverPhoto = async e => {
    setUpdatingCoverPhoto(true);
    const image = await readImageFromFile(e.target.files[0]);

    try {
      const newCover = await updateUserCoverRequest(image.base64);
      console.log(newCover.url);
      mutateUser(
        {
          ...user,
          coverPhoto: newCover.url,
        },
        false,
      );
      setUpdatingCoverPhoto(false);
    } catch (err) {}
  };

  const updatePhoto = async e => {
    setUpdatingPhoto(true);
    const image = await readImageFromFile(e.target.files[0]);

    try {
      const newPhoto = await updateUserPhotoRequest(image.base64);
      console.log(newPhoto.url);
      mutateUser(
        {
          ...user,
          photo: newPhoto.url,
        },
        false,
      );
      setUpdatingPhoto(false);
    } catch (err) {}
  };

  return (
    <>
      <div style={{ maxWidth: '820' }}>
        <div style={{ display: 'inline-block' }} onClick={() => setCoverEditVisible(!coverEditVisible)}>
          <>
            {updatingCoverPhoto ? (
              <LoadingSpinner />
            ) : (
              <OverlayTrigger
                placement={'bottom'}
                show={coverEditVisible}
                overlay={
                  <Popover id={`popover-positioned-bottom`} onMouseLeave={() => setCoverEditVisible(false)}>
                    <Popover.Content>
                      <div>
                        <Button
                          variant="dark"
                          onClick={() => {
                            coverImageInput.current.click();
                          }}
                        >
                          Upload Image
                        </Button>{' '}
                        <Button variant="danger">Delete Image</Button>
                      </div>
                    </Popover.Content>
                  </Popover>
                }
              >
                <Image
                  fluid
                  className="hoverable-opacity"
                  style={{ zIndex: 0, borderBottom: '1px solid #AAAAAA', maxWidth: 820, maxHeight: 312 }}
                  src={user.coverPhoto ? user.coverPhoto + `?key=${uuid()}` : '/cover.jpeg'}
                  width="820"
                  height="312"
                />
              </OverlayTrigger>
            )}
          </>
        </div>
      </div>
      <Row className="justify-content-left">
        <Col className="text-left" md="5">
          <div
            style={{
              margin: '-70px 10px 0px 50px',
            }}
          >
            <div style={{ display: 'inline-block' }} onClick={() => setDisplayImgEditVisible(!displayImgEditVisible)}>
              {updatingPhoto ? (
                <LoadingSpinner />
              ) : (
                <OverlayTrigger
                  placement={'bottom'}
                  show={displayImgEditVisible}
                  overlay={
                    <Popover id={`popover-positioned-bottom`} onMouseLeave={() => setDisplayImgEditVisible(false)}>
                      <Popover.Content>
                        <div>
                          <Button
                            variant="dark"
                            onClick={() => {
                              displayImageInput.current.click();
                            }}
                          >
                            Upload Image
                          </Button>{' '}
                          <Button variant="danger">Delete Image</Button>
                        </div>
                      </Popover.Content>
                    </Popover>
                  }
                >
                  <Image
                    style={{ backgroundColor: '#FFF', borderRadius: '50%', zIndex: 9, border: '3px solid #FFFFFF' }}
                    src={user.photo ? user.photo + `?key=${uuid()}` : '/user-photo.jpg'}
                    width="150"
                    height="150"
                    className="hoverable-opacity"
                  />
                </OverlayTrigger>
              )}
            </div>
          </div>
        </Col>
        <Col md="5">
          <h3>{user.displayName}</h3>
          <span onClick={() => setModalVisibility(true)} style={{ marginLeft: '35px', marginRight: '30px' }} className="hoverable-anchor">
            Contact Info
          </span>
        </Col>
      </Row>
      <UserContactInfo
        visible={modalVisible}
        setModalVisibility={setModalVisibility}
        user={user}
        mutateUser={mutateUser}
        readOnly={!editable}
      ></UserContactInfo>
      <input
        type="file"
        ref={coverImageInput}
        onChange={async e => {
          await updateCoverPhoto(e);
        }}
        style={{ display: 'none' }}
        name="coverImage"
        accept="image/*"
      />
      <input
        type="file"
        ref={displayImageInput}
        style={{ display: 'none' }}
        onChange={async e => {
          await updatePhoto(e);
        }}
        name="displayImage"
        accept="image/*"
      />
      <style jsx>{``}</style>
    </>
  );
}
