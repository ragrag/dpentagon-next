import Post from './post';
import User from './user';

export default interface Catalogue {
  id: number;
  user: User;
  posts?: Post[];
  name: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}
