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

<<<<<<< HEAD
// Create a new user profile after signup
=======
>>>>>>> reactUI
export async function createUser(userId, userData) {
  await setDoc(doc(db, "users", userId), {
    userID: userId,
    email: userData.email,
<<<<<<< HEAD
    role: userData.role, // "Student" | "parent" | "teacher"
    grade: userData.grade, // int
=======
    role: userData.role,
    grade: userData.grade,
>>>>>>> reactUI
    parentID: userData.parentID || null,
    achievements: [],
  });
}

<<<<<<< HEAD
// Get a single user by ID
=======
>>>>>>> reactUI
export async function getUser(userId) {
  const snap = await getDoc(doc(db, "users", userId));
  return snap.exists() ? snap.data() : null;
}

<<<<<<< HEAD
// Update a user's grade
=======
>>>>>>> reactUI
export async function updateGrade(userId, grade) {
  await updateDoc(doc(db, "users", userId), { grade });
}

<<<<<<< HEAD
// Update a user's email
=======
>>>>>>> reactUI
export async function updateEmail(userId, email) {
  await updateDoc(doc(db, "users", userId), { email });
}

<<<<<<< HEAD
// Add an achievement (won't add duplicates)
=======
>>>>>>> reactUI
export async function unlockAchievement(userId, achievement) {
  await updateDoc(doc(db, "users", userId), {
    achievements: arrayUnion(achievement),
  });
}

<<<<<<< HEAD
// Get all students linked to a parent
=======
>>>>>>> reactUI
export async function getChildrenByParent(parentId) {
  const q = query(collection(db, "users"), where("parentID", "==", parentId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
}

<<<<<<< HEAD
// Get all students in a class (by grade)
=======
>>>>>>> reactUI
export async function getStudentsByGrade(grade) {
  const q = query(
    collection(db, "users"),
    where("grade", "==", grade),
    where("role", "==", "Student"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
}

<<<<<<< HEAD
// Get all users with a specific role
=======
>>>>>>> reactUI
export async function getUsersByRole(role) {
  const q = query(collection(db, "users"), where("role", "==", role));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
}

<<<<<<< HEAD
// Update account info (name, email, parentID)
=======
>>>>>>> reactUI
export async function updateAccountInfo(userId, updates) {
  await updateDoc(doc(db, "users", userId), updates);
}

<<<<<<< HEAD
// Reset a student's achievements
=======
>>>>>>> reactUI
export async function resetAchievements(userId) {
  await updateDoc(doc(db, "users", userId), {
    achievements: [],
  });
}
