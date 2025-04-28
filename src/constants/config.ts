export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    timeout: 30000, // 30 seconds
  },
  auth: {
    tokenKey: "auth_token",
    refreshTokenKey: "refresh_token",
  },
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
  routes: {
    home: "/",
    login: "/login",
    register: "/register",
    dashboard: "/dashboard",
    profile: "/profile",
  },
  theme: {
    primaryColor: "#3B82F6", // blue-500
    secondaryColor: "#6B7280", // gray-500
    successColor: "#10B981", // green-500
    dangerColor: "#EF4444", // red-500
    warningColor: "#F59E0B", // yellow-500
  },
  env: {
    comingSoon: process.env.NEXT_PUBLIC_COMING_SOON,
    tinyApiKey: process.env.NEXT_PUBLIC_TINY_API_KEY || "",
  },
} as const;

export type Config = typeof config;
