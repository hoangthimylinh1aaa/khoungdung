<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import Badge from '../ui/Badge.svelte';

	let locale: Locale = 'vi';
	$: locale = $localeStore;
	$: h = translations[locale].hero;

	const statsData = [
		{ key: 'clients', value: '500+' },
		{ key: 'transactions', value: '2M+' },
		{ key: 'uptime', value: '99.9%' },
		{ key: 'support', value: '24/7' }
	];
</script>

<section
	class="noise-overlay relative flex min-h-screen items-center overflow-hidden"
	aria-label="Hero section"
>
	<!-- Background effects -->
	<div class="absolute inset-0 -z-10">
		<div
			class="bg-primary/10 animate-pulse-glow absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl"
		></div>
		<div
			class="animate-pulse-glow animation-delay-500 absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl"
		></div>
		<div
			class="absolute top-0 right-0 h-full w-full"
			style="background: radial-gradient(ellipse at 70% 20%, rgba(103,219,236,0.08) 0%, transparent 60%);"
		></div>
		<!-- Grid pattern -->
		<div
			class="absolute inset-0 opacity-[0.03]"
			style="background-image: linear-gradient(rgba(103,219,236,1) 1px, transparent 1px), linear-gradient(90deg, rgba(103,219,236,1) 1px, transparent 1px); background-size: 60px 60px;"
		></div>
	</div>

	<div class="container-custom section-padding pt-28 pb-16 sm:pt-32 lg:pt-36">
		<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
			<!-- Left Content -->
			<div>
				<!-- Badge -->
				<div
					class="animate-fade-up mb-6"
					style="animation-delay: 0ms; animation-fill-mode: forwards;"
				>
					<Badge variant="primary">
						<span class="bg-primary h-1.5 w-1.5 animate-pulse rounded-full"></span>
						{h.badge}
					</Badge>
				</div>

				<!-- Headline -->
				<h1 class="font-display mb-6 leading-tight font-bold">
					<span
						class="animate-fade-up opacity-0-init block text-4xl text-white sm:text-5xl lg:text-6xl xl:text-7xl"
						style="animation-delay: 100ms; animation-fill-mode: forwards;"
					>
						{h.title_1}
					</span>
					<span
						class="text-gradient animate-fade-up opacity-0-init block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
						style="animation-delay: 200ms; animation-fill-mode: forwards;"
					>
						{h.title_2}
					</span>
					<span
						class="animate-fade-up opacity-0-init block text-4xl text-white sm:text-5xl lg:text-6xl xl:text-7xl"
						style="animation-delay: 300ms; animation-fill-mode: forwards;"
					>
						{h.title_3}
					</span>
				</h1>

				<!-- Subtitle -->
				<p
					class="animate-fade-up opacity-0-init mb-8 max-w-lg text-base leading-relaxed text-gray-400 sm:text-lg"
					style="animation-delay: 400ms; animation-fill-mode: forwards;"
				>
					{h.subtitle}
				</p>

				<!-- CTA Buttons -->
				<div
					class="animate-fade-up opacity-0-init mb-12 flex flex-wrap gap-3"
					style="animation-delay: 500ms; animation-fill-mode: forwards;"
				>
					<a href="/service" class="btn-primary px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-base">
						{h.cta_primary}
						<svg
							class="h-4 w-4 sm:h-5 sm:w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</a>
					<a href="/contact" class="btn-outline px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-base">
						<svg
							class="h-4 w-4 sm:h-5 sm:w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						{h.cta_secondary}
					</a>
				</div>

				<!-- Stats -->
				<div
					class="animate-fade-up opacity-0-init grid grid-cols-2 gap-4 sm:grid-cols-4"
					style="animation-delay: 600ms; animation-fill-mode: forwards;"
				>
					{#each statsData as stat (stat.key)}
						<div class="text-center sm:text-left">
							<div class="font-display text-primary text-2xl font-bold sm:text-3xl">
								{stat.value}
							</div>
							<div class="mt-0.5 text-xs text-gray-500">{h.stats[stat.key]}</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right Visual -->
			<div class="relative hidden items-center justify-center lg:flex">
				<div class="animate-float relative w-full max-w-lg">
					<!-- Main card -->
					<div class="card-glow relative z-10 p-6">
						<div class="mb-4 flex items-center gap-3">
							<div
								class="from-primary text-dark flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br to-cyan-400 text-sm font-bold"
							>
								AI
							</div>
							<div>
								<div class="text-sm font-semibold text-white">KD Intelligence</div>
								<div class="text-xs text-gray-500">Powered by AI</div>
							</div>
							<div class="ml-auto h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
						</div>
						<!-- Fake chart bars -->
						<div class="mb-4 flex h-20 items-end gap-1.5">
							{#each [40, 65, 45, 80, 55, 90, 70, 95, 60, 85] as h_val, i (`bar-${i}`)}
								<div
									class="from-primary/40 to-primary/80 flex-1 rounded-t-sm bg-gradient-to-t transition-all duration-700"
									style="height: {h_val}%; animation-delay: {i * 80}ms;"
								></div>
							{/each}
						</div>
						<div class="flex justify-between text-xs text-gray-500">
							<span>Doanh thu tháng này</span>
							<span class="text-primary font-semibold">+23.5%</span>
						</div>
					</div>

					<!-- Floating badges -->
					<div
						class="card-glow animate-float animation-delay-200 absolute -top-4 -left-4 z-20 px-3 py-2"
					>
						<div class="text-xs font-semibold text-white">🛒 KD Commerce</div>
						<div class="text-[10px] text-gray-400">1,247 orders today</div>
					</div>
					<div
						class="card-glow animate-float animation-delay-400 absolute -right-4 -bottom-4 z-20 px-3 py-2"
					>
						<div class="text-primary text-xs font-semibold">☕ KD Café</div>
						<div class="text-[10px] text-gray-400">342 orders active</div>
					</div>
				</div>

				<!-- Glow behind -->
				<div class="bg-primary/5 absolute inset-0 scale-75 rounded-full blur-3xl"></div>
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div
		class="absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2"
	>
		<div class="to-primary/50 h-8 w-px bg-gradient-to-b from-transparent"></div>
		<svg class="text-primary/50 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</div>
</section>
