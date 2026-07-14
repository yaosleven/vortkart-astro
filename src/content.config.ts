import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ── Products Collection ──────────────────────────────────────
const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title:       z.string(),
    category:    z.enum(['electric', 'gas', 'racing', 'junior']),
    tagline:     z.string(),
    image:       z.string(),
    gallery:     z.array(z.string()).optional(),
    badge:       z.string().optional(),
    specs: z.object({
      motor:      z.string().optional(),
      engine:     z.string().optional(),
      topSpeed:   z.string(),
      weight:     z.string().optional(),
      chargeTime: z.string().optional(),
      fuelTank:   z.string().optional(),
      extra:      z.string().optional(),
    }),
    features: z.array(z.string()),
    order:    z.number().default(0),
  }),
});

// ── Projects Collection ──────────────────────────────────────
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title:    z.string(),
    category: z.enum(['outdoor', 'indoor', 'resort', 'fec', 'corporate']),
    location: z.string(),
    country:  z.string(),
    image:    z.string(),
    stats: z.object({
      trackLength: z.string().optional(),
      kartCount:   z.string().optional(),
      duration:    z.string().optional(),
      investment:  z.string().optional(),
    }),
    tags:     z.array(z.string()),
    featured: z.boolean().default(false),
    order:    z.number().default(0),
  }),
});

// ── Blog Collection ──────────────────────────────────────
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    date:        z.string(),
    image:       z.string(),
    author:      z.string().default('VortKart Team'),
    category:    z.enum(['industry', 'guide', 'news', 'case-study']),
    tags:        z.array(z.string()).default([]),
    featured:    z.boolean().default(false),
    order:       z.number().default(0),
  }),
});

export const collections = { products, projects, blog };
