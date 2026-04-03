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

	export let primaryColor: string = '#ff9966';
	export let secondaryColor: string = '#ffffff';

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

	export const highlights = [
		{ label: 'Mau xe cao cap', value: 120, suffix: '+' },
		{ label: 'Khach hang hai long', value: 3000, suffix: '+' },
		{ label: 'Nam kinh nghiem', value: 12, suffix: '+' }
	];

	export const featureCards = [
		{
			title: 'Kiem dinh 176 buoc',
			description: 'Moi xe deu duoc kiem tra chuyen sau truoc khi ban giao den khach hang.'
		},
		{
			title: 'Tai chinh linh hoat',
			description: 'Ho tro tra gop toi uu voi thu tuc nhanh gon va ro rang.'
		},
		{
			title: 'Bao hanh minh bach',
			description: 'Cam ket bang van ban, ho tro ky thuat va phu tung chinh hang.'
		}
	];

	function resetColors() {
		selectedPrimary = '#ff9966';
		selectedSecondary = '#ffffff';
	}

	function checkScreenSize() {
		const width = window.innerWidth;
		isMobileLayout = width < 1024;

		if (!isMobileLayout) {
			showColorPanel = false; // Auto hide panel on desktop
		}

		// Auto-adjust device view based on screen size
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

	const cars = [
		{
			id: 1,
			name: 'Mercedes-Benz S-Class 2024',
			price: '2.500.000.000',
			image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
			year: 2024,
			km: '0 km',
			fuel: 'Xăng'
		},
		{
			id: 2,
			name: 'BMW X5 M Sport',
			price: '1.850.000.000',
			image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
			year: 2023,
			km: '15.000 km',
			fuel: 'Diesel'
		},
		{
			id: 3,
			name: 'Audi A8 Premium',
			price: '2.200.000.000',
			image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
			year: 2024,
			km: '5.000 km',
			fuel: 'Xăng'
		},
		{
			id: 4,
			name: 'Porsche Cayenne Turbo',
			price: '3.100.000.000',
			image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80',
			year: 2024,
			km: '0 km',
			fuel: 'Xăng'
		},
		{
			id: 5,
			name: 'Range Rover Evoque',
			price: '1.650.000.000',
			image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
			year: 2023,
			km: '22.000 km',
			fuel: 'Diesel'
		},
		{
			id: 6,
			name: 'Lexus ES 300h',
			price: '1.420.000.000',
			image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80',
			year: 2024,
			km: '8.000 km',
			fuel: 'Hybrid'
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

				<!-- Tablet button - hiển thị từ màn hình sm (640px) trở lên -->
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

				<!-- Desktop button - hiển thị từ màn hình xl (1280px) trở lên -->
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

		<!-- Preview Container with dynamic width -->
		<div class="flex justify-center">
			<div
				class="w-full overflow-hidden rounded-lg bg-white shadow-2xl transition-all duration-300"
				style="max-width: {deviceView === 'desktop' ? '100%' : deviceWidths[deviceView]};"
			>
				<div class="min-h-screen overflow-x-hidden bg-gray-50">
					<!-- Header -->
					<header class="shadow-md" style="background-color: {secondaryColor};">
						<div class="px-4 sm:px-6">
							<div class="flex items-center justify-between py-3 sm:py-4">
								<div class="flex items-center gap-2">
									<svg
										width="28"
										height="28"
										viewBox="0 0 40 40"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										class="sm:h-8 sm:w-8"
									>
										<rect width="40" height="40" rx="8" fill={primaryColor} />
										<path
											d="M12 20L18 14L24 20L30 14"
											stroke="white"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M12 26L18 20L24 26L30 20"
											stroke="white"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
									<span class="text-lg font-bold text-gray-800 sm:text-xl">AutoLux</span>
								</div>
								{#if deviceView === 'desktop'}
									<nav class="hidden gap-4 md:flex lg:gap-6">
										<span
											class="cursor-pointer text-xs font-medium text-gray-600 transition-colors hover:opacity-80 lg:text-sm"
											>Trang chủ</span
										>
										<span
											class="cursor-pointer text-xs font-medium text-gray-600 transition-colors hover:opacity-80 lg:text-sm"
											>Xe hiện có</span
										>
										<span
											class="cursor-pointer text-xs font-medium text-gray-600 transition-colors hover:opacity-80 lg:text-sm"
											>Giới thiệu</span
										>
										<span
											class="cursor-pointer text-xs font-medium text-gray-600 transition-colors hover:opacity-80 lg:text-sm"
											>Liên hệ</span
										>
									</nav>
								{/if}
							</div>
						</div>
					</header>

					<!-- Banner -->
					<section
						class="relative flex items-center overflow-hidden"
						class:h-56={deviceView === 'mobile'}
						class:h-72={deviceView === 'tablet'}
						class:h-80={deviceView === 'desktop'}
						style="background: linear-gradient(135deg, {primaryColor} 0%, #ff6b6b 100%);"
					>
						<div
							class="absolute inset-0 opacity-30"
							style="background: url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80') center/cover;"
						></div>
						<div class="relative z-10 w-full px-4 sm:px-6">
							<div class="mx-auto text-center text-white">
								<h1
									class="mb-2 font-extrabold drop-shadow-lg sm:mb-3"
									class:text-xl={deviceView === 'mobile'}
									class:text-2xl={deviceView === 'tablet'}
									class:text-4xl={deviceView === 'desktop'}
								>
									Tìm chiếc xe mơ ước của bạn
								</h1>
								<p
									class="mb-4 opacity-95 sm:mb-6"
									class:text-xs={deviceView === 'mobile'}
									class:text-sm={deviceView === 'tablet'}
									class:text-base={deviceView === 'desktop'}
								>
									Bộ sưu tập xe hạng sang chính hãng
								</p>
								<button
									class="rounded-full bg-white font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
									class:text-xs={deviceView === 'mobile'}
									class:px-4={deviceView === 'mobile'}
									class:py-1.5={deviceView === 'mobile'}
									class:text-sm={deviceView !== 'mobile'}
									class:px-6={deviceView !== 'mobile'}
									class:py-2={deviceView !== 'mobile'}
									style="color: {primaryColor};"
								>
									Xem ngay
								</button>
							</div>
						</div>
					</section>

					<!--					highlight-->
					<section
						class="section-wrap mt-8 grid gap-4 px-4 sm:px-6"
						class:grid-cols-1={deviceView === 'mobile'}
						class:grid-cols-3={deviceView !== 'mobile'}
					>
						{#each highlights as item (item.label)}
							<div class="surface-card p-5 shadow-sm sm:p-6">
								<p class="text-3xl font-black" style="color: {primaryColor};">
									{item.value}{item.suffix}
								</p>
								<p class="text-muted mt-1 text-sm text-gray-900">{item.label}</p>
							</div>
						{/each}
					</section>

					<!-- Car List -->
					<section
						class:py-6={deviceView === 'mobile'}
						class:py-8={deviceView === 'tablet'}
						class:py-10={deviceView === 'desktop'}
						style="background-color: {secondaryColor};"
					>
						<div class="px-4 sm:px-6">
							<div class="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
								<div>
									<p
										class="text-sm font-semibold tracking-wide uppercase"
										style="color: {primaryColor}"
									>
										Danh mục nổi bật
									</p>
									<h2 class="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">
										Xe nổi bật
									</h2>
								</div>
								<a
									href="/inventory"
									class="text-sm font-semibold text-slate-600 hover:text-slate-900"
									>Xem tất cả mẫu xe</a
								>
							</div>
							<div
								class="grid gap-4 sm:gap-6"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-2={deviceView === 'tablet'}
								class:grid-cols-3={deviceView === 'desktop'}
							>
								{#each cars.slice(0, deviceView === 'mobile' ? 3 : 6) as car (car.id)}
									<div
										class="overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
									>
										<div class="group relative h-40 overflow-hidden sm:h-48">
											<img
												src={car.image}
												alt={car.name}
												class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
											/>
											<div
												class="absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-semibold text-white sm:top-3 sm:right-3 sm:px-3"
												style="background-color: {primaryColor};"
											>
												Hot
											</div>
										</div>
										<div class="p-3 sm:p-4">
											<h3
												class="mb-2 line-clamp-2 font-bold text-gray-900 sm:mb-3"
												class:text-sm={deviceView === 'mobile'}
												class:text-base={deviceView !== 'mobile'}
											>
												{car.name}
											</h3>
											<div class="mb-2 flex gap-2 text-xs text-gray-600 sm:mb-3 sm:gap-3">
												<span class="text-[10px] sm:text-xs">📅 {car.year}</span>
												<span class="text-[10px] sm:text-xs">🛣️ {car.km}</span>
												<span class="text-[10px] sm:text-xs">⛽ {car.fuel}</span>
											</div>
											<div class="flex items-center justify-between gap-2">
												<span
													class="line-clamp-1 font-bold"
													class:text-xs={deviceView === 'mobile'}
													class:text-sm={deviceView !== 'mobile'}
													style="color: {primaryColor};"
												>
													{car.price} VNĐ
												</span>
												<button
													class="rounded-lg font-semibold whitespace-nowrap text-white transition-opacity hover:opacity-90"
													class:text-[10px]={deviceView === 'mobile'}
													class:px-2={deviceView === 'mobile'}
													class:py-1={deviceView === 'mobile'}
													class:text-xs={deviceView !== 'mobile'}
													class:px-3={deviceView !== 'mobile'}
													class:py-1.5={deviceView !== 'mobile'}
													style="background-color: {primaryColor};"
												>
													Chi tiết
												</button>
											</div>
										</div>
									</div>
								{/each}
							</div>

							<div
								class="mt-10 grid gap-4"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-3={deviceView !== 'mobile'}
							>
								{#each featureCards as card (card.title)}
									<article
										class="surface-card p-6"
										class:mb-4={deviceView === 'mobile'}
										class:mb-6={deviceView !== 'mobile'}
									>
										<h3 class="text-lg font-bold text-gray-900">{card.title}</h3>
										<p class="text-muted mt-2 text-sm text-gray-900">{card.description}</p>
									</article>
								{/each}
							</div>
						</div>
					</section>

					<!-- Footer -->
					<footer class="bg-gray-800 py-6 text-white sm:py-8">
						<div class="px-4 sm:px-6">
							<div
								class="mb-4 grid gap-4 sm:mb-6 sm:gap-6"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-3={deviceView !== 'mobile'}
							>
								<div>
									<h4
										class="mb-2 text-base font-bold sm:mb-3 sm:text-lg"
										style="color: {primaryColor};"
									>
										AutoLux
									</h4>
									<p class="text-xs leading-relaxed text-gray-400 sm:text-sm">
										Showroom xe hạng sang uy tín
									</p>
								</div>
								<div>
									<h4
										class="mb-2 text-base font-bold sm:mb-3 sm:text-lg"
										style="color: {primaryColor};"
									>
										Liên kết
									</h4>
									<ul class="space-y-1 text-xs sm:space-y-2 sm:text-sm">
										<li>
											<span class="cursor-pointer text-gray-400 hover:text-gray-300">Trang chủ</span
											>
										</li>
										<li>
											<span class="cursor-pointer text-gray-400 hover:text-gray-300"
												>Xe hiện có</span
											>
										</li>
										<li>
											<span class="cursor-pointer text-gray-400 hover:text-gray-300"
												>Giới thiệu</span
											>
										</li>
									</ul>
								</div>
								<div>
									<h4
										class="mb-2 text-base font-bold sm:mb-3 sm:text-lg"
										style="color: {primaryColor};"
									>
										Liên hệ
									</h4>
									<ul class="space-y-1 text-xs text-gray-400 sm:space-y-2 sm:text-sm">
										<li>📞 1900 xxxx</li>
										<li>📧 info@autolux.vn</li>
										<li>📍 Hà Nội, Việt Nam</li>
									</ul>
								</div>
							</div>
							<div
								class="border-t border-gray-700 pt-3 text-center text-[10px] text-gray-500 sm:pt-4 sm:text-xs"
							>
								<p>&copy; 2024 AutoLux. All rights reserved.</p>
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

	<!-- Phần Color Picker -->
	<div
		class="fixed inset-0 z-[9999] transition-transform duration-300 lg:relative lg:inset-auto lg:z-0 lg:translate-x-0"
		class:translate-x-0={showColorPanel}
		class:-translate-x-full={!showColorPanel && isMobileLayout}
		class:w-full={isMobileLayout}
		class:lg:w-80={!isMobileLayout}
		class:xl:w-96={!isMobileLayout}
	>
		<!-- Overlay (Mobile only) -->
		{#if isMobileLayout && showColorPanel}
			<div class="absolute inset-0 bg-black/50 lg:hidden" on:click={toggleColorPanel}></div>
		{/if}

		<!-- Panel Content -->
		<div
			class="relative ml-auto h-full max-w-md overflow-y-auto bg-gray-900 px-4 py-8 sm:px-6 lg:max-w-none lg:px-8 lg:py-24"
		>
			<!-- Close button (Mobile only) -->
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
	/* Smooth transitions */
	.transition-transform {
		transition: transform 0.3s ease-in-out;
	}

	/* Line clamp utility */
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

	/* Hide scrollbar for cleaner preview */
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

	.surface-card {
		border: 1px solid rgb(148 163 184 / 0.2);
		background: var(--color-secondary);
		border-radius: 1rem;
	}
</style>
