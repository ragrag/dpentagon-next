import axios from 'axios';
import Post from '../../interfaces/post';
import User from '../../interfaces/user';

export interface PostsFetchQuery {
  page: number;
  limit: number;
  profession?: string;
  country?: string;
  caption?: string;
  userType?: string;
}

export interface PostsFetchResponse {
  posts: Post[];
  hasMore: boolean;
}

const postsFetcher = async (
  url: string,
  { page = 1, limit = 20, profession, country, caption, userType }: PostsFetchQuery,
): Promise<PostsFetchResponse> => {
  try {
    const queryParams: PostsFetchQuery = { page, limit };
    if (profession) queryParams.profession = profession;
    if (country) queryParams.country = country;
    if (caption) queryParams.caption = caption;
    if (userType) queryParams.userType = userType;

    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/posts`, {
      params: {
        ...queryParams,
      },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
export default postsFetcher;
