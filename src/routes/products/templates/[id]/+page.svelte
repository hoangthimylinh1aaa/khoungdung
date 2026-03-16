<script lang="ts">
  import { onMount } from 'svelte';
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));

  export let params: { id: string };

  // Stronger typing for products to avoid implicit any errors
  type ExampleItem = { id: string; title: string };
  type ProductEntry = {
    name?: string;
    tag?: string;
    desc?: string;
    features?: string[];
    examples?: ExampleItem[];
  };
  type ProductsMap = {
    title?: string;
    title_highlight?: string;
    subtitle?: string;
    examples_label?: string;
    ecommerce: ProductEntry;
    beverage: ProductEntry;
    hrm: ProductEntry;
    chain: ProductEntry;
  };

  $: products = translations[locale].products as unknown as ProductsMap;

  // Find the product & example by id
  let example: ExampleItem | null = null;
  const keys = ['ecommerce', 'beverage', 'hrm', 'chain'] as const;
  onMount(() => {
    const id = params.id;
    for (const k of keys) {
      const exs = products[k].examples ?? [];
      const found = exs.find((e) => e.id === id);
      if (found) {
        example = found;
        break;
      }
    }
  });

  // Sample code templates (could be real templates)
  const codeSamples: Record<string, string> = {
    car_dealer: `<!doctype html>\n<html lang="en">\n  <head><title>Car dealer</title></head>\n  <body>\n    <h1>Car dealer landing page</h1>\n    <!-- Listing, contact form, booking -->\n  </body>\n</html>`,
    spa: `<!doctype html>\n<html lang="en">\n  <head><title>Spa</title></head>\n  <body>\n    <h1>Spa & booking</h1>\n    <!-- Services, booking widget -->\n  </body>\n</html>`,
    restaurant: `<!doctype html>\n<html lang="en">\n  <head><title>Restaurant</title></head>\n  <body>\n    <h1>Restaurant & reservation</h1>\n    <!-- Menu, reservation -->\n  </body>\n</html>`,
    auto_parts: `<!-- simple product list -->\n<ul>\n  <li>Brake pad</li>\n  <li>Oil filter</li>\n</ul>`,
    beauty_ecom: `<!-- product grid -->\n<div class="grid">\n  <div>Face cream</div>\n  <div>Serum</div>\n</div>`,
    dental_ecom: `<!-- equipment catalog -->\n<div>Chair model A</div>`,
    hrm_solution: `// HRM sample: attendance API\nGET /api/attendance`,
    crm_solution: `// CRM sample: leads endpoint\nPOST /api/leads`,
    erp_solution: `// ERP sample: stock sync\nPOST /api/stock/sync`,
    demand_forecast: `// Forecast model input\n{ sales: [...], seasonality: [...] }`,
    personalization: `// Personalization rule example\nfunction recommend(user) { /* ML model */ }`,
    chatbot: `// Chatbot sample\nUser: "I need help with my order"`,
  };
</script>

<svelte:head>
  <title>{example ? example.title : 'Template'} — Kho phần mềm</title>
</svelte:head>

<div class="container-custom py-12">
  {#if example}
    <h2 class="text-white font-bold text-2xl mb-4">{example.title}</h2>
    <div class="card-glow p-4 bg-surface rounded">
      <pre class="text-sm text-gray-200 overflow-auto"><code>{codeSamples[example.id] ?? '// no sample available'}</code></pre>
    </div>
  {:else}
    <div class="text-gray-400">Template not found.</div>
  {/if}
</div>

