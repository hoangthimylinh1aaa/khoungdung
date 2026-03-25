<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import logo from '$lib/assets/logo.png';

	let locale: Locale = 'vi';
	localeStore.subscribe((v) => (locale = v));
	$: l = translations[locale].loginPage;

	let email = '';
	let password = '';
</script>

<svelte:head>
	<title>{l.title} — Kho phần mềm</title>
	<meta name="description" content={l.subtitle} />
</svelte:head>

<section
	class="noise-overlay relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
>
	<div
		class="absolute inset-0 -z-10"
		style="background: radial-gradient(ellipse at 50% 0%, rgba(103,219,236,0.08) 0%, transparent 60%);"
	></div>
	<div class="container-custom section-padding mx-auto w-full max-w-md py-12">
		<div class="glass rounded-2xl p-8 sm:p-10">
			<div class="mb-8 text-center">
				<a href="/" class="mb-6 inline-flex items-center gap-2" aria-label="Kho phần mềm">
					<img src={logo} alt="" class="w-16 object-contain sm:h-20 sm:w-36" />
				</a>
				<h1 class="font-display mb-2 text-2xl font-bold text-white">{l.title}</h1>
				<p class="text-sm text-gray-400">{l.subtitle}</p>
			</div>

			<form on:submit|preventDefault class="space-y-4">
				<!-- Email -->
				<div>
					<label for="email" class="mb-1.5 block text-sm font-medium text-gray-400">{l.email}</label
					>
					<input
						id="email"
						type="email"
						bind:value={email}
						placeholder={l.email_placeholder}
						class="focus:border-primary/50 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 transition-all focus:bg-white/10 focus:outline-none"
					/>
				</div>

				<!-- Password -->
				<div>
					<div class="mb-1.5 flex items-center justify-between">
						<label for="password" class="block text-sm font-medium text-gray-400"
							>{l.password}</label
						>
						<a href="#" class="text-primary text-xs hover:underline">{l.forgot}</a>
					</div>
					<input
						id="password"
						type="password"
						bind:value={password}
						placeholder={l.password_placeholder}
						class="focus:border-primary/50 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 transition-all focus:bg-white/10 focus:outline-none"
					/>
				</div>

				<button type="submit" class="btn-primary mt-2 w-full justify-center py-3 text-sm">
					{l.submit}
				</button>
			</form>

			<p class="mt-6 text-center text-sm text-gray-500">
				{l.no_account}
				<a href="/register" class="text-primary ml-1 hover:underline">{l.register_link}</a>
			</p>
		</div>
	</div>
</section>
