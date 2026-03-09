import { env } from '$env/dynamic/private';
import { createClient, type Asset, type Entry } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Document } from '@contentful/rich-text-types';

export type BlogPost = {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	content: string; // expected HTML (used with {@html} in the UI)
	author_name: string;
	author_image: string | null;
	cover_image: string;
	tags: string[];
	category: string;
	seo_title: string | null;
	seo_description: string | null;
	published: boolean;
	read_time: number;
	published_date: string | null;
	updated_date: string | null;
};

/**
 * Contentful model (as provided):
 * - content type: blog
 * - fields:
 *   - computerScience (Short text) -> title
 *   - img (Media) -> cover image
 *   - reaganEnoch (Reference) -> author-like reference
 *   - body (Rich text) -> content
 */
type ContentfulBlogFields = {
	computerScience?: string;
	img?: Asset;
	reaganEnoch?: Entry<Record<string, any>>;
	body?: Document;
};

function requiredEnv(name: string): string {
	const value = env[name];
	if (!value) throw new Error(`Missing environment variable: ${name}`);
	return value;
}

function assetUrl(asset: Asset | undefined): string | null {
	const url = (asset?.fields as any)?.file?.url as string | undefined;
	if (!url) return null;
	return url.startsWith('//') ? `https:${url}` : url;
}

function createContentfulClient(opts?: { preview?: boolean }) {
	const preview = opts?.preview ?? false;

	return createClient({
		space: requiredEnv('CONTENTFUL_SPACE_ID'),
		environment: env.CONTENTFUL_ENVIRONMENT || 'master',
		accessToken: preview
			? requiredEnv('CONTENTFUL_PREVIEW_ACCESS_TOKEN')
			: requiredEnv('CONTENTFUL_DELIVERY_ACCESS_TOKEN'),
		host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
	});
}

function estimateReadTimeMinutesFromHtml(html: string): number {
	const text = html
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	const words = text ? text.split(' ').length : 0;
	// ~200 wpm reading speed, min 1
	return Math.max(1, Math.round(words / 200));
}

function decodeHtmlEntities(input: string): string {
	// Handle double-encoded numeric entities like "&amp;#39;" first.
	let s = input.replace(/&amp;#/g, '&#').replace(/&amp;quot;/g, '&quot;');

	// Decode common named entities.
	s = s
		.replaceAll('&nbsp;', ' ')
		.replaceAll('&quot;', '"')
		.replaceAll('&apos;', "'")
		.replaceAll('&lt;', '<')
		.replaceAll('&gt;', '>')
		.replaceAll('&amp;', '&');

	// Decode decimal + hex numeric entities.
	s = s.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
	s = s.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));

	return s;
}

function buildExcerptFromHtml(html: string, maxLen = 160): string {
	const text = html
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	const decoded = decodeHtmlEntities(text);
	if (decoded.length <= maxLen) return decoded;
	return `${decoded.slice(0, maxLen).trimEnd()}…`;
}

function authorFromReference(ref: Entry<Record<string, any>> | undefined): { name: string; image: string | null } {
	if (!ref) return { name: 'Techgetafrica', image: null };

	const fields = (ref.fields ?? {}) as Record<string, any>;

	// Try a few likely field IDs for "name"
	const nameCandidate =
		fields.name ??
		fields.fullName ??
		fields.title ??
		fields.computerScience ?? // in case author entry reuses same naming convention
		null;

	// Try a few likely field IDs for "image"
	const imageCandidate: Asset | undefined = fields.image ?? fields.img ?? fields.avatar ?? undefined;

	return {
		name: typeof nameCandidate === 'string' && nameCandidate.trim() ? nameCandidate : 'Techgetafrica',
		image: assetUrl(imageCandidate) ?? null,
	};
}

function mapBlogEntry(entry: Entry<ContentfulBlogFields>): BlogPost {
	const title = entry.fields.computerScience ?? 'Untitled';
	const coverImage = assetUrl(entry.fields.img) ?? 'https://placehold.co/1200x630/png?text=Techgetafrica';
	const author = authorFromReference(entry.fields.reaganEnoch);

	const html = entry.fields.body ? documentToHtmlString(entry.fields.body) : '';

	return {
		id: entry.sys.id,
		// Your model does not provide a dedicated slug field; use the entry id for stable routing.
		slug: entry.sys.id,
		title,
		content: html,
		excerpt: buildExcerptFromHtml(html),
		author_name: author.name,
		author_image: author.image,
		cover_image: coverImage,
		tags: [],
		category: 'General',
		seo_title: null,
		seo_description: null,
		published: true,
		read_time: estimateReadTimeMinutesFromHtml(html),
		published_date: entry.sys.createdAt ?? null,
		updated_date: entry.sys.updatedAt ?? null,
	};
}

export async function getBlogPosts(opts?: { preview?: boolean }): Promise<BlogPost[]> {
	const client = createContentfulClient({ preview: opts?.preview });
	const contentType = env.CONTENTFUL_BLOG_CONTENT_TYPE || 'blog';

	const res = await client.getEntries<ContentfulBlogFields>({
		content_type: contentType,
		order: ['-sys.createdAt'],
		include: 2,
	});

	return res.items.map(mapBlogEntry);
}

export async function getBlogPostBySlug(slug: string, opts?: { preview?: boolean }): Promise<BlogPost | null> {
	const client = createContentfulClient({ preview: opts?.preview });
	const contentType = env.CONTENTFUL_BLOG_CONTENT_TYPE || 'blog';

	try {
		// We use the entry id as the route slug.
		const entry = await client.getEntry<ContentfulBlogFields>(slug, { include: 2 });

		// Defensive: ensure it's the right content type
		const ct = (entry.sys as any)?.contentType?.sys?.id as string | undefined;
		if (ct && ct !== contentType) return null;

		return mapBlogEntry(entry);
	} catch (err: any) {
		// contentful throws when not found
		if (err?.name === 'NotFound') return null;
		throw err;
	}
}

