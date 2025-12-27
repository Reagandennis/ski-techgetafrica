
<script lang="ts">
	import { formatCurrency } from '$lib/utils/format';
	import techgetafricaLogo from '$lib/assets/TECHGETAFRICA (Facebook Post).png';
	interface CourseCardProps {
		id: string;
		title: string;
		organizationName: string;
		organizationLogo?: string;
		certificationType:
			| 'Professional Certificate'
			| 'Specialization'
			| 'Course'
			| 'Guided Project'
			| 'Certification'
			| 'Certificate';
		rating: number;
		ratingCount: number;
		enrollmentCount?: number;
		description?: string;
		imageUrl?: string;
		price?: number;
		originalPrice?: number;
		difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
		duration?: string;
		currency?: string;
		href: string;
	}

	let {
		id,
		title,
		organizationName = 'Techgetafrica',
		organizationLogo,
		certificationType,
		rating = 0,
		ratingCount = 0,
		enrollmentCount,
		description,
		imageUrl,
		price,
		originalPrice,
		difficulty,
		duration,
		currency = 'KES',
		href,
	}: CourseCardProps = $props();

	const truncateText = (text: string, maxLength: number) => {
		return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	};
</script>

<!-- Course Card -->
<a {href} class="block group">
	<div class="card overflow-hidden flex flex-col h-full bg-white">
		<!-- Course Image -->
		<div class="relative w-full h-48 overflow-hidden">
			{#if imageUrl}
				<div class="w-full h-full bg-neutral-200">
					<img
						src={imageUrl}
						alt={title}
						class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				</div>
			{:else}
				<div class="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex-center">
					<svg class="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</div>
			{/if}

			<!-- Difficulty Badge -->
			{#if difficulty}
				<div class="absolute top-3 right-3">
					<span
						class="badge badge-neutral text-xs font-semibold {difficulty === 'Beginner'
							? 'bg-success-green-light text-green-800'
							: difficulty === 'Intermediate'
								? 'bg-warning-amber-light text-amber-800'
								: 'bg-error-red-light text-red-800'}"
					>
						{difficulty}
					</span>
				</div>
			{/if}

			<!-- Techgetafrica Logo - Always visible -->
			<div class="absolute top-3 left-3 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20 z-10">
				<img src={techgetafricaLogo} alt="Techgetafrica" class="w-full h-full object-contain rounded-full" />
			</div>
		</div>

		<!-- Card Content -->
		<div class="flex flex-col flex-1 p-5">
			<!-- Organization Info -->
			<div class="flex items-center gap-3 mb-4">
				{#if organizationLogo}
					<img
						src={organizationLogo}
						alt={organizationName}
						class="w-8 h-8 rounded-full object-cover"
					/>
				{:else}
					<div class="w-8 h-8 rounded-full bg-brand-red flex-center text-white text-xs font-bold">
						{organizationName.charAt(0)}
					</div>
				{/if}
				<span class="text-xs font-medium text-neutral-600">{organizationName}</span>
			</div>

			<!-- Course Title -->
			<h3 class="text-lg font-semibold text-brand-black leading-snug mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
				{title}
			</h3>

			<!-- Course Description -->
			{#if description}
				<p class="text-sm text-neutral-600 mb-4 text-clamp-2">
					{truncateText(description, 100)}
				</p>
			{/if}

			<!-- Certificate Type Badge -->
			<div class="mb-4">
				<span class="badge badge-primary text-xs">
					{certificationType}
				</span>
			</div>

			<!-- Metadata -->
			<div class="flex items-center gap-4 mb-4 text-xs text-neutral-600">
				{#if duration}
					<div class="flex items-center gap-1">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>{duration}</span>
					</div>
				{/if}

				{#if enrollmentCount}
					<div class="flex items-center gap-1">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
						<span>{enrollmentCount.toLocaleString()} students</span>
					</div>
				{/if}
			</div>

			<!-- Spacer to push rating/price to bottom -->
			<div class="flex-1"></div>

			<!-- Rating -->
			<div class="flex items-center gap-2 mb-4 py-3 border-t border-neutral-200">
				<div class="flex items-center">
					{#each { length: 5 } as _, i}
						<svg
							class="w-4 h-4 {i < Math.round(rating) ? 'text-yellow-400' : 'text-neutral-300'}"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
							/>
						</svg>
					{/each}
				</div>
				<span class="text-xs font-semibold text-brand-black">{rating.toFixed(1)}</span>
				<span class="text-xs text-neutral-500">({ratingCount.toLocaleString()})</span>
			</div>

			<!-- Price and CTA -->
			<div class="flex items-center justify-between pt-4 border-t border-neutral-200">
				{#if price !== undefined}
					<div>
						{#if originalPrice && originalPrice > price}
							<span class="text-sm font-bold text-brand-red">{formatCurrency(price, currency)}</span>
							<span class="text-xs line-through text-neutral-400 ml-2">{formatCurrency(originalPrice, currency)}</span>
						{:else}
							<span class="text-sm font-bold text-brand-black">{formatCurrency(price, currency)}</span>
						{/if}
					</div>
				{/if}
				<button
					class="btn-primary text-xs px-4 py-2 whitespace-nowrap"
					onclick={(e) => {
						e.preventDefault();
					}}
				>
					Enroll Now
				</button>
			</div>
		</div>
	</div>
</a>

<style>
	:global(.line-clamp-2) {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
