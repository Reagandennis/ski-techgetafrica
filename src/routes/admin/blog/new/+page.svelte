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
		<a href="/admin/blog" class="text-sm font-medium text-gray-600 hover:text-gray-900">
			&larr; Back to Blog Posts
		</a>
		<h1 class="text-3xl font-bold text-gray-900 mt-2">Create New Blog Post</h1>
		<p class="text-gray-600 mt-1">Fill in the details below to add a new post.</p>
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
			<!-- Post Title -->
			<div>
				<label for="title" class="block text-sm font-medium text-gray-700">Post Title</label>
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

            <!-- Author Name -->
			<div>
				<label for="author_name" class="block text-sm font-medium text-gray-700">
					Author Name
				</label>
				<input
					type="text"
					id="author_name"
					name="author_name"
					required
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
				/>
			</div>

			<!-- Author Image URL -->
			<div>
				<label for="author_image" class="block text-sm font-medium text-gray-700">
					Author Image URL
				</label>
				<input
					type="url"
					id="author_image"
					name="author_image"
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
				/>
			</div>

			<!-- Category -->
			<div>
				<label for="category" class="block text-sm font-medium text-gray-700">Category</label>
				<input
					type="text"
					id="category"
					name="category"
					required
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
				/>
			</div>

			<!-- Tags -->
			<div>
				<label for="tags" class="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
				<input
					type="text"
					id="tags"
					name="tags"
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
				/>
			</div>

			<!-- Cover Image URL -->
			<div>
				<label for="cover_image" class="block text-sm font-medium text-gray-700">Cover Image URL</label>
				<input
					type="url"
					id="cover_image"
					name="cover_image"
					required
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
				/>
			</div>
            <!-- Read Time -->
			<div>
				<label for="read_time" class="block text-sm font-medium text-gray-700">Read Time (minutes)</label>
				<input
					type="number"
					id="read_time"
					name="read_time"
                    value="5"
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
				/>
			</div>
		</div>

		<!-- Excerpt -->
		<div>
			<label for="excerpt" class="block text-sm font-medium text-gray-700">Excerpt</label>
			<textarea
				id="excerpt"
				name="excerpt"
				rows="3"
				required
				class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
			></textarea>
		</div>

		<!-- Content -->
		<div>
			<label for="content" class="block text-sm font-medium text-gray-700">Content</label>
			<textarea
				id="content"
				name="content"
				rows="10"
				required
				class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
			></textarea>
		</div>

		<!-- SEO -->
		<div class="space-y-4 rounded-lg border border-gray-200 p-4">
			<h3 class="text-lg font-medium text-gray-900">SEO Settings</h3>
			<div>
				<label for="seo_title" class="block text-sm font-medium text-gray-700">SEO Title</label>
				<input
					type="text"
					id="seo_title"
					name="seo_title"
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
				/>
			</div>
			<div>
				<label for="seo_description" class="block text-sm font-medium text-gray-700">SEO Description</label>
				<textarea
					id="seo_description"
					name="seo_description"
					rows="2"
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
				></textarea>
			</div>
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
				Publish this post immediately
			</label>
		</div>

		<!-- Submit Button -->
		<div class="flex justify-end">
			<button
				type="submit"
				disabled={isLoading}
				class="px-6 py-2 bg-brand-red text-white rounded-lg hover:bg-brand-red-light transition-colors font-medium disabled:bg-gray-400"
			>
				{isLoading ? 'Creating...' : 'Create Post'}
			</button>
		</div>
	</form>
</div>