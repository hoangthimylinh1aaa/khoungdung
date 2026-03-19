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

	export let primaryColor: string = '#0EA5E9'; // modern water blue
	export let secondaryColor: string = '#F3FBFF'; // soft icy white

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

	const services = [
		{
			id: 1,
			name: 'Rửa xe tự động tiêu chuẩn',
			price: '89.000',
			image:
				'https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?auto=format&fit=crop&w=1200&q=80',
			duration: '10 phút',
			category: 'Tiêu chuẩn'
		},
		{
			id: 2,
			name: 'Rửa xe bọt tuyết cao cấp',
			price: '129.000',
			image:
				'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
			duration: '15 phút',
			category: 'Premium'
		},
		{
			id: 3,
			name: 'Vệ sinh nội thất nhanh',
			price: '179.000',
			image:
				'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
			duration: '20 phút',
			category: 'Nội thất'
		},
		{
			id: 4,
			name: 'Phủ bóng & bảo vệ sơn',
			price: '249.000',
			image:
				'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1200&q=80',
			duration: '25 phút',
			category: 'Chăm sóc sơn'
		},
		{
			id: 5,
			name: 'Rửa gầm & bánh xe chuyên sâu',
			price: '149.000',
			image:
				'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
			duration: '18 phút',
			category: 'Gầm xe'
		},
		{
			id: 6,
			name: 'Combo toàn diện AutoWash+',
			price: '329.000',
			image:
				'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1200&q=80',
			duration: '30 phút',
			category: 'Combo'
		}
	];

	function setDevice(device: 'mobile' | 'tablet' | 'desktop') {
		deviceView = device;
	}

	$: primaryColor = selectedPrimary;
	$: secondaryColor = selectedSecondary;

	function resetColors() {
		selectedPrimary = '#0EA5E9';
		selectedSecondary = '#F3FBFF';
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

<div class="flex min-h-screen flex-col bg-slate-950 lg:flex-row">
	<div class="flex-1 overflow-y-auto bg-slate-900 px-4 py-20 lg:px-8 lg:py-24">
		<!-- Device Switcher -->
		<div class="mb-6 flex justify-center">
			<div class="inline-flex items-center gap-1 rounded-lg bg-slate-800 p-1.5 sm:gap-2 sm:p-2">
				<button
					on:click={() => setDevice('mobile')}
					class="flex items-center gap-1 rounded-md px-2 py-2 transition-all duration-200 sm:gap-2 sm:px-4"
					style="background-color: {deviceView === 'mobile'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'mobile' ? 'white' : '#94a3b8'}"
				>
					<Smartphone size={16} class="sm:h-[18px] sm:w-[18px]" />
					<span class="text-xs font-medium sm:text-sm">Mobile</span>
				</button>

				<button
					on:click={() => setDevice('tablet')}
					class="hidden items-center gap-1 rounded-md px-2 py-2 transition-all duration-200 sm:flex sm:gap-2 sm:px-4"
					style="background-color: {deviceView === 'tablet'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'tablet' ? 'white' : '#94a3b8'}"
				>
					<Tablet size={16} class="sm:h-[18px] sm:w-[18px]" />
					<span class="text-xs font-medium sm:text-sm">Tablet</span>
				</button>

				<button
					on:click={() => setDevice('desktop')}
					class="hidden items-center gap-1 rounded-md px-2 py-2 transition-all duration-200 sm:gap-2 sm:px-4 xl:flex"
					style="background-color: {deviceView === 'desktop'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'desktop' ? 'white' : '#94a3b8'}"
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
				<div
					class="relative min-h-screen overflow-x-hidden"
					style="background-color: {secondaryColor};"
				>
					<!-- Header -->
					<header class="sticky top-0 z-10 bg-white/85 shadow-sm backdrop-blur-sm">
						<div class="px-4 sm:px-6">
							<div class="flex items-center justify-between py-3 sm:py-4">
								<div class="flex items-center gap-2">
									<svg
										width="30"
										height="30"
										viewBox="0 0 40 40"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										class="sm:h-9 sm:w-9"
									>
										<rect
											x="4"
											y="10"
											width="32"
											height="14"
											rx="7"
											fill={primaryColor}
											opacity="0.18"
										/>
										<rect x="8" y="14" width="24" height="10" rx="5" fill={primaryColor} />
										<circle cx="13" cy="27" r="3" fill={primaryColor} />
										<circle cx="27" cy="27" r="3" fill={primaryColor} />
										<path
											d="M14 8C14 8 13 10 13 12"
											stroke={primaryColor}
											stroke-width="2"
											stroke-linecap="round"
										/>
										<path
											d="M20 6C20 6 19 9 19 12"
											stroke={primaryColor}
											stroke-width="2"
											stroke-linecap="round"
										/>
										<path
											d="M26 8C26 8 25 10 25 12"
											stroke={primaryColor}
											stroke-width="2"
											stroke-linecap="round"
										/>
									</svg>
									<div>
										<div class="text-lg font-bold sm:text-xl" style="color: {primaryColor};">
											AutoWash X
										</div>
										<div class="text-[8px] tracking-wide text-gray-500 sm:text-[10px]">
											RỬA XE TỰ ĐỘNG THẾ HỆ MỚI
										</div>
									</div>
								</div>

								{#if deviceView === 'desktop'}
									<nav class="flex items-center gap-4 lg:gap-8">
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
											>Bảng giá</span
										>
										<button
											class="rounded-full px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 lg:text-sm"
											style="background-color: {primaryColor};"
										>
											Đặt lịch ngay
										</button>
									</nav>
								{/if}
							</div>
						</div>
					</header>

					<!-- Hero Banner -->
					<section
						class="relative flex items-center overflow-hidden"
						class:h-72={deviceView === 'mobile'}
						class:h-[26rem]={deviceView === 'tablet'}
						class:h-[34rem]={deviceView === 'desktop'}
					>
						<div class="absolute inset-0">
							<img
								src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"
								alt="Rửa xe tự động"
								class="h-full w-full object-cover opacity-25"
							/>
							<div
								class="absolute inset-0"
								style="background:
                  radial-gradient(circle at top left, {primaryColor}35 0%, transparent 30%),
                  radial-gradient(circle at bottom right, {primaryColor}20 0%, transparent 25%),
                  linear-gradient(135deg, {secondaryColor}F2 0%, {secondaryColor}D9 100%);"
							></div>
						</div>

						<div
							class="absolute top-10 left-6 h-24 w-24 rounded-full opacity-30 blur-3xl sm:left-10 sm:h-36 sm:w-36"
							style="background-color: {primaryColor};"
						></div>
						<div
							class="absolute right-6 bottom-8 h-32 w-32 rounded-full opacity-20 blur-3xl sm:right-16 sm:h-44 sm:w-44"
							style="background-color: {primaryColor};"
						></div>

						<div class="pointer-events-none absolute inset-0 opacity-10">
							<div
								class="absolute inset-0"
								style="background-image:
                  radial-gradient(circle, {primaryColor} 1px, transparent 1px);
                  background-size: 20px 20px;"
							></div>
						</div>

						<div class="relative z-10 w-full px-4 sm:px-6">
							<div
								class="mx-auto grid max-w-6xl items-center gap-8"
								class:grid-cols-1={deviceView !== 'desktop'}
								class:grid-cols-2={deviceView === 'desktop'}
							>
								<div class="text-center lg:text-left">
									<div
										class="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm"
										style="background-color: {primaryColor}12; color: {primaryColor}; border-color: {primaryColor}30;"
									>
										<span class="h-2 w-2 rounded-full" style="background-color: {primaryColor};"
										></span>
										Công nghệ sạch nhanh và hiện đại
									</div>

									<h1
										class="mb-3 leading-tight font-semibold sm:mb-4"
										class:text-3xl={deviceView === 'mobile'}
										class:text-4xl={deviceView === 'tablet'}
										class:text-6xl={deviceView === 'desktop'}
										style="color: {primaryColor};"
									>
										Rửa xe tự động
										<span class="block text-slate-900">sạch nhanh chuẩn mới</span>
									</h1>

									<p
										class="mb-5 leading-relaxed text-slate-700 sm:mb-7"
										class:text-sm={deviceView === 'mobile'}
										class:text-base={deviceView !== 'mobile'}
									>
										Trải nghiệm dịch vụ rửa xe thế hệ mới với quy trình tự động hóa, tiết kiệm thời
										gian, sạch đều, an toàn cho bề mặt sơn và tối ưu cho nhịp sống hiện đại.
									</p>

									<div class="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
										<button
											class="rounded-full px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
											style="background-color: {primaryColor};"
										>
											Đặt lịch ngay
										</button>

										<button
											class="rounded-full border px-6 py-3 font-medium transition-all duration-300"
											style="border-color: {primaryColor}40; color: {primaryColor}; background-color: rgba(255,255,255,0.65);"
										>
											Xem bảng giá
										</button>
									</div>
								</div>

								{#if deviceView === 'desktop'}
									<div>
										<div class="relative ml-auto max-w-md">
											<div
												class="absolute -top-6 -left-6 h-24 w-24 rotate-12 rounded-3xl opacity-20"
												style="background-color: {primaryColor};"
											></div>

											<div
												class="relative rounded-[2rem] border border-white/60 bg-white/70 p-4 shadow-2xl backdrop-blur-md"
											>
												<img
													src="https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?auto=format&fit=crop&w=1000&q=80"
													alt="Auto wash"
													class="h-[26rem] w-full rounded-[1.5rem] object-cover"
												/>

												<div
													class="absolute right-8 bottom-8 left-8 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur-md"
												>
													<div class="mb-1 text-xs tracking-[0.2em] text-gray-500 uppercase">
														Dịch vụ nổi bật
													</div>
													<div class="text-lg font-semibold text-gray-900">AutoWash Premium</div>
													<div class="mt-1 text-sm text-gray-600">Nhanh · Sạch · Đồng đều</div>
												</div>
											</div>
										</div>
									</div>
								{/if}
							</div>
						</div>
					</section>

					<!-- Quick Stats -->
					<section class="relative z-10 -mt-6 px-4 sm:-mt-8 sm:px-6">
						<div class="mx-auto max-w-6xl">
							<div
								class="grid gap-3 sm:gap-4"
								class:grid-cols-2={deviceView !== 'desktop'}
								class:grid-cols-4={deviceView === 'desktop'}
							>
								<div
									class="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur-md sm:p-5"
								>
									<div class="text-2xl font-bold sm:text-3xl" style="color: {primaryColor};">
										8 phút
									</div>
									<div class="mt-1 text-xs text-gray-600 sm:text-sm">
										Thời gian rửa nhanh tiêu chuẩn
									</div>
								</div>

								<div
									class="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur-md sm:p-5"
								>
									<div class="text-2xl font-bold sm:text-3xl" style="color: {primaryColor};">
										1000+
									</div>
									<div class="mt-1 text-xs text-gray-600 sm:text-sm">Xe phục vụ mỗi tháng</div>
								</div>

								<div
									class="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur-md sm:p-5"
								>
									<div class="text-2xl font-bold sm:text-3xl" style="color: {primaryColor};">
										24/7
									</div>
									<div class="mt-1 text-xs text-gray-600 sm:text-sm">
										Hệ thống hoạt động linh hoạt
									</div>
								</div>

								<div
									class="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur-md sm:p-5"
								>
									<div class="text-2xl font-bold sm:text-3xl" style="color: {primaryColor};">
										99%
									</div>
									<div class="mt-1 text-xs text-gray-600 sm:text-sm">Khách hàng hài lòng</div>
								</div>
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
								<div
									class="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:text-sm"
									style="background-color: {primaryColor}12; color: {primaryColor};"
								>
									Gói dịch vụ hiện đại
								</div>

								<h2
									class="mb-3 font-semibold"
									class:text-2xl={deviceView === 'mobile'}
									class:text-3xl={deviceView === 'tablet'}
									class:text-4xl={deviceView === 'desktop'}
									style="color: {primaryColor};"
								>
									Rửa sạch nhanh, chăm xe chuẩn hơn
								</h2>

								<p
									class="mx-auto max-w-2xl text-sm leading-relaxed font-light text-gray-600 sm:text-base"
								>
									Từ gói rửa cơ bản đến chăm sóc chuyên sâu, mọi quy trình đều được tối ưu để xe
									sạch đẹp, vận hành nhanh và mang đến trải nghiệm tiện lợi hơn cho khách hàng.
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
										class="group overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/90 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
									>
										<div class="relative h-48 overflow-hidden sm:h-56">
											<img
												src={service.image}
												alt={service.name}
												class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
											/>

											<div
												class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
											></div>

											<div
												class="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium text-white shadow backdrop-blur-md"
												style="background-color: {primaryColor}E6;"
											>
												{service.category}
											</div>

											<div class="absolute bottom-3 left-3 flex gap-2">
												<span
													class="rounded-full bg-white/85 px-2.5 py-1 text-[11px] text-gray-700 backdrop-blur-sm"
												>
													Tự động
												</span>
												<span
													class="rounded-full bg-white/85 px-2.5 py-1 text-[11px] text-gray-700 backdrop-blur-sm"
												>
													Tiện lợi
												</span>
											</div>
										</div>

										<div class="p-4 sm:p-5">
											<div class="mb-2 flex items-start justify-between gap-3">
												<h3
													class="line-clamp-2 font-semibold text-gray-900"
													class:text-sm={deviceView === 'mobile'}
													class:text-lg={deviceView !== 'mobile'}
												>
													{service.name}
												</h3>

												<div
													class="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium"
													style="background-color: {primaryColor}12; color: {primaryColor};"
												>
													Phổ biến
												</div>
											</div>

											<p class="mb-4 text-xs leading-relaxed text-gray-600 sm:text-sm">
												Quy trình tối ưu bằng hệ thống hiện đại, giúp rút ngắn thời gian chờ mà vẫn
												đảm bảo xe sạch đồng đều.
											</p>

											<div class="mb-4 flex items-center gap-2 text-xs text-gray-500">
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												<span>{service.duration}</span>
											</div>

											<div class="flex items-center justify-between">
												<div>
													<div class="mb-0.5 text-[11px] text-gray-500">Giá từ</div>
													<span
														class="text-base font-semibold sm:text-lg"
														style="color: {primaryColor};"
													>
														{service.price}đ
													</span>
												</div>

												<button
													class="rounded-xl px-4 py-2 font-medium text-white transition-all duration-300 hover:opacity-90"
													style="background-color: {primaryColor};"
												>
													Chọn gói
												</button>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</section>

					<!-- Highlights Section -->
					<section class="px-4 py-10 sm:px-6 sm:py-14">
						<div class="mx-auto max-w-6xl">
							<div
								class="grid gap-4 sm:gap-6"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-3={deviceView !== 'mobile'}
							>
								<div
									class="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-md backdrop-blur-sm"
								>
									<div
										class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
										style="background-color: {primaryColor}15;"
									>
										<svg
											class="h-6 w-6"
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
									<h3 class="mb-2 text-lg font-semibold" style="color: {primaryColor};">
										Nhanh và đồng đều
									</h3>
									<p class="text-sm leading-relaxed text-gray-600">
										Hệ thống tự động giúp quy trình rửa xe ổn định hơn, sạch đều hơn và giảm thời
										gian chờ đợi.
									</p>
								</div>

								<div
									class="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-md backdrop-blur-sm"
								>
									<div
										class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
										style="background-color: {primaryColor}15;"
									>
										<svg
											class="h-6 w-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											style="color: {primaryColor};"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 10V3L4 14h7v7l9-11h-7z"
											/>
										</svg>
									</div>
									<h3 class="mb-2 text-lg font-semibold" style="color: {primaryColor};">
										Trải nghiệm hiện đại
									</h3>
									<p class="text-sm leading-relaxed text-gray-600">
										Thiết kế không gian và dịch vụ theo phong cách công nghệ, phù hợp khách hàng bận
										rộn.
									</p>
								</div>

								<div
									class="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-md backdrop-blur-sm"
								>
									<div
										class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
										style="background-color: {primaryColor}15;"
									>
										<svg
											class="h-6 w-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											style="color: {primaryColor};"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M3 15a4 4 0 014-4h10a4 4 0 110 8H7a4 4 0 01-4-4z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M7 11V9a5 5 0 0110 0v2"
											/>
										</svg>
									</div>
									<h3 class="mb-2 text-lg font-semibold" style="color: {primaryColor};">
										An toàn cho xe
									</h3>
									<p class="text-sm leading-relaxed text-gray-600">
										Vật liệu và quy trình được tối ưu để hạn chế tác động mạnh lên bề mặt sơn và chi
										tiết xe.
									</p>
								</div>
							</div>
						</div>
					</section>

					<!-- Story Section -->
					<section class="px-4 pb-10 sm:px-6 sm:pb-16">
						<div class="mx-auto max-w-6xl">
							<div
								class="relative overflow-hidden rounded-[2rem] p-6 sm:p-10"
								style="background: linear-gradient(135deg, {primaryColor}14 0%, rgba(255,255,255,0.78) 100%);"
							>
								<div
									class="absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-20 blur-3xl"
									style="background-color: {primaryColor};"
								></div>

								<div
									class="relative grid items-center gap-8"
									style:grid-template-columns={deviceView === 'desktop' ? '1.2fr 0.8fr' : '1fr'}
								>
									<div>
										<div class="mb-3 text-xs tracking-[0.25em] text-gray-500 uppercase">
											Công nghệ vận hành
										</div>
										<h3
											class="mb-4 text-2xl font-semibold sm:text-3xl"
											style="color: {primaryColor};"
										>
											Tự động hóa để việc chăm xe trở nên nhẹ nhàng hơn
										</h3>
										<p class="mb-5 text-sm leading-relaxed text-gray-700 sm:text-base">
											Từ khâu làm sạch bề mặt, phun bọt, xịt áp lực đến hoàn thiện, mọi bước được tổ
											chức thông minh để mang đến trải nghiệm rửa xe nhanh, sạch và nhất quán hơn
											mỗi ngày.
										</p>

										<button
											class="rounded-full px-6 py-3 font-medium text-white shadow-md transition-opacity hover:opacity-90"
											style="background-color: {primaryColor};"
										>
											Xem quy trình hoạt động
										</button>
									</div>

									<div
										class="rounded-[1.5rem] border border-white/70 bg-white/80 p-5 shadow-lg backdrop-blur-sm sm:p-6"
									>
										<div class="mb-2 text-sm text-gray-500">Điểm nổi bật</div>
										<ul class="space-y-3 text-sm text-gray-700">
											<li class="flex items-start gap-2">
												<span
													class="mt-1 h-2 w-2 rounded-full"
													style="background-color: {primaryColor};"
												></span>
												Thiết kế sáng, sạch và tươi mới
											</li>
											<li class="flex items-start gap-2">
												<span
													class="mt-1 h-2 w-2 rounded-full"
													style="background-color: {primaryColor};"
												></span>
												Họa tiết water glow, blur và pattern hiện đại
											</li>
											<li class="flex items-start gap-2">
												<span
													class="mt-1 h-2 w-2 rounded-full"
													style="background-color: {primaryColor};"
												></span>
												Phù hợp landing page dịch vụ rửa xe tự động
											</li>
										</ul>
									</div>
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
											<rect
												x="4"
												y="10"
												width="32"
												height="14"
												rx="7"
												fill={primaryColor}
												opacity="0.18"
											/>
											<rect x="8" y="14" width="24" height="10" rx="5" fill={primaryColor} />
											<circle cx="13" cy="27" r="3" fill={primaryColor} />
											<circle cx="27" cy="27" r="3" fill={primaryColor} />
										</svg>
										<div>
											<div class="text-base font-bold sm:text-lg" style="color: {primaryColor};">
												AutoWash X
											</div>
											<div class="text-[8px] tracking-wide text-gray-500">
												RỬA XE TỰ ĐỘNG THẾ HỆ MỚI
											</div>
										</div>
									</div>
									<p class="max-w-sm text-xs leading-relaxed font-light text-gray-600 sm:text-sm">
										Không gian giới thiệu dịch vụ rửa xe tự động theo phong cách hiện đại, nhanh gọn
										và tươi mới, phù hợp cho mô hình chăm xe công nghệ cao.
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
												>Giới thiệu</span
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
												>Ưu đãi</span
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
										Thông tin
									</h4>
									<ul class="space-y-1 text-xs font-light text-gray-600 sm:space-y-2 sm:text-sm">
										<li>📞 1900 8888</li>
										<li>📧 hello@autowashx.vn</li>
										<li>📍 88 Xa Lộ Hà Nội, TP.HCM</li>
										<li>🕐 7:00 - 22:00 hằng ngày</li>
									</ul>
								</div>
							</div>

							<div class="border-t border-gray-200 pt-4 text-center sm:pt-6">
								<p class="text-[10px] font-light text-gray-500 sm:text-xs">
									&copy; 2026 AutoWash X. All rights reserved.
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
			class="relative ml-auto h-full max-w-md overflow-y-auto bg-slate-900 px-4 py-8 sm:px-6 lg:max-w-none lg:px-8 lg:py-24"
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
				<div class="rounded-xl bg-slate-800 p-4 sm:p-6">
					<label
						for="primary-color"
						class="mb-3 flex items-center justify-between text-sm font-semibold text-gray-200 sm:mb-4 sm:text-base"
					>
						<span>{t.primary}</span>
						<span
							class="h-8 w-8 rounded-lg border-2 border-slate-700 sm:h-10 sm:w-10"
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
						class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-white sm:px-4 sm:py-3 sm:text-base"
						placeholder="#0EA5E9"
					/>
				</div>

				<div class="rounded-xl bg-slate-800 p-4 sm:p-6">
					<label
						for="secondary-color"
						class="mb-3 flex items-center justify-between text-sm font-semibold text-gray-200 sm:mb-4 sm:text-base"
					>
						<span>{t.secondary}</span>
						<span
							class="h-8 w-8 rounded-lg border-2 border-slate-700 sm:h-10 sm:w-10"
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
						class="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-white sm:px-4 sm:py-3 sm:text-base"
						placeholder="#F3FBFF"
					/>
				</div>
			</div>

			<Button on:click={resetColors} class="mt-6 flex w-full items-center justify-center">
				🔄 {t.reset}
			</Button>

			<div
				class="mt-6 rounded-xl border-l-4 bg-slate-800 p-4 sm:mt-8 sm:p-6"
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
		background: #475569;
		border-radius: 3px;
	}
</style>
