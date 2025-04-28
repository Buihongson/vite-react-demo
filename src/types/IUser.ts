export enum ROLE {
  ADMIN = 'Admin'
}

export enum TYPE_STATUS_SELLER {
  Active = "active",
  PENDING = "pending",
  Inactive = "inactive",
  Suspended = "suspended"
}

export interface IUser {
  email: string;
  role: 'seller' | 'admin' | 'manager';
  username: string;
}

export interface ISeller {
  activationCode: string
  createdAt: string
  email: string
  expirationAt: string
  fullname: string
  firstname: string
  lastname: string
  phone: string
  referralCode: string
  role: ROLE
  status: string
  username: string
  balance: number
  credit: number;
  hold: number;
  available: number;
  _id: string
}

export interface User extends IUser {
  activationCode: string;
  balance: number;
  createdAt: string | Date;
  credit: number;
  hold: number;
  available: number;
  expirationAt: string | Date;
  firstname: string;
  lastname: string;
  phone: string;
  referralCode: string;
  status: string;
  updatedAt: string | Date;
  _id: string;
}

export interface PayloadAdmin extends Pick<User, "username" | 'role'> {
  password: string;
}