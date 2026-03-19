<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	let locale: Locale = 'vi';
	localeStore.subscribe((v) => (locale = v));
	$: c = translations[locale].contact;

	let formState = {
		name: '',
		email: '',
		phone: '',
		company: '',
		service: '',
		message: ''
	};
	let submitting = false;
	let submitted = false;

	async function handleSubmit() {
		submitting = true;
		// Simulate API call
		await new Promise((r) => setTimeout(r, 1500));
		submitted = true;
		submitting = false;
	}

	const contactIcons = {
		address: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>`,
		phone: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>`,
		email: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>`,
		hours: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>`
	};
</script>

<svelte:head>
	<title>Liên hệ — Kho phần mềm</title>
	<meta
		name="description"
		content="Liên hệ với Kho phần mềm để được tư vấn giải pháp công nghệ phù hợp cho doanh nghiệp của bạn."
	/>
	<meta property="og:title" content="Liên hệ — Kho phần mềm" />
	<link rel="canonical" href="https://khoangdung.vn/contact" />
</svelte:head>

<!-- Hero -->
<section class="noise-overlay relative overflow-hidden pt-24 pb-12 sm:pt-28">
	<div
		class="absolute inset-0 -z-10"
		style="background: radial-gradient(ellipse at 50% 0%, rgba(103,219,236,0.1) 0%, transparent 60%);"
	></div>
	<div class="container-custom section-padding py-8 text-center">
		<AnimatedText>
			<Badge variant="primary" class="mb-4">Contact</Badge>
			<h1
				class="font-display mb-4 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl"
			>
				{c.hero_title}
				<span class="text-gradient"> {c.hero_title_2}</span>
			</h1>
			<p class="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">{c.hero_subtitle}</p>
		</AnimatedText>
	</div>
</section>

<!-- Main Content -->
<section class="section-padding pt-0">
	<div class="container-custom">
		<div class="grid gap-8 lg:grid-cols-5 lg:gap-12">
			<!-- Contact Form -->
			<div class="lg:col-span-3">
				<AnimatedText direction="left">
					<div class="card-glow p-6 sm:p-8">
						<h2 class="font-display mb-6 text-xl font-bold text-white">{c.form.title}</h2>

						{#if submitted}
							<div class="py-12 text-center">
								<div class="mb-4 text-4xl">✅</div>
								<p class="text-lg font-semibold text-white">{c.form.success}</p>
							</div>
						{:else}
							<form on:submit|preventDefault={handleSubmit} class="space-y-4" novalidate>
								<div class="grid gap-4 sm:grid-cols-2">
									<!-- Name -->
									<div>
										<label for="name" class="mb-1.5 block text-sm font-medium text-gray-400"
											>{c.form.name} <span class="text-primary">*</span></label
										>
										<input
											id="name"
											type="text"
											bind:value={formState.name}
											required
											placeholder={c.form.name_placeholder}
											class="focus:border-primary/50 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 transition-all focus:bg-white/10 focus:outline-none"
										/>
									</div>
									<!-- Email -->
									<div>
										<label for="email" class="mb-1.5 block text-sm font-medium text-gray-400"
											>{c.form.email} <span class="text-primary">*</span></label
										>
										<input
											id="email"
											type="email"
											bind:value={formState.email}
											required
											placeholder={c.form.email_placeholder}
											class="focus:border-primary/50 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 transition-all focus:bg-white/10 focus:outline-none"
										/>
									</div>
								</div>

								<div class="grid gap-4 sm:grid-cols-2">
									<!-- Phone -->
									<div>
										<label for="phone" class="mb-1.5 block text-sm font-medium text-gray-400"
											>{c.form.phone}</label
										>
										<input
											id="phone"
											type="tel"
											bind:value={formState.phone}
											placeholder={c.form.phone_placeholder}
											class="focus:border-primary/50 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 transition-all focus:bg-white/10 focus:outline-none"
										/>
									</div>
									<!-- Company -->
									<div>
										<label for="company" class="mb-1.5 block text-sm font-medium text-gray-400"
											>{c.form.company}</label
										>
										<input
											id="company"
											type="text"
											bind:value={formState.company}
											placeholder={c.form.company_placeholder}
											class="focus:border-primary/50 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 transition-all focus:bg-white/10 focus:outline-none"
										/>
									</div>
								</div>

								<!-- Service -->
								<div>
									<label for="service" class="mb-1.5 block text-sm font-medium text-gray-400"
										>{c.form.service}</label
									>
									<select
										id="service"
										bind:value={formState.service}
										class="focus:border-primary/50 w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-all focus:bg-white/10 focus:outline-none"
										style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%236b7280%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M19 9l-7 7-7-7%27/%3E%3C/svg%3E'); background-repeat: no-repeat; background-position: right 12px center; background-size: 16px;"
									>
										<option value="" disabled class="bg-dark">{c.form.service_placeholder}</option>
										{#each c.form.services as svc (svc)}
											<option value={svc} class="bg-dark">{svc}</option>
										{/each}
									</select>
								</div>

								<!-- Message -->
								<div>
									<label for="message" class="mb-1.5 block text-sm font-medium text-gray-400"
										>{c.form.message} <span class="text-primary">*</span></label
									>
									<textarea
										id="message"
										bind:value={formState.message}
										required
										rows="4"
										placeholder={c.form.message_placeholder}
										class="focus:border-primary/50 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 transition-all focus:bg-white/10 focus:outline-none"
									></textarea>
								</div>

								<button
									type="submit"
									disabled={submitting}
									class="btn-primary w-full justify-center py-3.5 text-sm sm:text-base"
								>
									{#if submitting}
										<svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
											<circle
												class="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												stroke-width="4"
											></circle>
											<path
												class="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
											></path>
										</svg>
										{c.form.submitting}
									{:else}
										<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
											/>
										</svg>
										{c.form.submit}
									{/if}
								</button>
							</form>
						{/if}
					</div>
				</AnimatedText>
			</div>

			<!-- Contact Info -->
			<div class="lg:col-span-2">
				<AnimatedText direction="right" delay={200}>
					<div class="space-y-4">
						<h2 class="font-display mb-6 text-xl font-bold text-white">{c.info.title}</h2>

						{#each [{ key: 'address', value: c.info.address_value, label: c.info.address }, { key: 'phone', value: c.info.phone_value, label: c.info.phone }, { key: 'email', value: c.info.email_value, label: c.info.email }, { key: 'hours', value: c.info.hours_value, label: c.info.hours }] as item (item.key)}
							<div class="card-glow group flex items-start gap-4 p-4">
								<div
									class="bg-primary/10 border-primary/20 group-hover:bg-primary/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border transition-colors"
								>
									<svg
										class="text-primary h-4.5 h-5 w-4.5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										{contactIcons[item.key]}
									</svg>
								</div>
								<div>
									<div class="mb-0.5 text-xs text-gray-500">{item.label}</div>
									<div class="text-sm font-medium text-white">{item.value}</div>
								</div>
							</div>
						{/each}

						<!-- Map placeholder -->
						<div class="card-glow mt-4 flex h-40 items-center justify-center overflow-hidden">
							<div class="text-center">
								<div class="mb-2 text-2xl">🗺️</div>
								<p class="text-sm text-gray-500">Ho Chi Minh City, Vietnam</p>
								<a
									href="https://maps.google.com"
									target="_blank"
									rel="noopener noreferrer"
									class="text-primary mt-1 inline-block text-xs hover:underline"
								>
									Xem trên Google Maps →
								</a>
							</div>
						</div>
					</div>
				</AnimatedText>
			</div>
		</div>
	</div>
</section>
