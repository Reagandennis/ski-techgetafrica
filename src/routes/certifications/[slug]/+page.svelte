<script lang="ts">
	import type { PageData } from './$types';
	import { formatCurrency } from '$lib/utils/format';
	import { flatCourses as courses } from '$lib/data/courses';

	export let data: PageData;

	$: roadmap = data.roadmap;

	// Get related courses for certifications mentioned in the roadmap
	$: relatedCourses = roadmap ? courses.filter(course =>
		roadmap.phases.some(phase =>
			phase.certifications.some(cert =>
				course.title.toLowerCase().includes(cert.name.toLowerCase().split(' ').slice(0, 2).join(' '))
			)
		)
	) : [];

	function getLevelColor(level: string) {
		switch (level.toLowerCase()) {
			case 'beginner':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'intermediate':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			case 'advanced':
				return 'bg-orange-100 text-orange-800 border-orange-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	}
</script>

<svelte:head>
	<title>{roadmap.title} Learning Path | TECHGETAFRICA</title>
	<meta name="description" content="{roadmap.summary}" />
	<meta name="keywords" content="{roadmap.skills.join(', ')}, certification, learning path, {roadmap.vendors}" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Hero Section -->
	<div class="bg-gradient-to-br from-brand-red via-red-600 to-red-800 text-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<div class="text-center">
				<h1 class="text-4xl md:text-6xl font-bold mb-6">
					{roadmap.title}
				</h1>
				<p class="text-xl md:text-2xl mb-8 text-red-100">
					{roadmap.summary}
				</p>
				<div class="flex flex-wrap justify-center gap-4 mb-8">
					<span class="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
						{roadmap.level}
					</span>
					<span class="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
						{roadmap.duration}
					</span>
					<span class="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
						{roadmap.vendors}
					</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Roadmap Overview -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<div class="bg-white rounded-2xl shadow-lg p-8 mb-12">
			<h2 class="text-3xl font-bold text-gray-900 mb-6">Roadmap Overview</h2>
			<p class="text-lg text-gray-600 mb-8">{roadmap.description}</p>

			<div class="grid md:grid-cols-2 gap-8">
				<div>
					<h3 class="text-xl font-semibold text-gray-900 mb-4">Key Skills You'll Master</h3>
					<div class="flex flex-wrap gap-2">
						{#each roadmap.skills as skill}
							<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
								{skill}
							</span>
						{/each}
					</div>
				</div>
				<div>
					<h3 class="text-xl font-semibold text-gray-900 mb-4">Total Phases</h3>
					<p class="text-gray-600">{roadmap.phases.length} structured learning phases</p>
					<p class="text-gray-600 mt-2">From {roadmap.phases[0].title.toLowerCase()} to {roadmap.phases[roadmap.phases.length - 1].title.toLowerCase()}</p>
				</div>
			</div>
		</div>

		<!-- Learning Phases -->
		<div class="space-y-8">
			{#each roadmap.phases as phase, index}
				<div class="bg-white rounded-2xl shadow-lg overflow-hidden">
					<div class="bg-gradient-to-r from-brand-red to-red-600 p-6 text-white">
						<div class="flex items-center justify-between">
							<div>
								<h3 class="text-2xl font-bold">Phase {index + 1}: {phase.title}</h3>
								<p class="text-red-100 mt-2">{phase.description}</p>
							</div>
							<div class="text-right">
								<div class="text-2xl font-bold">{phase.duration}</div>
								<div class="text-red-100">Duration</div>
							</div>
						</div>
					</div>

					<div class="p-6">
						<div class="grid lg:grid-cols-2 gap-8">
							<!-- Modules -->
							<div>
								<h4 class="text-xl font-semibold text-gray-900 mb-4">Learning Modules</h4>
								<ul class="space-y-3">
									{#each phase.modules as module}
										<li class="flex items-center text-gray-700">
											<div class="w-2 h-2 bg-brand-red rounded-full mr-3 flex-shrink-0"></div>
											{module}
										</li>
									{/each}
								</ul>
							</div>

							<!-- Certifications -->
							<div>
								<h4 class="text-xl font-semibold text-gray-900 mb-4">Target Certifications</h4>
								<div class="space-y-4">
									{#each phase.certifications as cert}
										<div class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
											<div class="flex items-start justify-between mb-2">
												<h5 class="font-medium text-gray-900">{cert.name}</h5>
												<span class="px-2 py-1 text-xs font-medium rounded-full {getLevelColor(cert.level)} ml-2">
													{cert.level}
												</span>
											</div>
											<a
												href="/courses/{cert.slug}"
												class="inline-flex items-center text-sm text-brand-red hover:text-red-800 font-medium"
											>
												View Course Details →
											</a>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Related Courses -->
		{#if relatedCourses.length > 0}
			<div class="bg-white rounded-2xl shadow-lg p-8 mt-12">
				<h2 class="text-3xl font-bold text-gray-900 mb-8">Available Certification Courses</h2>
				<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each relatedCourses as course}
						<div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
							<div class="flex items-center justify-between mb-4">
								<h3 class="font-semibold text-gray-900">{course.title}</h3>
								<span class="px-2 py-1 text-xs font-medium rounded-full {getLevelColor(course.difficulty || 'Beginner')}">
									{course.difficulty || 'Beginner'}
								</span>
							</div>
							<p class="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
							<div class="flex items-center justify-between">
								<span class="text-lg font-bold text-brand-red">{formatCurrency(course.price || 0, 'KES')}</span>
								<a
									href="/courses/{course.slug}"
									class="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
								>
									Enroll Now
								</a>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Call to Action -->
		<div class="bg-gradient-to-r from-brand-red to-red-600 rounded-2xl p-8 text-white text-center mt-12">
			<h2 class="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
			<p class="text-xl text-red-100 mb-8">
				Begin with our recommended entry-level certifications and work your way up to expert level.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/courses?category={roadmap.id}"
					class="px-8 py-3 bg-white text-brand-red rounded-lg font-semibold hover:bg-gray-100 transition-colors"
				>
					Explore {roadmap.title} Courses
				</a>
				<a
					href="/contact"
					class="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-brand-red transition-colors"
				>
					Get Career Guidance
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>