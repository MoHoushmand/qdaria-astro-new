import { defineCollection, z } from 'astro:content';
import type { SchemaContext } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }: SchemaContext) => z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    categories: z.array(z.string()),
    authors: z.array(z.string()).optional(),
    heroImage: image(),
    draft: z.boolean().optional(),
  }),
});

const authors = defineCollection({
  type: 'content',
  schema: ({ image }: SchemaContext) => z.object({
    name: z.string(),
    role: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.string(),
    email: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

const otherPages = defineCollection({
  type: 'content',
  schema: {
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
  },
});

export const collections = {
  authors,
  blog,
  otherPages,
}
