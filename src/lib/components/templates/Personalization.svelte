<script lang="ts">
	import {
		Monitor,
		Smartphone,
		Tablet,
		Palette,
		X,
		Sparkles,
		UserRound,
		Layers3,
		WandSparkles,
		MessagesSquare,
		ArrowUpRight,
		Activity,
		ShieldCheck
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

	// Theme mới cho personalization
	export let primaryColor: string = '#6D28D9';
	export let secondaryColor: string = '#F8F5FF';

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
	const borderSoft = '#E9DDFD';
	const accentSoft = '#F3E8FF';
	const accentBlue = '#22D3EE';
	const accentDark = '#0B1020';
	const successColor = '#14B8A6';

	const personalizationPillars = [
		{
			id: 1,
			title: 'Unified Identity',
			desc: 'Hợp nhất hành vi, lịch sử tương tác và sở thích vào một hồ sơ động.',
			icon: '🧬'
		},
		{
			id: 2,
			title: 'Decisioning Engine',
			desc: 'Chọn nội dung, ưu đãi và hành động kế tiếp cho từng phiên truy cập.',
			icon: '🧠'
		},
		{
			id: 3,
			title: 'Journey Orchestration',
			desc: 'Cá nhân hóa liên tục từ homepage đến email, push, in-app và CRM.',
			icon: '🪄'
		},
		{
			id: 4,
			title: 'Experiment Layer',
			desc: 'Đo uplift và tối ưu từng trải nghiệm bằng thử nghiệm liên tục.',
			icon: '🧪'
		}
	];

	const surfaces = [
		{ id: 1, name: 'Homepage', note: 'Dynamic blocks', icon: '🏠' },
		{ id: 2, name: 'Product Feed', note: 'Intent ranking', icon: '🛍️' },
		{ id: 3, name: 'Email', note: 'Personalized content', icon: '✉️' },
		{ id: 4, name: 'Push / In-app', note: 'Best timing', icon: '🔔' },
		{ id: 5, name: 'Search', note: 'Context aware', icon: '🔎' },
		{ id: 6, name: 'Offers', note: 'Adaptive incentives', icon: '🎟️' }
	];

	const experienceCards = [
		{
			id: 1,
			tag: 'Realtime',
			title: 'Adaptive Homepage',
			desc: 'Homepage thay đổi theo nguồn traffic, mức độ quan tâm và vòng đời người dùng.',
			metric: '+29%',
			metricLabel: 'engagement uplift'
		},
		{
			id: 2,
			tag: '1:1 Messaging',
			title: 'Smart Lifecycle Messaging',
			desc: 'Tự động chọn đúng thông điệp, đúng kênh và đúng thời điểm cho từng người.',
			metric: '+21%',
			metricLabel: 'returning users'
		},
		{
			id: 3,
			tag: 'Offer Logic',
			title: 'Contextual Offer Selection',
			desc: 'Không phải user nào cũng nên thấy cùng một voucher hay ưu đãi.',
			metric: '-18%',
			metricLabel: 'promo waste'
		},
		{
			id: 4,
			tag: 'Intent AI',
			title: 'Next Best Experience',
			desc: 'Dự đoán trải nghiệm kế tiếp phù hợp nhất thay vì chỉ recommend sản phẩm.',
			metric: '+34%',
			metricLabel: 'CTR uplift'
		},
		{
			id: 5,
			tag: 'Cross-channel',
			title: 'Journey Memory',
			desc: 'Giữ ngữ cảnh xuyên suốt giữa onsite, app, email và CRM.',
			metric: '360°',
			metricLabel: 'profile continuity'
		},
		{
			id: 6,
			tag: 'Executive View',
			title: 'Personalization Analytics',
			desc: 'Theo dõi uplift, fatigue, incremental revenue và impact theo từng cohort.',
			metric: '< 2m',
			metricLabel: 'insight refresh'
		}
	];

	const signalMoments = [
		{
			time: '08:42',
			title: 'Anonymous visitor từ campaign “Glow Routine”',
			desc: 'Hệ thống đổi homepage sang phiên bản educational-first.',
			score: 68
		},
		{
			time: '09:15',
			title: 'User xem 3 trang serum + đọc review',
			desc: 'Intent layer tăng ưu tiên social proof và comparison block.',
			score: 81
		},
		{
			time: '10:28',
			title: 'User quay lại từ email nhưng chưa add-to-cart',
			desc: 'Orchestration chọn offer nhẹ thay vì discount mạnh.',
			score: 87
		},
		{
			time: '11:03',
			title: 'User vào app lần 2 trong ngày',
			desc: 'Next-best-experience chuyển sang bundle recommendation.',
			score: 93
		}
	];

	const outcomes = [
		{ label: 'Engagement uplift', value: '+29%' },
		{ label: 'Conversion lift', value: '+17%' },
		{ label: 'Retention impact', value: '+14%' },
		{ label: 'Serving latency', value: '< 120ms' }
	];

	const governance = [
		'Frequency control để tránh over-personalization',
		'Fallback logic khi dữ liệu chưa đủ mạnh',
		'Guardrails cho discount, brand tone và eligibility',
		'Audit trail cho từng quyết định personalization'
	];

	function setDevice(device: 'mobile' | 'tablet' | 'desktop') {
		deviceView = device;
	}

	$: primaryColor = selectedPrimary;
	$: secondaryColor = selectedSecondary;

	function resetColors() {
		selectedPrimary = '#6D28D9';
		selectedSecondary = '#F8F5FF';
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
					<!-- Announcement -->
					<div
						class="px-4 py-2 text-[11px] text-white sm:px-6 sm:text-xs"
						style="background: linear-gradient(90deg, {accentDark} 0%, {primaryColor} 55%, {accentBlue} 100%);"
					>
						<div class="flex items-center justify-between gap-3">
							<div class="flex items-center gap-3 overflow-hidden sm:gap-5">
								<span class="whitespace-nowrap"
									>✨ Personalization không chỉ là “recommendation”</span
								>
								{#if deviceView !== 'mobile'}
									<span class="whitespace-nowrap"
										>🧠 Hệ thống chọn trải nghiệm phù hợp cho từng người dùng</span
									>
									<span class="whitespace-nowrap"
										>⚡ Onsite, CRM, push và app dùng chung một ngữ cảnh</span
									>
								{/if}
							</div>
							<div class="whitespace-nowrap">Experience OS</div>
						</div>
					</div>

					<!-- Header -->
					<header class="sticky top-0 z-20 bg-white/90 shadow-sm backdrop-blur-xl">
						<div class="border-b px-4 py-3 sm:px-6" style="border-color: {borderSoft};">
							<div
								class="grid items-center gap-3"
								style:grid-template-columns={deviceView === 'desktop'
									? '220px 1fr 220px'
									: deviceView === 'tablet'
										? '190px 1fr 120px'
										: '1fr'}
							>
								<div class="flex items-center gap-3">
									<div
										class="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-md"
										style="background: linear-gradient(135deg, {primaryColor} 0%, {accentBlue} 100%);"
									>
										<WandSparkles size={18} />
									</div>
									<div>
										<div class="text-lg font-bold sm:text-xl" style="color: {textPrimary};">
											Persona Layer
										</div>
										<div
											class="text-[9px] tracking-[0.2em] sm:text-[10px]"
											style="color: {textMuted};"
										>
											AI PERSONALIZATION SYSTEM
										</div>
									</div>
								</div>

								{#if deviceView !== 'mobile'}
									<nav
										class="flex items-center justify-center gap-5 text-sm"
										style="color: {textSecondary};"
									>
										<a href="/" class="hover:opacity-70">Product</a>
										<a href="/" class="hover:opacity-70">Use Cases</a>
										<a href="/" class="hover:opacity-70">Decisioning</a>
										<a href="/" class="hover:opacity-70">Analytics</a>
										<a href="/" class="hover:opacity-70">Governance</a>
									</nav>
								{/if}

								<div class="flex items-center justify-end gap-2">
									{#if deviceView !== 'mobile'}
										<button
											class="rounded-2xl border px-4 py-2 text-sm"
											style="border-color: {borderSoft}; color: {textPrimary}; background-color: #fff;"
										>
											Log in
										</button>
									{/if}
									<button
										class="rounded-2xl px-4 py-2 text-sm font-medium text-white"
										style="background: linear-gradient(135deg, {primaryColor} 0%, {accentBlue} 100%);"
									>
										Start demo
									</button>
								</div>
							</div>
						</div>
					</header>

					<!-- Hero -->
					<section class="px-4 pt-5 sm:px-6 sm:pt-6">
						<div
							class="grid gap-4"
							style:grid-template-columns={deviceView === 'desktop' ? '1.1fr 0.9fr' : '1fr'}
						>
							<div
								class="relative overflow-hidden rounded-[2rem] p-6 sm:p-8"
								style="background:
								radial-gradient(circle at top left, rgba(255,255,255,0.18) 0%, transparent 30%),
								linear-gradient(135deg, {primaryColor} 0%, #4F46E5 50%, {accentDark} 100%);"
							>
								<div class="absolute inset-0 opacity-10">
									<div
										class="h-full w-full"
										style="background-image:
										linear-gradient(to right, white 1px, transparent 1px),
										linear-gradient(to bottom, white 1px, transparent 1px);
										background-size: 26px 26px;"
									></div>
								</div>

								<div class="relative z-10 max-w-2xl text-white">
									<div
										class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs sm:text-sm"
									>
										<UserRound size={14} />
										Personalization · Context · Decisioning
									</div>

									<h1
										class="mb-4 leading-tight font-bold"
										class:text-3xl={deviceView === 'mobile'}
										class:text-4xl={deviceView === 'tablet'}
										class:text-5xl={deviceView === 'desktop'}
									>
										Mỗi người dùng
										<span class="block">nên thấy một trải nghiệm khác nhau</span>
									</h1>

									<p
										class="mb-6 max-w-2xl leading-relaxed text-white/90"
										class:text-sm={deviceView === 'mobile'}
										class:text-base={deviceView !== 'mobile'}
									>
										Persona Layer là hệ thống AI giúp thương hiệu chọn đúng nội dung, đúng layout,
										đúng ưu đãi và đúng hành động cho từng user theo thời gian thực — thay vì dùng
										một journey giống nhau cho tất cả.
									</p>

									<div class="flex flex-col gap-3 sm:flex-row">
										<button
											class="rounded-2xl bg-white px-6 py-3 text-sm font-semibold shadow-lg sm:text-base"
											style="color: {primaryColor};"
										>
											Xem cách hệ thống hoạt động
										</button>
										<button
											class="rounded-2xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white sm:text-base"
										>
											Khám phá use cases
										</button>
									</div>
								</div>
							</div>

							<div class="grid gap-4">
								<div
									class="rounded-[1.75rem] border bg-white p-5 shadow-sm"
									style="border-color: {borderSoft};"
								>
									<div class="mb-2 flex items-center gap-2 text-sm" style="color: {textMuted};">
										<Activity size={16} />
										Live decision preview
									</div>
									<div class="mb-3 text-xl font-semibold" style="color: {textPrimary};">
										User mới từ ad campaign nên được educate trước khi bán.
									</div>
									<div class="space-y-3">
										<div class="rounded-xl p-3" style="background-color: {accentSoft};">
											<div class="text-xs" style="color: {textMuted};">Current action</div>
											<div class="font-medium" style="color: {textPrimary};">
												Hiển thị content block “How it works”
											</div>
										</div>
										<div class="rounded-xl p-3" style="background-color: #ECFEFF;">
											<div class="text-xs" style="color: {textMuted};">Next best move</div>
											<div class="font-medium" style="color: {textPrimary};">
												Kích hoạt email follow-up sau 3 giờ nếu chưa quay lại
											</div>
										</div>
									</div>
								</div>

								<div
									class="grid gap-3"
									class:grid-cols-2={deviceView !== 'mobile'}
									class:grid-cols-1={deviceView === 'mobile'}
								>
									{#each outcomes as item}
										<div
											class="rounded-2xl border bg-white p-4 shadow-sm"
											style="border-color: {borderSoft};"
										>
											<div class="mb-1 text-xs" style="color: {textMuted};">{item.label}</div>
											<div class="text-xl font-bold" style="color: {primaryColor};">
												{item.value}
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</section>

					<!-- What is personalized -->
					<section class="px-4 py-6 sm:px-6 sm:py-8">
						<div
							class="rounded-[1.75rem] border bg-white p-4 shadow-sm sm:p-6"
							style="border-color: {borderSoft};"
						>
							<div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<div
										class="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:text-sm"
										style="background-color: {accentSoft}; color: {primaryColor};"
									>
										<Layers3 size={14} />
										What gets personalized
									</div>
									<h2 class="text-2xl font-semibold sm:text-3xl" style="color: {textPrimary};">
										Không chỉ sản phẩm, mà là toàn bộ trải nghiệm
									</h2>
								</div>

								{#if deviceView !== 'mobile'}
									<div class="text-sm" style="color: {textSecondary};">
										Experience surfaces connected in one decision layer
									</div>
								{/if}
							</div>

							<div
								class="grid gap-3"
								class:grid-cols-2={deviceView === 'mobile'}
								class:grid-cols-3={deviceView === 'tablet'}
								class:grid-cols-6={deviceView === 'desktop'}
							>
								{#each surfaces as surface}
									<div
										class="rounded-2xl border p-4"
										style="background-color: #FCFAFF; border-color: {borderSoft};"
									>
										<div class="mb-2 text-2xl">{surface.icon}</div>
										<div class="mb-1 font-medium" style="color: {textPrimary};">{surface.name}</div>
										<div class="text-xs" style="color: {textSecondary};">{surface.note}</div>
									</div>
								{/each}
							</div>
						</div>
					</section>

					<!-- Core pillars -->
					<section class="px-4 py-2 sm:px-6 sm:py-4">
						<div
							class="rounded-[1.75rem] border p-4 shadow-sm sm:p-6"
							style="background:
							radial-gradient(circle at top right, rgba(109,40,217,0.06) 0%, transparent 25%),
							#ffffff;
							border-color: {borderSoft};"
						>
							<div class="mb-5">
								<div
									class="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:text-sm"
									style="background-color: #ECFEFF; color: #0F766E;"
								>
									<Sparkles size={14} />
									Core system design
								</div>
								<h2 class="text-2xl font-semibold sm:text-3xl" style="color: {textPrimary};">
									4 lớp cốt lõi của personalization hiện đại
								</h2>
							</div>

							<div
								class="grid gap-4"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-2={deviceView !== 'mobile'}
							>
								{#each personalizationPillars as item}
									<div
										class="rounded-[1.5rem] border p-5"
										style="background-color: #fff; border-color: {borderSoft};"
									>
										<div class="mb-3 text-2xl">{item.icon}</div>
										<div class="mb-2 text-lg font-semibold" style="color: {textPrimary};">
											{item.title}
										</div>
										<div class="text-sm leading-relaxed" style="color: {textSecondary};">
											{item.desc}
										</div>
									</div>
								{/each}
							</div>
						</div>
					</section>

					<!-- Live moments -->
					<section class="px-4 py-6 sm:px-6 sm:py-8">
						<div
							class="grid gap-4"
							style:grid-template-columns={deviceView === 'desktop' ? '0.95fr 1.05fr' : '1fr'}
						>
							<div
								class="rounded-[1.75rem] border bg-white p-5 shadow-sm"
								style="border-color: {borderSoft};"
							>
								<div class="mb-2 text-sm" style="color: {textMuted};">Signal timeline</div>
								<h3 class="mb-4 text-2xl font-semibold" style="color: {textPrimary};">
									Hệ thống đang đọc ngữ cảnh theo từng khoảnh khắc
								</h3>

								<div class="space-y-4">
									{#each signalMoments as item}
										<div class="rounded-2xl p-4" style="background-color: #FCFAFF;">
											<div class="mb-2 flex items-center justify-between">
												<div class="text-sm font-medium" style="color: {textPrimary};">
													{item.time}
												</div>
												<div class="text-xs" style="color: {primaryColor};">
													Intent {item.score}
												</div>
											</div>
											<div class="mb-1 font-medium" style="color: {textPrimary};">{item.title}</div>
											<div class="text-sm leading-relaxed" style="color: {textSecondary};">
												{item.desc}
											</div>
										</div>
									{/each}
								</div>
							</div>

							<div
								class="rounded-[1.75rem] p-6 text-white shadow-sm"
								style="background:
								radial-gradient(circle at top right, rgba(255,255,255,0.18) 0%, transparent 28%),
								linear-gradient(135deg, {accentDark} 0%, {primaryColor} 60%, {accentBlue} 100%);"
							>
								<div class="mb-2 text-sm text-white/70">AI perspective</div>
								<h3 class="mb-4 text-2xl font-semibold sm:text-3xl">
									Personalization tốt là chọn “trải nghiệm phù hợp”, không phải chỉ “item phù hợp”.
								</h3>

								<div class="space-y-3 text-sm leading-relaxed text-white/90 sm:text-base">
									<div class="rounded-2xl border border-white/15 bg-white/10 p-4">
										Không phải user nào cũng nên thấy recommendation grid đầu tiên.
									</div>
									<div class="rounded-2xl border border-white/15 bg-white/10 p-4">
										Có user cần social proof, có user cần educational content, có user cần
										incentive.
									</div>
									<div class="rounded-2xl border border-white/15 bg-white/10 p-4">
										Hệ thống tốt sẽ quyết định cả layout, message, channel và timing.
									</div>
								</div>

								<button
									class="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold"
									style="color: {primaryColor};"
								>
									Explore decision logic
									<ArrowUpRight size={16} />
								</button>
							</div>
						</div>
					</section>

					<!-- Experience cards -->
					<section class="px-4 py-2 sm:px-6 sm:py-4">
						<div class="mb-5">
							<div
								class="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:text-sm"
								style="background-color: {accentSoft}; color: {primaryColor};"
							>
								<MessagesSquare size={14} />
								Modern personalization use cases
							</div>
							<h2 class="text-2xl font-semibold sm:text-3xl" style="color: {textPrimary};">
								Những gì nền tảng này thực sự làm
							</h2>
						</div>

						<div
							class="grid gap-4 sm:gap-6"
							class:grid-cols-1={deviceView === 'mobile'}
							class:grid-cols-2={deviceView === 'tablet'}
							class:grid-cols-3={deviceView === 'desktop'}
						>
							{#each experienceCards as item}
								<div
									class="overflow-hidden rounded-[1.5rem] border bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
									style="border-color: {borderSoft};"
								>
									<div
										class="p-5 text-white"
										style="background:
										radial-gradient(circle at top left, rgba(255,255,255,0.16) 0%, transparent 30%),
										linear-gradient(135deg, {primaryColor} 0%, #8B5CF6 55%, {accentBlue} 100%);"
									>
										<div
											class="mb-3 inline-flex rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium"
										>
											{item.tag}
										</div>
										<div class="text-xl font-semibold">{item.title}</div>
									</div>

									<div class="p-5">
										<div class="mb-3 text-sm leading-relaxed" style="color: {textSecondary};">
											{item.desc}
										</div>
										<div class="mb-4">
											<div class="text-2xl font-bold" style="color: {primaryColor};">
												{item.metric}
											</div>
											<div class="text-xs" style="color: {textMuted};">{item.metricLabel}</div>
										</div>
										<button
											class="rounded-xl border px-4 py-2 text-sm"
											style="border-color: {borderSoft}; color: {textPrimary}; background-color: #fff;"
										>
											View scenario
										</button>
									</div>
								</div>
							{/each}
						</div>
					</section>

					<!-- Governance -->
					<section class="px-4 py-6 sm:px-6 sm:py-8">
						<div
							class="grid gap-4"
							style:grid-template-columns={deviceView === 'desktop' ? '1fr 0.9fr' : '1fr'}
						>
							<div
								class="rounded-[1.75rem] border bg-white p-5 shadow-sm sm:p-6"
								style="border-color: {borderSoft};"
							>
								<div
									class="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:text-sm"
									style="background-color: #ECFEFF; color: #0F766E;"
								>
									<ShieldCheck size={14} />
									Safe personalization
								</div>
								<h3 class="mb-4 text-2xl font-semibold" style="color: {textPrimary};">
									Cá nhân hóa tốt cần có governance tốt
								</h3>
								<div class="grid gap-3">
									{#each governance as item}
										<div class="rounded-2xl p-4" style="background-color: #F8FAFC;">
											<div class="text-sm" style="color: {textSecondary};">• {item}</div>
										</div>
									{/each}
								</div>
							</div>

							<div
								class="rounded-[1.75rem] p-6 shadow-sm"
								style="background:
								radial-gradient(circle at top right, rgba(255,255,255,0.28) 0%, transparent 20%),
								linear-gradient(135deg, #F5F3FF 0%, #ECFEFF 100%);"
							>
								<div class="mb-2 text-sm" style="color: {textMuted};">Why this matters</div>
								<h3 class="mb-4 text-2xl font-semibold" style="color: {textPrimary};">
									Người dùng không muốn “bị target”. Họ muốn trải nghiệm có ích và đúng lúc.
								</h3>
								<p
									class="mb-5 text-sm leading-relaxed sm:text-base"
									style="color: {textSecondary};"
								>
									Một hệ thống personalization hiện đại phải vừa tăng hiệu quả kinh doanh, vừa giữ
									được brand trust, tránh lặp lại thông điệp, tránh ưu đãi dư thừa và luôn có logic
									kiểm soát.
								</p>

								<button
									class="rounded-2xl px-5 py-3 text-sm font-semibold text-white"
									style="background: linear-gradient(135deg, {primaryColor} 0%, {accentBlue} 100%);"
								>
									Read platform principles
								</button>
							</div>
						</div>
					</section>

					<!-- Footer -->
					<footer class="border-t bg-white py-8 sm:py-10" style="border-color: {borderSoft};">
						<div class="mx-auto max-w-7xl px-4 sm:px-6">
							<div
								class="mb-8 grid gap-8"
								class:grid-cols-1={deviceView === 'mobile'}
								class:grid-cols-4={deviceView !== 'mobile'}
							>
								<div class:col-span-2={deviceView !== 'mobile'}>
									<div class="mb-4 flex items-center gap-3">
										<div
											class="flex h-11 w-11 items-center justify-center rounded-2xl text-white"
											style="background: linear-gradient(135deg, {primaryColor} 0%, {accentBlue} 100%);"
										>
											<WandSparkles size={18} />
										</div>
										<div>
											<div class="text-lg font-bold" style="color: {textPrimary};">
												Persona Layer
											</div>
											<div class="text-[10px] tracking-[0.24em]" style="color: {textMuted};">
												AI PERSONALIZATION SYSTEM
											</div>
										</div>
									</div>

									<p class="max-w-md text-sm leading-relaxed" style="color: {textSecondary};">
										Nền tảng giúp doanh nghiệp thiết kế trải nghiệm 1:1 trên mọi điểm chạm bằng AI
										decisioning, hồ sơ người dùng động và orchestration theo thời gian thực.
									</p>
								</div>

								<div>
									<h4 class="mb-3 text-sm font-semibold" style="color: {textPrimary};">Platform</h4>
									<ul class="space-y-2 text-sm" style="color: {textSecondary};">
										<li>Identity Graph</li>
										<li>Decision Engine</li>
										<li>Journey Orchestration</li>
										<li>Analytics</li>
									</ul>
								</div>

								<div>
									<h4 class="mb-3 text-sm font-semibold" style="color: {textPrimary};">Company</h4>
									<ul class="space-y-2 text-sm" style="color: {textSecondary};">
										<li>About</li>
										<li>Security</li>
										<li>Contact</li>
										<li>Partners</li>
									</ul>
								</div>
							</div>

							<div
								class="flex flex-col gap-3 border-t pt-5 text-xs sm:flex-row sm:items-center sm:justify-between"
								style="border-color: {borderSoft}; color: {textMuted};"
							>
								<div>© 2026 Persona Layer. Personalization with context, not noise.</div>
								<div class="flex gap-4">
									<span>Privacy</span>
									<span>Terms</span>
									<span>Status</span>
								</div>
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
						placeholder="#6D28D9"
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
						placeholder="#F8F5FF"
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
