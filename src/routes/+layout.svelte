<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Analytics from '$lib/components/Analytics.svelte';
	import { getOrganizationSchema } from '$lib/utils/seo';
	import { navigating } from '$app/stores';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	// Use slot to render the current route's page
	const organizationSchema = getOrganizationSchema();
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>Techgetafrica - Professional Technology Certifications</title>
	<meta
		name="description"
		content="Master in-demand technology skills with professional certifications from Techgetafrica. Learn from industry experts and boost your career."
	/>
	<meta name="keywords" content="certifications, online learning, technology courses, professional development, Africa" />
	<meta name="theme-color" content="#1F2937" />
	<meta name="robots" content="index, follow" />
	<link rel="icon" href={favicon} />
	<link rel="canonical" href="https://techgetafrica.com" />

	<!-- Open Graph / Social Media -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://techgetafrica.com/" />
	<meta property="og:title" content="Techgetafrica - Professional Technology Certifications" />
	<meta property="og:description" content="Master in-demand technology skills with professional certifications from Techgetafrica." />
	<meta property="og:image" content="https://via.placeholder.com/1200x630/F22B29/ffffff?text=Techgetafrica" />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://techgetafrica.com/" />
	<meta property="twitter:title" content="Techgetafrica - Professional Technology Certifications" />
	<meta property="twitter:description" content="Master in-demand technology skills with professional certifications from Techgetafrica." />
	<meta property="twitter:image" content="https://via.placeholder.com/1200x630/F22B29/ffffff?text=Techgetafrica" />

	<!-- Preload critical fonts for performance -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>

	<!-- JSON-LD Schema -->
	<script type="application/ld+json">
		{JSON.stringify(organizationSchema)}
	</script>
</svelte:head>

<!-- Main layout structure -->
{#if $navigating}
	<div class="fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center">
		<LoadingSpinner />
	</div>
{/if}
<div class="flex flex-col min-h-screen bg-white">
	<!-- Analytics (GA4) -->
	<Analytics />
	<!-- Navigation header -->
	<Navigation />

	<!-- Main content area -->
	<main class="flex-1">
		<slot />
	</main>

	<!-- Footer -->
	<Footer />
</div>
