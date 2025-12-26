<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';

	// Mock data - will be replaced with API calls
	const roadmaps = [
		{
			id: 'cloud-architect',
			title: 'Cloud Solutions Architect',
			vendors: 'AWS · Azure · Google Cloud',
			summary: 'Go from fundamentals to multi-cloud design and security for enterprise-scale systems.',
			level: 'Beginner to Professional',
			duration: '4-6 months',
			steps: [
				'Start: Cloud fundamentals, Linux, networking basics',
				'Certify: AWS SAA or Azure AZ-305 or GCP ACE',
				'Grow: Security Specialty, cost optimization, and architecture labs'
			],
			cta: '/certifications/cloud-architect'
		},
		{
			id: 'data-ai',
			title: 'Data & AI Engineer',
			vendors: 'Azure · Databricks · AWS',
			summary: 'Build reliable data platforms and production AI workflows with modern tooling.',
			level: 'Intermediate to Advanced',
			duration: '5-7 months',
			steps: [
				'Start: SQL, Python, data modeling, and ETL patterns',
				'Certify: Azure DP-203 or Databricks Data Engineer Associate',
				'Grow: ML pipelines, MLOps, and model monitoring'
			],
			cta: '/certifications/data-ai-engineer'
		},
		{
			id: 'cybersecurity',
			title: 'Cybersecurity Analyst',
			vendors: 'CompTIA · ISC2 · Cisco',
			summary: 'Develop hands-on defense skills across cloud, identity, and incident response.',
			level: 'Beginner to Professional',
			duration: '3-5 months',
			steps: [
				'Start: Security fundamentals, networking, identity basics',
				'Certify: CompTIA Security+ or ISC2 CC',
				'Grow: SOC analysis, incident playbooks, and cloud security labs'
			],
			cta: '/certifications/cybersecurity-analyst'
		},
		{
			id: 'devops',
			title: 'DevOps & Platform Engineer',
			vendors: 'AWS · Azure · CNCF',
			summary: 'Ship resilient services with CI/CD, Kubernetes, and observability best practices.',
			level: 'Intermediate to Advanced',
			duration: '4-6 months',
			steps: [
				'Start: Git, scripting, and container basics',
				'Certify: AWS DevOps Pro or Azure DevOps Engineer',
				'Grow: Kubernetes (CKA), IaC, and SRE incident drills'
			],
			cta: '/certifications/devops-engineer'
		}
	];

	const categories = [
		{ name: 'Cloud Computing', image: '/categories/cloud-computing.png', count: 45 },
		{ name: 'Data Science', image: '/categories/data science.png', count: 38 },
		{ name: 'Software Engineering', image: '/categories/software-engineering.png', count: 52 },
		{ name: 'Information Technology', image: '/categories/Information technology.png', count: 28 },
		{ name: 'Cybersecurity', image: '/categories/cyber-security.png', count: 31 },
		{ name: 'AI & Machine Learning', image: '/categories/artificial-intelligence.png', count: 23 }
	];

	// Updated Partners / Alumni Employers to build real trust
    // NOTE: Ensure you have these logos in your static folder or use generic placeholders
	const alumniCompanies = [
		{ name: 'Safaricom', logo: '/logos/safaricom.svg' }, // Example: Local relevance
		{ name: 'Microsoft ADC', logo: '/logos/microsoft.svg' },
		{ name: 'Andela', logo: '/logos/andela.svg' },
		{ name: 'Cellulant', logo: '/logos/cellulant.svg' },
        { name: 'Equity Bank', logo: '/logos/equity.svg' }
	];

    const partners = [
        { name: 'Global Cyber Security Advisory Group', logo: '/partners/Gold full logo transparent.svg' },
        { name: 'Amazon Web Services', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
        { name: 'Microsoft Azure', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg' },
        { name: 'Cisco', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg' },
    ];

	// Helper to bold the text before the colon (e.g. "Start: ...")
	function formatStepText(text: string) {
		const parts = text.split(':');
		if (parts.length > 1) {
			return `<span class="font-bold text-gray-900">${parts[0]}:</span> ${parts.slice(1).join(':')}`;
		}
		return text;
	}
</script>

<svelte:head>
	<title>TechGetAfrica - Professional Technology Certifications</title>
	<meta
		name="description"
		content="Master in-demand technology skills with professional certifications from TechGetAfrica. Learn from industry experts and boost your career."
	/>
	<meta
		name="keywords"
		content="certifications, online learning, technology, Africa, professional development, career advancement"
	/>
	<meta property="og:title" content="TechGetAfrica - Professional Technology Certifications" />
	<meta
		property="og:description"
		content="Master in-demand technology skills with professional certifications. Join 50,000+ learners."
	/>
	<meta property="og:url" content="https://techgetafrica.com/" />
	<meta name="twitter:title" content="TechGetAfrica - Professional Technology Certifications" />
	<meta
		name="twitter:description"
		content="Master in-demand technology skills with professional certifications."
	/>
	<link rel="canonical" href="https://techgetafrica.com/" />
</svelte:head>

<Hero />

<section class="bg-gray-900 text-white py-16 relative overflow-hidden">
	<div class="container mx-auto px-4 relative z-10">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
			<div class="p-6">
				<div class="h-14 w-14 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg shadow-red-900/50">
					🎟️
				</div>
				<h3 class="text-xl font-bold mb-3">On demand Certifications</h3>
				<p class="text-white text-sm leading-relaxed">
					We provide world accredited certifications from AWS, Microsoft, CompTIA, Google and more to better your chances of getting hired in the tech industry.
				</p>
			</div>
			<div class="p-6">
				<div class="h-14 w-14 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg shadow-red-900/50">
					👨‍🏫
				</div>
				<h3 class="text-xl font-bold mb-3">On Demand Mentorship</h3>
				<p class="text-white text-sm leading-relaxed">
					when youre stuck you can request for mentorship from our pool of experienced mentors to help you get past your challenges and ace your certifications.
				</p>
			</div>
			<div class="p-6">
				<div class="h-14 w-14 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg shadow-red-900/50">
					💼
				</div>
				<h3 class="text-xl font-bold mb-3">CV & Career Prep</h3>
				<p class="text-white text-sm leading-relaxed">
					We don't stop at the certificate. We help you fix your LinkedIn and CV to land global
					remote roles.
				</p>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-20 border-t border-neutral-200">
	<div class="container mx-auto px-4">
		<div class="mb-16 text-center">
			<span class="inline-block text-sm font-bold text-red-600 mb-4 uppercase tracking-widest">
				Certification Roadmaps
			</span>
			<h2 class="text-4xl font-extrabold text-gray-900 mb-4">Choose a Path and Certify</h2>
			<p class="text-lg text-gray-600 max-w-3xl mx-auto">
				Structured learning paths with the exact exams, skills, and timelines to earn
				industry-recognized certifications.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each roadmaps as roadmap (roadmap.id)}
				<div
					class="group flex flex-col h-full p-6 bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:border-red-500 hover:shadow-xl relative overflow-hidden"
				>
					<div class="mb-6">
						<p class="text-xs font-bold text-red-600 uppercase tracking-widest mb-3">
							{roadmap.vendors}
						</p>

						<h3 class="text-2xl font-bold text-gray-900 mb-3 leading-tight">
							{roadmap.title}
						</h3>

						<p class="text-gray-600 text-sm leading-relaxed">
							{roadmap.summary}
						</p>
					</div>

					<div class="mb-6 space-y-1">
						<p class="text-sm text-gray-700">
							<span class="font-bold text-gray-900">Level:</span>
							{roadmap.level}
						</p>
						<p class="text-sm text-gray-700">
							<span class="font-bold text-gray-900">Timeline:</span>
							{roadmap.duration}
						</p>
					</div>

					<div class="mt-auto bg-gray-50 rounded-xl p-5 border border-gray-100 mb-6">
						<ul class="space-y-4">
							{#each roadmap.steps as step, idx}
								<li class="flex gap-3 items-start text-sm">
									<span
										class="shrink-0 mt-[2px] h-6 w-6 flex items-center justify-center rounded bg-red-600 text-white text-xs font-bold shadow-sm"
									>
										{idx + 1}
									</span>

									<span class="text-gray-600 leading-snug">
										{@html formatStepText(step)}
									</span>
								</li>
							{/each}
						</ul>
					</div>

					<div>
						<a
							href={roadmap.cta}
							class="w-full inline-flex justify-center items-center gap-2 px-4 py-3 bg-white text-gray-900 font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 hover:text-red-600 transition-colors group"
						>
							<span>Get Syllabus</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 transition-transform group-hover:translate-x-1 text-gray-400 group-hover:text-red-600"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</a>
					</div>
				</div>
			{/each}
		</div>

		<div class="flex justify-center mt-16">
			<a
				href="/certifications"
				class="inline-block px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
			>
				Explore all certifications
			</a>
		</div>
	</div>
</section>

<section class="bg-gray-50 py-20">
	<div class="container mx-auto px-4 text-center">
		<h2 class="text-3xl font-bold text-gray-900 mb-16">How You'll Get Certified</h2>
		<div class="relative max-w-5xl mx-auto">
			<div
				class="hidden md:block absolute top-1/2 left-10 right-10 h-1 bg-gray-200 -z-0 transform -translate-y-1/2 rounded"
			></div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
				<div class="bg-gray-50 p-4">
					<div
						class="w-16 h-16 bg-white border-4 border-red-100 text-red-600 font-bold rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-sm"
					>
						1
					</div>
					<h4 class="font-bold text-xl mb-3 text-gray-900">Select a Path</h4>
					<p class="text-gray-600">
						Choose your career track based on your current skills or talk to our advisors.
					</p>
				</div>

				<div class="bg-gray-50 p-4">
					<div
						class="w-16 h-16 bg-white border-4 border-red-100 text-red-600 font-bold rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-sm"
					>
						2
					</div>
					<h4 class="font-bold text-xl mb-3 text-gray-900">Join the Cohort</h4>
					<p class="text-gray-600">
						Access live classes, hands-on labs, and join our active study community.
					</p>
				</div>

				<div class="bg-gray-50 p-4">
					<div
						class="w-16 h-16 bg-white border-4 border-red-100 text-red-600 font-bold rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-sm"
					>
						3
					</div>
					<h4 class="font-bold text-xl mb-3 text-gray-900">Pass the Exam</h4>
					<p class="text-gray-600">
						Use our resources to pass your certifications.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="container mx-auto px-4">
		<div class="mb-16 text-center">
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Explore by Category</h2>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">
				Find certifications across all technology domains
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each categories as category (category.name)}
				<a
					href={`/certifications?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
					class="flex flex-col items-center p-8 bg-gray-50 rounded-xl border border-transparent hover:border-red-200 hover:bg-white hover:shadow-lg transition-all duration-300 group"
				>
					<div
						class="mb-6 h-24 w-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
					>
						<img src={category.image} alt={category.name} class="h-20 w-20 object-contain" />
					</div>
					<h3
						class="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors"
					>
						{category.name}
					</h3>
					<p class="text-sm text-gray-500 font-medium">
						{category.count} certifications available
					</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="bg-gray-50 py-20 border-t border-gray-200">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<span class="inline-block text-sm font-bold text-red-600 mb-4 uppercase tracking-widest">
				Trusted Partners
			</span>
			<h2 class="text-4xl font-bold text-gray-900 mb-4">Learn From Industry Leaders</h2>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">
				We partner with the world's leading technology companies to bring you industry-recognized
				certifications.
			</p>
		</div>

		<div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center mb-16">
			{#each partners as partner (partner.name)}
				<div
					class="flex items-center justify-center p-8 bg-white rounded-lg border border-gray-200 hover:border-red-400 hover:shadow-md transition-all duration-300 group h-32"
				>
					<img
						src={partner.logo}
						alt={partner.name}
						class="max-h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
					/>
				</div>
			{/each}
		</div>

        <div class="text-center pt-16 border-t border-gray-200">
            <p class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">
                Graduates that have these certifications are now working at
            </p>
            <div class="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                {#each alumniCompanies as company}
                     <div class="flex items-center gap-2">
                        {#if company.logo}
                             <img src={company.logo} alt={company.name} class="h-8 w-auto" />
                        {:else}
                             <span class="text-xl font-bold text-gray-600">{company.name}</span>
                        {/if}
                     </div>
                {/each}
            </div>
		</div>
	</div>
</section>

<section class="bg-gray-900 py-24 text-white">
	<div class="container mx-auto px-4 text-center">
		<h2 class="text-4xl font-extrabold mb-6">Ready to Start Learning?</h2>
		<p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
			Join thousands of professionals who are advancing their careers with TechGetAfrica
			certifications.
		</p>
		<button
			class="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg shadow-lg shadow-red-900/50 transition-all transform hover:-translate-y-1"
		>
			Enroll Today
		</button>
	</div>
</section>

<style>
	/* Any specific scoped styles can go here, though Tailwind handles most needs. */
</style>