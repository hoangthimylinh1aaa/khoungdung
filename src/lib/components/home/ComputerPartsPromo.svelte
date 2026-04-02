<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';

	let locale: Locale = 'vi';
	$: locale = $localeStore;

	$: c = (translations[locale] as any).productsPage?.computerParts ?? {
		title: '',
		subtitle: '',
		items: [],
		button: ''
	};

	function buy(itemId: string) {
		goto(`/contact?product=${encodeURIComponent(itemId)}`);
	}

	function imageFor(itemId: string) {
		const map: Record<string, string> = {
			cpu_ryzen7:
				'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=600&fit=crop',
			intel_i7: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&h=600&fit=crop',
			gpu_rtx4070:
				'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&h=600&fit=crop',
			ram_32gb: 'https://images.unsplash.com/photo-1562976540-1502c2145851?w=800&h=600&fit=crop',
			ssd_1tb: 'https://images.unsplash.com/photo-1597838816882-4435b1977fbe?w=800&h=600&fit=crop'
		};
		return map[itemId] ?? 'https://source.unsplash.com/800x600/?computer,parts';
	}

	function handleImgError(e: Event) {
		const target = e.currentTarget as HTMLImageElement | null;
		if (target) {
			target.src = '/favicon.ico';
		}
	}
</script>

<section class="pt-12">
	<div class="container-custom">
		<div class="mb-6">
			<h3 class="mb-2 text-xl font-semibold sm:text-2xl">{c.title}</h3>
			<p class="text-sm text-white">{c.subtitle}</p>
		</div>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each c.items as item (item.id)}
				<div class="rounded-lg border border-gray-800 bg-gray-900 p-4">
					<div class="mb-3 h-40 w-full overflow-hidden rounded-md bg-gray-800">
						<img
							class="h-full w-full object-cover"
							src={imageFor(item.id)}
							alt={item.title}
							loading="lazy"
							on:error={handleImgError}
						/>
					</div>

					<div class="mb-3 flex items-center justify-between">
						<div>
							<h4 class="text-sm font-semibold">{item.title}</h4>
							<p class="text-xs text-gray-400">{item.desc}</p>
						</div>
						<div class="text-right">
							<div class="text-sm font-medium text-white">{item.price}</div>
						</div>
					</div>

					<div class="mt-4 flex items-center justify-between">
						<Button size="sm" on:click={() => buy(item.id)}>{c.button}</Button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
