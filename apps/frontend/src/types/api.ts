export type ItemType = "book" | "movie";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};

export type Item = {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  authorOrDirector: string;
  releaseYear: number;
  genre: string | null;
  coverUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  id: string;
  rating: number;
  comment: string;
  itemId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  item?: Item;
  user?: User;
};
