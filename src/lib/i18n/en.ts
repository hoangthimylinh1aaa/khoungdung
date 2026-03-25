import carTemplate from '$lib/assets/templates/car.png';
import spaTemplate from '$lib/assets/templates/spa.png';
import restaurantTemplate from '$lib/assets/templates/restaurant.png';
import landTemplate from '$lib/assets/templates/land.png';
import plantTemplate from '$lib/assets/templates/plant.png';
import carWashTemplate from '$lib/assets/templates/carWash.png';
import autoPartEcomTemplate from '$lib/assets/templates/autoPartEcom.png';
import spaEcomTemplate from '$lib/assets/templates/spaEcom.png';
import dentisEcomTemplate from '$lib/assets/templates/dentisEcom.png';

export const en = {
	templates: {
		preview_label: 'Preview',
		device_mobile: 'Mobile',
		device_tablet: 'Tablet',
		device_desktop: 'Desktop',
		use_template: 'Use this template',
		colorCustomizer: {
			title: 'Customize Colors',
			primary: 'Primary Color',
			instructions: 'instructions',
			secondary: 'Secondary Color',
			reset: 'Reset to Default',
			primary_help: 'Choose the primary color for the logo, buttons, and highlights',
			secondary_help: 'Choose the secondary color for backgrounds and supporting elements',
			live_preview: 'Preview instantly on the left',
			use_template: 'Use this template'
		}
	},
	nav: {
		home: 'Home',
		products: 'Products',
		consulting: 'Consulting & Quote',
		news: 'News',
		customers: 'Customers',
		about: 'About',
		login: 'Login',
		register: 'Free consultation',
		cta: 'Get Started'
	},
	hero: {
		badge: '🚀 Next-gen technology platform',
		title_1: 'Comprehensive',
		title_2: 'digital solutions',
		title_3: 'for business',
		subtitle:
			'Kho phần mềm provides an AI-integrated technology ecosystem — from e-commerce platforms to smart beverage ordering and store chain management.',
		cta_primary: 'Explore Now',
		cta_secondary: 'View Demo',
		stats: {
			clients: 'Clients',
			transactions: 'Transactions/day',
			uptime: 'Uptime',
			support: 'Support'
		}
	},
	products: {
		title: 'Featured',
		title_highlight: 'products',
		subtitle: 'A comprehensive product ecosystem designed to optimize business operations',
		examples_label: 'Example use-cases',
		// 1) Website design for businesses — industry-specific sites like car dealers, spas, restaurants
		ecommerce: {
			name: 'Business Website Design',
			tag: 'Website design',
			desc: 'Custom website design for businesses: responsive marketing sites, booking & appointment systems, service catalogs, and lead capture tailored to your industry (car dealers, spas, restaurants).',
			features: [
				'Responsive design & SEO',
				'Online booking & forms',
				'Industry-tailored templates',
				'Lead capture & analytics'
			],
			examples: [
				{ id: 'car_dealer', title: 'Car dealer website', image: carTemplate },
				{ id: 'spa', title: 'Spa & salon website', image: spaTemplate },
				{ id: 'restaurant', title: 'Restaurant & booking site', image: restaurantTemplate },
				{ id: 'land', title: 'Real estate', image: landTemplate },
				{ id: 'plants', title: 'Medicinal plants', image: plantTemplate },
				{ id: 'car_wash', title: 'Car wash', image: carWashTemplate }
			]
		},

		// 2) Ecommerce solutions — vertical ecommerce by industry
		beverage: {
			name: 'Ecommerce Solutions',
			tag: 'Ecommerce',
			desc: 'Turnkey ecommerce platforms optimized by industry — product catalogs, payments, shipping, and merchandising for vertical marketplaces (auto parts, beauty & spa products, dental supplies).',
			features: [
				'Industry-specific catalogs',
				'Integrated payments & shipping',
				'Promotions & merchandising',
				'Inventory sync & reporting'
			],
			examples: [
				{ id: 'auto_parts', title: 'Automotive parts ecommerce', image: autoPartEcomTemplate },
				{ id: 'beauty_ecom', title: 'Beauty & spa ecommerce', image: spaEcomTemplate },
				{ id: 'dental_ecom', title: 'Dental equipment ecommerce', image: dentisEcomTemplate }
			]
		},

		// 3) Digitalization — HRM, CRM, ERP for business operations
		hrm: {
			name: 'Business Digitalization',
			tag: 'Digitalization',
			desc: 'Digitize core business operations — HRM for people, CRM for customers, and ERP for accounting and inventory to reduce manual work and enable growth.',
			features: [
				'HRM & attendance',
				'CRM & customer lifecycle',
				'ERP for finance & inventory',
				'Process automation'
			],
			examples: [
				{ id: 'hrm_solution', title: 'HR management (attendance, payroll)' },
				{ id: 'crm_solution', title: 'CRM (sales & customer care)' },
				{ id: 'erp_solution', title: 'ERP (finance & inventory)' }
			]
		},

		// 4) AI applications — applied AI to improve operations and UX
		chain: {
			name: 'AI Applications',
			tag: 'AI',
			desc: 'Applied AI solutions across products — from personalized recommendations and chatbots to demand forecasting and intelligent process automation.',
			features: [
				'Personalization',
				'Demand forecasting',
				'Conversational chatbots',
				'Process automation'
			],
			examples: [
				{ id: 'demand_forecast', title: 'Demand forecasting' },
				{ id: 'personalization', title: 'Personalized recommendations' },
				{ id: 'chatbot', title: 'Conversational chatbot' }
			]
		}
	},
	ai: {
		badge: 'AI-Powered',
		title: 'Artificial Intelligence',
		title_2: 'in every product',
		subtitle:
			'Not just software — we integrate AI into the core of each platform to predict, automate, and optimize processes.',
		features: {
			predict: {
				title: 'Trend Prediction',
				desc: 'Analyze historical data to forecast demand, inventory, and market trends.'
			},
			automate: {
				title: 'Process Automation',
				desc: 'AI automatically processes orders, assigns staff, and optimizes work schedules.'
			},
			personalize: {
				title: 'Experience Personalization',
				desc: 'Personalized product suggestions, offers, and content for each customer.'
			},
			insight: {
				title: 'Real-time Insights',
				desc: 'AI dashboard provides deep insights into business operations in real-time.'
			}
		}
	},
	stats: {
		title: 'Numbers',
		title_2: 'speak for themselves',
		items: {
			clients: { value: '500+', label: 'Businesses trust us' },
			transactions: { value: '2M+', label: 'Daily transactions' },
			uptime: { value: '99.9%', label: 'Guaranteed uptime' },
			cities: { value: '20+', label: 'Cities deployed' }
		}
	},
	testimonials: {
		title: 'What our',
		title_2: 'clients say',
		items: [
			{
				name: 'Nguyen Minh Tuan',
				role: 'CEO, Bloom Coffee Chain',
				content:
					'KD Café completely changed how we operate. Revenue increased 35% in just 3 months.',
				avatar: 'NMT'
			},
			{
				name: 'Tran Thi Lan Anh',
				role: 'COO, FastMart Vietnam',
				content:
					'KD Commerce helps us manage over 10,000 SKUs effortlessly. The AI recommendations are amazing!',
				avatar: 'TLA'
			},
			{
				name: 'Le Hoang Nam',
				role: 'HR Director, TechGroup JSC',
				content:
					'KD HRM saves us 20 hours/week in HR management. The AI attendance feature is extremely accurate.',
				avatar: 'LHN'
			}
		]
	},
	service: {
		hero_title: 'Professional',
		hero_title_2: 'services',
		hero_subtitle:
			'From consulting and deployment to operations — we accompany businesses throughout their digital transformation journey.',
		list_title: 'Our Services',
		items: [
			{
				icon: '🛒',
				name: 'E-commerce Deployment',
				desc: 'Build end-to-end e-commerce platforms with multi-channel integration and conversion optimization.',
				tags: ['B2B', 'B2C', 'Multi-channel']
			},
			{
				icon: '☕',
				name: 'F&B Solutions',
				desc: 'POS system, QR ordering, kitchen management, and revenue analytics for F&B chains.',
				tags: ['Coffee', 'Restaurant', 'Chain']
			},
			{
				icon: '👥',
				name: 'HRM System',
				desc: 'Manage the full employee lifecycle — recruitment, training, evaluation, and retention.',
				tags: ['HR', 'KPI', 'Payroll']
			},
			{
				icon: '🏪',
				name: 'Chain Management',
				desc: 'Centralized multi-branch management platform with real-time reporting.',
				tags: ['Store chain', 'Inventory', 'Reports']
			},
			{
				icon: '🤖',
				name: 'AI Integration',
				desc: 'Integrate AI/ML into existing systems — from chatbots to demand forecasting.',
				tags: ['AI', 'ML', 'Automation']
			},
			{
				icon: '📊',
				name: 'Business Intelligence',
				desc: 'Advanced data analytics dashboards for data-driven decision making.',
				tags: ['Dashboard', 'Analytics', 'Reports']
			}
		],
		cta_title: 'Ready to get started?',
		cta_subtitle: 'Let us advise the best solution for your business.',
		cta_btn: 'Get free consultation'
	},
	contact: {
		hero_title: 'Contact',
		hero_title_2: 'us',
		hero_subtitle: 'Our team of experts is ready to support you 24/7.',
		form: {
			title: 'Send a message',
			name: 'Full name',
			name_placeholder: 'John Doe',
			email: 'Email',
			email_placeholder: 'example@company.com',
			phone: 'Phone number',
			phone_placeholder: '+84 901 234 567',
			company: 'Company name',
			company_placeholder: 'ABC Company',
			service: 'Service of interest',
			service_placeholder: 'Select a service...',
			message: 'Message',
			message_placeholder: 'Describe your needs...',
			submit: 'Send message',
			submitting: 'Sending...',
			success: '✅ Message sent! We will contact you within 24h.',
			services: [
				'KD Commerce',
				'KD Café',
				'KD HRM',
				'KD Chain',
				'AI Integration',
				'Other consulting'
			]
		},
		info: {
			title: 'Contact information',
			address: 'Address',
			address_value: '123 Nguyen Hue, District 1, Ho Chi Minh City',
			phone: 'Phone',
			phone_value: '+84 901 234 567',
			email: 'Email',
			email_value: 'hello@khoangdung.vn',
			hours: 'Business hours',
			hours_value: 'Mon - Fri: 8:00 - 18:00'
		}
	},
	footer: {
		tagline: 'Next-gen technology platform for Vietnamese businesses.',
		products: 'Products',
		company: 'Company',
		legal: 'Legal',
		about: 'About us',
		blog: 'Blog',
		careers: 'Careers',
		privacy: 'Privacy policy',
		terms: 'Terms of service',
		copyright: '© 2026 Kho phần mềm. All rights reserved.',
		made_in: 'Made with ❤️ in Vietnam'
	},
	productsPage: {
		hero_title: 'Our',
		hero_title_2: 'Products',
		hero_subtitle: 'A comprehensive AI-integrated technology ecosystem for Vietnamese businesses.',
		cta: 'Get in touch',
		dataSupport: {
			title: 'Data migration & import support',
			subtitle:
				'We support importing data from multiple sources: products, customers, orders and transaction history — securely and accurately.',
			bullets: [
				'Import SKUs & product categories',
				'Migrate customers & order history',
				'CSV/Excel integration',
				'Data validation & security'
			],
			button: 'Request support',
			learn_more: 'Learn more',
			learn_more_href: '/docs/data-migration'
		},
		networkInstall: {
			title: 'Network installation & setup',
			subtitle:
				'Onsite and remote network installation for stores and offices: POS connectivity, Wi‑Fi, CCTV and local infrastructure setup. Fast, secure, and tested.',
			bullets: [
				'POS & device connectivity',
				'Wi‑Fi setup and optimization',
				'CCTV & security network wiring',
				'Onsite commissioning & testing'
			],
			button: 'Request installation',
			learn_more: 'Learn more',
			learn_more_href: '/docs/network-install'
		},
		computerParts: {
			title: 'Computer parts marketplace',
			subtitle:
				'Buy reliable computer parts from curated vendors: CPUs, GPUs, motherboards, RAM, and storage — compatibility checked.',
			items: [
				{
					id: 'cpu_ryzen7',
					title: 'AMD Ryzen 7 7800X',
					price: '$329',
					desc: '8-core desktop CPU, great single-threaded and multi-threaded performance.'
				},
				{
					id: 'intel_i7',
					title: 'Intel Core i7-13700K',
					price: '$399',
					desc: 'High-performance CPU for gaming and productivity.'
				},
				{
					id: 'gpu_rtx4070',
					title: 'NVIDIA RTX 4070',
					price: '$599',
					desc: 'Powerful GPU for 1440p gaming and content creation.'
				},
				{
					id: 'ram_32gb',
					title: '16GB DDR5 RAM (2x8GB)',
					price: '$129',
					desc: 'Fast DDR5 memory for modern platforms.'
				},
				{
					id: 'ssd_1tb',
					title: '1TB NVMe SSD',
					price: '$119',
					desc: 'High-speed storage with excellent endurance.'
				}
			],
			button: 'Buy now',
			learn_more: 'View product',
			learn_more_href: '/products/computer-parts'
		}
	},
	dataSupport: {
		title: 'Data migration & import support',
		subtitle:
			'We help import data from multiple systems: products, customers, orders and transactional history — securely and accurately.',
		bullets: [
			'Import SKUs & product categories',
			'Migrate customers & order history',
			'CSV/Excel integration',
			'Data validation & security'
		],
		button: 'Request support',
		learn_more: 'Learn more',
		learn_more_href: '/docs/data-migration'
	},
	consultingPage: {
		hero_title: 'Consulting &',
		hero_title_2: 'Quote',
		hero_subtitle:
			'Get expert consulting and a detailed quote for the solution that fits your business.',
		step1_title: 'Discuss Your Needs',
		step1_desc: 'We listen and analyze your specific business requirements.',
		step2_title: 'Propose a Solution',
		step2_desc: 'Our experts build the optimal solution and provide a transparent quote.',
		step3_title: 'Deploy & Support',
		step3_desc: 'Fast deployment with 24/7 support throughout the entire process.',
		cta: 'Get a Quote Now'
	},
	newsPage: {
		hero_title: 'News &',
		hero_title_2: 'Updates',
		hero_subtitle:
			'Stay up to date with the latest news about technology, products and Kho phần mềm activities.',
		read_more: 'Read more',
		badge_new: 'New',
		badge_update: 'Update',
		badge_event: 'Event'
	},
	customersPage: {
		hero_title: 'Trusted',
		hero_title_2: 'Customers',
		hero_subtitle: 'Over 500 Vietnamese businesses trust the Kho phần mềm ecosystem.',
		trusted_by: 'Trusted by'
	},
	aboutPage: {
		hero_title: 'About',
		hero_title_2: 'Kho phần mềm',
		hero_subtitle:
			'We are a young technology team passionate about building digital platforms to help Vietnamese businesses grow sustainably.',
		mission_title: 'Mission',
		mission_desc:
			'Provide an AI-integrated technology ecosystem that makes digital transformation easy and drives growth for every Vietnamese business.',
		vision_title: 'Vision',
		vision_desc: 'Become the #1 technology platform for Vietnamese businesses by 2030.',
		values_title: 'Core Values',
		team_title: 'Team',
		team_subtitle: 'The talented people behind Kho phần mềm.'
	},
	loginPage: {
		title: 'Login',
		subtitle: 'Welcome back! Log in to continue.',
		email: 'Email',
		email_placeholder: 'example@company.com',
		password: 'Password',
		password_placeholder: '••••••••',
		forgot: 'Forgot password?',
		submit: 'Login',
		no_account: "Don't have an account?",
		register_link: 'Register for free trial'
	},
	registerPage: {
		left_title_1: 'Get free ',
		left_title_highlight: 'consulting & demo',
		left_title_2: '',
		left_title_3: 'from KPM experts',
		left_subtitle:
			'Base provides a deeply customizable platform, easy to deploy, and tailored to the specific needs of each industry',
		left_feature_1: 'Applications designed to fit your exact business needs',
		left_feature_2: 'Management solution consulting by industry & scale',
		left_feature_3: 'Answer all questions about deployment and usage',
		left_partners_label: '11,000+ PARTNER BUSINESSES',
		left_help: 'Need help, ',
		left_help_link: 'Contact us',
		left_help_suffix: ' now.',
		name: 'Full name',
		name_placeholder: 'Enter your name',
		product: 'Product of interest',
		product_placeholder: 'Select a product',
		product_options: [
			'KD Commerce',
			'KD Café',
			'KD HRM',
			'KD Chain',
			'AI Integration',
			'Other consulting'
		],
		email: 'Email',
		email_placeholder: 'Enter your email',
		phone: 'Phone number',
		phone_placeholder: 'Enter your phone number',
		job_position: 'Job position',
		job_position_placeholder: 'Select your job position',
		job_position_options: ['CEO/Director', 'Manager', 'Staff', 'Other'],
		company: 'Company name',
		company_placeholder: 'Enter your company name',
		province: 'Province/City',
		province_placeholder: 'Select your region',
		province_options: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Other provinces'],
		headcount: 'Company size',
		headcount_placeholder: 'Select company size',
		headcount_options: ['1-10', '11-50', '51-200', '201-500', '500+'],
		submit: 'Get solution consulting',
		disclaimer_prefix:
			'By clicking "get solution consulting", I confirm that I have read and agree to the ',
		disclaimer_link: 'Privacy Policy',
		disclaimer_suffix: ' of Base'
	}
};
