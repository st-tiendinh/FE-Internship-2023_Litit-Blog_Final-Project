import { UserDetailProps } from './user';

/* /posts/:id */
export interface PostItemWithIdProps {
  id?: number;
  title: string;
  description: string;
  content: string;
  status: string;
  tags: string[];
  cover: string;
  userId?: number;
  likes?: number;
  comments?: number;
  recommend?: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: any;
  isLiked?: boolean;
  isInBookmark?: boolean;
  user?: UserDetailProps;
}
