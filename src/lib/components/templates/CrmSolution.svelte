<script lang="ts">
	import {
		Monitor,
		Smartphone,
		Tablet,
		Palette,
		X,
		Users,
		CalendarDays,
		CheckCircle2,
		AlertCircle,
		Phone,
		MessageSquare,
		TrendingUp,
		Handshake,
		Star,
		Mail,
		Activity,
		ArrowUpRight,
		BadgeDollarSign,
		Target,
		Sparkles
	} from '@lucide/svelte';
	import { onDestroy, onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import { goto } from '$app/navigation';

	let locale: Locale = 'vi';
	$: locale = $localeStore;
	$: t = translations[locale].templates.colorCustomizer;

	export let title: string = 'CRM: bán hàng & CSKH';
	export let primaryColor: string = '#2563EB';
	export let secondaryColor: string = '#EFF6FF';

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
	const textSecondary = '#475569';
	const textMuted = '#64748B';
	const borderSoft = '#DBEAFE';

	$: primaryColor = selectedPrimary;
	$: secondaryColor = selectedSecondary;

	const summaryCards = [
		{
			label: 'Doanh thu tháng này',
			value: '2.48 tỷ',
			change: '+12.6%',
			icon: BadgeDollarSign
		},
		{
			label: 'Lead mới',
			value: '128',
			change: '+8.2%',
			icon: Users
		},
		{
			label: 'Tỷ lệ chốt',
			value: '31%',
			change: '+4.1%',
			icon: Target
		},
		{
			label: 'Ticket cần xử lý',
			value: '17',
			change: '-6.4%',
			icon: MessageSquare
		}
	];

	const customerPipeline = [
		{
			name: 'Công ty An Phúc',
			owner: 'Nguyễn Hoàng Nam',
			stage: 'Discovery',
			channel: 'Website',
			value: '85.000.000đ',
			status: 'Tiềm năng'
		},
		{
			name: 'Cửa hàng Minh Tâm',
			owner: 'Lê Khánh Vy',
			stage: 'Proposal',
			channel: 'Facebook',
			value: '42.000.000đ',
			status: 'Đàm phán'
		},
		{
			name: 'Tập đoàn Sao Việt',
			owner: 'Trần Quốc Bảo',
			stage: 'Won',
			channel: 'Referral',
			value: '168.000.000đ',
			status: 'Thành công'
		},
		{
			name: 'Hệ thống Hồng Hà',
			owner: 'Phạm Gia Hân',
			stage: 'Retention',
			channel: 'Email',
			value: '26.000.000đ',
			status: 'Cần follow-up'
		}
	];

	const quickActions = ['Tạo lead mới', 'Lên lịch gọi lại', 'Gửi email CSKH', 'Tạo báo giá'];

	const recentActivities = [
		{
			title: 'Lead mới từ website',
			desc: 'Công ty Nam Hải để lại form tư vấn giải pháp.',
			time: '5 phút trước'
		},
		{
			title: 'Ticket CSKH được cập nhật',
			desc: 'Khách hàng Minh Tâm đã phản hồi trạng thái đơn hàng.',
			time: '18 phút trước'
		},
		{
			title: 'Deal vừa chốt thành công',
			desc: 'Tập đoàn Sao Việt xác nhận hợp đồng gói Enterprise.',
			time: '42 phút trước'
		}
	];

	const pieStats = [
		{ label: 'Khách hàng mới', value: 38, color: '#2563EB' },
		{ label: 'Đang chăm sóc', value: 32, color: '#7C3AED' },
		{ label: 'Đã mua hàng', value: 20, color: '#14B8A6' },
		{ label: 'Cần follow-up', value: 10, color: '#F59E0B' }
	];

	const primaryPresets = ['#2563EB', '#0EA5E9', '#7C3AED', '#E11D48', '#F97316', '#16A34A'];
	const secondaryPresets = ['#EFF6FF', '#F0F9FF', '#F5F3FF', '#FFF1F2', '#FFF7ED', '#F0FDF4'];

	$: pieGradient = (() => {
		let current = 0;
		const total = pieStats.reduce((sum, item) => sum + item.value, 0);

		return pieStats
			.map((item) => {
				const start = (current / total) * 360;
				current += item.value;
				const end = (current / total) * 360;
				return `${item.color} ${start}deg ${end}deg`;
			})
			.join(', ');
	})();

	function setDevice(device: 'mobile' | 'tablet' | 'desktop') {
		deviceView = device;
	}

	function resetColors() {
		selectedPrimary = '#2563EB';
		selectedSecondary = '#EFF6FF';
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

	function getStatusTone(status: string) {
		if (status === 'Thành công') {
			return {
				bg: '#DCFCE7',
				color: '#166534',
				icon: CheckCircle2
			};
		}

		if (status === 'Đàm phán' || status === 'Tiềm năng') {
			return {
				bg: '#FEF3C7',
				color: '#92400E',
				icon: AlertCircle
			};
		}

		return {
			bg: '#E0F2FE',
			color: '#0369A1',
			icon: MessageSquare
		};
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
		<div class="mb-6 flex justify-center">
			<div class="inline-flex items-center gap-1 rounded-2xl bg-slate-900 p-1.5 sm:gap-2 sm:p-2">
				<button
					on:click={() => setDevice('mobile')}
					class="flex items-center gap-1 rounded-xl px-2 py-2 transition-all duration-200 sm:gap-2 sm:px-4"
					style="background-color: {deviceView === 'mobile'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'mobile' ? '#ffffff' : '#94A3B8'}"
				>
					<Smartphone size={16} />
					<span class="text-xs font-medium sm:text-sm">Mobile</span>
				</button>

				<button
					on:click={() => setDevice('tablet')}
					class="hidden items-center gap-1 rounded-xl px-2 py-2 transition-all duration-200 sm:flex sm:gap-2 sm:px-4"
					style="background-color: {deviceView === 'tablet'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'tablet' ? '#ffffff' : '#94A3B8'}"
				>
					<Tablet size={16} />
					<span class="text-xs font-medium sm:text-sm">Tablet</span>
				</button>

				<button
					on:click={() => setDevice('desktop')}
					class="hidden items-center gap-1 rounded-xl px-2 py-2 transition-all duration-200 sm:gap-2 sm:px-4 xl:flex"
					style="background-color: {deviceView === 'desktop'
						? primaryColor
						: 'transparent'}; color: {deviceView === 'desktop' ? '#ffffff' : '#94A3B8'}"
				>
					<Monitor size={16} />
					<span class="text-xs font-medium sm:text-sm">Desktop</span>
				</button>
			</div>
		</div>

		<div class="flex justify-center">
			<div
				class="w-full overflow-hidden rounded-[28px] shadow-2xl"
				style="max-width: {deviceView === 'desktop'
					? '100%'
					: deviceWidths[deviceView]}; background-color: {secondaryColor};"
			>
				<div class="min-h-screen overflow-x-hidden">
					<div
						class="px-4 py-2 text-[11px] text-white sm:px-6 sm:text-xs"
						style="background: linear-gradient(90deg, {primaryColor} 0%, #0f172a 100%);"
					>
						<div class="flex items-center justify-between gap-3">
							<div class="flex items-center gap-4 overflow-hidden">
								<span class="whitespace-nowrap">🚀 CRM realtime dashboard</span>
								{#if deviceView !== 'mobile'}
									<span class="whitespace-nowrap">📞 Sales pipeline & CSKH performance</span>
								{/if}
							</div>
							<div class="whitespace-nowrap">CRM Dashboard</div>
						</div>
					</div>

					<header
						class="sticky top-0 z-20 border-b bg-white/90 backdrop-blur"
						style="border-color: {borderSoft};"
					>
						<div class="px-4 py-4 sm:px-6">
							<div
								class="grid items-center gap-3"
								style:grid-template-columns={deviceView === 'desktop'
									? '280px 1fr 180px'
									: deviceView === 'tablet'
										? '220px 1fr 130px'
										: '1fr'}
							>
								<div class="flex items-center gap-3">
									<div
										class="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
										style="background: linear-gradient(135deg, {primaryColor} 0%, #1d4ed8 100%);"
									>
										<Handshake size={20} />
									</div>
									<div>
										<div class="text-lg font-bold sm:text-xl" style="color: {textPrimary};">
											{title}
										</div>
										<div class="text-[10px] tracking-[0.2em] uppercase" style="color: {textMuted};">
											Customer Relationship Management
										</div>
									</div>
								</div>

								<div
									class="rounded-2xl border px-4 py-3 text-sm"
									style="background-color: #ffffff; border-color: {borderSoft}; color: {textSecondary};"
								>
									Tìm khách hàng, deal, ticket, chiến dịch...
								</div>

								{#if deviceView !== 'mobile'}
									<div class="flex justify-end">
										<button
											class="rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-md"
											style="background-color: {primaryColor};"
										>
											Xuất báo cáo
										</button>
									</div>
								{/if}
							</div>
						</div>
					</header>

					<section class="px-4 pt-5 sm:px-6 sm:pt-6">
						<div
							class="grid gap-4"
							style:grid-template-columns={deviceView === 'desktop' ? '1.3fr 0.7fr' : '1fr'}
						>
							<div
								class="relative overflow-hidden rounded-[32px] p-6 text-white sm:p-8"
								style="background:
									radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 30%),
									linear-gradient(135deg, {primaryColor} 0%, #0f172a 75%);"
							>
								<div
									class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs sm:text-sm"
								>
									<Sparkles size={16} />
									Modern sales & customer success
								</div>

								<h1
									class="mb-3 leading-tight font-bold"
									class:text-3xl={deviceView === 'mobile'}
									class:text-4xl={deviceView === 'tablet'}
									class:text-5xl={deviceView === 'desktop'}
								>
									Tăng trưởng doanh số
									<span class="block">từ một dashboard trực quan</span>
								</h1>

								<p class="mb-6 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
									Theo dõi lead, pipeline, chăm sóc khách hàng và hiệu suất đội sales trên cùng một
									giao diện hiện đại, rõ ràng và tối ưu cho mọi thiết bị.
								</p>

								<div class="grid gap-3 sm:grid-cols-3">
									<div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
										<div class="text-xs text-white/70">MRR growth</div>
										<div class="mt-1 text-2xl font-bold">+18.4%</div>
									</div>
									<div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
										<div class="text-xs text-white/70">Win rate</div>
										<div class="mt-1 text-2xl font-bold">31%</div>
									</div>
									<div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
										<div class="text-xs text-white/70">NPS</div>
										<div class="mt-1 text-2xl font-bold">68</div>
									</div>
								</div>
							</div>

							<div class="grid gap-4">
								<div
									class="rounded-[28px] border p-5 shadow-sm"
									style="background-color: #ffffff; border-color: {borderSoft};"
								>
									<div class="mb-1 text-sm" style="color: {textMuted};">Hiệu suất hôm nay</div>
									<div class="flex items-end justify-between gap-3">
										<div>
											<div class="text-3xl font-bold" style="color: {textPrimary};">84%</div>
											<div class="mt-1 text-sm" style="color: {textSecondary};">
												Đội sales đang vượt KPI ngày
											</div>
										</div>
										<div
											class="rounded-2xl px-3 py-2 text-sm font-semibold"
											style="background-color: {secondaryColor}; color: {primaryColor};"
										>
											+9.2%
										</div>
									</div>
								</div>

								<div
									class="rounded-[28px] border p-5 shadow-sm"
									style="background-color: #ffffff; border-color: {borderSoft};"
								>
									<div class="mb-1 text-sm" style="color: {textMuted};">CSKH cần ưu tiên</div>
									<div class="flex items-end justify-between gap-3">
										<div>
											<div class="text-3xl font-bold" style="color: {textPrimary};">17</div>
											<div class="mt-1 text-sm" style="color: {textSecondary};">
												Ticket cần phản hồi trong 2 giờ
											</div>
										</div>
										<div
											class="rounded-2xl bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-700"
										>
											SLA
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section class="px-4 py-4 sm:px-6">
						<div
							class="grid gap-3"
							class:grid-cols-2={deviceView === 'mobile'}
							class:grid-cols-4={deviceView !== 'mobile'}
						>
							{#each summaryCards as item}
								<div
									class="rounded-[24px] border p-4 shadow-sm"
									style="background-color: #ffffff; border-color: {borderSoft};"
								>
									<div class="mb-3 flex items-center justify-between">
										<div class="text-xs" style="color: {textMuted};">{item.label}</div>
										<div
											class="flex h-10 w-10 items-center justify-center rounded-2xl"
											style="background-color: {secondaryColor}; color: {primaryColor};"
										>
											<svelte:component this={item.icon} size={18} />
										</div>
									</div>
									<div class="text-2xl font-bold" style="color: {textPrimary};">{item.value}</div>
									<div
										class="mt-2 inline-flex items-center gap-1 text-sm"
										style="color: {primaryColor};"
									>
										<ArrowUpRight size={14} />
										{item.change}
									</div>
								</div>
							{/each}
						</div>
					</section>

					<section class="px-4 py-2 sm:px-6 sm:py-4">
						<div
							class="grid gap-4"
							style:grid-template-columns={deviceView === 'desktop' ? '1.2fr 0.8fr' : '1fr'}
						>
							<div class="grid gap-4">
								<div
									class="rounded-[30px] border p-5 shadow-sm"
									style="background-color: #ffffff; border-color: {borderSoft};"
								>
									<div class="mb-4 flex items-center justify-between">
										<div>
											<h2 class="text-lg font-semibold sm:text-xl" style="color: {textPrimary};">
												Sales pipeline
											</h2>
											<div class="text-sm" style="color: {textMuted};">
												Các cơ hội bán hàng nổi bật
											</div>
										</div>

										{#if deviceView !== 'mobile'}
											<button
												class="rounded-2xl px-4 py-2 text-sm font-medium text-white"
												style="background-color: {primaryColor};"
											>
												Quản lý pipeline
											</button>
										{/if}
									</div>

									<div class="space-y-3">
										{#each customerPipeline as customer}
											{@const tone = getStatusTone(customer.status)}
											<div
												class="rounded-[24px] border p-4"
												style="background-color: #F8FAFC; border-color: #E2E8F0;"
											>
												<div
													class="grid items-center gap-3"
													style:grid-template-columns={deviceView === 'mobile'
														? '1fr'
														: deviceView === 'tablet'
															? '1.3fr 1fr 1fr'
															: '1.6fr 1fr 1fr 1fr'}
												>
													<div>
														<div class="font-semibold" style="color: {textPrimary};">
															{customer.name}
														</div>
														<div class="text-sm" style="color: {textMuted};">
															Owner: {customer.owner}
														</div>
													</div>

													<div>
														<div class="text-xs" style="color: {textMuted};">Stage</div>
														<div class="font-semibold" style="color: {textPrimary};">
															{customer.stage}
														</div>
													</div>

													<div>
														<div class="text-xs" style="color: {textMuted};">Channel</div>
														<div class="font-semibold" style="color: {textPrimary};">
															{customer.channel}
														</div>
													</div>

													<div class="space-y-2">
														<div class="text-xs" style="color: {textMuted};">Value</div>
														<div class="font-semibold" style="color: {textPrimary};">
															{customer.value}
														</div>
														<div class="flex justify-start md:justify-end">
															<span
																class="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold"
																style="background-color: {tone.bg}; color: {tone.color};"
															>
																<svelte:component this={tone.icon} size={14} />
																{customer.status}
															</span>
														</div>
													</div>
												</div>
											</div>
										{/each}
									</div>
								</div>

								<div
									class="rounded-[30px] border p-5 shadow-sm"
									style="background-color: #ffffff; border-color: {borderSoft};"
								>
									<div class="mb-4 flex items-center gap-2">
										<Activity size={18} style="color: {primaryColor};" />
										<h3 class="text-lg font-semibold" style="color: {textPrimary};">
											Hoạt động gần đây
										</h3>
									</div>

									<div class="space-y-3">
										{#each recentActivities as item}
											<div
												class="rounded-[22px] border p-4"
												style="background-color: #F8FAFC; border-color: #E2E8F0;"
											>
												<div class="flex items-start justify-between gap-3">
													<div>
														<div class="font-medium" style="color: {textPrimary};">
															{item.title}
														</div>
														<div class="mt-1 text-sm" style="color: {textSecondary};">
															{item.desc}
														</div>
													</div>
													<div class="text-xs whitespace-nowrap" style="color: {textMuted};">
														{item.time}
													</div>
												</div>
											</div>
										{/each}
									</div>
								</div>
							</div>

							<div class="grid gap-4">
								<div
									class="rounded-[30px] border p-5 shadow-sm"
									style="background-color: #ffffff; border-color: {borderSoft};"
								>
									<div class="mb-4 flex items-center gap-2">
										<TrendingUp size={18} style="color: {primaryColor};" />
										<h3 class="text-lg font-semibold" style="color: {textPrimary};">
											Phân bổ khách hàng
										</h3>
									</div>

									<div
										class="grid items-center gap-5"
										class:grid-cols-1={deviceView === 'mobile'}
										class:grid-cols-2={deviceView !== 'mobile'}
									>
										<div class="flex justify-center">
											<div
												class="relative h-52 w-52 rounded-full"
												style="background: conic-gradient({pieGradient});"
											>
												<div
													class="absolute inset-[22px] flex flex-col items-center justify-center rounded-full bg-white"
												>
													<div class="text-xs" style="color: {textMuted};">Tổng khách hàng</div>
													<div class="text-3xl font-bold" style="color: {textPrimary};">1,248</div>
												</div>
											</div>
										</div>

										<div class="space-y-3">
											{#each pieStats as item}
												<div class="flex items-center justify-between gap-3">
													<div class="flex items-center gap-3">
														<span
															class="h-3.5 w-3.5 rounded-full"
															style="background-color: {item.color};"
														></span>
														<span class="text-sm" style="color: {textSecondary};">{item.label}</span
														>
													</div>
													<div class="text-sm font-semibold" style="color: {textPrimary};">
														{item.value}%
													</div>
												</div>
											{/each}
										</div>
									</div>
								</div>

								<div
									class="rounded-[30px] border p-5 shadow-sm"
									style="background-color: #ffffff; border-color: {borderSoft};"
								>
									<div class="mb-4 flex items-center gap-2">
										<Phone size={18} style="color: {primaryColor};" />
										<h3 class="text-lg font-semibold" style="color: {textPrimary};">
											Tác vụ nhanh
										</h3>
									</div>

									<div
										class="grid gap-3"
										class:grid-cols-1={deviceView === 'mobile'}
										class:grid-cols-2={deviceView !== 'mobile'}
									>
										{#each quickActions as action}
											<button
												class="rounded-[20px] border px-4 py-3 text-left text-sm font-medium transition-all hover:-translate-y-0.5"
												style="background-color: #F8FAFC; border-color: #E2E8F0; color: {textSecondary};"
											>
												{action}
											</button>
										{/each}
									</div>
								</div>

								<div
									class="rounded-[30px] border p-5 shadow-sm"
									style="background-color: #ffffff; border-color: {borderSoft};"
								>
									<div class="mb-4 flex items-center gap-2">
										<Star size={18} style="color: {primaryColor};" />
										<h3 class="text-lg font-semibold" style="color: {textPrimary};">
											Customer success
										</h3>
									</div>

									<div class="grid gap-3">
										<div
											class="rounded-[22px] border p-4"
											style="background-color: #F8FAFC; border-color: #E2E8F0;"
										>
											<div class="text-sm" style="color: {textMuted};">Tỷ lệ phản hồi trong 1h</div>
											<div class="mt-1 text-2xl font-bold" style="color: {primaryColor};">89%</div>
										</div>

										<div
											class="rounded-[22px] border p-4"
											style="background-color: #F8FAFC; border-color: #E2E8F0;"
										>
											<div class="text-sm" style="color: {textMuted};">
												Điểm hài lòng khách hàng
											</div>
											<div class="mt-1 text-2xl font-bold" style="color: {textPrimary};">4.8/5</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					<footer class="px-4 pt-6 pb-10 sm:px-6 sm:pb-16">
						<div
							class="rounded-[30px] border p-6 sm:p-8"
							style="background-color: #ffffff; border-color: {borderSoft};"
						>
							<div
								class="grid gap-6"
								style:grid-template-columns={deviceView === 'desktop' ? '1.2fr 0.8fr' : '1fr'}
							>
								<div>
									<div class="mb-2 text-xs tracking-[0.2em] uppercase" style="color: {textMuted};">
										CRM operations
									</div>
									<h3 class="mb-3 text-2xl font-semibold sm:text-3xl" style="color: {textPrimary};">
										Nội dung CRM hiện đại hơn, thiên về sales dashboard
									</h3>
									<p class="text-sm leading-relaxed sm:text-base" style="color: {textSecondary};">
										Khác với HRM, giao diện này tập trung vào tăng trưởng doanh thu, phân bổ khách
										hàng, pipeline và customer success với cách trình bày trực quan hơn.
									</p>
								</div>

								<div class="rounded-[24px] p-5" style="background-color: {secondaryColor};">
									<div class="mb-3 font-semibold" style="color: {textPrimary};">Điểm nổi bật</div>
									<ul class="space-y-2 text-sm" style="color: {textSecondary};">
										<li>• Hero hiện đại, đúng chất CRM</li>
										<li>• KPI card kiểu dashboard</li>
										<li>• Pie chart phân bổ khách hàng</li>
										<li>• Activity feed và pipeline khác hẳn HRM</li>
									</ul>
								</div>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</div>
	</div>

	{#if isMobileLayout}
		<button
			on:click={toggleColorPanel}
			class="fixed right-6 bottom-6 z-50 rounded-full p-4 text-white shadow-2xl transition-all duration-300 hover:scale-110"
			style="background-color: {primaryColor};"
		>
			<Palette size={24} />
		</button>
	{/if}

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
			class="relative ml-auto h-full max-w-md overflow-y-auto bg-stone-900 px-4 py-8 sm:px-6 lg:max-w-none lg:px-8 lg:py-24"
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
				<div class="rounded-xl bg-stone-800 p-4 sm:p-6">
					<label
						for="primary-color"
						class="mb-3 flex items-center justify-between text-sm font-semibold text-gray-200 sm:mb-4 sm:text-base"
					>
						<span>{t.primary}</span>
						<span
							class="h-8 w-8 rounded-lg border-2 border-stone-700 sm:h-10 sm:w-10"
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
						class="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 font-mono text-sm text-white sm:px-4 sm:py-3 sm:text-base"
						placeholder="#2563EB"
					/>

					<div class="mt-3 grid grid-cols-6 gap-2">
						{#each primaryPresets as color}
							<button
								on:click={() => (selectedPrimary = color)}
								class="h-9 rounded-lg border"
								style="background-color: {color}; border-color: {selectedPrimary === color
									? '#fff'
									: '#444'};"
							></button>
						{/each}
					</div>
				</div>

				<div class="rounded-xl bg-stone-800 p-4 sm:p-6">
					<label
						for="secondary-color"
						class="mb-3 flex items-center justify-between text-sm font-semibold text-gray-200 sm:mb-4 sm:text-base"
					>
						<span>{t.secondary}</span>
						<span
							class="h-8 w-8 rounded-lg border-2 border-stone-700 sm:h-10 sm:w-10"
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
						class="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 font-mono text-sm text-white sm:px-4 sm:py-3 sm:text-base"
						placeholder="#EFF6FF"
					/>

					<div class="mt-3 grid grid-cols-6 gap-2">
						{#each secondaryPresets as color}
							<button
								on:click={() => (selectedSecondary = color)}
								class="h-9 rounded-lg border"
								style="background-color: {color}; border-color: {selectedSecondary === color
									? '#fff'
									: '#444'};"
							></button>
						{/each}
					</div>
				</div>
			</div>

			<Button on:click={resetColors} class="mt-6 flex w-full items-center justify-center">
				🔄 {t.reset}
			</Button>

			<div
				class="mt-6 rounded-xl border-l-4 bg-stone-800 p-4 sm:mt-8 sm:p-6"
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
		background: #475569;
		border-radius: 999px;
	}
</style>
