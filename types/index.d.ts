import { ReactNode } from "react";

interface Children {
  children: ReactNode;
}

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface CreatePostParams {
  title: string;
  body: string;
  userId: number | string;
}

interface UpdatePostParams {
  title: string;
  body: string;
}
