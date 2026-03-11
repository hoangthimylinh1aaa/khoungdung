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
  let position = '';
  let company = '';
  let province = '';
  let companySize = '';
</script>

<svelte:head>
  <title>{r.title} — Khoảng Dung</title>
  <meta name="description" content={r.subtitle} />
</svelte:head>

<!-- Full viewport two-column layout, no top padding needed since header is fixed -->
<div class="min-h-screen flex flex-col lg:flex-row pt-16 lg:pt-0">

  <!-- ===== LEFT COLUMN: Pitch ===== -->
  <div class="lg:w-[42%] flex flex-col justify-between px-8 py-16 lg:py-0 lg:px-16 lg:min-h-screen relative overflow-hidden">
    <!-- Background glow -->
    <div class="absolute inset-0 -z-10" style="background: radial-gradient(ellipse at 20% 40%, rgba(103,219,236,0.07) 0%, transparent 60%);"></div>

    <div class="flex flex-col justify-center flex-1 max-w-lg py-20">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 mb-12 group" aria-label="Khoảng Dung">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center font-bold text-dark text-sm shadow-[0_0_20px_rgba(103,219,236,0.4)]">
          KD
        </div>
        <span class="font-display font-bold text-base text-white">Khoảng <span class="text-gradient">Dung</span></span>
      </a>

      <!-- Headline -->
      <h1 class="font-display font-bold text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight text-white mb-5">
        {r.pitch_title_1} <span class="text-gradient">{r.pitch_highlight}</span> {r.pitch_title_2}
      </h1>

      <!-- Subtitle -->
      <p class="text-gray-400 text-base leading-relaxed mb-10">{r.pitch_subtitle}</p>

      <!-- Benefits list -->
      <ul class="space-y-5 mb-12">
        {#each [r.benefit_1, r.benefit_2, r.benefit_3] as benefit}
          <li class="flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full border border-primary/50 flex items-center justify-center mt-0.5">
              <svg class="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span class="text-gray-300 text-sm leading-relaxed">{benefit}</span>
          </li>
        {/each}
      </ul>

      <!-- Partners strip -->
      <div>
        <p class="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-4">{r.partners_label}</p>
        <div class="flex items-center gap-6 flex-wrap">
          {#each ['KD Commerce', 'KD Café', 'KD HRM', 'KD Chain'] as partner}
            <span class="text-gray-500 font-semibold text-sm">{partner}</span>
          {/each}
        </div>
      </div>
    </div>

    <!-- Bottom help text -->
    <div class="pb-8 lg:pb-12">
      <p class="text-gray-500 text-sm">
        {r.help_text}
        <a href="/contact" class="text-primary hover:underline mx-1">{r.help_link}</a>
        {r.help_text_2}
      </p>
    </div>
  </div>

  <!-- ===== RIGHT COLUMN: Form ===== -->
  <div class="lg:w-[58%] flex items-center justify-center px-6 py-12 lg:py-0 lg:min-h-screen" style="background: #111111;">
    <div class="w-full max-w-xl">
      <!-- Form card -->
      <form on:submit|preventDefault class="space-y-5">

        <!-- Full name -->
        <div>
          <label for="reg-name" class="block text-sm font-medium text-white mb-1.5">
            {r.name} <span class="text-red-400">*</span>
          </label>
          <input
            id="reg-name"
            type="text"
            bind:value={name}
            placeholder={r.name_placeholder}
            class="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
          />
        </div>

        <!-- Product interest (full width select) -->
        <div>
          <label for="reg-product" class="block text-sm font-medium text-white mb-1.5">
            {r.product} <span class="text-red-400">*</span>
          </label>
          <div class="relative">
            <select
              id="reg-product"
              bind:value={product}
              class="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-gray-400 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all cursor-pointer"
            >
              <option value="" disabled selected class="bg-surface text-gray-400">{r.product_placeholder}</option>
              <option value="kd-commerce" class="bg-surface text-white">KD Commerce</option>
              <option value="kd-cafe" class="bg-surface text-white">KD Café</option>
              <option value="kd-hrm" class="bg-surface text-white">KD HRM</option>
              <option value="kd-chain" class="bg-surface text-white">KD Chain</option>
            </select>
            <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- Email + Phone (2 cols) -->
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label for="reg-email" class="block text-sm font-medium text-white mb-1.5">
              {r.email} <span class="text-red-400">*</span>
            </label>
            <input
              id="reg-email"
              type="email"
              bind:value={email}
              placeholder={r.email_placeholder}
              class="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
            />
          </div>
          <div>
            <label for="reg-phone" class="block text-sm font-medium text-white mb-1.5">
              {r.phone} <span class="text-red-400">*</span>
            </label>
            <input
              id="reg-phone"
              type="tel"
              bind:value={phone}
              placeholder={r.phone_placeholder}
              class="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
            />
          </div>
        </div>

        <!-- Position (select) + Company name (2 cols) -->
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label for="reg-position" class="block text-sm font-medium text-white mb-1.5">
              {r.position} <span class="text-red-400">*</span>
            </label>
            <div class="relative">
              <select
                id="reg-position"
                bind:value={position}
                class="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-gray-400 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all cursor-pointer"
              >
                <option value="" disabled selected class="bg-surface">{r.position_placeholder}</option>
                <option value="ceo" class="bg-surface text-white">Giám đốc/CEO</option>
                <option value="manager" class="bg-surface text-white">Trưởng phòng</option>
                <option value="staff" class="bg-surface text-white">Nhân viên</option>
                <option value="other" class="bg-surface text-white">Khác</option>
              </select>
              <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div>
            <label for="reg-company" class="block text-sm font-medium text-white mb-1.5">
              {r.company} <span class="text-red-400">*</span>
            </label>
            <input
              id="reg-company"
              type="text"
              bind:value={company}
              placeholder={r.company_placeholder}
              class="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
            />
          </div>
        </div>

        <!-- Province + Company size (2 cols) -->
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label for="reg-province" class="block text-sm font-medium text-white mb-1.5">
              {r.province} <span class="text-red-400">*</span>
            </label>
            <div class="relative">
              <select
                id="reg-province"
                bind:value={province}
                class="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-gray-400 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all cursor-pointer"
              >
                <option value="" disabled selected class="bg-surface">{r.province_placeholder}</option>
                <option value="hanoi" class="bg-surface text-white">Hà Nội</option>
                <option value="hcm" class="bg-surface text-white">TP. Hồ Chí Minh</option>
                <option value="danang" class="bg-surface text-white">Đà Nẵng</option>
                <option value="other" class="bg-surface text-white">Khác</option>
              </select>
              <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div>
            <label for="reg-size" class="block text-sm font-medium text-white mb-1.5">
              {r.company_size} <span class="text-red-400">*</span>
            </label>
            <div class="relative">
              <select
                id="reg-size"
                bind:value={companySize}
                class="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-gray-400 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all cursor-pointer"
              >
                <option value="" disabled selected class="bg-surface">{r.company_size_placeholder}</option>
                <option value="1-10" class="bg-surface text-white">1 - 10</option>
                <option value="11-50" class="bg-surface text-white">11 - 50</option>
                <option value="51-200" class="bg-surface text-white">51 - 200</option>
                <option value="200+" class="bg-surface text-white">200+</option>
              </select>
              <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Submit button -->
        <button type="submit" class="btn-primary w-full justify-center py-4 text-base mt-2 rounded-2xl">
          {r.submit}
        </button>

        <!-- Disclaimer -->
        <p class="text-center text-gray-500 text-xs leading-relaxed">
          {r.disclaimer} "{r.submit}", {r.disclaimer_2}
          <a href="/privacy" class="text-primary hover:underline">{r.privacy_link}</a>
          {r.disclaimer_3}
        </p>

        <!-- Login link -->
        <p class="text-center text-gray-500 text-sm">
          {r.has_account}
          <a href="/login" class="text-primary hover:underline ml-1">{r.login_link}</a>
        </p>
      </form>
    </div>
  </div>

</div>
