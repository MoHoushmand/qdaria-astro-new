import { defineCollection, z } from 'astro:content';
import { Image } from 'astro:assets';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    categories: z.array(z.string()),
    authors: z.array(z.string()).optional(),
    heroImage: z.string().transform((str) => new URL(str, import.meta.url)),
    draft: z.boolean().optional(),
  }),
});

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    bio: z.string().optional(),
    image: z.string().optional(),
    email: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

export const collections = {
  authors,
  blog,
}
