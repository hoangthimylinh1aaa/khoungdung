<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';

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

<div class="bg-dark grid grid-cols-1 lg:grid-cols-2 pt-16">
  <!-- Left Panel: marketing/branding -->
  <div class="hidden lg:flex flex-col px-12 py-14 bg-dark relative overflow-hidden">
    <!-- Background pattern overlay -->
    <div
      class="absolute inset-0 opacity-5"
      style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 32px 32px;"
    ></div>
    <div
      class="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
      style="background: radial-gradient(circle, #67dbec 0%, transparent 70%); transform: translate(30%, -30%);"
    ></div>

    <div class="relative z-10 flex flex-col gap-8 flex-1 justify-center">
      <!-- Heading -->
      <div>
        <h1 class="font-display font-bold text-3xl xl:text-4xl text-white leading-tight mb-4">
          {r.left_title_1}<span class="text-primary">{r.left_title_highlight}</span>{r.left_title_2}
          <br />{r.left_title_3}
        </h1>
        <p class="text-gray-400 text-sm leading-relaxed max-w-sm">{r.left_subtitle}</p>
      </div>

      <!-- Feature list -->
      <ul class="flex flex-col gap-4">
        {#each [r.left_feature_1, r.left_feature_2, r.left_feature_3] as feature}
          <li class="flex items-start gap-3">
            <span class="mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center">
              <!-- Diamond checkmark icon -->
              <svg viewBox="0 0 20 20" fill="none" class="w-5 h-5">
                <path d="M10 2L18 10L10 18L2 10L10 2Z" fill="#67dbec" opacity="0.2"/>
                <path d="M10 2L18 10L10 18L2 10L10 2Z" stroke="#67dbec" stroke-width="1.5"/>
                <path d="M7 10L9 12L13 8" stroke="#67dbec" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span class="text-gray-300 text-sm">{feature}</span>
          </li>
        {/each}
      </ul>

      <!-- Divider -->
      <hr class="border-white/10" />

      <!-- Partners -->
      <div>
        <p class="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">{r.left_partners_label}</p>
        <div class="flex flex-wrap gap-3">
          {#each ['HT Hub', 'Vietblend', 'VPBank', 'VIB'] as partner}
            <span class="px-4 py-1.5 rounded-full border border-primary/20 text-gray-400 text-xs font-medium bg-primary/5">
              {partner}
            </span>
          {/each}
        </div>
      </div>
    </div>

    <!-- Footer help text -->
    <p class="relative z-10 text-gray-500 text-xs mt-8">
      {r.left_help}<a href="/contact" class="text-primary hover:underline">{r.left_help_link}</a>{r.left_help_suffix}
    </p>
  </div>

  <!-- Right Panel: registration form -->
  <div class="px-6 py-12 sm:px-10 lg:px-12 lg:border-l border-white/10 bg-dark">
    <div class="w-full max-w-lg mx-auto">
      <!-- Mobile logo -->
      <div class="lg:hidden mb-8 text-center">
        <a href="/" class="inline-flex items-center gap-2" aria-label="Kho phần mềm">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-cyan-300 flex items-center justify-center font-bold text-dark text-xs shadow-lg">
            KD
          </div>
          <span class="font-display font-bold text-lg text-white">Khoảng <span class="text-primary">Dung</span></span>
        </a>
      </div>

      <form on:submit|preventDefault class="flex flex-col gap-5">
        <!-- Row 1: Name (full width) -->
        <div>
          <label for="reg-name" class="block text-sm font-medium text-gray-300 mb-1.5">
            {r.name} <span class="text-primary">*</span>
          </label>
          <input
            id="reg-name"
            type="text"
            bind:value={name}
            placeholder={r.name_placeholder}
            class="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
          />
        </div>

        <!-- Row 2: Product (full width) -->
        <div>
          <label for="reg-product" class="block text-sm font-medium text-gray-300 mb-1.5">
            {r.product} <span class="text-primary">*</span>
          </label>
          <div class="relative">
            <select
              id="reg-product"
              bind:value={product}
              class="w-full appearance-none bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all pr-10"
            >
              <option value="" disabled selected class="bg-[#111111] text-gray-500">{r.product_placeholder}</option>
              {#each r.product_options as opt}
                <option value={opt} class="bg-[#111111]">{opt}</option>
              {/each}
            </select>
            <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </span>
          </div>
        </div>

        <!-- Row 3: Email + Phone -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="reg-email" class="block text-sm font-medium text-gray-300 mb-1.5">
              {r.email} <span class="text-primary">*</span>
            </label>
            <input
              id="reg-email"
              type="email"
              bind:value={email}
              placeholder={r.email_placeholder}
              class="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
            />
          </div>
          <div>
            <label for="reg-phone" class="block text-sm font-medium text-gray-300 mb-1.5">
              {r.phone} <span class="text-primary">*</span>
            </label>
            <input
              id="reg-phone"
              type="tel"
              bind:value={phone}
              placeholder={r.phone_placeholder}
              class="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        <!-- Row 4: Job position + Company -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="reg-job" class="block text-sm font-medium text-gray-300 mb-1.5">
              {r.job_position} <span class="text-primary">*</span>
            </label>
            <div class="relative">
              <select
                id="reg-job"
                bind:value={job_position}
                class="w-full appearance-none bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all pr-10"
              >
                <option value="" disabled selected class="bg-[#111111] text-gray-500">{r.job_position_placeholder}</option>
                {#each r.job_position_options as opt}
                  <option value={opt} class="bg-[#111111]">{opt}</option>
                {/each}
              </select>
              <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label for="reg-company" class="block text-sm font-medium text-gray-300 mb-1.5">
              {r.company} <span class="text-primary">*</span>
            </label>
            <input
              id="reg-company"
              type="text"
              bind:value={company}
              placeholder={r.company_placeholder}
              class="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        <!-- Row 5: Province + Headcount -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="reg-province" class="block text-sm font-medium text-gray-300 mb-1.5">
              {r.province} <span class="text-primary">*</span>
            </label>
            <div class="relative">
              <select
                id="reg-province"
                bind:value={province}
                class="w-full appearance-none bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all pr-10"
              >
                <option value="" disabled selected class="bg-[#111111] text-gray-500">{r.province_placeholder}</option>
                {#each r.province_options as opt}
                  <option value={opt} class="bg-[#111111]">{opt}</option>
                {/each}
              </select>
              <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label for="reg-headcount" class="block text-sm font-medium text-gray-300 mb-1.5">
              {r.headcount} <span class="text-primary">*</span>
            </label>
            <div class="relative">
              <select
                id="reg-headcount"
                bind:value={headcount}
                class="w-full appearance-none bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all pr-10"
              >
                <option value="" disabled selected class="bg-[#111111] text-gray-500">{r.headcount_placeholder}</option>
                {#each r.headcount_options as opt}
                  <option value={opt} class="bg-[#111111]">{opt}</option>
                {/each}
              </select>
              <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </span>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <button
          type="submit"
          class="btn-primary w-full justify-center rounded-full py-3.5 text-sm mt-1"
        >
          {r.submit}
        </button>

        <!-- Disclaimer -->
        <p class="text-center text-xs text-gray-500 leading-relaxed">
          {r.disclaimer_prefix}<a href="/privacy" class="text-primary hover:underline">{r.disclaimer_link}</a>{r.disclaimer_suffix}
        </p>
      </form>
    </div>
  </div>
</div>