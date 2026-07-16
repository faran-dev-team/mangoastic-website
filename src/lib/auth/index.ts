export { AuthProvider, useAuth } from "@/lib/auth/AuthProvider";
export { AuthApiError, loginAdmin, fetchAdminProfile } from "@/lib/auth/api";
export {
  getAdminSession,
  setAdminSession,
  clearAdminSession,
  getAdminAccessToken,
} from "@/lib/auth/session";
export type {
  AdminLoginPayload,
  AdminLoginSuccessData,
  AdminPublicProfile,
  AdminSession,
  AuthStatus,
} from "@/lib/auth/types";
