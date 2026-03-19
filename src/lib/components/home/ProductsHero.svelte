<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
	import Badge from '../ui/Badge.svelte';

	let locale: Locale = 'vi';
	localeStore.subscribe((v) => (locale = v));
	$: p = translations[locale].productsPage;
</script>

<section class="noise-overlay relative overflow-hidden pt-24 pb-12 sm:pt-28">
	<div
		class="absolute inset-0 -z-10"
		style="background: radial-gradient(ellipse at 50% 0%, rgba(103,219,236,0.1) 0%, transparent 60%);"
	></div>
	<div class="container-custom section-padding py-8 text-center">
		<AnimatedText>
			<Badge variant="primary" class="mb-4">{p.hero_title}</Badge>
			<h1
				class="font-display mb-4 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl"
			>
				{p.hero_title}
				<span class="text-gradient"> {p.hero_title_2}</span>
			</h1>
			<p class="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">{p.hero_subtitle}</p>
		</AnimatedText>
	</div>
</section>
