<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));
  $: f = translations[locale].footer;

  const products = ['KD Commerce', 'KD Café', 'KD HRM', 'KD Chain'];
  const socials = [
    { name: 'Facebook', href: '#', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
    { name: 'LinkedIn', href: '#', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
    { name: 'Twitter/X', href: '#', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
  ];
</script>

<footer class="bg-surface border-t border-white/5 mt-auto">
  <!-- Main Footer -->
  <div class="container-custom section-padding pb-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <!-- Brand -->
      <div class="lg:col-span-1">
        <a href="/static" class="flex items-center gap-2 mb-4">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center font-bold text-dark text-sm">
            KD
          </div>
          <span class="font-display font-bold text-white">Khoảng <span class="text-gradient">Dung</span></span>
        </a>
        <p class="text-gray-400 text-sm leading-relaxed mb-5">{f.tagline}</p>
        <!-- Socials -->
        <div class="flex gap-3">
          {#each socials as social ( social.name )}
            <a
              href={social.href}
              aria-label={social.name}
              class="w-9 h-9 rounded-lg glass glass-hover flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d={social.icon} />
              </svg>
            </a>
          {/each}
        </div>
      </div>

      <!-- Products -->
      <div>
        <h3 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{f.products}</h3>
        <ul class="space-y-2.5">
          {#each products as product ( product )}
            <li>
              <a href="/service" class="text-gray-400 hover:text-primary text-sm transition-colors duration-200">
                {product}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h3 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{f.company}</h3>
        <ul class="space-y-2.5">
          <li><a href="/about" class="text-gray-400 hover:text-primary text-sm transition-colors duration-200">{f.about}</a></li>
          <li><a href="/blog" class="text-gray-400 hover:text-primary text-sm transition-colors duration-200">{f.blog}</a></li>
          <li><a href="/careers" class="text-gray-400 hover:text-primary text-sm transition-colors duration-200">{f.careers}</a></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div>
        <h3 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{f.legal}</h3>
        <ul class="space-y-2.5">
          <li><a href="/privacy" class="text-gray-400 hover:text-primary text-sm transition-colors duration-200">{f.privacy}</a></li>
          <li><a href="/terms" class="text-gray-400 hover:text-primary text-sm transition-colors duration-200">{f.terms}</a></li>
        </ul>
        <!-- Newsletter -->
        <div class="mt-6">
          <p class="text-gray-400 text-xs mb-2">Subscribe for updates</p>
          <div class="flex gap-2">
            <input
              type="email"
              placeholder="Email..."
              class="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
            />
            <button class="px-3 py-2 bg-primary text-dark rounded-lg text-xs font-semibold hover:shadow-[0_0_15px_rgba(103,219,236,0.4)] transition-all">→</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom Bar -->
  <div class="border-t border-white/5">
    <div class="container-custom px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
      <p class="text-gray-500 text-xs">{f.copyright}</p>
      <p class="text-gray-500 text-xs">{f.made_in}</p>
    </div>
  </div>
</footer>