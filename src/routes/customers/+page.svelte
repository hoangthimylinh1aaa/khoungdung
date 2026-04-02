<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Testimonials from '$lib/components/home/Testimonials.svelte';
	import Stats from '$lib/components/home/Stats.svelte';

	let locale: Locale = 'vi';
	$: locale = $localeStore;
	$: c = translations[locale].customersPage;
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
			<Badge variant="primary" class="mb-4">{c.hero_badge}</Badge>
			<h1 class="font-display mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
				{c.hero_title} <span class="text-gradient">{c.hero_title_2}</span>
			</h1>
			<p class="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">{c.hero_subtitle}</p>
		</AnimatedText>
	</div>
</section>

<!-- Testimonials + Stats -->
<section class="section-padding pt-0">
	<div class="container-custom">
		<div class="grid gap-8 lg:grid-cols-3">
			<div class="lg:col-span-2">
				<Testimonials />
			</div>
			<div>
				<Stats />
			</div>
		</div>
	</div>
</section>
