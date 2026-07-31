export interface Content {
  id: number;
  img: string;
  title: string;
  description: string;
}

export interface User {
  id: number;
  img: string;
  name: string;
  ocupation: string;
}

export interface Database {
  content: Content[];
  users: User[];
}