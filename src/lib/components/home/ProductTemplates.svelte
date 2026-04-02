<script lang="ts">
	import { goto } from '$app/navigation';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import { localeStore } from '$lib/stores/locale';
	import { ShoppingBag, Coffee, Users, Cpu } from '@lucide/svelte';

	type Template = { id: string; title: string; tag?: string; image?: string };

	let locale: Locale = 'vi';
	$: locale = $localeStore;
	$: t = translations[locale].products;

	const categories = [
		{ key: 'ecommerce', icon: ShoppingBag },
		{ key: 'beverage', icon: Coffee },
		{ key: 'hrm', icon: Users },
		{ key: 'chain', icon: Cpu }
	];

	let activeCategory: string = 'ecommerce';
	let templates: Template[] = [];
	$: templates =
		(t?.[activeCategory]?.examples || []).map((e: any) => ({
			id: e.id,
			title: e.title,
			tag: e.tag,
			image: e.image
		})) || [];

	function openTemplate(id: string) {
		goto(`/products/templates/${id}`);
	}
</script>

<div class="container-custom mt-8">
	<div class="mb-6 flex justify-center gap-3">
		{#each categories as c (c.key)}
			<button
				on:click={() => (activeCategory = c.key)}
				class="flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all"
				class:bg-primary={activeCategory === c.key}
				class:text-black={activeCategory === c.key}
				class:shadow-md={activeCategory === c.key}
				style={activeCategory !== c.key ? 'background: rgba(255,255,255,0.05); color: white;' : ''}
				on:mouseenter={(e) => {
					if (activeCategory !== c.key) e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
				}}
				on:mouseleave={(e) => {
					if (activeCategory !== c.key) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
				}}
				aria-pressed={activeCategory === c.key}
				aria-label={t[c.key].name}
			>
				<svelte:component this={c.icon} class="h-4 w-4" aria-hidden="true" />
				<span class="hidden md:block">{t[c.key].name}</span>
			</button>
		{/each}
	</div>

	<p class="mt-3 text-center text-xs text-gray-400">{t[activeCategory].desc}</p>

	<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each templates as tem (tem.id)}
			<div
				class="bg-surface cursor-pointer overflow-hidden rounded-md border border-white/5 p-0 hover:shadow-lg"
				on:click={() => openTemplate(tem.id)}
				aria-label={tem.title}
			>
				{#if tem.image}
					<img src={tem.image} alt={tem.title} class="h-40 w-full object-cover" />
				{:else}
					<div
						class="flex h-40 w-full items-center justify-center bg-gradient-to-br from-white/5 to-white/2"
					>
						<div class="flex h-12 w-12 items-center justify-center rounded bg-white/5">📄</div>
					</div>
				{/if}

				<div class="p-4">
					<h4 class="text-sm font-semibold text-white">{tem.title}</h4>
					{#if tem.tag}
						<p class="mt-1 text-xs text-gray-400">{tem.tag}</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
