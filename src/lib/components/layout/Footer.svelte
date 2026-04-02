<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import logo from '$lib/assets/logo.png';

	let locale: Locale = 'vi';
	$: locale = $localeStore;
	$: f = translations[locale].footer;

	const products = ['KD Commerce', 'KD Café', 'KD HRM', 'KD Chain'];
	const socials = [
		{
			name: 'Facebook',
			href: '#',
			icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'
		},
		{
			name: 'LinkedIn',
			href: '#',
			icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-14h4v2z'
		},
		{
			name: 'Twitter/X',
			href: '#',
			icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'
		}
	];
</script>

<footer class="bg-surface mt-auto border-t border-white/5">
	<!-- Main Footer -->
	<div class="container-custom section-padding pb-8">
		<div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Brand -->
			<div class="lg:col-span-1">
				<a href="/static" class="mb-4 flex items-center gap-2">
					<img src={logo} alt="logo" class="h-20 w-20 object-contain" />
				</a>
				<p class="mb-5 text-sm leading-relaxed text-gray-400">{f.tagline}</p>
				<!-- Socials -->
				<div class="flex gap-3">
					{#each socials as social (social.name)}
						<a
							href={social.href}
							aria-label={social.name}
							class="glass glass-hover hover:text-primary flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors"
						>
							<svg
								class="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d={social.icon} />
							</svg>
						</a>
					{/each}
				</div>
			</div>

			<!-- Products -->
			<div>
				<h3 class="mb-4 text-sm font-semibold tracking-wider text-white uppercase">{f.products}</h3>
				<ul class="space-y-2.5">
					{#each products as product (product)}
						<li>
							<a
								href="/service"
								class="hover:text-primary text-sm text-gray-400 transition-colors duration-200"
							>
								{product}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Company -->
			<div>
				<h3 class="mb-4 text-sm font-semibold tracking-wider text-white uppercase">{f.company}</h3>
				<ul class="space-y-2.5">
					<li>
						<a
							href="/about"
							class="hover:text-primary text-sm text-gray-400 transition-colors duration-200"
							>{f.about}</a
						>
					</li>
					<li>
						<a
							href="/blog"
							class="hover:text-primary text-sm text-gray-400 transition-colors duration-200"
							>{f.blog}</a
						>
					</li>
					<li>
						<a
							href="/careers"
							class="hover:text-primary text-sm text-gray-400 transition-colors duration-200"
							>{f.careers}</a
						>
					</li>
				</ul>
			</div>

			<!-- Contact Info -->
			<div>
				<h3 class="mb-4 text-sm font-semibold tracking-wider text-white uppercase">{f.legal}</h3>
				<ul class="space-y-2.5">
					<li>
						<a
							href="/privacy"
							class="hover:text-primary text-sm text-gray-400 transition-colors duration-200"
							>{f.privacy}</a
						>
					</li>
					<li>
						<a
							href="/terms"
							class="hover:text-primary text-sm text-gray-400 transition-colors duration-200"
							>{f.terms}</a
						>
					</li>
				</ul>
				<!-- Newsletter -->
				<div class="mt-6">
					<p class="mb-2 text-xs text-gray-400">Subscribe for updates</p>
					<div class="flex gap-2">
						<input
							type="email"
							placeholder="Email..."
							class="focus:border-primary/50 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
						/>
						<button
							class="bg-primary text-dark rounded-lg px-3 py-2 text-xs font-semibold transition-all hover:shadow-[0_0_15px_rgba(103,219,236,0.4)]"
							>→</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom Bar -->
	<div class="border-t border-white/5">
		<div
			class="container-custom flex flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row sm:px-6 lg:px-8"
		>
			<p class="text-xs text-gray-500">{f.copyright}</p>
			<p class="text-xs text-gray-500">{f.made_in}</p>
		</div>
	</div>
</footer>
