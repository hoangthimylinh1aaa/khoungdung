<script lang="ts">
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';
  import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));
  $: n = translations[locale].newsPage;

  const newsItems = [
    {
      badge: 'new',
      title: 'KD Commerce 3.0 — Nâng cấp toàn diện',
      excerpt: 'Phiên bản mới nhất của KD Commerce mang đến giao diện mới, hiệu suất vượt trội và tích hợp AI thông minh hơn.',
      date: '2026-03-01',
    },
    {
      badge: 'event',
      title: 'Hội thảo Chuyển đổi số 2026',
      excerpt: 'Khoảng Dung đồng hành cùng hơn 200 doanh nghiệp tại Hội thảo Chuyển đổi số TP. Hồ Chí Minh.',
      date: '2026-02-20',
    },
    {
      badge: 'update',
      title: 'KD HRM tích hợp chấm công khuôn mặt',
      excerpt: 'Tính năng nhận diện khuôn mặt mới giúp quản lý chấm công chính xác và tiện lợi hơn bao giờ hết.',
      date: '2026-02-15',
    },
    {
      badge: 'new',
      title: 'Ra mắt KD Chain phiên bản 2.5',
      excerpt: 'Quản lý chuỗi cửa hàng hiệu quả hơn với dashboard tập trung và báo cáo real-time mới.',
      date: '2026-02-05',
    },
    {
      badge: 'event',
      title: 'Khoảng Dung đạt Top 10 Startup Việt Nam',
      excerpt: 'Được vinh danh trong danh sách Top 10 Startup công nghệ xuất sắc nhất Việt Nam năm 2025.',
      date: '2026-01-25',
    },
    {
      badge: 'update',
      title: 'Cập nhật bảo mật và hiệu năng Q1/2026',
      excerpt: 'Các cải tiến bảo mật quan trọng và tối ưu hóa hiệu năng cho toàn bộ hệ sinh thái Khoảng Dung.',
      date: '2026-01-10',
    },
  ];
</script>

<svelte:head>
  <title>{n.hero_title} {n.hero_title_2} — Khoảng Dung</title>
  <meta name="description" content={n.hero_subtitle} />
</svelte:head>

<!-- Hero -->
<section class="relative pt-24 sm:pt-28 pb-12 noise-overlay overflow-hidden">
  <div
    class="absolute inset-0 -z-10"
    style="background: radial-gradient(ellipse at 50% 0%, rgba(103,219,236,0.1) 0%, transparent 60%);"
  ></div>
  <div class="container-custom section-padding py-8 text-center">
    <AnimatedText>
      <Badge variant="primary" class="mb-4">News</Badge>
      <h1 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
        {n.hero_title}
        <span class="text-gradient"> {n.hero_title_2}</span>
      </h1>
      <p class="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">{n.hero_subtitle}</p>
    </AnimatedText>
  </div>
</section>

<!-- News Grid -->
<section class="section-padding pt-0">
  <div class="container-custom">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each newsItems as item, i (i)}
        <AnimatedText delay={i * 50}>
          <article class="card-glow p-6 flex flex-col h-full">
            <div class="flex items-center gap-2 mb-3">
              {#if item.badge === 'new'}
                <span class="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-primary/20 text-primary border border-primary/30">{n.badge_new}</span>
              {:else if item.badge === 'update'}
                <span class="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">{n.badge_update}</span>
              {:else}
                <span class="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">{n.badge_event}</span>
              {/if}
              <span class="text-gray-500 text-xs">{item.date}</span>
            </div>
            <h2 class="font-display font-bold text-white text-base mb-2">{item.title}</h2>
            <p class="text-gray-400 text-sm flex-1 mb-4">{item.excerpt}</p>
            <a href="#" class="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1">
              {n.read_more}
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </article>
        </AnimatedText>
      {/each}
    </div>
  </div>
</section>
