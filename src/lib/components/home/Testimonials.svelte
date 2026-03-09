<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';
  import AnimatedText from '$lib/components/ui/AnimatedText.svelte';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));
  $: t = translations[locale].testimonials;

  const avatarColors = ['from-primary to-cyan-400', 'from-purple-400 to-pink-400', 'from-orange-400 to-yellow-400'];
</script>

<section class="section-padding" aria-labelledby="testimonials-heading">
  <div class="container-custom">
    <AnimatedText class="text-center mb-12">
      <h2 id="testimonials-heading" class="font-display font-bold text-3xl sm:text-4xl text-white">
        {t.title} <span class="text-gradient">{t.title_2}</span>
      </h2>
    </AnimatedText>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each t.items as item, i (item.name)}
        <AnimatedText delay={i * 150} direction="up">
          <blockquote class="card-glow p-6 flex flex-col h-full">
            <!-- Stars -->
            <div class="flex gap-1 mb-4">
              {#each Array(5) as _, j (j)}
                <svg class="w-4 h-4 text-primary fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              {/each}
            </div>

            <!-- Quote -->
            <p class="text-gray-300 text-sm leading-relaxed mb-6 flex-1 italic">"{item.content}"</p>

            <!-- Author -->
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br {avatarColors[i]} flex items-center justify-center text-dark font-bold text-xs flex-shrink-0">
                {item.avatar}
              </div>
              <div>
                <div class="text-white font-semibold text-sm">{item.name}</div>
                <div class="text-gray-500 text-xs">{item.role}</div>
              </div>
            </div>
          </blockquote>
        </AnimatedText>
      {/each}
    </div>
  </div>
</section>