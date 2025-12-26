import { json } from '@sveltejs/kit';

// Define all static routes in your site
const routes = [
	{ path: '/', priority: 1.0, changefreq: 'daily' },
	{ path: '/about', priority: 0.8, changefreq: 'weekly' },
	{ path: '/courses', priority: 0.9, changefreq: 'daily' },
	{ path: '/certificates', priority: 0.9, changefreq: 'daily' },
	{ path: '/blog', priority: 0.9, changefreq: 'daily' },
	{ path: '/auth/signin', priority: 0.6, changefreq: 'monthly' },
	{ path: '/auth/signup', priority: 0.6, changefreq: 'monthly' },
	{ path: '/privacy', priority: 0.5, changefreq: 'yearly' },
	{ path: '/terms', priority: 0.5, changefreq: 'yearly' },
];

// Sample course IDs - in production, fetch from your database
const courseIds = ['1', '2', '3', '4', '5', '6'];
const certificateIds = ['1', '2', '3', '4', '5', '6'];

export async function GET() {
	const baseUrl = 'https://techgetafrica.com';

	// Build dynamic routes
	const dynamicRoutes = [
		...courseIds.map((id) => ({
			path: `/courses/${id}`,
			priority: 0.8,
			changefreq: 'weekly',
		})),
		...certificateIds.map((id) => ({
			path: `/certificates/${id}`,
			priority: 0.8,
			changefreq: 'weekly',
		})),
	];

	const allRoutes = [...routes, ...dynamicRoutes];

	// Generate XML
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
	.map(
		(route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`,
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600', // Cache for 1 hour
		},
	});
}
