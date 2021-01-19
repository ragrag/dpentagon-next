import axios from 'axios';
import Post from '../../interfaces/post';

export interface CataloguePostsFetchQuery {
  page: number;
  limit: number;
}

export interface CataloguePostsFetchResponse {
  posts: Post[];
  hasMore: boolean;
}

const cataloguePostsFetcher = async (
  url: string,
  catalogueId: number,
  { page = 1, limit = 20 }: CataloguePostsFetchQuery,
): Promise<CataloguePostsFetchResponse> => {
  try {
    const queryParams: CataloguePostsFetchQuery = { page, limit };

    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/catalogues/${catalogueId}/posts`, {
      params: {
        ...queryParams,
      },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
export default cataloguePostsFetcher;
