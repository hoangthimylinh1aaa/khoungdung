<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';
  import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));
  $: c = translations[locale].consultingPage;
</script>

<svelte:head>
  <title>{c.hero_title} {c.hero_title_2} — Kho phần mềm</title>
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
      <Badge variant="primary" class="mb-4">Consulting</Badge>
      <h1 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
        {c.hero_title}
        <span class="text-gradient"> {c.hero_title_2}</span>
      </h1>
      <p class="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">{c.hero_subtitle}</p>
    </AnimatedText>
  </div>
</section>

<!-- 3-Step Process -->
<section class="section-padding pt-0">
  <div class="container-custom">
    <div class="grid md:grid-cols-3 gap-6">
      <!-- Step 1 -->
      <AnimatedText delay={0}>
        <div class="card-glow p-6 sm:p-8 text-center">
          <div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
            <span class="text-primary font-bold text-lg">1</span>
          </div>
          <h3 class="font-display font-bold text-lg text-white mb-3">{c.step1_title}</h3>
          <p class="text-gray-400 text-sm">{c.step1_desc}</p>
        </div>
      </AnimatedText>

      <!-- Step 2 -->
      <AnimatedText delay={100}>
        <div class="card-glow p-6 sm:p-8 text-center">
          <div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
            <span class="text-primary font-bold text-lg">2</span>
          </div>
          <h3 class="font-display font-bold text-lg text-white mb-3">{c.step2_title}</h3>
          <p class="text-gray-400 text-sm">{c.step2_desc}</p>
        </div>
      </AnimatedText>

      <!-- Step 3 -->
      <AnimatedText delay={200}>
        <div class="card-glow p-6 sm:p-8 text-center">
          <div class="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
            <span class="text-primary font-bold text-lg">3</span>
          </div>
          <h3 class="font-display font-bold text-lg text-white mb-3">{c.step3_title}</h3>
          <p class="text-gray-400 text-sm">{c.step3_desc}</p>
        </div>
      </AnimatedText>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section-padding pt-0">
  <div class="container-custom">
    <div class="card-glow p-8 sm:p-12 text-center">
      <h2 class="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
        {c.hero_subtitle}
      </h2>
      <a href="/contact" class="btn-primary text-sm px-6 py-3 inline-flex">
        {c.cta}
      </a>
    </div>
  </div>
</section>
