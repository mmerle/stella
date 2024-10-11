import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from '@lib/sanity/schemas';

const projectId = import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_STUDIO_DATASET;

export default defineConfig({
  name: 'stella',
  title: 'Stella',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
