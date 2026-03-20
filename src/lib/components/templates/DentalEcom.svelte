<script lang="ts">
	import { Monitor, Smartphone, Tablet, Palette, X } from '@lucide/svelte';
	import { onMount, onDestroy } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';

	let locale: Locale = 'vi';
	const unsubscribe = localeStore.subscribe((v) => (locale = v));
	onDestroy(unsubscribe);

	$: t = translations[locale].templates.colorCustomizer;

	export let primaryColor: string = '#0EA5E9';
	export let secondaryColor: string = '#F0F9FF';

	let selectedPrimary = primaryColor;
	let selectedSecondary = secondaryColor;

	let deviceView: 'mobile' | 'tablet' | 'desktop' = 'desktop';
	let isMobileLayout = false;
	let showColorPanel = false;

	const deviceWidths = {
		mobile: '375px',
		tablet: '768px',
		desktop: '100%'
	};

	const textPrimary = '#1e293b';
	const textSecondary = '#475569';
	const textMuted = '#64748b';

	const categories = [
		{ id: 1, name: 'Máy nội nha', icon: '🦷', color: '#f0f9ff' },
		{ id: 2, name: 'Ghế khám', icon: '💺', color: '#fef3c7' },
		{ id: 3, name: 'X-Quang', icon: '📷', color: '#fce7f3' },
		{ id: 4, name: 'Dụng cụ', icon: '🔧', color: '#e0f2fe' },
		{ id: 5, name: 'Vật liệu', icon: '🧪', color: '#f3e8ff' },
		{ id: 6, name: 'Máy cắt', icon: '⚙️', color: '#ddd6fe' },
		{ id: 7, name: 'Vệ sinh', icon: '🧼', color: '#e0e7ff' },
		{ id: 8, name: 'Phụ kiện', icon: '🔩', color: '#fef9c3' }
	];

	const flashSale = [
		{
			id: 1,
			name: 'Máy nội nha Endo Motor X1 Pro',
			price: '45.000.000',
			originalPrice: '52.000.000',
			image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
			discount: 13,
			stock: 15,
			sold: 127
		},
		{
			id: 2,
			name: 'Ghế nha khoa SmartChair S500',
			price: '135.000.000',
			originalPrice: '158.000.000',
			image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
			discount: 15,
			stock: 8,
			sold: 89
		},
		{
			id: 3,
			name: 'Máy X-Quang DentalXray Pro',
			price: '285.000.000',
			originalPrice: '320.000.000',
			image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80',
			discount: 11,
			stock: 5,
			sold: 56
		},
		{
			id: 4,
			name: 'Bộ dụng cụ phẫu thuật 42 món',
			price: '18.500.000',
			originalPrice: '23.000.000',
			image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80',
			discount: 20,
			stock: 25,
			sold: 203
		},
		{
			id: 5,
			name: 'Máy cắt răng Turbo Cut 3000',
			price: '28.000.000',
			originalPrice: '35.000.000',
			image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80',
			discount: 20,
			stock: 12,
			sold: 167
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
			name: 'Hệ thống hút bụi nha khoa SuctionMax Pro',
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
		},
		{
			id: 9,
			name: 'Máy siêu âm làm sạch răng UltraClean',
			price: '38.000.000',
			originalPrice: '45.000.000',
			image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80',
			rating: 4.7,
			reviews: 156,
			sold: 412,
			location: 'Hà Nội',
			freeShip: true
		},
		{
			id: 10,
			name: 'Đèn LED khám răng SmartLight X2',
			price: '15.500.000',
			originalPrice: '19.000.000',
			image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
			rating: 4.9,
			reviews: 298,
			sold: 756,
			location: 'TP.HCM',
			freeShip: false
		},
		{
			id: 11,
			name: 'Máy đo nha khoa kỹ thuật số DigiMeasure',
			price: '32.000.000',
			originalPrice: '38.000.000',
			image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
			rating: 4.8,
			reviews: 134,
			sold: 267,
			location: 'Đà Nẵng',
			freeShip: true
		},
		{
			id: 12,
			name: 'Bộ khoan nha khoa cao cấp DrillMaster Pro',
			price: '52.000.000',
			originalPrice: '62.000.000',
			image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80',
			rating: 4.9,
			reviews: 178,
			sold: 345,
			location: 'Hà Nội',
			freeShip: true
		},
		{
			id: 13,
			name: 'Máy phun cát làm sạch răng SandBlaster',
			price: '25.000.000',
			originalPrice: '30.000.000',
			image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80',
			rating: 4.7,
			reviews: 145,
			sold: 389,
			location: 'TP.HCM',
			freeShip: false
		},
		{
			id: 14,
			name: 'Hệ thống hút dịch nha khoa SuctionPro 2000',
			price: '48.000.000',
			originalPrice: '56.000.000',
			image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80',
			rating: 4.8,
			reviews: 167,
			sold: 234,
			location: 'Hà Nội',
			freeShip: true
		},
		{
			id: 15,
			name: 'Máy trộn vật liệu nha khoa MixMaster Elite',
			price: '18.000.000',
			originalPrice: '22.000.000',
			image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
			rating: 4.9,
			reviews: 223,
			sold: 567,
			location: 'Đà Nẵng',
			freeShip: false
		},
		{
			id: 16,
			name: 'Camera nội soi răng miệng IntraCam HD',
			price: '35.000.000',
			originalPrice: '42.000.000',
			image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
			rating: 4.8,
			reviews: 189,
			sold: 312,
			location: 'TP.HCM',
			freeShip: true
		},
		{
			id: 17,
			name: 'Máy làm trắng răng WhiteBeam Professional',
			price: '28.500.000',
			originalPrice: '34.000.000',
			image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80',
			rating: 4.7,
			reviews: 201,
			sold: 445,
			location: 'Hà Nội',
			freeShip: true
		},
		{
			id: 18,
			name: 'Bộ dụng cụ làm sạch răng UltraKit Plus',
			price: '16.500.000',
			originalPrice: '20.000.000',
			image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80',
			rating: 4.9,
			reviews: 267,
			sold: 623,
			location: 'TP.HCM',
			freeShip: false
		},
		{
			id: 19,
			name: 'Máy đo góc cắn răng AngleMeter Digital',
			price: '42.000.000',
			originalPrice: '50.000.000',
			image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80',
			rating: 4.8,
			reviews: 143,
			sold: 278,
			location: 'Đà Nẵng',
			freeShip: true
		},
		{
			id: 20,
			name: 'Tủ lưu trữ dụng cụ nha khoa StoragePro Max',
			price: '19.500.000',
			originalPrice: '24.000.000',
			image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
			rating: 4.7,
			reviews: 178,
			sold: 489,
			location: 'Hà Nội',
			freeShip: true
		}
	];

	function setDevice(device: 'mobile' | 'tablet' | 'desktop') {
		deviceView = device;
	}

	$: primaryColor = selectedPrimary;
	$: secondaryColor = selectedSecondary;

	function resetColors() {
		selectedPrimary = '#0EA5E9';
		selectedSecondary = '#F0F9FF';
	}

	function checkScreenSize() {
		const width = window.innerWidth;
		isMobileLayout = width < 1024;

		if (!isMobileLayout) {
			showColorPanel = false;
		}

		if (width < 640) {
			deviceView = 'mobile';
		} else if (width < 1280) {
			if (deviceView === 'desktop') deviceView = 'tablet';
		}
	}

	function toggleColorPanel() {
		showColorPanel = !showColorPanel;
	}

	const onNavigateContact = () => goto('/contact');

	onMount(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	});
