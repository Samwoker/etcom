import type { Role } from './role';
import type { TradeType } from './professionals';

export interface PendingSignup {
  fullName: string;
  phone: string;
  trade?: TradeType;
  role: Role;
}
