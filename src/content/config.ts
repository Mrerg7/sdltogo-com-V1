import { defineCollection, z } from 'astro:content';

const valueProps = defineCollection({
  type: 'data',
  schema: z.object({
    label: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

const useCases = defineCollection({
  type: 'data',
  schema: z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
    tagline: z.string(),
    order: z.number(),
  }),
});

const marketStats = defineCollection({
  type: 'data',
  schema: z.object({
    label: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

export const collections = { valueProps, useCases, marketStats };
