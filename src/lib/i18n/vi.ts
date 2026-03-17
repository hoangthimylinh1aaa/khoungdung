import carTemplate from '$lib/assets/templates/car.png';
import spaTemplate from '$lib/assets/templates/spa.png';
import restaurantTemplate from '$lib/assets/templates/restaurant.png';

export const vi = {
	templates: {
		preview_label: 'Xem trước',
		device_mobile: 'Di động',
		device_tablet: 'Tablet',
		device_desktop: 'Desktop',
		use_template: 'Sử dụng mẫu này'
	},
	nav: {
		home: 'Trang chủ',
		products: 'Sản phẩm',
		consulting: 'Tư vấn & Báo giá',
		news: 'Tin tức',
		customers: 'Khách hàng',
		about: 'Về chúng tôi',
		login: 'Đăng nhập',
		register: 'Dùng thử miễn phí',
		cta: 'Bắt đầu ngay'
	},
	hero: {
		badge: '🚀 Nền tảng công nghệ thế hệ mới',
		title_1: 'Giải pháp số',
		title_2: 'toàn diện cho',
		title_3: 'doanh nghiệp',
		subtitle:
			'Kho phần mềm cung cấp hệ sinh thái công nghệ tích hợp AI — từ sàn thương mại điện tử, quản lý chuỗi cửa hàng đến đặt đồ uống thông minh.',
		cta_primary: 'Khám phá ngay',
		cta_secondary: 'Xem demo',
		stats: {
			clients: 'Khách hàng',
			transactions: 'Giao dịch/ngày',
			uptime: 'Uptime',
			support: 'Hỗ trợ'
		}
	},
	products: {
		title: 'Sản phẩm',
		title_highlight: 'nổi bật',
		subtitle: 'Hệ sinh thái sản phẩm toàn diện được thiết kế để tối ưu hoá vận hành doanh nghiệp',
		examples_label: 'Ví dụ & ứng dụng',
		// 1) Thiết kế website cho doanh nghiệp
		ecommerce: {
			name: 'Thiết kế website cho doanh nghiệp',
			tag: 'Website chuyên nghiệp',
			desc: 'Thiết kế website marketing & dịch vụ cho doanh nghiệp: trang giới thiệu, hệ thống đặt lịch, danh mục dịch vụ và thu lead — tuỳ biến theo ngành như bán xe, spa, nhà hàng.',
			features: [
				'Tương thích di động & SEO',
				'Hệ thống đặt lịch/booking',
				'Mẫu theo ngành nghề',
				'Thu lead & phân tích'
			],
			examples: [
				{ id: 'car_dealer', title: 'Website bán xe', image: carTemplate },
				{ id: 'spa', title: 'Website spa & salon', image: spaTemplate },
				{ id: 'restaurant', title: 'Website nhà hàng & đặt bàn', image: restaurantTemplate }
			]
		},

		// 2) Thiết kế Ecommerce
		beverage: {
			name: 'Thiết kế Ecommerce',
			tag: 'Thương mại điện tử',
			desc: 'Giải pháp cửa hàng trực tuyến tối ưu theo ngành — quản lý danh mục, thanh toán, vận chuyển và trưng bày sản phẩm cho các ngành như phụ tùng ô tô, mỹ phẩm/ spa, thiết bị nha khoa.',
			features: [
				'Danh mục sản phẩm theo ngành',
				'Tích hợp thanh toán & vận chuyển',
				'Khuyến mãi & trưng bày sản phẩm',
				'Đồng bộ tồn kho & báo cáo'
			],
			examples: [
				{ id: 'auto_parts', title: 'Ecommerce phụ tùng ô tô' },
				{ id: 'beauty_ecom', title: 'Ecommerce mỹ phẩm & spa' },
				{ id: 'dental_ecom', title: 'Ecommerce thiết bị nha khoa' }
			]
		},

		// 3) Số hóa doanh nghiệp
		hrm: {
			name: 'Số hóa doanh nghiệp',
			tag: 'Quản lý doanh nghiệp',
			desc: 'Số hóa các quy trình cốt lõi: hệ thống quản lý nhân sự (chấm công, lương), CRM chăm sóc khách hàng và ERP quản lý tài chính, kho hàng — giảm thủ công và tăng hiệu suất.',
			features: [
				'Quản lý nhân sự & chấm công',
				'CRM & chăm sóc khách hàng',
				'ERP tài chính & tồn kho',
				'Tự động hóa quy trình'
			],
			examples: [
				{ id: 'hrm_solution', title: 'HRM: chấm công & lương' },
				{ id: 'crm_solution', title: 'CRM: bán hàng & CSKH' },
				{ id: 'erp_solution', title: 'ERP: tài chính & kho' }
			]
		},

		// 4) Ứng dụng AI
		chain: {
			name: 'Ứng dụng AI',
			tag: 'AI',
			desc: 'Ứng dụng AI thiết thực: gợi ý cá nhân, chatbot hội thoại, dự báo nhu cầu và tự động hoá quy trình — giúp doanh nghiệp tối ưu vận hành và nâng cao trải nghiệm khách hàng.',
			features: [
				'Cá nhân hoá trải nghiệm',
				'Dự báo nhu cầu',
				'Chatbot hội thoại',
				'Tự động hoá quy trình'
			],
			examples: [
				{ id: 'demand_forecast', title: 'Dự báo nhu cầu' },
				{ id: 'personalization', title: 'Gợi ý & cá nhân hoá' },
				{ id: 'chatbot', title: 'Chatbot hỗ trợ khách hàng' }
			]
		}
	},
	ai: {
		badge: 'AI-Powered',
		title: 'Trí tuệ nhân tạo',
		title_2: 'trong từng sản phẩm',
		subtitle:
			'Không chỉ là phần mềm — chúng tôi tích hợp AI vào lõi mỗi nền tảng để dự đoán, tự động hoá và tối ưu hoá quy trình.',
		features: {
			predict: {
				title: 'Dự đoán xu hướng',
				desc: 'Phân tích dữ liệu lịch sử để dự báo nhu cầu, tồn kho và xu hướng thị trường.'
			},
			automate: {
				title: 'Tự động hoá quy trình',
				desc: 'AI tự động xử lý đơn hàng, phân công nhân viên và tối ưu lịch làm việc.'
			},
			personalize: {
				title: 'Cá nhân hoá trải nghiệm',
				desc: 'Gợi ý sản phẩm, ưu đãi và nội dung được cá nhân hoá cho từng khách hàng.'
			},
			insight: {
				title: 'Insight thời gian thực',
				desc: 'Dashboard AI cung cấp cái nhìn sâu sắc về vận hành kinh doanh theo thời gian thực.'
			}
		}
	},
	stats: {
		title: 'Con số',
		title_2: 'nói lên tất cả',
		items: {
			clients: { value: '500+', label: 'Doanh nghiệp tin dùng' },
			transactions: { value: '2M+', label: 'Giao dịch mỗi ngày' },
			uptime: { value: '99.9%', label: 'Uptime đảm bảo' },
			cities: { value: '20+', label: 'Tỉnh thành triển khai' }
		}
	},
	testimonials: {
		title: 'Khách hàng',
		title_2: 'nói gì về chúng tôi',
		items: [
			{
				name: 'Nguyễn Minh Tuấn',
				role: 'CEO, Chuỗi cà phê Bloom',
				content:
					'KD Café đã thay đổi hoàn toàn cách chúng tôi vận hành. Doanh thu tăng 35% chỉ sau 3 tháng sử dụng.',
				avatar: 'NMT'
			},
			{
				name: 'Trần Thị Lan Anh',
				role: 'COO, FastMart Vietnam',
				content:
					'Hệ thống KD Commerce giúp chúng tôi quản lý hơn 10,000 SKU một cách dễ dàng. AI gợi ý sản phẩm thực sự tuyệt vời!',
				avatar: 'TLA'
			},
			{
				name: 'Lê Hoàng Nam',
				role: 'HR Director, TechGroup JSC',
				content:
					'KD HRM tiết kiệm cho chúng tôi 20 giờ/tuần trong công tác quản lý nhân sự. Tính năng chấm công AI cực kỳ chính xác.',
				avatar: 'LHN'
			}
		]
	},
	service: {
		hero_title: 'Dịch vụ',
		hero_title_2: 'chuyên nghiệp',
		hero_subtitle:
			'Từ tư vấn, triển khai đến vận hành — chúng tôi đồng hành cùng doanh nghiệp trong toàn bộ hành trình số hoá.',
		list_title: 'Dịch vụ của chúng tôi',
		items: [
			{
				icon: '🛒',
				name: 'Triển khai TMĐT',
				desc: 'Xây dựng sàn thương mại điện tử từ A-Z, tích hợp đa kênh và tối ưu chuyển đổi.',
				tags: ['B2B', 'B2C', 'Đa kênh']
			},
			{
				icon: '☕',
				name: 'Giải pháp F&B',
				desc: 'Hệ thống POS, đặt hàng QR, quản lý bếp và phân tích doanh thu cho chuỗi F&B.',
				tags: ['Cà phê', 'Nhà hàng', 'Chuỗi']
			},
			{
				icon: '👥',
				name: 'Hệ thống HRM',
				desc: 'Quản lý toàn bộ vòng đời nhân viên — tuyển dụng, đào tạo, đánh giá và giữ chân.',
				tags: ['Nhân sự', 'KPI', 'Bảng lương']
			},
			{
				icon: '🏪',
				name: 'Quản lý chuỗi',
				desc: 'Nền tảng tập trung hoá quản lý đa chi nhánh với báo cáo thời gian thực.',
				tags: ['Chuỗi cửa hàng', 'Tồn kho', 'Báo cáo']
			},
			{
				icon: '🤖',
				name: 'Tích hợp AI',
				desc: 'Tích hợp AI/ML vào hệ thống hiện có — từ chatbot đến dự đoán nhu cầu.',
				tags: ['AI', 'ML', 'Tự động hoá']
			},
			{
				icon: '📊',
				name: 'Business Intelligence',
				desc: 'Dashboard phân tích dữ liệu chuyên sâu, giúp ra quyết định dựa trên dữ liệu.',
				tags: ['Dashboard', 'Analytics', 'Báo cáo']
			}
		],
		cta_title: 'Sẵn sàng bắt đầu?',
		cta_subtitle: 'Hãy để chúng tôi tư vấn giải pháp phù hợp nhất cho doanh nghiệp của bạn.',
		cta_btn: 'Liên hệ tư vấn miễn phí'
	},
	contact: {
		hero_title: 'Liên hệ',
		hero_title_2: 'với chúng tôi',
		hero_subtitle: 'Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn 24/7.',
		form: {
			title: 'Gửi tin nhắn',
			name: 'Họ và tên',
			name_placeholder: 'Nguyễn Văn A',
			email: 'Email',
			email_placeholder: 'example@company.com',
			phone: 'Số điện thoại',
			phone_placeholder: '0901 234 567',
			company: 'Tên công ty',
			company_placeholder: 'Công ty ABC',
			service: 'Dịch vụ quan tâm',
			service_placeholder: 'Chọn dịch vụ...',
			message: 'Tin nhắn',
			message_placeholder: 'Mô tả nhu cầu của bạn...',
			submit: 'Gửi tin nhắn',
			submitting: 'Đang gửi...',
			success: '✅ Tin nhắn đã được gửi! Chúng tôi sẽ liên hệ trong 24h.',
			services: ['KD Commerce', 'KD Café', 'KD HRM', 'KD Chain', 'Tích hợp AI', 'Tư vấn khác']
		},
		info: {
			title: 'Thông tin liên hệ',
			address: 'Địa chỉ',
			address_value: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
			phone: 'Điện thoại',
			phone_value: '+84 901 234 567',
			email: 'Email',
			email_value: 'hello@khoangdung.vn',
			hours: 'Giờ làm việc',
			hours_value: 'Thứ 2 - Thứ 6: 8:00 - 18:00'
		}
	},
	footer: {
		tagline: 'Nền tảng công nghệ thế hệ mới cho doanh nghiệp Việt.',
		products: 'Sản phẩm',
		company: 'Công ty',
		legal: 'Pháp lý',
		about: 'Về chúng tôi',
		blog: 'Blog',
		careers: 'Tuyển dụng',
		privacy: 'Chính sách bảo mật',
		terms: 'Điều khoản sử dụng',
		copyright: '© 2026 Kho phần mềm. All rights reserved.',
		made_in: 'Made with ❤️ in Vietnam'
	},
	productsPage: {
		hero_title: 'Sản phẩm',
		hero_title_2: 'của chúng tôi',
		hero_subtitle: 'Hệ sinh thái công nghệ tích hợp AI toàn diện cho doanh nghiệp Việt Nam.',
		cta: 'Liên hệ tư vấn'
	},
	consultingPage: {
		hero_title: 'Tư vấn &',
		hero_title_2: 'Báo giá',
		hero_subtitle:
			'Nhận tư vấn chuyên sâu và báo giá chi tiết cho giải pháp phù hợp với doanh nghiệp của bạn.',
		step1_title: 'Trao đổi nhu cầu',
		step1_desc: 'Chúng tôi lắng nghe và phân tích nhu cầu cụ thể của doanh nghiệp bạn.',
		step2_title: 'Đề xuất giải pháp',
		step2_desc: 'Đội ngũ chuyên gia xây dựng giải pháp tối ưu và báo giá minh bạch.',
		step3_title: 'Triển khai & Hỗ trợ',
		step3_desc: 'Triển khai nhanh chóng với đội ngũ hỗ trợ 24/7 trong suốt quá trình.',
		cta: 'Nhận báo giá ngay'
	},
	newsPage: {
		hero_title: 'Tin tức &',
		hero_title_2: 'Cập nhật',
		hero_subtitle:
			'Cập nhật những tin tức mới nhất về công nghệ, sản phẩm và hoạt động của Kho phần mềm.',
		read_more: 'Đọc thêm',
		badge_new: 'Mới',
		badge_update: 'Cập nhật',
		badge_event: 'Sự kiện'
	},
	customersPage: {
		hero_title: 'Khách hàng',
		hero_title_2: 'tin dùng',
		hero_subtitle: 'Hơn 500 doanh nghiệp Việt Nam đã tin tưởng sử dụng hệ sinh thái Kho phần mềm.',
		trusted_by: 'Được tin dùng bởi'
	},
	aboutPage: {
		hero_title: 'Về',
		hero_title_2: 'Kho phần mềm',
		hero_subtitle:
			'Chúng tôi là đội ngũ công nghệ trẻ, đam mê xây dựng nền tảng số giúp doanh nghiệp Việt Nam phát triển bền vững.',
		mission_title: 'Sứ mệnh',
		mission_desc:
			'Cung cấp hệ sinh thái công nghệ tích hợp AI, giúp mọi doanh nghiệp Việt Nam dễ dàng chuyển đổi số và tăng trưởng.',
		vision_title: 'Tầm nhìn',
		vision_desc: 'Trở thành nền tảng công nghệ số 1 cho doanh nghiệp Việt Nam vào năm 2030.',
		values_title: 'Giá trị cốt lõi',
		team_title: 'Đội ngũ',
		team_subtitle: 'Những con người tài năng đứng sau Kho phần mềm.'
	},
	loginPage: {
		title: 'Đăng nhập',
		subtitle: 'Chào mừng trở lại! Đăng nhập để tiếp tục.',
		email: 'Email',
		email_placeholder: 'example@company.com',
		password: 'Mật khẩu',
		password_placeholder: '••••••••',
		forgot: 'Quên mật khẩu?',
		submit: 'Đăng nhập',
		no_account: 'Chưa có tài khoản?',
		register_link: 'Đăng ký dùng thử'
	},
	registerPage: {
		left_title_1: 'Nhận ',
		left_title_highlight: 'tư vấn & demo',
		left_title_2: ' miễn phí',
		left_title_3: 'từ chuyên gia của Base',
		left_subtitle:
			'Base cung cấp nền tảng tùy biến sâu, dễ dàng triển khai, và đáp ứng nhu cầu đặc thù của từng lĩnh vực',
		left_feature_1: 'Trải nghiệm ứng dụng thiết kế theo đúng nhu cầu doanh nghiệp',
		left_feature_2: 'Tư vấn giải pháp quản trị theo ngành & quy mô',
		left_feature_3: 'Giải đáp mọi thắc mắc về triển khai và sử dụng',
		left_partners_label: '11,000+ DOANH NGHIỆP ĐỐI TÁC',
		left_help: 'Cần trợ giúp, ',
		left_help_link: 'Liên hệ ngay',
		left_help_suffix: ' với chúng tôi.',
		name: 'Họ và tên',
		name_placeholder: 'Nhập tên của bạn',
		product: 'Sản phẩm bạn quan tâm',
		product_placeholder: 'Lựa chọn sản phẩm',
		product_options: ['KD Commerce', 'KD Café', 'KD HRM', 'KD Chain', 'Tích hợp AI', 'Tư vấn khác'],
		email: 'Email',
		email_placeholder: 'Nhập email của bạn',
		phone: 'Số điện thoại',
		phone_placeholder: 'Nhập số điện thoại của bạn',
		job_position: 'Vị trí công việc',
		job_position_placeholder: 'Lựa chọn vị trí công việc',
		job_position_options: ['CEO/Giám đốc', 'Trưởng phòng', 'Nhân viên', 'Khác'],
		company: 'Tên công ty',
		company_placeholder: 'Nhập tên công ty của bạn',
		province: 'Tỉnh/Thành phố',
		province_placeholder: 'Lựa chọn khu vực',
		province_options: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Các tỉnh khác'],
		headcount: 'Quy mô nhân sự',
		headcount_placeholder: 'Lựa chọn quy mô',
		headcount_options: ['1-10', '11-50', '51-200', '201-500', '500+'],
		submit: 'Nhận tư vấn giải pháp',
		disclaimer_prefix:
			'Bằng cách nhấn "nhận tư vấn giải pháp", tôi xác nhận rằng tôi đã đọc và đồng ý với ',
		disclaimer_link: 'Chính sách quyền riêng tư',
		disclaimer_suffix: ' của Base'
	}
};
