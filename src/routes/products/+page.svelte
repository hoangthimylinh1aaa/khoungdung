<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';
  import Products from '$lib/components/home/Products.svelte';
  import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));
  $: p = translations[locale].productsPage;
</script>

<svelte:head>
  <title>{p.hero_title} {p.hero_title_2} — Khoảng Dung</title>
  <meta name="description" content={p.hero_subtitle} />
</svelte:head>

<!-- Hero -->
<section class="relative pt-24 sm:pt-28 pb-12 noise-overlay overflow-hidden">
  <div
    class="absolute inset-0 -z-10"
    style="background: radial-gradient(ellipse at 50% 0%, rgba(103,219,236,0.1) 0%, transparent 60%);"
  ></div>
  <div class="container-custom section-padding py-8 text-center">
    <AnimatedText>
      <Badge variant="primary" class="mb-4">Products</Badge>
      <h1 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
        {p.hero_title}
        <span class="text-gradient"> {p.hero_title_2}</span>
      </h1>
      <p class="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">{p.hero_subtitle}</p>
    </AnimatedText>
  </div>
</section>

<!-- Products Grid -->
<Products />

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
