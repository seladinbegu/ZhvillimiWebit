export interface User {
  id?: string; // Add this line
  name: string;
  email: string;
  password?: string;
  createdAt?: Date;
}
