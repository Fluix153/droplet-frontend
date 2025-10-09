export interface User {
  id: string;
  name: string;
  email: string;
  role: 'HOUSEHOLD_HEAD' | 'BREWMASTER' | 'ADMIN';
}

