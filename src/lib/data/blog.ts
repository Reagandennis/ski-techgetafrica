/**
 * Blog post data model and sample posts
 */

export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	author: string;
	authorImage: string;
	date: string;
	updatedDate?: string;
	readTime: number;
	coverImage: string;
	tags: string[];
	category: string;
	seoTitle?: string;
	seoDescription?: string;
}

export const blogPosts: BlogPost[] = [
	{
		id: '1',
		slug: 'getting-started-with-cloud-certifications',
		title: 'Getting Started with Cloud Certifications in 2024',
		excerpt: 'A comprehensive guide to starting your cloud certification journey with AWS, Google Cloud, and Azure.',
		content: `
# Getting Started with Cloud Certifications

Cloud computing has become essential in today's tech industry. Whether you're an aspiring cloud architect or looking to advance your career, certifications are a proven way to validate your skills.

## Why Cloud Certifications Matter

Cloud certifications are globally recognized credentials that demonstrate your expertise in cloud platforms. They can:
- Increase your earning potential by 20-30%
- Open doors to high-demand roles
- Show employers you're committed to professional development
- Keep you current with the latest technologies

## Popular Cloud Certifications

### AWS Certifications
- AWS Certified Cloud Practitioner (entry-level)
- AWS Certified Solutions Architect (mid-level)
- AWS Certified DevOps Engineer (advanced)

### Google Cloud Certifications
- Associate Cloud Engineer
- Professional Cloud Architect
- Professional Data Engineer

### Microsoft Azure Certifications
- Azure Administrator
- Azure Solutions Architect Expert
- Azure Security Engineer

## Getting Started

1. **Choose Your Platform**: Start with the cloud platform most relevant to your career goals
2. **Get Hands-On Experience**: Use free tiers to practice
3. **Take Practice Exams**: Familiarize yourself with the exam format
4. **Join Study Groups**: Connect with other learners
5. **Take the Real Exam**: When you're confident, schedule the certification exam

## Conclusion

Cloud certifications are an investment in your future. With dedication and proper resources, you can earn recognized credentials that open new career opportunities.
		`,
		author: 'Sarah Okonkwo',
		authorImage: 'https://via.placeholder.com/48x48/F22B29/ffffff?text=SO',
		date: '2024-12-15',
		updatedDate: '2024-12-18',
		readTime: 8,
		coverImage: 'https://via.placeholder.com/800x400/4285F4/ffffff?text=Cloud+Certifications',
		tags: ['cloud', 'aws', 'certifications', 'career'],
		category: 'Career',
		seoTitle: 'Getting Started with Cloud Certifications in 2024 | Techgetafrica',
		seoDescription: 'Learn how to get started with AWS, Google Cloud, and Azure certifications. A complete guide for beginners.',
	},
	{
		id: '2',
		slug: 'top-10-tech-skills-employers-want-2024',
		title: 'Top 10 Tech Skills Employers Want in 2024',
		excerpt: 'Discover the most in-demand technology skills that will boost your career in 2024 and beyond.',
		content: `
# Top 10 Tech Skills Employers Want in 2024

The technology landscape is constantly evolving. If you want to stay competitive, it's crucial to develop the right skills. Here are the top 10 tech skills employers are looking for in 2024.

## 1. Cloud Architecture
Cloud skills remain at the top of the list. Experience with AWS, Azure, or Google Cloud is highly valued.

## 2. AI/Machine Learning
AI is transforming industries. Skills in machine learning, neural networks, and large language models are in high demand.

## 3. DevOps & Infrastructure as Code
DevOps engineers are essential for modern software development. Learn tools like Kubernetes, Docker, and Terraform.

## 4. Cybersecurity
With increasing cyber threats, cybersecurity expertise is invaluable. Focus on cloud security, network security, and ethical hacking.

## 5. Full-Stack Development
Companies need developers who can work across the entire technology stack, from frontend to backend to DevOps.

## 6. Data Engineering
Data is the new oil. Data engineers who can build and maintain data pipelines are in high demand.

## 7. Blockchain Development
As blockchain technology matures, developers with blockchain skills are increasingly sought after.

## 8. Soft Skills
Don't forget soft skills! Communication, leadership, and problem-solving are just as important as technical skills.

## 9. Python Programming
Python remains the most popular programming language for AI, data science, and general development.

## 10. Containerization & Orchestration
Docker and Kubernetes skills are essential for modern application deployment.

## Conclusion

Invest in learning these skills and you'll be well-positioned for success in the tech industry.
		`,
		author: 'Kwame Mensah',
		authorImage: 'https://via.placeholder.com/48x48/2563EB/ffffff?text=KM',
		date: '2024-12-10',
		readTime: 10,
		coverImage: 'https://via.placeholder.com/800x400/10B981/ffffff?text=Tech+Skills',
		tags: ['skills', 'career', 'technology', 'learning'],
		category: 'Career',
	},
	{
		id: '3',
		slug: 'aws-certification-study-guide',
		title: 'Complete AWS Certification Study Guide',
		excerpt: 'Everything you need to know to pass your AWS certification exam on the first attempt.',
		content: `
# Complete AWS Certification Study Guide

This comprehensive guide will help you prepare for your AWS certification exam. Whether you're targeting the Cloud Practitioner, Solutions Architect, or DevOps Engineer certification, these principles apply.

## Exam Structure

AWS certifications typically include:
- 65-75 multiple-choice questions
- 90-130 minutes of exam time
- 70% pass score threshold
- Questions focused on real-world scenarios

## Key AWS Services to Know

### Compute
- EC2 (Elastic Compute Cloud)
- Lambda
- ECS and EKS

### Storage
- S3 (Simple Storage Service)
- EBS (Elastic Block Store)
- Glacier

### Networking
- VPC (Virtual Private Cloud)
- CloudFront
- Route 53

### Database
- RDS (Relational Database Service)
- DynamoDB
- ElastiCache

## Study Strategy

1. **Read AWS Documentation**: Start with official AWS whitepapers
2. **Take Online Courses**: Enroll in comprehensive courses
3. **Practice with Hands-On Labs**: Use AWS Free Tier
4. **Take Practice Exams**: Repeatedly until you score 80%+
5. **Review Weak Areas**: Focus on topics where you score low

## Exam Tips

- Read questions carefully
- Eliminate obviously wrong answers first
- Look for keywords in both questions and answers
- Don't second-guess your answers
- Manage your time effectively

## Conclusion

With proper preparation, you can earn your AWS certification and advance your career.
		`,
		author: 'Amara Okonkwo',
		authorImage: 'https://via.placeholder.com/48x48/F59E0B/ffffff?text=AO',
		date: '2024-12-05',
		readTime: 12,
		coverImage: 'https://via.placeholder.com/800x400/FF9900/ffffff?text=AWS+Study',
		tags: ['aws', 'certifications', 'study-guide', 'learning'],
		category: 'Tutorials',
	},
	{
		id: '4',
		slug: 'career-success-stories-african-tech-professionals',
		title: 'Career Success Stories: African Tech Professionals',
		excerpt: 'Inspiring stories of African professionals who advanced their careers through technology education.',
		content: `
# Career Success Stories: African Tech Professionals

Our community includes thousands of successful professionals who have transformed their careers through education. Here are some inspiring stories.

## From Help Desk to Cloud Architect

Meet Ibrahim, who started as a help desk technician in Lagos. Through dedication and the right courses, he earned his AWS Solutions Architect certification and is now leading cloud infrastructure projects for a major tech company.

"The certifications gave me the credibility I needed to move into architecture roles," Ibrahim shares. "I went from earning $15,000 to $85,000 annually within three years."

## Breaking into DevOps

Zainab, a software developer in Nairobi, wanted to transition into DevOps. She took our DevOps specialization and earned relevant certifications. Today, she's a Senior DevOps Engineer managing infrastructure for a fast-growing fintech startup.

"I was worried about the career switch, but the hands-on labs and real-world projects made all the difference," says Zainab.

## From Bootcamp Graduate to Senior Engineer

Tunde completed a coding bootcamp but struggled to find work. After earning cloud and containerization certifications through our platform, he landed a role at a top e-commerce company and has since been promoted to lead engineer.

"The certifications were the differentiator that got me in the door," Tunde explains.

## Your Success Story

These stories show what's possible with determination and the right resources. Your success story could be next.

Start your learning journey today and transform your career!
		`,
		author: 'Fatima Hassan',
		authorImage: 'https://via.placeholder.com/48x48/EC4899/ffffff?text=FH',
		date: '2024-11-28',
		readTime: 7,
		coverImage: 'https://via.placeholder.com/800x400/EC4899/ffffff?text=Success+Stories',
		tags: ['success-stories', 'careers', 'inspiration', 'testimonials'],
		category: 'Success Stories',
	},
	{
		id: '5',
		slug: 'the-future-of-technology-education-in-africa',
		title: 'The Future of Technology Education in Africa',
		excerpt: 'Exploring emerging trends and opportunities in tech education across the African continent.',
		content: `
# The Future of Technology Education in Africa

Africa is experiencing rapid digital transformation. Technology education will play a crucial role in ensuring our continent remains competitive in the global economy.

## Current State of Tech Education in Africa

While progress has been made, significant gaps remain:
- Limited access to quality tech education in rural areas
- High cost of learning resources
- Skills gap between what's taught and what employers need
- Brain drain as talented professionals move abroad

## Emerging Trends

### Online Learning Explosion
COVID-19 accelerated the shift to online learning. Platforms like Techgetafrica are making quality education accessible to millions.

### AI-Powered Learning
Adaptive learning systems that personalize education for each student are becoming mainstream.

### Industry Partnerships
Companies are increasingly partnering with educational platforms to ensure curriculum aligns with real-world needs.

### Affordable Certifications
Cost-effective certifications are democratizing access to globally recognized credentials.

## Opportunities

### For Students
- Access to world-class education from home
- Affordable certifications recognized globally
- Career support and job placement services
- Community and networking opportunities

### For Educators
- Reach students across the continent
- Share expertise with a larger audience
- Build sustainable income streams
- Contribute to Africa's development

## The Path Forward

The future of tech education in Africa is bright. With platforms making education accessible and affordable, we'll see more African professionals taking leading roles in the global tech industry.

The time is now. Invest in your education and be part of Africa's tech revolution.
		`,
		author: 'David Ochieng',
		authorImage: 'https://via.placeholder.com/48x48/8B5CF6/ffffff?text=DO',
		date: '2024-11-20',
		readTime: 9,
		coverImage: 'https://via.placeholder.com/800x400/8B5CF6/ffffff?text=Future+of+Tech',
		tags: ['future', 'education', 'africa', 'technology'],
		category: 'Industry Insights',
	},
];

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
	const tags = new Set<string>();
	blogPosts.forEach((post) => {
		post.tags.forEach((tag) => tags.add(tag));
	});
	return Array.from(tags).sort();
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
	const categories = new Set<string>();
	blogPosts.forEach((post) => categories.add(post.category));
	return Array.from(categories).sort();
}

/**
 * Get post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
	return blogPosts.find((post) => post.slug === slug);
}

/**
 * Filter posts by tag or category
 */
export function filterPosts(
	tag?: string,
	category?: string,
	searchQuery?: string,
): BlogPost[] {
	return blogPosts.filter((post) => {
		const matchesTag = !tag || post.tags.includes(tag);
		const matchesCategory = !category || post.category === category;
		const matchesSearch =
			!searchQuery ||
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

		return matchesTag && matchesCategory && matchesSearch;
	});
}

/**
 * Get related posts
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
	const currentPost = getPostBySlug(slug);
	if (!currentPost) return [];

	return blogPosts
		.filter((post) => post.slug !== slug)
		.filter((post) =>
			post.tags.some((tag) => currentPost.tags.includes(tag)) ||
			post.category === currentPost.category,
		)
		.slice(0, limit);
}
