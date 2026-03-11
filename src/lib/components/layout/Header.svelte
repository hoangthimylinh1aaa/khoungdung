<script lang="ts">
  import { page } from '$app/stores';
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';
  import MobileMenu from './MobileMenu.svelte';

  let scrolled = false;
  let mobileOpen = false;
  let locale: Locale = 'vi';

  localeStore.subscribe((v) => (locale = v));

  $: nav = translations[locale].nav as Record<string, string>;

  const navLinks = [
    { key: 'products', href: '/products' },
    { key: 'consulting', href: '/consulting' },
    { key: 'news', href: '/news' },
    { key: 'customers', href: '/customers' },
    { key: 'about', href: '/about' },
  ];

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      scrolled = window.scrollY > 20;
    });
  }
</script>

<svelte:window on:scroll={() => (scrolled = window.scrollY > 20)} />

<header
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
  class:bg-dark={scrolled}
  class:border-b={scrolled}
  class:border-white={scrolled}
  class:border-opacity-5={scrolled}
  class:shadow-xl={scrolled}
  style={scrolled ? 'backdrop-filter: blur(20px); background: rgba(10,10,10,0.95);' : ''}
>
  <div class="container-custom section-padding py-0">
    <nav class="flex items-center justify-between h-16 sm:h-20" aria-label="Main navigation">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 group" aria-label="Khoảng Dung - Trang chủ">
        <div
          class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center font-bold text-dark text-sm sm:text-base shadow-[0_0_20px_rgba(103,219,236,0.4)] group-hover:shadow-[0_0_30px_rgba(103,219,236,0.6)] transition-all duration-300"
        >
          Kho
        </div>
        <span class="font-display font-bold text-base sm:text-lg text-white">
          Ung <span class="text-gradient">Dung</span>
        </span>
      </a>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-1">
        {#each navLinks as link (link.href)}
          <a
            href={link.href}
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group"
            class:text-primary={$page.url.pathname === link.href}
            class:text-gray-400={$page.url.pathname !== link.href}
            class:hover:text-white={$page.url.pathname !== link.href}
            aria-current={$page.url.pathname === link.href ? 'page' : undefined}
          >
            {nav[link.key]}
            {#if $page.url.pathname === link.href}
              <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
            {/if}
          </a>
        {/each}
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-3">
        <!-- Language Toggle -->
        <button
          on:click={() => localeStore.toggle()}
          class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass glass-hover text-xs font-semibold text-gray-300"
          aria-label="Toggle language"
        >
          <span class="text-sm">{locale === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
          {locale.toUpperCase()}
        </button>

        <!-- CTA Button -->
        <a
          href="/login"
          class="hidden md:flex btn-outline text-sm px-4 py-2"
        >
          {nav.login}
        </a>

        <!-- Register Button -->
        <a
          href="/register"
          class="hidden md:flex btn-primary text-sm px-4 py-2"
        >
          {nav.register}
        </a>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden flex flex-col gap-1.5 p-2 rounded-lg glass glass-hover"
          on:click={() => (mobileOpen = !mobileOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
        >
          <span
            class="w-5 h-0.5 bg-white transition-all duration-300"
            class:rotate-45={mobileOpen}
            class:translate-y-2={mobileOpen}
          ></span>
          <span
            class="w-5 h-0.5 bg-white transition-all duration-300"
            class:opacity-0={mobileOpen}
          ></span>
          <span
            class="w-5 h-0.5 bg-white transition-all duration-300"
            class:-rotate-45={mobileOpen}
            class:-translate-y-2={mobileOpen}
          ></span>
        </button>
      </div>
    </nav>
  </div>
</header>

<MobileMenu bind:open={mobileOpen} {navLinks} {nav} {locale} />