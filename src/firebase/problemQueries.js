import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";

// Store a generated problem
// expr matches your structure: { answer, left, op, right }
// spec matches your structure: { difficulty, topic, type }
export async function storeProblem(expr, spec) {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 12 * 60 * 60 * 1000); // 12 hours

  const docRef = await addDoc(collection(db, "problems"), {
    expr: {
      answer: expr.answer, // double
      left: expr.left, // double
      op: expr.op, // string e.g. "+"
      right: expr.right, // double
    },
    spec: {
      difficulty: spec.difficulty, // int e.g. 1
      topic: spec.topic, // e.g. "arithmetic"
      type: spec.type, // e.g. "addition"
    },
    createdAt: Timestamp.fromDate(now),
    expiresAt: Timestamp.fromDate(expiresAt),
  });

  return docRef.id;
}

// Get a single problem by ID
export async function getProblem(problemId) {
  const snap = await getDoc(doc(db, "problems", problemId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// Get all problems for a specific difficulty level
export async function getProblemsByDifficulty(difficulty) {
  const q = query(
    collection(db, "problems"),
    where("spec.difficulty", "==", difficulty),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Get all problems of a specific type e.g. "addition"
export async function getProblemsByType(type) {
  const q = query(collection(db, "problems"), where("spec.type", "==", type));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Get all problems by topic e.g. "arithmetic"
export async function getProblemsByTopic(topic) {
  const q = query(collection(db, "problems"), where("spec.topic", "==", topic));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Get all problems that haven't expired yet
export async function getActiveProblems() {
  const now = Timestamp.fromDate(new Date());
  const q = query(
    collection(db, "problems"),
    where("expiresAt", ">", now),
    orderBy("expiresAt"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Validate a user's answer against a stored problem
export async function validateAnswer(problemId, userAnswer) {
  const problem = await getProblem(problemId);
  if (!problem) throw new Error(`Problem ${problemId} not found`);
  return userAnswer === problem.expr.answer;
}
