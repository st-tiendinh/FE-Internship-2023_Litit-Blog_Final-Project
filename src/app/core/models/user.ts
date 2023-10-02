/* /auth/login */
export interface UserAuthProps {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  dob: string;
  displayName: string;
  picture: string;
  verifyAt: string;
}

/* /user/:id */
export interface UserInfoByIdProps {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  displayName: string;
  picture: string;
  followers: number;
  followings: number;
}

/* /post/:id */
export interface UserDetailProps {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  dob: string;
  displayName: string;
  picture: string;
  isActive: boolean;
  isAdmin: boolean;
  followers: number;
  followings: number;
  verifyAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStatistic {
  postPublicQuantity: number,
  commentQuantity: number,
  tagQuantity: number,
  likeQuantity: number,
}


export interface UserFollow {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  gender: string | null;
  dob: string | null;
  displayName: string | null;
  picture: string | null;
}
