<script lang="ts">
	const pricingTiers = [
		{
			name: 'Explorer',
			price: 'Free',
			priceDescription: 'For individuals starting their tech journey.',
			features: [
				'Access to free courses',
				'Community forum access',
				'Weekly newsletter',
				'Basic progress tracking'
			],
			cta: {
				text: 'Start for Free',
				href: '/auth/signup'
			},
			popular: false
		},
		{
			name: 'Pro',
			price: 'KES 2,500',
			priceDescription: 'per month, billed annually',
			features: [
				'Access to all courses',
				'Verified certificates upon completion',
				'Hands-on guided projects',
				'Priority support',
				'Offline viewing of course materials',
				'Career guidance and resources'
			],
			cta: {
				text: 'Go Pro',
				href: '/auth/signup'
			},
			popular: true
		},
		{
			name: 'Teams',
			price: 'Custom',
			priceDescription: 'For organizations and teams of any size.',
			features: [
				'All Pro features, plus:',
				'Team management dashboard',
				'Bulk license management',
				'Advanced reporting and analytics',
				'Dedicated account manager',
				'Custom learning paths for your team'
			],
			cta: {
				text: 'Contact Sales',
				href: '/contact'
			},
			popular: false
		}
	];
</script>

<svelte:head>
	<title>Pricing - Techgetafrica</title>
	<meta name="description" content="Find the perfect plan for your learning needs. From free individual access to comprehensive team solutions." />
</svelte:head>

<div class="bg-gradient-to-b from-brand-black-dark to-neutral-900 text-white py-16">
	<div class="container-md text-center">
		<h1 class="text-5xl font-bold mb-4">Find Your Perfect Plan</h1>
		<p class="text-xl text-neutral-300 max-w-3xl mx-auto">
			Whether you're an individual learner or a large enterprise, we have a plan that fits your needs.
		</p>
	</div>
</div>

<div class="section-py bg-white">
	<div class="container-md">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
			{#each pricingTiers as tier}
				<div class="card bg-white h-full flex flex-col {tier.popular ? 'border-2 border-brand-red' : ''}">
					{#if tier.popular}
						<div class="bg-brand-red text-white text-sm font-semibold text-center py-2 rounded-t-lg">Most Popular</div>
					{/if}
					<div class="p-8 flex-grow">
						<h3 class="text-2xl font-bold text-brand-black mb-2">{tier.name}</h3>
						<p class="text-neutral-600 text-sm mb-6">{tier.priceDescription}</p>
						<div class="mb-8">
							<span class="text-5xl font-extrabold text-brand-black">{tier.price}</span>
						</div>

						<ul class="space-y-3 text-sm text-neutral-700">
							{#each tier.features as feature}
								<li class="flex items-start">
									<svg class="w-4 h-4 text-success-green flex-shrink-0 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
					</div>
					<div class="mt-auto p-8 pt-0">
						<a href={tier.cta.href} class="{tier.popular ? 'btn-primary' : 'btn-secondary'} w-full text-center">
							{tier.cta.text}
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>