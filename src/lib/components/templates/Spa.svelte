<script lang="ts">
  import { Monitor, Smartphone, Tablet, Palette, X } from '@lucide/svelte';
  import { onMount } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { goto } from '$app/navigation';
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';

  let locale: Locale = 'vi';
  localeStore.subscribe((v) => (locale = v));

  $: t = translations[locale].templates.colorCustomizer;

  export let primaryColor: string = '#8B9D83'; // sage green
  export let secondaryColor: string = '#F5F1E8'; // warm cream

  let selectedPrimary = primaryColor;
  let selectedSecondary = secondaryColor;

  let deviceView: 'mobile' | 'tablet' | 'desktop' = 'desktop';

  let isMobileLayout = false;
  let showColorPanel = false;

  const deviceWidths = {
    mobile: '375px',
    tablet: '768px',
    desktop: '100%'
  };

  function setDevice(device: 'mobile' | 'tablet' | 'desktop') {
    deviceView = device;
  }

  $: primaryColor = selectedPrimary;
  $: secondaryColor = selectedSecondary;

  function resetColors() {
    selectedPrimary = '#8B9D83';
    selectedSecondary = '#F5F1E8';
  }

  function checkScreenSize() {
    const width = window.innerWidth;
    isMobileLayout = width < 1024;

    if (!isMobileLayout) {
      showColorPanel = false;
    }

    if (width < 640) {
      deviceView = 'mobile';
    } else if (width < 1280) {
      if (deviceView === 'desktop') {
        deviceView = 'tablet';
      }
    }
  }

  function toggleColorPanel() {
    showColorPanel = !showColorPanel;
  }

  onMount(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  });

  const services = [
    {
      id: 1,
      name: 'Massage Thư Giãn Toàn Thân',
      price: '650.000',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      duration: '90 phút',
      category: 'Massage'
    },
    {
      id: 2,
      name: 'Chăm Sóc Da Mặt Cao Cấp',
      price: '850.000',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
      duration: '60 phút',
      category: 'Facial'
    },
   {
  	id: 3,
 	 name: 'Spa Chân & Nail Art',
  price: '450.000',
  image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80',
  duration: '75 phút',
  category: 'Nail'
    },
    {
      id: 4,
      name: 'Tẩy Tế Bào Chết Body',
      price: '550.000',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      duration: '45 phút',
      category: 'Body'
    },
    {
      id: 5,
      name: 'Massage Đá Nóng',
      price: '750.000',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
      duration: '90 phút',
      category: 'Massage'
    },
    {
      id: 6,
      name: 'Gội Đầu Dưỡng Sinh',
      price: '350.000',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
      duration: '30 phút',
      category: 'Hair'
    }
  ];

	const onNavigateContact = () => goto('/contact');

</script>

