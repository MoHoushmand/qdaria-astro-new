// const blog = defineCollection({
//   type: 'content',
//   schema: z.object({
//     title: z.string(),
//     description: z.string().optional(),
//     pubDate: z.date(),
//     author: z.string().optional(),
//     image: z.string().optional(),
//     tags: z.array(z.string()).optional(),
//     draft: z.boolean().optional(),
//   }),
// });

import { defineCollection, z } from 'astro:content';

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
}
