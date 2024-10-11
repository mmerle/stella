import { defineCliConfig } from 'sanity/cli';
const projectId = process.env.PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_STUDIO_DATASET;

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  // enable auto-updates for studios https://www.sanity.io/docs/cli#auto-updates
  autoUpdates: true,
});
