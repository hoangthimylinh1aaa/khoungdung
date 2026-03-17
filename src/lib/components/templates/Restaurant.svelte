<script lang="ts">
  import { Monitor, Smartphone, Tablet, Palette, X } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { goto } from '$app/navigation';

  export let primaryColor: string = '#D97941'; // burnt orange
  export let secondaryColor: string = '#FFFFF0'; // ivory white

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
    selectedPrimary = '#D97941';
    selectedSecondary = '#FFFFF0';
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

  // Danh sách món ăn nổi bật
  const dishes = [
    {
      id: 1,
      name: 'Bò Beefsteak Úc Cao Cấp',
      price: '450.000',
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
      category: 'Main Course',
      description: 'Thịt bò Úc thượng hạng'
    },
    {
      id: 2,
      name: 'Tôm Hùm Alaska Nướng Bơ',
      price: '850.000',
      image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&q=80',
      category: 'Seafood',
      description: 'Tươi sống mỗi ngày'
    },
    {
      id: 3,
      name: 'Sushi & Sashimi Omakase',
      price: '680.000',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
      category: 'Japanese',
      description: 'Set Chef đặc biệt'
    },
    {
      id: 4,
      name: 'Pasta Truffle Ý Truyền Thống',
      price: '380.000',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
      category: 'Italian',
      description: 'Nấm truffle nhập khẩu'
    },
    {
      id: 5,
      name: 'Cá Hồi Na Uy Sốt Chanh Dây',
      price: '420.000',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
      category: 'Seafood',
      description: 'Phi lê cá hồi tươi'
    },
    {
      id: 6,
      name: 'Lẩu Hải Sản Cao Cấp',
      price: '950.000',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      category: 'Hot Pot',
      description: 'Combo 2-3 người'
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
          <header class="backdrop-blur-sm bg-white/95 shadow-sm sticky top-0 z-10">
            <div class="px-4 sm:px-6">
              <div class="flex justify-between items-center py-3 sm:py-4">
                <div class="flex items-center gap-2">
                  <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="sm:w-10 sm:h-10">
                    <rect width="40" height="40" rx="8" fill={primaryColor}/>
                    <path d="M20 10L24 18H16L20 10Z" fill="white"/>
                    <circle cx="20" cy="25" r="3" fill="white"/>
                    <path d="M13 30H27" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <div>
                    <div class="text-lg sm:text-xl font-bold" style="color: {primaryColor};">La Cuisine</div>
                    <div class="text-[8px] sm:text-[10px] text-gray-500 tracking-widest">FINE DINING</div>
                  </div>
                </div>
                {#if deviceView === 'desktop'}
                  <nav class="hidden md:flex gap-4 lg:gap-8 items-center">
                    <span class="text-gray-700 text-xs lg:text-sm cursor-pointer font-medium hover:opacity-70 transition-opacity">Trang chủ</span>
                    <span class="text-gray-700 text-xs lg:text-sm cursor-pointer font-medium hover:opacity-70 transition-opacity">Thực đơn</span>
                    <span class="text-gray-700 text-xs lg:text-sm cursor-pointer font-medium hover:opacity-70 transition-opacity">Về chúng tôi</span>
                    <button
                      class="text-xs lg:text-sm px-5 py-2.5 rounded-md text-white font-semibold hover:opacity-90 transition-all shadow-md"
                      style="background-color: {primaryColor};"
                    >
                      Đặt bàn ngay
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
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
                alt="Restaurant Background"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
            </div>
            <div class="relative z-10 w-full px-4 sm:px-6">
              <div class="max-w-2xl">
                <h1
                  class="font-serif mb-2 sm:mb-3 text-white"
                  class:text-2xl={deviceView === 'mobile'}
                  class:text-4xl={deviceView === 'tablet'}
                  class:text-5xl={deviceView === 'desktop'}
                >
                  Hương Vị Đỉnh Cao
                </h1>
                <p
                  class="mb-4 sm:mb-6 text-white/90"
                  class:text-xs={deviceView === 'mobile'}
                  class:text-sm={deviceView === 'tablet'}
                  class:text-base={deviceView === 'desktop'}
                >
                  Trải nghiệm ẩm thực tinh tế từ khắp năm châu
                </p>
                <button
                  class="font-semibold rounded-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                  class:text-xs={deviceView === 'mobile'}
                  class:px-5={deviceView === 'mobile'}
                  class:py-2={deviceView === 'mobile'}
                  class:text-sm={deviceView !== 'mobile'}
                  class:px-8={deviceView !== 'mobile'}
                  class:py-3={deviceView !== 'mobile'}
                  style="background-color: {primaryColor}; color: white;"
                >
                  Xem thực đơn
                </button>
              </div>
            </div>
          </section>

          <!-- Menu Section -->
          <section
            class:py-8={deviceView === 'mobile'}
            class:py-12={deviceView === 'tablet'}
            class:py-16={deviceView === 'desktop'}
          >
            <div class="px-4 sm:px-6 max-w-7xl mx-auto">
              <div class="text-center mb-8 sm:mb-12">
                <h2
                  class="font-serif mb-2"
                  class:text-2xl={deviceView === 'mobile'}
                  class:text-3xl={deviceView === 'tablet'}
                  class:text-4xl={deviceView === 'desktop'}
                  style="color: {primaryColor};"
                >
                  Món Ăn Đặc Sắc
                </h2>
                <p class="text-gray-600 text-xs sm:text-sm">Được chọn lọc bởi đầu bếp hàng đầu</p>
              </div>

              <div
                class="grid gap-4 sm:gap-6"
                class:grid-cols-1={deviceView === 'mobile'}
                class:grid-cols-2={deviceView === 'tablet'}
                class:grid-cols-3={deviceView === 'desktop'}
              >
                {#each dishes.slice(0, deviceView === 'mobile' ? 3 : 6) as dish (dish.id)}
                  <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100">
                    <div class="relative h-44 sm:h-52 overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div
                        class="absolute top-3 right-3 px-3 py-1 rounded-md text-white text-xs font-medium backdrop-blur-sm shadow-lg"
                        style="background-color: {primaryColor};"
                      >
                        {dish.category}
                      </div>
                    </div>
                    <div class="p-4 sm:p-5">
                      <h3
                        class="font-semibold text-gray-800 mb-2 line-clamp-2"
                        class:text-sm={deviceView === 'mobile'}
                        class:text-base={deviceView !== 'mobile'}
                      >
                        {dish.name}
                      </h3>
                      <p class="text-gray-500 text-[10px] sm:text-xs mb-3 line-clamp-1">{dish.description}</p>
                      <div class="flex justify-between items-center">
                        <div>
                          <span
                            class="font-bold"
                            class:text-lg={deviceView === 'mobile'}
                            class:text-xl={deviceView !== 'mobile'}
                            style="color: {primaryColor};"
                          >
                            {dish.price}đ
                          </span>
                        </div>
                        <button
                          class="rounded-md font-semibold hover:opacity-90 transition-all shadow-md"
                          class:text-[10px]={deviceView === 'mobile'}
                          class:px-3={deviceView === 'mobile'}
                          class:py-1.5={deviceView === 'mobile'}
                          class:text-xs={deviceView !== 'mobile'}
                          class:px-4={deviceView !== 'mobile'}
                          class:py-2={deviceView !== 'mobile'}
                          style="background-color: {primaryColor}; color: white;"
                        >
                          Đặt món
                        </button>
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </section>

          <!-- Why Choose Us Section -->
          <section
            class="py-8 sm:py-12"
            style="background: linear-gradient(135deg, {primaryColor}10 0%, {secondaryColor} 100%);"
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
                  <div class="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center shadow-lg" style="background-color: {primaryColor};">
                    <svg class="w-7 h-7 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                  </div>
                  <h3 class="font-bold text-sm sm:text-base mb-1 sm:mb-2" style="color: {primaryColor};">Chef Chuyên Nghiệp</h3>
                  <p class="text-gray-600 text-xs sm:text-sm">Đội ngũ đầu bếp giàu kinh nghiệm</p>
                </div>
                <div class="text-center">
                  <div class="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center shadow-lg" style="background-color: {primaryColor};">
                    <svg class="w-7 h-7 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 class="font-bold text-sm sm:text-base mb-1 sm:mb-2" style="color: {primaryColor};">Nguyên Liệu Tươi Sống</h3>
                  <p class="text-gray-600 text-xs sm:text-sm">Nhập khẩu trực tiếp hàng ngày</p>
                </div>
                <div class="text-center">
                  <div class="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center shadow-lg" style="background-color: {primaryColor};">
                    <svg class="w-7 h-7 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  <h3 class="font-bold text-sm sm:text-base mb-1 sm:mb-2" style="color: {primaryColor};">Phục Vụ Tận Tâm</h3>
                  <p class="text-gray-600 text-xs sm:text-sm">Đội ngũ nhân viên chuyên nghiệp</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Footer -->
          <footer class="bg-gray-900 text-white py-6 sm:py-10">
            <div class="px-4 sm:px-6 max-w-7xl mx-auto">
              <div
                class="grid gap-6 sm:gap-8 mb-6 sm:mb-8"
                class:grid-cols-1={deviceView === 'mobile'}
                class:grid-cols-4={deviceView !== 'mobile'}
              >
                <div class:col-span-2={deviceView !== 'mobile'}>
                  <div class="flex items-center gap-2 mb-3">
                    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="8" fill={primaryColor}/>
                      <path d="M20 10L24 18H16L20 10Z" fill="white"/>
                      <circle cx="20" cy="25" r="3" fill="white"/>
                      <path d="M13 30H27" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <div>
                      <div class="text-lg sm:text-xl font-bold" style="color: {primaryColor};">La Cuisine</div>
                      <div class="text-[8px] text-gray-400 tracking-widest">FINE DINING</div>
                    </div>
                  </div>
                  <p class="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm">
                    Nhà hàng cao cấp mang đến trải nghiệm ẩm thực đẳng cấp quốc tế với không gian sang trọng.
                  </p>
                </div>
                <div>
                  <h4 class="font-semibold text-sm sm:text-base mb-2 sm:mb-3" style="color: {primaryColor};">Liên kết</h4>
                  <ul class="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <li><span class="text-gray-300 cursor-pointer hover:text-white transition-colors">Về chúng tôi</span></li>
                    <li><span class="text-gray-300 cursor-pointer hover:text-white transition-colors">Thực đơn</span></li>
                    <li><span class="text-gray-300 cursor-pointer hover:text-white transition-colors">Đặt bàn</span></li>
                    <li><span class="text-gray-300 cursor-pointer hover:text-white transition-colors">Liên hệ</span></li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-sm sm:text-base mb-2 sm:mb-3" style="color: {primaryColor};">Thông tin</h4>
                  <ul class="space-y-1 sm:space-y-2 text-gray-300 text-xs sm:text-sm">
                    <li>📞 028 1234 5678</li>
                    <li>📧 info@lacuisine.vn</li>
                    <li>📍 45 Đồng Khởi, Q.1, TP.HCM</li>
                    <li>🕐 11:00 - 23:00 hàng ngày</li>
                  </ul>
                </div>
              </div>
              <div class="border-t border-gray-700 pt-4 sm:pt-6 text-center">
                <p class="text-gray-400 text-[10px] sm:text-xs">&copy; 2024 La Cuisine Restaurant. All rights reserved.</p>
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

      <h2 class="text-xl sm:text-2xl font-bold text-white text-center mb-6 sm:mb-8">🎨 Tùy chỉnh màu sắc</h2>

      <div class="space-y-6 sm:space-y-8">
        <div class="bg-gray-800 p-4 sm:p-6 rounded-xl">
          <label for="primary-color" class="flex justify-between items-center mb-3 sm:mb-4 text-gray-200 text-sm sm:text-base font-semibold">
            <span>Màu chính (Primary)</span>
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
            placeholder="#D97941"
          />
        </div>

        <div class="bg-gray-800 p-4 sm:p-6 rounded-xl">
          <label for="secondary-color" class="flex justify-between items-center mb-3 sm:mb-4 text-gray-200 text-sm sm:text-base font-semibold">
            <span>Màu phụ (Secondary)</span>
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
            placeholder="#FFFFF0"
          />
        </div>
      </div>

      <Button
        on:click={resetColors}
        class="w-full mt-6 flex items-center justify-center">
        🔄 Reset về mặc định
      </Button>

      <div class="mt-6 sm:mt-8 bg-gray-800 p-4 sm:p-6 rounded-xl border-l-4" style="border-color: {primaryColor};">
        <h3 class="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">💡 Gợi ý màu:</h3>
        <ul class="text-gray-400 space-y-1.5 sm:space-y-2 text-xs sm:text-sm leading-relaxed">
          <li>• Burnt Orange (#D97941) - Ấm áp, sang trọng</li>
          <li>• Deep Red (#8B2635) - Quyến rũ, lịch lãm</li>
          <li>• Forest Green (#2C5F2D) - Tươi mới, tự nhiên</li>
          <li>• Navy Blue (#1E3A5F) - Thanh lịch, hiện đại</li>
        </ul>
      </div>

      <Button
        on:click={onNavigateContact}
        class="w-full mt-6 flex items-center justify-center">
        Dùng mẫu này
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