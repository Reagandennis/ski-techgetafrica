<script lang="ts">
	const values = [
		{
			title: 'Practical Impact',
			description:
				'We focus on real-world skills and solutions that solve concrete problems for individuals and organizations.',
			icon: '🛠️',
		},
		{
			title: 'Accessibility',
			description:
				'Our platforms and services are designed with the African context in mind, prioritizing affordability, flexibility, and relevance.',
			icon: '🌍',
		},
		{
			title: 'Integrity',
			description:
				'We communicate honestly about what we offer, what we have achieved, and where we are heading.',
			icon: '✔️',
		},
		{
			title: 'Continuous Improvement',
			description:
				'Technology evolves quickly. We continuously refine our tools, content, and services to stay relevant.',
			icon: '📈',
		},
	];
</script>

<svelte:head>
	<title>About Us - TechGetAfrica</title>
	<meta
		name="description"
		content="Learn about TechGetAfrica, an African technology company focused on practical tech education, digital services, and talent development."
	/>
	<meta name="keywords" content="TechGetAfrica, about us, African technology, tech education, software services" />
	<meta property="og:title" content="About Us - TechGetAfrica" />
	<meta
		property="og:description"
		content="Building practical technology skills and digital solutions for Africa."
	/>
	<meta property="og:url" content="https://techgetafrica.com/about" />
	<link rel="canonical" href="https://techgetafrica.com/about" />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-brand-black-dark via-brand-black to-neutral-800 text-white section-py">
	<div class="container-md">
		<div class="max-w-4xl mx-auto text-center">
			<span class="inline-block text-sm font-semibold text-brand-red-light mb-4 uppercase tracking-wider">
				About TechGetAfrica
			</span>
			<h1 class="text-5xl md:text-6xl font-extrabold mb-6">
				Building Practical Technology Skills for Africa
			</h1>
			<p class="text-xl text-neutral-300 leading-relaxed">
				TechGetAfrica is an African technology company focused on practical education,
				digital services, and talent development for the modern digital economy.
			</p>
		</div>
	</div>
</section>

<!-- Who We Are -->
<section class="bg-white section-py">
	<div class="container-md">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-4xl font-bold text-brand-black-dark mb-6 text-center">
				Who We Are
			</h2>
			<p class="text-lg text-neutral-700 leading-relaxed mb-6">
				TechGetAfrica operates at the intersection of technology education, software
				development, and digital services. We work with individuals, startups, and
				organizations to help them build relevant technical skills and deploy effective
				digital solutions.
			</p>
			<p class="text-lg text-neutral-700 leading-relaxed">
				Our approach is grounded in execution. We prioritize real projects, real clients,
				and real outcomes over hype or inflated claims.
			</p>
		</div>
	</div>
</section>

<!-- What We Do -->
<section class="bg-neutral-50 section-py">
	<div class="container-md">
		<div class="grid md:grid-cols-3 gap-10">
			<div>
				<h3 class="text-2xl font-bold text-brand-black mb-4">
					Technology Education
				</h3>
				<p class="text-neutral-700 leading-relaxed">
					We deliver structured learning programs focused on practical, job-relevant
					technology skills. Our courses emphasize hands-on learning, applied projects,
					and clear progression paths.
				</p>
			</div>

			<div>
				<h3 class="text-2xl font-bold text-brand-black mb-4">
					Digital & Software Services
				</h3>
				<p class="text-neutral-700 leading-relaxed">
					We design and build software systems, web applications, and digital platforms
					for businesses and organizations, keeping us closely aligned with real market
					needs.
				</p>
			</div>

			<div>
				<h3 class="text-2xl font-bold text-brand-black mb-4">
					Talent & Ecosystem Support
				</h3>
				<p class="text-neutral-700 leading-relaxed">
					Through community initiatives and partnerships, we support African tech talent
					by improving access to skills, mentorship, and professional opportunities.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Mission & Vision -->
<section class="bg-white section-py">
	<div class="container-md">
		<div class="grid md:grid-cols-2 gap-16">
			<div>
				<h2 class="text-4xl font-bold text-brand-black-dark mb-6">
					Our Mission
				</h2>
				<p class="text-lg text-neutral-700 leading-relaxed">
					To equip African individuals and organizations with practical technology
					skills and digital solutions that create economic opportunity and long-term
					value.
				</p>
			</div>

			<div>
				<h2 class="text-4xl font-bold text-brand-black-dark mb-6">
					Our Vision
				</h2>
				<p class="text-lg text-neutral-700 leading-relaxed">
					An Africa where technology professionals can build, compete, and lead globally
					without being limited by access, geography, or infrastructure.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Values -->
<section class="bg-neutral-50 section-py">
	<div class="container-md">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-brand-black-dark mb-4">
				Our Core Values
			</h2>
			<p class="text-lg text-neutral-600 max-w-2xl mx-auto">
				The principles that guide how we build, teach, and collaborate.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8">
			{#each values as value}
				<div class="card p-8">
					<div class="text-5xl mb-4">{value.icon}</div>
					<h3 class="text-2xl font-bold text-brand-black mb-4">
						{value.title}
					</h3>
					<p class="text-neutral-700 leading-relaxed">
						{value.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Story -->
<section class="bg-white section-py">
	<div class="container-md">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-4xl font-bold text-brand-black-dark mb-8 text-center">
				Our Story
			</h2>

			<div class="space-y-6 text-lg text-neutral-700 leading-relaxed">
				<p>
					TechGetAfrica began as a technology services company working directly with
					clients and organizations. Through this work, we identified a recurring gap
					between traditional education and the skills required in real-world technology
					roles.
				</p>

				<p>
					This insight led us to expand into education, combining practical learning with
					exposure to real systems, tools, and workflows. Our model continues to evolve
					as we balance learning, services, and community development.
				</p>

				<p>
					We are still early in our journey, but we are building deliberately — with a
					focus on relevance, sustainability, and measurable impact.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="bg-gradient-to-r from-brand-red-dark to-brand-red section-py text-white">
	<div class="container-md text-center">
		<h2 class="text-4xl font-bold mb-6">
			Work With TechGetAfrica
		</h2>
		<p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
			Whether you want to learn, build, or collaborate, we are open to working with
			individuals and organizations committed to meaningful progress.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href="/courses" class="btn-primary bg-white text-brand-red hover:bg-neutral-100 text-lg px-8 py-4">
				Explore Learning
			</a>
			<a href="/contact" class="btn-secondary border-white text-white hover:bg-white/10 text-lg px-8 py-4">
				Contact Us
			</a>
		</div>
	</div>
</section>
