<script lang="ts">
	import techgetafricaLogo from '$lib/assets/TECHGETAFRICA (Facebook Post).png';
	const certificationTypes = [
		{
			id: 'professional',
			name: 'Professional Certificates',
			description: 'Industry-recognized credentials that validate your expertise in specific technologies',
			count: 120,
		},
		{
			id: 'specialization',
			name: 'Specializations',
			description: 'Multi-course programs that help you master a specific skill set',
			count: 85,
		},
		{
			id: 'course',
			name: 'Course Certificates',
			description: 'Completion certificates for individual courses',
			count: 450,
		},
	];

	const typeIcons: Record<string, string[]> = {
		professional: [
			'M12 14.25 3 9.75 12 5.25 21 9.75 12 14.25Z',
			'M12 14.25v6',
			'M3 9.75v5.25',
			'M21 9.75v5.25',
			'M3 12.373c2.25 1.927 5.4 3.127 9 3.127s6.75-1.2 9-3.127',
		],
		specialization: [
			'M12 4.5 3 9l9 4.5 9-4.5-9-4.5Z',
			'M3 12.75 12 17.25 21 12.75',
			'M3 15.75 12 20.25 21 15.75',
		],
		course: [
			'M12 3 4.5 6v5c0 4.28 2.867 8.191 7.5 9 4.633-.809 7.5-4.72 7.5-9V6L12 3Z',
			'm9.75 11.25 1.5 1.5 3-3',
		],
	};

	 const usdToKesRate = 150;

		const formatKes = (usd: number) => `KES ${Math.round(usd * usdToKesRate).toLocaleString()}`;

		const featuredCertifications = [
		{
			id: '1',
			title: 'Google Cloud Professional Cloud Architect',
			provider: 'Google Cloud',
				providerLogo: 'https://www.gstatic.com/images/branding/googlecloud/logomark/icon_cloud_192pt_clr.svg',
			category: 'Cloud Computing',
			level: 'Professional',
			duration: '3-6 months',
			enrolledCount: 12500,
			rating: 4.8,
			imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop&q=80&fm=jpg',
			price: 299,
			benefits: ['Globally recognized', 'Hands-on labs', 'Career support'],
		},
		{
			id: '2',
			title: 'AWS Certified Solutions Architect',
			provider: 'Amazon Web Services',
			providerLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
			category: 'Cloud Computing',
			level: 'Associate',
			duration: '2-4 months',
			enrolledCount: 18200,
			rating: 4.9,
			imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&q=80&fm=jpg',
			price: 349,
			benefits: ['Industry standard', 'Practice exams', 'Job placement'],
		},
		{
			id: '3',
			title: 'Microsoft Azure Administrator',
			provider: 'Microsoft',
			providerLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
			category: 'Cloud Computing',
			level: 'Associate',
			duration: '2-3 months',
			enrolledCount: 9800,
			rating: 4.7,
			imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&q=80&fm=jpg',
			price: 279,
			benefits: ['Official curriculum', 'Virtual labs', 'Certification prep'],
		},
		{
			id: '4',
			title: 'Certified Kubernetes Administrator',
			provider: 'Cloud Native Computing Foundation',
			providerLogo: 'https://raw.githubusercontent.com/cncf/artwork/master/other/cncf/horizontal/color/cncf-color.svg',
			category: 'DevOps',
			level: 'Professional',
			duration: '3-4 months',
			enrolledCount: 6700,
			rating: 4.8,
			imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop&q=80&fm=jpg',
			price: 395,
			benefits: ['Performance-based', 'Hands-on exam', 'High demand'],
		},
		{
			id: '5',
			title: 'CompTIA Security+ Certification',
			provider: 'CompTIA',
			providerLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/CompTIA_logo.svg',
			category: 'Cybersecurity',
			level: 'Entry',
			duration: '2-3 months',
			enrolledCount: 14300,
			rating: 4.6,
			imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop&q=80&fm=jpg',
			price: 249,
			benefits: ['Entry-level friendly', 'Industry baseline', 'Vendor neutral'],
		},
		{
			id: '6',
			title: 'Cisco Certified Network Associate',
			provider: 'Cisco',
			providerLogo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg',
			category: 'Networking',
			level: 'Associate',
			duration: '3-5 months',
			enrolledCount: 11200,
			rating: 4.7,
			imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&q=80&fm=jpg',
			price: 325,
			benefits: ['Networking foundation', 'Lab simulations', 'Global recognition'],
		},
	];

	const providers = [
		{ name: 'Google Cloud', count: 45 },
		{ name: 'Amazon Web Services', count: 52 },
		{ name: 'Microsoft', count: 68 },
		{ name: 'IBM', count: 34 },
		{ name: 'Oracle', count: 28 },
		{ name: 'Salesforce', count: 22 },
		{ name: 'CompTIA', count: 18 },
		{ name: 'Cisco', count: 31 },
	];

	const benefitIcons: Record<string, string[]> = {
		validate: [
			'M12 21c4.971 0 9-4.029 9-9s-4.029-9-9-9-9 4.029-9 9 4.029 9 9 9Z',
			'M8.5 12.5l2.25 2.25L15.5 10',
		],
		advance: [
			'M5 15.5 9.5 10l3 3L19 8.5',
			'M5 19h14',
		],
		global: [
			'M12 21c4.971 0 9-4.029 9-9s-4.029-9-9-9-9 4.029-9 9 4.029 9 9 9Z',
			'M3 12h18',
			'M12 3c2.5 3 2.5 15 0 18',
			'M7 4.8c1.8 2.2 1.8 12.2 0 14.4',
			'M17 4.8c-1.8 2.2-1.8 12.2 0 14.4',
		],
		current: [
			'M12 4v4',
			'M12 16v4',
			'M8 8h4.5c2.5 0 4.5 2 4.5 4.5S15 17 12.5 17H10',
			'M8 17h1.5',
		],
	};

	let selectedCategory = 'all';
	let selectedLevel = 'all';
	let searchQuery = '';

	const categories = ['All', 'Cloud Computing', 'DevOps', 'Cybersecurity', 'Networking', 'Data Science', 'Software Development'];
	const levels = ['All', 'Entry', 'Associate', 'Professional', 'Expert'];
