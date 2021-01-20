import axios from 'axios';

const deleteCatalogueRequest = async (catalogueId: number): Promise<void> => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/catalogues/${catalogueId}`, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('authToken'),
      },
    });
  } catch (err) {
    throw err;
  }
};

export default deleteCatalogueRequest;
