<script lang="ts">
  import Hero from '$lib/components/home/Hero.svelte';
  import Products from '$lib/components/home/Products.svelte';
  import AISection from '$lib/components/home/AISection.svelte';
  import Stats from '$lib/components/home/Stats.svelte';
  import Testimonials from '$lib/components/home/Testimonials.svelte';
</script>

<svelte:head>
  <title>Kho phần mềm — Nền tảng công nghệ thế hệ mới</title>
  <meta name="description" content="Kho phần mềm cung cấp hệ sinh thái công nghệ tích hợp AI — sàn thương mại điện tử, quản lý chuỗi cửa hàng, đặt đồ uống thông minh và HRM toàn diện." />
  <meta name="keywords" content="Kho phần mềm, thương mại điện tử, quản lý chuỗi cửa hàng, HRM, AI, phần mềm quản lý, SaaS, Việt Nam" />
  <meta property="og:title" content="Kho phần mềm — Nền tảng công nghệ thế hệ mới" />
  <meta property="og:description" content="Hệ sinh thái công nghệ tích hợp AI dành cho doanh nghiệp Việt Nam" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://khoangdung.vn" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="canonical" href="https://khoangdung.vn" />
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Kho phần mềm",
      "url": "https://khoangdung.vn",
      "description": "Nền tảng công nghệ thế hệ mới tích hợp AI cho doanh nghiệp",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+84-901-234-567",
        "contactType": "customer service"
      }
    })}
  </script>
</svelte:head>

<Hero />
<Products />
<AISection />
<Stats />
<Testimonials />