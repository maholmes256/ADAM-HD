import CollectibleOrb from "../components/CollectibleOrb";
import PlayerControlled from "../components/PlayerControlled";
import Transform from "../components/Transform";
import { Engine } from "../core/Engine";
import { System } from "../core/types";
import { uiState } from "../store/uiState";

const ORB_TRIGGER_DISTANCE = 0.8;

export default class OrbInteractionSystem implements System {
  tick(_delta: number, engine: Engine) {
    if (uiState.getSnapshot().overlayOpen) {
      return;
    }

    const player = engine.getEntitiesWith([PlayerControlled, Transform])[0];
    if (player === undefined) {
      return;
    }

    const playerTransform = engine.getComponent(player, Transform) as
      | Transform
      | undefined;
    if (!playerTransform) {
      return;
    }

    const orbs = engine.getEntitiesWith([CollectibleOrb, Transform]);
    for (const orbEntity of orbs) {
      const orbTransform = engine.getComponent(orbEntity, Transform) as
        | Transform
        | undefined;
      const orb = engine.getComponent(orbEntity, CollectibleOrb) as
        | CollectibleOrb
        | undefined;

      if (!orbTransform || !orb) {
        continue;
      }

      const distance = Math.hypot(
        playerTransform.x - orbTransform.x,
        playerTransform.y - orbTransform.y,
      );

      if (distance <= ORB_TRIGGER_DISTANCE) {
        uiState.openProblemOverlay(orbEntity, orb.grade);
        return;
      }
    }
  }
}
