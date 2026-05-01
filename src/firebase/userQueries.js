import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  runTransaction,
  arrayUnion,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function normalizeRole(role) {
  if (!role) return "Student";
  const lower = String(role).toLowerCase();
  return lower === "parent" ? "parent" : lower === "teacher" ? "teacher" : "Student";
}

export async function createUser(userId, userData) {
  await setDoc(
    doc(db, "users", userId),
    {
      userID: userId,
      displayName: userData.displayName || userData.name || "",
      email: userData.email,
      role: normalizeRole(userData.role),
      grade: Number(userData.grade || 1),
      parentID: userData.parentID || null,
      level: Number(userData.level || 1),
      xp: Number(userData.xp || 0),
      accuracy: Number(userData.accuracy || userData.acc || 0),
      streak: Number(userData.streak || 0),
      achievements: userData.achievements || [],
    },
    { merge: true },
  );
}

export async function getUser(userId) {
  const snap = await getDoc(doc(db, "users", userId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function updateGrade(userId, grade) {
  await updateDoc(doc(db, "users", userId), { grade: Number(grade) });
}

export async function updateEmail(userId, email) {
  await updateDoc(doc(db, "users", userId), { email });
}

export async function unlockAchievement(userId, achievement) {
  await updateDoc(doc(db, "users", userId), {
    achievements: arrayUnion(achievement),
  });
}

export async function getChildrenByParent(parentId) {
  const q = query(collection(db, "users"), where("parentID", "==", parentId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getStudentsByGrade(grade) {
  const q = query(
    collection(db, "users"),
    where("grade", "==", Number(grade)),
    where("role", "==", "Student"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getUsersByRole(role) {
  const q = query(collection(db, "users"), where("role", "==", normalizeRole(role)));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateAccountInfo(userId, updates) {
  await updateDoc(doc(db, "users", userId), updates);
}

export async function awardUserXp(userId, xpAmount) {
  const userRef = doc(db, "users", userId);

  return runTransaction(db, async (transaction) => {
    const snap = await transaction.get(userRef);
    if (!snap.exists()) throw new Error(`User ${userId} not found`);

    const user = snap.data();
    const nextXp = Number(user.xp || 0) + Number(xpAmount || 0);
    const nextLevel = Math.floor(nextXp / 200) + 1;
    const nextStreak = Number(user.streak || 0) + 1;

    transaction.update(userRef, {
      xp: nextXp,
      level: nextLevel,
      streak: nextStreak,
    });

    return {
      id: snap.id,
      ...user,
      xp: nextXp,
      level: nextLevel,
      streak: nextStreak,
    };
  });
}

export async function resetAchievements(userId) {
  await updateDoc(doc(db, "users", userId), {
    achievements: [],
  });
}
