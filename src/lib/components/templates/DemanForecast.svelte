<script lang="ts">
	import {
		Monitor,
		Smartphone,
		Tablet,
		Palette,
		X,
		Brain,
		ChartColumn,
		Boxes
	} from '@lucide/svelte';
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

	// Theme mới: AI / forecasting / data-tech
	export let primaryColor: string = '#2563EB';
	export let secondaryColor: string = '#EEF4FF';

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

	const textPrimary = '#0F172A';
	const textSecondary = '#334155';
	const textMuted = '#64748B';
	const panelBg = '#FFFFFF';
	const borderSoft = '#D6E4FF';
	const accentSoft = '#DBEAFE';
	const successColor = '#14B8A6';
	const warningColor = '#8B5CF6';

	const industries = [
		{ id: 1, name: 'Bán lẻ', icon: '🛒' },
		{ id: 2, name: 'FMCG', icon: '📦' },
		{ id: 3, name: 'Chuỗi cung ứng', icon: '🚚' },
		{ id: 4, name: 'Sản xuất', icon: '🏭' },
		{ id: 5, name: 'Dược phẩm', icon: '💊' },
		{ id: 6, name: 'Thời trang', icon: '👕' },
		{ id: 7, name: 'Nông nghiệp', icon: '🌾' },
		{ id: 8, name: 'Thương mại điện tử', icon: '💻' }
	];

	const features = [
		{
			id: 1,
			title: 'Dự báo theo SKU',
			desc: 'Ước tính nhu cầu chi tiết theo từng sản phẩm, cửa hàng và khu vực.',
			icon: '📈'
		},
		{
			id: 2,
			title: 'Phát hiện bất thường',
			desc: 'Nhận diện spike theo mùa vụ, chiến dịch hoặc đứt gãy nguồn cung.',
			icon: '⚠️'
		},
		{
			id: 3,
			title: 'Mô phỏng tồn kho',
			desc: 'Đề xuất mức tồn kho an toàn và cảnh báo nguy cơ thiếu hàng.',
			icon: '📦'
		},
		{
			id: 4,
			title: 'Tự động cập nhật',
			desc: 'Mô hình học từ dữ liệu mới để cải thiện độ chính xác liên tục.',
			icon: '🤖'
		}
	];

	const useCases = [
		{
			id: 1,
			name: 'Forecast Retail 360',
			score: '97.2%',
			tag: 'Top accuracy',
			desc: 'Dự báo nhu cầu theo cửa hàng, danh mục và vùng địa lý.'
		},
		{
			id: 2,
			name: 'Promo Demand Optimizer',
			score: '31%',
			tag: 'Inventory saved',
			desc: 'Ước tính tác động khuyến mãi lên sell-out và mức tồn kho.'
		},
		{
			id: 3,
			name: 'Supply Pulse AI',
			score: 'Realtime',
			tag: 'Live signals',
			desc: 'Kết hợp POS, ERP và dữ liệu thị trường để điều chỉnh forecast.'
		},
		{
			id: 4,
			name: 'Seasonality Planner',
			score: '-22%',
			tag: 'Stockout reduced',
			desc: 'Phân tích mùa vụ, lịch sử bán hàng và xu hướng để lên kế hoạch.'
		},
		{
			id: 5,
			name: 'Multi-warehouse Planner',
			score: '18 ngày',
			tag: 'Lead time view',
			desc: 'Phân bổ hàng hóa thông minh giữa nhiều kho và điểm bán.'
		},
		{
			id: 6,
			name: 'Executive Forecast Hub',
			score: '1 dashboard',
			tag: 'C-level ready',
			desc: 'Tổng hợp KPI, confidence interval và rủi ro theo thời gian thực.'
		}
	];

	const kpis = [
		{ label: 'Độ chính xác dự báo', value: '96.4%', sub: '+12% so với rule-based' },
		{ label: 'Giảm thiếu hàng', value: '28%', sub: 'Theo chu kỳ 3 tháng' },
		{ label: 'Tối ưu tồn kho', value: '19%', sub: 'Giảm hàng tồn chậm luân chuyển' },
		{ label: 'Tốc độ cập nhật', value: '< 5 phút', sub: 'Từ dữ liệu mới lên dashboard' }
	];

	const timeline = [
		{ month: 'Tuần 1', demand: 62, stock: 75, confidence: 'Cao' },
		{ month: 'Tuần 2', demand: 74, stock: 69, confidence: 'Cao' },
		{ month: 'Tuần 3', demand: 88, stock: 63, confidence: 'Trung bình' },
		{ month: 'Tuần 4', demand: 97, stock: 58, confidence: 'Trung bình' }
	];

	function setDevice(device: 'mobile' | 'tablet' | 'desktop') {
		deviceView = device;
	}

	$: primaryColor = selectedPrimary;
	$: secondaryColor = selectedSecondary;

	function resetColors() {
		selectedPrimary = '#2563EB';
		selectedSecondary = '#EEF4FF';
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
	<div class="flex-1 overflow-y-auto bg-slate-950 px-4 py-20 lg:px-8 lg:py-24">
		<!-- Device Switcher -->
		<div class="mb-6 flex justify-center">
			<div class="inline-flex items-center gap-1 rounded-lg bg-slate-900 p-1.5 sm:gap-2 sm:p-2">
				<button
					on:click={() => setDevice('mobile')}
					class="flex items-center gap-1 rounded-md px-2 py-2 transition-all duration-200 sm:gap-2 sm:px-4"
					style="background-color: {deviceView === 'mobile'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'mobile' ? '#ffffff' : '#94a3b8'}"
				>
					<Smartphone size={16} class="sm:h-[18px] sm:w-[18px]" />
					<span class="text-xs font-medium sm:text-sm">Mobile</span>
				</button>

				<button
					on:click={() => setDevice('tablet')}
					class="hidden items-center gap-1 rounded-md px-2 py-2 transition-all duration-200 sm:flex sm:gap-2 sm:px-4"
					style="background-color: {deviceView === 'tablet'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'tablet' ? '#ffffff' : '#94a3b8'}"
				>
					<Tablet size={16} class="sm:h-[18px] sm:w-[18px]" />
					<span class="text-xs font-medium sm:text-sm">Tablet</span>
				</button>

				<button
					on:click={() => setDevice('desktop')}
					class="hidden items-center gap-1 rounded-md px-2 py-2 transition-all duration-200 sm:gap-2 sm:px-4 xl:flex"
					style="background-color: {deviceView === 'desktop'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'desktop' ? '#ffffff' : '#94a3b8'}"
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
						style="background: linear-gradient(90deg, {primaryColor} 0%, #0f172a 100%);"
					>
						<div class="flex items-center justify-between gap-3">
							<div class="flex items-center gap-3 overflow-hidden sm:gap-5">
								<span class="whitespace-nowrap">🤖 AI Forecast Engine đang hoạt động</span>
								{#if deviceView !== 'mobile'}
									<span class="whitespace-nowrap">📊 Live demand signals mỗi 5 phút</span>
									<span class="whitespace-nowrap">⚡ Tăng độ chính xác cho planning</span>
								{/if}
							</div>
							<div class="whitespace-nowrap">Dành cho Retail / FMCG / Supply Chain</div>
						</div>
					</div>

					<!-- Main header -->
					<header class="sticky top-0 z-20 bg-white/95 shadow-sm backdrop-blur-md">
						<div class="border-b px-4 py-3 sm:px-6" style="border-color: {borderSoft};">
							<div
								class="grid items-center gap-3"
								style:grid-template-columns={deviceView === 'desktop'
									? '240px 1fr 190px'
									: deviceView === 'tablet'
										? '200px 1fr 120px'
										: '1fr'}
							>
								<div class="flex items-center gap-3">
									<div
										class="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-md"
										style="background: linear-gradient(135deg, {primaryColor} 0%, {warningColor} 100%);"
									>
										<Brain size={20} />
									</div>
									<div>
										<div class="text-lg font-bold sm:text-xl" style="color: {primaryColor};">
											DemandAI
										</div>
										<div
											class="text-[9px] tracking-[0.2em] sm:text-[10px]"
											style="color: {textMuted};"
										>
											AI DEMAND FORECASTING PLATFORM
										</div>
									</div>
								</div>

								<div class="relative">
									<input
										type="text"
										placeholder="Tìm use case, ngành hàng, SKU, dashboard forecasting..."
										class="w-full rounded-2xl border px-4 py-3 pr-28 text-sm outline-none"
										style="background-color: {panelBg}; border-color: {borderSoft}; color: {textPrimary};"
									/>
								</div>

								{#if deviceView !== 'mobile'}
									<div class="flex justify-center gap-2">
										<div
											class="rounded-2xl border px-4 py-3 text-xs whitespace-nowrap"
											style="background-color: #F8FAFC; border-color: {borderSoft}; color: {textPrimary};"
										>
											📌 Book Demo
										</div>
									</div>
								{/if}
							</div>
						</div>

						<div class="px-4 py-2 sm:px-6" style="background-color: #F8FBFF;">
							<div
								class="flex gap-4 overflow-x-auto text-xs whitespace-nowrap sm:gap-6 sm:text-sm"
								style="color: {textSecondary};"
							>
								<span>Dự báo nhu cầu</span>
								<span>Tối ưu tồn kho</span>
								<span>Promotion planning</span>
								<span>Demand sensing</span>
								<span>Executive dashboard</span>
								<span>AI recommendation</span>
							</div>
						</div>
					</header>

					<!-- Hero -->
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
									style="background-color: #FFFFFF; border-color: {borderSoft};"
								>
									<div class="mb-3 font-semibold" style="color: {textPrimary};">Ngành áp dụng</div>
									<div class="space-y-2">
										{#each industries as industry}
											<div
												class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
												style="color: {textSecondary}; background-color: #F8FBFF;"
											>
												<span>{industry.icon}</span>
												<span class="text-sm">{industry.name}</span>
											</div>
										{/each}
									</div>
								</div>
							{/if}

							<div
								class="relative min-h-[300px] overflow-hidden rounded-[2rem] p-6 sm:min-h-[360px] sm:p-8"
								style="background:
								radial-gradient(circle at top left, rgba(255,255,255,0.18) 0%, transparent 30%),
								linear-gradient(135deg, {primaryColor} 0%, {warningColor} 55%, #0f172a 100%);"
							>
								<div class="absolute inset-0 opacity-10">
									<div
										class="h-full w-full"
										style="background-image:
										linear-gradient(to right, white 1px, transparent 1px),
										linear-gradient(to bottom, white 1px, transparent 1px);
										background-size: 28px 28px;"
									></div>
								</div>

								<div class="relative z-10 max-w-2xl text-white">
									<div
										class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs sm:text-sm"
									>
										<ChartColumn size={14} />
										Forecasting · Inventory · Planning
									</div>

									<h1
										class="mb-3 leading-tight font-bold"
										class:text-3xl={deviceView === 'mobile'}
										class:text-4xl={deviceView === 'tablet'}
										class:text-5xl={deviceView === 'desktop'}
									>
										Ứng dụng AI
										<span class="block">về dự báo nhu cầu</span>
									</h1>

									<p
										class="mb-6 leading-relaxed text-white/95"
										class:text-sm={deviceView === 'mobile'}
										class:text-base={deviceView !== 'mobile'}
									>
										Phân tích dữ liệu bán hàng, mùa vụ, khuyến mãi và tín hiệu thị trường để dự báo
										nhu cầu chính xác hơn, tối ưu tồn kho và hỗ trợ quyết định mua hàng.
									</p>

									<div class="flex flex-col gap-3 sm:flex-row">
										<button
											class="rounded-2xl bg-white px-6 py-3 text-sm font-semibold shadow-lg sm:text-base"
											style="color: {primaryColor};"
										>
											Xem demo nền tảng
										</button>
										<button
											class="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium sm:text-base"
										>
											Khám phá use cases
										</button>
									</div>
								</div>

								<div
									class="absolute right-5 bottom-5 max-w-[220px] rounded-2xl bg-white/92 p-4 shadow-lg backdrop-blur-md"
								>
									<div class="mb-1 text-xs" style="color: {textMuted};">Forecast confidence</div>
									<div class="mb-1 font-semibold" style="color: {textPrimary};">
										Cao ở 18/24 SKU chủ lực
									</div>
									<div class="text-sm font-semibold" style="color: {primaryColor};">
										Cảnh báo thiếu hàng tuần 4
									</div>
								</div>
							</div>

							{#if deviceView !== 'mobile'}
								<div class="grid gap-4">
									<div
										class="rounded-[1.5rem] border p-5 shadow-sm"
										style="background-color: #FFFFFF; border-color: {borderSoft};"
									>
										<div class="mb-1 text-sm" style="color: {textMuted};">Forecast Accuracy</div>
										<div class="text-2xl font-bold" style="color: {primaryColor};">96.4%</div>
										<div class="mt-2 text-sm" style="color: {textSecondary};">
											Trên nhóm SKU chiến lược
										</div>
									</div>

									<div
										class="rounded-[1.5rem] border p-5 shadow-sm"
										style="background-color: #FFFFFF; border-color: {borderSoft};"
									>
										<div class="mb-1 text-sm" style="color: {textMuted};">Stockout Reduction</div>
										<div class="text-2xl font-bold" style="color: {successColor};">-28%</div>
										<div class="mt-2 text-sm" style="color: {textSecondary};">
											Giảm thiếu hàng trong 3 tháng
										</div>
									</div>

									<div
										class="rounded-[1.5rem] border p-5 shadow-sm"
										style="background-color: #FFFFFF; border-color: {borderSoft};"
									>
										<div class="mb-1 text-sm" style="color: {textMuted};">Realtime Update</div>
										<div class="text-2xl font-bold" style="color: {warningColor};">&lt; 5 phút</div>
										<div class="mt-2 text-sm" style="color: {textSecondary};">
											Cập nhật từ tín hiệu mới
										</div>
									</div>
								</div>
							{/if}
						</div>
					</section>

					<!-- KPI -->
					<section class="px-4 py-4 sm:px-6">
						<div
							class="grid gap-3"
							class:grid-cols-2={deviceView === 'mobile'}
							class:grid-cols-4={deviceView !== 'mobile'}
						>
							{#each kpis as item}
								<div
									class="rounded-2xl border p-4 shadow-sm"
									style="background-color: #FFFFFF; border-color: {borderSoft};"
								>
									<div class="mb-1 text-xs" style="color: {textMuted};">{item.label}</div>
									<div class="text-xl font-bold" style="color: {primaryColor};">{item.value}</div>
									<div class="mt-1 text-xs" style="color: {textSecondary};">{item.sub}</div>
								</div>
							{/each}
						</div>
					</section>

					<!-- Feature section -->
					<section class="px-4 py-2 sm:px-6 sm:py-4">
						<div
							class="rounded-[1.75rem] border p-4 shadow-sm sm:p-5"
							style="background-color: #ffffff; border-color: {borderSoft};"
						>
							<div class="mb-4 flex items-center justify-between">
								<h2 class="text-lg font-semibold sm:text-xl" style="color: {textPrimary};">
									Năng lực chính của hệ thống
								</h2>
								<span class="text-sm font-medium" style="color: {primaryColor};">Xem kiến trúc</span
								>
							</div>

							<div
								class="grid gap-3"
								class:grid-cols-2={deviceView === 'mobile'}
								class:grid-cols-4={deviceView !== 'mobile'}
							>
								{#each features as feature}
									<div
										class="rounded-2xl border p-4 transition-all hover:shadow-sm"
										style="background-color: #F8FBFF; border-color: {accentSoft};"
									>
										<div class="mb-3 text-2xl">{feature.icon}</div>
										<div
											class="mb-1 text-sm font-semibold sm:text-base"
											style="color: {textPrimary};"
										>
											{feature.title}
										</div>
										<div
											class="text-[11px] leading-relaxed sm:text-sm"
											style="color: {textSecondary};"
										>
											{feature.desc}
										</div>
									</div>
								{/each}
							</div>
						</div>
					</section>

					<!-- Timeline / signals -->
					<section class="px-4 py-6 sm:px-6 sm:py-8">
						<div
							class="rounded-[1.75rem] border p-4 shadow-sm sm:p-6"
							style="background-color: #ffffff; border-color: {borderSoft};"
						>
							<div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<div
										class="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:text-sm"
										style="background-color: {accentSoft}; color: {primaryColor};"
									>
										<Boxes size={14} />
										Demand signal snapshot
									</div>
									<h2 class="text-2xl font-semibold sm:text-3xl" style="color: {textPrimary};">
										Biến động nhu cầu trong 4 tuần
									</h2>
								</div>

								{#if deviceView !== 'mobile'}
									<div class="flex gap-2">
										<button
											class="rounded-xl border px-4 py-2 text-sm"
											style="background-color: #ffffff; border-color: {borderSoft}; color: {textSecondary};"
										>
											Theo tuần
										</button>
										<button
											class="rounded-xl border px-4 py-2 text-sm"
											style="background-color: #ffffff; border-color: {borderSoft}; color: {textSecondary};"
										>
											Theo SKU
										</button>
										<button
											class="rounded-xl px-4 py-2 text-sm font-medium text-white"
											style="background-color: {primaryColor};"
										>
											Toàn hệ thống
										</button>
									</div>
								{/if}
							</div>

							<div
								class="grid gap-4"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-2={deviceView !== 'mobile'}
							>
								<div
									class="rounded-[1.5rem] border p-4"
									style="background-color: #F8FBFF; border-color: {accentSoft};"
								>
									<div class="mb-3 text-sm font-semibold" style="color: {textPrimary};">
										Chỉ số theo thời gian
									</div>

									<div class="space-y-4">
										{#each timeline as point}
											<div>
												<div class="mb-2 flex items-center justify-between text-xs sm:text-sm">
													<span style="color: {textPrimary};">{point.month}</span>
													<span style="color: {textMuted};">Confidence: {point.confidence}</span>
												</div>

												<div class="space-y-2">
													<div>
														<div class="mb-1 flex justify-between text-[11px] sm:text-xs">
															<span style="color: {textSecondary};">Demand</span>
															<span style="color: {primaryColor};">{point.demand}</span>
														</div>
														<div class="h-2 rounded-full bg-slate-200">
															<div
																class="h-2 rounded-full"
																style="width: {point.demand}%; background: linear-gradient(90deg, {primaryColor} 0%, {warningColor} 100%);"
															></div>
														</div>
													</div>

													<div>
														<div class="mb-1 flex justify-between text-[11px] sm:text-xs">
															<span style="color: {textSecondary};">Stock coverage</span>
															<span style="color: {successColor};">{point.stock}</span>
														</div>
														<div class="h-2 rounded-full bg-slate-200">
															<div
																class="h-2 rounded-full"
																style="width: {point.stock}%; background: linear-gradient(90deg, {successColor} 0%, #2dd4bf 100%);"
															></div>
														</div>
													</div>
												</div>
											</div>
										{/each}
									</div>
								</div>

								<div
									class="rounded-[1.5rem] border p-5"
									style="background:
									radial-gradient(circle at top right, rgba(37,99,235,0.08) 0%, transparent 28%),
									#ffffff; border-color: {borderSoft};"
								>
									<div class="mb-2 text-sm" style="color: {textMuted};">AI Insight</div>
									<div class="mb-4 text-xl font-bold sm:text-2xl" style="color: {textPrimary};">
										Nhu cầu tăng mạnh ở tuần 3–4 do tín hiệu khuyến mãi và mùa vụ.
									</div>
									<div class="space-y-3 text-sm" style="color: {textSecondary};">
										<div class="rounded-xl p-3" style="background-color: #F8FBFF;">
											• Khuyến nghị tăng tồn kho nhóm bán chạy thêm 12–18%
										</div>
										<div class="rounded-xl p-3" style="background-color: #F8FBFF;">
											• Ưu tiên replenishment cho khu vực urban store
										</div>
										<div class="rounded-xl p-3" style="background-color: #F8FBFF;">
											• Theo dõi SKU có confidence trung bình để điều chỉnh sớm
										</div>
									</div>

									<button
										class="mt-5 rounded-2xl px-5 py-3 text-sm font-semibold text-white"
										style="background: linear-gradient(135deg, {primaryColor} 0%, {warningColor} 100%);"
									>
										Xem toàn bộ insight
									</button>
								</div>
							</div>
						</div>
					</section>

					<!-- Use cases -->
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
										style="background-color: {accentSoft}; color: {primaryColor};"
									>
										🚀 Ứng dụng nổi bật
									</div>
									<h2
										class="font-semibold"
										class:text-2xl={deviceView === 'mobile'}
										class:text-3xl={deviceView !== 'mobile'}
										style="color: {textPrimary};"
									>
										Các mô-đun AI cho dự báo nhu cầu
									</h2>
								</div>

								{#if deviceView !== 'mobile'}
									<div class="flex gap-2">
										<button
											class="rounded-xl border px-4 py-2 text-sm"
											style="background-color: #ffffff; border-color: {borderSoft}; color: {textSecondary};"
										>
											Enterprise
										</button>
										<button
											class="rounded-xl border px-4 py-2 text-sm"
											style="background-color: #ffffff; border-color: {borderSoft}; color: {textSecondary};"
										>
											Operations
										</button>
										<button
											class="rounded-xl px-4 py-2 text-sm font-medium text-white"
											style="background-color: {primaryColor};"
										>
											Forecasting
										</button>
									</div>
								{/if}
							</div>

							<div
								class="grid gap-4 sm:gap-6"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-2={deviceView === 'tablet'}
								class:grid-cols-3={deviceView === 'desktop'}
							>
								{#each useCases as item (item.id)}
									<div
										class="group overflow-hidden rounded-[1.5rem] border shadow-sm transition-all duration-300 hover:shadow-xl"
										style="background-color: #ffffff; border-color: {borderSoft};"
									>
										<div
											class="relative overflow-hidden p-5"
											style="background:
											radial-gradient(circle at top left, rgba(255,255,255,0.18) 0%, transparent 30%),
											linear-gradient(135deg, {primaryColor} 0%, {warningColor} 100%);"
										>
											<div
												class="absolute top-3 left-3 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white shadow backdrop-blur-sm sm:text-xs"
											>
												{item.tag}
											</div>

											<div class="pt-8 text-white">
												<div class="mb-2 text-sm opacity-90">Module</div>
												<div class="text-xl font-semibold">{item.name}</div>
											</div>
										</div>

										<div class="p-4 sm:p-5">
											<div class="mb-3 text-2xl font-bold" style="color: {primaryColor};">
												{item.score}
											</div>

											<p
												class="min-h-[48px] text-sm leading-relaxed"
												style="color: {textSecondary};"
											>
												{item.desc}
											</p>

											<div class="mt-4 flex gap-2">
												<button
													class="flex-1 rounded-xl py-2.5 text-xs font-semibold text-white sm:text-sm"
													style="background: linear-gradient(135deg, {primaryColor} 0%, {warningColor} 100%);"
												>
													Xem chi tiết
												</button>
												<button
													class="rounded-xl border px-3 py-2.5"
													style="background-color: #F8FBFF; border-color: {borderSoft}; color: {primaryColor};"
												>
													📊
												</button>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</section>

					<!-- CTA -->
					<section class="px-4 pb-10 sm:px-6 sm:pb-16">
						<div class="mx-auto max-w-7xl">
							<div
								class="relative overflow-hidden rounded-[2rem] p-6 sm:p-10"
								style="background:
								radial-gradient(circle at top right, rgba(255,255,255,0.32) 0%, transparent 22%),
								linear-gradient(135deg, #EFF6FF 0%, #E9D5FF 100%);"
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
											AI for operations
										</div>
										<h3
											class="mb-4 text-2xl font-semibold sm:text-3xl"
											style="color: {textPrimary};"
										>
											Dùng AI để biến forecast thành hành động vận hành
										</h3>
										<p
											class="mb-5 text-sm leading-relaxed sm:text-base"
											style="color: {textSecondary};"
										>
											Giao diện này ưu tiên cảm giác hiện đại, dữ liệu rõ ràng, có chiều sâu về
											analytics và phù hợp với sản phẩm SaaS/AI dành cho doanh nghiệp.
										</p>

										<button
											class="rounded-2xl px-6 py-3 font-semibold text-white shadow-md transition-opacity hover:opacity-90"
											style="background: linear-gradient(135deg, {primaryColor} 0%, {warningColor} 100%);"
										>
											Sử dụng giao diện này
										</button>
									</div>

									<div
										class="rounded-[1.5rem] border p-5 shadow-lg sm:p-6"
										style="background-color: #ffffff; border-color: {borderSoft};"
									>
										<div class="mb-2 text-sm" style="color: {textMuted};">
											Điểm mạnh của bản redesign
										</div>
										<ul class="space-y-3 text-sm" style="color: {textSecondary};">
											<li class="flex items-start gap-2">
												<span
													class="mt-1 h-2 w-2 rounded-full"
													style="background-color: {primaryColor};"
												></span>
												Giữ nguyên logic `deviceView` như component gốc
											</li>
											<li class="flex items-start gap-2">
												<span
													class="mt-1 h-2 w-2 rounded-full"
													style="background-color: {primaryColor};"
												></span>
												Theme xanh dương - tím hiện đại, hợp AI/Data product
											</li>
											<li class="flex items-start gap-2">
												<span
													class="mt-1 h-2 w-2 rounded-full"
													style="background-color: {primaryColor};"
												></span>
												Responsive riêng cho mobile / tablet / desktop
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</section>

					<!-- Footer -->
					<footer class="border-t bg-white py-6 sm:py-10" style="border-color: {borderSoft};">
						<div class="mx-auto max-w-7xl px-4 sm:px-6">
							<div
								class="mb-6 grid gap-6 sm:mb-8 sm:gap-8"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-4={deviceView !== 'mobile'}
							>
								<div class:col-span-2={deviceView !== 'mobile'}>
									<div class="mb-3 flex items-center gap-3">
										<div
											class="flex h-10 w-10 items-center justify-center rounded-2xl text-white"
											style="background: linear-gradient(135deg, {primaryColor} 0%, {warningColor} 100%);"
										>
											<Brain size={18} />
										</div>
										<div>
											<div class="text-base font-bold sm:text-lg" style="color: {primaryColor};">
												DemandAI
											</div>
											<div class="text-[8px] tracking-[0.2em]" style="color: {textMuted};">
												AI DEMAND FORECASTING PLATFORM
											</div>
										</div>
									</div>

									<p
										class="max-w-sm text-xs leading-relaxed sm:text-sm"
										style="color: {textSecondary};"
									>
										Nền tảng AI hỗ trợ dự báo nhu cầu, tối ưu tồn kho và nâng cao chất lượng ra
										quyết định cho doanh nghiệp bán lẻ, FMCG và chuỗi cung ứng.
									</p>
								</div>

								<div>
									<h4
										class="mb-2 text-sm font-medium sm:mb-3 sm:text-base"
										style="color: {textPrimary};"
									>
										Sản phẩm
									</h4>
									<ul
										class="space-y-1 text-xs sm:space-y-2 sm:text-sm"
										style="color: {textSecondary};"
									>
										<li>Forecasting</li>
										<li>Inventory</li>
										<li>Planning</li>
										<li>Insights</li>
									</ul>
								</div>

								<div>
									<h4
										class="mb-2 text-sm font-medium sm:mb-3 sm:text-base"
										style="color: {textPrimary};"
									>
										Liên hệ
									</h4>
									<ul
										class="space-y-1 text-xs sm:space-y-2 sm:text-sm"
										style="color: {textSecondary};"
									>
										<li>📞 1900 2026</li>
										<li>📧 hello@demandai.vn</li>
										<li>📍 TP.HCM, Việt Nam</li>
										<li>🕐 8:30 - 18:00</li>
									</ul>
								</div>
							</div>

							<div class="border-t pt-4 text-center sm:pt-6" style="border-color: {borderSoft};">
								<p class="text-[10px] sm:text-xs" style="color: {textMuted};">
									&copy; 2026 DemandAI. All rights reserved.
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
			class="relative ml-auto h-full max-w-md overflow-y-auto bg-slate-950 px-4 py-8 sm:px-6 lg:max-w-none lg:px-8 lg:py-24"
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
				<div class="rounded-xl bg-slate-900 p-4 sm:p-6">
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
						placeholder="#2563EB"
					/>
				</div>

				<div class="rounded-xl bg-slate-900 p-4 sm:p-6">
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
						placeholder="#EEF4FF"
					/>
				</div>
			</div>

			<Button on:click={resetColors} class="mt-6 flex w-full items-center justify-center">
				🔄 {t.reset}
			</Button>

			<div
				class="mt-6 rounded-xl border-l-4 bg-slate-900 p-4 sm:mt-8 sm:p-6"
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
	:global(.overflow-y-auto::-webkit-scrollbar) {
		width: 6px;
	}

	:global(.overflow-y-auto::-webkit-scrollbar-track) {
		background: transparent;
	}

	:global(.overflow-y-auto::-webkit-scrollbar-thumb) {
		background: #64748b;
		border-radius: 3px;
	}
</style>
