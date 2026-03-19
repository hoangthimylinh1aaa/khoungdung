<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import Products from '$lib/components/home/Products.svelte';
	import ProductsHero from '$lib/components/home/ProductsHero.svelte';
	import ProductTemplates from '$lib/components/home/ProductTemplates.svelte';
	import DataSupportPromo from '$lib/components/home/DataSupportPromo.svelte';
	import NetworkInstallPromo from '$lib/components/home/NetworkInstallPromo.svelte';
	import ComputerPartsPromo from '$lib/components/home/ComputerPartsPromo.svelte';

	let locale: Locale = 'vi';
	localeStore.subscribe((v) => (locale = v));
	$: p = translations[locale].productsPage;
</script>

<!-- Products Grid -->
<Products />

<!-- Hero -->
<ProductsHero />

<!-- Templates / filter -->
<ProductTemplates />

<!-- Data support promo section -->
<DataSupportPromo />

<!-- Network installation promo section -->
<NetworkInstallPromo />

<!-- Computer parts marketplace -->
<ComputerPartsPromo />

<!-- CTA -->
<section class="section-padding">
	<div class="container-custom">
		<div class="card-glow p-8 text-center sm:p-12">
			<h2 class="font-display mb-4 text-2xl font-bold text-white sm:text-3xl">
				{p.hero_subtitle}
			</h2>
			<a href="/contact" class="btn-primary inline-flex px-6 py-3 text-sm">
				{p.cta}
			</a>
		</div>
	</div>
</section>
