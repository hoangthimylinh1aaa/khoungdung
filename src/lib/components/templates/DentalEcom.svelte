<script lang="ts">
	import {
		Monitor,
		Smartphone,
		Tablet,
		Palette,
		X,
		Search,
		ShoppingCart,
		ChevronDown,
		Heart,
		User,
		Phone,
		Download,
		Package,
		Star,
		MapPin,
		Truck
	} from '@lucide/svelte';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';

	let locale: Locale = 'vi';
	$: locale = $localeStore;
	$: t = translations[locale].templates.colorCustomizer;

	export let primaryColor: string = '#f59e0b';
	export let secondaryColor: string = '#F5F9FF';

	let selectedPrimary = primaryColor;
	let selectedSecondary = secondaryColor;

	// Responsive state management
	let deviceView: 'mobile' | 'tablet' | 'desktop' = 'desktop';
	let isMobileLayout = false;
	let showColorPanel = false;
	let windowWidth = 0;

	// Breakpoints
	const breakpoints = {
		mobile: 640,
		tablet: 1024,
		desktop: 1280
	};

	// Device detection function
	function getDeviceView(width: number): 'mobile' | 'tablet' | 'desktop' {
		if (width < breakpoints.mobile) return 'mobile';
		if (width < breakpoints.tablet) return 'tablet';
		return 'desktop';
	}

	// Color constants
	$: accentRed = '#E53E3E';
	$: accentOrange = '#DD6B20';
	$: accentYellow = '#D69E2E';
	$: borderSoft = '#E5E7EB';

	const topbarLinks = ['Giới thiệu', 'Hỗ Trợ', 'Đăng Nhập', 'Đăng Ký'];

	const navLinks = [
		{ label: 'Danh mục', hasDropdown: true },
		{ label: 'ƯU ĐÃI', highlight: true },
		{ label: 'Dịch vụ', hasDropdown: true },
		{ label: 'Kiến thức nha khoa' },
		{ label: 'Thương hiệu' },
		{ label: 'Sự kiện' }
	];

	const promoLinks = [
		{ icon: '🛒', label: 'Vì sao chọn Brandson', sub: '' },
		{ icon: '⚡', label: 'FLASH SALE', sub: 'Deal Hot Giờ Vàng', badge: 'HOT' },
		{ icon: '🎟️', label: 'VOUCHER', sub: 'Voucher' },
		{ icon: '👑', label: 'Khách Hàng Thân Thiết', sub: '' },
		{ icon: '🏷️', label: 'Mã Giảm Giá', sub: '' },
		{ icon: '🌍', label: 'ĐẶC BIỆT', sub: 'Hàng Quốc Tế' }
	];

	const categories = [
		{ id: 1, name: 'Máy nội nha', icon: '🦷', color: '#EBF8FF' },
		{ id: 2, name: 'Ghế khám', icon: '💺', color: '#FFF7ED' },
		{ id: 3, name: 'X-Quang', icon: '📷', color: '#FEF2F2' },
		{ id: 4, name: 'Dụng cụ', icon: '🔧', color: '#ECFDF5' },
		{ id: 5, name: 'Vật liệu', icon: '🧪', color: '#FAF5FF' },
		{ id: 6, name: 'Máy cắt', icon: '⚙️', color: '#F0FDF4' },
		{ id: 7, name: 'Vệ sinh', icon: '🧼', color: '#EEF2FF' },
		{ id: 8, name: 'Phụ kiện', icon: '🔩', color: '#FFFBEB' }
	];

	type FlashSaleItem = {
		id: number;
		name: string;
		price: string;
		oldPrice?: string;
		image: string;
		discount?: number;
		sold: number;
		total: number;
		href?: string;
	};

	const flashSaleSection = {
		title: 'flasale01',
		subtitle: 'chương trình giảm giá giờ chót',
		timerLabel: 'KẾT THÚC SAU',
		timerValue: '4421:01:39',
		buttonText: 'Xem tất cả Flash Sale'
	};

	const flashSaleItems: FlashSaleItem[] = [
		{
			id: 1,
			name: 'Vật liệu trám răng và phục hình 3',
			price: '700.000 đ',
			oldPrice: '0',
			image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=80',
			discount: 3,
			sold: 0,
			total: 400
		},
		{
			id: 2,
			name: 'Vật liệu trám răng và phục hình 1',
			price: '679.000 đ',
			oldPrice: '0',
			image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=900&q=80',
			discount: 15,
			sold: 0,
			total: 2
		},
		{
			id: 3,
			name: 'Vật liệu trám răng và phục hình 6',
			price: '569.000 đ',
			oldPrice: '0',
			image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=80',
			sold: 0,
			total: 2
		},
		{
			id: 4,
			name: 'Vật liệu trám răng và phục hình 5',
			price: '690.000 đ',
			oldPrice: '0',
			image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=80',
			sold: 0,
			total: 2
		},
		{
			id: 5,
			name: 'Vật liệu trám răng và phục hình 1',
			price: '500.000 đ',
			oldPrice: '0',
			image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=900&q=80',
			discount: 10,
			sold: 0,
			total: 100
		},
		{
			id: 6,
			name: 'Vật liệu trám răng và phục hình và...',
			price: '1 đ',
			oldPrice: '0',
			image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&q=80',
			sold: 0,
			total: 1
		}
	];

	const products = [
		{
			id: 1,
			name: 'Máy nội nha Endo Motor X1 Pro',
			price: '45.000.000',
			originalPrice: '52.000.000',
			image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
			rating: 4.9,
			reviews: 127,
			sold: 340,
			location: 'Hà Nội',
			freeShip: true
		},
		{
			id: 2,
			name: 'Ghế nha khoa điện tử SmartChair S500',
			price: '135.000.000',
			originalPrice: '158.000.000',
			image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
			rating: 5.0,
			reviews: 89,
			sold: 156,
			location: 'TP.HCM',
			freeShip: true
		},
		{
			id: 3,
			name: 'Máy X-Quang kỹ thuật số DentalXray Pro',
			price: '285.000.000',
			originalPrice: '320.000.000',
			image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80',
			rating: 4.8,
			reviews: 56,
			sold: 89,
			location: 'Đà Nẵng',
			freeShip: true
		},
		{
			id: 4,
			name: 'Bộ dụng cụ phẫu thuật nha khoa 42 món',
			price: '18.500.000',
			originalPrice: '23.000.000',
			image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80',
			rating: 4.7,
			reviews: 203,
			sold: 567,
			location: 'Hà Nội',
			freeShip: false
		},
		{
			id: 5,
			name: 'Máy cắt răng tốc độ cao Turbo Cut 3000',
			price: '28.000.000',
			originalPrice: '35.000.000',
			image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80',
			rating: 4.9,
			reviews: 167,
			sold: 423,
			location: 'TP.HCM',
			freeShip: true
		},
		{
			id: 6,
			name: 'Hệ thống hút bụi SuctionMax Pro',
			price: '42.000.000',
			originalPrice: '48.000.000',
			image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80',
			rating: 4.8,
			reviews: 94,
			sold: 234,
			location: 'Hà Nội',
			freeShip: true
		},
		{
			id: 7,
			name: 'Máy trám răng Composite LED LightCure X5',
			price: '12.800.000',
			originalPrice: '16.500.000',
			image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
			rating: 4.9,
			reviews: 245,
			sold: 678,
			location: 'Đà Nẵng',
			freeShip: false
		},
		{
			id: 8,
			name: 'Tủ tiệt trùng UV-C MedSafe Cabinet',
			price: '22.500.000',
			originalPrice: '27.000.000',
			image: 'https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=800&q=80',
			rating: 4.8,
			reviews: 112,
			sold: 298,
			location: 'TP.HCM',
			freeShip: true
		}
	];

	const combos = [
		{
			id: 1,
			name: 'Combo Phòng Khám Cơ Bản',
			items: '5 sản phẩm',
			price: '320.000.000',
			originalPrice: '380.000.000',
			image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
			discount: 16
		},
		{
			id: 2,
			name: 'Combo Nha Khoa Cao Cấp',
			items: '8 sản phẩm',
			price: '650.000.000',
			originalPrice: '750.000.000',
			image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
			discount: 13
		},
		{
			id: 3,
			name: 'Combo Dụng Cụ Chuyên Nghiệp',
			items: '12 sản phẩm',
			price: '45.000.000',
			originalPrice: '55.000.000',
			image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80',
			discount: 18
		}
	];

	const brands = [
		{ name: 'NSK', logo: '🔵' },
		{ name: 'Morita', logo: '🟡' },
		{ name: 'Planmeca', logo: '🟢' },
		{ name: 'Sirona', logo: '🔴' },
		{ name: 'Kavo', logo: '🟣' },
		{ name: 'W&H', logo: '🟠' }
	];

	// Helper functions
	function flashRemain(item: FlashSaleItem) {
		return Math.max(item.total - item.sold, 0);
	}

	function flashProgress(item: FlashSaleItem) {
		if (!item.total) return 0;
		return Math.min((item.sold / item.total) * 100, 100);
	}

	function discountPercent(price: string, original: string) {
		const p = parseFloat(price.replace(/\./g, ''));
		const o = parseFloat(original.replace(/\./g, ''));
		return Math.round(((o - p) / o) * 100);
	}

	function setDevice(device: 'mobile' | 'tablet' | 'desktop') {
		deviceView = device;
	}

	function resetColors() {
		selectedPrimary = '#0056A6';
		selectedSecondary = '#F5F9FF';
	}

	function toggleColorPanel() {
		showColorPanel = !showColorPanel;
	}

	function checkScreenSize() {
		windowWidth = window.innerWidth;
		deviceView = getDeviceView(windowWidth);
		isMobileLayout = windowWidth < breakpoints.tablet;

		// Auto-close color panel on desktop
		if (!isMobileLayout) showColorPanel = false;
	}

	const onNavigateContact = () => goto('/contact');

	// Lifecycle hooks
	onMount(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	});

	// Reactive declarations
	$: primaryColor = selectedPrimary;
	$: secondaryColor = selectedSecondary;

	// Grid column classes based on device
	$: gridColsFlash =
		deviceView === 'mobile'
			? 'grid-cols-1'
			: deviceView === 'tablet'
				? 'grid-cols-3'
				: 'grid-cols-4';

	$: gridColsProducts =
		deviceView === 'mobile'
			? 'grid-cols-1'
			: deviceView === 'tablet'
				? 'grid-cols-3'
				: 'grid-cols-4';

	$: gridColsCombo = deviceView === 'mobile' ? 'grid-cols-1' : 'grid-cols-3';

	$: gridColsCategory =
		deviceView === 'mobile'
			? 'grid-cols-4'
			: deviceView === 'tablet'
				? 'grid-cols-6'
				: 'grid-cols-8';

	$: gridColsFooter =
		deviceView === 'mobile'
			? 'grid-cols-1'
			: deviceView === 'tablet'
				? 'grid-cols-2'
				: 'grid-cols-4';

	$: minHeightBanner =
		deviceView === 'mobile'
			? 'min-h-[200px]'
			: deviceView === 'tablet'
				? 'min-h-[300px]'
				: 'min-h-[450px]';

	$: showBannerSidebar = deviceView !== 'mobile';
	$: showTopbar = deviceView !== 'mobile';
	$: showNav = deviceView !== 'mobile';
	$: showPromo = deviceView !== 'mobile';
	$: showBrands = deviceView !== 'mobile';
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="flex min-h-screen flex-col bg-gray-950 lg:flex-row">
	<!-- Preview Area -->
	<div class="flex-1 overflow-y-auto bg-gray-900 px-4 py-20 lg:px-8 lg:py-24">
		<!-- Device Switcher -->
		<div class="mb-6 flex justify-center">
			<div class="inline-flex items-center gap-1 rounded-xl bg-gray-800 p-1.5 sm:gap-2 sm:p-2">
				<button
					on:click={() => setDevice('mobile')}
					class="flex items-center gap-1 rounded-lg px-2 py-2 transition-all duration-200 sm:gap-2 sm:px-4"
					style="background-color:{deviceView === 'mobile'
						? selectedPrimary
						: 'transparent'};color:{deviceView === 'mobile' ? 'white' : '#9ca3af'}"
					aria-label="Switch to mobile view"
				>
					<Smartphone size={16} />
					<span class="text-xs font-medium sm:text-sm">Mobile</span>
				</button>

				<button
					on:click={() => setDevice('tablet')}
					class="hidden items-center gap-1 rounded-lg px-2 py-2 transition-all duration-200 sm:flex sm:gap-2 sm:px-4"
					style="background-color:{deviceView === 'tablet'
						? selectedPrimary
						: 'transparent'};color:{deviceView === 'tablet' ? 'white' : '#9ca3af'}"
					aria-label="Switch to tablet view"
				>
					<Tablet size={16} />
					<span class="text-xs font-medium sm:text-sm">Tablet</span>
				</button>

				<button
					on:click={() => setDevice('desktop')}
					class="hidden items-center gap-1 rounded-lg px-2 py-2 transition-all duration-200 xl:flex xl:gap-2 xl:px-4"
					style="background-color:{deviceView === 'desktop'
						? selectedPrimary
						: 'transparent'};color:{deviceView === 'desktop' ? 'white' : '#9ca3af'}"
					aria-label="Switch to desktop view"
				>
					<Monitor size={16} />
					<span class="text-xs font-medium sm:text-sm">Desktop</span>
				</button>
			</div>
		</div>

		<!-- Preview Container -->
		<div class="flex justify-center">
			<div
				class="w-full overflow-hidden rounded-[28px] bg-white shadow-2xl transition-all duration-300"
				style="max-width:{deviceView === 'mobile'
					? '375px'
					: deviceView === 'tablet'
						? '768px'
						: '100%'};"
			>
				<div class="min-h-screen overflow-x-hidden" style="background-color:{secondaryColor};">
					<!-- Topbar -->
					{#if showTopbar}
						<div class="border-b border-gray-100 bg-[#374151] px-4 py-2 text-white sm:px-6">
							<div
								class="flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between"
							>
								<div class="flex flex-wrap items-center gap-2 text-white">
									<Phone size={12} />
									<span class="font-medium">Hotline: 0909417188</span>
									<button
										class="flex items-center gap-1.5 text-white transition-colors hover:text-gray-300"
									>
										<Download size={12} />
										<span>Tải ứng dụng</span>
									</button>
									<span class="hidden text-gray-300 sm:inline">|</span>
									<span class="hidden font-medium text-white sm:inline">Kết nối</span>
								</div>

								<div class="flex flex-wrap items-center gap-3 sm:gap-5">
									{#each topbarLinks as link}
										<button class="text-white transition-colors hover:text-gray-300">{link}</button>
									{/each}
								</div>
							</div>
						</div>
					{/if}

					<!-- Main Header -->
					<header class="sticky top-0 z-20 bg-white shadow-md">
						<div
							class="px-4 sm:px-6"
							style="background-color:{selectedPrimary};"
							class:py-3={deviceView === 'mobile'}
							class:py-3.5={deviceView !== 'mobile'}
						>
							<div class="flex items-center gap-2 sm:gap-3 lg:gap-4">
								<!-- Logo -->
								<div class="flex shrink-0 items-center gap-2">
									<div
										class="flex items-center justify-center rounded-xl bg-white px-2 py-1.5 shadow-sm sm:px-3"
									>
										<span
											class="text-sm font-black tracking-tight sm:text-base"
											style="color:{selectedPrimary};"
										>
											BRANDSON
										</span>
									</div>
								</div>

								<!-- Search Bar -->
								<div class="relative flex-1">
									<input
										type="text"
										placeholder={deviceView === 'mobile'
											? 'Tìm kiếm...'
											: 'Tìm thiết bị nha khoa, vật tư y tế...'}
										class="w-full rounded-full border-0 py-2 pr-10 pl-3 text-sm text-gray-800 shadow-sm outline-none sm:py-2.5 sm:pr-12 sm:pl-4"
									/>
									<button
										class="absolute top-1/2 right-1 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white sm:h-9 sm:w-9"
										style="background-color:{selectedPrimary};"
									>
										<Search size={16} />
									</button>
								</div>

								<!-- Cart Button -->
								<button
									class="relative flex shrink-0 flex-col items-center text-white/90 transition-colors hover:text-white"
								>
									<ShoppingCart size={20} />
									<span
										class="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
										style="background-color:{accentRed};"
									>
										5
									</span>
									{#if deviceView !== 'mobile'}
										<span class="mt-0.5 text-[9px] font-medium">Giỏ hàng</span>
									{/if}
								</button>
							</div>

							<!-- Quick Links Row -->
							<div
								class="mt-2 flex items-center justify-center gap-2 overflow-x-auto pt-0.5 pb-2 text-[11px] text-white/95 sm:mt-3 sm:gap-3 sm:pb-0 sm:text-xs"
							>
								<a class="whitespace-nowrap transition-colors hover:text-white hover:underline"
									>Vệ sinh và tiêu hao</a
								>
								<a class="whitespace-nowrap transition-colors hover:text-white hover:underline"
									>Composite nha khoa</a
								>
								<a class="whitespace-nowrap transition-colors hover:text-white hover:underline"
									>Vật liệu trám răng</a
								>
								<a class="whitespace-nowrap transition-colors hover:text-white hover:underline"
									>Nội nha</a
								>
							</div>
						</div>

						<!-- Navigation Bar -->
						{#if showNav}
							<nav class="overflow-x-auto border-b border-gray-100 bg-white">
								<div class="flex items-center gap-4 bg-[#d97807] px-4 sm:gap-6 sm:px-6">
									{#each navLinks as nav}
										<button
											class="flex shrink-0 items-center gap-1 border-b-[3px] border-b-transparent py-3 text-sm font-semibold whitespace-nowrap transition-all hover:border-b-white"
											style="color: white"
										>
											{nav.label}
											{#if nav.hasDropdown}
												<ChevronDown size={14} />
											{/if}
										</button>
									{/each}
								</div>
							</nav>
						{/if}
					</header>

					<!-- Flash Sale Section -->
					<section
						class="mx-3 mt-4 overflow-hidden rounded-xl shadow-[0_18px_40px_rgba(244,99,99,0.18)] sm:mx-4 sm:mt-5 sm:rounded-2xl lg:mx-6 lg:rounded-[28px]"
					>
						<div
							class="relative px-3 pt-4 pb-6 sm:px-4 sm:pt-5 sm:pb-8 lg:px-6 lg:pt-7 lg:pb-12"
							style="
			background:
				radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0) 0 0 / 32px 32px,
				linear-gradient(135deg, #ff7a00 0%, #ff5a2f 28%, #f4435d 68%, #ea4aaa 100%);
		"
						>
							<div
								class="mb-4 flex flex-col gap-3 sm:mb-5 lg:mb-6 lg:flex-row lg:items-start lg:justify-between lg:gap-4"
							>
								<div class="flex flex-wrap items-center gap-3 sm:gap-4">
									<div class="relative shrink-0">
										<div
											class="flex h-16 w-20 items-center justify-center rounded-3xl text-2xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_18px_rgba(0,0,0,0.12)] sm:h-20 sm:w-24 sm:rounded-[20px] sm:text-3xl lg:h-[82px] lg:w-[92px] lg:text-[44px]"
											style="background:linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.18));"
										>
											⚡
										</div>
										<div
											class="absolute -top-2 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#ffd21f] text-base shadow-[0_6px_12px_rgba(0,0,0,0.12)] sm:-top-[10px] sm:-right-[6px] sm:h-8 sm:w-8 sm:text-lg lg:h-[34px] lg:w-[34px] lg:text-[18px]"
										>
											🔥
										</div>
									</div>

									<div class="min-w-0">
										<div class="flex flex-wrap items-center gap-2 sm:gap-3">
											<h2
												class="text-xs leading-none font-black tracking-[-0.04em] text-[#fff7ef] sm:text-xl lg:text-[42px]"
											>
												{flashSaleSection.title}
											</h2>
											<span
												class="inline-flex h-8 items-center justify-center rounded-full bg-[#ffc61e] px-2 text-lg leading-none font-black text-[#8a4300] shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)] sm:h-9 sm:px-3 sm:text-xl lg:h-[38px] lg:px-4 lg:text-[22px]"
											>
												HOT
											</span>
										</div>
										<p
											class="mt-1.5 text-sm font-extrabold text-[#fff3ea] sm:mt-2 sm:text-base lg:mt-2.5 lg:text-[18px]"
										>
											{flashSaleSection.subtitle}
										</p>
									</div>
								</div>

								<div
									class="flex w-full min-w-0 flex-shrink flex-wrap items-center gap-2 self-start rounded-lg border-2 border-[#f7c51d] bg-[#f3f3f3] px-3 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.08)] sm:w-auto sm:gap-3 sm:rounded-xl sm:border-[3px] sm:px-5 sm:py-4 lg:max-w-none lg:gap-4 lg:rounded-[24px] lg:py-[18px]"
								>
									<div
										class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ff861d] text-xl text-white sm:h-14 sm:w-14 sm:text-2xl lg:h-[54px] lg:w-[54px] lg:text-[26px]"
									>
										🕒
									</div>
									<div class="min-w-0">
										<div
											class=" font-extrabold tracking-[0.08em] text-slate-600 sm:text-sm lg:text-[15px]"
											class:text-xs={deviceView === 'mobile'}
											class:text-sm={deviceView === 'tablet'}
										>
											{flashSaleSection.timerLabel}
										</div>
										<div
											class=" font-black tracking-[0.02em] text-[#e65f0e]"
											class:text-xs={deviceView === 'mobile'}
											class:text-sm={deviceView === 'tablet'}
											class:text-2xl={deviceView === 'desktop'}
										>
											{flashSaleSection.timerValue}
										</div>
									</div>
								</div>
							</div>

							<div class="pb-1 sm:pb-2">
								<div class="grid gap-2 sm:gap-3 lg:gap-4 {gridColsFlash}">
									{#each flashSaleItems as item}
										<article
											class="overflow-hidden rounded-lg bg-white shadow-[0_8px_18px_rgba(0,0,0,0.12)] sm:rounded-xl lg:rounded-[14px]"
										>
											<div class="relative h-40 overflow-hidden bg-[#f4f4f4] sm:h-48 lg:h-[235px]">
												<img src={item.image} alt={item.name} class="h-full w-full object-cover" />

												<div
													class="absolute top-2 left-2 rounded-full bg-[#ff6b2c] px-2 py-0.5 text-[11px] font-black text-white shadow sm:top-3 sm:left-3 sm:px-3 sm:py-1 sm:text-[13px]"
												>
													⚡ FLASH
												</div>

												{#if item.discount}
													<div
														class="absolute top-2 right-2 rotate-[8deg] rounded-[8px] bg-[#ff5a5f] px-2 py-0.5 text-xs font-black text-white shadow sm:top-3 sm:right-3 sm:py-1 sm:text-[14px]"
													>
														-{item.discount}%
													</div>
												{/if}
											</div>

											<div
												class="bg-[#5d5d5d]/90 px-2 py-1 text-[11px] font-bold text-white sm:text-[12px]"
											>
												<div class="flex items-center justify-between gap-1">
													<span class="truncate">Đã bán: {item.sold}/{item.total}</span>
													<span class="shrink-0">Còn: {flashRemain(item)}</span>
												</div>
											</div>

											<div class="h-1 bg-[#d8d8d8] sm:h-[7px]">
												<div
													class="h-full bg-[#2fd15f]"
													style={`width:${Math.max(100 - flashProgress(item), 8)}%`}
												></div>
											</div>

											<div class="px-2 py-2 sm:px-3 sm:py-3">
												<h3
													class="line-clamp-2 min-h-10 text-sm leading-5 font-medium text-[#2d2d2d] sm:min-h-12 sm:text-base sm:leading-6 lg:min-h-[48px] lg:text-[18px]"
												>
													{item.name}
												</h3>

												<div class="mt-1 text-xs leading-none text-black sm:text-sm lg:text-[18px]">
													{item.oldPrice ?? '0'}
												</div>

												<div
													class="mt-1 text-sm leading-none font-black text-[#f0670f] sm:mt-2 sm:text-base lg:text-[20px]"
												>
													{item.price}
												</div>

												<button
													class="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ff7a00] to-[#ff4747] text-sm font-extrabold text-white shadow-[0_8px_16px_rgba(255,101,39,0.28)] transition-transform hover:scale-[1.01] sm:mt-3 sm:h-12 sm:rounded-[10px] sm:text-base lg:mt-4 lg:h-[52px] lg:text-[18px]"
												>
													<span>Mua ngay</span>
													<span class="text-base leading-none sm:text-lg lg:text-[22px]">→</span>
												</button>
											</div>
										</article>
									{/each}
								</div>
							</div>

							<div class="mt-4 flex justify-center sm:mt-6 lg:mt-8">
								<button
									class="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#f4f1ef] px-6 text-sm font-black text-[#f0670f] shadow-[0_8px_18px_rgba(0,0,0,0.06)] transition-transform hover:scale-[1.01] sm:h-14 sm:gap-3 sm:rounded-[10px] sm:px-8 sm:text-lg lg:h-[64px] lg:px-10 lg:text-[22px]"
								>
									<span>{flashSaleSection.buttonText}</span>
									<span class="text-lg leading-none sm:text-2xl lg:text-[28px]">→</span>
								</button>
							</div>
						</div>
					</section>

					<!-- Hero Banner -->
					<div class="mx-3 mt-3 sm:mx-4 sm:mt-4 lg:mx-6 lg:mt-4">
						<div
							class="grid gap-2 sm:gap-3 lg:gap-4"
							class:grid-cols-1={deviceView === 'mobile'}
							class:grid-cols-[minmax(0,1fr)_28%]={showBannerSidebar}
						>
							<!-- Main Banner -->
							<div
								class="relative overflow-hidden rounded-lg bg-[#efefef] shadow-md sm:rounded-xl lg:rounded-[22px]"
							>
								<div
									class="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-[#ef4444] via-[#ec4899] to-[#ec4899]"
								></div>

								<!-- Background decorative shapes -->
								<div class="absolute inset-0">
									<div
										class="absolute top-0 left-0 h-full w-[220px] bg-white/25 [clip-path:polygon(0_0,100%_0,38%_100%,0_100%)]"
									></div>
									<div
										class="absolute top-0 left-[8%] h-full w-[34%] rounded-full border-[5px] border-[#c5162e]"
									></div>
									<div
										class="absolute top-[6%] left-[14%] h-[88%] w-[38%] rounded-full bg-[#cf102d]"
									></div>
									<div
										class="absolute top-0 left-[44%] h-full w-[34%] rounded-full bg-white/20"
									></div>
									<div
										class="absolute top-0 left-[56%] h-full w-[24%] rounded-full bg-white/20"
									></div>
									<div
										class="absolute top-0 right-0 h-16 w-36 rounded-bl-[72px] bg-[#be0f28]"
									></div>
									<div
										class="absolute right-4 bottom-3 grid grid-cols-4 gap-2 opacity-20 sm:right-6 sm:bottom-5"
									>
										{#each Array(12) as _, i}
											<span class="h-2 w-2 rounded-full bg-gray-500 sm:h-2.5 sm:w-2.5"></span>
										{/each}
									</div>
								</div>

								<!-- Content -->
								<div class="relative flex h-full {minHeightBanner}">
									<!-- Navigation arrows -->
									<button
										class="absolute top-1/2 left-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-gray-700 shadow-lg sm:left-4 sm:h-12 sm:w-12 sm:text-3xl"
									>
										‹
									</button>

									<button
										class="absolute top-1/2 right-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-gray-700 shadow-lg sm:right-4 sm:h-12 sm:w-12 sm:text-3xl"
									>
										›
									</button>

									<!-- Left visual -->
									<div class="relative w-[58%]" class:hidden={deviceView === 'mobile'}>
										<div
											class="absolute top-[6%] left-[10%] h-[88%] w-[62%] rounded-full border-[10px] border-white/95"
										></div>
										<div
											class="absolute top-[10%] left-[14%] h-[80%] w-[54%] rounded-full bg-[#d3112f] shadow-[inset_0_-20px_40px_rgba(0,0,0,0.15)]"
										></div>

										<div class="absolute top-[14%] left-[18%] h-[60%] w-[44%] opacity-15">
											<div
												class="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_38%,rgba(120,0,20,0.45)_39%,transparent_40%)]"
											></div>
										</div>

										<!-- Implant shapes -->
										<div
											class="absolute top-[48%] left-[16%] h-[95px] w-[220px] rotate-[-28deg] rounded-[80px] bg-gradient-to-b from-[#b8b8b8] via-[#8b8b8b] to-[#d9d9d9] shadow-[0_18px_24px_rgba(0,0,0,0.28)] sm:h-[120px] sm:w-[280px] lg:h-[145px] lg:w-[335px]"
										>
											<div
												class="absolute inset-x-[9%] top-[18%] h-[64%] rounded-[60px] border-y-[8px] border-white/25"
											></div>
											<div
												class="absolute top-[12%] left-[14%] h-[76%] w-[72%] rounded-[60px] border-y-[3px] border-black/10"
											></div>
											<div
												class="absolute bottom-[18%] left-[8%] h-[8px] w-[8px] rounded-full bg-white/30"
											></div>
											<div
												class="absolute bottom-[24%] left-[15%] h-[8px] w-[8px] rounded-full bg-white/30"
											></div>
											<div
												class="absolute bottom-[30%] left-[22%] h-[8px] w-[8px] rounded-full bg-white/30"
											></div>
										</div>

										<div
											class="absolute top-[0%] left-[34%] h-[170px] w-[82px] rounded-t-[26px] rounded-b-[34px] bg-gradient-to-b from-[#d5d5d5] via-[#8e8e8e] to-[#cfcfcf] shadow-[0_16px_24px_rgba(0,0,0,0.22)] sm:h-[230px] sm:w-[108px] lg:h-[330px] lg:w-[132px]"
										>
											<div
												class="absolute inset-x-[10%] top-[8%] h-[8%] rounded-full bg-white/35"
											></div>
											{#each Array(8) as _, i}
												<div
													class="absolute right-[6%] left-[6%] h-[8%] rounded-full border-y border-black/10 bg-black/10"
													style={`top:${18 + i * 9}%`}
												></div>
											{/each}
										</div>

										<!-- Dots -->
										<div class="absolute bottom-[24%] left-[10%] flex gap-3">
											<span class="h-2.5 w-2.5 rounded-full bg-pink-400"></span>
											<span class="h-2.5 w-2.5 rounded-full bg-pink-400"></span>
											<span class="h-2.5 w-2.5 rounded-full bg-pink-400"></span>
										</div>
									</div>

									<!-- Right text -->
									<div
										class="relative z-10 flex flex-1 flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
										class:items-center={deviceView === 'mobile'}
										class:text-center={deviceView === 'mobile'}
										class:items-start={deviceView !== 'mobile'}
										class:text-left={deviceView !== 'mobile'}
										class:lg:pr-16={deviceView !== 'mobile'}
									>
										<div
											class="mb-3 leading-none font-black sm:mb-4"
											class:text-2xl={deviceView === 'mobile'}
											class:text-3xl={deviceView === 'tablet'}
											class:text-[50px]={deviceView === 'desktop'}
										>
											<span class="text-gray-400">implant</span><span class="text-[#ef2f2f]"
												>swiss</span
											>
										</div>

										<div
											class="leading-tight font-black text-[#ef2f2f]"
											class:text-lg={deviceView === 'mobile'}
											class:text-2xl={deviceView === 'tablet'}
											class:text-4xl={deviceView === 'desktop'}
										>
											A commitment to perfection
										</div>

										<div
											class="mt-1 leading-tight text-[#4c4c4c] sm:mt-2"
											class:text-base={deviceView === 'mobile'}
											class:text-xl={deviceView === 'tablet'}
											class:text-3xl={deviceView === 'desktop'}
										>
											is the driving force behind
										</div>

										<div
											class="leading-tight font-bold"
											class:text-base={deviceView === 'mobile'}
											class:text-xl={deviceView === 'tablet'}
											class:text-3xl={deviceView === 'desktop'}
										>
											<span class="text-[#333333]">each </span>
											<span class="text-[#9b9ba0]">implant</span><span class="text-[#ef2f2f]"
												>swiss</span
											>
											<span class="text-[#333333]"> product</span>
										</div>

										<!-- Pager -->
										<div
											class="mt-4 flex items-center gap-3 sm:mt-5 lg:mt-6"
											class:justify-center={deviceView === 'mobile'}
										>
											<span class="h-3 w-3 rounded-full bg-white/95 sm:h-4 sm:w-4"></span>
											<span class="h-3 w-8 rounded-full bg-white/95 sm:h-4 sm:w-10"></span>
										</div>
									</div>
								</div>
							</div>

							<!-- Right Banners -->
							{#if showBannerSidebar}
								<div class="grid grid-rows-2 gap-2 sm:gap-3 lg:gap-4">
									<div
										class="relative overflow-hidden rounded-lg bg-[#e9ecef] shadow-md sm:rounded-xl lg:rounded-[18px]"
									>
										<div
											class="absolute inset-0 bg-gradient-to-r from-[#efefef] via-[#f4f4f4] to-[#0077d8]"
										></div>
										<div
											class="absolute top-0 left-0 h-full w-[38%] bg-[radial-gradient(circle_at_30%_35%,rgba(255,255,255,0.9),rgba(200,200,200,0.65)_38%,transparent_39%)]"
										></div>
										<div
											class="absolute top-0 right-0 h-full w-[55%] bg-[#0070cf] [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]"
										></div>

										<div
											class="relative flex h-full min-h-[150px] items-center justify-between px-3 py-3 sm:min-h-[160px] sm:px-5 sm:py-4"
										>
											<div class="flex h-full items-end gap-2 sm:gap-3">
												<div
													class="h-20 w-12 rounded-full bg-gradient-to-b from-gray-200 to-gray-400 opacity-80 sm:h-24 sm:w-16"
												></div>
												<div
													class="mb-1 h-10 w-10 rounded-full bg-[radial-gradient(circle,#d9b0a0_0,#9c4f4b_60%,#6c3130_100%)] sm:mb-2 sm:h-14 sm:w-14"
												></div>
											</div>

											<div class="flex-1 px-2 sm:px-3">
												<div
													class="mx-auto h-16 w-24 rounded-lg bg-white shadow sm:h-20 sm:w-28 sm:rounded-xl"
												></div>
											</div>

											<div class="flex items-end gap-1.5 sm:gap-2">
												<div class="h-16 w-8 bg-white/95 sm:h-20 sm:w-10"></div>
												<div class="h-12 w-6 bg-white/90 sm:h-16 sm:w-8"></div>
												<div class="h-8 w-10 bg-white/90 sm:h-10 sm:w-14"></div>
											</div>

											<div class="absolute top-6 right-4 text-right sm:top-8 sm:right-6">
												<div
													class="text-sm font-black text-white uppercase sm:text-base lg:text-[20px]"
												>
													XƯƠNG VÀ MÀNG XƯƠNG
												</div>
											</div>
										</div>
									</div>

									<div
										class="relative overflow-hidden rounded-lg bg-[#eef2f6] shadow-md sm:rounded-xl lg:rounded-[18px]"
									>
										<div
											class="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#0f172a] to-[#f5f7fa]"
										></div>
										<div
											class="absolute top-0 right-0 h-full w-[62%] bg-[#ffffff] [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]"
										></div>
										<div
											class="absolute top-0 right-0 h-[44%] w-[62%] bg-[#1192ea] [clip-path:ellipse(85%_100%_at_70%_0%)]"
										></div>

										<div
											class="relative flex h-full min-h-[150px] items-center justify-between px-3 py-3 sm:min-h-[160px] sm:px-5 sm:py-4"
										>
											<div class="flex items-end gap-2 sm:gap-3">
												<div
													class="h-24 w-16 rounded-xl border border-white/20 bg-slate-800 shadow-lg sm:h-28 sm:w-20 sm:rounded-2xl"
												></div>
											</div>

											<div class="flex flex-1 items-end justify-center gap-2 px-2 sm:gap-3">
												<div class="h-12 w-10 rounded-md bg-slate-200 shadow sm:h-16 sm:w-12"></div>
												<div class="h-8 w-16 rounded-md bg-slate-300 shadow sm:h-9 sm:w-20"></div>
											</div>

											<div class="absolute top-8 right-4 text-right sm:top-10 sm:right-6">
												<div
													class="text-sm font-black text-[#0d6dbc] uppercase sm:text-base lg:text-[20px]"
												>
													MÁY CẤM IMPLANT
												</div>
												<div
													class="mt-0.5 text-sm font-black tracking-wide text-slate-700 uppercase sm:mt-1 sm:text-base lg:text-[18px]"
												>
													ÉLEC
												</div>
											</div>
										</div>
									</div>
								</div>
							{/if}
						</div>
					</div>

					<!-- Promo Strip -->
					{#if showPromo}
						<div
							class="mx-6 mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-transparent"
						>
							<div class="flex divide-x divide-gray-100">
								{#each promoLinks as promo}
									<button
										class="group flex flex-1 flex-col items-center gap-1.5 px-3 py-4 text-center transition-all hover:bg-blue-50"
									>
										<span class="text-2xl transition-transform group-hover:scale-110"
											>{promo.icon}</span
										>
										<span class="text-xs leading-tight font-bold text-gray-800">{promo.label}</span>
										{#if promo.sub}
											<span class="text-[10px] font-medium text-gray-500">{promo.sub}</span>
										{/if}
										{#if promo.badge}
											<span
												class="animate-pulse rounded-md px-1.5 py-0.5 text-[9px] font-bold text-white"
												style="background-color:{accentRed};"
											>
												{promo.badge}
											</span>
										{/if}
									</button>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Categories -->
					<section
						class="mx-3 mt-4 rounded-lg bg-white px-3 py-4 shadow-md sm:mx-4 sm:mt-5 sm:rounded-xl sm:px-4 sm:py-5 lg:mx-6 lg:rounded-2xl lg:px-6 lg:py-6"
					>
						<div class="grid gap-2 sm:gap-3 lg:gap-4 {gridColsCategory}">
							{#each categories as cat}
								<button
									class="group flex flex-col items-center gap-1.5 rounded-lg p-2 transition-all hover:-translate-y-1 hover:shadow-lg sm:gap-2 sm:rounded-xl sm:p-2.5 lg:gap-2.5 lg:rounded-2xl lg:p-3"
									style="background-color:{cat.color};"
								>
									<span
										class="text-2xl transition-transform group-hover:scale-110 sm:text-3xl lg:text-4xl"
										>{cat.icon}</span
									>
									<span
										class="text-center text-[9px] leading-tight font-bold text-gray-800 sm:text-[10px] lg:text-xs"
									>
										{cat.name}
									</span>
								</button>
							{/each}
						</div>
					</section>

					<!-- Products -->
					<section
						class="mx-3 mt-4 rounded-lg bg-white shadow-md sm:mx-4 sm:mt-5 sm:rounded-xl lg:mx-6 lg:rounded-2xl"
					>
						<div
							class="flex items-center justify-between border-b border-gray-100 px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-4"
						>
							<h2
								class="text-sm font-black tracking-wide text-gray-800 uppercase sm:text-base lg:text-lg"
							>
								GỢI Ý HÔM NAY
							</h2>
							<button
								class="text-xs font-bold text-black transition-colors hover:underline sm:text-sm"
							>
								Xem tất cả →
							</button>
						</div>

						<div class="px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5">
							<div class="grid gap-2 sm:gap-3 lg:gap-4 {gridColsProducts}">
								{#each products as product}
									<div
										class="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:rounded-xl lg:rounded-2xl"
									>
										<div class="relative overflow-hidden bg-gray-50">
											<img
												src={product.image}
												alt={product.name}
												class="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
											/>

											{#if product.originalPrice}
												<div
													class="absolute top-1 left-1 rounded-md bg-gradient-to-r from-red-500 to-red-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-md sm:top-2 sm:left-2 sm:rounded-lg sm:px-2.5 sm:py-1 sm:text-xs"
												>
													-{discountPercent(product.price, product.originalPrice)}%
												</div>
											{/if}

											{#if product.freeShip}
												<div
													class="absolute bottom-1 left-1 flex items-center gap-0.5 rounded-sm bg-white px-1.5 py-0.5 text-[8px] font-bold shadow-md sm:bottom-2 sm:left-2 sm:gap-1 sm:rounded-md sm:px-2.5 sm:py-1 sm:text-[10px]"
													style="color:{selectedPrimary};"
												>
													<Truck size={12} />
													<span>Freeship</span>
												</div>
											{/if}
										</div>

										<div class="p-2 sm:p-3 lg:p-3.5">
											<p
												class="mb-1 line-clamp-2 text-xs leading-tight font-semibold text-gray-800 sm:mb-2"
											>
												{product.name}
											</p>

											<div class="mb-1 flex items-baseline gap-1 sm:mb-1.5 sm:gap-2">
												<span
													class="text-xs font-black sm:text-sm lg:text-base"
													style="color:{selectedPrimary};"
												>
													₫{product.price}
												</span>
												{#if product.originalPrice}
													<span class="text-[8px] text-gray-400 line-through sm:text-[10px]">
														₫{product.originalPrice}
													</span>
												{/if}
											</div>

											<div
												class="flex items-center gap-1 text-[9px] font-medium text-gray-500 sm:text-[10px]"
											>
												<span class="inline-flex items-center gap-0.5">
													<Star size={10} />
													{product.rating}
												</span>
												<span>|</span>
												<span>Đã bán {product.sold}</span>
											</div>

											<div
												class="mt-1 flex items-center justify-between text-[8px] font-medium text-gray-500 sm:text-[10px]"
											>
												<span class="inline-flex items-center gap-0.5">
													<MapPin size={10} />
													{product.location}
												</span>

												{#if product.reviews > 100}
													<span
														class="rounded-sm bg-red-50 px-1 py-0.5 text-[8px] font-bold text-red-600 sm:rounded-md sm:px-1.5"
													>
														Hot
													</span>
												{/if}
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</section>

					<!-- Combo Section -->
					<section
						class="mx-3 mt-4 rounded-lg bg-white shadow-md sm:mx-4 sm:mt-5 sm:rounded-xl lg:mx-6 lg:rounded-2xl"
					>
						<div
							class="flex items-center justify-between border-b border-gray-100 px-3 py-3 sm:px-4 sm:py-4 lg:px-6"
						>
							<div class="flex items-center gap-2">
								<Package size={16} sm:size={20} style="color:{selectedPrimary};" />
								<h2
									class="text-sm font-black tracking-wide text-gray-800 uppercase sm:text-base lg:text-lg"
								>
									COMBO SẢN PHẨM
								</h2>
							</div>
							<button
								class="text-xs font-bold text-black transition-colors hover:underline sm:text-sm"
							>
								Xem tất cả →
							</button>
						</div>

						<div class="px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5">
							<div class="grid gap-2 sm:gap-3 lg:gap-4 {gridColsCombo}">
								{#each combos as combo}
									<div
										class="group flex overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition-all hover:-translate-y-1 hover:shadow-lg sm:rounded-xl lg:rounded-2xl"
										class:flex-row={deviceView === 'mobile'}
										class:flex-col={deviceView !== 'mobile'}
									>
										<img
											src={combo.image}
											alt={combo.name}
											class="object-cover transition-transform duration-300 group-hover:scale-105"
											class:h-20={deviceView === 'mobile'}
											class:w-20={deviceView === 'mobile'}
											class:h-32={deviceView !== 'mobile'}
											class:w-full={deviceView !== 'mobile'}
										/>

										<div class="flex flex-1 flex-col justify-between p-2 sm:p-3 lg:p-4">
											<div>
												<span
													class="mb-1 inline-block rounded-md px-1.5 py-0.5 text-[8px] font-bold text-white shadow-sm sm:mb-2 sm:px-2 sm:text-[9px]"
													style="background-color:{selectedPrimary};"
												>
													COMBO · {combo.items}
												</span>
												<p class="text-xs leading-tight font-bold text-gray-800 sm:text-sm">
													{combo.name}
												</p>
											</div>

											<div class="mt-2 sm:mt-3">
												<span
													class="text-sm font-black sm:text-base"
													style="color:{selectedPrimary};">₫{combo.price}</span
												>
												<span class="ml-1 text-[8px] text-gray-400 line-through sm:ml-2 sm:text-xs"
													>₫{combo.originalPrice}</span
												>
												<span class="ml-1 text-xs font-bold text-red-600 sm:ml-2"
													>-{combo.discount}%</span
												>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</section>

					<!-- Brands -->
					{#if showBrands}
						<section class="mx-6 mt-5 rounded-2xl bg-white px-6 py-6 shadow-md">
							<h2
								class="mb-5 text-center text-xs font-black tracking-widest text-gray-400 uppercase"
							>
								Thương hiệu đối tác
							</h2>

							<div class="flex items-center justify-around gap-6">
								{#each brands as brand}
									<div
										class="flex flex-col items-center gap-2 opacity-60 transition-all hover:scale-110 hover:opacity-100"
									>
										<span class="text-4xl">{brand.logo}</span>
										<span class="text-xs font-bold text-gray-600">{brand.name}</span>
									</div>
								{/each}
							</div>
						</section>
					{/if}

					<!-- Footer -->
					<footer class="mt-6 bg-gray-800 px-3 py-8 sm:mt-8 sm:px-4 sm:py-10 lg:px-6 lg:py-12">
						<div class="grid gap-6 sm:gap-8 {gridColsFooter}">
							<div>
								<div class="mb-3 flex items-center gap-2 sm:mb-4">
									<div
										class="flex items-center justify-center rounded-lg bg-white px-2 py-1 sm:rounded-xl sm:px-3 sm:py-1.5"
									>
										<span
											class="text-xs font-black sm:text-sm lg:text-base"
											style="color:{selectedPrimary};">BRANDSON</span
										>
									</div>
								</div>
								<p class="text-[10px] leading-relaxed text-gray-400 sm:text-xs">
									Chuyên cung cấp thiết bị nha khoa và y tế chính hãng, chất lượng cao. Đối tác tin
									cậy của các phòng khám và bệnh viện.
								</p>
							</div>

							<div>
								<h3 class="mb-3 text-xs font-bold text-white sm:mb-4 sm:text-sm">Liên kết nhanh</h3>
								<ul class="space-y-1 text-[9px] text-gray-400 sm:space-y-2 sm:text-xs">
									{#each ['Sản phẩm', 'Danh mục', 'Thương hiệu', 'Kiến thức', 'Hướng dẫn', 'Bài viết'] as link}
										<li><button class="transition-colors hover:text-white">{link}</button></li>
									{/each}
								</ul>
							</div>

							<div>
								<h3 class="mb-3 text-xs font-bold text-white sm:mb-4 sm:text-sm">
									Hỗ trợ khách hàng
								</h3>
								<ul class="space-y-1 text-[9px] text-gray-400 sm:space-y-2 sm:text-xs">
									{#each ['Câu hỏi thường gặp', 'Thanh toán', 'Vận chuyển', 'Bảo hành'] as link}
										<li><button class="transition-colors hover:text-white">{link}</button></li>
									{/each}
								</ul>
							</div>

							<div>
								<h3 class="mb-3 text-xs font-bold text-white sm:mb-4 sm:text-sm">Liên hệ</h3>
								<ul class="space-y-1.5 text-[9px] text-gray-400 sm:space-y-2 sm:text-xs">
									<li>📍 123 Đường ABC<br />Hà Nội, Việt Nam</li>
									<li>📞 Hotline: 1900 1234</li>
									<li>📧 info@brandson.vn</li>
								</ul>
							</div>
						</div>

						<div
							class="mt-6 flex flex-col gap-2 border-t border-gray-700 pt-4 sm:mt-8 sm:flex-row sm:justify-between sm:gap-3 sm:pt-6"
						>
							<p class="text-[9px] text-gray-500 sm:text-xs">
								© 2026 BRANDSON. Tất cả quyền được bảo lưu.
							</p>
							<div class="flex gap-3 text-[9px] text-gray-500 sm:gap-5 sm:text-xs">
								<button class="transition-colors hover:text-gray-300">Điều khoản sử dụng</button>
								<button class="transition-colors hover:text-gray-300">Chính sách bảo mật</button>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</div>
	</div>

	<!-- Floating Theme Button -->
	{#if isMobileLayout}
		<button
			on:click={toggleColorPanel}
			class="fixed right-4 bottom-6 z-50 rounded-full p-3 text-white shadow-2xl transition-all duration-300 hover:scale-110 sm:right-6 sm:p-4"
			style="background-color:{selectedPrimary};"
			aria-label="Open theme customizer"
		>
			<Palette size={20} />
		</button>
	{/if}

	<!-- Theme Panel -->
	<div
		class="fixed inset-0 z-[9999] transition-transform duration-300 lg:relative lg:inset-auto lg:z-0 lg:translate-x-0"
		class:translate-x-0={showColorPanel}
		class:-translate-x-full={!showColorPanel && isMobileLayout}
		class:w-full={isMobileLayout}
		class:lg:w-80={!isMobileLayout}
		class:xl:w-96={!isMobileLayout}
	>
		{#if isMobileLayout && showColorPanel}
			<div class="absolute inset-0 bg-black/50 lg:hidden" on:click={toggleColorPanel}></div>
		{/if}

		<div
			class="relative ml-auto h-full max-w-md overflow-y-auto bg-gray-900 px-3 py-6 sm:px-4 sm:py-8 lg:px-6 lg:py-12 xl:px-8 xl:py-24"
		>
			{#if isMobileLayout}
				<button
					on:click={toggleColorPanel}
					class="absolute top-3 right-3 p-2 text-gray-400 transition-colors hover:text-white sm:top-4 sm:right-4 lg:hidden"
				>
					<X size={20} />
				</button>
			{/if}

			<h2
				class="mb-4 text-center text-lg font-bold text-white sm:mb-6 sm:text-xl lg:mb-8 lg:text-2xl"
			>
				🎨 {t.title}
			</h2>

			<div class="space-y-4 sm:space-y-6 lg:space-y-8">
				<!-- Primary Color -->
				<div class="rounded-lg bg-gray-800 p-3 sm:rounded-xl sm:p-4 lg:rounded-xl lg:p-6">
					<label
						for="primary-color"
						class="mb-2 flex items-center justify-between text-xs font-semibold text-gray-200 sm:mb-3 sm:text-sm lg:mb-4 lg:text-base"
					>
						<span>{t.primary}</span>
						<span
							class="h-7 w-7 rounded-lg border-2 border-gray-700 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
							style="background-color:{selectedPrimary};"
						></span>
					</label>

					<input
						type="color"
						id="primary-color"
						bind:value={selectedPrimary}
						class="mb-2 h-9 w-full cursor-pointer rounded-lg border-none sm:mb-3 sm:h-10 lg:h-12"
					/>

					<input
						type="text"
						bind:value={selectedPrimary}
						class="w-full rounded-lg border border-gray-700 bg-gray-900 px-2 py-2 font-mono text-xs text-white sm:px-3 sm:py-3 sm:text-sm lg:px-4 lg:text-base"
						placeholder="#0056A6"
					/>
				</div>

				<!-- Secondary Color -->
				<div class="rounded-lg bg-gray-800 p-3 sm:rounded-xl sm:p-4 lg:rounded-xl lg:p-6">
					<label
						for="secondary-color"
						class="mb-2 flex items-center justify-between text-xs font-semibold text-gray-200 sm:mb-3 sm:text-sm lg:mb-4 lg:text-base"
					>
						<span>{t.secondary}</span>
						<span
							class="h-7 w-7 rounded-lg border-2 border-gray-700 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
							style="background-color:{selectedSecondary};"
						></span>
					</label>

					<input
						type="color"
						id="secondary-color"
						bind:value={selectedSecondary}
						class="mb-2 h-9 w-full cursor-pointer rounded-lg border-none sm:mb-3 sm:h-10 lg:h-12"
					/>

					<input
						type="text"
						bind:value={selectedSecondary}
						class="w-full rounded-lg border border-gray-700 bg-gray-900 px-2 py-2 font-mono text-xs text-white sm:px-3 sm:py-3 sm:text-sm lg:px-4 lg:text-base"
						placeholder="#F5F9FF"
					/>
				</div>
			</div>

			<Button
				on:click={resetColors}
				class="mt-4 flex w-full items-center justify-center text-xs sm:mt-6 sm:text-sm lg:mt-6 lg:text-base"
			>
				🔄 {t.reset}
			</Button>

			<div
				class="mt-4 rounded-lg border-l-4 bg-gray-800 p-3 sm:mt-6 sm:rounded-xl sm:p-4 lg:mt-6 lg:rounded-xl lg:p-6"
				style="border-color:{selectedPrimary};"
			>
				<h3 class="mb-2 text-sm font-bold text-white sm:mb-3 sm:text-base lg:mb-4 lg:text-lg">
					💡 {t.instructions}:
				</h3>
				<ul
					class="space-y-1 text-[10px] leading-relaxed text-gray-400 sm:space-y-1.5 sm:text-xs lg:space-y-2 lg:text-sm"
				>
					<li>• {t.primary_help}</li>
					<li>• {t.secondary_help}</li>
					<li>• {t.live_preview}</li>
				</ul>
			</div>

			<Button
				on:click={onNavigateContact}
				class="mt-4 flex w-full items-center justify-center text-xs sm:mt-6 sm:text-sm lg:mt-6 lg:text-base"
			>
				{t.use_template}
			</Button>
		</div>
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	:global(.overflow-y-auto::-webkit-scrollbar) {
		width: 6px;
	}

	:global(.overflow-y-auto::-webkit-scrollbar-track) {
		background: transparent;
	}

	:global(.overflow-y-auto::-webkit-scrollbar-thumb) {
		background: #4b5563;
		border-radius: 3px;
	}
</style>
