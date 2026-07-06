import { defineCollection, z } from 'astro:content';

// ── Products Collection ──────────────────────────────────────
const products = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),                          // e.g. "EV-Pro® 48V"
    slug:        z.string(),                          // e.g. "ev-pro-48"
    category:    z.enum(['electric', 'gas', 'racing', 'junior']),
    tagline:     z.string(),                          // short one-liner
    image:       z.string(),                          // /images/ev-pro-48/1.jpg
    gallery:     z.array(z.string()).optional(),      // additional images
    badge:       z.string().optional(),               // e.g. "Best Seller"
    specs: z.object({
      motor:     z.string().optional(),
      engine:    z.string().optional(),
      topSpeed:  z.string(),
      weight:    z.string().optional(),
      chargeTime:z.string().optional(),
      fuelTank:  z.string().optional(),
      extra:     z.string().optional(),
    }),
    features:    z.array(z.string()),                 // bullet list
    order:       z.number().default(0),               // display order
  }),
});

// ── Projects Collection ──────────────────────────────────────
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),                          // e.g. "SpeedZone Grand Prix"
    slug:        z.string(),                          // e.g. "speedzone-grand-prix"
    category:    z.enum(['outdoor', 'indoor', 'resort', 'fec', 'corporate']),
    location:    z.string(),                          // e.g. "California, USA"
    country:     z.string(),                          // e.g. "USA"
    image:       z.string(),                          // main image
    stats: z.object({
      trackLength: z.string().optional(),
      kartCount:   z.string().optional(),
      duration:    z.string().optional(),
      investment:  z.string().optional(),
    }),
    tags:        z.array(z.string()),                 // e.g. ["Turnkey", "Electric"]
    featured:    z.boolean().default(false),
    order:       z.number().default(0),
  }),
});

export const collections = { products, projects };
