<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { PUBLIC_GA_ID } from '$env/static/public';

	function initGtag(id: string) {
		if (!browser || !id) return;

		// Load gtag script once
		if (!document.querySelector('script[data-gtag]')) {
			const script = document.createElement('script');
			script.async = true;
			script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
			script.setAttribute('data-gtag', 'true');
			document.head.appendChild(script);
		}

		// Initialize dataLayer and gtag
		(window as any).dataLayer = (window as any).dataLayer || [];
		function gtag(...args: any[]) {
			(window as any).dataLayer.push(args);
		}
		gtag('js', new Date());
		gtag('config', id, { page_path: location.pathname });

		// Track SPA navigations
		afterNavigate((nav) => {
			gtag('event', 'page_view', {
				page_path: nav?.to?.pathname || location.pathname,
			});
		});
	}

	$effect(() => {
		if (browser && PUBLIC_GA_ID) {
			initGtag(PUBLIC_GA_ID);
		}
	});
</script>

<!-- No markup needed; analytics runs client-side -->