<div class="flex flex-col lg:flex-row min-h-screen bg-gray-950">
  <div class="flex-1 py-20 lg:py-24 px-4 lg:px-8 overflow-y-auto bg-gray-900">

    <!-- Device Switcher -->
    <div class="mb-6 flex justify-center">
      <div class="inline-flex items-center gap-1 sm:gap-2 bg-gray-800 p-1.5 sm:p-2 rounded-lg">
        <button
          on:click={() => setDevice('mobile')}
          class="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition-all duration-200"
          style="background-color: {deviceView === 'mobile' ? primaryColor : 'transparent'}; color: {deviceView === 'mobile' ? 'white' : '#9ca3af'}"
        >
          <Smartphone size={16} class="sm:w-[18px] sm:h-[18px]" />
          <span class="text-xs sm:text-sm font-medium">Mobile</span>
        </button>

        <button
          on:click={() => setDevice('tablet')}
          class="hidden sm:flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition-all duration-200"
          style="background-color: {deviceView === 'tablet' ? primaryColor : 'transparent'}; color: {deviceView === 'tablet' ? 'white' : '#9ca3af'}"
        >
          <Tablet size={16} class="sm:w-[18px] sm:h-[18px]" />
          <span class="text-xs sm:text-sm font-medium">Tablet</span>
        </button>

        <button
          on:click={() => setDevice('desktop')}
          class="hidden xl:flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition-all duration-200"
          style="background-color: {deviceView === 'desktop' ? primaryColor : 'transparent'}; color: {deviceView === 'desktop' ? 'white' : '#9ca3af'}"
        >
          <Monitor size={16} class="sm:w-[18px] sm:h-[18px]" />
          <span class="text-xs sm:text-sm font-medium">Desktop</span>
        </button>
      </div>
    </div>

    <!-- Preview Container -->
    <div class="flex justify-center">
      <div
        class="bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 w-full"
        style="max-width: {deviceView === 'desktop' ? '100%' : deviceWidths[deviceView]};"
      >
        <div class="min-h-screen overflow-x-hidden" style="background-color: {secondaryColor};">

          <!-- Header -->
          <header class="backdrop-blur-sm bg-white/80 shadow-sm sticky top-0 z-10">
            <div class="px-4 sm:px-6">
              <div class="flex justify-between items-center py-3 sm:py-4">
                <div class="flex items-center gap-2">
                  <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="sm:w-9 sm:h-9">
                    <circle cx="20" cy="20" r="18" fill={primaryColor} opacity="0.2"/>
                    <circle cx="20" cy="20" r="12" fill={primaryColor}/>
                    <path d="M20 14V20L24 22" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <div>
                    <div class="text-lg sm:text-xl font-bold" style="color: {primaryColor};">Serenity Spa</div>
                    <div class="text-[8px] sm:text-[10px] text-gray-500 tracking-wide">WELLNESS & BEAUTY</div>
                  </div>
                </div>
                {#if deviceView === 'desktop'}
                  <nav class="hidden md:flex gap-4 lg:gap-8 items-center">
                    <span class="text-gray-700 text-xs lg:text-sm cursor-pointer font-medium hover:opacity-70 transition-opacity">Trang chủ</span>
                    <span class="text-gray-700 text-xs lg:text-sm cursor-pointer font-medium hover:opacity-70 transition-opacity">Dịch vụ</span>
                    <span class="text-gray-700 text-xs lg:text-sm cursor-pointer font-medium hover:opacity-70 transition-opacity">Về chúng tôi</span>
                    <button
                      class="text-xs lg:text-sm px-4 py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
                      style="background-color: {primaryColor};"
                    >
                      Đặt lịch
                    </button>
                  </nav>
                {/if}
              </div>
            </div>
          </header>

          <!-- Hero Banner -->
          <section
            class="relative flex items-center overflow-hidden"
            class:h-64={deviceView === 'mobile'}
            class:h-80={deviceView === 'tablet'}
            class:h-96={deviceView === 'desktop'}
          >
            <div class="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80"
                alt="Spa Background"
                class="w-full h-full object-cover opacity-40"
              />
              <div class="absolute inset-0" style="background: linear-gradient(135deg, {primaryColor}40 0%, {secondaryColor}80 100%);"></div>
            </div>
            <div class="relative z-10 w-full px-4 sm:px-6">
              <div class="text-center mx-auto max-w-2xl">
                <h1
                  class="font-light mb-2 sm:mb-3"
                  class:text-2xl={deviceView === 'mobile'}
                  class:text-3xl={deviceView === 'tablet'}
                  class:text-5xl={deviceView === 'desktop'}
                  style="color: {primaryColor};"
                >
                  Trải Nghiệm Thư Giãn Hoàn Hảo
                </h1>
                <p
                  class="mb-4 sm:mb-6 text-gray-700 font-light"
                  class:text-xs={deviceView === 'mobile'}
                  class:text-sm={deviceView === 'tablet'}
                  class:text-base={deviceView === 'desktop'}
                >
                  Nơi giao hòa giữa nghệ thuật chăm sóc sức khỏe và vẻ đẹp tự nhiên
                </p>
                <button
                  class="font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:-translate-y-0.5"
                  class:text-xs={deviceView === 'mobile'}
                  class:px-5={deviceView === 'mobile'}
                  class:py-2={deviceView === 'mobile'}
                  class:text-sm={deviceView !== 'mobile'}
                  class:px-8={deviceView !== 'mobile'}
                  class:py-3={deviceView !== 'mobile'}
                  style="background-color: {primaryColor}; border-color: {primaryColor}; color: white;"
                >
                  Khám phá ngay
                </button>
              </div>
            </div>
          </section>

          <!-- Services Section -->
          <section
            class:py-8={deviceView === 'mobile'}
            class:py-12={deviceView === 'tablet'}
            class:py-16={deviceView === 'desktop'}
          >
            <div class="px-4 sm:px-6 max-w-7xl mx-auto">
              <div class="text-center mb-8 sm:mb-12">
                <h2
                  class="font-light mb-2"
                  class:text-2xl={deviceView === 'mobile'}
                  class:text-3xl={deviceView === 'tablet'}
                  class:text-4xl={deviceView === 'desktop'}
                  style="color: {primaryColor};"
                >
                  Dịch Vụ Của Chúng Tôi
                </h2>
                <p class="text-gray-600 text-xs sm:text-sm font-light">Được thiết kế riêng cho sức khỏe và sắc đẹp của bạn</p>
              </div>

              <div
                class="grid gap-4 sm:gap-6"
                class:grid-cols-1={deviceView === 'mobile'}
                class:grid-cols-2={deviceView === 'tablet'}
                class:grid-cols-3={deviceView === 'desktop'}
              >
                {#each services.slice(0, deviceView === 'mobile' ? 3 : 6) as service (service.id)}
                  <div class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div class="relative h-44 sm:h-52 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div
                        class="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-light backdrop-blur-sm"
                        style="background-color: {primaryColor}90;"
                      >
                        {service.category}
                      </div>
                    </div>
                    <div class="p-4 sm:p-5">
                      <h3
                        class="font-medium text-gray-800 mb-2 sm:mb-3 line-clamp-2"
                        class:text-sm={deviceView === 'mobile'}
                        class:text-base={deviceView !== 'mobile'}
                      >
                        {service.name}
                      </h3>
                      <div class="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="text-[10px] sm:text-xs">{service.duration}</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <div>
                          <div class="text-[10px] text-gray-500 mb-0.5">Từ</div>
                          <span
                            class="font-semibold"
                            class:text-base={deviceView === 'mobile'}
                            class:text-lg={deviceView !== 'mobile'}
                            style="color: {primaryColor};"
                          >
                            {service.price}đ
                          </span>
                        </div>
                        <button
                          class="rounded-lg font-medium hover:opacity-90 transition-opacity"
                          class:text-[10px]={deviceView === 'mobile'}
                          class:px-3={deviceView === 'mobile'}
                          class:py-1.5={deviceView === 'mobile'}
                          class:text-xs={deviceView !== 'mobile'}
                          class:px-4={deviceView !== 'mobile'}
                          class:py-2={deviceView !== 'mobile'}
                          style="background-color: {primaryColor}; color: white;"
                        >
                          Đặt lịch
                        </button>
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </section>

          <!-- Features Section -->
          <section
            class="py-8 sm:py-12 bg-white/50"
            class:px-4={deviceView === 'mobile'}
            class:px-6={deviceView !== 'mobile'}
          >
            <div class="max-w-6xl mx-auto">
              <div
                class="grid gap-6 sm:gap-8"
                class:grid-cols-1={deviceView === 'mobile'}
                class:grid-cols-3={deviceView !== 'mobile'}
              >
                <div class="text-center">
                  <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" style="background-color: {primaryColor}20;">
                    <svg class="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: {primaryColor};">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 class="font-medium text-sm sm:text-base mb-1 sm:mb-2" style="color: {primaryColor};">100% Tự Nhiên</h3>
                  <p class="text-gray-600 text-xs sm:text-sm font-light">Sản phẩm hữu cơ cao cấp</p>
                </div>
                <div class="text-center">
                  <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" style="background-color: {primaryColor}20;">
                    <svg class="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: {primaryColor};">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                  </div>
                  <h3 class="font-medium text-sm sm:text-base mb-1 sm:mb-2" style="color: {primaryColor};">Chuyên Gia Giàu Kinh Nghiệm</h3>
                  <p class="text-gray-600 text-xs sm:text-sm font-light">Đội ngũ tận tâm, chuyên nghiệp</p>
                </div>
                <div class="text-center">
                  <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" style="background-color: {primaryColor}20;">
                    <svg class="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: {primaryColor};">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 class="font-medium text-sm sm:text-base mb-1 sm:mb-2" style="color: {primaryColor};">Cam Kết Chất Lượng</h3>
                  <p class="text-gray-600 text-xs sm:text-sm font-light">Hài lòng 100% hoặc hoàn tiền</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Footer -->
          <footer class="bg-white py-6 sm:py-10 border-t border-gray-200">
            <div class="px-4 sm:px-6 max-w-7xl mx-auto">
              <div
                class="grid gap-6 sm:gap-8 mb-6 sm:mb-8"
                class:grid-cols-1={deviceView === 'mobile'}
                class:grid-cols-4={deviceView !== 'mobile'}
              >
                <div class:col-span-2={deviceView !== 'mobile'}>
                  <div class="flex items-center gap-2 mb-3">
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="18" fill={primaryColor} opacity="0.2"/>
                      <circle cx="20" cy="20" r="12" fill={primaryColor}/>
                      <path d="M20 14V20L24 22" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <div>
                      <div class="text-base sm:text-lg font-bold" style="color: {primaryColor};">Serenity Spa</div>
                      <div class="text-[8px] text-gray-500 tracking-wide">WELLNESS & BEAUTY</div>
                    </div>
                  </div>
                  <p class="text-gray-600 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                    Điểm đến lý tưởng cho những ai tìm kiếm sự thư giãn, chăm sóc sức khỏe và làm đẹp tự nhiên.
                  </p>
                </div>
                <div>
                  <h4 class="font-medium text-sm sm:text-base mb-2 sm:mb-3" style="color: {primaryColor};">Liên kết</h4>
                  <ul class="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <li><span class="text-gray-600 cursor-pointer hover:opacity-70 transition-opacity font-light">Về chúng tôi</span></li>
                    <li><span class="text-gray-600 cursor-pointer hover:opacity-70 transition-opacity font-light">Dịch vụ</span></li>
                    <li><span class="text-gray-600 cursor-pointer hover:opacity-70 transition-opacity font-light">Bảng giá</span></li>
                    <li><span class="text-gray-600 cursor-pointer hover:opacity-70 transition-opacity font-light">Liên hệ</span></li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-medium text-sm sm:text-base mb-2 sm:mb-3" style="color: {primaryColor};">Liên hệ</h4>
                  <ul class="space-y-1 sm:space-y-2 text-gray-600 text-xs sm:text-sm font-light">
                    <li>📞 1900 1234</li>
                    <li>📧 info@serenityspa.vn</li>
                    <li>📍 123 Đường ABC, Q.1, TP.HCM</li>
                    <li>🕐 8:00 - 22:00 hàng ngày</li>
                  </ul>
                </div>
              </div>
              <div class="border-t border-gray-200 pt-4 sm:pt-6 text-center">
                <p class="text-gray-500 text-[10px] sm:text-xs font-light">&copy; 2024 Serenity Spa. All rights reserved.</p>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  </div>

  <!-- Floating Color Button (Mobile only) -->
  {#if isMobileLayout}
    <button
      on:click={toggleColorPanel}
      class="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl text-white transition-all duration-300 hover:scale-110"
      style="background-color: {primaryColor};"
    >
      <Palette size={24} />
    </button>
  {/if}

  <!-- Color Picker Panel -->
  <div
    class="fixed lg:relative inset-0 lg:inset-auto z-[999] lg:z-0 transition-transform duration-300 lg:translate-x-0"
    class:translate-x-0={showColorPanel}
    class:-translate-x-full={!showColorPanel && isMobileLayout}
    class:w-full={isMobileLayout}
    class:lg:w-80={!isMobileLayout}
    class:xl:w-96={!isMobileLayout}
  >
    {#if isMobileLayout && showColorPanel}
      <div
        class="absolute inset-0 bg-black/50 lg:hidden"
        on:click={toggleColorPanel}
      ></div>
    {/if}

    <div
      class="relative h-full bg-gray-900 overflow-y-auto ml-auto max-w-md lg:max-w-none py-8 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      {#if isMobileLayout}
        <button
          on:click={toggleColorPanel}
          class="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors lg:hidden"
        >
          <X size={24} />
        </button>
      {/if}

      <h2 class="text-xl sm:text-2xl font-bold text-white text-center mb-6 sm:mb-8">
          🎨 {t.title}
      </h2>

      <div class="space-y-6 sm:space-y-8">
        <div class="bg-gray-800 p-4 sm:p-6 rounded-xl">
          <label for="primary-color" class="flex justify-between items-center mb-3 sm:mb-4 text-gray-200 text-sm sm:text-base font-semibold">
            <span>{t.primary}</span>
            <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 border-gray-700" style="background-color: {selectedPrimary};"></span>
          </label>
          <input
            type="color"
            id="primary-color"
            bind:value={selectedPrimary}
            class="w-full h-10 sm:h-12 rounded-lg cursor-pointer border-none mb-2 sm:mb-3"
          />
          <input
            type="text"
            bind:value={selectedPrimary}
            class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm sm:text-base font-mono"
            placeholder="#ff9966"
          />
        </div>

        <div class="bg-gray-800 p-4 sm:p-6 rounded-xl">
          <label for="secondary-color" class="flex justify-between items-center mb-3 sm:mb-4 text-gray-200 text-sm sm:text-base font-semibold">
            <span>{t.secondary}</span>
            <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 border-gray-700" style="background-color: {selectedSecondary};"></span>
          </label>
          <input
            type="color"
            id="secondary-color"
            bind:value={selectedSecondary}
            class="w-full h-10 sm:h-12 rounded-lg cursor-pointer border-none mb-2 sm:mb-3"
          />
          <input
            type="text"
            bind:value={selectedSecondary}
            class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm sm:text-base font-mono"
            placeholder="#ffffff"
          />
        </div>
      </div>

      <Button
        on:click={resetColors}
        class="w-full mt-6 flex items-center justify-center">
        🔄 {t.reset}
      </Button>

      <div class="mt-6 sm:mt-8 bg-gray-800 p-4 sm:p-6 rounded-xl border-l-4" style="border-color: {primaryColor};">
        <h3 class="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">💡 {t.instructions}:</h3>
        <ul class="text-gray-400 space-y-1.5 sm:space-y-2 text-xs sm:text-sm leading-relaxed">
          <li>• {t.primary_help}</li>
          <li>• {t.secondary_help}</li>
          <li>• {t.live_preview}</li>
        </ul>
      </div>

      <Button
        on:click={onNavigateContact}
        class="w-full mt-6 flex items-center justify-center">
        {t.use_template}
      </Button>
    </div>
  </div>
</div>

<style>
  .transition-transform {
    transition: transform 0.3s ease-in-out;
  }

  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  :global(.overflow-y-auto::-webkit-scrollbar) {
    width: 6px;
  }

  :global(.overflow-y-auto::-webkit-scrollbar-track) {
    background: transparent;
  }

  :global(.overflow-y-auto::-webkit-scrollbar-thumb) {
    background: #4b5563;
    border-radius: 3px;
  }
</style>