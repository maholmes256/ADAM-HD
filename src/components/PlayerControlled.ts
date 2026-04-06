import { Component } from "../core/types";

export type FacingDirection =
  | "south"
  | "southwest"
  | "northwest"
  | "north"
  | "northeast"
  | "southeast";

export default class PlayerControlled extends Component {
  static componentType = "PlayerControlled";

  facing: FacingDirection = "south";
  isMoving = false;
}
