import { getCollection } from 'astro:content';
import { SITE } from '../config/site';

const priorities: Record<string, string> = {
  '/': '1.0',
  '/services': '0.9',
  '/portfolio': '0.9',
  '/commercial-go-karts': '0.9',
  '/indoor-karting': '0.9',
  '/track-design': '0.9',
  '/factory': '0.8',
  '/contact': '0.8',
  '/blog': '0.8',
  '/privacy': '0.3',
  '/terms': '0.3',
  '/thank-you': '0.1',
};

function formatUrl(path: string) {
  const base = SITE.url.replace(/\/$/, '');
  return `${base}${path === '/' ? '/' : path}`;
}

function renderUrl(path: string, lastmod: string) {
  const priority = priorities[path] ?? (path.startsWith('/product') || path.startsWith('/project') ? '0.7' : '0.5');
  const changefreq = path === '/' || path === '/portfolio' || path === '/blog' ? 'weekly' : path.startsWith('/product') || path.startsWith('/project') || path.startsWith('/blog/') ? 'monthly' : 'yearly';

  return [
    '  <url>',
    `    <loc>${formatUrl(path)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

export async function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const products = await getCollection('products');
  const projects = await getCollection('projects');
  const blog = await getCollection('blog');

  const paths = [
    '/',
    '/factory',
    '/services',
    '/portfolio',
    '/contact',
    '/commercial-go-karts',
    '/indoor-karting',
    '/track-design',
    '/blog',
    ...blog.map((entry) => `/blog/${entry.id}`),
    ...products.map((entry) => `/product/${entry.id}`),
    ...projects.map((entry) => `/project/${entry.id}`),
    '/privacy',
    '/terms',
    '/thank-you',
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((path) => renderUrl(path, lastmod)),
    '</urlset>',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}