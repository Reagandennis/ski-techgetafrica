<script lang="ts">
	import CourseCard from '$lib/components/CourseCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let courses = $state(data.courses || []);
	let filteredCourses = $state(data.courses || []);
	let error = $state(data.error || null);
	let source = $state(data.source || 'supabase');

	// Filter state
	let searchQuery = $state('');
	let selectedDifficulty = $state('all');
	let selectedRating = $state('all');

	// Pagination
	let currentPage = $state(1);
	let itemsPerPage = 12;

	const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

	// Apply filters
	function applyFilters() {
		let filtered = courses;

		// Search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(c) =>
					c.title.toLowerCase().includes(query) ||
					c.organizationName?.toLowerCase().includes(query) ||
					c.description?.toLowerCase().includes(query) ||
					c.category?.toLowerCase().includes(query)
			);
		}

		// Difficulty filter
		if (selectedDifficulty !== 'all') {
			filtered = filtered.filter((c) => c.difficulty === selectedDifficulty);
		}

		// Rating filter
		if (selectedRating !== 'all') {
			const minRating = parseFloat(selectedRating);
			filtered = filtered.filter((c) => c.rating >= minRating);
		}

		filteredCourses = filtered;
		currentPage = 1;
	}

	// Pagination
	let paginatedCourses = $derived(filteredCourses.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	));
	let totalPages = $derived(Math.ceil(filteredCourses.length / itemsPerPage));

	// Reactive filter updates
	$effect(() => {
		applyFilters();
	});
</script>

<svelte:head>
	<title>Courses - Techgetafrica</title>
	<meta name="description" content="Browse the 2026 Techgetafrica course catalogue across software, cloud, data, security, and more." />
</svelte:head>

<!-- Page Header -->
<div class="bg-gradient-to-b from-brand-black-dark to-neutral-900 text-white py-16">
	<div class="container-md grid gap-8 lg:grid-cols-2 items-center">
		<div class="space-y-4">
			<p class="text-sm uppercase tracking-wide text-brand-red font-semibold">Welcome to the 2026 catalogue</p>
			<h1 class="text-4xl md:text-5xl font-bold leading-tight">TECHGETAFRICA Course Catalogue 2026</h1>
			<p class="text-lg text-neutral-300">
				Tech is the future. We shape careers, unlock global opportunities, and deliver hands-on, industry-grade skills.
			</p>
			<p class="text-neutral-200">
				No fluff. Just the certifications, portfolios, and connections that get you hired. Explore, enroll, and own your tech future today.
			</p>
			<div class="flex flex-wrap gap-3 text-sm text-neutral-200">
				<span class="badge badge-primary">Software</span>
				<span class="badge badge-neutral">Cloud & DevOps</span>
				<span class="badge badge-neutral">AI & Data</span>
				<span class="badge badge-neutral">Cybersecurity</span>
			</div>
		</div>
		<div class="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
			<p class="text-sm font-semibold text-brand-red">Courses & Certifications</p>
			<p class="text-lg font-medium text-white">50+ catalogued pathways across 10 disciplines</p>
			<ul class="space-y-2 text-neutral-200 text-sm list-disc list-inside">
				<li>Beginner to advanced, exam-ready prep</li>
				<li>Built with African tech professionals in mind</li>
				<li>Certification-focused, portfolio-driven delivery</li>
			</ul>
		</div>
	</div>
</div>

