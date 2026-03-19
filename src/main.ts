import { Application, Assets, Sprite } from "pixi.js";
import { Engine } from "./core/Engine";

const world = new Engine();

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  // Listen for animate update
  app.ticker.add((time) => {
  });
})();
