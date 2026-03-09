<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';
  import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
  import Badge from '../ui/Badge.svelte';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));
  $: p = translations[locale].products;

  const productIcons = {
    ecommerce: '🛒',
    beverage: '☕',
    hrm: '👥',
    chain: '🏪',
  };

  const productColors = {
    ecommerce: 'from-blue-500/20 to-primary/10',
    beverage: 'from-orange-500/20 to-yellow-500/10',
    hrm: 'from-purple-500/20 to-pink-500/10',
    chain: 'from-primary/20 to-green-500/10',
  };

  $: productKeys = ['ecommerce', 'beverage', 'hrm', 'chain'] as const;
</script>

<section class="section-padding bg-surface" aria-labelledby="products-heading">
  <div class="container-custom">
    <!-- Header -->
    <AnimatedText class="text-center mb-16">
      <Badge variant="dark" class="mb-4">Ecosystem</Badge>
      <h2 id="products-heading" class="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
        {p.title} <span class="text-gradient">{p.title_highlight}</span>
      </h2>
      <p class="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">{p.subtitle}</p>
    </AnimatedText>

    <!-- Products Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {#each productKeys as key, i (key)}
        {@const product = p[key]}
        <AnimatedText delay={i * 100} direction="up">
          <article class="card-glow p-6 h-full flex flex-col group cursor-pointer" aria-label={product.name}>
            <!-- Icon + Tag -->
            <div class="flex items-start justify-between mb-4">
              <div
                class="w-12 h-12 rounded-2xl bg-gradient-to-br {productColors[key]} flex items-center justify-center text-2xl border border-white/10"
              >
                {productIcons[key]}
              </div>
              <Badge variant="dark">{product.tag}</Badge>
            </div>

            <!-- Name + Desc -->
            <h3 class="font-display font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p class="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{product.desc}</p>

            <!-- Features -->
            <ul class="space-y-1.5">
              {#each product.features as feature ( feature )}
                <li class="flex items-center gap-2 text-xs text-gray-400">
                  <svg class="w-3.5 h-3.5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              {/each}
            </ul>

            <!-- CTA -->
            <div class="mt-5 pt-4 border-t border-white/5">
              <a
                href="/service"
                class="text-xs text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                Tìm hiểu thêm
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </article>
        </AnimatedText>
      {/each}
    </div>
  </div>
</section>