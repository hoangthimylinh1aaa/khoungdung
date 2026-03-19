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
	const panelBg = '#ffffff';

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

	const categories = [
		{ id: 1, name: 'Skincare', icon: '🧴' },
		{ id: 2, name: 'Makeup', icon: '💄' },
		{ id: 3, name: 'Haircare', icon: '💇' },
		{ id: 4, name: 'Perfume', icon: '🌸' },
		{ id: 5, name: 'Bodycare', icon: '🫧' },
		{ id: 6, name: 'Nails', icon: '💅' },
		{ id: 7, name: 'Tools', icon: '🪞' },
		{ id: 8, name: 'Gift Set', icon: '🎁' }
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

<div class="min-h-screen" style="background-color: {secondaryColor};">
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
	<header class="sticky top-0 z-20 border-b bg-white shadow-sm" style="border-color: #e9d5ff;">
		<div class="px-4 py-4 sm:px-6">
			<div class="flex items-center gap-3 sm:gap-4">
				<div
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-bold text-white"
					style="background: linear-gradient(135deg, {primaryColor} 0%, #8B5CF6 100%);"
				>
					LZ
				</div>

				<div class="hidden min-w-[140px] sm:block">
					<div class="text-lg font-bold" style="color: {primaryColor};">Beauty Ecom</div>
					<div class="text-[10px] tracking-[0.2em]" style="color: {textMuted};">
						BEAUTY ECOMMERCE
					</div>
				</div>

				<div class="relative flex-1">
					<input
						type="text"
						placeholder="Tìm serum, son môi, kem chống nắng..."
						class="w-full rounded-2xl border px-4 py-3 pr-24 text-sm outline-none"
						style="border-color: #d8b4fe; color: {textPrimary}; background-color: #fff;"
					/>
					<button
						class="absolute top-1.5 right-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white"
						style="background: linear-gradient(135deg, {primaryColor} 0%, #8B5CF6 100%);"
					>
						Tìm
					</button>
				</div>

				<div class="flex shrink-0 items-center gap-2">
					<button
						class="h-11 w-11 rounded-2xl border text-lg"
						style="background-color: #faf5ff; border-color: #e9d5ff; color: {primaryColor};"
					>
						❤️
					</button>
					<button
						class="h-11 w-11 rounded-2xl border text-lg"
						style="background-color: #faf5ff; border-color: #e9d5ff; color: {primaryColor};"
					>
						🛒
					</button>
				</div>
			</div>
		</div>
	</header>

	<!-- Hero -->
	<section class="px-4 pt-5 sm:px-6 sm:pt-6">
		<div class="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
			<div
				class="relative overflow-hidden rounded-[2rem] p-6 text-white sm:p-8"
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
						class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs sm:text-sm"
					>
						✨ Beauty Mall chính hãng
					</div>

					<h1 class="mb-3 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
						Làm đẹp mỗi ngày
						<span class="block">mua sắm kiểu hiện đại</span>
					</h1>

					<p class="mb-6 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
						Skincare, makeup, haircare, perfume và hàng ngàn deal xinh mỗi ngày theo phong cách
						marketplace sáng, gọn và nổi bật.
					</p>

					<div class="flex flex-col gap-3 sm:flex-row">
						<button
							class="rounded-2xl bg-white px-6 py-3 font-semibold shadow-lg"
							style="color: {primaryColor};"
						>
							Mua ngay
						</button>
						<button class="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 font-medium">
							Xem ưu đãi
						</button>
					</div>
				</div>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
				<div
					class="rounded-[1.5rem] border p-5 shadow-sm"
					style="background-color: #fcfaff; border-color: #e9d5ff;"
				>
					<div class="mb-1 text-sm" style="color: {textMuted};">Flash Sale</div>
					<div class="text-2xl font-bold" style="color: {primaryColor};">-50%</div>
					<div class="mt-2 text-sm" style="color: {textSecondary};">Son môi, serum, mặt nạ</div>
				</div>

				<div
					class="rounded-[1.5rem] border p-5 shadow-sm"
					style="background-color: #fcfaff; border-color: #e9d5ff;"
				>
					<div class="mb-1 text-sm" style="color: {textMuted};">Miễn phí vận chuyển</div>
					<div class="text-2xl font-bold" style="color: {primaryColor};">Toàn quốc</div>
					<div class="mt-2 text-sm" style="color: {textSecondary};">Đơn từ 299.000đ</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Quick Categories -->
	<section class="px-4 py-4 sm:px-6 sm:py-5">
		<div class="flex gap-3 overflow-x-auto">
			{#each quickCategories as category}
				<div
					class="flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-3"
					style="background-color: #fff; border-color: #e9d5ff; color: {textSecondary};"
				>
					<span>{category.icon}</span>
					<span class="text-sm font-medium">{category.name}</span>
				</div>
			{/each}
		</div>
	</section>

	<!-- Flash Deals Horizontal -->
	<section class="px-4 py-2 sm:px-6 sm:py-4">
		<div
			class="rounded-[1.75rem] border p-4 shadow-sm sm:p-5"
			style="background-color: #ffffff; border-color: #e9d5ff;"
		>
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-lg font-semibold sm:text-xl" style="color: {textPrimary};">Flash Deals</h2>
				<span class="text-sm font-medium" style="color: {primaryColor};">Xem tất cả</span>
			</div>

			<div class="flex gap-4 overflow-x-auto pb-1">
				{#each flashDeals as item}
					<div
						class="w-[180px] shrink-0 overflow-hidden rounded-[1.5rem] border sm:w-[220px]"
						style="background-color: #fcfaff; border-color: #ede9fe;"
					>
						<img src={item.image} alt={item.title} class="h-32 w-full object-cover sm:h-40" />
						<div class="p-3">
							<div
								class="line-clamp-2 min-h-[40px] text-sm font-medium"
								style="color: {textPrimary};"
							>
								{item.title}
							</div>
							<div class="mt-2 text-lg font-bold" style="color: {primaryColor};">{item.price}đ</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Product Grid -->
	<section class="px-4 py-8 sm:px-6 sm:py-12">
		<div class="mb-6 flex items-center justify-between">
			<div>
				<div
					class="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:text-sm"
					style="background-color: #faf5ff; color: {primaryColor};"
				>
					💜 Beauty picks
				</div>
				<h2 class="text-2xl font-semibold sm:text-3xl" style="color: {textPrimary};">
					Sản phẩm nổi bật
				</h2>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
			{#each products as product}
				<div
					class="group overflow-hidden rounded-[1.5rem] border shadow-sm transition-all duration-300 hover:shadow-xl"
					style="background-color: #ffffff; border-color: #ede9fe;"
				>
					<div class="relative h-40 overflow-hidden sm:h-48" style="background-color: #faf5ff;">
						<img
							src={product.image}
							alt={product.name}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>

						<div
							class="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-white shadow sm:text-xs"
							style="background: linear-gradient(135deg, {primaryColor} 0%, #8B5CF6 100%);"
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
								style="background: linear-gradient(135deg, {primaryColor} 0%, #8B5CF6 100%);"
							>
								Mua ngay
							</button>
							<button
								class="rounded-xl border px-3 py-2.5"
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
	<section class="px-4 pb-10 sm:px-6 sm:pb-16">
		<div
			class="rounded-[2rem] p-6 sm:p-10"
			style="background: linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%);"
		>
			<div class="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
				<div>
					<div class="mb-3 text-xs tracking-[0.25em] uppercase" style="color: {textMuted};">
						Beauty marketplace
					</div>
					<h3 class="mb-4 text-2xl font-semibold sm:text-3xl" style="color: {textPrimary};">
						Structure mới, sáng hơn và hợp ecommerce làm đẹp hơn
					</h3>
					<p class="mb-5 text-sm leading-relaxed sm:text-base" style="color: {textSecondary};">
						Layout này ít “nặng sàn” hơn bản trước, nhìn hiện đại hơn, dễ scale tiếp thành homepage
						hoặc landing page beauty marketplace.
					</p>

					<button
						class="rounded-2xl px-6 py-3 font-semibold text-white shadow-md"
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
					<ul class="space-y-3 text-sm" style="color: {textSecondary};">
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full" style="background-color: {primaryColor};"
							></span>
							Hero 2 cột sáng và gọn hơn
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full" style="background-color: {primaryColor};"
							></span>
							Flash deals ngang giống app hiện đại
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full" style="background-color: {primaryColor};"
							></span>
							Giữ nguyên 2 màu tím và nền sáng
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
