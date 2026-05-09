export const SHOW_ACHIEVEMENTS_UI = false;

function initialsFor(name = "", email = "") {
  const source = name || email || "Explorer";
  return source
    .split(/[ ._@-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function normalizeStudentProfile(user, index = 0) {
  const displayName = user.displayName || user.name || user.email || `Student ${index + 1}`;
  const accuracy = user.accuracy ?? user.acc ?? 0;

  return {
    id: user.id || user.userID || index + 1,
    name: displayName.toUpperCase(),
    init: initialsFor(displayName, user.email),
    level: Number(user.level || user.grade || 1),
    xp: Number(user.xp || 0),
    acc: Number(accuracy),
    streak: Number(user.streak || 0),
    achievements: user.achievements || [],
  };
}

export function screenForRole(role) {
  return role ? "student" : "home";
}

export function xpForLevel(level) {
  return Math.max(0, (Number(level || 1) - 1) * 200);
}