<!-- Content Section -->
<div class="section-py bg-white">
	<div class="container-md">
		<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
			<!-- Sidebar Filters -->
			<aside class="lg:col-span-1">
				<div class="sticky top-24 space-y-8">
					<!-- Search -->
					<div>
						<label class="block text-sm font-semibold text-brand-black mb-3">
							Search Courses
						</label>
						<input
							type="text"
							placeholder="Search by title, organization..."
							bind:value={searchQuery}
							class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
						/>
					</div>

					<!-- Difficulty Filter -->
					<div>
						<label class="block text-sm font-semibold text-brand-black mb-3">
							Difficulty Level
						</label>
						<div class="space-y-2">
							{#each difficulties as difficulty (difficulty)}
								<label class="flex items-center gap-3 cursor-pointer">
									<input
										type="radio"
										name="difficulty"
										value={difficulty}
										bind:group={selectedDifficulty}
										class="w-4 h-4"
									/>
									<span class="text-sm text-neutral-700 capitalize">
										{difficulty === 'all' ? 'All Levels' : difficulty}
									</span>
								</label>
							{/each}
						</div>
					</div>

					<!-- Rating Filter -->
					<div>
						<label class="block text-sm font-semibold text-brand-black mb-3">
							Minimum Rating
						</label>
						<div class="space-y-2">
							{#each ['all', '4.5', '4.0', '3.5'] as rating (rating)}
								<label class="flex items-center gap-3 cursor-pointer">
									<input
										type="radio"
										name="rating"
										value={rating}
										bind:group={selectedRating}
										class="w-4 h-4"
									/>
									<span class="text-sm text-neutral-700">
										{rating === 'all'
											? 'All Ratings'
											: `${rating}+ stars`}
									</span>
								</label>
							{/each}
						</div>
					</div>

					<!-- Clear Filters -->
					<button
						class="btn-secondary w-full"
						onclick={() => {
							searchQuery = '';
							selectedDifficulty = 'all';
							selectedRating = 'all';
						}}
					>
						Clear Filters
					</button>
				</div>
			</aside>

			<!-- Main Content -->
			<main class="lg:col-span-3 space-y-6">
				{#if error}
					<div class="card p-4 border border-amber-200 bg-amber-50 text-amber-800">
						<p class="font-semibold">{error}</p>
						{#if source === 'static'}
							<p class="text-sm text-amber-700 mt-1">Showing the latest catalogue preview while we reconnect to live data.</p>
						{/if}
					</div>
				{:else if source === 'static'}
					<div class="card p-4 border border-brand-red/30 bg-brand-red/5 text-brand-red">
						<p class="font-semibold">Showing our 2026 catalogue preview.</p>
						<p class="text-sm text-brand-red/90">Live enrollments will appear once the database sync is restored.</p>
					</div>
				{/if}

				{#if filteredCourses.length === 0}
					<!-- Empty state -->
					<div class="card p-12 text-center">
						<svg class="w-16 h-16 mx-auto text-neutral-400 mb-4" fill="none" stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<h3 class="text-xl font-semibold text-brand-black mb-2">
							No Courses Found
						</h3>
						<p class="text-neutral-600 mb-6">
							Try adjusting your search filters to find what you're looking for.
						</p>
						<button
							class="btn-primary"
							onclick={() => {
								searchQuery = '';
								selectedDifficulty = 'all';
								selectedRating = 'all';
							}}
						>
							Clear Filters
						</button>
					</div>
				{:else}
					<!-- Courses Grid -->
					<div>
						<!-- Results Header -->
						<div class="mb-8 flex items-center justify-between">
							<p class="text-sm font-medium text-neutral-600">
								Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(
									currentPage * itemsPerPage,
									filteredCourses.length
								)} of {filteredCourses.length} courses
							</p>
							<select
								class="px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
							>
								<option>Most Popular</option>
								<option>Highest Rated</option>
								<option>Newest</option>
								<option>Price: Low to High</option>
								<option>Price: High to Low</option>
							</select>
						</div>

						<!-- Course Cards Grid -->
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
							{#each paginatedCourses as course (course.id)}
								<CourseCard
									title={course.title}
									organizationName={course.organizationName}
									organizationLogo={course.organizationLogo}
									certificationType={course.certificationType ?? course.certification_type}
									rating={course.rating}
									ratingCount={course.ratingCount ?? course.rating_count}
									enrollmentCount={course.enrollmentCount ?? course.enrollment_count}
									description={course.description}
									imageUrl={course.imageUrl ?? course.image_url}
									price={course.price}
									originalPrice={course.originalPrice ?? course.original_price}
									difficulty={course.difficulty}
									duration={course.duration}
									currency={course.currency ?? 'KES'}
									href={`/courses/${course.slug}`}
								/>
							{/each}
						</div>

						<!-- Pagination -->
						{#if totalPages > 1}
							<div class="flex items-center justify-center gap-2 pt-8 border-t border-neutral-200">
								<button
									class="px-4 py-2 border border-neutral-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100"
									disabled={currentPage === 1}
									onclick={() => (currentPage = Math.max(1, currentPage - 1))}
								>
									Previous
								</button>

								{#each { length: totalPages } as _, i}
									<button
										class="w-10 h-10 rounded-lg transition-all {currentPage === i + 1
											? 'bg-brand-red text-white'
											: 'border border-neutral-300 hover:bg-neutral-100'}"
										onclick={() => (currentPage = i + 1)}
									>
										{i + 1}
									</button>
								{/each}

								<button
									class="px-4 py-2 border border-neutral-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-100"
									disabled={currentPage === totalPages}
									onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}
								>
									Next
								</button>
							</div>
						{/if}
					</div>
				{/if}
			</main>
		</div>
	</div>
</div>

<style>
    .text-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    } 
</style>
