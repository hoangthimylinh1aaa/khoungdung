<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/Button.svelte';
	import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';

	let locale: Locale = 'vi';
	$: locale = $localeStore;

	$: n = translations[locale].productsPage?.networkInstall ?? {
		title: '',
		subtitle: '',
		bullets: [],
		button: '',
		learn_more: null,
		learn_more_href: ''
	};

	const animSrc = '/animation/network.lottie';

	function goContact() {
		goto('/contact');
	}
</script>

<section class="pt-20 shadow-sm">
	<div class="container-custom py-8">
		<div class="flex flex-col items-center gap-6 md:flex-row md:flex-row-reverse">
			<div class="flex-1">
				<h3 class="mb-2 text-xl font-semibold sm:text-2xl">{n.title}</h3>
				<p class="mb-4 text-sm text-white">{n.subtitle}</p>

				<ul class="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
					{#each n.bullets as b (b)}
						<li class="flex items-start gap-2 text-sm text-gray-700">
							<svg class="text-primary mt-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414L8.414 15 5 11.586a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l9-9a1 1 0 00-1.414-1.414L8.414 17.586 6 15.172a1 1 0 00-1.414 0L1 18.757V18.75z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="text-white">{b}</span>
						</li>
					{/each}
				</ul>

				<div class="mt-10">
					<Button size="sm" on:click={goContact}>{n.button}</Button>
				</div>
			</div>

			<div class="w-full bg-white md:ml-[-120px] md:w-1/2 md:bg-transparent">
				<!-- Placeholder image or illustration for network install -->
				<div class="rounded-lg p-6 text-center">
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
