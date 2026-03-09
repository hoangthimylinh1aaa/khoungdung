<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';
  import AnimatedText from '$lib/components/ui/AnimatedText.svelte';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));
  $: s = translations[locale].stats;

  const statKeys = ['clients', 'transactions', 'uptime', 'cities'] as const;
  const statIcons = {
    clients: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>`,
    transactions: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>`,
    uptime: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>`,
    cities: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>`,
  };
</script>

<section class="section-padding bg-surface relative overflow-hidden" aria-labelledby="stats-heading">
  <!-- Background -->
  <div class="absolute inset-0 -z-10"
    style="background: linear-gradient(135deg, rgba(103,219,236,0.03) 0%, transparent 50%, rgba(103,219,236,0.03) 100%);">
  </div>

  <div class="container-custom">
    <AnimatedText class="text-center mb-12">
      <h2 id="stats-heading" class="font-display font-bold text-3xl sm:text-4xl text-white">
        {s.title} <span class="text-gradient">{s.title_2}</span>
      </h2>
    </AnimatedText>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {#each statKeys as key, i (`${key}-stats`) }
        {@const stat = s.items[key]}
        <AnimatedText delay={i * 100} direction="up">
          <div class="card-glow p-6 sm:p-8 text-center group">
            <div class="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {statIcons[key]}
              </svg>
            </div>
            <div class="text-3xl sm:text-4xl font-display font-black text-gradient mb-1">{stat.value}</div>
            <div class="text-sm text-gray-400">{stat.label}</div>
          </div>
        </AnimatedText>
      {/each}
    </div>
  </div>
</section>