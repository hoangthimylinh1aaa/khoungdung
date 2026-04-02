<script lang="ts">
	import { Monitor, Smartphone, Tablet, Palette, X } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';

	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';

	let locale: Locale = 'vi';
	$: locale = $localeStore;

	$: t = translations[locale].templates.colorCustomizer;
	export let primaryColor: string = '#D97941'; // burnt orange
	export let secondaryColor: string = '#FFFFF0'; // ivory white

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

	function setDevice(device: 'mobile' | 'tablet' | 'desktop') {
		deviceView = device;
	}

	$: primaryColor = selectedPrimary;
	$: secondaryColor = selectedSecondary;

	function resetColors() {
		selectedPrimary = '#D97941';
		selectedSecondary = '#FFFFF0';
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
			if (deviceView === 'desktop') {
				deviceView = 'tablet';
			}
		}
	}

	function toggleColorPanel() {
		showColorPanel = !showColorPanel;
	}

	onMount(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	});

	// Danh sách món ăn nổi bật
	const dishes = [
		{
			id: 1,
			name: 'Bò Beefsteak Úc Cao Cấp',
			price: '450.000',
			image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
			category: 'Main Course',
			description: 'Thịt bò Úc thượng hạng'
		},
		{
			id: 2,
			name: 'Tôm Hùm Alaska Nướng Bơ',
			price: '850.000',
			image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&q=80',
			category: 'Seafood',
			description: 'Tươi sống mỗi ngày'
		},
		{
			id: 3,
			name: 'Sushi & Sashimi Omakase',
			price: '680.000',
			image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
			category: 'Japanese',
			description: 'Set Chef đặc biệt'
		},
		{
			id: 4,
			name: 'Pasta Truffle Ý Truyền Thống',
			price: '380.000',
			image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
			category: 'Italian',
			description: 'Nấm truffle nhập khẩu'
		},
		{
			id: 5,
			name: 'Cá Hồi Na Uy Sốt Chanh Dây',
			price: '420.000',
			image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
			category: 'Seafood',
			description: 'Phi lê cá hồi tươi'
		},
		{
			id: 6,
			name: 'Lẩu Hải Sản Cao Cấp',
			price: '950.000',
			image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
			category: 'Hot Pot',
			description: 'Combo 2-3 người'
		}
	];

	const onNavigateContact = () => goto('/contact');
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
					<header class="sticky top-0 z-10 bg-white/95 shadow-sm backdrop-blur-sm">
						<div class="px-4 sm:px-6">
							<div class="flex items-center justify-between py-3 sm:py-4">
								<div class="flex items-center gap-2">
									<svg
										width="28"
										height="28"
										viewBox="0 0 40 40"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										class="sm:h-10 sm:w-10"
									>
										<rect width="40" height="40" rx="8" fill={primaryColor} />
										<path d="M20 10L24 18H16L20 10Z" fill="white" />
										<circle cx="20" cy="25" r="3" fill="white" />
										<path d="M13 30H27" stroke="white" stroke-width="2" stroke-linecap="round" />
									</svg>
									<div>
										<div class="text-lg font-bold sm:text-xl" style="color: {primaryColor};">
											La Cuisine
										</div>
										<div class="text-[8px] tracking-widest text-gray-500 sm:text-[10px]">
											FINE DINING
										</div>
									</div>
								</div>
								{#if deviceView === 'desktop'}
									<nav class="hidden items-center gap-4 md:flex lg:gap-8">
										<span
											class="cursor-pointer text-xs font-medium text-gray-700 transition-opacity hover:opacity-70 lg:text-sm"
											>Trang chủ</span
										>
										<span
											class="cursor-pointer text-xs font-medium text-gray-700 transition-opacity hover:opacity-70 lg:text-sm"
											>Thực đơn</span
										>
										<span
											class="cursor-pointer text-xs font-medium text-gray-700 transition-opacity hover:opacity-70 lg:text-sm"
											>Về chúng tôi</span
										>
										<button
											class="rounded-md px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:opacity-90 lg:text-sm"
											style="background-color: {primaryColor};"
										>
											Đặt bàn ngay
										</button>
									</nav>
								{/if}
							</div>
						</div>
					</header>

					<!-- Hero Banner -->
					<section
						class="relative flex items-center overflow-hidden"
						class:h-64={deviceView === 'mobile'}
						class:h-80={deviceView === 'tablet'}
						class:h-96={deviceView === 'desktop'}
					>
						<div class="absolute inset-0">
							<img
								src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
								alt="Restaurant Background"
								class="h-full w-full object-cover"
							/>
							<div class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
						</div>
						<div class="relative z-10 w-full px-4 sm:px-6">
							<div class="max-w-2xl">
								<h1
									class="mb-2 font-serif text-white sm:mb-3"
									class:text-2xl={deviceView === 'mobile'}
									class:text-4xl={deviceView === 'tablet'}
									class:text-5xl={deviceView === 'desktop'}
								>
									Hương Vị Đỉnh Cao
								</h1>
								<p
									class="mb-4 text-white/90 sm:mb-6"
									class:text-xs={deviceView === 'mobile'}
									class:text-sm={deviceView === 'tablet'}
									class:text-base={deviceView === 'desktop'}
								>
									Trải nghiệm ẩm thực tinh tế từ khắp năm châu
								</p>
								<button
									class="rounded-md font-semibold shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
									class:text-xs={deviceView === 'mobile'}
									class:px-5={deviceView === 'mobile'}
									class:py-2={deviceView === 'mobile'}
									class:text-sm={deviceView !== 'mobile'}
									class:px-8={deviceView !== 'mobile'}
									class:py-3={deviceView !== 'mobile'}
									style="background-color: {primaryColor}; color: white;"
								>
									Xem thực đơn
								</button>
							</div>
						</div>
					</section>

					<!-- Menu Section -->
					<section
						class:py-8={deviceView === 'mobile'}
						class:py-12={deviceView === 'tablet'}
						class:py-16={deviceView === 'desktop'}
					>
						<div class="mx-auto max-w-7xl px-4 sm:px-6">
							<div class="mb-8 text-center sm:mb-12">
								<h2
									class="mb-2 font-serif"
									class:text-2xl={deviceView === 'mobile'}
									class:text-3xl={deviceView === 'tablet'}
									class:text-4xl={deviceView === 'desktop'}
									style="color: {primaryColor};"
								>
									Món Ăn Đặc Sắc
								</h2>
								<p class="text-xs text-gray-600 sm:text-sm">Được chọn lọc bởi đầu bếp hàng đầu</p>
							</div>

							<div
								class="grid gap-4 sm:gap-6"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-2={deviceView === 'tablet'}
								class:grid-cols-3={deviceView === 'desktop'}
							>
								{#each dishes.slice(0, deviceView === 'mobile' ? 3 : 6) as dish (dish.id)}
									<div
										class="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
									>
										<div class="relative h-44 overflow-hidden sm:h-52">
											<img
												src={dish.image}
												alt={dish.name}
												class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
											/>
											<div
												class="absolute top-3 right-3 rounded-md px-3 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-sm"
												style="background-color: {primaryColor};"
											>
												{dish.category}
											</div>
										</div>
										<div class="p-4 sm:p-5">
											<h3
												class="mb-2 line-clamp-2 font-semibold text-gray-800"
												class:text-sm={deviceView === 'mobile'}
												class:text-base={deviceView !== 'mobile'}
											>
												{dish.name}
											</h3>
											<p class="mb-3 line-clamp-1 text-[10px] text-gray-500 sm:text-xs">
												{dish.description}
											</p>
											<div class="flex items-center justify-between">
												<div>
													<span
														class="font-bold"
														class:text-lg={deviceView === 'mobile'}
														class:text-xl={deviceView !== 'mobile'}
														style="color: {primaryColor};"
													>
														{dish.price}đ
													</span>
												</div>
												<button
													class="rounded-md font-semibold shadow-md transition-all hover:opacity-90"
													class:text-[10px]={deviceView === 'mobile'}
													class:px-3={deviceView === 'mobile'}
													class:py-1.5={deviceView === 'mobile'}
													class:text-xs={deviceView !== 'mobile'}
													class:px-4={deviceView !== 'mobile'}
													class:py-2={deviceView !== 'mobile'}
													style="background-color: {primaryColor}; color: white;"
												>
													Đặt món
												</button>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</section>

					<!-- Why Choose Us Section -->
					<section
						class="py-8 sm:py-12"
						style="background: linear-gradient(135deg, {primaryColor}10 0%, {secondaryColor} 100%);"
						class:px-4={deviceView === 'mobile'}
						class:px-6={deviceView !== 'mobile'}
					>
						<div class="mx-auto max-w-6xl">
							<div
								class="grid gap-6 sm:gap-8"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-3={deviceView !== 'mobile'}
							>
								<div class="text-center">
									<div
										class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full shadow-lg sm:mb-4 sm:h-20 sm:w-20"
										style="background-color: {primaryColor};"
									>
										<svg
											class="h-7 w-7 text-white sm:h-10 sm:w-10"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
											/>
										</svg>
									</div>
									<h3
										class="mb-1 text-sm font-bold sm:mb-2 sm:text-base"
										style="color: {primaryColor};"
									>
										Chef Chuyên Nghiệp
									</h3>
									<p class="text-xs text-gray-600 sm:text-sm">Đội ngũ đầu bếp giàu kinh nghiệm</p>
								</div>
								<div class="text-center">
									<div
										class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full shadow-lg sm:mb-4 sm:h-20 sm:w-20"
										style="background-color: {primaryColor};"
									>
										<svg
											class="h-7 w-7 text-white sm:h-10 sm:w-10"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
									<h3
										class="mb-1 text-sm font-bold sm:mb-2 sm:text-base"
										style="color: {primaryColor};"
									>
										Nguyên Liệu Tươi Sống
									</h3>
									<p class="text-xs text-gray-600 sm:text-sm">Nhập khẩu trực tiếp hàng ngày</p>
								</div>
								<div class="text-center">
									<div
										class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full shadow-lg sm:mb-4 sm:h-20 sm:w-20"
										style="background-color: {primaryColor};"
									>
										<svg
											class="h-7 w-7 text-white sm:h-10 sm:w-10"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
											/>
										</svg>
									</div>
									<h3
										class="mb-1 text-sm font-bold sm:mb-2 sm:text-base"
										style="color: {primaryColor};"
									>
										Phục Vụ Tận Tâm
									</h3>
									<p class="text-xs text-gray-600 sm:text-sm">Đội ngũ nhân viên chuyên nghiệp</p>
								</div>
							</div>
						</div>
					</section>

					<!-- Footer -->
					<footer class="bg-gray-900 py-6 text-white sm:py-10">
						<div class="mx-auto max-w-7xl px-4 sm:px-6">
							<div
								class="mb-6 grid gap-6 sm:mb-8 sm:gap-8"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-4={deviceView !== 'mobile'}
							>
								<div class:col-span-2={deviceView !== 'mobile'}>
									<div class="mb-3 flex items-center gap-2">
										<svg
											width="36"
											height="36"
											viewBox="0 0 40 40"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect width="40" height="40" rx="8" fill={primaryColor} />
											<path d="M20 10L24 18H16L20 10Z" fill="white" />
											<circle cx="20" cy="25" r="3" fill="white" />
											<path d="M13 30H27" stroke="white" stroke-width="2" stroke-linecap="round" />
										</svg>
										<div>
											<div class="text-lg font-bold sm:text-xl" style="color: {primaryColor};">
												La Cuisine
											</div>
											<div class="text-[8px] tracking-widest text-gray-400">FINE DINING</div>
										</div>
									</div>
									<p class="max-w-sm text-xs leading-relaxed text-gray-300 sm:text-sm">
										Nhà hàng cao cấp mang đến trải nghiệm ẩm thực đẳng cấp quốc tế với không gian
										sang trọng.
									</p>
								</div>
								<div>
									<h4
										class="mb-2 text-sm font-semibold sm:mb-3 sm:text-base"
										style="color: {primaryColor};"
									>
										Liên kết
									</h4>
									<ul class="space-y-1 text-xs sm:space-y-2 sm:text-sm">
										<li>
											<span class="cursor-pointer text-gray-300 transition-colors hover:text-white"
												>Về chúng tôi</span
											>
										</li>
										<li>
											<span class="cursor-pointer text-gray-300 transition-colors hover:text-white"
												>Thực đơn</span
											>
										</li>
										<li>
											<span class="cursor-pointer text-gray-300 transition-colors hover:text-white"
												>Đặt bàn</span
											>
										</li>
										<li>
											<span class="cursor-pointer text-gray-300 transition-colors hover:text-white"
												>Liên hệ</span
											>
										</li>
									</ul>
								</div>
								<div>
									<h4
										class="mb-2 text-sm font-semibold sm:mb-3 sm:text-base"
										style="color: {primaryColor};"
									>
										Thông tin
									</h4>
									<ul class="space-y-1 text-xs text-gray-300 sm:space-y-2 sm:text-sm">
										<li>📞 028 1234 5678</li>
										<li>📧 info@lacuisine.vn</li>
										<li>📍 45 Đồng Khởi, Q.1, TP.HCM</li>
										<li>🕐 11:00 - 23:00 hàng ngày</li>
									</ul>
								</div>
							</div>
							<div class="border-t border-gray-700 pt-4 text-center sm:pt-6">
								<p class="text-[10px] text-gray-400 sm:text-xs">
									&copy; 2024 La Cuisine Restaurant. All rights reserved.
								</p>
							</div>
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
		class="fixed inset-0 z-[999] transition-transform duration-300 lg:relative lg:inset-auto lg:z-0 lg:translate-x-0"
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
						placeholder="#ff9966"
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
						placeholder="#ffffff"
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
	.transition-transform {
		transition: transform 0.3s ease-in-out;
	}

	.line-clamp-1 {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

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
