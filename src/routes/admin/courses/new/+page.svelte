<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let form: ActionData;
	let isLoading = false;

	function generatSlug(title: string): string {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	}
</script>

<div class="space-y-6">
	<div>
		<a href="/admin/courses" class="text-sm font-medium text-gray-600 hover:text-gray-900">
			&larr; Back to Courses
		</a>
		<h1 class="text-3xl font-bold text-gray-900 mt-2">Create New Course</h1>
		<p class="text-gray-600 mt-1">Fill in the details below to add a new course.</p>
	</div>

	{#if form?.error}
		<div class="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
			<p class="font-bold">Error</p>
			<p>{form.error}</p>
		</div>
	{/if}

	<form
		method="post"
		class="bg-white rounded-lg shadow-md p-6 space-y-6"
		use:enhance={() => {
			isLoading = true;
			return ({ update }) => {
				update();
				isLoading = false;
			};
		}}
	>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- Course Title -->
			<div>
				<label for="title" class="block text-sm font-medium text-gray-700">Course Title</label>
				<input
					type="text"
					id="title"
					name="title"
					required
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
					on:input={(e) => {
						const title = e.currentTarget.value;
						const slugInput = document.querySelector<HTMLInputElement>('#slug');
						if (slugInput) {
							slugInput.value = generatSlug(title);
						}
					}}
				/>
			</div>

			<!-- Slug -->
			<div>
				<label for="slug" class="block text-sm font-medium text-gray-700">Slug</label>
				<input
					type="text"
					id="slug"
					name="slug"
					required
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red bg-gray-50"
				/>
			</div>

			<!-- Organization Name -->
			<div>
				<label for="organization_name" class="block text-sm font-medium text-gray-700">
					Organization Name
				</label>
				<input
					type="text"
					id="organization_name"
					name="organization_name"
					required
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
				/>
			</div>

			<!-- Organization Logo URL -->
			<div>
				<label for="organization_logo" class="block text-sm font-medium text-gray-700">
					Organization Logo URL
				</label>
				<input
					type="url"
					id="organization_logo"
					name="organization_logo"
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
				/>
			</div>

			<!-- Certification Type -->
			<div>
				<label for="certification_type" class="block text-sm font-medium text-gray-700">
					Certification Type
				</label>
				<select
					id="certification_type"
					name="certification_type"
					required
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
				>
					<option value="Professional Certificate">Professional Certificate</option>
					<option value="Specialization">Specialization</option>
					<option value="Course">Course</option>
				</select>
			</div>

			<!-- Difficulty -->
			<div>
				<label for="difficulty" class="block text-sm font-medium text-gray-700">Difficulty</label>
				<select
					id="difficulty"
					name="difficulty"
					required
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
				>
					<option value="Beginner">Beginner</option>
					<option value="Intermediate">Intermediate</option>
					<option value="Advanced">Advanced</option>
				</select>
			</div>

			<!-- Duration -->
			<div>
				<label for="duration" class="block text-sm font-medium text-gray-700">Duration</label>
				<input
					type="text"
					id="duration"
					name="duration"
					required
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
				/>
			</div>

			<!-- Image URL -->
			<div>
				<label for="image_url" class="block text-sm font-medium text-gray-700">Image URL</label>
				<input
					type="url"
					id="image_url"
					name="image_url"
					required
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
				/>
			</div>

			<!-- Price -->
			<div class="relative">
				<label for="price" class="block text-sm font-medium text-gray-700">Price</label>
				<div class="mt-1 relative rounded-md shadow-sm">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<span class="text-gray-500 sm:text-sm"> KES </span>
					</div>
					<input
						type="number"
						name="price"
						id="price"
						class="block w-full rounded-md border-gray-300 pl-12 focus:border-brand-red focus:ring-brand-red"
						placeholder="0.00"
						step="0.01"
					/>
				</div>
			</div>

			<!-- Original Price -->
			<div class="relative">
				<label for="original_price" class="block text-sm font-medium text-gray-700">
					Original Price (Optional)
				</label>
				<div class="mt-1 relative rounded-md shadow-sm">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<span class="text-gray-500 sm:text-sm"> KES </span>
					</div>
					<input
						type="number"
						name="original_price"
						id="original_price"
						class="block w-full rounded-md border-gray-300 pl-12 focus:border-brand-red focus:ring-brand-red"
						placeholder="0.00"
						step="0.01"
					/>
				</div>
			</div>
		</div>

		<!-- Description -->
		<div>
			<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
			<textarea
				id="description"
				name="description"
				rows="6"
				required
				class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
			></textarea>
		</div>

		<!-- Published Status -->
		<div class="flex items-center">
			<input
				id="published"
				name="published"
				type="checkbox"
				class="h-4 w-4 rounded border-gray-300 text-brand-red focus:ring-brand-red"
			/>
			<label for="published" class="ml-2 block text-sm text-gray-900">
				Publish this course immediately
			</label>
		</div>

		<!-- Submit Button -->
		<div class="flex justify-end">
			<button
				type="submit"
				disabled={isLoading}
				class="px-6 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red-light transition-colors font-medium disabled:bg-gray-400"
			>
				{isLoading ? 'Creating...' : 'Create Course'}
			</button>
		</div>
	</form>
</div>