</script>

<div class="flex min-h-screen flex-col bg-gray-950 lg:flex-row">
	<div class="flex-1 overflow-y-auto bg-gray-900 px-4 py-20 lg:px-8 lg:py-24">
		<!-- Device Switcher -->
		<div class="mb-6 flex justify-center">
			<div class="inline-flex items-center gap-1 rounded-lg bg-gray-800 p-1.5 sm:gap-2 sm:p-2">
				<button
					on:click={() => setDevice('mobile')}
					class="flex items-center gap-1 rounded-md px-2 py-2 transition-all duration-200 sm:gap-2 sm:px-4"
					style="background-color: {deviceView === 'mobile'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'mobile' ? 'white' : '#9ca3af'}"
				>
					<Smartphone size={16} class="sm:h-[18px] sm:w-[18px]" />
					<span class="text-xs font-medium sm:text-sm">Mobile</span>
				</button>

				<button
					on:click={() => setDevice('tablet')}
					class="hidden items-center gap-1 rounded-md px-2 py-2 transition-all duration-200 sm:flex sm:gap-2 sm:px-4"
					style="background-color: {deviceView === 'tablet'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'tablet' ? 'white' : '#9ca3af'}"
				>
					<Tablet size={16} class="sm:h-[18px] sm:w-[18px]" />
					<span class="text-xs font-medium sm:text-sm">Tablet</span>
				</button>

				<button
					on:click={() => setDevice('desktop')}
					class="hidden items-center gap-1 rounded-md px-2 py-2 transition-all duration-200 sm:gap-2 sm:px-4 xl:flex"
					style="background-color: {deviceView === 'desktop'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'desktop' ? 'white' : '#9ca3af'}"
				>
					<Monitor size={16} class="sm:h-[18px] sm:w-[18px]" />
					<span class="text-xs font-medium sm:text-sm">Desktop</span>
				</button>
			</div>
		</div>

		<!-- Preview Container -->
		<div class="flex justify-center">
			<div
				class="w-full overflow-hidden rounded-lg bg-white shadow-2xl transition-all duration-300"
				style="max-width: {deviceView === 'desktop' ? '100%' : deviceWidths[deviceView]};"
			>
				<div class="min-h-screen overflow-x-hidden" style="background-color: {secondaryColor};">
					<!-- Header -->
					<header class="sticky top-0 z-20 bg-white shadow-md">
						<div
							class="px-4 py-3 sm:px-6 sm:py-4"
							style="background: linear-gradient(135deg, {primaryColor} 0%, #0284c7 100%);"
						>
							<div class="flex items-center gap-3 sm:gap-4">
								<div class="flex items-center gap-2 sm:gap-3">
									<div
										class="flex shrink-0 items-center justify-center rounded-xl bg-white"
										class:h-10={deviceView === 'mobile'}
										class:w-10={deviceView === 'mobile'}
										class:h-12={deviceView !== 'mobile'}
										class:w-12={deviceView !== 'mobile'}
									>
										<span
											class:text-xl={deviceView === 'mobile'}
											class:text-2xl={deviceView !== 'mobile'}
										>
											🦷
										</span>
									</div>
									<div class:hidden={deviceView === 'mobile'}>
										<div class="text-lg font-bold text-white sm:text-xl">DentalMart</div>
										<div class="text-[10px] text-white/80">Thiết bị nha khoa</div>
									</div>
								</div>

								<div class="relative flex-1">
									<input
										type="text"
										placeholder={deviceView === 'mobile'
											? 'Tìm kiếm...'
											: 'Tìm máy nha khoa, ghế khám, dụng cụ...'}
										class="w-full rounded-lg border-0 py-2.5 pr-12 pl-4 text-sm outline-none"
										style="color: {textPrimary};"
									/>
									<button
										class="absolute top-0 right-0 flex h-full items-center rounded-r-lg px-4 text-white"
										style="background-color: {primaryColor};"
									>
										<span class="text-lg">🔍</span>
									</button>
								</div>

								<button class="relative shrink-0">
									<span class="text-2xl text-white sm:text-3xl">🛒</span>
									<span
										class="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
									>
										5
									</span>
								</button>
							</div>
						</div>
					</header>

					<!-- Categories -->
					<section class="bg-white px-4 py-4 sm:px-6">
						<div class="mb-3 flex items-center justify-between">
							<h2
								class="font-bold"
								class:text-base={deviceView === 'mobile'}
								class:text-lg={deviceView !== 'mobile'}
								style="color: {textPrimary};"
							>
								Danh mục
							</h2>
						</div>
						<div
							class="grid gap-3 sm:gap-4"
							class:grid-cols-3={deviceView === 'mobile'}
							class:grid-cols-6={deviceView === 'tablet'}
							class:grid-cols-8={deviceView === 'desktop'}
						>
							{#each categories as category (category.color)}
								<button
									class="flex flex-col items-center gap-2 rounded-xl p-3 transition-all hover:shadow-md"
									style="background-color: {category.color};"
								>
									<span
										class:text-2xl={deviceView === 'mobile'}
										class:text-3xl={deviceView !== 'mobile'}
									>
										{category.icon}
									</span>
									<span
										class="text-center text-xs font-medium sm:text-sm"
										style="color: {textPrimary};"
									>
										{category.name}
									</span>
								</button>
							{/each}
						</div>
					</section>

					<!-- Flash Sale -->
					<section class="mt-2 bg-white px-4 py-5 sm:px-6">
						<div class="mb-4 flex items-center justify-between">
							<div class="flex items-center gap-3">
								<h2
									class="font-bold uppercase"
									class:text-lg={deviceView === 'mobile'}
									class:text-xl={deviceView !== 'mobile'}
									style="color: {primaryColor};"
								>
									⚡ Flash Sale
								</h2>
								<div
									class="rounded-lg px-3 py-1 text-sm font-semibold text-white"
									style="background-color: #ef4444;"
								>
									Kết thúc trong 02:45:30
								</div>
							</div>
							<button class="text-sm font-medium" style="color: {primaryColor};">
								Xem tất cả →
							</button>
						</div>

						<div
							class="grid gap-3 sm:gap-4"
							class:grid-cols-1={deviceView === 'mobile'}
							class:grid-cols-3={deviceView === 'tablet'}
							class:grid-cols-4={deviceView === 'desktop'}
						>
							{#each flashSale as item (item.name)}
								<div
									class="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-lg"
									style="border-color: #e2e8f0;"
								>
									<div class="relative overflow-hidden" style="background-color: #f8fafc;">
										<img
											src={item.image}
											alt={item.name}
											class="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
										/>
										<div
											class="absolute top-0 left-0 rounded-br-xl px-2 py-1 text-xs font-bold text-white"
											style="background-color: #ef4444;"
										>
											-{item.discount}%
										</div>
										<div
											class="absolute right-2 bottom-2 left-2 rounded-lg bg-white/95 px-2 py-1 text-center backdrop-blur-sm"
										>
											<div class="text-xs font-semibold" style="color: {primaryColor};">
												Còn {item.stock} sản phẩm
											</div>
										</div>
									</div>
									<div class="p-3">
										<h3 class="mb-2 line-clamp-2 text-sm font-medium" style="color: {textPrimary};">
											{item.name}
										</h3>
										<div class="mb-1 flex items-baseline gap-2">
											<span class="text-lg font-bold" style="color: {primaryColor};">
												₫{item.price}
											</span>
											<span class="text-xs line-through" style="color: {textMuted};">
												₫{item.originalPrice}
											</span>
										</div>
										<div class="text-xs" style="color: {textMuted};">
											Đã bán {item.sold}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<!-- Gợi ý hôm nay -->
					<section class="mt-2 bg-white px-4 py-5 sm:px-6">
						<div class="mb-4">
							<h2
								class="font-bold uppercase"
								class:text-lg={deviceView === 'mobile'}
								class:text-xl={deviceView !== 'mobile'}
								style="color: {textPrimary};"
							>
								Gợi ý hôm nay
							</h2>
						</div>

						<div
							class="grid gap-3 sm:gap-4"
							class:grid-cols-1={deviceView === 'mobile'}
							class:grid-cols-3={deviceView === 'tablet'}
							class:grid-cols-4={deviceView === 'desktop'}
						>
							{#each products as product (product.name)}
								<div
									class="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-xl"
									style="border-color: #e2e8f0;"
								>
									<div class="relative overflow-hidden" style="background-color: #f8fafc;">
										<img
											src={product.image}
											alt={product.name}
											height={165}
											class=" w-full object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										{#if product.originalPrice}
											<div
												class="absolute top-0 left-0 rounded-br-xl px-2 py-1 text-xs font-bold text-white"
												style="background-color: #ef4444;"
											>
												-{Math.round(
													((parseFloat(product.originalPrice.replace(/\./g, '')) -
														parseFloat(product.price.replace(/\./g, ''))) /
														parseFloat(product.originalPrice.replace(/\./g, ''))) *
														100
												)}%
											</div>
										{/if}
										{#if product.freeShip}
											<div
												class="absolute bottom-2 left-2 rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold shadow-sm"
												style="color: {primaryColor};"
											>
												🚚 Freeship
											</div>
										{/if}
									</div>

									<div class="p-3">
										<h3
											class="mb-2 line-clamp-2 text-sm leading-tight font-medium"
											style="color: {textPrimary};"
										>
											{product.name}
										</h3>

										<div class="mb-2 flex items-baseline gap-2">
											<span class="text-base font-bold sm:text-lg" style="color: {primaryColor};">
												₫{product.price}
											</span>
											{#if product.originalPrice}
												<span class="text-xs line-through" style="color: {textMuted};">
													₫{product.originalPrice}
												</span>
											{/if}
										</div>

										<div class="mb-2 flex items-center gap-1 text-xs" style="color: {textMuted};">
											<div class="flex items-center gap-1">
												<span class="text-yellow-500">⭐</span>
												<span>{product.rating}</span>
											</div>
											<span>|</span>
											<span>Đã bán {product.sold}</span>
										</div>

										<div
											class="flex items-center justify-between text-xs"
											style="color: {textMuted};"
										>
											<span>📍 {product.location}</span>
											{#if product.reviews > 100}
												<span class="rounded bg-red-50 px-1.5 py-0.5 font-semibold text-red-600">
													Hot
												</span>
											{/if}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<!-- Footer -->
					<footer class="mt-8 bg-white px-4 py-8 sm:px-6">
						<div
							class="grid gap-8"
							class:grid-cols-1={deviceView === 'mobile'}
							class:grid-cols-2={deviceView === 'tablet'}
							class:grid-cols-4={deviceView === 'desktop'}
						>
							<div>
								<h3 class="mb-3 font-bold" style="color: {textPrimary};">Về DentalMart</h3>
								<ul class="space-y-2 text-sm" style="color: {textSecondary};">
									<li><button class="hover:underline">Giới thiệu</button></li>
									<li><button class="hover:underline">Tuyển dụng</button></li>
									<li><button class="hover:underline">Chính sách bảo mật</button></li>
								</ul>
							</div>

							<div>
								<h3 class="mb-3 font-bold" style="color: {textPrimary};">Hỗ trợ</h3>
								<ul class="space-y-2 text-sm" style="color: {textSecondary};">
									<li><button class="hover:underline">Trung tâm hỗ trợ</button></li>
									<li><button class="hover:underline">Chính sách bảo hành</button></li>
									<li><button class="hover:underline">Chính sách đổi trả</button></li>
								</ul>
							</div>

							<div>
								<h3 class="mb-3 font-bold" style="color: {textPrimary};">Thanh toán</h3>
								<div class="flex flex-wrap gap-2">
									<div class="flex h-10 w-14 items-center justify-center rounded border text-xl">
										💳
									</div>
									<div class="flex h-10 w-14 items-center justify-center rounded border text-xl">
										🏦
									</div>
									<div class="flex h-10 w-14 items-center justify-center rounded border text-xl">
										📱
									</div>
								</div>
							</div>

							<div>
								<h3 class="mb-3 font-bold" style="color: {textPrimary};">Liên hệ</h3>
								<ul class="space-y-2 text-sm" style="color: {textSecondary};">
									<li>📞 1900 xxxx</li>
									<li>📧 support@dentalmart.vn</li>
									<li>📍 Hà Nội, Việt Nam</li>
								</ul>
							</div>
						</div>

						<div class="mt-8 border-t pt-6" style="border-color: #e2e8f0;">
							<p class="text-center text-sm" style="color: {textMuted};">
								© 2024 DentalMart. All rights reserved.
							</p>
						</div>
					</footer>
				</div>
			</div>
		</div>
	</div>

	<!-- Floating Color Button (Mobile only) -->
	{#if isMobileLayout}
		<button
			on:click={toggleColorPanel}
			class="fixed right-6 bottom-6 z-50 rounded-full p-4 text-white shadow-2xl transition-all duration-300 hover:scale-110"
			style="background-color: {primaryColor};"
		>
			<Palette size={24} />
		</button>
	{/if}

	<!-- Color Picker Panel -->
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
			class="relative ml-auto h-full max-w-md overflow-y-auto bg-gray-900 px-4 py-8 sm:px-6 lg:max-w-none lg:px-8 lg:py-24"
		>
			{#if isMobileLayout}
				<button
					on:click={toggleColorPanel}
					class="absolute top-4 right-4 p-2 text-gray-400 transition-colors hover:text-white lg:hidden"
				>
					<X size={24} />
				</button>
			{/if}

			<h2 class="mb-6 text-center text-xl font-bold text-white sm:mb-8 sm:text-2xl">
				🎨 {t.title}
			</h2>

			<div class="space-y-6 sm:space-y-8">
				<div class="rounded-xl bg-gray-800 p-4 sm:p-6">
					<label
						for="primary-color"
						class="mb-3 flex items-center justify-between text-sm font-semibold text-gray-200 sm:mb-4 sm:text-base"
					>
						<span>{t.primary}</span>
						<span
							class="h-8 w-8 rounded-lg border-2 border-gray-700 sm:h-10 sm:w-10"
							style="background-color: {selectedPrimary};"
						></span>
					</label>
					<input
						type="color"
						id="primary-color"
						bind:value={selectedPrimary}
						class="mb-2 h-10 w-full cursor-pointer rounded-lg border-none sm:mb-3 sm:h-12"
					/>
					<input
						type="text"
						bind:value={selectedPrimary}
						class="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 font-mono text-sm text-white sm:px-4 sm:py-3 sm:text-base"
						placeholder="#0EA5E9"
					/>
				</div>

				<div class="rounded-xl bg-gray-800 p-4 sm:p-6">
					<label
						for="secondary-color"
						class="mb-3 flex items-center justify-between text-sm font-semibold text-gray-200 sm:mb-4 sm:text-base"
					>
						<span>{t.secondary}</span>
						<span
							class="h-8 w-8 rounded-lg border-2 border-gray-700 sm:h-10 sm:w-10"
							style="background-color: {selectedSecondary};"
						></span>
					</label>
					<input
						type="color"
						id="secondary-color"
						bind:value={selectedSecondary}
						class="mb-2 h-10 w-full cursor-pointer rounded-lg border-none sm:mb-3 sm:h-12"
					/>
					<input
						type="text"
						bind:value={selectedSecondary}
						class="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 font-mono text-sm text-white sm:px-4 sm:py-3 sm:text-base"
						placeholder="#F0F9FF"
					/>
				</div>
			</div>

			<Button on:click={resetColors} class="mt-6 flex w-full items-center justify-center">
				🔄 {t.reset}
			</Button>

			<div
				class="mt-6 rounded-xl border-l-4 bg-gray-800 p-4 sm:mt-8 sm:p-6"
				style="border-color: {primaryColor};"
			>
				<h3 class="mb-3 text-base font-bold text-white sm:mb-4 sm:text-lg">💡 {t.instructions}:</h3>
				<ul class="space-y-1.5 text-xs leading-relaxed text-gray-400 sm:space-y-2 sm:text-sm">
					<li>• {t.primary_help}</li>
					<li>• {t.secondary_help}</li>
					<li>• {t.live_preview}</li>
				</ul>
			</div>

			<Button on:click={onNavigateContact} class="mt-6 flex w-full items-center justify-center">
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
