import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export async function createUser(userId, userData) {
  await setDoc(doc(db, "users", userId), {
    userID: userId,
    email: userData.email,
    role: userData.role,
    grade: userData.grade,
    parentID: userData.parentID || null,
    achievements: [],
  });
}

export async function getUser(userId) {
  const snap = await getDoc(doc(db, "users", userId));
  return snap.exists() ? snap.data() : null;
}

export async function updateGrade(userId, grade) {
  await updateDoc(doc(db, "users", userId), { grade });
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
  return snap.docs.map((d) => d.data());
}

export async function getStudentsByGrade(grade) {
  const q = query(
    collection(db, "users"),
    where("grade", "==", grade),
    where("role", "==", "Student"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
}

export async function getUsersByRole(role) {
  const q = query(collection(db, "users"), where("role", "==", role));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
}

export async function updateAccountInfo(userId, updates) {
  await updateDoc(doc(db, "users", userId), updates);
}

export async function resetAchievements(userId) {
  await updateDoc(doc(db, "users", userId), {
    achievements: [],
  });
}
