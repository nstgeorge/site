import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import rehypeFigure from "rehype-figure";

import opengraphImage from "astro-opengraph-image";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://natestgeorge.com",
  integrations: [mdx(), opengraphImage()],

  vite: {
    server: {
      allowedHosts: ["real-pianos-begin.loca.lt"]
    },
    plugins: [tailwindcss()]
  },

  markdown: {
    rehypePlugins: [rehypeFigure],
    shikiConfig: {
      themes: {
        light: "vitesse-light",
        dark: "kanagawa-dragon",
      },
    },
  },

  image: {
    // Used for all Markdown images; not configurable per-image
    // Used for all `<Image />` and `<Picture />` components unless overridden with a prop
    experimentalLayout: "constrained",
  },

  experimental: {
    responsiveImages: true,
  },

  adapter: netlify(),
});