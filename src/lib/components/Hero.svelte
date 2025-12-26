<script lang="ts">
	interface HeroProps {
		title?: string;
		subtitle?: string;
		description?: string;
		ctaText?: string;
		ctaSecondaryText?: string;
		backgroundImageUrl?: string;
		showLogo?: boolean;
	}

	let {
		title = 'Master Technology. Shape Your Future.',
		subtitle = 'Professional Certifications for African Tech Leaders',
		description = 'Techgetafrica empowers African professionals with world-class technology certifications. Learn from industry experts, earn professional credentials, and advance your career with proven skills.',
		ctaText = 'Explore Courses',
		ctaSecondaryText = 'Watch Demo',
		backgroundImageUrl = '/logo.png',
		showLogo = true,
	} = {} as HeroProps;
</script>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-white">
	<!-- Decorative background elements -->
	<div
		class="absolute top-0 right-0 w-96 h-96 bg-brand-red opacity-5 rounded-full blur-3xl -mr-48 -mt-48"
	/>
	<div
		class="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue opacity-5 rounded-full blur-3xl -ml-48 -mb-48"
	/>

	<!-- Main content -->
	<div class="container-md py-20 sm:py-28 lg:py-32 relative z-10">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<!-- Left Column: Text Content -->
			<div class="space-y-8">
			<!-- Logo (optional) -->
			{#if showLogo}
				<div class="flex items-center gap-3 w-fit">
					<img src="/logo.png" alt="Techgetafrica" class="h-14 w-auto" />
					<span class="text-sm font-semibold text-brand-black tracking-wide">TECHGETAFRICA</span>
				</div>
			{/if}				<!-- Main Heading -->
				<h1 class="text-5xl sm:text-6xl lg:text-5xl font-extrabold text-brand-black-dark leading-tight">
					{title}
				</h1>

				<!-- Subtitle -->
				<p class="text-xl font-semibold text-brand-red">
					{subtitle}
				</p>

				<!-- Description -->
				<p class="text-lg text-neutral-600 leading-relaxed max-w-2xl">
					{description}
				</p>

				<!-- Key Benefits -->
				<ul class="space-y-4 pt-4">
					<li class="flex items-start gap-4">
						<div class="flex-shrink-0 w-6 h-6 flex-center bg-brand-red rounded-full mt-1">
							<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-brand-black">Industry-Recognized Certifications</h4>
							<p class="text-sm text-neutral-600 mt-1">
								Earn professional credentials valued by top African and global tech companies
							</p>
						</div>
					</li>

					<li class="flex items-start gap-4">
						<div class="flex-shrink-0 w-6 h-6 flex-center bg-brand-red rounded-full mt-1">
							<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-brand-black">Expert-Led Learning Paths</h4>
							<p class="text-sm text-neutral-600 mt-1">
								Learn from proven instructors with real-world industry experience
							</p>
						</div>
					</li>

					<li class="flex items-start gap-4">
						<div class="flex-shrink-0 w-6 h-6 flex-center bg-brand-red rounded-full mt-1">
							<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-brand-black">Fast, Affordable, Accessible</h4>
							<p class="text-sm text-neutral-600 mt-1">
								Optimized for low-bandwidth environments across Africa
							</p>
						</div>
					</li>
				</ul>

				<!-- CTA Buttons -->
				<div class="flex flex-col sm:flex-row gap-4 pt-8">
					<button class="btn-primary text-lg px-8 py-4 flex-shrink-0">
						{ctaText}
					</button>
					<button class="btn-secondary text-lg px-8 py-4 flex items-center justify-center gap-2">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
						</svg>
						{ctaSecondaryText}
					</button>
				</div>

				<!-- Stats -->
				<div class="grid grid-cols-3 gap-6 pt-12 border-t border-neutral-200">
					<div>
						<p class="text-3xl font-bold text-brand-red">50K+</p>
						<p class="text-sm text-neutral-600 mt-1">Active Learners</p>
					</div>
					<div>
						<p class="text-3xl font-bold text-brand-red">200+</p>
						<p class="text-sm text-neutral-600 mt-1">Courses</p>
					</div>
					<div>
						<p class="text-3xl font-bold text-brand-red">95%</p>
						<p class="text-sm text-neutral-600 mt-1">Satisfaction</p>
					</div>
				</div>
			</div>

			<!-- Right Column: Visual -->
			<div class="relative hidden lg:flex items-center justify-center">
				{#if backgroundImageUrl}
					<img
						src={backgroundImageUrl}
						alt="Learning illustration"
						class="w-full h-auto max-w-md"
					/>
				{:else}
					<!-- Placeholder illustration -->
					<div class="w-full max-w-md aspect-square bg-gradient-to-br from-brand-red to-accent-blue rounded-2xl opacity-10" />
					<div class="absolute inset-0 flex items-center justify-center">
						<svg class="w-64 h-64 text-brand-red opacity-20" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
							/>
						</svg>
					</div>
				{/if}

				<!-- Floating card accent -->
				<div
					class="absolute top-12 -left-6 bg-white rounded-xl p-6 shadow-lg border border-neutral-200 max-w-xs"
				>
					<div class="flex items-center gap-3 mb-3">
						<div class="w-3 h-3 bg-brand-red rounded-full" />
						<span class="text-sm font-semibold text-brand-black">Trending Now</span>
					</div>
					<p class="text-sm font-medium text-neutral-800">
						AI & Machine Learning specialization just launched
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Hero specific styles */
</style>
