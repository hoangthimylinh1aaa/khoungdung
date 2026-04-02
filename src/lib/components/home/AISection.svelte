<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import Badge from '../ui/Badge.svelte';
	import AnimatedText from '$lib/components/ui/AnimatedText.svelte';

	let locale: Locale = 'vi';
	$: locale = $localeStore;
	$: ai = translations[locale].ai;

	const featureIcons = {
		predict: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>`,
		automate: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>`,
		personalize: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
		insight: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>`
	};
</script>

<section class="section-padding relative overflow-hidden" aria-labelledby="ai-heading">
	<!-- Background effects -->
	<div class="absolute inset-0 -z-10">
		<div
			class="bg-primary/5 absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
		></div>
	</div>

	<div class="container-custom">
		<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
			<!-- Left: Visual -->
			<AnimatedText direction="left" class="order-2 lg:order-1">
				<div class="relative">
					<!-- Central AI orb -->
					<div class="relative flex items-center justify-center">
						<div
							class="from-primary/20 border-primary/20 animate-pulse-glow flex h-48 w-48 items-center justify-center rounded-full border bg-gradient-to-br to-cyan-400/10 sm:h-64 sm:w-64"
						>
							<div
								class="from-primary/30 border-primary/30 flex h-32 w-32 items-center justify-center rounded-full border bg-gradient-to-br to-cyan-400/20 sm:h-44 sm:w-44"
							>
								<div class="text-center">
									<div class="font-display text-gradient text-3xl font-black sm:text-4xl">AI</div>
									<div class="mt-1 text-[10px] text-gray-400 sm:text-xs">Powered Core</div>
								</div>
							</div>
						</div>

						<!-- Orbiting chips -->
						{#each ['🛒 Commerce', '☕ Café', '👥 HRM', '🏪 Chain'] as chip, i (chip)}
							<div
								class="card-glow absolute px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-white"
								style="
                  top: {50 + 42 * Math.sin((i * Math.PI * 2) / 4)}%;
                  left: {50 + 42 * Math.cos((i * Math.PI * 2) / 4)}%;
                  transform: translate(-50%, -50%);
                "
							>
								{chip}
							</div>
						{/each}
					</div>

					<!-- Spinning ring -->
					<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
						<div
							class="border-primary/20 animate-spin-slow h-56 w-56 rounded-full border border-dashed sm:h-72 sm:w-72"
						></div>
					</div>
				</div>
			</AnimatedText>

			<!-- Right: Content -->
			<div class="order-1 lg:order-2">
				<AnimatedText direction="right" delay={100}>
					<Badge variant="primary" class="mb-4">
						<span class="bg-primary h-1.5 w-1.5 animate-pulse rounded-full"></span>
						{ai.badge}
					</Badge>
					<h2
						id="ai-heading"
						class="font-display mb-3 text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl"
					>
						{ai.title}
						<span class="text-gradient block">{ai.title_2}</span>
					</h2>
					<p class="mb-8 text-base leading-relaxed text-gray-400 sm:text-lg">{ai.subtitle}</p>
				</AnimatedText>

				<!-- Feature list -->
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{#each Object.entries(ai.features) as [key, feature], i (`${key}-feature`)}
						<AnimatedText delay={200 + i * 100} direction="up">
							<div class="card-glow group hover:border-primary/30 p-4">
								<div
									class="bg-primary/10 border-primary/20 group-hover:bg-primary/20 mb-3 flex h-9 w-9 items-center justify-center rounded-xl border transition-colors"
								>
									<svg
										class="text-primary h-4.5 h-5 w-4.5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										{featureIcons[key]}
									</svg>
								</div>
								<h3 class="mb-1 text-sm font-semibold text-white">{feature.title}</h3>
								<p class="text-xs leading-relaxed text-gray-500">{feature.desc}</p>
							</div>
						</AnimatedText>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
