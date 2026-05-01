import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { createContext, useContext } from "react";
import { awardUserXp, createUser, getUser } from "./userQueries";

export const AuthContext = createContext(null);

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}

function normalizeAppRole(role) {
  const lower = String(role || "student").toLowerCase();
  return lower === "parent" || lower === "teacher" ? lower : "student";
}

function firestoreRoleFor(role) {
  return role === "parent" ? "parent" : role === "teacher" ? "teacher" : "Student";
}

function authErrorMessage(error) {
  switch (error?.code) {
    case "auth/email-already-in-use":
      return "That email already has an account. Try signing in.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email or password is incorrect.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/missing-password":
      return "Enter your password.";
    default:
      return error?.message || "Authentication failed.";
  }
}

function normalizeUserProfile(firebaseUser, profile) {
  const role = normalizeAppRole(profile?.role);

  return {
    ...profile,
    id: firebaseUser.uid,
    displayName: profile?.displayName || firebaseUser.displayName || "",
    email: profile?.email || firebaseUser.email || "",
    role: firestoreRoleFor(role),
    grade: Number(profile?.grade || 1),
    level: Number(profile?.level || 1),
    xp: Number(profile?.xp || 0),
    streak: Number(profile?.streak || 0),
    achievements: profile?.achievements || [],
  };
}

export function AuthProvider({ children }) {
  const [authReady, setAuthReady] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  async function applySignedInUser(firebaseUser, profileOverride = null) {
    let profile = profileOverride || (await getUser(firebaseUser.uid));

    if (!profile) {
      profile = {
        id: firebaseUser.uid,
        displayName: firebaseUser.displayName || "",
        email: firebaseUser.email || "",
        role: "Student",
        grade: 1,
      };
      await createUser(firebaseUser.uid, profile);
    }

    const user = normalizeUserProfile(firebaseUser, profile);
    setCurrentUser(user);
    setAuthError(null);
    return user;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setCurrentUser(null);
        setAuthError(null);
        setAuthReady(true);
        return;
      }

      try {
        await applySignedInUser(firebaseUser);
      } catch (error) {
        console.warn("Firebase auth state restore failed", error);
        setAuthError(error);
      } finally {
        setAuthReady(true);
      }
    });

    return unsubscribe;
  }, []);

  async function login(role, profile = {}) {
    try {
      const email = profile.email;
      const password = profile.password;

      if (!email) throw new Error("Enter your email address.");
      if (!password) throw new Error("Enter your password.");

      const credential = profile.creating
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      if (profile.creating) {
        const accountRole = normalizeAppRole(role);
        const displayName = profile.displayName || email.split("@")[0];
        const userProfile = {
          id: credential.user.uid,
          displayName,
          email,
          role: firestoreRoleFor(accountRole),
          grade: Number(profile.grade || 1),
        };

        await updateProfile(credential.user, { displayName });
        await createUser(credential.user.uid, userProfile);
        await applySignedInUser(credential.user, userProfile);
      } else {
        await applySignedInUser(credential.user);
      }
    } catch (error) {
      throw new Error(authErrorMessage(error));
    }
  }

  async function logout() {
    await signOut(auth);
    setCurrentUser(null);
    setAuthError(null);
  }

  async function awardXp(xpAmount) {
    if (!currentUser?.id) return null;

    const updatedUser = await awardUserXp(currentUser.id, xpAmount);
    setCurrentUser(updatedUser);
    return updatedUser;
  }

  const value = {
    authReady,
    authError,
    currentUser,
    userType: currentUser ? normalizeAppRole(currentUser.role) : null,
    login,
    logout,
    awardXp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
