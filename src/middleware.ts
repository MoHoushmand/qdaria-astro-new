import {
  createAstroAuthMiddleware,
  type AstroAuthGuard,
} from "./lib/qdaria-auth/adapters/astro";
import { teamEmailRoles } from "./data/admin/team-seed";

const isStaff = (email: string | null): boolean => {
  if (!email) return false;
  const role = teamEmailRoles[email.toLowerCase()] ?? teamEmailRoles[email];
  return role === "admin" || role === "employee";
};

const INVEST_PROTECTED = [
  "/invest/business-plan",
  "/invest/pitch",
  "/invest/whitepaper",
];

const guards: AstroAuthGuard[] = [
  {
    matches: (p) => p.startsWith("/admin"),
    requireRole: isStaff,
    loginPath: "/auth/login",
    unauthorizedPath: "/auth/error?reason=unauthorized",
  },
  {
    matches: (p) => INVEST_PROTECTED.some((r) => p.startsWith(r)),
    loginPath: "/auth/login",
  },
];

export const onRequest = createAstroAuthMiddleware(guards);
