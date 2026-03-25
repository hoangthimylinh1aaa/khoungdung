<script lang="ts">
	import {
		Monitor,
		Smartphone,
		Tablet,
		Palette,
		X,
		Clock3,
		Wallet,
		Users,
		CalendarDays,
		CheckCircle2,
		AlertCircle
	} from '@lucide/svelte';
	import { onDestroy, onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { type Locale, translations } from '$lib/i18n';
	import { localeStore } from '$lib/stores/locale';
	import { goto } from '$app/navigation';

	let locale: Locale = 'vi';
	const unsubscribe = localeStore.subscribe((v) => (locale = v));
	onDestroy(unsubscribe);

	$: t = translations[locale].templates.colorCustomizer;
	export let title: string = 'HRM: chấm công & lương';
	export let primaryColor: string = '#0F766E';
	export let secondaryColor: string = '#ECFDF5';

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

	$: primaryColor = selectedPrimary;
	$: secondaryColor = selectedSecondary;

	const attendanceSummary = [
		{ label: 'Đi làm đúng giờ', value: '92%', icon: '⏱️' },
		{ label: 'Đi muộn', value: '14', icon: '⚠️' },
		{ label: 'Nghỉ phép', value: '08', icon: '🌴' },
		{ label: 'Làm thêm giờ', value: '126h', icon: '🌙' }
	];

	const employees = [
		{
			name: 'Nguyễn Minh Anh',
			code: 'NV001',
			department: 'Nhân sự',
			checkIn: '08:02',
			status: 'Đúng giờ',
			salary: '18.500.000'
		},
		{
			name: 'Trần Gia Huy',
			code: 'NV014',
			department: 'Kế toán',
			checkIn: '08:17',
			status: 'Đi muộn',
			salary: '16.200.000'
		},
		{
			name: 'Lê Khánh Linh',
			code: 'NV028',
			department: 'Marketing',
			checkIn: '07:56',
			status: 'Đúng giờ',
			salary: '15.800.000'
		},
		{
			name: 'Phạm Quốc Bảo',
			code: 'NV043',
			department: 'Kỹ thuật',
			checkIn: 'Nghỉ phép',
			status: 'Vắng mặt',
			salary: '22.400.000'
		}
	];

	const payrollCards = [
		{ label: 'Quỹ lương tháng này', value: '1.248.000.000đ', note: '+8.4%' },
		{ label: 'Thưởng hiệu suất', value: '126.000.000đ', note: '42 nhân sự' },
		{ label: 'Khấu trừ BHXH', value: '84.600.000đ', note: 'Tự động' }
	];

	const quickActions = ['Xuất bảng công', 'Tạo phiếu lương', 'Duyệt tăng ca', 'Quản lý ca làm'];

	function setDevice(device: 'mobile' | 'tablet' | 'desktop') {
		deviceView = device;
	}

	function resetColors() {
		selectedPrimary = '#0F766E';
		selectedSecondary = '#ECFDF5';
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
		if (status === 'Đúng giờ') {
			return {
				bg: '#DCFCE7',
				color: '#166534',
				icon: CheckCircle2
			};
		}

		if (status === 'Đi muộn') {
			return {
				bg: '#FEF3C7',
				color: '#92400E',
				icon: AlertCircle
			};
		}

		return {
			bg: '#FEE2E2',
			color: '#991B1B',
			icon: AlertCircle
		};
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

		<div class="flex justify-center">
			<div
				class="w-full overflow-hidden rounded-lg shadow-2xl"
				style="max-width: {deviceView === 'desktop'
					? '100%'
					: deviceWidths[deviceView]}; background-color: {secondaryColor};"
			>
				<div class="min-h-screen overflow-x-hidden">
					<div
						class="px-4 py-2 text-[11px] text-white sm:px-6 sm:text-xs"
						style="background-color: {primaryColor};"
					>
						<div class="flex items-center justify-between gap-3">
							<div class="flex items-center gap-4 overflow-hidden">
								<span class="whitespace-nowrap">📍 Đồng bộ máy chấm công theo thời gian thực</span>
								{#if deviceView !== 'mobile'}
									<span class="whitespace-nowrap">💸 Tính lương tự động cuối kỳ</span>
								{/if}
							</div>
							<div class="whitespace-nowrap">HRM Dashboard</div>
						</div>
					</div>

					<header
						class="sticky top-0 z-20 border-b bg-white/95 backdrop-blur"
						style="border-color: #d9f99d;"
					>
						<div class="px-4 py-4 sm:px-6">
							<div
								class="grid items-center gap-3"
								style:grid-template-columns={deviceView === 'desktop'
									? '260px 1fr 180px'
									: deviceView === 'tablet'
										? '220px 1fr 130px'
										: '1fr'}
							>
								<div class="flex items-center gap-3">
									<div
										class="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md"
										style="background-color: {primaryColor};"
									>
										<Users size={20} />
									</div>
									<div>
										<div class="text-lg font-bold sm:text-xl" style="color: {textPrimary};">
											{title}
										</div>
										<div class="text-[10px] tracking-[0.2em] uppercase" style="color: {textMuted};">
											Human Resource Management
										</div>
									</div>
								</div>

								<div
									class="rounded-2xl border px-4 py-3 text-sm"
									style="background-color: #ffffff; border-color: #d9f99d; color: {textSecondary};"
								>
									Tìm nhân viên, phòng ban, kỳ lương...
								</div>

								{#if deviceView !== 'mobile'}
									<div class="flex justify-end">
										<button
											class="rounded-2xl px-4 py-3 text-sm font-semibold text-white"
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
							style:grid-template-columns={deviceView === 'desktop' ? '1.2fr 0.8fr' : '1fr'}
						>
							<div
								class="relative overflow-hidden rounded-[2rem] p-6 text-white sm:p-8"
								style="background: linear-gradient(135deg, {primaryColor} 0%, #0f172a 100%);"
							>
								<div
									class="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs sm:text-sm"
								>
									<CalendarDays size={16} />
									Kỳ công tháng 03/2026
								</div>

								<h1
									class="mb-3 leading-tight font-bold"
									class:text-3xl={deviceView === 'mobile'}
									class:text-4xl={deviceView === 'tablet'}
									class:text-5xl={deviceView === 'desktop'}
								>
									Theo dõi chấm công,
									<span class="block">quản lý lương minh bạch</span>
								</h1>

								<p class="mb-6 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
									Giao diện HRM hiện đại, rõ ràng, ưu tiên số liệu, cảnh báo và hành động nhanh cho
									quản trị nhân sự trên mọi thiết bị.
								</p>

								<div class="flex flex-col gap-3 sm:flex-row">
									<button
										class="rounded-2xl bg-white px-6 py-3 text-sm font-semibold sm:text-base"
										style="color: {primaryColor};"
									>
										Chấm công hôm nay
									</button>
									<button
										class="rounded-2xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium sm:text-base"
									>
										Xem bảng lương
									</button>
								</div>
							</div>

							<div class="grid gap-4">
								<div
									class="rounded-[1.5rem] border p-5 shadow-sm"
									style="background-color: #ffffff; border-color: #d9f99d;"
								>
									<div class="mb-1 text-sm" style="color: {textMuted};">Nhân sự đang làm việc</div>
									<div class="text-3xl font-bold" style="color: {textPrimary};">248</div>
									<div class="mt-2 text-sm" style="color: {textSecondary};">+12 so với hôm qua</div>
								</div>

								<div
									class="rounded-[1.5rem] border p-5 shadow-sm"
									style="background-color: #ffffff; border-color: #d9f99d;"
								>
									<div class="mb-1 text-sm" style="color: {textMuted};">Ca trễ cần xử lý</div>
									<div class="text-3xl font-bold" style="color: #D97706;">14</div>
									<div class="mt-2 text-sm" style="color: {textSecondary};">
										Cần xác nhận trước 10:00
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
							{#each attendanceSummary as item}
								<div
									class="rounded-2xl border p-4 shadow-sm"
									style="background-color: #ffffff; border-color: #d9f99d;"
								>
									<div class="mb-2 text-xs" style="color: {textMuted};">{item.label}</div>
									<div class="flex items-center justify-between">
										<div class="text-2xl font-bold" style="color: {textPrimary};">{item.value}</div>
										<div class="text-xl">{item.icon}</div>
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
							<div
								class="rounded-[1.75rem] border p-4 shadow-sm sm:p-5"
								style="background-color: #ffffff; border-color: #d9f99d;"
							>
								<div class="mb-4 flex items-center justify-between">
									<div>
										<h2 class="text-lg font-semibold sm:text-xl" style="color: {textPrimary};">
											Danh sách chấm công hôm nay
										</h2>
										<div class="text-sm" style="color: {textMuted};">
											Cập nhật theo thời gian thực
										</div>
									</div>

									{#if deviceView !== 'mobile'}
										<button
											class="rounded-xl px-4 py-2 text-sm font-medium text-white"
											style="background-color: {primaryColor};"
										>
											Duyệt công
										</button>
									{/if}
								</div>

								<div class="space-y-3">
									{#each employees as employee}
										{@const tone = getStatusTone(employee.status)}
										<div
											class="rounded-2xl border p-4"
											style="background-color: #fafafa; border-color: #e4e4e7;"
										>
											<div
												class="grid items-center gap-3"
												style:grid-template-columns={deviceView === 'mobile'
													? '1fr'
													: deviceView === 'tablet'
														? '1.4fr 0.8fr 0.8fr'
														: '1.8fr 1fr 1fr 1fr'}
											>
												<div>
													<div class="font-semibold" style="color: {textPrimary};">
														{employee.name}
													</div>
													<div class="text-sm" style="color: {textMuted};">
														{employee.code} · {employee.department}
													</div>
												</div>

												<div>
													<div class="text-xs" style="color: {textMuted};">Check-in</div>
													<div class="font-semibold" style="color: {textPrimary};">
														{employee.checkIn}
													</div>
												</div>

												<div>
													<div class="text-xs" style="color: {textMuted};">Lương cơ bản</div>
													<div class="font-semibold" style="color: {textPrimary};">
														{employee.salary}đ
													</div>
												</div>

												<div class="flex justify-start md:justify-end">
													<span
														class="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold"
														style="background-color: {tone.bg}; color: {tone.color};"
													>
														<svelte:component this={tone.icon} size={14} />
														{employee.status}
													</span>
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>

							<div class="grid gap-4">
								<div
									class="rounded-[1.75rem] border p-5 shadow-sm"
									style="background-color: #ffffff; border-color: #d9f99d;"
								>
									<div class="mb-4 flex items-center gap-2">
										<Wallet size={18} style="color: {primaryColor};" />
										<h3 class="text-lg font-semibold" style="color: {textPrimary};">
											Tổng quan lương
										</h3>
									</div>

									<div class="space-y-3">
										{#each payrollCards as item}
											<div
												class="rounded-2xl border p-4"
												style="background-color: #fafafa; border-color: #e4e4e7;"
											>
												<div class="text-xs" style="color: {textMuted};">{item.label}</div>
												<div class="mt-1 text-xl font-bold" style="color: {textPrimary};">
													{item.value}
												</div>
												<div class="mt-1 text-sm" style="color: {primaryColor};">{item.note}</div>
											</div>
										{/each}
									</div>
								</div>

								<div
									class="rounded-[1.75rem] border p-5 shadow-sm"
									style="background-color: #ffffff; border-color: #d9f99d;"
								>
									<div class="mb-4 flex items-center gap-2">
										<Clock3 size={18} style="color: {primaryColor};" />
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
												class="rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all hover:shadow-sm"
												style="background-color: #fafafa; border-color: #e4e4e7; color: {textSecondary};"
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
							class="rounded-[2rem] border p-6 sm:p-8"
							style="background-color: #ffffff; border-color: #d9f99d;"
						>
							<div
								class="grid gap-6"
								style:grid-template-columns={deviceView === 'desktop' ? '1.2fr 0.8fr' : '1fr'}
							>
								<div>
									<div class="mb-2 text-xs tracking-[0.2em] uppercase" style="color: {textMuted};">
										HR operations
									</div>
									<h3 class="mb-3 text-2xl font-semibold sm:text-3xl" style="color: {textPrimary};">
										Giao diện tập trung vào vận hành nhân sự
									</h3>
									<p class="text-sm leading-relaxed sm:text-base" style="color: {textSecondary};">
										Dễ đọc số liệu, dễ thao tác trên mobile, tablet và desktop.
									</p>
								</div>

								<div class="rounded-[1.5rem] p-5" style="background-color: {secondaryColor};">
									<div class="mb-3 font-semibold" style="color: {textPrimary};">
										Điểm đã giữ nguyên
									</div>
									<ul class="space-y-2 text-sm" style="color: {textSecondary};">
										<li>• Giữ nguyên deviceView logic</li>
										<li>• Giữ nguyên UI panel đổi màu</li>
										<li>• Giữ nguyên selectedPrimary / selectedSecondary</li>
										<li>• Chỉ đổi nội dung sang HRM</li>
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
						placeholder="#4F7A4D"
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
						placeholder="#F3F0E8"
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
		background: #52525b;
		border-radius: 999px;
	}
</style>
