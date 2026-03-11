<script lang="ts">
  import { page } from '$app/stores';
  import { localeStore } from '$lib/stores/locale';
  import type { Locale } from '$lib/i18n';

  export let open = false;
  export let navLinks: Array<{ key: string; href: string }> = [];
  export let nav: Record<string, string> = {};
  export let locale: Locale = 'vi';
</script>

<!-- Backdrop -->
{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
    on:click={() => (open = false)}
  ></div>
{/if}

<!-- Drawer -->
<div
  class="fixed top-0 right-0 h-full w-72 z-50 md:hidden transition-transform duration-300 ease-out"
  class:translate-x-0={open}
  class:translate-x-full={!open}
  style="background: rgba(10,10,10,0.98); backdrop-filter: blur(20px); border-left: 1px solid rgba(255,255,255,0.05);"
>
  <div class="flex flex-col h-full p-6 pt-24">
    <nav class="flex flex-col gap-2" aria-label="Mobile navigation">
      {#each navLinks as link (link.href)}
        <a
          href={link.href}
          on:click={() => (open = false)}
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium"
          class:bg-primary={$page.url.pathname === link.href}
          class:text-dark={$page.url.pathname === link.href}
          class:text-gray-300={$page.url.pathname !== link.href}
          class:hover:bg-white={$page.url.pathname !== link.href}
          class:hover:bg-opacity-5={$page.url.pathname !== link.href}
          aria-current={$page.url.pathname === link.href ? 'page' : undefined}
        >
          {nav[link.key]}
        </a>
      {/each}
    </nav>

    <div class="mt-auto flex flex-col gap-3">
      <button
        on:click={() => localeStore.toggle()}
        class="flex items-center gap-2 px-4 py-3 rounded-xl glass glass-hover text-sm font-medium text-gray-300"
      >
        <span>{locale === 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}</span>
        <span class="ml-auto text-xs text-gray-500">→ {locale === 'vi' ? 'EN' : 'VI'}</span>
      </button>
      <a
        href="/login"
        on:click={() => (open = false)}
        class="btn-outline w-full justify-center"
      >
        {nav.login}
      </a>
      <a
        href="/register"
        on:click={() => (open = false)}
        class="btn-primary w-full justify-center"
      >
        {nav.register}
      </a>
    </div>
  </div>
</div>