</script>

<svelte:head>
	<title>Certifications - Techgetafrica</title>
	<meta
		name="description"
		content="Browse industry-recognized technology certifications from leading providers. Advance your career with globally accepted credentials."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-brand-black-dark via-brand-black to-neutral-800 text-white section-py">
	<div class="container-md">
		<div class="max-w-4xl mx-auto text-center">
			<span class="inline-block text-sm font-semibold text-brand-red-light mb-4 uppercase tracking-wider">
				Professional Certifications
			</span>
			<h1 class="text-5xl md:text-6xl font-extrabold mb-6">
				Earn Industry-Recognized Certificates
			</h1>
			<p class="text-xl text-neutral-300 leading-relaxed mb-8">
				Validate your skills with globally accepted certifications from the world's leading technology companies and organizations.
			</p>
			
			<!-- Search Bar -->
			<div class="max-w-2xl mx-auto">
				<div class="relative">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search certifications..."
						class="w-full px-6 py-4 pl-12 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
					/>
					<svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Certification Types Overview -->
<section class="bg-white section-py border-b border-neutral-200">
	<div class="container-md">
		<div class="grid md:grid-cols-3 gap-8">
			{#each certificationTypes as type}
				<div class="text-center p-8 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-brand-red transition-all duration-300">
					<div class="flex justify-center mb-4">
						<svg class="w-12 h-12 text-brand-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
							{#each typeIcons[type.id] as d}
								<path d={d} stroke-linecap="round" stroke-linejoin="round" />
							{/each}
						</svg>
					</div>
					<h3 class="text-2xl font-bold text-brand-black mb-3">{type.name}</h3>
					<p class="text-neutral-600 mb-4 leading-relaxed">{type.description}</p>
					<p class="text-brand-red font-semibold">{type.count}+ available</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Filter Section -->
<section class="bg-neutral-50 py-8 border-b border-neutral-200">
	<div class="container-md">
		<div class="flex flex-col md:flex-row gap-4 items-center justify-between">
			<div class="flex flex-wrap gap-2">
				<span class="text-sm font-semibold text-neutral-700 self-center mr-2">Category:</span>
				{#each categories as category}
					<button
						on:click={() => selectedCategory = category.toLowerCase()}
						class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 {selectedCategory === category.toLowerCase() ? 'bg-brand-red text-white' : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'}"
					>
						{category}
					</button>
				{/each}
			</div>
			
			<div class="flex gap-2 items-center">
				<span class="text-sm font-semibold text-neutral-700">Level:</span>
				<select
					bind:value={selectedLevel}
					class="px-4 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-red"
				>
					{#each levels as level}
						<option value={level.toLowerCase()}>{level}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
</section>

<!-- Featured Certifications -->
<section class="bg-white section-py">
	<div class="container-md">
		<div class="mb-12">
			<h2 class="text-4xl font-bold text-brand-black-dark mb-4">Popular Certifications</h2>
			<p class="text-lg text-neutral-600">
				Start your journey with these highly sought-after credentials
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each featuredCertifications as cert}
				<div class="card hover:border-brand-red transition-all duration-300 group overflow-hidden">
					<div class="overflow-hidden relative">
						<img
							src={cert.imageUrl}
							alt={cert.title}
							class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
						/>
						<!-- Techgetafrica Logo -->
						<div class="absolute top-3 left-3 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
							<img src={techgetafricaLogo} alt="Techgetafrica" class="w-full h-full object-contain rounded-full" />
						</div>
					</div>
					
					<div class="p-6">
						<div class="flex items-center gap-3 mb-4">
							<img src={cert.providerLogo} alt={cert.provider} class="w-10 h-10 rounded" />
							<div>
								<p class="text-sm text-neutral-600">{cert.provider}</p>
								<p class="text-xs text-neutral-500">{cert.category}</p>
							</div>
						</div>
						
						<h3 class="text-xl font-bold text-brand-black mb-3 group-hover:text-brand-red transition-colors">
							{cert.title}
						</h3>
						
						<div class="flex items-center gap-4 mb-4 text-sm text-neutral-600">
							<span class="flex items-center gap-1">
								<svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
								{cert.rating}
							</span>
							<span>{cert.enrolledCount.toLocaleString()} enrolled</span>
						</div>
						
						<div class="flex items-center justify-between mb-4 pb-4 border-b border-neutral-200">
							<span class="px-3 py-1 bg-accent-blue-light text-accent-blue-dark text-xs font-semibold rounded-full">
								{cert.level}
							</span>
							<span class="text-sm text-neutral-600">{cert.duration}</span>
						</div>
						
						<ul class="space-y-2 mb-6">
							{#each cert.benefits as benefit}
								<li class="flex items-center gap-2 text-sm text-neutral-700">
									<svg class="w-4 h-4 text-success-green" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
									</svg>
									{benefit}
								</li>
							{/each}
						</ul>
						
						<div class="flex items-center justify-between">
							<div>
								<span class="text-3xl font-bold text-brand-black">{formatKes(cert.price)}</span>
							</div>
							<a href={`/certificates/${cert.id}`} class="btn-primary">
								Learn More
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="flex justify-center mt-12">
			<button class="btn-secondary text-lg px-8 py-4">
				View All Certifications
			</button>
		</div>
	</div>
</section>

<!-- Providers Section -->
<section class="bg-neutral-50 section-py">
	<div class="container-md">
		<div class="text-center mb-12">
			<h2 class="text-4xl font-bold text-brand-black-dark mb-4">Certification Providers</h2>
			<p class="text-lg text-neutral-600">
				Partner with the world's leading technology companies
			</p>
		</div>

		<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
			{#each providers as provider}
				<div class="bg-white p-6 rounded-lg border border-neutral-200 hover:border-brand-red transition-all duration-300 text-center">
					<p class="font-semibold text-brand-black mb-2">{provider.name}</p>
					<p class="text-sm text-neutral-600">{provider.count} certifications</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Benefits Section -->
<section class="bg-white section-py">
	<div class="container-md">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-brand-black-dark mb-4">Why Get Certified?</h2>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			<div class="text-center">
				<div class="w-16 h-16 bg-brand-red-light rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-brand-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
						{#each benefitIcons.validate as d}
							<path d={d} stroke-linecap="round" stroke-linejoin="round" />
						{/each}
					</svg>
				</div>
				<h3 class="text-xl font-bold text-brand-black mb-2">Validate Your Skills</h3>
				<p class="text-neutral-600">
					Prove your expertise with globally recognized credentials
				</p>
			</div>

			<div class="text-center">
				<div class="w-16 h-16 bg-success-green-light rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-success-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
						{#each benefitIcons.advance as d}
							<path d={d} stroke-linecap="round" stroke-linejoin="round" />
						{/each}
					</svg>
				</div>
				<h3 class="text-xl font-bold text-brand-black mb-2">Advance Your Career</h3>
				<p class="text-neutral-600">
					Open doors to better opportunities and higher salaries
				</p>
			</div>

			<div class="text-center">
				<div class="w-16 h-16 bg-accent-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-accent-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
						{#each benefitIcons.global as d}
							<path d={d} stroke-linecap="round" stroke-linejoin="round" />
						{/each}
					</svg>
				</div>
				<h3 class="text-xl font-bold text-brand-black mb-2">Global Recognition</h3>
				<p class="text-neutral-600">
					Credentials accepted by employers worldwide
				</p>
			</div>

			<div class="text-center">
				<div class="w-16 h-16 bg-warning-amber-light rounded-full flex items-center justify-center mx-auto mb-4">
					<svg class="w-8 h-8 text-warning-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
						{#each benefitIcons.current as d}
							<path d={d} stroke-linecap="round" stroke-linejoin="round" />
						{/each}
					</svg>
				</div>
				<h3 class="text-xl font-bold text-brand-black mb-2">Stay Current</h3>
				<p class="text-neutral-600">
					Keep your skills updated with latest technologies
				</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="bg-gradient-to-r from-brand-red-dark to-brand-red section-py text-white">
	<div class="container-md text-center">
		<h2 class="text-4xl font-bold mb-6">Ready to Get Certified?</h2>
		<p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
			Start your certification journey today and take your career to the next level.
		</p>
		<a href="/courses" class="btn-primary bg-white text-brand-red hover:bg-neutral-100 text-lg px-8 py-4">
			Browse All Courses
		</a>
	</div>
</section>
