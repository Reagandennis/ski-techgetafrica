<script lang="ts">
	import type { PageData } from './$types';
	import { Star, BarChart, Clock, Users, Award } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	const { course } = data;
</script>

<div class="container-md section-py">
	<div class="grid lg:grid-cols-3 gap-12">
		<!-- Main Content -->
		<div class="lg:col-span-2 space-y-8">
			<!-- Header -->
			<header>
				<p class="text-sm text-gray-600 mb-2">{course.certificationType ?? course.certification_type}</p>
				<h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
					{course.title}
				</h1>
							<p class="text-lg text-gray-700">
								{course.description}
							</p>
				
							{#if course.whyChoose}
								<section class="space-y-4">
									<h2 class="text-3xl font-bold text-gray-900">Why choose this course?</h2>
									<p class="text-gray-700">
										{course.whyChoose}
									</p>
								</section>
							{/if}
				
							{#if course.careerOptions}
								<section class="space-y-4">
									<h2 class="text-3xl font-bold text-gray-900">Career Options</h2>
									<p class="text-gray-700">
										{course.careerOptions}
									</p>
								</section>
							{/if}
							</header>

			<!-- Image -->
			{#if course.imageUrl || course.image_url}
				<img
					src={course.imageUrl ?? course.image_url}
					alt={course.title}
					class="w-full h-auto object-cover rounded-lg shadow-lg"
				/>
			{:else}
				<div class="w-full h-64 bg-neutral-100 rounded-lg shadow-lg flex items-center justify-center text-neutral-500">
					<p>No cover image available</p>
				</div>
			{/if}

			<!-- More details can be added here -->
		</div>

		<!-- Sidebar -->
		<aside class="space-y-6">
			<div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
				<h3 class="text-2xl font-bold mb-4">
					{new Intl.NumberFormat('en-KE', { style: 'currency', currency: course.currency ?? 'KES' }).format(course.price)}
				</h3>

				<button
					class="w-full bg-brand-red text-white font-bold py-3 rounded-lg hover:bg-brand-red-light transition-colors"
				>
					Enroll Now
				</button>

				<ul class="mt-6 space-y-4 text-gray-700">
					<li class="flex items-center gap-3">
						<Star class="w-5 h-5 text-yellow-500" />
						<span><strong>{course.rating}</strong> ({course.rating_count ?? course.ratingCount} ratings)</span>
					</li>
					<li class="flex items-center gap-3">
						<BarChart class="w-5 h-5 text-brand-red" />
						<span>{course.difficulty}</span>
					</li>
					<li class="flex items-center gap-3">
						<Clock class="w-5 h-5 text-brand-red" />
						<span>Approx. {course.duration}</span>
					</li>
					<li class="flex items-center gap-3">
						<Users class="w-5 h-5 text-brand-red" />
						<span>{(course.enrollment_count ?? course.enrollmentCount ?? 0).toLocaleString()} already enrolled</span>
					</li>
					<li class="flex items-center gap-3">
						<Award class="w-5 h-5 text-brand-red" />
						<span>{course.certificationType ?? course.certification_type}</span>
					</li>
				</ul>
			</div>
			<div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
				<h4 class="font-bold text-lg mb-3">Organization</h4>
				<div class="flex items-center gap-3">
						{#if course.organizationLogo || course.organization_logo}
							<img src={course.organizationLogo ?? course.organization_logo} alt={course.organizationName ?? course.organization_name} class="w-10 h-10 rounded-full" />
					{/if}
						<span class="font-medium">{course.organizationName ?? course.organization_name}</span>
				</div>
			</div>
		</aside>
	</div>
</div>
