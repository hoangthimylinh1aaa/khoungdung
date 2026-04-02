<script lang="ts">
	import DemanForecast from '$lib/components/templates/DemanForecast.svelte';
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';

	let locale: Locale = 'vi';
	$: locale = $localeStore;
	$: p = translations[locale].productsPage;
</script>

<svelte:head>
	<title>{p.hero_title} {p.hero_title_2} — Kho phần mềm</title>
	<meta name="description" content={p.hero_subtitle} />
</svelte:head>

<DemanForecast />
