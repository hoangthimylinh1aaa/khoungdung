<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';
  import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));
  $: a = translations[locale].aboutPage;

  const coreValues = [
    { icon: '💡', title: locale === 'vi' ? 'Đổi mới sáng tạo' : 'Innovation', desc: locale === 'vi' ? 'Luôn tìm kiếm giải pháp mới và sáng tạo để giải quyết thách thức.' : 'Always seeking new and creative solutions to solve challenges.' },
    { icon: '🤝', title: locale === 'vi' ? 'Tin cậy' : 'Trust', desc: locale === 'vi' ? 'Xây dựng mối quan hệ bền vững dựa trên sự tin tưởng và minh bạch.' : 'Building lasting relationships based on trust and transparency.' },
    { icon: '🚀', title: locale === 'vi' ? 'Tăng trưởng' : 'Growth', desc: locale === 'vi' ? 'Không ngừng học hỏi và phát triển cùng khách hàng và đối tác.' : 'Continuously learning and growing with customers and partners.' },
  ];

  const teamMembers = [
    { name: 'Nguyễn Hoàng Long', role: locale === 'vi' ? 'CEO & Co-founder' : 'CEO & Co-founder', avatar: 'NHL' },
    { name: 'Trần Minh Khoa', role: locale === 'vi' ? 'CTO & Co-founder' : 'CTO & Co-founder', avatar: 'TMK' },
    { name: 'Lê Thị Hương', role: locale === 'vi' ? 'CPO' : 'CPO', avatar: 'LTH' },
  ];
</script>

<svelte:head>
  <title>{a.hero_title} {a.hero_title_2} — Kho phần mềm</title>
  <meta name="description" content={a.hero_subtitle} />
</svelte:head>

<!-- Hero -->
<section class="relative pt-24 sm:pt-28 pb-12 noise-overlay overflow-hidden">
  <div
    class="absolute inset-0 -z-10"
    style="background: radial-gradient(ellipse at 50% 0%, rgba(103,219,236,0.1) 0%, transparent 60%);"
  ></div>
  <div class="container-custom section-padding py-8 text-center">
    <AnimatedText>
      <Badge variant="primary" class="mb-4">About</Badge>
      <h1 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
        {a.hero_title}
        <span class="text-gradient"> {a.hero_title_2}</span>
      </h1>
      <p class="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">{a.hero_subtitle}</p>
    </AnimatedText>
  </div>
</section>

<!-- Mission & Vision -->
<section class="section-padding pt-0">
  <div class="container-custom">
    <div class="grid md:grid-cols-2 gap-6">
      <AnimatedText direction="left">
        <div class="card-glow p-6 sm:p-8 h-full">
          <div class="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
            <span class="text-2xl">🎯</span>
          </div>
          <h2 class="font-display font-bold text-xl text-white mb-3">{a.mission_title}</h2>
          <p class="text-gray-400">{a.mission_desc}</p>
        </div>
      </AnimatedText>
      <AnimatedText direction="right">
        <div class="card-glow p-6 sm:p-8 h-full">
          <div class="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
            <span class="text-2xl">🔭</span>
          </div>
          <h2 class="font-display font-bold text-xl text-white mb-3">{a.vision_title}</h2>
          <p class="text-gray-400">{a.vision_desc}</p>
        </div>
      </AnimatedText>
    </div>
  </div>
</section>

<!-- Core Values -->
<section class="section-padding pt-0">
  <div class="container-custom">
    <AnimatedText>
      <h2 class="font-display font-bold text-2xl sm:text-3xl text-white text-center mb-8">
        <span class="text-gradient">{a.values_title}</span>
      </h2>
    </AnimatedText>
    <div class="grid md:grid-cols-3 gap-6">
      {#each coreValues as value, i (i)}
        <AnimatedText delay={i * 100}>
          <div class="card-glow p-6 text-center">
            <div class="text-3xl mb-3">{value.icon}</div>
            <h3 class="font-display font-bold text-white mb-2">{value.title}</h3>
            <p class="text-gray-400 text-sm">{value.desc}</p>
          </div>
        </AnimatedText>
      {/each}
    </div>
  </div>
</section>

<!-- Team -->
<section class="section-padding pt-0">
  <div class="container-custom">
    <AnimatedText>
      <div class="text-center mb-8">
        <h2 class="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
          <span class="text-gradient">{a.team_title}</span>
        </h2>
        <p class="text-gray-400">{a.team_subtitle}</p>
      </div>
    </AnimatedText>
    <div class="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
      {#each teamMembers as member, i (i)}
        <AnimatedText delay={i * 100}>
          <div class="card-glow p-6 text-center">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center mx-auto mb-4 text-dark font-bold">
              {member.avatar}
            </div>
            <h3 class="font-display font-bold text-white mb-1">{member.name}</h3>
            <p class="text-gray-400 text-sm">{member.role}</p>
          </div>
        </AnimatedText>
      {/each}
    </div>
  </div>
</section>
