<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
	import Badge from '../ui/Badge.svelte';
	import {
		Coffee,
		Users,
		Briefcase,
		Scissors,
		ShoppingBag,
		Archive,
		Wrench,
		Database,
		BarChart2,
		Star,
		MessageSquare,
		type IconProps
	} from '@lucide/svelte';

	let locale: Locale = 'vi';
	$: locale = $localeStore;
	$: p = translations[locale].products;

	const productColors = {
		ecommerce: 'from-blue-500/20 to-primary/10',
		beverage: 'from-orange-500/20 to-yellow-500/10',
		hrm: 'from-purple-500/20 to-pink-500/10',
		chain: 'from-primary/20 to-green-500/10'
	};

	const exampleIcons: Record<string, import('svelte').Component<IconProps>> = {
		car_dealer: ShoppingBag,
		spa: Scissors,
		restaurant: Coffee,
		auto_parts: Wrench,
		beauty_ecom: ShoppingBag,
		dental_ecom: Archive,
		hrm_solution: Users,
		crm_solution: Briefcase,
		erp_solution: Database,
		demand_forecast: BarChart2,
		personalization: Star,
		chatbot: MessageSquare
	};

	$: productKeys = ['ecommerce', 'beverage', 'hrm', 'chain'] as const;
</script>

<section class="section-padding bg-surface" aria-labelledby="products-heading">
	<div class="container-custom">
		<!-- Header -->
		<AnimatedText class="mb-16 text-center">
			<Badge variant="dark" class="mb-4">Ecosystem</Badge>
			<h2
				id="products-heading"
				class="font-display mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
			>
				{p.title} <span class="text-gradient">{p.title_highlight}</span>
			</h2>
			<p class="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">{p.subtitle}</p>
		</AnimatedText>

		<!-- Products Grid -->
		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each productKeys as key, i (key)}
				{@const product = p[key]}
				<AnimatedText delay={i * 100} direction="up">
					<article
						class="card-glow group flex h-full cursor-pointer flex-col p-6"
						aria-label={product.name}
					>
						<!-- Icon + Tag -->
						<div class="mb-4 flex items-start justify-between">
							<div
								class="h-12 w-12 rounded-2xl bg-linear-to-br {productColors[
									key
								]} flex items-center justify-center border border-white/10 text-2xl"
								aria-hidden="true"
							>
								{#if key === 'ecommerce'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										aria-hidden="true"
										><path
											d="M3 3h2l.4 2M7 13h10l3-8H6.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										/><circle cx="10" cy="19" r="1" /><circle cx="18" cy="19" r="1" /></svg
									>
								{:else if key === 'beverage'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										aria-hidden="true"
										><path
											d="M3 7h18v2a6 6 0 0 1-6 6H9A6 6 0 0 1 3 9V7z"
											stroke-linecap="round"
											stroke-linejoin="round"
										/><path d="M8 3h8v4H8z" stroke-linecap="round" stroke-linejoin="round" /></svg
									>
								{:else if key === 'hrm'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										aria-hidden="true"
										><path
											d="M20 21v-2a4 4 0 0 0-3-3.87"
											stroke-linecap="round"
											stroke-linejoin="round"
										/><path
											d="M4 21v-2a4 4 0 0 1 3-3.87"
											stroke-linecap="round"
											stroke-linejoin="round"
										/><circle cx="12" cy="7" r="4" /></svg
									>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										aria-hidden="true"
										><rect
											x="3"
											y="7"
											width="18"
											height="13"
											rx="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/><path d="M16 3v4M8 3v4" stroke-linecap="round" stroke-linejoin="round" /></svg
									>
								{/if}
							</div>
							<Badge variant="dark">{product.tag}</Badge>
						</div>

						<!-- Name + Desc -->
						<h3
							class="font-display group-hover:text-primary mb-2 text-lg font-bold text-white transition-colors"
						>
							{product.name}
						</h3>
						<p class="mb-3 flex-1 text-sm leading-relaxed text-gray-400">{product.desc}</p>

						<!-- Example marketplaces (localized) -->
						{#if product.examples}
							<div class="mb-3">
								<div class="mb-2 text-xs text-gray-400">{p.examples_label}:</div>
								<div class="flex flex-wrap gap-2">
									{#each product.examples as ex (ex.id)}
										<span
											class="flex items-center gap-2 rounded-full bg-white/3 px-2 py-1 text-xs text-white/90"
										>
											{#if exampleIcons[ex.id]}
												<svelte:component
													this={exampleIcons[ex.id]}
													class="text-primary h-3 w-3"
													aria-hidden="true"
												/>
											{:else}
												<!-- small dot icon fallback -->
												<svg
													class="text-primary h-3 w-3"
													viewBox="0 0 8 8"
													fill="currentColor"
													xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="3" /></svg
												>
											{/if}
											{ex.title}
										</span>
									{/each}
								</div>
							</div>
						{/if}

						<!-- Features -->
						<ul class="space-y-1.5">
							{#each product.features as feature (feature)}
								<li class="flex items-center gap-2 text-xs text-gray-400">
									<svg
										class="text-primary h-3.5 w-3.5 shrink-0"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2.5"
											d="M5 13l4 4L19 7"
										/>
									</svg>
									{feature}
								</li>
							{/each}
						</ul>

						<!-- CTA -->
						<div class="mt-5 border-t border-white/5 pt-4">
							<a
								href="/service"
								class="text-primary flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
							>
								Tìm hiểu thêm
								<svg
									class="h-3.5 w-3.5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 7l5 5m0 0l-5 5m5-5H6"
									/>
								</svg>
							</a>
						</div>
					</article>
				</AnimatedText>
			{/each}
		</div>
	</div>
</section>
