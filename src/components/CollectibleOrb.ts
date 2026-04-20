import { Component } from "../core/types";

export default class CollectibleOrb extends Component {
  static componentType = "CollectibleOrb";

  constructor(public readonly grade: number = 1) {
    super();
  }
}
