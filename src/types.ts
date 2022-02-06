export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  picture?: {
    url: string;
    thumbnail: string;
  };
  roles: [{ name: string }];
}
