import { supabase } from '$lib/supabase';

export async function GET() {
	const baseUrl = 'https://techgetafrica.com';

	// Fetch published blog posts from Supabase
	const { data: blogPosts, error } = await supabase
		.from('blog_posts')
		.select('slug, published_date, updated_date')
		.eq('published', true)
		.order('published_date', { ascending: false });

	if (error || !blogPosts) {
		console.error('Error fetching blog posts for sitemap:', error);
		return new Response('Error generating sitemap', { status: 500 });
	}

	const blogPostRoutes = blogPosts.map((post) => ({
		path: `/blog/${post.slug}`,
		priority: 0.8,
		changefreq: 'weekly' as const,
		lastmod: post.updated_date || post.published_date,
	}));

	// Add main blog page
	const allRoutes = [
		{
			path: '/blog',
			priority: 0.9,
			changefreq: 'daily' as const,
			lastmod: blogPosts[0]?.published_date || new Date().toISOString().split('T')[0],
		},
		...blogPostRoutes,
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
	.map(
		(route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600',
		},
	});
}
