<script lang="ts">
	import CrmSolution from '$lib/components/templates/CrmSolution.svelte';
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';

	let locale: Locale = 'vi';
	$: locale = $localeStore;
	$: p = translations[locale].productsPage;
</script>

<CrmSolution />
