import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" })
})

const music = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/music" })
})

const code = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/code" })
})

export const collections = { blog, music, code }