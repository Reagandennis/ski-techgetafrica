import type { PageServerLoad } from './$types';

const roadmaps = [
	{
		id: 'cloud-architect',
		title: 'Cloud Solutions Architect',
		vendors: 'AWS · Azure · Google Cloud',
		summary: 'Go from fundamentals to multi-cloud design and security for enterprise-scale systems.',
		level: 'Beginner to Professional',
		duration: '4-6 months',
		description: 'Master cloud architecture across multiple platforms with hands-on experience in designing scalable, secure, and cost-effective cloud solutions.',
		skills: ['Cloud Fundamentals', 'Infrastructure Design', 'Security', 'Cost Optimization', 'Multi-Cloud Architecture'],
		phases: [
			{
				title: 'Foundation Phase',
				duration: '4-6 weeks',
				description: 'Build core cloud computing knowledge and basic infrastructure skills.',
				certifications: [
					{ name: 'AWS Certified Cloud Practitioner', slug: 'aws-certified-cloud-practitioner', level: 'Beginner' },
					{ name: 'Microsoft Certified: Azure Fundamentals', slug: 'microsoft-certified-azure-fundamentals', level: 'Beginner' },
					{ name: 'Google Cloud Professional Cloud Architect', slug: 'google-cloud-professional-cloud-architect', level: 'Beginner' }
				],
				modules: [
					'Cloud Computing Fundamentals',
					'Virtualization and Containers',
					'Basic Networking Concepts',
					'Storage Solutions',
					'Identity and Access Management',
					'Cost Management Basics'
				]
			},
			{
				title: 'Infrastructure Phase',
				duration: '6-8 weeks',
				description: 'Learn to design and implement cloud infrastructure solutions.',
				certifications: [
					{ name: 'AWS Certified Solutions Architect - Associate', slug: 'aws-certified-solutions-architect-associate', level: 'Intermediate' },
					{ name: 'Microsoft Certified: Azure Solutions Architect Expert', slug: 'microsoft-certified-azure-solutions-architect-expert', level: 'Advanced' },
					{ name: 'Google Cloud Professional Cloud Architect', slug: 'google-cloud-professional-cloud-architect', level: 'Advanced' }
				],
				modules: [
					'Virtual Networks and Subnets',
					'Compute Services (EC2, VMs, App Services)',
					'Storage Architecture (S3, Blob Storage, Cloud Storage)',
					'Database Solutions',
					'Load Balancing and Auto-scaling',
					'Monitoring and Logging'
				]
			},
			{
				title: 'Security & Compliance Phase',
				duration: '4-6 weeks',
				description: 'Implement security best practices and compliance frameworks.',
				certifications: [
					{ name: 'AWS Certified Security - Specialty', slug: 'aws-certified-security-specialty', level: 'Advanced' },
					{ name: 'Microsoft Certified: Azure Security Engineer', slug: 'microsoft-certified-azure-security-engineer', level: 'Advanced' },
					{ name: 'Google Cloud Professional Cloud Security Engineer', slug: 'google-cloud-professional-cloud-security-engineer', level: 'Advanced' }
				],
				modules: [
					'Cloud Security Fundamentals',
					'Identity and Access Management (IAM)',
					'Network Security',
					'Data Encryption',
					'Compliance Frameworks',
					'Security Monitoring and Incident Response'
				]
			},
			{
				title: 'Advanced Architecture Phase',
				duration: '6-8 weeks',
				description: 'Master advanced architectural patterns and multi-cloud solutions.',
				certifications: [
					{ name: 'AWS Certified Solutions Architect - Professional', slug: 'aws-certified-solutions-architect-professional', level: 'Expert' },
					{ name: 'AWS Certified Advanced Networking - Specialty', slug: 'aws-certified-advanced-networking-specialty', level: 'Expert' }
				],
				modules: [
					'Microservices Architecture',
					'Serverless Computing',
					'Hybrid Cloud Solutions',
					'Disaster Recovery',
					'Performance Optimization',
					'Multi-Cloud Architecture'
				]
			}
		]
	},
	{
		id: 'data-ai',
		title: 'Data & AI Engineer',
		vendors: 'Azure · Databricks · AWS',
		summary: 'Build reliable data platforms and production AI workflows with modern tooling.',
		level: 'Intermediate to Advanced',
		duration: '5-7 months',
		description: 'Develop expertise in data engineering, machine learning operations, and AI solution deployment.',
		skills: ['Data Engineering', 'Machine Learning', 'MLOps', 'Big Data', 'AI Ethics'],
		phases: [
			{
				title: 'Data Fundamentals Phase',
				duration: '4-6 weeks',
				description: 'Master core data concepts and SQL programming.',
				certifications: [
					{ name: 'Google Data Analytics Professional Certificate', slug: 'google-data-analytics-professional-certificate', level: 'Beginner' }
				],
				modules: [
					'SQL Fundamentals',
					'Data Modeling',
					'ETL/ELT Concepts',
					'Data Warehousing',
					'Basic Statistics',
					'Python for Data Analysis'
				]
			},
			{
				title: 'Data Engineering Phase',
				duration: '6-8 weeks',
				description: 'Build scalable data pipelines and processing systems.',
				certifications: [
					{ name: 'AWS Certified Data Analytics - Specialty', slug: 'aws-certified-data-analytics-specialty', level: 'Advanced' },
					{ name: 'Microsoft Certified: Azure Data Engineer Associate', slug: 'microsoft-certified-azure-data-engineer-associate', level: 'Intermediate' },
					{ name: 'Google Cloud Professional Data Engineer', slug: 'google-cloud-professional-data-engineer', level: 'Advanced' }
				],
				modules: [
					'Apache Spark',
					'Data Lake Architecture',
					'Stream Processing',
					'Data Quality and Governance',
					'Performance Optimization',
					'Real-time Analytics'
				]
			},
			{
				title: 'Machine Learning Phase',
				duration: '6-8 weeks',
				description: 'Learn ML algorithms and model development.',
				certifications: [
					{ name: 'AWS Certified Machine Learning - Specialty', slug: 'aws-certified-machine-learning-specialty', level: 'Advanced' },
					{ name: 'Microsoft Certified: Azure AI Engineer Associate', slug: 'microsoft-certified-azure-ai-engineer-associate', level: 'Intermediate' },
					{ name: 'TensorFlow Developer Certificate', slug: 'tensorflow-developer-certificate', level: 'Intermediate' }
				],
				modules: [
					'Supervised Learning',
					'Unsupervised Learning',
					'Deep Learning',
					'Natural Language Processing',
					'Computer Vision',
					'Model Evaluation'
				]
			},
			{
				title: 'MLOps & Production Phase',
				duration: '4-6 weeks',
				description: 'Deploy and manage ML models in production environments.',
				certifications: [
					{ name: 'Microsoft Certified: Azure Machine Learning Specialist', slug: 'microsoft-certified-azure-machine-learning-specialist', level: 'Advanced' }
				],
				modules: [
					'Model Deployment',
					'CI/CD for ML',
					'Model Monitoring',
					'A/B Testing',
					'AI Ethics and Bias',
					'Production Scaling'
				]
			}
		]
	},
	{
		id: 'cybersecurity',
		title: 'Cybersecurity Analyst',
		vendors: 'CompTIA · ISC2 · Cisco',
		summary: 'Develop hands-on defense skills across cloud, identity, and incident response.',
		level: 'Beginner to Professional',
		duration: '3-5 months',
		description: 'Build comprehensive cybersecurity skills from threat detection to incident response and compliance.',
		skills: ['Threat Detection', 'Incident Response', 'Network Security', 'Compliance', 'Risk Management'],
		phases: [
			{
				title: 'Security Fundamentals Phase',
				duration: '3-4 weeks',
				description: 'Learn core security concepts and basic defensive techniques.',
				certifications: [
					{ name: 'CompTIA Security+', slug: 'comptia-security', level: 'Beginner' },
					{ name: 'Google Cybersecurity Professional Certificate', slug: 'google-cybersecurity-professional-certificate', level: 'Beginner' }
				],
				modules: [
					'Security Principles',
					'Network Security Basics',
					'Cryptography Fundamentals',
					'Risk Management',
					'Security Policies',
					'Basic Ethical Hacking'
				]
			},
			{
				title: 'Defensive Security Phase',
				duration: '4-6 weeks',
				description: 'Master defensive security tools and techniques.',
				certifications: [
					{ name: 'CompTIA CySA+', slug: 'comptia-cysa', level: 'Intermediate' },
					{ name: 'Certified Ethical Hacker (CEH)', slug: 'certified-ethical-hacker-ceh', level: 'Intermediate' }
				],
				modules: [
					'Vulnerability Assessment',
					'Intrusion Detection',
					'Firewall Management',
					'Endpoint Protection',
					'Security Information and Event Management (SIEM)',
					'Digital Forensics'
				]
			},
			{
				title: 'Incident Response Phase',
				duration: '3-4 weeks',
				description: 'Learn to respond to and recover from security incidents.',
				certifications: [
					{ name: 'Certified Information Systems Security Professional (CISSP)', slug: 'certified-information-systems-security-professional-cissp', level: 'Advanced' },
					{ name: 'GIAC Certified Incident Handler (GCIH)', slug: 'giac-certified-incident-handler-gcih', level: 'Advanced' }
				],
				modules: [
					'Incident Response Planning',
					'Threat Hunting',
					'Malware Analysis',
					'Business Continuity',
					'Disaster Recovery',
					'Legal and Compliance Issues'
				]
			},
			{
				title: 'Advanced Security Phase',
				duration: '4-6 weeks',
				description: 'Master advanced security concepts and leadership skills.',
				certifications: [
					{ name: 'Certified Information Security Manager (CISM)', slug: 'certified-information-security-manager-cism', level: 'Expert' },
					{ name: 'Certified Information Systems Auditor (CISA)', slug: 'certified-information-systems-auditor-cisa', level: 'Expert' }
				],
				modules: [
					'Security Architecture',
					'Cloud Security',
					'Zero Trust Architecture',
					'Security Program Management',
					'Risk Assessment',
					'Security Leadership'
				]
			}
		]
	},
	{
		id: 'devops',
		title: 'DevOps & Platform Engineer',
		vendors: 'AWS · Azure · CNCF',
		summary: 'Ship resilient services with CI/CD, Kubernetes, and observability best practices.',
		level: 'Intermediate to Advanced',
		duration: '4-6 months',
		description: 'Master modern software delivery practices, container orchestration, and platform engineering.',
		skills: ['CI/CD', 'Container Orchestration', 'Infrastructure as Code', 'Monitoring', 'Site Reliability Engineering'],
		phases: [
			{
				title: 'Development & Version Control Phase',
				duration: '2-3 weeks',
				description: 'Master development workflows and version control.',
				certifications: [
					{ name: 'AWS Certified Developer - Associate', slug: 'aws-certified-developer-associate', level: 'Intermediate' }
				],
				modules: [
					'Git and GitHub',
					'Branching Strategies',
					'Code Review Process',
					'Basic Scripting',
					'Development Environments',
					'Testing Fundamentals'
				]
			},
			{
				title: 'CI/CD & Automation Phase',
				duration: '4-6 weeks',
				description: 'Build automated deployment pipelines.',
				certifications: [
					{ name: 'AWS Certified DevOps Engineer - Professional', slug: 'aws-certified-devops-engineer-professional', level: 'Advanced' },
					{ name: 'Microsoft Certified: Azure DevOps Engineer Expert', slug: 'microsoft-certified-azure-devops-engineer-expert', level: 'Advanced' }
				],
				modules: [
					'Continuous Integration',
					'Continuous Deployment',
					'Pipeline Automation',
					'Configuration Management',
					'Infrastructure as Code',
					'Testing Automation'
				]
			},
			{
				title: 'Container & Orchestration Phase',
				duration: '4-6 weeks',
				description: 'Master container technologies and orchestration.',
				certifications: [
					{ name: 'Certified Kubernetes Administrator (CKA)', slug: 'certified-kubernetes-administrator-cka', level: 'Intermediate' },
					{ name: 'Docker Certified Associate', slug: 'docker-certified-associate', level: 'Beginner' }
				],
				modules: [
					'Docker Fundamentals',
					'Container Security',
					'Kubernetes Architecture',
					'Pod Management',
					'Service Mesh',
					'Helm Charts'
				]
			},
			{
				title: 'Observability & SRE Phase',
				duration: '4-6 weeks',
				description: 'Implement monitoring, logging, and reliability practices.',
				certifications: [
					{ name: 'Google Cloud Professional Cloud DevOps Engineer', slug: 'google-cloud-professional-cloud-devops-engineer', level: 'Advanced' }
				],
				modules: [
					'Monitoring and Alerting',
					'Logging and Tracing',
					'Performance Optimization',
					'Site Reliability Engineering',
					'Chaos Engineering',
					'Incident Management'
				]
			}
		]
	}
];

export const load: PageServerLoad = async ({ params }) => {
	const roadmap = roadmaps.find(r => r.id === params.slug);

	if (!roadmap) {
		throw new Error('Roadmap not found');
	}

	return {
		roadmap
	};
};