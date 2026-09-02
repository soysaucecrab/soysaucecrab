import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const bilingual = z.object({ en: z.string(), ko: z.string() });

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    date: z.coerce.date(),
    title: bilingual,
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    date: z.coerce.date(),
    status: z.enum(['active', 'shipped', 'archived']),
    tags: z.array(z.string()),
    blurb: bilingual,
    links: z.object({
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
      paper: z.string().url().optional(),
    }),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: bilingual,
    venue: z.string(),
    authors: z.string(),
    date: z.coerce.date(),
    type: z.enum(['conference', 'workshop', 'preprint', 'poster']),
    contribution: bilingual.optional(),
    links: z.object({
      paper: z.string().url().optional(),
      code: z.string().url().optional(),
      demo: z.string().url().optional(),
    }),
  }),
});

export const collections = { news, projects, publications };
