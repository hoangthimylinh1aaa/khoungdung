<script lang="ts">
import { onDestroy } from 'svelte';
import { goto } from '$app/navigation';
import type { Locale } from '$lib/i18n';
import { translations } from '$lib/i18n';
import { localeStore } from '$lib/stores/locale';
import { ShoppingBag, Coffee, Users, Cpu } from '@lucide/svelte';

type Template = { id: string; title: string; tag?: string; image?: string };

let locale: Locale = 'vi';
const unsubscribe = localeStore.subscribe((v) => (locale = v));
onDestroy(unsubscribe);

let t: any;
$: t = translations[locale].products;

const categories = [
  { key: 'ecommerce', icon: ShoppingBag },
  { key: 'beverage', icon: Coffee },
  { key: 'hrm', icon: Users },
  { key: 'chain', icon: Cpu },
];

let activeCategory: string = 'ecommerce';
let templates: Template[] = [];
$: templates =
  (t?.[activeCategory]?.examples || []).map((e: any) => ({
    id: e.id,
    title: e.title,
    tag: e.tag,
    image: e.image,
  })) || [];

function openTemplate(id: string) {
  goto(`/products/templates/${id}`);
}

</script>

<div class="container-custom mt-8">
  <div class="flex gap-3 mb-6 justify-center">
   {#each categories as c (c.key)}
  <button
    on:click={() => (activeCategory = c.key)}
    class="px-4 cursor-pointer py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all"
    class:bg-primary={activeCategory === c.key}
    class:text-black={activeCategory === c.key}
    class:shadow-md={activeCategory === c.key}
    style={activeCategory !== c.key ? 'background: rgba(255,255,255,0.05); color: white;' : ''}
    on:mouseenter={e => { if (activeCategory !== c.key) e.currentTarget.style.background = 'rgba(255,255,255,0.10)' }}
    on:mouseleave={e => { if (activeCategory !== c.key) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
    aria-pressed={activeCategory === c.key}
    aria-label={t[c.key].name}
  >
    <svelte:component this={c.icon} class="w-4 h-4" aria-hidden="true" />
    <span>{t[c.key].name}</span>
  </button>
{/each}
  </div>

  <p class="text-gray-400 text-xs mt-3 text-center">{t[activeCategory].desc}</p>

  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {#each templates as tem (tem.id)}
      <article
        class="p-0 bg-surface rounded-md border border-white/5 cursor-pointer hover:shadow-lg overflow-hidden"
        on:click={() => openTemplate(tem.id)}
        aria-label={tem.title}
      >
        {#if tem.image}
          <img src={tem.image} alt={tem.title} class="w-full h-40 object-cover" />
        {:else}
          <div class="w-full h-40 bg-gradient-to-br from-white/5 to-white/2 flex items-center justify-center">
            <div class="w-12 h-12 rounded bg-white/5 flex items-center justify-center">📄</div>
          </div>
        {/if}

        <div class="p-4">
          <h4 class="font-semibold text-white text-sm">{tem.title}</h4>
          {#if tem.tag}
            <p class="text-xs text-gray-400 mt-1">{tem.tag}</p>
          {/if}
        </div>
      </article>
    {/each}
  </div>
</div>
