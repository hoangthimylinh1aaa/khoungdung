<script lang="ts">
	import CarDealer from '$lib/components/templates/CarDealer.svelte';
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';

	let locale: Locale = 'vi';
	$: locale = $localeStore;
	$: p = translations[locale].productsPage;
</script>

<svelte:head>
	<title>{p.hero_title} — Car Dealer Template</title>
</svelte:head>

<CarDealer />
