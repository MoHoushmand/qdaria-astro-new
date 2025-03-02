import { defineCollection, z } from 'astro:content';

const otherPages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
    authors: z.array(z.string()).optional(),
    pubDate: z.string().transform((str) => new Date(str)),
    updatedDate: z.string().transform((str) => new Date(str)).optional(),
    heroImage: z.any(),
    categories: z.array(z.string()).default([]),
  }),
});

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.any(),
    about: z.string().optional(),
    email: z.string().optional(),
    authorLink: z.string().optional(),
  }),
});

export const collections = {
  otherPages,
  blog,
  authors,
};
