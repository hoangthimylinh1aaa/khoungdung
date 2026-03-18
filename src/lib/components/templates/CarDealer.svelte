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

  export let primaryColor: string = '#ff9966';
  export let secondaryColor: string = '#ffffff';

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

  // Cập nhật màu khi thay đổi
  $: primaryColor = selectedPrimary;
  $: secondaryColor = selectedSecondary;

  // Reset về màu mặc định
  function resetColors() {
    selectedPrimary = '#ff9966';
    selectedSecondary = '#ffffff';
  }

  function checkScreenSize() {
    const width = window.innerWidth;
    isMobileLayout = width < 1024;

    if (!isMobileLayout) {
      showColorPanel = false; // Auto hide panel on desktop
    }

    // Auto-adjust device view based on screen size
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

  const cars = [
    {
      id: 1,
      name: 'Mercedes-Benz S-Class 2024',
      price: '2.500.000.000',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
      year: 2024,
      km: '0 km',
      fuel: 'Xăng'
    },
    {
      id: 2,
      name: 'BMW X5 M Sport',
      price: '1.850.000.000',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      year: 2023,
      km: '15.000 km',
      fuel: 'Diesel'
    },
    {
      id: 3,
      name: 'Audi A8 Premium',
      price: '2.200.000.000',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
      year: 2024,
      km: '5.000 km',
      fuel: 'Xăng'
    },
    {
      id: 4,
      name: 'Porsche Cayenne Turbo',
      price: '3.100.000.000',
      image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80',
      year: 2024,
      km: '0 km',
      fuel: 'Xăng'
    },
    {
      id: 5,
      name: 'Range Rover Evoque',
      price: '1.650.000.000',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
      year: 2023,
      km: '22.000 km',
      fuel: 'Diesel'
    },
    {
      id: 6,
      name: 'Lexus ES 300h',
      price: '1.420.000.000',
      image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80',
      year: 2024,
      km: '8.000 km',
      fuel: 'Hybrid'
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

        <!-- Tablet button - hiển thị từ màn hình sm (640px) trở lên -->
        <button
          on:click={() => setDevice('tablet')}
          class="hidden sm:flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition-all duration-200"
          style="background-color: {deviceView === 'tablet' ? primaryColor : 'transparent'}; color: {deviceView === 'tablet' ? 'white' : '#9ca3af'}"
        >
          <Tablet size={16} class="sm:w-[18px] sm:h-[18px]" />
          <span class="text-xs sm:text-sm font-medium">Tablet</span>
        </button>

        <!-- Desktop button - hiển thị từ màn hình xl (1280px) trở lên -->
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

    <!-- Preview Container with dynamic width -->
    <div class="flex justify-center">
      <div
        class="bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 w-full"
        style="max-width: {deviceView === 'desktop' ? '100%' : deviceWidths[deviceView]};"
      >
        <div class="min-h-screen bg-gray-50 overflow-x-hidden">

          <!-- Header -->
          <header class="shadow-md" style="background-color: {secondaryColor};">
            <div class="px-4 sm:px-6">
              <div class="flex justify-between items-center py-3 sm:py-4">
                <div class="flex items-center gap-2">
                  <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="sm:w-8 sm:h-8">
                    <rect width="40" height="40" rx="8" fill={primaryColor}/>
                    <path d="M12 20L18 14L24 20L30 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 26L18 20L24 26L30 20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span class="text-lg sm:text-xl font-bold text-gray-800">AutoLux</span>
                </div>
                {#if deviceView === 'desktop'}
                  <nav class="hidden md:flex gap-4 lg:gap-6">
                    <span class="text-gray-600 text-xs lg:text-sm cursor-pointer font-medium transition-colors hover:opacity-80">Trang chủ</span>
                    <span class="text-gray-600 text-xs lg:text-sm cursor-pointer font-medium transition-colors hover:opacity-80">Xe hiện có</span>
                    <span class="text-gray-600 text-xs lg:text-sm cursor-pointer font-medium transition-colors hover:opacity-80">Giới thiệu</span>
                    <span class="text-gray-600 text-xs lg:text-sm cursor-pointer font-medium transition-colors hover:opacity-80">Liên hệ</span>
                  </nav>
                {/if}
              </div>
            </div>
          </header>

          <!-- Banner -->
          <section
            class="relative flex items-center overflow-hidden"
            class:h-56={deviceView === 'mobile'}
            class:h-72={deviceView === 'tablet'}
            class:h-80={deviceView === 'desktop'}
            style="background: linear-gradient(135deg, {primaryColor} 0%, #ff6b6b 100%);"
          >
            <div class="absolute inset-0 opacity-30"
              style="background: url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80') center/cover;">
            </div>
            <div class="relative z-10 w-full px-4 sm:px-6">
              <div class="text-center mx-auto text-white">
                <h1
                  class="font-extrabold mb-2 sm:mb-3 drop-shadow-lg"
                  class:text-xl={deviceView === 'mobile'}
                  class:text-2xl={deviceView === 'tablet'}
                  class:text-4xl={deviceView === 'desktop'}
                >
                  Tìm chiếc xe mơ ước của bạn
                </h1>
                <p
                  class="mb-4 sm:mb-6 opacity-95"
                  class:text-xs={deviceView === 'mobile'}
                  class:text-sm={deviceView === 'tablet'}
                  class:text-base={deviceView === 'desktop'}
                >
                  Bộ sưu tập xe hạng sang chính hãng
                </p>
                <button
                  class="bg-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  class:text-xs={deviceView === 'mobile'}
                  class:px-4={deviceView === 'mobile'}
                  class:py-1.5={deviceView === 'mobile'}
                  class:text-sm={deviceView !== 'mobile'}
                  class:px-6={deviceView !== 'mobile'}
                  class:py-2={deviceView !== 'mobile'}
                  style="color: {primaryColor};"
                >
                  Xem ngay
                </button>
              </div>
            </div>
          </section>

          <!-- Car List -->
          <section
            class:py-6={deviceView === 'mobile'}
            class:py-8={deviceView === 'tablet'}
            class:py-10={deviceView === 'desktop'}
            style="background-color: {secondaryColor};"
          >
            <div class="px-4 sm:px-6">
              <h2
                class="font-bold text-center text-gray-800 mb-6"
                class:text-xl={deviceView === 'mobile'}
                class:text-2xl={deviceView === 'tablet'}
                class:text-3xl={deviceView === 'desktop'}
              >
                Xe nổi bật
              </h2>
              <div
                class="grid gap-4 sm:gap-6"
                class:grid-cols-1={deviceView === 'mobile'}
                class:grid-cols-2={deviceView === 'tablet'}
                class:grid-cols-3={deviceView === 'desktop'}
              >
                {#each cars.slice(0, deviceView === 'mobile' ? 3 : 6) as car (car.id)}
                  <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                    <div class="relative h-40 sm:h-48 overflow-hidden group">
                      <img src={car.image} alt={car.name} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div
                        class="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-3 py-1 rounded-full text-white text-xs font-semibold"
                        style="background-color: {primaryColor};"
                      >
                        Hot
                      </div>
                    </div>
                    <div class="p-3 sm:p-4">
                      <h3
                        class="font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2"
                        class:text-sm={deviceView === 'mobile'}
                        class:text-base={deviceView !== 'mobile'}
                      >
                        {car.name}
                      </h3>
                      <div class="flex gap-2 sm:gap-3 text-xs text-gray-600 mb-2 sm:mb-3">
                        <span class="text-[10px] sm:text-xs">📅 {car.year}</span>
                        <span class="text-[10px] sm:text-xs">🛣️ {car.km}</span>
                        <span class="text-[10px] sm:text-xs">⛽ {car.fuel}</span>
                      </div>
                      <div class="flex justify-between items-center gap-2">
                        <span
                          class="font-bold line-clamp-1"
                          class:text-xs={deviceView === 'mobile'}
                          class:text-sm={deviceView !== 'mobile'}
                          style="color: {primaryColor};"
                        >
                          {car.price} VNĐ
                        </span>
                        <button
                          class="rounded-lg text-white font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
                          class:text-[10px]={deviceView === 'mobile'}
                          class:px-2={deviceView === 'mobile'}
                          class:py-1={deviceView === 'mobile'}
                          class:text-xs={deviceView !== 'mobile'}
                          class:px-3={deviceView !== 'mobile'}
                          class:py-1.5={deviceView !== 'mobile'}
                          style="background-color: {primaryColor};"
                        >
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </section>

          <!-- Footer -->
          <footer class="bg-gray-800 text-white py-6 sm:py-8">
            <div class="px-4 sm:px-6">
              <div
                class="grid gap-4 sm:gap-6 mb-4 sm:mb-6"
                class:grid-cols-1={deviceView === 'mobile'}
                class:grid-cols-3={deviceView !== 'mobile'}
              >
                <div>
                  <h4 class="text-base sm:text-lg font-bold mb-2 sm:mb-3" style="color: {primaryColor};">AutoLux</h4>
                  <p class="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    Showroom xe hạng sang uy tín
                  </p>
                </div>
                <div>
                  <h4 class="text-base sm:text-lg font-bold mb-2 sm:mb-3" style="color: {primaryColor};">Liên kết</h4>
                  <ul class="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <li><span class="text-gray-400 cursor-pointer hover:text-gray-300">Trang chủ</span></li>
                    <li><span class="text-gray-400 cursor-pointer hover:text-gray-300">Xe hiện có</span></li>
                    <li><span class="text-gray-400 cursor-pointer hover:text-gray-300">Giới thiệu</span></li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-base sm:text-lg font-bold mb-2 sm:mb-3" style="color: {primaryColor};">Liên hệ</h4>
                  <ul class="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                    <li>📞 1900 xxxx</li>
                    <li>📧 info@autolux.vn</li>
                    <li>📍 Hà Nội, Việt Nam</li>
                  </ul>
                </div>
              </div>
              <div class="border-t border-gray-700 pt-3 sm:pt-4 text-center text-gray-500 text-[10px] sm:text-xs">
                <p>&copy; 2024 AutoLux. All rights reserved.</p>
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

  <!-- Phần Color Picker -->
  <div
    class="fixed lg:relative inset-0 lg:inset-auto z-[9999] lg:z-0 transition-transform duration-300 lg:translate-x-0"
    class:translate-x-0={showColorPanel}
    class:-translate-x-full={!showColorPanel && isMobileLayout}
    class:w-full={isMobileLayout}
    class:lg:w-80={!isMobileLayout}
    class:xl:w-96={!isMobileLayout}
  >
    <!-- Overlay (Mobile only) -->
    {#if isMobileLayout && showColorPanel}
      <div
        class="absolute inset-0 bg-black/50 lg:hidden"
        on:click={toggleColorPanel}
      ></div>
    {/if}

    <!-- Panel Content -->
    <div
      class="relative h-full bg-gray-900 overflow-y-auto ml-auto max-w-md lg:max-w-none py-8 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      <!-- Close button (Mobile only) -->
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
  /* Smooth transitions */
  .transition-transform {
    transition: transform 0.3s ease-in-out;
  }

  /* Line clamp utility */
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

  /* Hide scrollbar for cleaner preview */
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