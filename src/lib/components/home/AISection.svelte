<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';
  import Badge from '../ui/Badge.svelte';
  import AnimatedText from '$lib/components/ui/AnimatedText.svelte';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));
  $: ai = translations[locale].ai;

  const featureIcons = {
    predict: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>`,
    automate: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>`,
    personalize: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
    insight: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>`,
  };
</script>

<section class="section-padding relative overflow-hidden" aria-labelledby="ai-heading">
  <!-- Background effects -->
  <div class="absolute inset-0 -z-10">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
  </div>

  <div class="container-custom">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <!-- Left: Visual -->
      <AnimatedText direction="left" class="order-2 lg:order-1">
        <div class="relative">
          <!-- Central AI orb -->
          <div class="relative flex items-center justify-center">
            <div class="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-primary/20 to-cyan-400/10 border border-primary/20 flex items-center justify-center animate-pulse-glow">
              <div class="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-primary/30 to-cyan-400/20 border border-primary/30 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-3xl sm:text-4xl font-display font-black text-gradient">AI</div>
                  <div class="text-[10px] sm:text-xs text-gray-400 mt-1">Powered Core</div>
                </div>
              </div>
            </div>

            <!-- Orbiting chips -->
            {#each ['🛒 Commerce', '☕ Café', '👥 HRM', '🏪 Chain'] as chip, i ( chip )}
              <div
                class="absolute card-glow px-2.5 py-1.5 text-xs font-semibold text-white whitespace-nowrap"
                style="
                  top: {50 + 42 * Math.sin((i * Math.PI * 2) / 4)}%;
                  left: {50 + 42 * Math.cos((i * Math.PI * 2) / 4)}%;
                  transform: translate(-50%, -50%);
                "
              >
                {chip}
              </div>
            {/each}
          </div>

          <!-- Spinning ring -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-dashed border-primary/20 animate-spin-slow"></div>
          </div>
        </div>
      </AnimatedText>

      <!-- Right: Content -->
      <div class="order-1 lg:order-2">
        <AnimatedText direction="right" delay={100}>
          <Badge variant="primary" class="mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            {ai.badge}
          </Badge>
          <h2 id="ai-heading" class="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-3 leading-tight">
            {ai.title}
            <span class="text-gradient block">{ai.title_2}</span>
          </h2>
          <p class="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">{ai.subtitle}</p>
        </AnimatedText>

        <!-- Feature list -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {#each Object.entries(ai.features) as [key, feature], i ( `${key}-feature` )}
            <AnimatedText delay={200 + i * 100} direction="up">
              <div class="card-glow p-4 group hover:border-primary/30">
                <div class="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <svg class="w-4.5 h-4.5 text-primary w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {featureIcons[key]}
                  </svg>
                </div>
                <h3 class="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                <p class="text-gray-500 text-xs leading-relaxed">{feature.desc}</p>
              </div>
            </AnimatedText>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>