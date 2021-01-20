import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { mutateCallback } from 'swr/dist/types';
import * as yup from 'yup';
import { PostsFetchResponse } from '../../lib/requests/fetchers/postsFetcher';
import createPhotoPostRequest, { PostCreationDTO } from '../../lib/requests/mutators/createCatalogueRequest';
import readImageFromFile from '../../lib/util/readImage';

type Props = {
  visible: boolean;
  setModalVisibility: (visible: boolean) => void;
  newPost: {
    caption: string;
    catalogueId: number;
    image: {
      content: string;
      file: string;
    };
  };
  setNewPost: React.Dispatch<any>;
  postsData: PostsFetchResponse[];
  mutatePostsData: (data?: any[] | Promise<any[]> | mutateCallback<any[]>, shouldRevalidate?: boolean) => Promise<any[]>;
};

export default function NewPostModal({ visible, setModalVisibility, newPost, setNewPost, postsData, mutatePostsData }: Props) {
  const postImageInput = React.useRef(null);
  return (
    <>
      <Modal
        onHide={() => {
          setModalVisibility(false);
          setNewPost({
            caption: '',
            image: {
              content: '',
              file: '',
            },
            catalogueId: newPost.catalogueId,
          });
        }}
        show={visible}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: '#EEEEEE' }}>
          <Modal.Title id="contained-modal-title-vcenter">Add Post To Catalogue</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#EEEEEE', maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
          <Row className="justify-content-center">
            <Col className="text-center" md="6">
              <Form.Group controlId="formBasicText">
                <Form.Control
                  name="imageCaption"
                  type="text"
                  placeholder="Post Caption (Optional)"
                  value={newPost.caption}
                  onChange={e => {
                    setNewPost({ ...newPost, caption: e.target.value });
                  }}
                />
              </Form.Group>
              <span>{newPost.image.file}</span>
              <br></br>
              <Button
                size="sm"
                variant="dark"
                onClick={() => {
                  postImageInput.current.click();
                }}
              >
                Upload Image
              </Button>
              <br></br>
              <br></br>
              <Button
                size="sm"
                variant="dark"
                onClick={async () => {
                  const createPostDTO: PostCreationDTO = {
                    caption: newPost.caption,
                    content: newPost.image.content,
                    catalogueId: newPost.catalogueId,
                  };
                  const schema = yup.object().shape({
                    caption: yup.string(),
                    content: yup.string().required(),
                    catalogueId: yup.number(),
                  });
                  try {
                    await schema.validate(createPostDTO);
                    console.log(createPostDTO);
                    const createdPost = await createPhotoPostRequest(createPostDTO);
                    const newPosts = [...postsData];
                    newPosts[0].posts.unshift(createdPost);
                    mutatePostsData(newPosts, true);

                    setModalVisibility(false);
                  } catch (err) {
                    if (err.errors) {
                      alert(err.errors[0]);
                    } else if (err?.response?.data?.message) alert(err.response.data.message);
                    else alert('Post Creation Failed, Try Again later');
                  }
                }}
              >
                Add Post To Catalogue
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <input
        type="file"
        ref={postImageInput}
        onChange={async e => {
          const image = await readImageFromFile(e.target.files[0]);
          setNewPost({
            ...newPost,
            image: {
              content: image.base64,
              file: image.name,
            },
          });
        }}
        style={{ display: 'none' }}
        name="postImage"
        accept="image/*"
      />
    </>
  );
}
