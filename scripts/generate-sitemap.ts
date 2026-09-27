import { industries, objectives, pillars } from '../src/content/site';
import { articles, caseStudies } from '../src/content/insights';
import fs from 'fs';
import path from 'path';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

const urls = [
  '/',
  '/about',
  '/careers',
  '/case-studies',
  '/contact',
  '/digital',
  '/industries',
  '/insights',
  '/marcomm',
  '/privacy',
  '/solutions',
  '/technology',
];

industries.forEach(i => urls.push('/industries/' + i.slug));
objectives.forEach(o => urls.push('/solutions/' + o.slug));
articles.forEach(a => urls.push('/insights/' + a.slug));
caseStudies.forEach(c => urls.push('/case-studies/' + c.slug));

pillars.forEach(pillar => {
  pillar.capabilities.forEach(cap => {
    cap.services.forEach(s => {
      urls.push('/services/' + slugify(s));
    });
  });
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>https://macrowdigital.com${url}</loc>
    <changefreq>${url === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
console.log('Sitemap generated with ' + urls.length + ' URLs.');
