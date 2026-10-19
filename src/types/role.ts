export type Role = 'customer' | 'professional' | 'admin';

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  subCity: string;
  avatarUrl?: string;
}
