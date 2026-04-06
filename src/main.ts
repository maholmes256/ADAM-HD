import bootstrap from "./bootstrapGame";

const world = new Engine();

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

void bootstrap();
