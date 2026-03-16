<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';
  import Products from '$lib/components/home/Products.svelte';
  import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import ProductsHero from '$lib/components/home/ProductsHero.svelte';
  import ProductTemplates from '$lib/components/home/ProductTemplates.svelte';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));
  $: p = translations[locale].productsPage;
</script>

<svelte:head>
  <title>{p.hero_title} {p.hero_title_2} — Kho phần mềm</title>
  <meta name="description" content={p.hero_subtitle} />
</svelte:head>


<!-- Products Grid -->
<Products />

<!-- Hero -->
<ProductsHero />

<!-- Templates / filter -->
<ProductTemplates />


<!-- CTA -->
<section class="section-padding">
  <div class="container-custom">
    <div class="card-glow p-8 sm:p-12 text-center">
      <h2 class="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
        {p.hero_subtitle}
      </h2>
      <a href="/contact" class="btn-primary text-sm px-6 py-3 inline-flex">
        {p.cta}
      </a>
    </div>
  </div>
</section>
