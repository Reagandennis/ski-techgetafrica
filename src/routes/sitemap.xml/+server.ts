import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

// Define all static routes in your site
const staticRoutes = [
	{ path: '/', priority: 1.0, changefreq: 'daily' },
	{ path: '/about', priority: 0.8, changefreq: 'weekly' },
	{ path: '/accessibility', priority: 0.5, changefreq: 'yearly' },
	{ path: '/careers', priority: 0.7, changefreq: 'weekly' },
	{ path: '/certificates', priority: 0.9, changefreq: 'daily' },
	{ path: '/contact', priority: 0.8, changefreq: 'monthly' },
	{ path: '/cookies', priority: 0.5, changefreq: 'yearly' },
	{ path: '/courses', priority: 0.9, changefreq: 'daily' },
	{ path: '/learning-paths', priority: 0.8, changefreq: 'weekly' },
	{ path: '/pricing', priority: 0.8, changefreq: 'weekly' },
	{ path: '/privacy', priority: 0.5, changefreq: 'yearly' },
	{ path: '/terms', priority: 0.5, changefreq: 'yearly' },
	{ path: '/blog', priority: 0.9, changefreq: 'daily' },
	{ path: '/auth/signin', priority: 0.6, changefreq: 'monthly' },
	{ path: '/auth/signup', priority: 0.6, changefreq: 'monthly' },
];

export async function GET() {
	const baseUrl = 'https://techgetafrica.com';

	// Fetch courses from Supabase
	const { data: courses, error: coursesError } = await supabase
		.from('courses')
		.select('slug, updated_at')
		.eq('published', true);

	if (coursesError) {
		console.error('Error fetching courses for sitemap:', coursesError);
	}

	// Fetch certifications (hardcoded for now, as they are in the code)
	const certificationSlugs = ['cloud-architect', 'data-ai', 'cybersecurity', 'devops'];
	const certificationRoutes = certificationSlugs.map((slug) => ({
		path: `/certifications/${slug}`,
		priority: 0.8,
		changefreq: 'weekly' as const,
		lastmod: new Date().toISOString().split('T')[0],
	}));

	// Build dynamic routes
	const dynamicRoutes = [
		...(courses || []).map((course) => ({
			path: `/courses/${course.slug}`,
			priority: 0.8,
			changefreq: 'weekly' as const,
			lastmod: course.updated_at || new Date().toISOString().split('T')[0],
		})),
		...certificationRoutes,
	];

	const allRoutes = [...staticRoutes, ...dynamicRoutes];

	// Generate XML
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
	.map(
		(route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${route.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
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
