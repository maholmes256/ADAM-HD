import type { Entity } from "../core/types";

export type UISnapshot = {
  overlayOpen: boolean;
  activeOrbEntity: Entity | null;
  activeGrade: number;
  totalOrbs: number;
  remainingOrbs: number;
};

type Listener = () => void;

let snapshot: UISnapshot = {
  overlayOpen: false,
  activeOrbEntity: null,
  activeGrade: 1,
  totalOrbs: 0,
  remainingOrbs: 0,
};

const listeners = new Set<Listener>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function updateSnapshot(nextSnapshot: UISnapshot) {
  snapshot = nextSnapshot;
  emitChange();
}

export const uiState = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  getSnapshot() {
    return snapshot;
  },

  setOrbCounts(totalOrbs: number, remainingOrbs = totalOrbs) {
    updateSnapshot({
      ...snapshot,
      totalOrbs,
      remainingOrbs,
    });
  },

  openProblemOverlay(activeOrbEntity: Entity, activeGrade = 1) {
    updateSnapshot({
      ...snapshot,
      overlayOpen: true,
      activeOrbEntity,
      activeGrade,
    });
  },

  closeProblemOverlay() {
    updateSnapshot({
      ...snapshot,
      overlayOpen: false,
      activeOrbEntity: null,
    });
  },

  consumeActiveOrb() {
    updateSnapshot({
      ...snapshot,
      overlayOpen: false,
      activeOrbEntity: null,
      remainingOrbs: Math.max(0, snapshot.remainingOrbs - 1),
    });
  },
};
