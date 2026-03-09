<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';
  import Badge from '../ui/Badge.svelte';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));
  $: h = translations[locale].hero;

  const statsData = [
    { key: 'clients', value: '500+' },
    { key: 'transactions', value: '2M+' },
    { key: 'uptime', value: '99.9%' },
    { key: 'support', value: '24/7' },
  ];
</script>

<section
  class="relative min-h-screen flex items-center noise-overlay overflow-hidden"
  aria-label="Hero section"
>
  <!-- Background effects -->
  <div class="absolute inset-0 -z-10">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
    <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-glow animation-delay-500"></div>
    <div class="absolute top-0 right-0 w-full h-full"
      style="background: radial-gradient(ellipse at 70% 20%, rgba(103,219,236,0.08) 0%, transparent 60%);">
    </div>
    <!-- Grid pattern -->
    <div class="absolute inset-0 opacity-[0.03]"
      style="background-image: linear-gradient(rgba(103,219,236,1) 1px, transparent 1px), linear-gradient(90deg, rgba(103,219,236,1) 1px, transparent 1px); background-size: 60px 60px;">
    </div>
  </div>

  <div class="container-custom section-padding pt-28 sm:pt-32 lg:pt-36 pb-16">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <!-- Left Content -->
      <div>
        <!-- Badge -->
        <div class="animate-fade-up mb-6" style="animation-delay: 0ms; animation-fill-mode: forwards;">
          <Badge variant="primary">
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            {h.badge}
          </Badge>
        </div>

        <!-- Headline -->
        <h1 class="font-display font-bold leading-tight mb-6">
          <span
            class="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white animate-fade-up opacity-0-init"
            style="animation-delay: 100ms; animation-fill-mode: forwards;"
          >
            {h.title_1}
          </span>
          <span
            class="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-gradient animate-fade-up opacity-0-init"
            style="animation-delay: 200ms; animation-fill-mode: forwards;"
          >
            {h.title_2}
          </span>
          <span
            class="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white animate-fade-up opacity-0-init"
            style="animation-delay: 300ms; animation-fill-mode: forwards;"
          >
            {h.title_3}
          </span>
        </h1>

        <!-- Subtitle -->
        <p
          class="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg animate-fade-up opacity-0-init"
          style="animation-delay: 400ms; animation-fill-mode: forwards;"
        >
          {h.subtitle}
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex flex-wrap gap-3 mb-12 animate-fade-up opacity-0-init"
          style="animation-delay: 500ms; animation-fill-mode: forwards;"
        >
          <a href="/service" class="btn-primary text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4">
            {h.cta_primary}
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a href="/contact" class="btn-outline text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {h.cta_secondary}
          </a>
        </div>

        <!-- Stats -->
        <div
          class="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-up opacity-0-init"
          style="animation-delay: 600ms; animation-fill-mode: forwards;"
        >
          {#each statsData as stat ( stat.key )}
            <div class="text-center sm:text-left">
              <div class="text-2xl sm:text-3xl font-display font-bold text-primary">{stat.value}</div>
              <div class="text-xs text-gray-500 mt-0.5">{h.stats[stat.key]}</div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Right Visual -->
      <div class="relative hidden lg:flex items-center justify-center">
        <div class="relative w-full max-w-lg animate-float">
          <!-- Main card -->
          <div class="card-glow p-6 relative z-10">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center text-dark font-bold text-sm">AI</div>
              <div>
                <div class="text-white font-semibold text-sm">KD Intelligence</div>
                <div class="text-gray-500 text-xs">Powered by AI</div>
              </div>
              <div class="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            </div>
            <!-- Fake chart bars -->
            <div class="flex items-end gap-1.5 h-20 mb-4">
              {#each [40, 65, 45, 80, 55, 90, 70, 95, 60, 85] as h_val, i (`bar-${i}`)}
                <div
                  class="flex-1 rounded-t-sm bg-gradient-to-t from-primary/40 to-primary/80 transition-all duration-700"
                  style="height: {h_val}%; animation-delay: {i * 80}ms;"
                ></div>
              {/each}
            </div>
            <div class="flex justify-between text-xs text-gray-500">
              <span>Doanh thu tháng này</span>
              <span class="text-primary font-semibold">+23.5%</span>
            </div>
          </div>

          <!-- Floating badges -->
          <div class="absolute -top-4 -left-4 card-glow px-3 py-2 z-20 animate-float animation-delay-200">
            <div class="text-xs font-semibold text-white">🛒 KD Commerce</div>
            <div class="text-[10px] text-gray-400">1,247 orders today</div>
          </div>
          <div class="absolute -bottom-4 -right-4 card-glow px-3 py-2 z-20 animate-float animation-delay-400">
            <div class="text-xs font-semibold text-primary">☕ KD Café</div>
            <div class="text-[10px] text-gray-400">342 orders active</div>
          </div>
        </div>

        <!-- Glow behind -->
        <div class="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-75"></div>
      </div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
    <div class="w-px h-8 bg-gradient-to-b from-transparent to-primary/50"></div>
    <svg class="w-4 h-4 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</section>