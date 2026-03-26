<script lang="ts">
	import {
		Monitor,
		Smartphone,
		Tablet,
		Palette,
		X,
		Bot,
		Headset,
		MessageSquareText,
		BrainCircuit,
		Sparkles,
		Shield,
		ArrowUpRight,
		Clock3,
		Search,
		PanelLeftClose,
		PanelRightClose,
		Workflow,
		BadgeCheck,
		Activity,
		Zap,
		FileText
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
	const borderSoft = '#DCE8FF';
	const accentSoft = '#EAF2FF';
	const accentDark = '#0B1220';
	const successColor = '#10B981';
	const warningColor = '#F59E0B';
	const alertColor = '#EF4444';

	const inboxQueues = [
		{ id: 1, name: 'Live chat', count: 18, icon: '💬' },
		{ id: 2, name: 'Order issues', count: 7, icon: '📦' },
		{ id: 3, name: 'Billing', count: 4, icon: '💳' },
		{ id: 4, name: 'Returns', count: 6, icon: '↩️' },
		{ id: 5, name: 'Escalations', count: 2, icon: '🚨' }
	];

	const supportStats = [
		{ label: 'Auto-resolved', value: '74%' },
		{ label: 'Avg first reply', value: '18s' },
		{ label: 'Agent assist usage', value: '91%' },
		{ label: 'CSAT trend', value: '+12%' }
	];

	const chatMessages = [
		{
			id: 1,
			role: 'customer',
			name: 'Linh',
			time: '09:42',
			text: 'Đơn hàng của tôi báo đã giao nhưng tôi chưa nhận được.'
		},
		{
			id: 2,
			role: 'assistant',
			name: 'SupportFlow AI',
			time: '09:42',
			text: 'Mình đang kiểm tra trạng thái vận chuyển cho đơn hàng #SF-28491. Bạn chờ mình vài giây nhé.'
		},
		{
			id: 3,
			role: 'assistant',
			name: 'SupportFlow AI',
			time: '09:42',
			text: 'Theo hãng vận chuyển, đơn đang ở trạng thái “đã giao tại quầy lễ tân”. Bạn muốn mình gửi chi tiết bằng chứng giao hàng không?'
		},
		{
			id: 4,
			role: 'customer',
			name: 'Linh',
			time: '09:43',
			text: 'Có, và nếu không thấy thì tôi muốn tạo khiếu nại luôn.'
		}
	];

	const aiActions = [
		{
			id: 1,
			title: 'Suggested reply',
			desc: 'Gửi ảnh bằng chứng giao hàng + hỏi thêm vị trí nhận hàng cụ thể.'
		},
		{
			id: 2,
			title: 'Next best workflow',
			desc: 'Nếu khách xác nhận chưa nhận: mở dispute ticket với mức ưu tiên cao.'
		},
		{
			id: 3,
			title: 'Relevant policy',
			desc: 'Policy: Missing delivery claim within 48 hours from delivery timestamp.'
		}
	];

	const copilots = [
		{
			id: 1,
			title: 'Order lookup',
			desc: 'Tra cứu trạng thái, ETA, lịch sử giao hàng và ảnh POD.',
			icon: '📦'
		},
		{
			id: 2,
			title: 'Refund assistant',
			desc: 'Gợi ý hướng xử lý hoàn tiền đúng policy và mức phê duyệt.',
			icon: '💸'
		},
		{
			id: 3,
			title: 'Tone guardian',
			desc: 'Giữ câu trả lời nhất quán, lịch sự và đúng brand voice.',
			icon: '🛡️'
		},
		{
			id: 4,
			title: 'Knowledge answerer',
			desc: 'Trả lời từ help center, SOP nội bộ và lịch sử ticket.',
			icon: '📚'
		}
	];

	const workflowSteps = [
		{ id: 1, title: 'Intent detected', detail: 'Missing delivery claim', state: 'done' },
		{ id: 2, title: 'Knowledge retrieved', detail: 'Delivery proof + claim policy', state: 'done' },
		{ id: 3, title: 'Confidence scored', detail: '0.93 answer confidence', state: 'live' },
		{
			id: 4,
			title: 'Escalation check',
			detail: 'Human handoff if customer disputes proof',
			state: 'idle'
		}
	];

	const footerLinksA = ['Platform', 'Inbox', 'Agent Copilot', 'Workflows'];
	const footerLinksB = ['Security', 'Trust center', 'Docs', 'API'];

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

		<div class="flex justify-center">
			<div
				class="w-full overflow-hidden rounded-[24px] shadow-2xl"
				style="max-width: {deviceView === 'desktop'
					? '100%'
					: deviceWidths[deviceView]}; background-color: {secondaryColor};"
			>
				<div class="min-h-screen overflow-x-hidden">
					<!-- Top command bar -->
					<div
						class="px-4 py-2 text-[11px] text-white sm:px-6 sm:text-xs"
						style="background: linear-gradient(90deg, {accentDark} 0%, {primaryColor} 55%, #0ea5e9 100%);"
					>
						<div class="flex items-center justify-between gap-3">
							<div class="flex items-center gap-3 overflow-hidden sm:gap-5">
								<span class="whitespace-nowrap">● Live support system healthy</span>
								{#if deviceView !== 'mobile'}
									<span class="whitespace-nowrap">74% conversations auto-resolved</span>
									<span class="whitespace-nowrap">2 escalations waiting for human review</span>
								{/if}
							</div>
							<div class="whitespace-nowrap">Command Center</div>
						</div>
					</div>

					<!-- Header -->
					<header
						class="sticky top-0 z-20 border-b bg-white/90 backdrop-blur-xl"
						style="border-color: {borderSoft};"
					>
						<div class="px-4 py-4 sm:px-6">
							<div
								class="grid items-center gap-4"
								style:grid-template-columns={deviceView === 'desktop'
									? '220px 1fr 220px'
									: deviceView === 'tablet'
										? '210px 1fr 120px'
										: '1fr'}
							>
								<div class="flex items-center gap-3">
									<div
										class="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-md"
										style="background: linear-gradient(135deg, {primaryColor} 0%, #0ea5e9 100%);"
									>
										<Bot size={20} />
									</div>
									<div>
										<div class="text-lg font-bold sm:text-xl" style="color: {textPrimary};">
											SupportFlow AI
										</div>
										<div class="text-[10px] tracking-[0.22em]" style="color: {textMuted};">
											CUSTOMER SUPPORT COMMAND CENTER
										</div>
									</div>
								</div>

								{#if deviceView !== 'mobile'}
									<div class="relative">
										<Search
											size={16}
											class="absolute top-1/2 left-4 -translate-y-1/2"
											style="color: {textMuted};"
										/>
										<input
											type="text"
											placeholder="Search conversation, order ID, customer, policy..."
											class="w-full rounded-2xl border py-3 pr-4 pl-[10px] text-sm outline-none"
											style="background-color: {panelBg}; border-color: {borderSoft}; color: {textPrimary};"
										/>
									</div>
								{/if}

								<div class="flex items-center justify-end gap-2">
									{#if deviceView === 'desktop'}
										<button
											class="rounded-2xl border px-4 py-2 text-xs whitespace-nowrap"
											style="border-color: {borderSoft}; color: {textPrimary}; background-color: #fff;"
										>
											View reports
										</button>
									{/if}
									{#if deviceView === 'desktop'}
										<button
											class="rounded-2xl px-4 py-2 text-xs font-medium whitespace-nowrap text-white"
											style="background: linear-gradient(135deg, {primaryColor} 0%, #0ea5e9 100%);"
										>
											Open inbox
										</button>
									{/if}
								</div>
							</div>
						</div>
					</header>

					<!-- Stats strip -->
					<section class="px-4 pt-4 sm:px-6 sm:pt-5">
						<div
							class="grid gap-3"
							class:grid-cols-2={deviceView === 'mobile'}
							class:grid-cols-4={deviceView !== 'mobile'}
						>
							{#each supportStats as item}
								<div
									class="rounded-2xl border bg-white p-4 shadow-sm"
									style="border-color: {borderSoft};"
								>
									<div class="mb-1 text-xs" style="color: {textMuted};">{item.label}</div>
									<div class="text-xl font-bold" style="color: {primaryColor};">{item.value}</div>
								</div>
							{/each}
						</div>
					</section>

					<!-- Main workspace -->
					<section class="px-4 py-5 sm:px-6 sm:py-6">
						<div
							class="grid gap-4"
							style:grid-template-columns={deviceView === 'desktop'
								? '260px minmax(0,1fr) 320px'
								: deviceView === 'tablet'
									? '220px minmax(0,1fr)'
									: '1fr'}
						>
							<!-- Left rail -->
							{#if deviceView !== 'mobile'}
								<aside
									class="rounded-[28px] border bg-white p-4 shadow-sm"
									style="border-color: {borderSoft};"
								>
									<div class="mb-4 flex items-center gap-2">
										<PanelLeftClose size={16} style="color: {textMuted};" />
										<div class="text-sm font-semibold" style="color: {textPrimary};">Queues</div>
									</div>

									<div class="space-y-2">
										{#each inboxQueues as queue}
											<div
												class="flex items-center justify-between rounded-2xl border px-3 py-3"
												style="background-color: #F8FBFF; border-color: {borderSoft};"
											>
												<div class="flex items-center gap-3">
													<span>{queue.icon}</span>
													<div>
														<div class="text-sm font-medium" style="color: {textPrimary};">
															{queue.name}
														</div>
													</div>
												</div>
												<div
													class="rounded-full px-2.5 py-1 text-xs font-semibold"
													style="background-color: {accentSoft}; color: {primaryColor};"
												>
													{queue.count}
												</div>
											</div>
										{/each}
									</div>

									<div class="mt-5 rounded-2xl p-4" style="background-color: #0F172A;">
										<div class="mb-2 flex items-center gap-2 text-white">
											<Headset size={16} />
											<span class="text-sm font-semibold">Agent capacity</span>
										</div>
										<div class="space-y-3 text-sm">
											<div class="flex items-center justify-between text-slate-300">
												<span>Available agents</span>
												<span class="font-semibold text-white">12</span>
											</div>
											<div class="flex items-center justify-between text-slate-300">
												<span>Busy</span>
												<span class="font-semibold text-white">8</span>
											</div>
											<div class="flex items-center justify-between text-slate-300">
												<span>SLA risk</span>
												<span style="color: #FBBF24;" class="font-semibold">2 cases</span>
											</div>
										</div>
									</div>
								</aside>
							{/if}

							<!-- Center conversation area -->
							<div class="space-y-4">
								<div
									class="overflow-hidden rounded-[28px] border bg-white shadow-sm"
									style="border-color: {borderSoft};"
								>
									<div class="border-b px-4 py-4 sm:px-5" style="border-color: {borderSoft};">
										<div class="flex items-start justify-between gap-4">
											<div>
												<div class="mb-1 flex items-center gap-2">
													<div
														class="h-2.5 w-2.5 rounded-full"
														style="background-color: {warningColor};"
													></div>
													<span class="text-sm font-semibold" style="color: {textPrimary};">
														Conversation #SF-28491
													</span>
												</div>
												<div class="text-sm" style="color: {textSecondary};">
													Missing delivery claim · customer sentiment elevated
												</div>
											</div>

											<div class="flex gap-2">
												<div
													class="rounded-xl px-3 py-2 text-xs font-medium"
													style="background-color: #FEF3C7; color: #92400E;"
												>
													Needs review
												</div>
												<div
													class="rounded-xl px-3 py-2 text-xs font-medium"
													style="background-color: #DBEAFE; color: #1D4ED8;"
												>
													AI active
												</div>
											</div>
										</div>
									</div>

									<div class="space-y-4 px-4 py-5 sm:px-5">
										{#each chatMessages as msg}
											<div class:ml-auto={msg.role === 'assistant'} class="max-w-[88%]">
												<div
													class="mb-1 flex items-center gap-2 text-xs"
													style="color: {textMuted};"
												>
													<span>{msg.name}</span>
													<span>•</span>
													<span>{msg.time}</span>
												</div>

												<div
													class="rounded-2xl px-4 py-3 text-sm leading-relaxed"
													style="background-color: {msg.role === 'assistant'
														? accentSoft
														: '#F8FAFC'};
													color: {textPrimary};
													border: 1px solid {msg.role === 'assistant' ? borderSoft : '#E5E7EB'};"
												>
													{msg.text}
												</div>
											</div>
										{/each}
									</div>

									<div class="border-t px-4 py-4 sm:px-5" style="border-color: {borderSoft};">
										<div class="rounded-[22px] border p-3" style="border-color: {borderSoft};">
											<div class="mb-2 text-xs font-medium" style="color: {textMuted};">
												Agent composer with AI assist
											</div>
											<div class="text-sm" style="color: {textSecondary};">
												Tôi đã tìm thấy bằng chứng giao hàng tại quầy lễ tân. Mình sẽ gửi hình ảnh
												xác nhận ngay bây giờ. Nếu bạn vẫn chưa nhận được, mình có thể tạo khiếu nại
												ưu tiên ngay trong cuộc trò chuyện này.
											</div>

											<div class="mt-3 flex flex-wrap gap-2">
												<button
													class="rounded-xl px-3 py-2 text-xs font-medium text-white"
													style="background-color: {primaryColor};"
												>
													Send reply
												</button>
												<button
													class="rounded-xl border px-3 py-2 text-xs"
													style="border-color: {borderSoft}; color: {textPrimary};"
												>
													Rewrite softer
												</button>
												<button
													class="rounded-xl border px-3 py-2 text-xs"
													style="border-color: {borderSoft}; color: {textPrimary};"
												>
													Escalate to agent
												</button>
											</div>
										</div>
									</div>
								</div>

								<!-- Workflow board -->
								<div
									class="rounded-[28px] border bg-white p-4 shadow-sm sm:p-5"
									style="border-color: {borderSoft};"
								>
									<div class="mb-4 flex items-center justify-between">
										<div class="flex items-center gap-2">
											<Workflow size={18} style="color: {primaryColor};" />
											<h2 class="text-lg font-semibold" style="color: {textPrimary};">
												Resolution workflow
											</h2>
										</div>
										<span class="text-sm" style="color: {textMuted};">Realtime orchestration</span>
									</div>

									<div
										class="grid gap-3"
										class:grid-cols-1={deviceView === 'mobile'}
										class:grid-cols-2={deviceView === 'tablet'}
										class:grid-cols-4={deviceView === 'desktop'}
									>
										{#each workflowSteps as step}
											<div
												class="rounded-2xl border p-4"
												style="border-color: {borderSoft}; background-color:
												{step.state === 'done' ? '#F0FDF4' : step.state === 'live' ? '#EFF6FF' : '#F8FAFC'};"
											>
												<div class="mb-2 flex items-center justify-between">
													<div
														class="text-xs font-semibold tracking-[0.15em] uppercase"
														style="color:
														{step.state === 'done' ? successColor : step.state === 'live' ? primaryColor : textMuted};"
													>
														{step.state}
													</div>
													{#if step.state === 'done'}
														<BadgeCheck size={16} style="color: {successColor};" />
													{:else if step.state === 'live'}
														<Activity size={16} style="color: {primaryColor};" />
													{:else}
														<Clock3 size={16} style="color: {textMuted};" />
													{/if}
												</div>

												<div class="mb-1 font-semibold" style="color: {textPrimary};">
													{step.title}
												</div>
												<div class="text-sm leading-relaxed" style="color: {textSecondary};">
													{step.detail}
												</div>
											</div>
										{/each}
									</div>
								</div>
							</div>

							<!-- Right rail -->
							{#if deviceView === 'desktop'}
								<aside class="space-y-4">
									<div
										class="rounded-[28px] border bg-white p-4 shadow-sm"
										style="border-color: {borderSoft};"
									>
										<div class="mb-4 flex items-center gap-2">
											<PanelRightClose size={16} style="color: {textMuted};" />
											<div class="text-sm font-semibold" style="color: {textPrimary};">
												AI decision panel
											</div>
										</div>

										<div class="space-y-3">
											{#each aiActions as item}
												<div
													class="rounded-2xl border p-4"
													style="background-color: #F8FBFF; border-color: {borderSoft};"
												>
													<div class="mb-1 text-sm font-semibold" style="color: {textPrimary};">
														{item.title}
													</div>
													<div class="text-sm leading-relaxed" style="color: {textSecondary};">
														{item.desc}
													</div>
												</div>
											{/each}
										</div>
									</div>

									<div
										class="rounded-[28px] border bg-white p-4 shadow-sm"
										style="border-color: {borderSoft};"
									>
										<div class="mb-4 flex items-center gap-2">
											<BrainCircuit size={16} style="color: {primaryColor};" />
											<div class="text-sm font-semibold" style="color: {textPrimary};">
												Copilot skills
											</div>
										</div>

										<div class="space-y-3">
											{#each copilots as item}
												<div class="rounded-2xl p-3" style="background-color: #F8FAFC;">
													<div class="mb-1 flex items-center gap-2">
														<span>{item.icon}</span>
														<span class="text-sm font-medium" style="color: {textPrimary};">
															{item.title}
														</span>
													</div>
													<div class="text-sm leading-relaxed" style="color: {textSecondary};">
														{item.desc}
													</div>
												</div>
											{/each}
										</div>
									</div>

									<div
										class="rounded-[28px] p-5 text-white shadow-sm"
										style="background: linear-gradient(135deg, {accentDark} 0%, {primaryColor} 60%, #0ea5e9 100%);"
									>
										<div class="mb-2 flex items-center gap-2 text-white/90">
											<Zap size={16} />
											<span class="text-sm font-semibold">Why this layout works</span>
										</div>
										<div class="space-y-3 text-sm leading-relaxed text-white/90">
											<div>Không còn kiểu landing page chung chung.</div>
											<div>Tập trung vào live conversation, AI decisioning và agent workflow.</div>
											<div>Hợp với chủ đề chatbot hỗ trợ khách hàng hơn nhiều.</div>
										</div>

										<button
											class="mt-4 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold"
											style="color: {primaryColor};"
										>
											Open system view
											<ArrowUpRight size={16} />
										</button>
									</div>
								</aside>
							{/if}
						</div>
					</section>

					<!-- Tablet/mobile extra section -->
					{#if deviceView !== 'desktop'}
						<section class="px-4 pb-6 sm:px-6">
							<div
								class="rounded-[28px] border bg-white p-4 shadow-sm sm:p-5"
								style="border-color: {borderSoft};"
							>
								<div class="mb-4 flex items-center gap-2">
									<FileText size={18} style="color: {primaryColor};" />
									<h2 class="text-lg font-semibold" style="color: {textPrimary};">AI side panel</h2>
								</div>

								<div class="grid gap-3">
									{#each aiActions as item}
										<div class="rounded-2xl p-4" style="background-color: #F8FBFF;">
											<div class="mb-1 text-sm font-semibold" style="color: {textPrimary};">
												{item.title}
											</div>
											<div class="text-sm" style="color: {textSecondary};">{item.desc}</div>
										</div>
									{/each}
								</div>
							</div>
						</section>
					{/if}

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
											style="background: linear-gradient(135deg, {primaryColor} 0%, #0ea5e9 100%);"
										>
											<Bot size={18} />
										</div>
										<div>
											<div class="text-lg font-bold" style="color: {textPrimary};">
												SupportFlow AI
											</div>
											<div class="text-[10px] tracking-[0.24em]" style="color: {textMuted};">
												CUSTOMER SUPPORT COMMAND CENTER
											</div>
										</div>
									</div>

									<p class="max-w-md text-sm leading-relaxed" style="color: {textSecondary};">
										Một workspace hiện đại cho chatbot hỗ trợ khách hàng, agent copilot, knowledge
										retrieval và resolution workflow trong cùng một giao diện.
									</p>
								</div>

								<div>
									<h4 class="mb-3 text-sm font-semibold" style="color: {textPrimary};">
										Workspace
									</h4>
									<ul class="space-y-2 text-sm" style="color: {textSecondary};">
										{#each footerLinksA as item}
											<li>{item}</li>
										{/each}
									</ul>
								</div>

								<div>
									<h4 class="mb-3 text-sm font-semibold" style="color: {textPrimary};">
										Resources
									</h4>
									<ul class="space-y-2 text-sm" style="color: {textSecondary};">
										{#each footerLinksB as item}
											<li>{item}</li>
										{/each}
									</ul>
								</div>
							</div>

							<div
								class="flex flex-col gap-3 border-t pt-5 text-xs sm:flex-row sm:items-center sm:justify-between"
								style="border-color: {borderSoft}; color: {textMuted};"
							>
								<div>© 2026 SupportFlow AI. Built for faster, calmer customer support.</div>
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
