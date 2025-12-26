<script lang="ts">
	const learningPaths = [
		{
			title: 'Full-Stack Web Developer',
			description: 'Master front-end and back-end technologies to build complete web applications.',
			icon: '🌐',
			courses: ['HTML, CSS, & JavaScript', 'React & SvelteKit', 'Node.js & Express', 'Databases with PostgreSQL', 'DevOps Fundamentals'],
			duration: '6 Months',
			difficulty: 'Intermediate'
		},
		{
			title: 'Certified DevOps Engineer',
			description: 'Learn to automate and streamline your development and operations processes.',
			icon: '🚀',
			courses: ['Introduction to DevOps', 'CI/CD with Jenkins & GitHub Actions', 'Infrastructure as Code with Terraform', 'Containerization with Docker & Kubernetes', 'Cloud Monitoring & Observability'],
			duration: '4 Months',
			difficulty: 'Advanced'
		},
		{
			title: 'Data Science & Machine Learning',
			description: 'Unlock the power of data. Learn to analyze data, build predictive models, and drive business decisions.',
			icon: '🧠',
			courses: ['Python for Data Science', 'Data Analysis with Pandas & NumPy', 'Machine Learning Fundamentals', 'Deep Learning with TensorFlow', 'Big Data Technologies'],
			duration: '8 Months',
			difficulty: 'Beginner to Advanced'
		}
	];
</script>

<svelte:head>
	<title>Learning Paths - Techgetafrica</title>
	<meta name="description" content="Structured learning paths to guide you from beginner to expert in various tech domains." />
</svelte:head>

<div class="bg-gradient-to-b from-brand-black-dark to-neutral-900 text-white py-16">
	<div class="container-md text-center">
		<h1 class="text-5xl font-bold mb-4">Your Roadmap to Mastery</h1>
		<p class="text-xl text-neutral-300 max-w-3xl mx-auto">
			Our curated Learning Paths provide a clear, step-by-step journey to help you achieve your career goals in the tech industry.
		</p>
	</div>
</div>

<div class="section-py bg-white">
	<div class="container-md">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each learningPaths as path}
				<div class="card bg-white h-full flex flex-col">
					<div class="p-8">
						<div class="text-4xl mb-4">{path.icon}</div>
						<h3 class="text-2xl font-bold text-brand-black mb-2">{path.title}</h3>
						<p class="text-neutral-600 text-sm mb-6">{path.description}</p>
						
						<div class="flex items-center justify-between text-sm text-neutral-600 mb-6">
							<span class="font-semibold">{path.difficulty}</span>
							<span>{path.duration}</span>
						</div>

						<h4 class="font-semibold text-brand-black mb-3">Courses in this path:</h4>
						<ul class="space-y-2 text-sm text-neutral-700">
							{#each path.courses as course}
								<li class="flex items-start">
									<svg class="w-4 h-4 text-success-green flex-shrink-0 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
									<span>{course}</span>
								</li>
							{/each}
						</ul>
					</div>
					<div class="mt-auto p-8 pt-0">
						<a href="/courses" class="btn-primary w-full text-center">View Courses</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>