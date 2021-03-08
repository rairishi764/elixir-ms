export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
  providerId?: string;
  role?: number
}
