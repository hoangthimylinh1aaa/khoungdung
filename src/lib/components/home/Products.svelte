<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';
  import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
  import Badge from '../ui/Badge.svelte';
  // Lucide icons
  import { Coffee, Users, Briefcase, Scissors, ShoppingBag, Archive, Wrench, Database, BarChart2, Star, MessageSquare, type IconProps } from '@lucide/svelte';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));
  $: p = translations[locale].products;

  const productColors = {
    ecommerce: 'from-blue-500/20 to-primary/10',
    beverage: 'from-orange-500/20 to-yellow-500/10',
    hrm: 'from-purple-500/20 to-pink-500/10',
    chain: 'from-primary/20 to-green-500/10',
  };

  // Map example ids (from i18n) to Lucide icon components
  const exampleIcons: Record<string, import("svelte").Component<IconProps>> = {
    car_dealer: ShoppingBag,
    spa: Scissors,
    restaurant: Coffee,
    auto_parts: Wrench,
    beauty_ecom: ShoppingBag,
    dental_ecom: Archive,
    hrm_solution: Users,
    crm_solution: Briefcase,
    erp_solution: Database,
    demand_forecast: BarChart2,
    personalization: Star,
    chatbot: MessageSquare,
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
                class="w-12 h-12 rounded-2xl bg-linear-to-br {productColors[key]} flex items-center justify-center text-2xl border border-white/10"
                aria-hidden="true"
              >
                {#if key === 'ecommerce'}
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 3h2l.4 2M7 13h10l3-8H6.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="19" r="1"/><circle cx="18" cy="19" r="1"/></svg>
                {:else if key === 'beverage'}
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 7h18v2a6 6 0 0 1-6 6H9A6 6 0 0 1 3 9V7z" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 3h8v4H8z" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {:else if key === 'hrm'}
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-3-3.87" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 21v-2a4 4 0 0 1 3-3.87" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="7" r="4"/></svg>
                {:else}
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 3v4M8 3v4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {/if}
              </div>
              <Badge variant="dark">{product.tag}</Badge>
            </div>

            <!-- Name + Desc -->
            <h3 class="font-display font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p class="text-gray-400 text-sm leading-relaxed mb-3 flex-1">{product.desc}</p>

            <!-- Example marketplaces (localized) -->
            {#if product.examples}
              <div class="mb-3">
                <div class="text-xs text-gray-400 mb-2">{p.examples_label}:</div>
                <div class="flex flex-wrap gap-2">
                  {#each product.examples as ex (ex.id)}
                    <span class="px-2 py-1 rounded-full bg-white/3 text-xs text-white/90 flex items-center gap-2">
                      {#if exampleIcons[ex.id]}
                        <svelte:component this={exampleIcons[ex.id]} class="w-3 h-3 text-primary" aria-hidden="true" />
                      {:else}
                        <!-- small dot icon fallback -->
                        <svg class="w-3 h-3 text-primary" viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="3"/></svg>
                      {/if}
                      {ex.title}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}

            <!-- Features -->
            <ul class="space-y-1.5">
              {#each product.features as feature ( feature )}
                <li class="flex items-center gap-2 text-xs text-gray-400">
                  <svg class="w-3.5 h-3.5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
