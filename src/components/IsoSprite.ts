import { Sprite } from "pixi.js";
import { Component } from "../core/types";

export default class IsoSprite extends Component {
  static componentType = 'IsoSprite';

  constructor(public sprite: Sprite, public scale: number = 1) {
    super();
  }

  // This is called when the component is removed or entity is destroyed
  override destroy(): void {
    if (this.sprite) {
      this.sprite.removeFromParent(); // Take it off the Pixi stage
      this.sprite.destroy();          // Kill the sprite instance
    }
  }
}
