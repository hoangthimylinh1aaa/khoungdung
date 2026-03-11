<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';
  import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Testimonials from '$lib/components/home/Testimonials.svelte';
  import Stats from '$lib/components/home/Stats.svelte';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));
  $: c = translations[locale].customersPage;
</script>

<svelte:head>
  <title>{c.hero_title} {c.hero_title_2} — Khoảng Dung</title>
  <meta name="description" content={c.hero_subtitle} />
</svelte:head>

<!-- Hero -->
<section class="relative pt-24 sm:pt-28 pb-12 noise-overlay overflow-hidden">
  <div
    class="absolute inset-0 -z-10"
    style="background: radial-gradient(ellipse at 50% 0%, rgba(103,219,236,0.1) 0%, transparent 60%);"
  ></div>
  <div class="container-custom section-padding py-8 text-center">
    <AnimatedText>
      <Badge variant="primary" class="mb-4">Customers</Badge>
      <h1 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
        {c.hero_title}
        <span class="text-gradient"> {c.hero_title_2}</span>
      </h1>
      <p class="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">{c.hero_subtitle}</p>
    </AnimatedText>
  </div>
</section>

<Stats />
<Testimonials />
