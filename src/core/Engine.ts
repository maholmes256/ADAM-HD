import { System, Component, Entity, ComponentClass } from "./types";

export class Engine {
  private nextEntityId: Entity = 0;
  private components: Map<string, Map<Entity, Component>> = new Map();
  private systems: System[] = [];

  public createEntity():Entity {
    return this.nextEntityId++;
  }

  public destroyEntity(entity: Entity): void {
    for (const store of this.components.values()) {
      const component = store.get(entity);
      if (component) {
        component.destroy();
        store.delete(entity);
      }
    }
  } 

  public getComponent<T extends Component>(entity: Entity, componentClass: ComponentClass<T>) {
    return this.components.get(componentClass.componentType)?.get(entity);
  }

  public getEntitiesWith(componentClasses: ComponentClass<any>[]): Entity[] {
    if (componentClasses.length === 0) return [];

    const firstType = componentClasses[0].componentType;
    const store = this.components.get(firstType);

    if (!store) return [];

    let results = Array.from(store.keys());

    for (let i = 1; i < componentClasses.length; i++) {
      const type = componentClasses[i].componentType;
      const nextStore = this.components.get(type);
      if (!nextStore) return [];
      results = results.filter(entity => nextStore.has(entity));
    }

    return results;
  }

  public addComponent(entity: Entity, component: Component) : void{
    const type = (component.constructor as any).componentType;
    if (!this.components.has(type)) {
      this.components.set(type, new Map());
    }
    this.components.get(type)!.set(entity, component);
  }

  public removeComponent(entity: Entity, componentClass: any): void {
    const store = this.components.get(componentClass.componentType);
    if (store) {
      const component = store.get(entity);
      if (component) {
        component.destroy();
        store.delete(entity);
      }
    }
  }

  public addSystem(system: System){
    this.systems.push(system);
  }

  public tick(delta: number){
    for (const system of this.systems){
      system.tick(delta, this);
    }
  }
}

