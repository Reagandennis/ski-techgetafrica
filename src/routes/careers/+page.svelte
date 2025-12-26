<script lang="ts">
	const jobOpenings = [
		{
			title: 'Senior SvelteKit Engineer',
			location: 'Remote (Africa)',
			type: 'Full-time',
			department: 'Engineering'
		},
		{
			title: 'Product Manager, Learning Experience',
			location: 'Nairobi, Kenya',
			type: 'Full-time',
			department: 'Product'
		},
		{
			title: 'Content Strategist, Tech Education',
			location: 'Lagos, Nigeria',
			type: 'Full-time',
			department: 'Content'
		}
	];

	const companyValues = [
		{
			title: 'Mission-Driven',
			description: 'We are passionate about empowering African professionals through technology education.',
			icon: '🎯'
		},
		{
			title: 'Learner-Obsessed',
			description: 'We put our learners at the center of everything we do, from content creation to platform experience.',
			icon: '🎓'
		},
		{
			title: 'Innovate & Iterate',
			description: 'We embrace change, experiment boldly, and continuously improve to deliver the best results.',
			icon: '💡'
		},
		{
			title: 'Stronger Together',
			description: 'We believe in the power of collaboration, diversity, and mutual respect to achieve our goals.',
			icon: '🤝'
		}
	];
</script>

<svelte:head>
	<title>Careers - Techgetafrica</title>
	<meta name="description" content="Join our mission to empower African professionals with world-class technology certifications." />
</svelte:head>

<div class="bg-gradient-to-b from-brand-black-dark to-neutral-900 text-white py-16">
	<div class="container-md text-center">
		<h1 class="text-5xl font-bold mb-4">Join Our Team</h1>
		<p class="text-xl text-neutral-300 max-w-3xl mx-auto">
			We're looking for passionate and talented individuals to help us build the future of tech education in Africa.
		</p>
	</div>
</div>

<div class="section-py bg-white">
	<div class="container-md">
		<h2 class="text-3xl font-bold text-center text-brand-black mb-12">Our Values</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
			{#each companyValues as value}
				<div class="text-center">
					<div class="text-4xl mb-4">{value.icon}</div>
					<h3 class="text-xl font-semibold text-brand-black mb-2">{value.title}</h3>
					<p class="text-neutral-600 text-sm">{value.description}</p>
				</div>
			{/each}
		</div>

		<h2 class="text-3xl font-bold text-center text-brand-black mb-12">Current Openings</h2>
		<div class="max-w-3xl mx-auto">
			{#if jobOpenings.length > 0}
				<div class="space-y-4">
					{#each jobOpenings as job}
						<a href="/careers/{job.title.toLowerCase().replace(/\s/g, '-')}" class="card block hover:shadow-lg transition-shadow">
							<div class="p-6">
								<div class="flex justify-between items-start">
									<div>
										<h3 class="text-xl font-bold text-brand-red mb-1">{job.title}</h3>
										<p class="text-sm text-neutral-600">{job.department}</p>
									</div>
									<span class="badge badge-primary text-xs">{job.type}</span>
								</div>
								<div class="text-sm text-neutral-500 mt-4">
									<span>{job.location}</span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<div class="text-center py-12">
					<p class="text-lg text-neutral-600">There are no open positions at this time. Please check back later!</p>
				</div>
			{/if}
		</div>
	</div>
</div>