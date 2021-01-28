import { faCopy, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';
import { Button, Col, Image as BootstrapImage, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { mutateCallback } from 'swr/dist/types';
import { v4 as uuid } from 'uuid';
import User from '../../lib/interfaces/user';
import deleteCoverPhotoRequest from '../../lib/requests/mutators/deleteCoverPhotoRequest';
import deleteProfilePhotoRequest from '../../lib/requests/mutators/deleteProfilePhotoRequest';
import updateUserCoverRequest from '../../lib/requests/mutators/updateUserCoverRequest';
import updateUserPhotoRequest from '../../lib/requests/mutators/updateUserPhotoRequest';
import readImageFromFile from '../../lib/util/readImage';
import LoadingSpinner from '../Loading/LoadingSpinner';
import UserContactInfo from './UserContactInfo';
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

  const deleteCoverPhoto = async () => {
    setUpdatingCoverPhoto(true);
    try {
      await deleteCoverPhotoRequest();
      mutateUser(
        {
          ...user,
          coverPhoto: null,
        },
        false,
      );
      setUpdatingCoverPhoto(false);
    } catch (err) {}
  };

  const deleteProfilePhoto = async () => {
    setUpdatingPhoto(true);
    try {
      await deleteProfilePhotoRequest();
      mutateUser(
        {
          ...user,
          photo: null,
        },
        false,
      );
      setUpdatingPhoto(false);
    } catch (err) {}
  };

  return (
    <>
      <div style={{ display: 'inline-block' }}>
        <>
          {updatingCoverPhoto ? (
            <LoadingSpinner />
          ) : (
            <Row className="justify-content-center">
              <Col>
                <div>
                  <Image src={user.coverPhoto ? user.coverPhoto + `?key=${uuid()}` : '/cover.jpeg'} width="820" height="312" />
                </div>
                {editable ? (
                  <div>
                    <OverlayTrigger
                      placement={'bottom'}
                      show={coverEditVisible}
                      overlay={
                        <Popover id={`popover-positioned-bottom-profile`} onMouseLeave={() => setCoverEditVisible(false)}>
                          <Popover.Content>
                            <Row className="justify-content-center">
                              <Col className="text-center">
                                <Button
                                  size="sm"
                                  variant="dark"
                                  onClick={() => {
                                    coverImageInput.current.click();
                                  }}
                                  style={{ marginBottom: '10px' }}
                                >
                                  Upload Image
                                </Button>
                                <br></br>
                                <Button
                                  onClick={() => {
                                    deleteCoverPhoto();
                                  }}
                                  size="sm"
                                  variant="danger"
                                >
                                  Delete Image
                                </Button>
                              </Col>
                            </Row>
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <Button
                        className="text-right hoverable-opacity"
                        variant="dark"
                        size="sm"
                        onClick={() => setCoverEditVisible(!coverEditVisible)}
                        style={{
                          margin: '-90px 10px 0px 50px',
                          left: '35%',
                          zIndex: 9,
                          position: 'relative',
                          opacity: 0.5,
                        }}
                      >
                        Add Photo
                      </Button>
                    </OverlayTrigger>
                  </div>
                ) : null}

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
                        ) : editable ? (
                          <OverlayTrigger
                            placement={'bottom'}
                            show={displayImgEditVisible}
                            overlay={
                              <Popover id={`popover-positioned-bottom-profile-2`} onMouseLeave={() => setDisplayImgEditVisible(false)}>
                                <Popover.Content>
                                  <Row className="justify-content-center">
                                    <Col className="text-center">
                                      <Button
                                        size="sm"
                                        variant="dark"
                                        onClick={() => {
                                          displayImageInput.current.click();
                                        }}
                                        style={{ marginBottom: '10px' }}
                                      >
                                        Upload Image
                                      </Button>
                                      <br></br>
                                      <Button
                                        onClick={() => {
                                          deleteProfilePhoto();
                                        }}
                                        size="sm"
                                        variant="danger"
                                      >
                                        Delete Image
                                      </Button>
                                    </Col>
                                  </Row>
                                </Popover.Content>
                              </Popover>
                            }
                          >
                            <BootstrapImage
                              style={{ backgroundColor: '#FFF', borderRadius: '50%', zIndex: 9, border: '3px solid #FFFFFF' }}
                              src={user.photo ? user.photo + `?key=${uuid()}` : '/user-photo.jpg'}
                              width="150"
                              height="150"
                              className="hoverable-opacity"
                            />
                          </OverlayTrigger>
                        ) : (
                          <BootstrapImage
                            style={{ backgroundColor: '#FFF', borderRadius: '50%', zIndex: 9, border: '3px solid #FFFFFF' }}
                            src={user.photo ? user.photo + `?key=${uuid()}` : '/user-photo.jpg'}
                            width="150"
                            height="150"
                            className="hoverable-"
                          />
                        )}
                      </div>
                    </div>
                  </Col>

                  <Col md="5" style={{ marginTop: '20px' }}>
                    <h2>{user.displayName}</h2>
                    <Row>
                      <Col>
                        <span
                          onClick={() => setModalVisibility(true)}
                          style={{ marginLeft: '35px', marginRight: '10px' }}
                          className="hoverable-anchor"
                        >
                          Contact Info
                        </span>
                        {editable ? (
                          <FontAwesomeIcon
                            className="hoverable"
                            size="sm"
                            color="#000000"
                            icon={faShareAlt}
                            onClick={async () => {
                              await navigator.clipboard.writeText(`https://www.dpentagon.com/user/${user.id}`);
                              alert('Profile link copied');
                            }}
                          />
                        ) : null}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </>
      </div>

      {/* <Row className="justify-content-left">
        <Col className="text-left" md="5">
          <div
            style={{
              margin: '-70px 10px 0px 50px',
            }}
          >
            <div style={{ display: 'inline-block' }} onClick={() => setDisplayImgEditVisible(!displayImgEditVisible)}>
              {updatingPhoto ? (
                <LoadingSpinner />
              ) : editable ? (
                <OverlayTrigger
                  placement={'bottom'}
                  show={displayImgEditVisible}
                  overlay={
                    <Popover id={`popover-positioned-bottom-profile-2`} onMouseLeave={() => setDisplayImgEditVisible(false)}>
                      <Popover.Content>
                        <Row className="justify-content-center">
                          <Col className="text-center">
                            <Button
                              size="sm"
                              variant="dark"
                              onClick={() => {
                                displayImageInput.current.click();
                              }}
                              style={{ marginBottom: '10px' }}
                            >
                              Upload Image
                            </Button>
                            <br></br>
                            <Button
                              onClick={() => {
                                deleteProfilePhoto();
                              }}
                              size="sm"
                              variant="danger"
                            >
                              Delete Image
                            </Button>
                          </Col>
                        </Row>
                      </Popover.Content>
                    </Popover>
                  }
                >
                  <BootstrapImage
                    style={{ backgroundColor: '#FFF', borderRadius: '50%', zIndex: 9, border: '3px solid #FFFFFF' }}
                    src={user.photo ? user.photo + `?key=${uuid()}` : '/user-photo.jpg'}
                    width="150"
                    height="150"
                    className="hoverable-opacity"
                  />
                </OverlayTrigger>
              ) : (
                <BootstrapImage
                  style={{ backgroundColor: '#FFF', borderRadius: '50%', zIndex: 9, border: '3px solid #FFFFFF' }}
                  src={user.photo ? user.photo + `?key=${uuid()}` : '/user-photo.jpg'}
                  width="150"
                  height="150"
                  className="hoverable-"
                />
              )}
            </div>
          </div>
        </Col>

        <Col md="5" style={{ marginTop: '20px' }}>
          <h2>{user.displayName}</h2>
          <span onClick={() => setModalVisibility(true)} style={{ marginLeft: '35px', marginRight: '30px' }} className="hoverable-anchor">
            Contact Info
          </span>
        </Col>
      </Row> */}
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
