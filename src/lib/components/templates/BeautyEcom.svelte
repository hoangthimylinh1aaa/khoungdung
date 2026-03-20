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

	export let primaryColor: string = '#5B21B6';
	export let secondaryColor: string = '#F8F4FF';

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

	const quickCategories = [
		{ id: 1, name: 'Skincare', icon: '🧴' },
		{ id: 2, name: 'Makeup', icon: '💄' },
		{ id: 3, name: 'Haircare', icon: '💇‍♀️' },
		{ id: 4, name: 'Perfume', icon: '🌸' },
		{ id: 5, name: 'Bodycare', icon: '🫧' },
		{ id: 6, name: 'Gift Set', icon: '🎁' }
	];

	const flashDeals = [
		{
			id: 1,
			title: 'Serum Vitamin C',
			price: '489.000',
			image:
				'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
		},
		{
			id: 2,
			title: 'Son lì premium',
			price: '259.000',
			image:
				'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80'
		},
		{
			id: 3,
			title: 'Kem chống nắng',
			price: '329.000',
			image:
				'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80'
		},
		{
			id: 4,
			title: 'Nước hoa nữ',
			price: '1.190.000',
			image:
				'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80'
		}
	];

	const products = [
		{
			id: 1,
			name: 'Serum dưỡng sáng da Vitamin C Premium',
			price: '489.000',
			oldPrice: '629.000',
			image:
				'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
			tag: 'HOT',
			rating: '4.9',
			sold: '2.1k'
		},
		{
			id: 2,
			name: 'Kem chống nắng nâng tone SPF50+',
			price: '329.000',
			oldPrice: '420.000',
			image:
				'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=80',
			tag: 'SALE',
			rating: '4.8',
			sold: '3.8k'
		},
		{
			id: 3,
			name: 'Son lì mềm mịn bảng màu thời thượng',
			price: '259.000',
			oldPrice: '319.000',
			image:
				'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1200&q=80',
			tag: 'TREND',
			rating: '4.9',
			sold: '5.4k'
		},
		{
			id: 4,
			name: 'Nước hoa nữ floral sang trọng 50ml',
			price: '1.190.000',
			oldPrice: '1.490.000',
			image:
				'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80',
			tag: 'TOP',
			rating: '4.8',
			sold: '920'
		},
		{
			id: 5,
			name: 'Dầu gội phục hồi tóc hư tổn chuyên sâu',
			price: '379.000',
			oldPrice: '469.000',
			image:
				'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
			tag: 'MỚI',
			rating: '4.7',
			sold: '1.7k'
		},
		{
			id: 6,
			name: 'Mặt nạ phục hồi cấp ẩm hộp 10 miếng',
			price: '219.000',
			oldPrice: '289.000',
			image:
				'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80',
			tag: 'COMBO',
			rating: '4.9',
			sold: '6.1k'
		},
		{
			id: 7,
			name: 'Cọ makeup chuyên nghiệp 8 món',
			price: '299.000',
			oldPrice: '399.000',
			image:
				'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
			tag: 'DEAL',
			rating: '4.8',
			sold: '2.3k'
		},
		{
			id: 8,
			name: 'Combo dưỡng da mini travel kit',
			price: '549.000',
			oldPrice: '699.000',
			image:
				'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
			tag: 'GIFT',
			rating: '4.8',
			sold: '1.3k'
		}
	];

	function setDevice(device: 'mobile' | 'tablet' | 'desktop') {
		deviceView = device;
	}

	$: primaryColor = selectedPrimary;
	$: secondaryColor = selectedSecondary;

	function resetColors() {
		selectedPrimary = '#5B21B6';
		selectedSecondary = '#F8F4FF';
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
					<!-- Promo bar -->
					<div
						class="px-4 py-2 text-[11px] text-white sm:px-6 sm:text-xs"
						style="background: linear-gradient(90deg, {primaryColor} 0%, #8B5CF6 100%);"
					>
						<div class="flex items-center justify-between gap-3">
							<div class="flex items-center gap-3 overflow-x-auto whitespace-nowrap sm:gap-5">
								<span>✨ Beauty sale mỗi ngày</span>
								<span>🎟️ Voucher 15% cho khách mới</span>
								<span>🚚 Miễn phí ship toàn quốc</span>
							</div>
							<span class="whitespace-nowrap">Official Beauty Mall</span>
						</div>
					</div>

					<!-- Header -->
					<header
						class="sticky top-0 z-20 border-b bg-white shadow-sm"
						style="border-color: #e9d5ff;"
					>
						<div class="px-4 py-3 sm:px-6 sm:py-4">
							<div class="flex items-center gap-2 sm:gap-3 lg:gap-4">
								<div
									class="flex shrink-0 items-center justify-center rounded-2xl font-bold text-white"
									class:h-8={deviceView === 'mobile'}
									class:w-8={deviceView === 'mobile'}
									class:h-10={deviceView !== 'mobile'}
									class:w-10={deviceView !== 'mobile'}
									style="background: linear-gradient(135deg, {primaryColor} 0%, #8B5CF6 100%);"
								>
									<span
										class:text-sm={deviceView === 'mobile'}
										class:text-base={deviceView !== 'mobile'}>LZ</span
									>
								</div>

								{#if deviceView !== 'mobile'}
									<div class="hidden min-w-[140px] sm:block">
										<div class="text-lg font-bold" style="color: {primaryColor};">Beauty Ecom</div>
										<div class="text-[10px] tracking-[0.2em]" style="color: {textMuted};">
											BEAUTY ECOMMERCE
										</div>
									</div>
								{/if}

								<div class="relative flex-1">
									<input
										type="text"
										placeholder={deviceView === 'mobile'
											? 'Tìm kiếm...'
											: 'Tìm serum, son môi, kem chống nắng...'}
										class="w-full rounded-2xl border outline-none"
										class:px-3={deviceView === 'mobile'}
										class:py-2={deviceView === 'mobile'}
										class:pr-16={deviceView === 'mobile'}
										class:text-xs={deviceView === 'mobile'}
										class:px-4={deviceView !== 'mobile'}
										class:py-3={deviceView !== 'mobile'}
										class:pr-24={deviceView !== 'mobile'}
										class:text-sm={deviceView !== 'mobile'}
										style="border-color: #d8b4fe; color: {textPrimary}; background-color: #fff;"
									/>
									<button
										class="absolute rounded-xl font-semibold text-white"
										class:top-1={deviceView === 'mobile'}
										class:right-1={deviceView === 'mobile'}
										class:px-3={deviceView === 'mobile'}
										class:py-1.5={deviceView === 'mobile'}
										class:text-xs={deviceView === 'mobile'}
										class:top-1.5={deviceView !== 'mobile'}
										class:right-1.5={deviceView !== 'mobile'}
										class:px-4={deviceView !== 'mobile'}
										class:py-2={deviceView !== 'mobile'}
										class:text-sm={deviceView !== 'mobile'}
										style="background: linear-gradient(135deg, {primaryColor} 0%, #8B5CF6 100%);"
									>
										Tìm
									</button>
								</div>

								<div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
									<button
										class="rounded-2xl border"
										class:h-9={deviceView === 'mobile'}
										class:w-9={deviceView === 'mobile'}
										class:text-base={deviceView === 'mobile'}
										class:h-11={deviceView !== 'mobile'}
										class:w-11={deviceView !== 'mobile'}
										class:text-lg={deviceView !== 'mobile'}
										style="background-color: #faf5ff; border-color: #e9d5ff; color: {primaryColor};"
									>
										❤️
									</button>
									<button
										class="rounded-2xl border"
										class:h-9={deviceView === 'mobile'}
										class:w-9={deviceView === 'mobile'}
										class:text-base={deviceView === 'mobile'}
										class:h-11={deviceView !== 'mobile'}
										class:w-11={deviceView !== 'mobile'}
										class:text-lg={deviceView !== 'mobile'}
										style="background-color: #faf5ff; border-color: #e9d5ff; color: {primaryColor};"
									>
										🛒
									</button>
								</div>
							</div>
						</div>
					</header>

					<!-- Hero -->
					<section class="px-4 pt-4 sm:px-6 sm:pt-5 lg:pt-6">
						<div
							class="grid gap-3 sm:gap-4"
							class:lg:grid-cols-[1.2fr_0.8fr]={deviceView === 'desktop'}
						>
							<div
								class="relative overflow-hidden rounded-[2rem] text-white"
								class:p-5={deviceView === 'mobile'}
								class:p-6={deviceView === 'tablet'}
								class:p-8={deviceView === 'desktop'}
								style="background: linear-gradient(135deg, {primaryColor} 0%, #7C3AED 45%, #EC4899 100%);"
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

								<div class="relative z-10 max-w-2xl">
									<div
										class="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 sm:mb-4"
										class:text-xs={deviceView === 'mobile'}
										class:text-sm={deviceView !== 'mobile'}
									>
										✨ Beauty Mall chính hãng
									</div>

									<h1
										class="mb-2 leading-tight font-bold sm:mb-3"
										class:text-2xl={deviceView === 'mobile'}
										class:text-3xl={deviceView === 'tablet'}
										class:text-4xl={deviceView === 'desktop'}
										class:lg:text-5xl={deviceView === 'desktop'}
									>
										Làm đẹp mỗi ngày
										<span class="block">mua sắm kiểu hiện đại</span>
									</h1>

									<p
										class="mb-4 max-w-xl leading-relaxed text-white/90 sm:mb-6"
										class:text-xs={deviceView === 'mobile'}
										class:text-sm={deviceView === 'tablet'}
										class:text-base={deviceView === 'desktop'}
									>
										Skincare, makeup, haircare, perfume và hàng ngàn deal xinh mỗi ngày theo phong
										cách marketplace sáng, gọn và nổi bật.
									</p>

									<div class="flex flex-col gap-2 sm:flex-row sm:gap-3">
										<button
											class="rounded-2xl bg-white font-semibold shadow-lg"
											class:px-5={deviceView === 'mobile'}
											class:py-2.5={deviceView === 'mobile'}
											class:text-sm={deviceView === 'mobile'}
											class:px-6={deviceView !== 'mobile'}
											class:py-3={deviceView !== 'mobile'}
											class:text-base={deviceView !== 'mobile'}
											style="color: {primaryColor};"
										>
											Mua ngay
										</button>
										<button
											class="rounded-2xl border border-white/30 bg-white/10 font-medium"
											class:px-5={deviceView === 'mobile'}
											class:py-2.5={deviceView === 'mobile'}
											class:text-sm={deviceView === 'mobile'}
											class:px-6={deviceView !== 'mobile'}
											class:py-3={deviceView !== 'mobile'}
											class:text-base={deviceView !== 'mobile'}
										>
											Xem ưu đãi
										</button>
									</div>
								</div>
							</div>

							<div
								class="grid gap-3 sm:gap-4"
								class:grid-cols-2={deviceView === 'mobile'}
								class:sm:grid-cols-2={deviceView === 'tablet'}
								class:lg:grid-cols-1={deviceView === 'desktop'}
							>
								<div
									class="rounded-[1.5rem] border shadow-sm"
									class:p-4={deviceView === 'mobile'}
									class:p-5={deviceView !== 'mobile'}
									style="background-color: #fcfaff; border-color: #e9d5ff;"
								>
									<div
										class="mb-1"
										class:text-xs={deviceView === 'mobile'}
										class:text-sm={deviceView !== 'mobile'}
										style="color: {textMuted};"
									>
										Flash Sale
									</div>
									<div
										class="font-bold"
										class:text-xl={deviceView === 'mobile'}
										class:text-2xl={deviceView !== 'mobile'}
										style="color: {primaryColor};"
									>
										-50%
									</div>
									<div
										class="mt-2"
										class:text-xs={deviceView === 'mobile'}
										class:text-sm={deviceView !== 'mobile'}
										style="color: {textSecondary};"
									>
										Son môi, serum, mặt nạ
									</div>
								</div>

								<div
									class="rounded-[1.5rem] border shadow-sm"
									class:p-4={deviceView === 'mobile'}
									class:p-5={deviceView !== 'mobile'}
									style="background-color: #fcfaff; border-color: #e9d5ff;"
								>
									<div
										class="mb-1"
										class:text-xs={deviceView === 'mobile'}
										class:text-sm={deviceView !== 'mobile'}
										style="color: {textMuted};"
									>
										Miễn phí vận chuyển
									</div>
									<div
										class="font-bold"
										class:text-xl={deviceView === 'mobile'}
										class:text-2xl={deviceView !== 'mobile'}
										style="color: {primaryColor};"
									>
										Toàn quốc
									</div>
									<div
										class="mt-2"
										class:text-xs={deviceView === 'mobile'}
										class:text-sm={deviceView !== 'mobile'}
										style="color: {textSecondary};"
									>
										Đơn từ 299.000đ
									</div>
								</div>
							</div>
						</div>
					</section>

					<!-- Quick Categories -->
					<section class="px-4 py-3 sm:px-6 sm:py-4 lg:py-5">
						<div class="flex gap-2 overflow-x-auto sm:gap-3">
							{#each quickCategories as category (category?.id)}
								<div
									class="flex shrink-0 items-center gap-2 rounded-2xl border"
									class:px-3={deviceView === 'mobile'}
									class:py-2={deviceView === 'mobile'}
									class:px-4={deviceView !== 'mobile'}
									class:py-3={deviceView !== 'mobile'}
									style="background-color: #fff; border-color: #e9d5ff; color: {textSecondary};"
								>
									<span class:text-sm={deviceView === 'mobile'}>{category.icon}</span>
									<span
										class="font-medium"
										class:text-xs={deviceView === 'mobile'}
										class:text-sm={deviceView !== 'mobile'}
									>
										{category.name}
									</span>
								</div>
							{/each}
						</div>
					</section>

					<!-- Flash Deals Horizontal -->
					<section class="px-4 py-2 sm:px-6 sm:py-3 lg:py-4">
						<div
							class="rounded-[1.75rem] border shadow-sm"
							class:p-3={deviceView === 'mobile'}
							class:p-4={deviceView === 'tablet'}
							class:p-5={deviceView === 'desktop'}
							style="background-color: #ffffff; border-color: #e9d5ff;"
						>
							<div class="mb-3 flex items-center justify-between sm:mb-4">
								<h2
									class="font-semibold"
									class:text-base={deviceView === 'mobile'}
									class:text-lg={deviceView === 'tablet'}
									class:text-xl={deviceView === 'desktop'}
									style="color: {textPrimary};"
								>
									Flash Deals
								</h2>
								<span
									class="font-medium"
									class:text-xs={deviceView === 'mobile'}
									class:text-sm={deviceView !== 'mobile'}
									style="color: {primaryColor};"
								>
									Xem tất cả
								</span>
							</div>

							<div class="flex gap-3 overflow-x-auto pb-1 sm:gap-4">
								{#each flashDeals as item (item.id)}
									<div
										class="shrink-0 overflow-hidden rounded-[1.5rem] border"
										class:w-[150px]={deviceView === 'mobile'}
										class:w-[180px]={deviceView === 'tablet'}
										class:w-[220px]={deviceView === 'desktop'}
										style="background-color: #fcfaff; border-color: #ede9fe;"
									>
										<img
											src={item.image}
											alt={item.title}
											class="w-full object-cover"
											class:h-28={deviceView === 'mobile'}
											class:h-32={deviceView === 'tablet'}
											class:h-40={deviceView === 'desktop'}
										/>
										<div class:p-2.5={deviceView === 'mobile'} class:p-3={deviceView !== 'mobile'}>
											<div
												class="line-clamp-2 font-medium"
												class:min-h-[36px]={deviceView === 'mobile'}
												class:text-xs={deviceView === 'mobile'}
												class:min-h-[40px]={deviceView !== 'mobile'}
												class:text-sm={deviceView !== 'mobile'}
												style="color: {textPrimary};"
											>
												{item.title}
											</div>
											<div
												class="mt-2 font-bold"
												class:text-base={deviceView === 'mobile'}
												class:text-lg={deviceView !== 'mobile'}
												style="color: {primaryColor};"
											>
												{item.price}đ
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</section>

					<!-- Product Grid -->
					<section
						class="px-4 sm:px-6"
						class:py-5={deviceView === 'mobile'}
						class:py-6={deviceView === 'tablet'}
						class:py-12={deviceView === 'desktop'}
					>
						<div
							class:mb-4={deviceView === 'mobile'}
							class:mb-6={deviceView !== 'mobile'}
							class="flex items-center justify-between"
						>
							<div>
								<div
									class="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
									class:mb-2={deviceView === 'mobile'}
									class:mb-3={deviceView !== 'mobile'}
									class:text-xs={deviceView === 'mobile'}
									class:text-sm={deviceView !== 'mobile'}
									style="background-color: #faf5ff; color: {primaryColor};"
								>
									💜 Beauty picks
								</div>
								<h2
									class="font-semibold"
									class:text-lg={deviceView === 'mobile'}
									class:text-xl={deviceView === 'tablet'}
									class:text-2xl={deviceView === 'desktop'}
									class:sm:text-3xl={deviceView === 'desktop'}
									style="color: {textPrimary};"
								>
									Sản phẩm nổi bật
								</h2>
							</div>
						</div>

						<div
							class="grid sm:gap-6"
							class:gap-3={deviceView === 'mobile'}
							class:gap-4={deviceView !== 'mobile'}
							class:grid-cols-2={deviceView === 'mobile'}
							class:lg:grid-cols-3={deviceView === 'tablet'}
							class:lg:grid-cols-4={deviceView === 'desktop'}
						>
							{#each products.slice(0, deviceView === 'mobile' ? 4 : 8) as product (product.id)}
								<div
									class="group overflow-hidden rounded-[1.5rem] border shadow-sm transition-all duration-300 hover:shadow-xl"
									style="background-color: #ffffff; border-color: #ede9fe;"
								>
									<div
										class="relative overflow-hidden"
										class:h-36={deviceView === 'mobile'}
										class:h-40={deviceView === 'tablet'}
										class:h-48={deviceView === 'desktop'}
										style="background-color: #faf5ff;"
									>
										<img
											src={product.image}
											alt={product.name}
											class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										/>

										<div
											class="absolute rounded-full font-bold text-white shadow"
											class:top-2={deviceView === 'mobile'}
											class:left-2={deviceView === 'mobile'}
											class:px-2={deviceView === 'mobile'}
											class:py-0.5={deviceView === 'mobile'}
											class:text-[10px]={deviceView === 'mobile'}
											class:top-3={deviceView !== 'mobile'}
											class:left-3={deviceView !== 'mobile'}
											class:px-2.5={deviceView !== 'mobile'}
											class:py-1={deviceView !== 'mobile'}
											class:text-xs={deviceView !== 'mobile'}
											style="background: linear-gradient(135deg, {primaryColor} 0%, #8B5CF6 100%);"
										>
											{product.tag}
										</div>
									</div>

									<div
										class:p-2.5={deviceView === 'mobile'}
										class:p-3={deviceView === 'tablet'}
										class:p-4={deviceView === 'desktop'}
									>
										<h3
											class="line-clamp-2 font-medium"
											class:min-h-[36px]={deviceView === 'mobile'}
											class:text-xs={deviceView === 'mobile'}
											class:min-h-[40px]={deviceView === 'tablet'}
											class:text-sm={deviceView === 'tablet'}
											class:min-h-[48px]={deviceView === 'desktop'}
											class:text-base={deviceView === 'desktop'}
											style="color: {textPrimary};"
										>
											{product.name}
										</h3>

										<div
											class="flex items-center gap-2"
											class:mt-2={deviceView === 'mobile'}
											class:mt-3={deviceView !== 'mobile'}
											class:text-[10px]={deviceView === 'mobile'}
											class:text-xs={deviceView !== 'mobile'}
											style="color: {textMuted};"
										>
											<span>⭐ {product.rating}</span>
											<span>•</span>
											<span class:hidden={deviceView === 'mobile'}>Đã bán {product.sold}</span>
											<span
												class:inline={deviceView === 'mobile'}
												class:hidden={deviceView !== 'mobile'}>{product.sold}</span
											>
										</div>

										<div class:mt-2={deviceView === 'mobile'} class:mt-3={deviceView !== 'mobile'}>
											<div
												class="font-bold"
												class:text-base={deviceView === 'mobile'}
												class:text-lg={deviceView === 'tablet'}
												class:text-xl={deviceView === 'desktop'}
												style="color: {primaryColor};"
											>
												{product.price}đ
											</div>
											<div
												class="line-through"
												class:text-[10px]={deviceView === 'mobile'}
												class:text-xs={deviceView === 'tablet'}
												class:text-sm={deviceView === 'desktop'}
												style="color: #a1a1aa;"
											>
												{product.oldPrice}đ
											</div>
										</div>

										<div
											class="flex gap-2"
											class:mt-3={deviceView === 'mobile'}
											class:mt-4={deviceView !== 'mobile'}
										>
											<button
												class="flex-1 rounded-xl font-semibold text-white"
												class:py-2={deviceView === 'mobile'}
												class:text-xs={deviceView === 'mobile'}
												class:py-2.5={deviceView !== 'mobile'}
												class:text-sm={deviceView !== 'mobile'}
												style="background: linear-gradient(135deg, {primaryColor} 0%, #8B5CF6 100%);"
											>
												Mua ngay
											</button>
											<button
												class="rounded-xl border"
												class:px-2.5={deviceView === 'mobile'}
												class:py-2={deviceView === 'mobile'}
												class:px-3={deviceView !== 'mobile'}
												class:py-2.5={deviceView !== 'mobile'}
												style="background-color: #faf5ff; border-color: #e9d5ff; color: {primaryColor};"
											>
												🛒
											</button>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<!-- CTA -->
					<section class="px-4 py-8 sm:px-6 sm:py-10">
						<div
							class="rounded-[2rem] p-6 sm:p-10"
							style="background: linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%);"
						>
							<div
								class="grid items-center gap-6 sm:gap-8"
								class:lg:grid-cols-[1.15fr_0.85fr]={deviceView === 'desktop'}
							>
								<div>
									<div class="mb-3 text-xs tracking-[0.25em] uppercase" style="color: {textMuted};">
										Beauty marketplace
									</div>
									<h3
										class="mb-4 font-semibold"
										class:text-xl={deviceView === 'mobile'}
										class:text-2xl={deviceView === 'tablet'}
										class:text-3xl={deviceView === 'desktop'}
										style="color: {textPrimary};"
									>
										Structure mới, sáng hơn và hợp ecommerce làm đẹp hơn
									</h3>
									<p
										class="mb-5 leading-relaxed"
										class:text-sm={deviceView === 'mobile'}
										class:text-base={deviceView !== 'mobile'}
										style="color: {textSecondary};"
									>
										Layout này ít "nặng sàn" hơn bản trước, nhìn hiện đại hơn, dễ scale tiếp thành
										homepage hoặc landing page beauty marketplace.
									</p>

									<button
										class="rounded-2xl px-6 py-3 font-semibold text-white shadow-md"
										class:text-sm={deviceView === 'mobile'}
										class:text-base={deviceView !== 'mobile'}
										style="background: linear-gradient(135deg, {primaryColor} 0%, #8B5CF6 100%);"
									>
										Dùng giao diện này
									</button>
								</div>

								<div
									class="rounded-[1.5rem] border p-5 shadow-lg sm:p-6"
									style="background-color: #ffffff; border-color: #e9d5ff;"
								>
									<div class="mb-2 text-sm" style="color: {textMuted};">Điểm nổi bật</div>
									<ul
										class="space-y-3"
										class:text-sm={deviceView === 'mobile'}
										class:text-base={deviceView !== 'mobile'}
										style="color: {textSecondary};"
									>
										<li class="flex items-start gap-2">
											<span
												class="mt-1 h-2 w-2 shrink-0 rounded-full"
												style="background-color: {primaryColor};"
											></span>
											Hero 2 cột sáng và gọn hơn
										</li>
										<li class="flex items-start gap-2">
											<span
												class="mt-1 h-2 w-2 shrink-0 rounded-full"
												style="background-color: {primaryColor};"
											></span>
											Flash deals ngang giống app hiện đại
										</li>
										<li class="flex items-start gap-2">
											<span
												class="mt-1 h-2 w-2 shrink-0 rounded-full"
												style="background-color: {primaryColor};"
											></span>
											Giữ nguyên 2 màu tím và nền sáng
										</li>
									</ul>
								</div>
							</div>
						</div>
					</section>

					<!-- Footer -->
					<footer
						class="py-8 sm:py-10"
						style="background: linear-gradient(135deg, {primaryColor} 0%, #7C3AED 100%);"
					>
						<div class="px-4 sm:px-6">
							<div
								class="mb-6 grid gap-6 sm:mb-8 sm:gap-8"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-2={deviceView === 'tablet'}
								class:md:grid-cols-4={deviceView === 'desktop'}
							>
								<!-- Company Info -->
								<div>
									<div class="mb-3 flex items-center gap-2 sm:mb-4">
										<div
											class="flex h-10 w-10 items-center justify-center rounded-xl font-bold"
											style="background-color: rgba(255, 255, 255, 0.2);"
										>
											<span class="text-white">LZ</span>
										</div>
										<h4
											class="font-bold text-white"
											class:text-base={deviceView === 'mobile'}
											class:text-lg={deviceView !== 'mobile'}
										>
											Beauty Ecom
										</h4>
									</div>
									<p
										class="leading-relaxed text-white/80"
										class:text-xs={deviceView === 'mobile'}
										class:text-sm={deviceView !== 'mobile'}
									>
										Marketplace làm đẹp hàng đầu Việt Nam với hàng ngàn sản phẩm chính hãng
									</p>
								</div>

								<!-- Quick Links -->
								<div>
									<h4
										class="mb-3 font-bold text-white sm:mb-4"
										class:text-sm={deviceView === 'mobile'}
										class:text-base={deviceView !== 'mobile'}
									>
										Liên kết nhanh
									</h4>
									<ul
										class="space-y-2"
										class:text-xs={deviceView === 'mobile'}
										class:text-sm={deviceView !== 'mobile'}
									>
										<li>
											<span class="cursor-pointer text-white/80 transition-colors hover:text-white"
												>Giới thiệu</span
											>
										</li>
										<li>
											<span class="cursor-pointer text-white/80 transition-colors hover:text-white"
												>Sản phẩm</span
											>
										</li>
										<li>
											<span class="cursor-pointer text-white/80 transition-colors hover:text-white"
												>Flash Sale</span
											>
										</li>
										<li>
											<span class="cursor-pointer text-white/80 transition-colors hover:text-white"
												>Ưu đãi</span
											>
										</li>
									</ul>
								</div>

								<!-- Categories -->
								<div>
									<h4
										class="mb-3 font-bold text-white sm:mb-4"
										class:text-sm={deviceView === 'mobile'}
										class:text-base={deviceView !== 'mobile'}
									>
										Danh mục
									</h4>
									<ul
										class="space-y-2"
										class:text-xs={deviceView === 'mobile'}
										class:text-sm={deviceView !== 'mobile'}
									>
										<li>
											<span class="cursor-pointer text-white/80 transition-colors hover:text-white"
												>Skincare</span
											>
										</li>
										<li>
											<span class="cursor-pointer text-white/80 transition-colors hover:text-white"
												>Makeup</span
											>
										</li>
										<li>
											<span class="cursor-pointer text-white/80 transition-colors hover:text-white"
												>Haircare</span
											>
										</li>
										<li>
											<span class="cursor-pointer text-white/80 transition-colors hover:text-white"
												>Perfume</span
											>
										</li>
									</ul>
								</div>

								<!-- Contact -->
								<div>
									<h4
										class="mb-3 font-bold text-white sm:mb-4"
										class:text-sm={deviceView === 'mobile'}
										class:text-base={deviceView !== 'mobile'}
									>
										Liên hệ
									</h4>
									<ul
										class="space-y-2 text-white/80"
										class:text-xs={deviceView === 'mobile'}
										class:text-sm={deviceView !== 'mobile'}
									>
										<li class="flex items-start gap-2">
											<span class="shrink-0">📞</span>
											<span>1900 xxxx</span>
										</li>
										<li class="flex items-start gap-2">
											<span class="shrink-0">📧</span>
											<span>support@beautyecom.vn</span>
										</li>
										<li class="flex items-start gap-2">
											<span class="shrink-0">📍</span>
											<span>Hà Nội, Việt Nam</span>
										</li>
										<li class="flex items-center gap-3 pt-2">
											<span class="cursor-pointer text-xl transition-transform hover:scale-110"
												>🌐</span
											>
											<span class="cursor-pointer text-xl transition-transform hover:scale-110"
												>📱</span
											>
											<span class="cursor-pointer text-xl transition-transform hover:scale-110"
												>💬</span
											>
										</li>
									</ul>
								</div>
							</div>

							<!-- Bottom Bar -->
							<div class="border-t border-white/20 pt-4 sm:pt-6">
								<div class="flex flex-col items-center justify-between gap-3 sm:flex-row">
									<p
										class="text-center text-white/70 sm:text-left"
										class:text-xs={deviceView === 'mobile'}
										class:text-sm={deviceView !== 'mobile'}
									>
										&copy; 2024 Beauty Ecom. All rights reserved.
									</p>
									<div
										class="flex flex-wrap justify-center gap-4"
										class:text-xs={deviceView === 'mobile'}
										class:text-sm={deviceView !== 'mobile'}
									>
										<span class="cursor-pointer text-white/70 transition-colors hover:text-white"
											>Điều khoản</span
										>
										<span class="text-white/40">•</span>
										<span class="cursor-pointer text-white/70 transition-colors hover:text-white"
											>Bảo mật</span
										>
										<span class="text-white/40">•</span>
										<span class="cursor-pointer text-white/70 transition-colors hover:text-white"
											>Chính sách</span
										>
									</div>
								</div>
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
						placeholder="#5B21B6"
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
						placeholder="#F8F4FF"
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
</style>
