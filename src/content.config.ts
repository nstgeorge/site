import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

/*
title: Requiem
releaseDate: 1/26/2020
genres: orchestral
image: ./images/requiem.jpg
bandcamp: https://natestgeorge.bandcamp.com/album/requiem
spotify: https://open.spotify.com/album/6NW8w7dZhZIhgekVhcbp8h
order: 3
*/

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.string(),
    order: z.number(),
    headerPhoto: z.optional(image()),
    draft: z.optional(z.boolean()),
    tags: z.string()
  })
})

const music = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/music" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    releaseDate: z.string(),
    order: z.number(),
    image: image(),
    bandcamp: z.string(),
    spotify: z.string(),
    genres: z.string()
  })
})

const code = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/code" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    releaseDate: z.string(),
    order: z.number(),
    image: image(),
    github: z.string(),
    technologies: z.string(),
    tags: z.string()
  })
})

export const collections = { blog, music, code }