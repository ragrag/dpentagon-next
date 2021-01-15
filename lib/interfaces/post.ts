import Catalogue from './Catalogue';
import Profession from './profession';

export default interface Post {
  id: number;
  profession: Profession;
  url: string;
  postType: string;
  caption: string;
  catalogue: Catalogue;
  createdAt: Date;
  updatedAt: Date;
}
