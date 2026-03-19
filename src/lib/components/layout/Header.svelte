<script lang="ts">
	import { page } from '$app/stores';
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import MobileMenu from './MobileMenu.svelte';
	import logo from '$lib/assets/logo.png';

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
		{ key: 'about', href: '/about' }
	];

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', () => {
			scrolled = window.scrollY > 20;
		});
	}
</script>

<svelte:window on:scroll={() => (scrolled = window.scrollY > 20)} />

<header
	class="fixed top-0 right-0 left-0 z-50 transition-all duration-500"
	class:bg-dark={scrolled}
	class:border-b={scrolled}
	class:border-white={scrolled}
	class:border-opacity-5={scrolled}
	class:shadow-xl={scrolled}
	style={scrolled ? 'backdrop-filter: blur(20px); background: rgba(10,10,10,0.95);' : ''}
>
	<div class="container-custom section-padding py-0">
		<nav class="flex h-16 items-center justify-between sm:h-20" aria-label="Main navigation">
			<!-- Logo -->
			<a href="/" class="group flex items-center gap-2" aria-label="Kho phần mềm - Trang chủ">
				<img src={logo} alt="" class="w-16 object-contain sm:h-20 sm:w-36" />
			</a>

			<!-- Desktop Nav -->
			<div class="hidden items-center gap-1 md:flex">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						class="group relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
						class:text-primary={$page.url.pathname === link.href}
						class:text-gray-400={$page.url.pathname !== link.href}
						class:hover:text-white={$page.url.pathname !== link.href}
						aria-current={$page.url.pathname === link.href ? 'page' : undefined}
					>
						{nav[link.key]}
						{#if $page.url.pathname === link.href}
							<span
								class="bg-primary absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
							></span>
						{/if}
					</a>
				{/each}
			</div>

			<!-- Right Actions -->
			<div class="flex items-center gap-3">
				<!-- Language Toggle -->
				<button
					on:click={() => localeStore.toggle()}
					class="glass glass-hover hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-300 sm:flex"
					aria-label="Toggle language"
				>
					<span class="text-sm">{locale === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
					{locale.toUpperCase()}
				</button>

				<!-- CTA Button -->
				<a href="/login" class="btn-outline hidden px-4 py-2 text-sm md:flex">
					{nav.login}
				</a>

				<!-- Register Button -->
				<a href="/register" class="btn-primary hidden px-4 py-2 text-sm md:flex">
					{nav.register}
				</a>

				<!-- Mobile Menu Button -->
				<button
					class="glass glass-hover flex flex-col gap-1.5 rounded-lg p-2 md:hidden"
					on:click={() => (mobileOpen = !mobileOpen)}
					aria-label="Toggle mobile menu"
					aria-expanded={mobileOpen}
				>
					<span
						class="h-0.5 w-5 bg-white transition-all duration-300"
						class:rotate-45={mobileOpen}
						class:translate-y-2={mobileOpen}
					></span>
					<span class="h-0.5 w-5 bg-white transition-all duration-300" class:opacity-0={mobileOpen}
					></span>
					<span
						class="h-0.5 w-5 bg-white transition-all duration-300"
						class:-rotate-45={mobileOpen}
						class:-translate-y-2={mobileOpen}
					></span>
				</button>
			</div>
		</nav>
	</div>
</header>

<MobileMenu bind:open={mobileOpen} {navLinks} {nav} {locale} />
