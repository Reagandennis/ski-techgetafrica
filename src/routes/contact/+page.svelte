<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let form: ActionData;
	let isLoading = false;
</script>

<svelte:head>
	<title>Contact Us - Techgetafrica</title>
	<meta name="description" content="Get in touch with the Techgetafrica team for support, sales inquiries, or general questions." />
</svelte:head>

<div class="bg-gradient-to-b from-brand-black-dark to-neutral-900 text-white py-16">
	<div class="container-md text-center">
		<h1 class="text-5xl font-bold mb-4">Get in Touch</h1>
		<p class="text-xl text-neutral-300 max-w-3xl mx-auto">
			We'd love to hear from you. Whether you have a question about our courses, pricing, or anything else, our team is ready to answer all your questions.
		</p>
	</div>
</div>

<div class="section-py bg-white">
	<div class="container-md">
		<div class="max-w-xl mx-auto">
			{#if form?.success}
				<div class="card bg-success-green-light p-8 text-center">
					<h3 class="text-2xl font-bold text-green-800 mb-2">Thank you!</h3>
					<p class="text-neutral-700">Your message has been sent successfully. We will get back to you shortly.</p>
				</div>
			{:else}
				<form
					method="post"
					class="space-y-6"
					use:enhance={() => {
						isLoading = true;
						return ({ update }) => {
							update();
							isLoading = false;
						};
					}}
				>
					<div>
						<label for="name" class="block text-sm font-semibold text-brand-black mb-2">Full Name</label>
						<input type="text" id="name" name="name" required class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red" />
					</div>
					<div>
						<label for="email" class="block text-sm font-semibold text-brand-black mb-2">Email Address</label>
						<input type="email" id="email" name="email" required class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red" />
					</div>
					<div>
						<label for="subject" class="block text-sm font-semibold text-brand-black mb-2">Subject</label>
						<input type="text" id="subject" name="subject" required class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red" />
					</div>
					<div>
						<label for="message" class="block text-sm font-semibold text-brand-black mb-2">Message</label>
						<textarea id="message" name="message" rows="5" required class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"></textarea>
					</div>
					{#if form?.error}
						<p class="text-sm text-error-red">{form.error}</p>
					{/if}
					<div>
						<button type="submit" class="btn-primary w-full" disabled={isLoading}>
							{isLoading ? 'Sending...' : 'Send Message'}
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
</div>