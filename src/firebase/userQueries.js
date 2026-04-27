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

// Create a new user profile after signup
export async function createUser(userId, userData) {
  await setDoc(doc(db, "users", userId), {
    userID: userId,
    email: userData.email,
    role: userData.role, // "Student" | "parent" | "teacher"
    grade: userData.grade, // int
    parentID: userData.parentID || null,
    achievements: [],
  });
}

// Get a single user by ID
export async function getUser(userId) {
  const snap = await getDoc(doc(db, "users", userId));
  return snap.exists() ? snap.data() : null;
}

// Update a user's grade
export async function updateGrade(userId, grade) {
  await updateDoc(doc(db, "users", userId), { grade });
}

// Update a user's email
export async function updateEmail(userId, email) {
  await updateDoc(doc(db, "users", userId), { email });
}

// Add an achievement (won't add duplicates)
export async function unlockAchievement(userId, achievement) {
  await updateDoc(doc(db, "users", userId), {
    achievements: arrayUnion(achievement),
  });
}

// Get all students linked to a parent
export async function getChildrenByParent(parentId) {
  const q = query(collection(db, "users"), where("parentID", "==", parentId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
}

// Get all students in a class (by grade)
export async function getStudentsByGrade(grade) {
  const q = query(
    collection(db, "users"),
    where("grade", "==", grade),
    where("role", "==", "Student"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
}

// Get all users with a specific role
export async function getUsersByRole(role) {
  const q = query(collection(db, "users"), where("role", "==", role));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
}

// Update account info (name, email, parentID)
export async function updateAccountInfo(userId, updates) {
  await updateDoc(doc(db, "users", userId), updates);
}

// Reset a student's achievements
export async function resetAchievements(userId) {
  await updateDoc(doc(db, "users", userId), {
    achievements: [],
  });
}
