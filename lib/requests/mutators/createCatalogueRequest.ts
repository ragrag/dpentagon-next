import axios from 'axios';
import Post from '../../interfaces/post';

export interface PostCreationDTO {
  content: string;
  caption: string;
  catalogueId: number;
}

const createPhotoPostRequest = async (createPostDTO: PostCreationDTO): Promise<Post> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/posts/photo`,
      {
        ...createPostDTO,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: localStorage.getItem('authToken'),
        },
      },
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default createPhotoPostRequest;
