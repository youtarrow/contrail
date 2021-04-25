/*authSlice.ts*/
export interface LOGIN_USER {
  id: number;
  username: string;
}
export interface FILE extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
export interface PROFILE {
  id: number;
  user_profile: number;
  img: string | null;
}
export interface POST_PROFILE {
  id: number;
  img: File | null;
}
export interface CRED {
  username: string;
  password: string;
}
export interface JWT {
  refresh: string;
  access: string;
}
export interface USER {
  id: number;
  username: string;
}
export interface AUTH_STATE {
  isLoginView: boolean;
  loginUser: LOGIN_USER;
  profiles: PROFILE[];
}

/*articleSlice.ts*/
export interface READ_ARTICLE {
  id: number;
  title: string;
  content: string;
  category: number;
  category_item: string;
  owner: number;
  owner_username: string;
  created_at: string;
  updated_at: string;
}
export interface POST_ARTICLE {
  id: number;
  title: string;
  content: string;
  category: number;
}
export interface CATEGORY {
  id: number;
  item: string;
}
export interface ARTICLE_STATE {
  articles: READ_ARTICLE[];
  editedArticle: POST_ARTICLE;
  selectedArticle: READ_ARTICLE;
  users: USER[];
  category: CATEGORY[];
}

/*ArticleList.tsx*/
export interface SORT_STATE {
  rows: READ_ARTICLE[];
  order: "desc" | "asc";
  activeKey: string;
}
