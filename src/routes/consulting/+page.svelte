<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	let locale: Locale = 'vi';
	$: locale = $localeStore;
	$: c = translations[locale].consultingPage;
</script>

<svelte:head>
	<title>{c.hero_title} {c.hero_title_2} — Kho phần mềm</title>
	<meta name="description" content={c.hero_subtitle} />
</svelte:head>

<!-- Hero -->
<section class="noise-overlay relative overflow-hidden pt-24 pb-12 sm:pt-28">
	<div
		class="absolute inset-0 -z-10"
		style="background: radial-gradient(ellipse at 50% 0%, rgba(103,219,236,0.1) 0%, transparent 60%);"
	></div>
	<div class="container-custom section-padding py-8 text-center">
		<AnimatedText>
			<Badge variant="primary" class="mb-4">Consulting</Badge>
			<h1
				class="font-display mb-4 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl"
			>
				{c.hero_title}
				<span class="text-gradient"> {c.hero_title_2}</span>
			</h1>
			<p class="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">{c.hero_subtitle}</p>
		</AnimatedText>
	</div>
</section>

<!-- 3-Step Process -->
<section class="section-padding pt-0">
	<div class="container-custom">
		<div class="grid gap-6 md:grid-cols-3">
			<!-- Step 1 -->
			<AnimatedText delay={0}>
				<div class="card-glow p-6 text-center sm:p-8">
					<div
						class="bg-primary/10 border-primary/30 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border"
					>
						<span class="text-primary text-lg font-bold">1</span>
					</div>
					<h3 class="font-display mb-3 text-lg font-bold text-white">{c.step1_title}</h3>
					<p class="text-sm text-gray-400">{c.step1_desc}</p>
				</div>
			</AnimatedText>

			<!-- Step 2 -->
			<AnimatedText delay={100}>
				<div class="card-glow p-6 text-center sm:p-8">
					<div
						class="bg-primary/10 border-primary/30 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border"
					>
						<span class="text-primary text-lg font-bold">2</span>
					</div>
					<h3 class="font-display mb-3 text-lg font-bold text-white">{c.step2_title}</h3>
					<p class="text-sm text-gray-400">{c.step2_desc}</p>
				</div>
			</AnimatedText>

			<!-- Step 3 -->
			<AnimatedText delay={200}>
				<div class="card-glow p-6 text-center sm:p-8">
					<div
						class="bg-primary/10 border-primary/30 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border"
					>
						<span class="text-primary text-lg font-bold">3</span>
					</div>
					<h3 class="font-display mb-3 text-lg font-bold text-white">{c.step3_title}</h3>
					<p class="text-sm text-gray-400">{c.step3_desc}</p>
				</div>
			</AnimatedText>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="section-padding pt-0">
	<div class="container-custom">
		<div class="card-glow p-8 text-center sm:p-12">
			<h2 class="font-display mb-4 text-2xl font-bold text-white sm:text-3xl">
				{c.hero_subtitle}
			</h2>
			<a href="/contact" class="btn-primary inline-flex px-6 py-3 text-sm">
				{c.cta}
			</a>
		</div>
	</div>
</section>
