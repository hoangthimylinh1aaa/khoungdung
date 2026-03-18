<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';

  const animSrc = '/animation/data_transfer.lottie';

  let locale: Locale = 'vi';
  const unsubscribe = localeStore.subscribe((v) => (locale = v));
  onDestroy(() => unsubscribe());

  $: s = (translations[locale] as any).productsPage?.dataSupport ?? {
    title: '', subtitle: '', bullets: [], button: '', learn_more: null, learn_more_href: ''
  };

  function goContact() {
    goto('/contact');
  }
</script>

<section class="pt-20 shadow-sm">
  <div class="container-custom py-8">
    <div class="flex flex-col md:flex-row items-center gap-6">
      <div class="flex-1">
        <h3 class="text-xl sm:text-2xl font-semibold mb-2">{s.title}</h3>
        <p class="text-sm text-white mb-4">{s.subtitle}</p>

        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {#each s.bullets as b (b)}
            <li class="flex items-start gap-2 text-sm text-gray-700">
              <svg class="w-5 h-5 text-primary mt-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 5 11.586a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l9-9a1 1 0 00-1.414-1.414L8.414 17.586 6 15.172a1 1 0 00-1.414 0L1 18.757V18.75z" clip-rule="evenodd" />
              </svg>
              <span class="text-white">{b}</span>
            </li>
          {/each}
        </ul>

        <div class="mt-10">
          <Button size="sm" on:click={goContact}>{s.button}</Button>
        </div>
      </div>

      <div class="w-full md:w-1/2">
        <div >
          <DotLottieSvelte
             renderConfig={{
              devicePixelRatio: 2
              }}
            src={animSrc}
            autoplay
            loop
          />
        </div>
      </div>
    </div>
  </div>
</section>