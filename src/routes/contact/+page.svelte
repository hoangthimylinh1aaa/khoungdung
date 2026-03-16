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
    message: '',
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
    hours: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>`,
  };
</script>

<svelte:head>
  <title>Liên hệ — Kho phần mềm</title>
  <meta name="description" content="Liên hệ với Kho phần mềm để được tư vấn giải pháp công nghệ phù hợp cho doanh nghiệp của bạn." />
  <meta property="og:title" content="Liên hệ — Kho phần mềm" />
  <link rel="canonical" href="https://khoangdung.vn/contact" />
</svelte:head>

<!-- Hero -->
<section class="relative pt-24 sm:pt-28 pb-12 noise-overlay overflow-hidden">
  <div class="absolute inset-0 -z-10"
    style="background: radial-gradient(ellipse at 50% 0%, rgba(103,219,236,0.1) 0%, transparent 60%);">
  </div>
  <div class="container-custom section-padding py-8 text-center">
    <AnimatedText>
      <Badge variant="primary" class="mb-4">Contact</Badge>
      <h1 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
        {c.hero_title}
        <span class="text-gradient"> {c.hero_title_2}</span>
      </h1>
      <p class="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">{c.hero_subtitle}</p>
    </AnimatedText>
  </div>
</section>

<!-- Main Content -->
<section class="section-padding pt-0">
  <div class="container-custom">
    <div class="grid lg:grid-cols-5 gap-8 lg:gap-12">

      <!-- Contact Form -->
      <div class="lg:col-span-3">
        <AnimatedText direction="left">
          <div class="card-glow p-6 sm:p-8">
            <h2 class="font-display font-bold text-xl text-white mb-6">{c.form.title}</h2>

            {#if submitted}
              <div class="text-center py-12">
                <div class="text-4xl mb-4">✅</div>
                <p class="text-white font-semibold text-lg">{c.form.success}</p>
              </div>
            {:else}
              <form on:submit|preventDefault={handleSubmit} class="space-y-4" novalidate>
                <div class="grid sm:grid-cols-2 gap-4">
                  <!-- Name -->
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-400 mb-1.5">{c.form.name} <span class="text-primary">*</span></label>
                    <input
                      id="name" type="text" bind:value={formState.name} required
                      placeholder={c.form.name_placeholder}
                      class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                  <!-- Email -->
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-400 mb-1.5">{c.form.email} <span class="text-primary">*</span></label>
                    <input
                      id="email" type="email" bind:value={formState.email} required
                      placeholder={c.form.email_placeholder}
                      class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                  <!-- Phone -->
                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-400 mb-1.5">{c.form.phone}</label>
                    <input
                      id="phone" type="tel" bind:value={formState.phone}
                      placeholder={c.form.phone_placeholder}
                      class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                  <!-- Company -->
                  <div>
                    <label for="company" class="block text-sm font-medium text-gray-400 mb-1.5">{c.form.company}</label>
                    <input
                      id="company" type="text" bind:value={formState.company}
                      placeholder={c.form.company_placeholder}
                      class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <!-- Service -->
<div>
  <label for="service" class="block text-sm font-medium text-gray-400 mb-1.5">{c.form.service}</label>
  <select
    id="service" bind:value={formState.service}
    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all appearance-none"
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
                  <label for="message" class="block text-sm font-medium text-gray-400 mb-1.5">{c.form.message} <span class="text-primary">*</span></label>
                  <textarea
                    id="message" bind:value={formState.message} required rows="4"
                    placeholder={c.form.message_placeholder}
                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  class="btn-primary w-full justify-center py-3.5 text-sm sm:text-base"
                >
                  {#if submitting}
                    <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    {c.form.submitting}
                  {:else}
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
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
            <h2 class="font-display font-bold text-xl text-white mb-6">{c.info.title}</h2>

            {#each [
              { key: 'address', value: c.info.address_value, label: c.info.address },
              { key: 'phone', value: c.info.phone_value, label: c.info.phone },
              { key: 'email', value: c.info.email_value, label: c.info.email },
              { key: 'hours', value: c.info.hours_value, label: c.info.hours },
            ] as item ( item.key )}
              <div class="card-glow p-4 flex gap-4 items-start group">
                <div class="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <svg class="w-4.5 h-4.5 text-primary w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {contactIcons[item.key]}
                  </svg>
                </div>
                <div>
                  <div class="text-gray-500 text-xs mb-0.5">{item.label}</div>
                  <div class="text-white text-sm font-medium">{item.value}</div>
                </div>
              </div>
            {/each}

            <!-- Map placeholder -->
            <div class="card-glow overflow-hidden h-40 flex items-center justify-center mt-4">
              <div class="text-center">
                <div class="text-2xl mb-2">🗺️</div>
                <p class="text-gray-500 text-sm">Ho Chi Minh City, Vietnam</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" class="text-primary text-xs mt-1 inline-block hover:underline">
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