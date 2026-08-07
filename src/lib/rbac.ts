import type { Role } from "./jwt";

export const PERMISSIONS = {
  // Post & Content Permissions
  POST_CREATE: "post:create",
  POST_EDIT_OWN: "post:edit_own",
  POST_DELETE_OWN: "post:delete_own",
  POST_DELETE_ANY: "post:delete_any",
  
  // News & Briefings
  NEWS_CREATE: "news:create",
  NEWS_EDIT: "news:edit",
  NEWS_DELETE: "news:delete",

  // Events & Speakers
  EVENT_CREATE: "event:create",
  EVENT_EDIT_CHAPTER: "event:edit_chapter",
  EVENT_DELETE: "event:delete",

  // Chapter & User Governance
  CHAPTER_MANAGE: "chapter:manage",
  USER_MANAGE_ROLE: "user:manage_role",
  USER_SUSPEND: "user:suspend",

  // System & Analytics
  ANALYTICS_VIEW: "analytics:view",
  SYSTEM_CONFIG: "system:config",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: Object.values(PERMISSIONS),
  GLOBAL_ADMIN: [
    PERMISSIONS.POST_CREATE,
    PERMISSIONS.POST_EDIT_OWN,
    PERMISSIONS.POST_DELETE_OWN,
    PERMISSIONS.POST_DELETE_ANY,
    PERMISSIONS.NEWS_CREATE,
    PERMISSIONS.NEWS_EDIT,
    PERMISSIONS.NEWS_DELETE,
    PERMISSIONS.EVENT_CREATE,
    PERMISSIONS.EVENT_EDIT_CHAPTER,
    PERMISSIONS.EVENT_DELETE,
    PERMISSIONS.CHAPTER_MANAGE,
    PERMISSIONS.USER_MANAGE_ROLE,
    PERMISSIONS.USER_SUSPEND,
    PERMISSIONS.ANALYTICS_VIEW,
  ],
  COUNTRY_ADMIN: [
    PERMISSIONS.POST_CREATE,
    PERMISSIONS.POST_EDIT_OWN,
    PERMISSIONS.POST_DELETE_OWN,
    PERMISSIONS.NEWS_CREATE,
    PERMISSIONS.EVENT_CREATE,
    PERMISSIONS.EVENT_EDIT_CHAPTER,
    PERMISSIONS.CHAPTER_MANAGE,
    PERMISSIONS.ANALYTICS_VIEW,
  ],
  CHAPTER_LEAD: [
    PERMISSIONS.POST_CREATE,
    PERMISSIONS.POST_EDIT_OWN,
    PERMISSIONS.POST_DELETE_OWN,
    PERMISSIONS.EVENT_CREATE,
    PERMISSIONS.EVENT_EDIT_CHAPTER,
    PERMISSIONS.ANALYTICS_VIEW,
  ],
  MODERATOR: [
    PERMISSIONS.POST_CREATE,
    PERMISSIONS.POST_EDIT_OWN,
    PERMISSIONS.POST_DELETE_OWN,
    PERMISSIONS.POST_DELETE_ANY,
  ],
  SPEAKER: [
    PERMISSIONS.POST_CREATE,
    PERMISSIONS.POST_EDIT_OWN,
    PERMISSIONS.POST_DELETE_OWN,
  ],
  MEMBER: [
    PERMISSIONS.POST_CREATE,
    PERMISSIONS.POST_EDIT_OWN,
    PERMISSIONS.POST_DELETE_OWN,
  ],
  GUEST: [],
};

export function getRolePermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

export function hasPermission(role: Role, permission: Permission): boolean {
  const permissions = getRolePermissions(role);
  return permissions.includes(permission);
}
