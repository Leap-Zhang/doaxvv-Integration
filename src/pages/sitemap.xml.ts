import type { APIRoute } from 'astro';
import { girls } from '../data/girls.js';

const main = [
  '/', '/girls/', '/swimsuits/', '/skills/', '/guide/', '/guide/newbie/', '/guide/festival/' ,
  '/guide/swimsuit/', '/guide/growth/', '/guide/economy/', '/community/', '/search/', '/tools/',
  '/tools/panel/', '/tools/plan/'
];
const paths = [...main, ...girls.map((g) => `/girls/${g.id}/`)];

export const GET: APIRoute = ({ site }) => {
  const origin = String(site || 'http://localhost:4321').replace(/\/$/, '');
  const urls = paths.map((p) => `<url><loc>${origin}${p}</loc><changefreq>weekly</changefreq></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
