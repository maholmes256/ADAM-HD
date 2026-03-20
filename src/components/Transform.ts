import { Component } from "../core/types";

export class Transform extends Component {
  static type = 'Transform';
  
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;
  public rotation: number = 0;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
