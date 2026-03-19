<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import AnimatedText from '$lib/components/ui/AnimatedText.svelte';

	let locale: Locale = 'vi';
	localeStore.subscribe((v) => (locale = v));
	$: t = translations[locale].testimonials;

	const avatarColors = [
		'from-primary to-cyan-400',
		'from-purple-400 to-pink-400',
		'from-orange-400 to-yellow-400'
	];
</script>

<section class="section-padding" aria-labelledby="testimonials-heading">
	<div class="container-custom">
		<AnimatedText class="mb-12 text-center">
			<h2 id="testimonials-heading" class="font-display text-3xl font-bold text-white sm:text-4xl">
				{t.title} <span class="text-gradient">{t.title_2}</span>
			</h2>
		</AnimatedText>

		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each t.items as item, i (item.name)}
				<AnimatedText delay={i * 150} direction="up">
					<blockquote class="card-glow flex h-full flex-col p-6">
						<!-- Stars -->
						<div class="mb-4 flex gap-1">
							{#each Array(5) as _, j (j)}
								<svg class="text-primary h-4 w-4 fill-current" viewBox="0 0 24 24">
									<path
										d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
									/>
								</svg>
							{/each}
						</div>

						<!-- Quote -->
						<p class="mb-6 flex-1 text-sm leading-relaxed text-gray-300 italic">"{item.content}"</p>

						<!-- Author -->
						<div class="flex items-center gap-3">
							<div
								class="h-10 w-10 rounded-full bg-gradient-to-br {avatarColors[
									i
								]} text-dark flex flex-shrink-0 items-center justify-center text-xs font-bold"
							>
								{item.avatar}
							</div>
							<div>
								<div class="text-sm font-semibold text-white">{item.name}</div>
								<div class="text-xs text-gray-500">{item.role}</div>
							</div>
						</div>
					</blockquote>
				</AnimatedText>
			{/each}
		</div>
	</div>
</section>
