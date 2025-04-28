export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const TINY_API_KEY = process.env.NEXT_PUBLIC_TINY_API_KEY || "";

export const API_VERSION = "/api/v1";
export const API_URL = `${API_BASE_URL}/api/v1`;

export const ToastType = {
  Success: "success",
  Error: "error",
};

export const BankAccountType = {
  LianLian: "lianLian",
  PingPong: "pingPong",
  Bank: "bank",
  Payoneer: "payoneer",
};
