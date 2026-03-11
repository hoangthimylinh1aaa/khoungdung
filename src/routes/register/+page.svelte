<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));
  $: r = translations[locale].registerPage;

  let name = '';
  let email = '';
  let phone = '';
  let company = '';
  let password = '';
</script>

<svelte:head>
  <title>{r.title} — Khoảng Dung</title>
  <meta name="description" content={r.subtitle} />
</svelte:head>

<section class="relative min-h-screen flex items-center justify-center pt-16 noise-overlay overflow-hidden">
  <div
    class="absolute inset-0 -z-10"
    style="background: radial-gradient(ellipse at 50% 0%, rgba(103,219,236,0.08) 0%, transparent 60%);"
  ></div>
  <div class="container-custom section-padding py-12 w-full max-w-lg mx-auto">
    <div class="glass rounded-2xl p-8 sm:p-10">
      <div class="text-center mb-8">
        <a href="/" class="inline-flex items-center gap-2 mb-6" aria-label="Khoảng Dung">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center font-bold text-dark text-sm shadow-[0_0_20px_rgba(103,219,236,0.4)]">
            Kho
          </div>
          <span class="font-display font-bold text-lg text-white">Ung <span class="text-gradient">Dung</span></span>
        </a>
        <h1 class="font-display font-bold text-2xl text-white mb-2">{r.title}</h1>
        <p class="text-gray-400 text-sm">{r.subtitle}</p>
      </div>

      <form on:submit|preventDefault class="space-y-4">
        <div class="grid sm:grid-cols-2 gap-4">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-400 mb-1.5">{r.name}</label>
            <input
              id="name"
              type="text"
              bind:value={name}
              placeholder={r.name_placeholder}
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-400 mb-1.5">{r.email}</label>
            <input
              id="email"
              type="email"
              bind:value={email}
              placeholder={r.email_placeholder}
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-400 mb-1.5">{r.phone}</label>
            <input
              id="phone"
              type="tel"
              bind:value={phone}
              placeholder={r.phone_placeholder}
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
            />
          </div>

          <!-- Company -->
          <div>
            <label for="company" class="block text-sm font-medium text-gray-400 mb-1.5">{r.company}</label>
            <input
              id="company"
              type="text"
              bind:value={company}
              placeholder={r.company_placeholder}
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-400 mb-1.5">{r.password}</label>
          <input
            id="password"
            type="password"
            bind:value={password}
            placeholder={r.password_placeholder}
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
          />
        </div>

        <button type="submit" class="btn-primary w-full justify-center py-3 text-sm mt-2">
          {r.submit}
        </button>
      </form>

      <p class="text-center text-gray-500 text-sm mt-6">
        {r.has_account}
        <a href="/login" class="text-primary hover:underline ml-1">{r.login_link}</a>
      </p>
    </div>
  </div>
</section>
