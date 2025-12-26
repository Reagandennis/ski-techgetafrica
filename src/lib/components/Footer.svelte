<script lang="ts">
	interface FooterLink {
		label: string;
		href: string;
	}

	interface FooterSection {
		title: string;
		links: FooterLink[];
	}

	const footerSections: FooterSection[] = [
		{
			title: 'Product',
			links: [
				{ label: 'Courses', href: '/courses' },
				{ label: 'Certificates', href: '/certificates' },
				{ label: 'Learning Paths', href: '/learning-paths' },
				{ label: 'Pricing', href: '/pricing' },
			],
		},
		{
			title: 'Company',
			links: [
				{ label: 'About Us', href: '/about' },
				{ label: 'Blog', href: '/blog' },
				{ label: 'Careers', href: '/careers' },
				{ label: 'Contact', href: '/contact' },
			],
		},
		{
			title: 'Legal',
			links: [
				{ label: 'Privacy Policy', href: '/privacy' },
				{ label: 'Terms of Service', href: '/terms' },
				{ label: 'Cookie Policy', href: '/cookies' },
				{ label: 'Accessibility', href: '/accessibility' },
			],
		},
	];
</script>

<!-- Footer -->
<footer class="bg-brand-black-dark text-white border-t border-neutral-900">
	<div class="container-md section-py">
		<!-- Footer Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
			<!-- Brand Section -->
			<div>
				<div class="flex items-center gap-2 mb-4">
					<img src="/logo.png" alt="Techgetafrica" class="h-10 w-auto" />
					<span class="text-lg font-bold">Techgetafrica</span>
				</div>
				<p class="text-neutral-400 text-sm mb-6">
					Empowering African professionals with world-class technology certifications.
				</p>
				<!-- Social Links -->
				<div class="flex gap-4">
					<a
						href="https://twitter.com"
						target="_blank"
						rel="noopener"
						class="w-10 h-10 flex-center bg-neutral-800 hover:bg-brand-red rounded-lg transition-colors"
						aria-label="Twitter"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9 5.5 9 5.5"
							/>
						</svg>
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener"
						class="w-10 h-10 flex-center bg-neutral-800 hover:bg-brand-red rounded-lg transition-colors"
						aria-label="LinkedIn"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
							/>
							<circle cx="4" cy="4" r="2" />
						</svg>
					</a>
					<a
						href="https://facebook.com"
						target="_blank"
						rel="noopener"
						class="w-10 h-10 flex-center bg-neutral-800 hover:bg-brand-red rounded-lg transition-colors"
						aria-label="Facebook"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z"
							/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Footer Link Columns -->
			{#each footerSections as section (section.title)}
				<div>
					<h5 class="text-sm font-semibold text-white mb-6">{section.title}</h5>
					<ul class="space-y-3">
						{#each section.links as link (link.href)}
							<li>
								<a
									href={link.href}
									class="text-sm text-neutral-400 hover:text-brand-red transition-colors"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<!-- Divider -->
		<div class="border-t border-neutral-800 my-12" />

		<!-- Bottom Footer -->
		<div class="flex flex-col sm:flex-between gap-6 text-sm text-neutral-400">
			<p>&copy; {new Date().getFullYear()} Techgetafrica. All rights reserved.</p>
			<div class="flex gap-6">
				<a href="/privacy" class="hover:text-brand-red transition-colors">Privacy</a>
				<a href="/terms" class="hover:text-brand-red transition-colors">Terms</a>
				<a href="/cookies" class="hover:text-brand-red transition-colors">Cookies</a>
			</div>
		</div>
	</div>
</footer>

<style>
	/* Footer specific styles */
</style>
