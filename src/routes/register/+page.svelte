<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import logo from '$lib/assets/logo.png';

	let locale: Locale = 'vi';
	localeStore.subscribe((v) => (locale = v));
	$: r = translations[locale].registerPage;

	let name = '';
	let product = '';
	let email = '';
	let phone = '';
	let job_position = '';
	let company = '';
	let province = '';
	let headcount = '';
</script>

<svelte:head>
	<title>{r.submit} — Kho phần mềm</title>
	<meta name="description" content={r.left_subtitle} />
</svelte:head>

<div class="bg-dark grid grid-cols-1 pt-16 lg:grid-cols-2">
	<!-- Left Panel: marketing/branding -->
	<div class="bg-dark relative hidden flex-col overflow-hidden px-12 py-14 lg:flex">
		<!-- Background pattern overlay -->
		<div
			class="absolute inset-0 opacity-5"
			style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 32px 32px;"
		></div>
		<div
			class="absolute top-0 right-0 h-96 w-96 rounded-full opacity-10"
			style="background: radial-gradient(circle, #67dbec 0%, transparent 70%); transform: translate(30%, -30%);"
		></div>

		<div class="relative z-10 flex flex-1 flex-col justify-center gap-8">
			<!-- Heading -->
			<div>
				<h1 class="font-display mb-4 text-3xl leading-tight font-bold text-white xl:text-4xl">
					{r.left_title_1}<span class="text-primary">{r.left_title_highlight}</span>{r.left_title_2}
					<br />{r.left_title_3}
				</h1>
				<p class="max-w-sm text-sm leading-relaxed text-gray-400">{r.left_subtitle}</p>
			</div>

			<!-- Feature list -->
			<ul class="flex flex-col gap-4">
				{#each [r.left_feature_1, r.left_feature_2, r.left_feature_3] as feature (feature)}
					<li class="flex items-start gap-3">
						<span class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center">
							<!-- Diamond checkmark icon -->
							<svg viewBox="0 0 20 20" fill="none" class="h-5 w-5">
								<path d="M10 2L18 10L10 18L2 10L10 2Z" fill="#67dbec" opacity="0.2" />
								<path d="M10 2L18 10L10 18L2 10L10 2Z" stroke="#67dbec" stroke-width="1.5" />
								<path
									d="M7 10L9 12L13 8"
									stroke="#67dbec"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</span>
						<span class="text-sm text-gray-300">{feature}</span>
					</li>
				{/each}
			</ul>

			<!-- Divider -->
			<hr class="border-white/10" />

			<!-- Partners -->
			<div>
				<p class="mb-4 text-xs font-semibold tracking-widest text-gray-500 uppercase">
					{r.left_partners_label}
				</p>
				<div class="flex flex-wrap gap-3">
					{#each ['HT Hub', 'Vietblend', 'VPBank', 'VIB'] as partner (partner)}
						<span
							class="border-primary/20 bg-primary/5 rounded-full border px-4 py-1.5 text-xs font-medium text-gray-400"
						>
							{partner}
						</span>
					{/each}
				</div>
			</div>
		</div>

		<!-- Footer help text -->
		<p class="relative z-10 mt-8 text-xs text-gray-500">
			{r.left_help}<a href="/contact" class="text-primary hover:underline">{r.left_help_link}</a
			>{r.left_help_suffix}
		</p>
	</div>

	<!-- Right Panel: registration form -->
	<div class="bg-dark border-white/10 px-6 py-12 sm:px-10 lg:border-l lg:px-12">
		<div class="mx-auto w-full max-w-lg">
			<!-- Mobile logo -->
			<div class="mb-8 text-center lg:hidden">
				<img src={logo} alt="" class="w-16 object-contain sm:h-20 sm:w-36" />
			</div>

			<form on:submit|preventDefault class="flex flex-col gap-5">
				<!-- Row 1: Name (full width) -->
				<div>
					<label for="reg-name" class="mb-1.5 block text-sm font-medium text-gray-300">
						{r.name} <span class="text-primary">*</span>
					</label>
					<input
						id="reg-name"
						type="text"
						bind:value={name}
						placeholder={r.name_placeholder}
						class="focus:border-primary/50 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-gray-500 transition-all focus:bg-white/10 focus:outline-none"
					/>
				</div>

				<!-- Row 2: Product (full width) -->
				<div>
					<label for="reg-product" class="mb-1.5 block text-sm font-medium text-gray-300">
						{r.product} <span class="text-primary">*</span>
					</label>
					<div class="relative">
						<select
							id="reg-product"
							bind:value={product}
							class="focus:border-primary/50 w-full appearance-none rounded-full border border-white/10 bg-white/5 px-5 py-3 pr-10 text-sm text-white transition-all focus:bg-white/10 focus:outline-none"
						>
							<option value="" disabled selected class="bg-[#111111] text-gray-500"
								>{r.product_placeholder}</option
							>
							{#each r.product_options as opt (opt)}
								<option value={opt} class="bg-[#111111]">{opt}</option>
							{/each}
						</select>
						<span
							class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</span>
					</div>
				</div>

				<!-- Row 3: Email + Phone -->
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label for="reg-email" class="mb-1.5 block text-sm font-medium text-gray-300">
							{r.email} <span class="text-primary">*</span>
						</label>
						<input
							id="reg-email"
							type="email"
							bind:value={email}
							placeholder={r.email_placeholder}
							class="focus:border-primary/50 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-gray-500 transition-all focus:bg-white/10 focus:outline-none"
						/>
					</div>
					<div>
						<label for="reg-phone" class="mb-1.5 block text-sm font-medium text-gray-300">
							{r.phone} <span class="text-primary">*</span>
						</label>
						<input
							id="reg-phone"
							type="tel"
							bind:value={phone}
							placeholder={r.phone_placeholder}
							class="focus:border-primary/50 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-gray-500 transition-all focus:bg-white/10 focus:outline-none"
						/>
					</div>
				</div>

				<!-- Row 4: Job position + Company -->
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label for="reg-job" class="mb-1.5 block text-sm font-medium text-gray-300">
							{r.job_position} <span class="text-primary">*</span>
						</label>
						<div class="relative">
							<select
								id="reg-job"
								bind:value={job_position}
								class="focus:border-primary/50 w-full appearance-none rounded-full border border-white/10 bg-white/5 px-5 py-3 pr-10 text-sm text-white transition-all focus:bg-white/10 focus:outline-none"
							>
								<option value="" disabled selected class="bg-[#111111] text-gray-500"
									>{r.job_position_placeholder}</option
								>
								{#each r.job_position_options as opt (`position-${opt}`)}
									<option value={opt} class="bg-[#111111]">{opt}</option>
								{/each}
							</select>
							<span
								class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</span>
						</div>
					</div>
					<div>
						<label for="reg-company" class="mb-1.5 block text-sm font-medium text-gray-300">
							{r.company} <span class="text-primary">*</span>
						</label>
						<input
							id="reg-company"
							type="text"
							bind:value={company}
							placeholder={r.company_placeholder}
							class="focus:border-primary/50 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-gray-500 transition-all focus:bg-white/10 focus:outline-none"
						/>
					</div>
				</div>

				<!-- Row 5: Province + Headcount -->
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label for="reg-province" class="mb-1.5 block text-sm font-medium text-gray-300">
							{r.province} <span class="text-primary">*</span>
						</label>
						<div class="relative">
							<select
								id="reg-province"
								bind:value={province}
								class="focus:border-primary/50 w-full appearance-none rounded-full border border-white/10 bg-white/5 px-5 py-3 pr-10 text-sm text-white transition-all focus:bg-white/10 focus:outline-none"
							>
								<option value="" disabled selected class="bg-[#111111] text-gray-500"
									>{r.province_placeholder}</option
								>
								{#each r.province_options as opt (`province-${opt}`)}
									<option value={opt} class="bg-[#111111]">{opt}</option>
								{/each}
							</select>
							<span
								class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</span>
						</div>
					</div>
					<div>
						<label for="reg-headcount" class="mb-1.5 block text-sm font-medium text-gray-300">
							{r.headcount} <span class="text-primary">*</span>
						</label>
						<div class="relative">
							<select
								id="reg-headcount"
								bind:value={headcount}
								class="focus:border-primary/50 w-full appearance-none rounded-full border border-white/10 bg-white/5 px-5 py-3 pr-10 text-sm text-white transition-all focus:bg-white/10 focus:outline-none"
							>
								<option value="" disabled selected class="bg-[#111111] text-gray-500"
									>{r.headcount_placeholder}</option
								>
								{#each r.headcount_options as opt (`headcount-${opt}`)}
									<option value={opt} class="bg-[#111111]">{opt}</option>
								{/each}
							</select>
							<span
								class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</span>
						</div>
					</div>
				</div>

				<!-- CTA Button -->
				<button
					type="submit"
					class="btn-primary mt-1 w-full justify-center rounded-full py-3.5 text-sm"
				>
					{r.submit}
				</button>

				<!-- Disclaimer -->
				<p class="text-center text-xs leading-relaxed text-gray-500">
					{r.disclaimer_prefix}<a href="/privacy" class="text-primary hover:underline"
						>{r.disclaimer_link}</a
					>{r.disclaimer_suffix}
				</p>
			</form>
		</div>
	</div>
</div>
