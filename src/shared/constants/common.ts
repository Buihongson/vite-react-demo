export const API_BASE_URL = import.meta.env.VITE_API_HOST || "";
export const TINY_API_KEY = import.meta.env.VITE_TINY_API_KEY || "";

export const API_VERSION = "/api/v1";
export const API_URL = `${API_BASE_URL}/api/v1`;

export const ToastType = {
  Success: "success",
  Error: "error",
};

export const TypeBankAccount = [
  {
    label: 'Bank',
    value: 'bank'
  },
  {
    label: 'Payoneer',
    value: 'payoneer'
  },
  {
    label: 'PingPong',
    value: 'pingPong'
  },
  {
    label: 'LianLian',
    value: 'lianLian'
  }
]

export const Role = {
  Seller: 'seller',
  Admin: 'admin',
  Manager: 'manager'
}

export const StatusTransaction = {
  // APPROVED: "APPROVED",
  PROCESSING: "PROCESSING",
  REJECTED: "REJECTED",
  SUCCESS: "SUCCESS",
}
