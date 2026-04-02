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

	export let primaryColor: string = '#8B9D83'; // sage green
	export let secondaryColor: string = '#F5F1E8'; // warm cream

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
		selectedPrimary = '#8B9D83';
		selectedSecondary = '#F5F1E8';
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

	const services = [
		{
			id: 1,
			name: 'Massage Thư Giãn Toàn Thân',
			price: '650.000',
			image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
			duration: '90 phút',
			category: 'Massage'
		},
		{
			id: 2,
			name: 'Chăm Sóc Da Mặt Cao Cấp',
			price: '850.000',
			image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
			duration: '60 phút',
			category: 'Facial'
		},
		{
			id: 3,
			name: 'Spa Chân & Nail Art',
			price: '450.000',
			image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80',
			duration: '75 phút',
			category: 'Nail'
		},
		{
			id: 4,
			name: 'Tẩy Tế Bào Chết Body',
			price: '550.000',
			image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
			duration: '45 phút',
			category: 'Body'
		},
		{
			id: 5,
			name: 'Massage Đá Nóng',
			price: '750.000',
			image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
			duration: '90 phút',
			category: 'Massage'
		},
		{
			id: 6,
			name: 'Gội Đầu Dưỡng Sinh',
			price: '350.000',
			image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
			duration: '30 phút',
			category: 'Hair'
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
					<header class="sticky top-0 z-10 bg-white/80 shadow-sm backdrop-blur-sm">
						<div class="px-4 sm:px-6">
							<div class="flex items-center justify-between py-3 sm:py-4">
								<div class="flex items-center gap-2">
									<svg
										width="28"
										height="28"
										viewBox="0 0 40 40"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										class="sm:h-9 sm:w-9"
									>
										<circle cx="20" cy="20" r="18" fill={primaryColor} opacity="0.2" />
										<circle cx="20" cy="20" r="12" fill={primaryColor} />
										<path
											d="M20 14V20L24 22"
											stroke="white"
											stroke-width="2"
											stroke-linecap="round"
										/>
									</svg>
									<div>
										<div class="text-lg font-bold sm:text-xl" style="color: {primaryColor};">
											Serenity Spa
										</div>
										<div class="text-[8px] tracking-wide text-gray-500 sm:text-[10px]">
											WELLNESS & BEAUTY
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
											>Dịch vụ</span
										>
										<span
											class="cursor-pointer text-xs font-medium text-gray-700 transition-opacity hover:opacity-70 lg:text-sm"
											>Về chúng tôi</span
										>
										<button
											class="rounded-full px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 lg:text-sm"
											style="background-color: {primaryColor};"
										>
											Đặt lịch
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
								src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80"
								alt="Spa Background"
								class="h-full w-full object-cover opacity-40"
							/>
							<div
								class="absolute inset-0"
								style="background: linear-gradient(135deg, {primaryColor}40 0%, {secondaryColor}80 100%);"
							></div>
						</div>
						<div class="relative z-10 w-full px-4 sm:px-6">
							<div class="mx-auto max-w-2xl text-center">
								<h1
									class="mb-2 font-light sm:mb-3"
									class:text-2xl={deviceView === 'mobile'}
									class:text-3xl={deviceView === 'tablet'}
									class:text-5xl={deviceView === 'desktop'}
									style="color: {primaryColor};"
								>
									Trải Nghiệm Thư Giãn Hoàn Hảo
								</h1>
								<p
									class="mb-4 font-light text-gray-700 sm:mb-6"
									class:text-xs={deviceView === 'mobile'}
									class:text-sm={deviceView === 'tablet'}
									class:text-base={deviceView === 'desktop'}
								>
									Nơi giao hòa giữa nghệ thuật chăm sóc sức khỏe và vẻ đẹp tự nhiên
								</p>
								<button
									class="rounded-full border-2 font-medium shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
									class:text-xs={deviceView === 'mobile'}
									class:px-5={deviceView === 'mobile'}
									class:py-2={deviceView === 'mobile'}
									class:text-sm={deviceView !== 'mobile'}
									class:px-8={deviceView !== 'mobile'}
									class:py-3={deviceView !== 'mobile'}
									style="background-color: {primaryColor}; border-color: {primaryColor}; color: white;"
								>
									Khám phá ngay
								</button>
							</div>
						</div>
					</section>

					<!-- Services Section -->
					<section
						class:py-8={deviceView === 'mobile'}
						class:py-12={deviceView === 'tablet'}
						class:py-16={deviceView === 'desktop'}
					>
						<div class="mx-auto max-w-7xl px-4 sm:px-6">
							<div class="mb-8 text-center sm:mb-12">
								<h2
									class="mb-2 font-light"
									class:text-2xl={deviceView === 'mobile'}
									class:text-3xl={deviceView === 'tablet'}
									class:text-4xl={deviceView === 'desktop'}
									style="color: {primaryColor};"
								>
									Dịch Vụ Của Chúng Tôi
								</h2>
								<p class="text-xs font-light text-gray-600 sm:text-sm">
									Được thiết kế riêng cho sức khỏe và sắc đẹp của bạn
								</p>
							</div>

							<div
								class="grid gap-4 sm:gap-6"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-2={deviceView === 'tablet'}
								class:grid-cols-3={deviceView === 'desktop'}
							>
								{#each services.slice(0, deviceView === 'mobile' ? 3 : 6) as service (service.id)}
									<div
										class="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
									>
										<div class="relative h-44 overflow-hidden sm:h-52">
											<img
												src={service.image}
												alt={service.name}
												class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
											/>
											<div
												class="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-light text-white backdrop-blur-sm"
												style="background-color: {primaryColor}90;"
											>
												{service.category}
											</div>
										</div>
										<div class="p-4 sm:p-5">
											<h3
												class="mb-2 line-clamp-2 font-medium text-gray-800 sm:mb-3"
												class:text-sm={deviceView === 'mobile'}
												class:text-base={deviceView !== 'mobile'}
											>
												{service.name}
											</h3>
											<div class="mb-3 flex items-center gap-2 text-xs text-gray-500">
												<svg
													class="h-3 w-3 sm:h-4 sm:w-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												<span class="text-[10px] sm:text-xs">{service.duration}</span>
											</div>
											<div class="flex items-center justify-between">
												<div>
													<div class="mb-0.5 text-[10px] text-gray-500">Từ</div>
													<span
														class="font-semibold"
														class:text-base={deviceView === 'mobile'}
														class:text-lg={deviceView !== 'mobile'}
														style="color: {primaryColor};"
													>
														{service.price}đ
													</span>
												</div>
												<button
													class="rounded-lg font-medium transition-opacity hover:opacity-90"
													class:text-[10px]={deviceView === 'mobile'}
													class:px-3={deviceView === 'mobile'}
													class:py-1.5={deviceView === 'mobile'}
													class:text-xs={deviceView !== 'mobile'}
													class:px-4={deviceView !== 'mobile'}
													class:py-2={deviceView !== 'mobile'}
													style="background-color: {primaryColor}; color: white;"
												>
													Đặt lịch
												</button>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</section>

					<!-- Features Section -->
					<section
						class="bg-white/50 py-8 sm:py-12"
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
										class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full sm:mb-4 sm:h-16 sm:w-16"
										style="background-color: {primaryColor}20;"
									>
										<svg
											class="h-6 w-6 sm:h-8 sm:w-8"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											style="color: {primaryColor};"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									<h3
										class="mb-1 text-sm font-medium sm:mb-2 sm:text-base"
										style="color: {primaryColor};"
									>
										100% Tự Nhiên
									</h3>
									<p class="text-xs font-light text-gray-600 sm:text-sm">Sản phẩm hữu cơ cao cấp</p>
								</div>
								<div class="text-center">
									<div
										class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full sm:mb-4 sm:h-16 sm:w-16"
										style="background-color: {primaryColor}20;"
									>
										<svg
											class="h-6 w-6 sm:h-8 sm:w-8"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											style="color: {primaryColor};"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
											/>
										</svg>
									</div>
									<h3
										class="mb-1 text-sm font-medium sm:mb-2 sm:text-base"
										style="color: {primaryColor};"
									>
										Chuyên Gia Giàu Kinh Nghiệm
									</h3>
									<p class="text-xs font-light text-gray-600 sm:text-sm">
										Đội ngũ tận tâm, chuyên nghiệp
									</p>
								</div>
								<div class="text-center">
									<div
										class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full sm:mb-4 sm:h-16 sm:w-16"
										style="background-color: {primaryColor}20;"
									>
										<svg
											class="h-6 w-6 sm:h-8 sm:w-8"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											style="color: {primaryColor};"
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
										class="mb-1 text-sm font-medium sm:mb-2 sm:text-base"
										style="color: {primaryColor};"
									>
										Cam Kết Chất Lượng
									</h3>
									<p class="text-xs font-light text-gray-600 sm:text-sm">
										Hài lòng 100% hoặc hoàn tiền
									</p>
								</div>
							</div>
						</div>
					</section>

					<!-- Footer -->
					<footer class="border-t border-gray-200 bg-white py-6 sm:py-10">
						<div class="mx-auto max-w-7xl px-4 sm:px-6">
							<div
								class="mb-6 grid gap-6 sm:mb-8 sm:gap-8"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-4={deviceView !== 'mobile'}
							>
								<div class:col-span-2={deviceView !== 'mobile'}>
									<div class="mb-3 flex items-center gap-2">
										<svg
											width="32"
											height="32"
											viewBox="0 0 40 40"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle cx="20" cy="20" r="18" fill={primaryColor} opacity="0.2" />
											<circle cx="20" cy="20" r="12" fill={primaryColor} />
											<path
												d="M20 14V20L24 22"
												stroke="white"
												stroke-width="2"
												stroke-linecap="round"
											/>
										</svg>
										<div>
											<div class="text-base font-bold sm:text-lg" style="color: {primaryColor};">
												Serenity Spa
											</div>
											<div class="text-[8px] tracking-wide text-gray-500">WELLNESS & BEAUTY</div>
										</div>
									</div>
									<p class="max-w-sm text-xs leading-relaxed font-light text-gray-600 sm:text-sm">
										Điểm đến lý tưởng cho những ai tìm kiếm sự thư giãn, chăm sóc sức khỏe và làm
										đẹp tự nhiên.
									</p>
								</div>
								<div>
									<h4
										class="mb-2 text-sm font-medium sm:mb-3 sm:text-base"
										style="color: {primaryColor};"
									>
										Liên kết
									</h4>
									<ul class="space-y-1 text-xs sm:space-y-2 sm:text-sm">
										<li>
											<span
												class="cursor-pointer font-light text-gray-600 transition-opacity hover:opacity-70"
												>Về chúng tôi</span
											>
										</li>
										<li>
											<span
												class="cursor-pointer font-light text-gray-600 transition-opacity hover:opacity-70"
												>Dịch vụ</span
											>
										</li>
										<li>
											<span
												class="cursor-pointer font-light text-gray-600 transition-opacity hover:opacity-70"
												>Bảng giá</span
											>
										</li>
										<li>
											<span
												class="cursor-pointer font-light text-gray-600 transition-opacity hover:opacity-70"
												>Liên hệ</span
											>
										</li>
									</ul>
								</div>
								<div>
									<h4
										class="mb-2 text-sm font-medium sm:mb-3 sm:text-base"
										style="color: {primaryColor};"
									>
										Liên hệ
									</h4>
									<ul class="space-y-1 text-xs font-light text-gray-600 sm:space-y-2 sm:text-sm">
										<li>📞 1900 1234</li>
										<li>📧 info@serenityspa.vn</li>
										<li>📍 123 Đường ABC, Q.1, TP.HCM</li>
										<li>🕐 8:00 - 22:00 hàng ngày</li>
									</ul>
								</div>
							</div>
							<div class="border-t border-gray-200 pt-4 text-center sm:pt-6">
								<p class="text-[10px] font-light text-gray-500 sm:text-xs">
									&copy; 2024 Serenity Spa. All rights reserved.
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
