import axios from 'axios';
import Catalogue from '../../interfaces/catalogue';

export interface UserCataloguesFetchResponse {
  catalogues: Catalogue[];
  hasMore: boolean;
}

const userCataloguesFetcher = async (userId: number): Promise<UserCataloguesFetchResponse> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${userId}/catalogues`, {});
    console.log('user Catalogues');
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default userCataloguesFetcher;
