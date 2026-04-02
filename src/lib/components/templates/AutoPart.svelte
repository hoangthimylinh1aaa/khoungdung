<script lang="ts">
	import { Monitor, Smartphone, Tablet, Palette, X } from '@lucide/svelte';
	import { onMount, onDestroy } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';

	let locale: Locale = 'vi';
	$: locale = $localeStore;
	$: t = translations[locale].templates.colorCustomizer;

	export let primaryColor: string = '#FF6A00';
	export let secondaryColor: string = '#FFF4EC';

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

	const textPrimary = '#18181b';
	const textSecondary = '#52525b';
	const textMuted = '#71717a';
	const panelBg = '#ffffff';

	const categories = [
		{ id: 1, name: 'Đèn xe', icon: '💡' },
		{ id: 2, name: 'Camera', icon: '📷' },
		{ id: 3, name: 'Nội thất', icon: '🪑' },
		{ id: 4, name: 'Dầu nhớt', icon: '🛢️' },
		{ id: 5, name: 'Mâm lốp', icon: '🛞' },
		{ id: 6, name: 'Phanh xe', icon: '🧩' },
		{ id: 7, name: 'Lọc gió', icon: '🛠️' },
		{ id: 8, name: 'Đồ chơi xe', icon: '🚗' }
	];

	const products = [
		{
			id: 1,
			name: 'Đèn LED pha ô tô X-Max siêu sáng',
			price: '1.290.000',
			oldPrice: '1.590.000',
			image:
				'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80',
			tag: '爆款',
			rating: '4.9',
			sold: '1.2k'
		},
		{
			id: 2,
			name: 'Camera hành trình 4K góc rộng chống rung',
			price: '2.490.000',
			oldPrice: '2.990.000',
			image:
				'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
			tag: 'SALE',
			rating: '4.8',
			sold: '860'
		},
		{
			id: 3,
			name: 'Lọc gió động cơ hiệu suất cao AutoPro',
			price: '390.000',
			oldPrice: '490.000',
			image:
				'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
			tag: 'HOT',
			rating: '4.7',
			sold: '2.4k'
		},
		{
			id: 4,
			name: 'Bọc vô lăng da thể thao cao cấp',
			price: '249.000',
			oldPrice: '329.000',
			image:
				'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
			tag: 'TOP',
			rating: '4.9',
			sold: '5.6k'
		},
		{
			id: 5,
			name: 'Cảm biến áp suất lốp thông minh TPMS',
			price: '1.850.000',
			oldPrice: '2.200.000',
			image:
				'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
			tag: 'MỚI',
			rating: '4.8',
			sold: '730'
		},
		{
			id: 6,
			name: 'Combo vệ sinh nội thất ô tô 6 món',
			price: '520.000',
			oldPrice: '690.000',
			image:
				'https://images.unsplash.com/photo-1607861716497-e65ab29fc7ac?auto=format&fit=crop&w=1200&q=80',
			tag: 'COMBO',
			rating: '4.9',
			sold: '3.1k'
		},
		{
			id: 7,
			name: 'Máy bơm lốp mini cầm tay đa năng',
			price: '780.000',
			oldPrice: '950.000',
			image:
				'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1200&q=80',
			tag: 'DEAL',
			rating: '4.8',
			sold: '1.1k'
		},
		{
			id: 8,
			name: 'Giá đỡ điện thoại taplo chống rung',
			price: '199.000',
			oldPrice: '259.000',
			image:
				'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80',
			tag: 'RẺ',
			rating: '4.7',
			sold: '4.3k'
		}
	];

	function setDevice(device: 'mobile' | 'tablet' | 'desktop') {
		deviceView = device;
	}

	$: primaryColor = selectedPrimary;
	$: secondaryColor = selectedSecondary;

	function resetColors() {
		selectedPrimary = '#FF6A00';
		selectedSecondary = '#FFF4EC';
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

<div class="flex min-h-screen flex-col bg-zinc-950 lg:flex-row">
	<div class="flex-1 overflow-y-auto bg-zinc-900 px-4 py-20 lg:px-8 lg:py-24">
		<!-- Device Switcher -->
		<div class="mb-6 flex justify-center">
			<div class="inline-flex items-center gap-1 rounded-lg bg-zinc-800 p-1.5 sm:gap-2 sm:p-2">
				<button
					on:click={() => setDevice('mobile')}
					class="flex items-center gap-1 rounded-md px-2 py-2 transition-all duration-200 sm:gap-2 sm:px-4"
					style="background-color: {deviceView === 'mobile'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'mobile' ? '#ffffff' : '#a1a1aa'}"
				>
					<Smartphone size={16} class="sm:h-[18px] sm:w-[18px]" />
					<span class="text-xs font-medium sm:text-sm">Mobile</span>
				</button>

				<button
					on:click={() => setDevice('tablet')}
					class="hidden items-center gap-1 rounded-md px-2 py-2 transition-all duration-200 sm:flex sm:gap-2 sm:px-4"
					style="background-color: {deviceView === 'tablet'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'tablet' ? '#ffffff' : '#a1a1aa'}"
				>
					<Tablet size={16} class="sm:h-[18px] sm:w-[18px]" />
					<span class="text-xs font-medium sm:text-sm">Tablet</span>
				</button>

				<button
					on:click={() => setDevice('desktop')}
					class="hidden items-center gap-1 rounded-md px-2 py-2 transition-all duration-200 sm:gap-2 sm:px-4 xl:flex"
					style="background-color: {deviceView === 'desktop'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'desktop' ? '#ffffff' : '#a1a1aa'}"
				>
					<Monitor size={16} class="sm:h-[18px] sm:w-[18px]" />
					<span class="text-xs font-medium sm:text-sm">Desktop</span>
				</button>
			</div>
		</div>

		<!-- Preview -->
		<div class="flex justify-center">
			<div
				class="w-full overflow-hidden rounded-lg shadow-2xl"
				style="max-width: {deviceView === 'desktop'
					? '100%'
					: deviceWidths[deviceView]}; background-color: {secondaryColor};"
			>
				<div class="min-h-screen overflow-x-hidden">
					<!-- Top util bar -->
					<div
						class="px-4 py-2 text-[11px] text-white sm:px-6 sm:text-xs"
						style="background: linear-gradient(90deg, {primaryColor} 0%, #ff8533 100%);"
					>
						<div class="flex items-center justify-between gap-3">
							<div class="flex items-center gap-3 overflow-hidden sm:gap-5">
								<span class="whitespace-nowrap">🔥 Siêu sale linh kiện ô tô hôm nay</span>
								{#if deviceView !== 'mobile'}
									<span class="whitespace-nowrap">🎟️ Voucher 15% cho đơn đầu tiên</span>
									<span class="whitespace-nowrap">🚚 Miễn phí ship toàn quốc</span>
								{/if}
							</div>
							<div class="whitespace-nowrap">Hỗ trợ 24/7</div>
						</div>
					</div>

					<!-- Main header -->
					<header class="sticky top-0 z-20 bg-white shadow-sm">
						<div class="border-b px-4 py-3 sm:px-6" style="border-color: #fed7aa;">
							<div
								class="grid items-center gap-3"
								style:grid-template-columns={deviceView === 'desktop'
									? '220px 1fr 170px'
									: deviceView === 'tablet'
										? '190px 1fr 100px'
										: '1fr'}
							>
								<div class="flex items-center gap-3">
									<div
										class="flex h-10 w-10 items-center justify-center rounded-2xl font-bold text-white shadow-md"
										style="background: linear-gradient(135deg, {primaryColor} 0%, #ff8a3d 100%);"
									>
										淘
									</div>
									<div>
										<div class="text-lg font-bold sm:text-xl" style="color: {primaryColor};">
											Auto Tao Mall
										</div>
										<div
											class="text-[9px] tracking-[0.2em] sm:text-[10px]"
											style="color: {textMuted};"
										>
											SÀN LINH KIỆN Ô TÔ
										</div>
									</div>
								</div>

								<div class="relative">
									<input
										type="text"
										placeholder="Tìm đèn xe, camera hành trình, lọc gió, nội thất..."
										class="w-full rounded-2xl border px-4 py-3 pr-28 text-sm outline-none"
										style="background-color: {panelBg}; border-color: #fdba74; color: {textPrimary};"
									/>
								</div>

								{#if deviceView !== 'mobile'}
									<div class="flex justify-center gap-2">
										<div
											class="rounded-2xl border px-4 py-3 text-xs whitespace-nowrap"
											style="background-color: #fff7ed; border-color: #fed7aa; color: {textPrimary};"
										>
											🛒 Giỏ hàng
										</div>
									</div>
								{/if}
							</div>
						</div>

						<div class="bg-orange-50/70 px-4 py-2 sm:px-6">
							<div
								class="flex gap-4 overflow-x-auto text-xs whitespace-nowrap sm:gap-6 sm:text-sm"
								style="color: {textSecondary};"
							>
								<span>Flash Sale</span>
								<span>Hàng chính hãng</span>
								<span>Phụ tùng bán chạy</span>
								<span>Đồ chơi xe</span>
								<span>Nội thất cao cấp</span>
								<span>Khuyến mãi hôm nay</span>
							</div>
						</div>
					</header>

					<!-- Hero Taobao style -->
					<section class="px-4 pt-5 sm:px-6 sm:pt-6">
						<div
							class="grid gap-4"
							style:grid-template-columns={deviceView === 'desktop'
								? '220px 1fr 260px'
								: deviceView === 'tablet'
									? '1fr 230px'
									: '1fr'}
						>
							{#if deviceView === 'desktop'}
								<div
									class="rounded-[1.5rem] border p-4"
									style="background-color: #fffaf5; border-color: #fed7aa;"
								>
									<div class="mb-3 font-semibold" style="color: {textPrimary};">Danh mục</div>
									<div class="space-y-2">
										{#each categories as category}
											<div
												class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-orange-100/60"
												style="color: {textSecondary};"
											>
												<span>{category.icon}</span>
												<span class="text-sm">{category.name}</span>
											</div>
										{/each}
									</div>
								</div>
							{/if}

							<div
								class="relative min-h-[280px] overflow-hidden rounded-[2rem] p-6 sm:min-h-[340px] sm:p-8"
								style="background:
                  radial-gradient(circle at top left, rgba(255,255,255,0.22) 0%, transparent 25%),
                  linear-gradient(135deg, {primaryColor} 0%, #ff8a3d 100%);"
							>
								<div class="absolute inset-0 opacity-10">
									<div
										class="h-full w-full"
										style="background-image:
                      linear-gradient(to right, white 1px, transparent 1px),
                      linear-gradient(to bottom, white 1px, transparent 1px);
                      background-size: 24px 24px;"
									></div>
								</div>

								<div class="relative z-10 max-w-2xl text-white">
									<div
										class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs sm:text-sm"
									>
										爆款 linh kiện · giá tốt mỗi ngày
									</div>

									<h1
										class="mb-3 leading-tight font-bold"
										class:text-3xl={deviceView === 'mobile'}
										class:text-4xl={deviceView === 'tablet'}
										class:text-5xl={deviceView === 'desktop'}
									>
										Mua phụ tùng ô tô
										<span class="block">kiểu Taobao hiện đại</span>
									</h1>

									<p
										class="mb-6 leading-relaxed text-white/95"
										class:text-sm={deviceView === 'mobile'}
										class:text-base={deviceView !== 'mobile'}
									>
										Giao diện marketplace nổi bật, nhiều deal, sản phẩm dày, nhịp nhanh và trực
										quan. Tập trung vào trải nghiệm “mua ngay thấy giá tốt”.
									</p>

									<div class="flex flex-col gap-3 sm:flex-row">
										<button
											class="rounded-2xl bg-white px-6 py-3 text-sm font-semibold shadow-lg sm:text-base"
											style="color: {primaryColor};"
										>
											Mua ngay
										</button>
										<button
											class="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium sm:text-base"
										>
											Xem deal hot
										</button>
									</div>
								</div>

								<div
									class="absolute right-5 bottom-5 max-w-[220px] rounded-2xl bg-white/92 p-4 shadow-lg backdrop-blur-md"
								>
									<div class="mb-1 text-xs" style="color: {textMuted};">Khuyến mãi nổi bật</div>
									<div class="mb-1 font-semibold" style="color: {textPrimary};">
										Voucher đến 500.000đ
									</div>
									<div class="text-sm font-semibold" style="color: {primaryColor};">
										Áp dụng cho ngành hàng ô tô
									</div>
								</div>
							</div>

							{#if deviceView !== 'mobile'}
								<div class="grid gap-4">
									<div
										class="rounded-[1.5rem] border p-5 shadow-sm"
										style="background-color: #fffaf5; border-color: #fed7aa;"
									>
										<div class="mb-1 text-sm" style="color: {textMuted};">Flash Sale</div>
										<div class="text-2xl font-bold" style="color: {primaryColor};">-35%</div>
										<div class="mt-2 text-sm" style="color: {textSecondary};">
											Camera, đèn xe, nội thất
										</div>
									</div>

									<div
										class="rounded-[1.5rem] border p-5 shadow-sm"
										style="background-color: #fffaf5; border-color: #fed7aa;"
									>
										<div class="mb-1 text-sm" style="color: {textMuted};">Miễn phí vận chuyển</div>
										<div class="text-2xl font-bold" style="color: {primaryColor};">Toàn quốc</div>
										<div class="mt-2 text-sm" style="color: {textSecondary};">
											Cho đơn từ 499.000đ
										</div>
									</div>

									<div
										class="rounded-[1.5rem] border p-5 shadow-sm"
										style="background-color: #fffaf5; border-color: #fed7aa;"
									>
										<div class="mb-1 text-sm" style="color: {textMuted};">Hàng chính hãng</div>
										<div class="text-2xl font-bold" style="color: {primaryColor};">100%</div>
										<div class="mt-2 text-sm" style="color: {textSecondary};">
											Nhiều shop uy tín tham gia
										</div>
									</div>
								</div>
							{/if}
						</div>
					</section>

					<!-- Coupons -->
					<section class="px-4 py-4 sm:px-6">
						<div
							class="grid gap-3"
							class:grid-cols-2={deviceView === 'mobile'}
							class:grid-cols-4={deviceView !== 'mobile'}
						>
							<div
								class="rounded-2xl border p-4 shadow-sm"
								style="background-color: #fff7ed; border-color: #fed7aa;"
							>
								<div class="mb-1 text-xs" style="color: {textMuted};">Voucher shop</div>
								<div class="text-xl font-bold" style="color: {primaryColor};">Giảm 80k</div>
								<div class="mt-1 text-xs" style="color: {textSecondary};">Đơn từ 999k</div>
							</div>
							<div
								class="rounded-2xl border p-4 shadow-sm"
								style="background-color: #fff7ed; border-color: #fed7aa;"
							>
								<div class="mb-1 text-xs" style="color: {textMuted};">Mã toàn sàn</div>
								<div class="text-xl font-bold" style="color: {primaryColor};">Giảm 12%</div>
								<div class="mt-1 text-xs" style="color: {textSecondary};">Tối đa 150k</div>
							</div>
							<div
								class="rounded-2xl border p-4 shadow-sm"
								style="background-color: #fff7ed; border-color: #fed7aa;"
							>
								<div class="mb-1 text-xs" style="color: {textMuted};">Deal giờ vàng</div>
								<div class="text-xl font-bold" style="color: {primaryColor};">0h / 12h / 20h</div>
								<div class="mt-1 text-xs" style="color: {textSecondary};">Canh giá cực tốt</div>
							</div>
							<div
								class="rounded-2xl border p-4 shadow-sm"
								style="background-color: #fff7ed; border-color: #fed7aa;"
							>
								<div class="mb-1 text-xs" style="color: {textMuted};">Thành viên mới</div>
								<div class="text-xl font-bold" style="color: {primaryColor};">-15%</div>
								<div class="mt-1 text-xs" style="color: {textSecondary};">Ưu đãi lần đầu</div>
							</div>
						</div>
					</section>

					<!-- Categories grid -->
					<section class="px-4 py-2 sm:px-6 sm:py-4">
						<div
							class="rounded-[1.75rem] border p-4 shadow-sm sm:p-5"
							style="background-color: #ffffff; border-color: #fed7aa;"
						>
							<div class="mb-4 flex items-center justify-between">
								<h2 class="text-lg font-semibold sm:text-xl" style="color: {textPrimary};">
									Danh mục nổi bật
								</h2>
								<span class="text-sm font-medium" style="color: {primaryColor};">Xem thêm</span>
							</div>

							<div
								class="grid gap-3"
								class:grid-cols-4={deviceView === 'mobile'}
								class:grid-cols-8={deviceView !== 'mobile'}
							>
								{#each categories as category (category.icon)}
									<div
										class="rounded-2xl border p-3 text-center transition-all hover:shadow-sm"
										style="background-color: #fffaf5; border-color: #ffedd5;"
									>
										<div class="mb-2 text-2xl">{category.icon}</div>
										<div class="text-[11px] font-medium sm:text-sm" style="color: {textSecondary};">
											{category.name}
										</div>
									</div>
								{/each}
							</div>
						</div>
					</section>

					<!-- Product section -->
					<section
						class:py-8={deviceView === 'mobile'}
						class:py-12={deviceView === 'tablet'}
						class:py-14={deviceView === 'desktop'}
					>
						<div class="mx-auto max-w-7xl px-4 sm:px-6">
							<div class="mb-6 flex items-center justify-between sm:mb-8">
								<div>
									<div
										class="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:text-sm"
										style="background-color: #fff7ed; color: {primaryColor};"
									>
										🔥 Đề xuất theo xu hướng
									</div>
									<h2
										class="font-semibold"
										class:text-2xl={deviceView === 'mobile'}
										class:text-3xl={deviceView !== 'mobile'}
										style="color: {textPrimary};"
									>
										Sản phẩm bán chạy hôm nay
									</h2>
								</div>

								{#if deviceView !== 'mobile'}
									<div class="flex gap-2">
										<button
											class="rounded-xl border px-4 py-2 text-sm"
											style="background-color: #ffffff; border-color: #fed7aa; color: {textSecondary};"
											>Liên quan</button
										>
										<button
											class="rounded-xl border px-4 py-2 text-sm"
											style="background-color: #ffffff; border-color: #fed7aa; color: {textSecondary};"
											>Mới nhất</button
										>
										<button
											class="rounded-xl px-4 py-2 text-sm font-medium text-white"
											style="background-color: {primaryColor};">Bán chạy</button
										>
									</div>
								{/if}
							</div>

							<div
								class="grid gap-4 sm:gap-6"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-3={deviceView === 'tablet'}
								class:grid-cols-4={deviceView === 'desktop'}
							>
								{#each products.slice(0, deviceView === 'mobile' ? 6 : 8) as product (product.id)}
									<div
										class="group overflow-hidden rounded-[1.5rem] border shadow-sm transition-all duration-300 hover:shadow-xl"
										style="background-color: #ffffff; border-color: #ffedd5;"
									>
										<div
											class="relative h-40 overflow-hidden sm:h-48"
											style="background-color: #fff7ed;"
										>
											<img
												src={product.image}
												alt={product.name}
												class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
											/>

											<div
												class="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-white shadow sm:text-xs"
												style="background: linear-gradient(135deg, {primaryColor} 0%, #ff8a3d 100%);"
											>
												{product.tag}
											</div>
										</div>

										<div class="p-3 sm:p-4">
											<h3
												class="line-clamp-2 min-h-[40px] text-sm font-medium sm:min-h-[48px] sm:text-base"
												style="color: {textPrimary};"
											>
												{product.name}
											</h3>

											<div class="mt-3 flex items-center gap-2 text-xs" style="color: {textMuted};">
												<span>⭐ {product.rating}</span>
												<span>•</span>
												<span>Đã bán {product.sold}</span>
											</div>

											<div class="mt-3">
												<div class="text-lg font-bold sm:text-xl" style="color: {primaryColor};">
													{product.price}đ
												</div>
												<div class="text-xs line-through sm:text-sm" style="color: #a1a1aa;">
													{product.oldPrice}đ
												</div>
											</div>

											<div class="mt-4 flex gap-2">
												<button
													class="flex-1 rounded-xl py-2.5 text-xs font-semibold text-white sm:text-sm"
													style="background: linear-gradient(135deg, {primaryColor} 0%, #ff8a3d 100%);"
												>
													Mua ngay
												</button>
												<button
													class="rounded-xl border px-3 py-2.5"
													style="background-color: #fff7ed; border-color: #fed7aa; color: {primaryColor};"
												>
													🛒
												</button>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</section>

					<!-- Bottom promo -->
					<section class="px-4 pb-10 sm:px-6 sm:pb-16">
						<div class="mx-auto max-w-7xl">
							<div
								class="relative overflow-hidden rounded-[2rem] p-6 sm:p-10"
								style="background:
                  radial-gradient(circle at top right, rgba(255,255,255,0.45) 0%, transparent 22%),
                  linear-gradient(135deg, #fff7ed 0%, #ffe7d1 100%);"
							>
								<div
									class="grid items-center gap-8"
									style:grid-template-columns={deviceView === 'desktop' ? '1.15fr 0.85fr' : '1fr'}
								>
									<div>
										<div
											class="mb-3 text-xs tracking-[0.25em] uppercase"
											style="color: {textMuted};"
										>
											Marketplace style
										</div>
										<h3
											class="mb-4 text-2xl font-semibold sm:text-3xl"
											style="color: {textPrimary};"
										>
											Phong cách Taobao rõ hơn, dày nội dung hơn, sale mạnh hơn
										</h3>
										<p
											class="mb-5 text-sm leading-relaxed sm:text-base"
											style="color: {textSecondary};"
										>
											Bản này tập trung vào trải nghiệm mua sắm kiểu châu Á: banner nổi bật, nhiều
											deal, khối thông tin dày, danh mục rõ, card sản phẩm ưu tiên giá và hành động
											mua.
										</p>

										<button
											class="rounded-2xl px-6 py-3 font-semibold text-white shadow-md transition-opacity hover:opacity-90"
											style="background: linear-gradient(135deg, {primaryColor} 0%, #ff8a3d 100%);"
										>
											Dùng giao diện này
										</button>
									</div>

									<div
										class="rounded-[1.5rem] border p-5 shadow-lg sm:p-6"
										style="background-color: #ffffff; border-color: #fed7aa;"
									>
										<div class="mb-2 text-sm" style="color: {textMuted};">
											Điểm mạnh sau khi chỉnh
										</div>
										<ul class="space-y-3 text-sm" style="color: {textSecondary};">
											<li class="flex items-start gap-2">
												<span
													class="mt-1 h-2 w-2 rounded-full"
													style="background-color: {primaryColor};"
												></span>
												Tương phản text tốt hơn, dễ đọc hơn
											</li>
											<li class="flex items-start gap-2">
												<span
													class="mt-1 h-2 w-2 rounded-full"
													style="background-color: {primaryColor};"
												></span>
												Màu cam đậm chất marketplace châu Á
											</li>
											<li class="flex items-start gap-2">
												<span
													class="mt-1 h-2 w-2 rounded-full"
													style="background-color: {primaryColor};"
												></span>
												Responsive theo `deviceView` cho các khối chính
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</section>

					<!-- Footer -->
					<footer class="border-t bg-white py-6 sm:py-10" style="border-color: #fed7aa;">
						<div class="mx-auto max-w-7xl px-4 sm:px-6">
							<div
								class="mb-6 grid gap-6 sm:mb-8 sm:gap-8"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-4={deviceView !== 'mobile'}
							>
								<div class:col-span-2={deviceView !== 'mobile'}>
									<div class="mb-3 flex items-center gap-3">
										<div
											class="flex h-10 w-10 items-center justify-center rounded-2xl font-bold text-white"
											style="background: linear-gradient(135deg, {primaryColor} 0%, #ff8a3d 100%);"
										>
											淘
										</div>
										<div>
											<div class="text-base font-bold sm:text-lg" style="color: {primaryColor};">
												Auto Tao Mall
											</div>
											<div class="text-[8px] tracking-[0.2em]" style="color: {textMuted};">
												SÀN LINH KIỆN Ô TÔ
											</div>
										</div>
									</div>

									<p
										class="max-w-sm text-xs leading-relaxed sm:text-sm"
										style="color: {textSecondary};"
									>
										Giao diện sàn thương mại điện tử phụ tùng ô tô theo hướng Taobao hiện đại: nổi
										bật, sale mạnh, sản phẩm dày và tối ưu trải nghiệm mua sắm.
									</p>
								</div>

								<div>
									<h4
										class="mb-2 text-sm font-medium sm:mb-3 sm:text-base"
										style="color: {textPrimary};"
									>
										Liên kết
									</h4>
									<ul
										class="space-y-1 text-xs sm:space-y-2 sm:text-sm"
										style="color: {textSecondary};"
									>
										<li>Trang chủ</li>
										<li>Danh mục</li>
										<li>Khuyến mãi</li>
										<li>Liên hệ</li>
									</ul>
								</div>

								<div>
									<h4
										class="mb-2 text-sm font-medium sm:mb-3 sm:text-base"
										style="color: {textPrimary};"
									>
										Thông tin
									</h4>
									<ul
										class="space-y-1 text-xs sm:space-y-2 sm:text-sm"
										style="color: {textSecondary};"
									>
										<li>📞 1900 6868</li>
										<li>📧 hello@autotaomall.vn</li>
										<li>📍 128 Nguyễn Văn Linh, TP.HCM</li>
										<li>🕐 8:00 - 22:00 mỗi ngày</li>
									</ul>
								</div>
							</div>

							<div class="border-t pt-4 text-center sm:pt-6" style="border-color: #fed7aa;">
								<p class="text-[10px] sm:text-xs" style="color: {textMuted};">
									&copy; 2026 Auto Tao Mall. All rights reserved.
								</p>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</div>
	</div>

	<!-- Floating Color Button -->
	{#if isMobileLayout}
		<button
			on:click={toggleColorPanel}
			class="fixed right-6 bottom-6 z-50 rounded-full p-4 text-white shadow-2xl transition-all duration-300 hover:scale-110"
			style="background-color: {primaryColor};"
		>
			<Palette size={24} />
		</button>
	{/if}

	<!-- Color Panel -->
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
			class="relative ml-auto h-full max-w-md overflow-y-auto bg-zinc-900 px-4 py-8 sm:px-6 lg:max-w-none lg:px-8 lg:py-24"
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
				<div class="rounded-xl bg-zinc-800 p-4 sm:p-6">
					<label
						for="primary-color"
						class="mb-3 flex items-center justify-between text-sm font-semibold text-gray-200 sm:mb-4 sm:text-base"
					>
						<span>{t.primary}</span>
						<span
							class="h-8 w-8 rounded-lg border-2 border-zinc-700 sm:h-10 sm:w-10"
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
						class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-white sm:px-4 sm:py-3 sm:text-base"
						placeholder="#FF6A00"
					/>
				</div>

				<div class="rounded-xl bg-zinc-800 p-4 sm:p-6">
					<label
						for="secondary-color"
						class="mb-3 flex items-center justify-between text-sm font-semibold text-gray-200 sm:mb-4 sm:text-base"
					>
						<span>{t.secondary}</span>
						<span
							class="h-8 w-8 rounded-lg border-2 border-zinc-700 sm:h-10 sm:w-10"
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
						class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-white sm:px-4 sm:py-3 sm:text-base"
						placeholder="#FFF4EC"
					/>
				</div>
			</div>

			<Button on:click={resetColors} class="mt-6 flex w-full items-center justify-center">
				🔄 {t.reset}
			</Button>

			<div
				class="mt-6 rounded-xl border-l-4 bg-zinc-800 p-4 sm:mt-8 sm:p-6"
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
		background: #71717a;
		border-radius: 3px;
	}
</style>
