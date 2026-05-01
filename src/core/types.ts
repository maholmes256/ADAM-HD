import { Engine } from "./Engine";

export type Entity = number;

export abstract class Component {
  static componentType: string;

  // Optional cleanup logic
  destroy(): void {}
}

export type ComponentClass<T extends Component> = {
  new (...args: any[]): T;
  componentType: string;
};

export interface System {
  tick(delta: number, engine: Engine): void;
}
