import axios from 'axios';

export interface CatalogueUpdateDTO {
  name: string;
  photo: string;
}
const updateCatalogueRequest = async (catalogueId: number, { name, photo = null }: CatalogueUpdateDTO): Promise<string> => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/catalogues/${catalogueId}`,
      {
        name,
        photo,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: localStorage.getItem('authToken'),
        },
      },
    );
    return response.data.photo;
  } catch (err) {
    throw err;
  }
};

export default updateCatalogueRequest;
