import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
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
