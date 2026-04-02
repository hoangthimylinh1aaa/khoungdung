<script lang="ts">
	import {
		Monitor,
		Smartphone,
		Tablet,
		Palette,
		X,
		ShieldCheck,
		Wallet,
		Truck,
		Package,
		Scale,
		ArrowUpRight,
		Archive,
		BarChart3,
		AlertCircle,
		FileSpreadsheet,
		Building2
	} from '@lucide/svelte';
	import { onDestroy, onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import { goto } from '$app/navigation';

	let locale: Locale = 'vi';
	$: locale = $localeStore;
	$: t = translations[locale].templates.erpSolution;

	export let title: string = 'ERP: tài chính & kho';
	export let primaryColor: string = '#7C3AED';
	export let secondaryColor: string = '#F5F3FF';

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
	const borderSoft = '#CCFBF1';

	$: primaryColor = selectedPrimary;
	$: secondaryColor = selectedSecondary;

	const summaryCards = [
		{
			label: 'Ngân sách vận hành còn lại',
			value: '18.2 tỷ',
			change: 'Q2 / 2026',
			icon: Wallet
		},
		{
			label: 'Lô hàng đang di chuyển',
			value: '27',
			change: '8 tuyến ưu tiên',
			icon: Truck
		},
		{
			label: 'Mã hàng cần bổ sung',
			value: '46',
			change: '12 mã khẩn',
			icon: Package
		},
		{
			label: 'Sai lệch kiểm kê',
			value: '0.8%',
			change: 'Trong ngưỡng',
			icon: Scale
		}
	];

	const financeModules = [
		{
			title: 'Dòng tiền vào',
			value: '1.42 tỷ',
			desc: 'Thu từ khách hàng và hoàn ứng trong ngày',
			status: 'Tích cực'
		},
		{
			title: 'Dòng tiền ra',
			value: '860.000.000đ',
			desc: 'Thanh toán NCC, logistics và chi phí kho',
			status: 'Đã kiểm soát'
		},
		{
			title: 'Ngân sách mua hàng',
			value: '5.8 tỷ',
			desc: 'Còn đủ cho 3 chu kỳ nhập chính',
			status: 'Ổn định'
		}
	];

	const warehouseFlow = [
		{
			code: 'WH-IN-2048',
			type: 'Nhập kho',
			route: 'NCC Đông Á → Kho B1',
			time: '09:30',
			volume: '320 kiện',
			priority: 'Ưu tiên cao'
		},
		{
			code: 'WH-OUT-1182',
			type: 'Xuất kho',
			route: 'Kho A2 → Xưởng lắp ráp',
			time: '10:15',
			volume: '180 kiện',
			priority: 'Đúng kế hoạch'
		},
		{
			code: 'WH-TRF-778',
			type: 'Chuyển kho',
			route: 'Kho C1 → Kho B2',
			time: '11:00',
			volume: '64 pallet',
			priority: 'Cần theo dõi'
		},
		{
			code: 'WH-IN-2056',
			type: 'Nhập kho',
			route: 'NCC Hưng Phát → Kho A1',
			time: '13:45',
			volume: '95 kiện',
			priority: 'Chờ QC'
		}
	];

	const supplyAlerts = [
		{
			title: 'Bo mạch PCB-884 dưới tồn an toàn',
			desc: 'Còn 420 pcs, thấp hơn ngưỡng reorder 500 pcs.',
			level: 'warning'
		},
		{
			title: 'Lô hàng motor 24V giao chậm 6 giờ',
			desc: 'Tuyến từ Bình Dương đến Kho B1 đang chậm do kiểm đếm đầu bến.',
			level: 'info'
		},
		{
			title: 'Bao bì carton tăng giá 4.2%',
			desc: 'Nhà cung cấp báo điều chỉnh bảng giá từ đầu tuần sau.',
			level: 'critical'
		}
	];

	const operationTimeline = [
		{ time: '08:00', title: 'Đối chiếu tồn đầu ngày', owner: 'Kho trung tâm' },
		{ time: '09:30', title: 'Nhập lô motor 24V', owner: 'Kho B1' },
		{ time: '11:00', title: 'Chuyển kho nội bộ', owner: 'Điều phối vận hành' },
		{ time: '14:00', title: 'Khóa đối soát công nợ NCC', owner: 'Phòng tài chính' },
		{ time: '16:30', title: 'Chốt số liệu xuất kho', owner: 'Kế toán kho' }
	];

	const quickActions = [
		'Tạo phiếu nhập',
		'Tạo phiếu xuất',
		'Yêu cầu mua hàng',
		'Khóa sổ cuối ngày'
	];

	const pieStats = [
		{ label: 'Nguyên vật liệu', value: 41, color: '#0F766E' },
		{ label: 'Hàng đang sản xuất', value: 24, color: '#14B8A6' },
		{ label: 'Thành phẩm sẵn bán', value: 22, color: '#0EA5E9' },
		{ label: 'Hàng chậm luân chuyển', value: 13, color: '#F59E0B' }
	];

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
		selectedPrimary = '#7C3AED';
		selectedSecondary = '#F5F3FF';
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

	function getAlertStyles(level: string) {
		if (level === 'critical') {
			return {
				bg: '#FEF2F2',
				border: '#FECACA'
			};
		}

		if (level === 'warning') {
			return {
				bg: '#FFFBEB',
				border: '#FDE68A'
			};
		}

		return {
			bg: '#EFF6FF',
			border: '#BFDBFE'
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
								<span class="whitespace-nowrap">📦 ERP realtime operations</span>
								{#if deviceView !== 'mobile'}
									<span class="whitespace-nowrap">💰 Finance, inventory & supply control</span>
								{/if}
							</div>
							<div class="whitespace-nowrap">ERP Control Tower</div>
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
										style="background: linear-gradient(135deg, {primaryColor} 0%, #115e59 100%);"
									>
										<Building2 size={20} />
									</div>
									<div>
										<div class="text-lg font-bold sm:text-xl" style="color: {textPrimary};">
											{title}
										</div>
										<div class="text-[10px] tracking-[0.2em] uppercase" style="color: {textMuted};">
											Enterprise Resource Planning
										</div>
									</div>
								</div>

								<div
									class="rounded-2xl border px-4 py-3 text-sm"
									style="background-color: #ffffff; border-color: {borderSoft}; color: {textSecondary};"
								>
									Tìm chứng từ, vật tư, lệnh kho, công nợ...
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
							style:grid-template-columns={deviceView === 'desktop' ? '1.15fr 0.85fr' : '1fr'}
						>
							<div
								class="relative overflow-hidden rounded-[32px] p-6 text-white sm:p-8"
								style="background:
									radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 28%),
									linear-gradient(135deg, {primaryColor} 0%, #0f172a 78%);"
							>
								<div
									class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs sm:text-sm"
								>
									<ShieldCheck size={16} />
									ERP Control Tower
								</div>

								<h1
									class="mb-3 leading-tight font-bold"
									class:text-3xl={deviceView === 'mobile'}
									class:text-4xl={deviceView === 'tablet'}
									class:text-5xl={deviceView === 'desktop'}
								>
									Vận hành tài chính và kho
									<span class="block">theo thời gian thực</span>
								</h1>

								<p class="mb-6 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
									Theo dõi dòng tiền, tồn kho, vận chuyển nội bộ và cảnh báo chuỗi cung ứng từ một
									trung tâm điều phối duy nhất dành cho vận hành doanh nghiệp.
								</p>

								<div class="grid gap-3 sm:grid-cols-3">
									<div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
										<div class="text-xs text-white/70">Cash reserve</div>
										<div class="mt-1 text-2xl font-bold">8.6 tỷ</div>
									</div>
									<div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
										<div class="text-xs text-white/70">Warehouse uptime</div>
										<div class="mt-1 text-2xl font-bold">99.2%</div>
									</div>
									<div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
										<div class="text-xs text-white/70">Stock accuracy</div>
										<div class="mt-1 text-2xl font-bold">98.7%</div>
									</div>
								</div>
							</div>

							<div class="grid gap-4">
								<div
									class="rounded-[28px] border p-5 shadow-sm"
									style="background-color: #ffffff; border-color: {borderSoft};"
								>
									<div class="mb-1 text-sm" style="color: {textMuted};">Sức khỏe vận hành</div>
									<div class="text-3xl font-bold" style="color: {textPrimary};">A-</div>
									<div class="mt-2 text-sm" style="color: {textSecondary};">
										Các module tài chính và kho đang hoạt động ổn định
									</div>
								</div>

								<div
									class="rounded-[28px] border p-5 shadow-sm"
									style="background-color: #ffffff; border-color: {borderSoft};"
								>
									<div class="mb-1 text-sm" style="color: {textMuted};">
										Cảnh báo cần xử lý hôm nay
									</div>
									<div class="text-3xl font-bold" style="color: {textPrimary};">12</div>
									<div class="mt-2 text-sm" style="color: {textSecondary};">
										Chủ yếu ở tồn kho thấp và lịch nhập hàng
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
							style:grid-template-columns={deviceView === 'desktop' ? '0.9fr 1.1fr' : '1fr'}
						>
							<div class="grid gap-4">
								<div
									class="rounded-[30px] border p-5 shadow-sm"
									style="background-color: #ffffff; border-color: {borderSoft};"
								>
									<div class="mb-4 flex items-center gap-2">
										<Wallet size={18} style="color: {primaryColor};" />
										<h3 class="text-lg font-semibold" style="color: {textPrimary};">
											Điều phối ngân sách
										</h3>
									</div>

									<div class="space-y-3">
										{#each financeModules as item}
											<div
												class="rounded-[22px] border p-4"
												style="background-color: #F8FAFC; border-color: #E2E8F0;"
											>
												<div class="flex items-start justify-between gap-3">
													<div>
														<div class="text-sm" style="color: {textMuted};">{item.title}</div>
														<div class="mt-1 text-2xl font-bold" style="color: {textPrimary};">
															{item.value}
														</div>
														<div class="mt-1 text-sm" style="color: {textSecondary};">
															{item.desc}
														</div>
													</div>
													<div
														class="rounded-2xl px-3 py-2 text-xs font-semibold"
														style="background-color: {secondaryColor}; color: {primaryColor};"
													>
														{item.status}
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
										<Truck size={18} style="color: {primaryColor};" />
										<h3 class="text-lg font-semibold" style="color: {textPrimary};">
											Lịch vận hành hôm nay
										</h3>
									</div>

									<div class="space-y-3">
										{#each operationTimeline as item}
											<div
												class="flex items-start gap-4 rounded-[22px] border p-4"
												style="background-color: #F8FAFC; border-color: #E2E8F0;"
											>
												<div
													class="min-w-[74px] rounded-2xl px-3 py-2 text-center text-sm font-semibold"
													style="background-color: {secondaryColor}; color: {primaryColor};"
												>
													{item.time}
												</div>
												<div>
													<div class="font-medium" style="color: {textPrimary};">{item.title}</div>
													<div class="mt-1 text-sm" style="color: {textSecondary};">
														{item.owner}
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
									<div class="mb-4 flex items-center justify-between">
										<div class="flex items-center gap-2">
											<Archive size={18} style="color: {primaryColor};" />
											<h3 class="text-lg font-semibold" style="color: {textPrimary};">
												Luồng kho trong ngày
											</h3>
										</div>

										{#if deviceView !== 'mobile'}
											<button
												class="rounded-2xl px-4 py-2 text-sm font-medium text-white"
												style="background-color: {primaryColor};"
											>
												Mở điều phối kho
											</button>
										{/if}
									</div>

									<div class="space-y-3">
										{#each warehouseFlow as item}
											<div
												class="rounded-[24px] border p-4"
												style="background-color: #F8FAFC; border-color: #E2E8F0;"
											>
												<div
													class="grid items-center gap-3"
													style:grid-template-columns={deviceView === 'mobile'
														? '1fr'
														: deviceView === 'tablet'
															? '1.1fr 0.9fr 0.8fr'
															: '1.2fr 1fr 0.7fr 0.8fr'}
												>
													<div>
														<div class="font-semibold" style="color: {textPrimary};">
															{item.code}
														</div>
														<div class="text-sm" style="color: {textMuted};">{item.route}</div>
													</div>

													<div>
														<div class="text-xs" style="color: {textMuted};">Loại lệnh</div>
														<div class="font-semibold" style="color: {textPrimary};">
															{item.type}
														</div>
													</div>

													<div>
														<div class="text-xs" style="color: {textMuted};">Khối lượng</div>
														<div class="font-semibold" style="color: {textPrimary};">
															{item.volume}
														</div>
													</div>

													<div class="flex justify-start md:justify-end">
														<span
															class="inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold"
															style="background-color: {secondaryColor}; color: {primaryColor};"
														>
															{item.time} · {item.priority}
														</span>
													</div>
												</div>
											</div>
										{/each}
									</div>
								</div>

								<div
									class="grid gap-4"
									style:grid-template-columns={deviceView === 'desktop' ? '1fr 1fr' : '1fr'}
								>
									<div
										class="rounded-[30px] border p-5 shadow-sm"
										style="background-color: #ffffff; border-color: {borderSoft};"
									>
										<div class="mb-4 flex items-center gap-2">
											<BarChart3 size={18} style="color: {primaryColor};" />
											<h3 class="text-lg font-semibold" style="color: {textPrimary};">
												Cơ cấu giá trị tồn kho
											</h3>
										</div>

										<div class="flex justify-center pt-2 pb-4">
											<div
												class="relative h-52 w-52 rounded-full"
												style="background: conic-gradient({pieGradient});"
											>
												<div
													class="absolute inset-[22px] flex flex-col items-center justify-center rounded-full bg-white"
												>
													<div class="text-xs" style="color: {textMuted};">Inventory value</div>
													<div class="text-3xl font-bold" style="color: {textPrimary};">
														12.6 tỷ
													</div>
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

									<div
										class="rounded-[30px] border p-5 shadow-sm"
										style="background-color: #ffffff; border-color: {borderSoft};"
									>
										<div class="mb-4 flex items-center gap-2">
											<AlertCircle size={18} style="color: {primaryColor};" />
											<h3 class="text-lg font-semibold" style="color: {textPrimary};">
												Cảnh báo chuỗi cung ứng
											</h3>
										</div>

										<div class="space-y-3">
											{#each supplyAlerts as item}
												{@const tone = getAlertStyles(item.level)}
												<div
													class="rounded-[22px] border p-4"
													style="background-color: {tone.bg}; border-color: {tone.border};"
												>
													<div class="font-medium" style="color: {textPrimary};">{item.title}</div>
													<div class="mt-1 text-sm" style="color: {textSecondary};">
														{item.desc}
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
										<FileSpreadsheet size={18} style="color: {primaryColor};" />
										<h3 class="text-lg font-semibold" style="color: {textPrimary};">
											Tác vụ điều hành
										</h3>
									</div>

									<div
										class="grid gap-3"
										class:grid-cols-1={deviceView === 'mobile'}
										class:grid-cols-4={deviceView !== 'mobile'}
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
										ERP operations
									</div>
									<h3 class="mb-3 text-2xl font-semibold sm:text-3xl" style="color: {textPrimary};">
										Nội dung ERP đã đổi sang hướng control tower
									</h3>
									<p class="text-sm leading-relaxed sm:text-base" style="color: {textSecondary};">
										Bản này không đi theo mô-típ CRM hay HRM nữa, mà tập trung vào điều phối dòng
										tiền, tồn kho, vận chuyển, cảnh báo chuỗi cung ứng và nhịp vận hành nội bộ doanh
										nghiệp.
									</p>
								</div>

								<div class="rounded-[24px] p-5" style="background-color: {secondaryColor};">
									<div class="mb-3 font-semibold" style="color: {textPrimary};">Điểm khác biệt</div>
									<ul class="space-y-2 text-sm" style="color: {textSecondary};">
										<li>• Không còn kiểu sales pipeline của CRM</li>
										<li>• Không còn kiểu quản trị nhân sự của HRM</li>
										<li>• Tập trung vào điều phối vận hành doanh nghiệp</li>
										<li>• Pie chart gắn với giá trị tồn kho thực tế hơn</li>
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
						placeholder="#0F766E"
					/>
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
						placeholder="#F0FDFA"
					/>
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
