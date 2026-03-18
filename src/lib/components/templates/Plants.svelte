<script lang="ts">
  import { Monitor, Smartphone, Tablet, Palette, X } from '@lucide/svelte';
  import { onMount, onDestroy } from 'svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { goto } from '$app/navigation';
  import { localeStore } from '$lib/stores/locale';
  import { translations } from '$lib/i18n';
  import type { Locale } from '$lib/i18n';

  let locale: Locale = 'vi';
  const unsubscribe = localeStore.subscribe((v) => (locale = v));
  onDestroy(unsubscribe);

  $: t = translations[locale].templates.colorCustomizer;

  export let primaryColor: string = '#4F7A4D';
  export let secondaryColor: string = '#F3F0E8';

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

  const herbs = [
    {
      id: 1,
      name: 'Sâm Ngọc Linh',
      price: 'Liên hệ',
      image:
        'https://images.unsplash.com/photo-1515589665972-8bbf50d4b6f7?auto=format&fit=crop&w=1000&q=80',
      duration: 'Dược liệu quý',
      category: 'Bồi bổ'
    },
    {
      id: 2,
      name: 'Đông Trùng Hạ Thảo',
      price: 'Liên hệ',
      image:
        'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80',
      duration: 'Giá trị cao',
      category: 'Tăng cường'
    },
    {
      id: 3,
      name: 'Nấm Linh Chi Đỏ',
      price: 'Liên hệ',
      image:
        'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1000&q=80',
      duration: 'Thảo dược thiên nhiên',
      category: 'Thanh lọc'
    },
    {
      id: 4,
      name: 'Ba Kích Tím',
      price: 'Liên hệ',
      image:
        'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1000&q=80',
      duration: 'Dược tính mạnh',
      category: 'Sinh lực'
    },
    {
      id: 5,
      name: 'Atiso Đà Lạt',
      price: 'Liên hệ',
      image:
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1000&q=80',
      duration: 'Thảo mộc phổ biến',
      category: 'Giải độc'
    },
    {
      id: 6,
      name: 'Hà Thủ Ô Đỏ',
      price: 'Liên hệ',
      image:
        'https://images.unsplash.com/photo-1457296898342-cdd24585d095?auto=format&fit=crop&w=1000&q=80',
      duration: 'Dưỡng sinh',
      category: 'Bổ huyết'
    }
  ];

  function setDevice(device: 'mobile' | 'tablet' | 'desktop') {
    deviceView = device;
  }

  $: primaryColor = selectedPrimary;
  $: secondaryColor = selectedSecondary;

  function resetColors() {
    selectedPrimary = '#4F7A4D';
    selectedSecondary = '#F3F0E8';
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

  const onNavigateContact = () => goto('/contact');

  onMount(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  });
</script>

<div class="flex flex-col lg:flex-row min-h-screen bg-stone-950">
  <div class="flex-1 py-20 lg:py-24 px-4 lg:px-8 overflow-y-auto bg-stone-900">
    <!-- Device Switcher -->
    <div class="mb-6 flex justify-center">
      <div class="inline-flex items-center gap-1 sm:gap-2 bg-stone-800 p-1.5 sm:p-2 rounded-lg">
        <button
          on:click={() => setDevice('mobile')}
          class="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition-all duration-200"
          style="background-color: {deviceView === 'mobile' ? primaryColor : 'transparent'}; color: {deviceView === 'mobile' ? 'white' : '#a8a29e'}"
        >
          <Smartphone size={16} class="sm:w-[18px] sm:h-[18px]" />
          <span class="text-xs sm:text-sm font-medium">Mobile</span>
        </button>

        <button
          on:click={() => setDevice('tablet')}
          class="hidden sm:flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition-all duration-200"
          style="background-color: {deviceView === 'tablet' ? primaryColor : 'transparent'}; color: {deviceView === 'tablet' ? 'white' : '#a8a29e'}"
        >
          <Tablet size={16} class="sm:w-[18px] sm:h-[18px]" />
          <span class="text-xs sm:text-sm font-medium">Tablet</span>
        </button>

        <button
          on:click={() => setDevice('desktop')}
          class="hidden xl:flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition-all duration-200"
          style="background-color: {deviceView === 'desktop' ? primaryColor : 'transparent'}; color: {deviceView === 'desktop' ? 'white' : '#a8a29e'}"
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
        <div class="min-h-screen overflow-x-hidden relative" style="background-color: {secondaryColor};">
          <!-- Header -->
          <header class="backdrop-blur-sm bg-white/85 shadow-sm sticky top-0 z-10">
            <div class="px-4 sm:px-6">
              <div class="flex justify-between items-center py-3 sm:py-4">
                <div class="flex items-center gap-2">
                  <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="sm:w-9 sm:h-9">
                    <circle cx="20" cy="20" r="18" fill={primaryColor} opacity="0.15" />
                    <path d="M20 8C14 12 12 18 14 24C15.5 28 19 31 20 32C21 31 24.5 28 26 24C28 18 26 12 20 8Z" fill={primaryColor} />
                    <path d="M20 13V26" stroke="white" stroke-width="2" stroke-linecap="round" />
                    <path d="M20 18C18 16 16 15 14.5 14.5" stroke="white" stroke-width="1.8" stroke-linecap="round" />
                    <path d="M20 21C22 19 24 18 25.5 17.5" stroke="white" stroke-width="1.8" stroke-linecap="round" />
                  </svg>
                  <div>
                    <div class="text-lg sm:text-xl font-bold" style="color: {primaryColor};">Dược Mộc Việt</div>
                    <div class="text-[8px] sm:text-[10px] text-gray-500 tracking-wide">CÂY THUỐC QUÝ TỰ NHIÊN</div>
                  </div>
                </div>

                {#if deviceView === 'desktop'}
                  <nav class="flex gap-4 lg:gap-8 items-center">
                    <span class="text-gray-700 text-xs lg:text-sm cursor-pointer font-medium hover:opacity-70 transition-opacity">Trang chủ</span>
                    <span class="text-gray-700 text-xs lg:text-sm cursor-pointer font-medium hover:opacity-70 transition-opacity">Dược liệu</span>
                    <span class="text-gray-700 text-xs lg:text-sm cursor-pointer font-medium hover:opacity-70 transition-opacity">Kiến thức</span>
                    <button
                      class="text-xs lg:text-sm px-4 py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
                      style="background-color: {primaryColor};"
                    >
                      Tìm hiểu thêm
                    </button>
                  </nav>
                {/if}
              </div>
            </div>
          </header>

          <!-- Hero Banner -->
          <section
            class="relative flex items-center py-5 overflow-hidden"
            class:static={deviceView === 'mobile'}
            class:h-[26rem]={deviceView === 'tablet'}
            class:h-[34rem]={deviceView === 'desktop'}

          >
            <div class="absolute inset-0">
              <img
                src="https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Cây thuốc quý"
                class="w-full h-full object-cover opacity-25"
              />
              <div
                class="absolute inset-0"
                style="background:
                  radial-gradient(circle at top left, {primaryColor}35 0%, transparent 30%),
                  radial-gradient(circle at bottom right, {primaryColor}20 0%, transparent 25%),
                  linear-gradient(135deg, {secondaryColor}F2 0%, {secondaryColor}CC 100%);"
              ></div>
            </div>

            <div
              class="absolute top-10 left-6 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-3xl opacity-30"
              style="background-color: {primaryColor};"
            ></div>

            <div
              class="absolute bottom-8 right-6 sm:right-16 w-32 h-32 sm:w-44 sm:h-44 rounded-full blur-3xl opacity-20"
              style="background-color: {primaryColor};"
            ></div>

            <div class="absolute inset-0 pointer-events-none opacity-10">
              <div
                class="absolute inset-0"
                style="background-image:
                  radial-gradient(circle, {primaryColor} 1px, transparent 1px);
                  background-size: 22px 22px;"
              ></div>
            </div>

            <div class="relative z-10 w-full px-4 sm:px-6">
              <div
                class="max-w-5xl mx-auto grid gap-8 items-center"
                class:grid-cols-1={deviceView !== 'desktop'}
                class:grid-cols-2={deviceView === 'desktop'}
              >
                <div class="text-center lg:text-left">
                  <div
                    class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm mb-4 border"
                    style="background-color: {primaryColor}12; color: {primaryColor}; border-color: {primaryColor}30;"
                  >
                    <span class="w-2 h-2 rounded-full" style="background-color: {primaryColor};"></span>
                    Tinh hoa dược liệu Việt Nam
                  </div>

                  <h1
                    class="font-semibold leading-tight mb-3 sm:mb-4"
                    class:text-3xl={deviceView === 'mobile'}
                    class:text-4xl={deviceView === 'tablet'}
                    class:text-6xl={deviceView === 'desktop'}
                    style="color: {primaryColor};"
                  >
                    Chạm vào vẻ đẹp
                    <span class="block text-gray-900">từ thảo mộc tự nhiên</span>
                  </h1>

                  <p
                    class="mb-5 sm:mb-7 text-gray-700 leading-relaxed"
                    class:text-sm={deviceView === 'mobile'}
                    class:text-base={deviceView !== 'mobile'}
                  >
                    Khám phá những cây thuốc quý nổi bật, giá trị truyền thống và ứng dụng hiện đại
                    trong hành trình chăm sóc sức khỏe một cách tự nhiên, an lành và bền vững.
                  </p>

                  <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <button
                      class="font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 px-6 py-3 text-white"
                      style="background-color: {primaryColor};"
                    >
                      Khám phá dược liệu
                    </button>

                    <button
                      class="font-medium rounded-full transition-all duration-300 px-6 py-3 border"
                      style="border-color: {primaryColor}40; color: {primaryColor}; background-color: rgba(255,255,255,0.55);"
                    >
                      Xem bộ sưu tập
                    </button>
                  </div>
                </div>

                {#if deviceView === 'desktop'}
                  <div>
                    <div class="relative max-w-md ml-auto">
                      <div
                        class="absolute -top-6 -left-6 w-24 h-24 rounded-3xl rotate-12 opacity-20"
                        style="background-color: {primaryColor};"
                      ></div>

                      <div class="relative bg-white/70 backdrop-blur-md rounded-[2rem] shadow-2xl border border-white/60 p-4">
                        <img
                          src="https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt="Herbal collection"
                          class="w-full h-[26rem] object-cover rounded-[1.5rem]"
                        />

                        <div class="absolute left-8 right-8 bottom-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                          <div class="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">Bộ sưu tập nổi bật</div>
                          <div class="text-lg font-semibold text-gray-900">Dược liệu quý chọn lọc</div>
                          <div class="text-sm text-gray-600 mt-1">Tự nhiên · Tinh gọn · Hiện đại</div>
                        </div>
                      </div>
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          </section>

          <!-- Quick Stats -->
          <section class="relative -mt-6 sm:mt-8 z-10 px-4 sm:px-6">
            <div class="max-w-6xl mx-auto">
              <div
                class="grid gap-3 sm:gap-4"
                class:grid-cols-2={deviceView !== 'desktop'}
                class:grid-cols-4={deviceView === 'desktop'}
              >
                <div class="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-lg border border-white/70">
                  <div class="text-2xl sm:text-3xl font-bold" style="color: {primaryColor};">120+</div>
                  <div class="text-xs sm:text-sm text-gray-600 mt-1">Loại dược liệu được giới thiệu</div>
                </div>

                <div class="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-lg border border-white/70">
                  <div class="text-2xl sm:text-3xl font-bold" style="color: {primaryColor};">30+</div>
                  <div class="text-xs sm:text-sm text-gray-600 mt-1">Cây thuốc quý nổi bật</div>
                </div>

                <div class="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-lg border border-white/70">
                  <div class="text-2xl sm:text-3xl font-bold" style="color: {primaryColor};">100%</div>
                  <div class="text-xs sm:text-sm text-gray-600 mt-1">Định hướng nội dung tự nhiên</div>
                </div>

                <div class="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-lg border border-white/70">
                  <div class="text-2xl sm:text-3xl font-bold" style="color: {primaryColor};">24/7</div>
                  <div class="text-xs sm:text-sm text-gray-600 mt-1">Truy cập kiến thức mọi lúc</div>
                </div>
              </div>
            </div>
          </section>

          <!-- Herbs Section -->
          <section
            class:py-8={deviceView === 'mobile'}
            class:py-12={deviceView === 'tablet'}
            class:py-16={deviceView === 'desktop'}
          >
            <div class="px-4 sm:px-6 max-w-7xl mx-auto">
              <div class="text-center mb-8 sm:mb-12">
                <div
                  class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm mb-4"
                  style="background-color: {primaryColor}12; color: {primaryColor};"
                >
                  Bộ sưu tập nổi bật
                </div>

                <h2
                  class="font-semibold mb-3"
                  class:text-2xl={deviceView === 'mobile'}
                  class:text-3xl={deviceView === 'tablet'}
                  class:text-4xl={deviceView === 'desktop'}
                  style="color: {primaryColor};"
                >
                  Những dược liệu mang giá trị bền vững
                </h2>

                <p class="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  Từ những loại thảo mộc quen thuộc đến các cây thuốc quý hiếm, mỗi dược liệu đều mang trong mình
                  câu chuyện riêng về sức khỏe, truyền thống và sự gắn kết với thiên nhiên.
                </p>
              </div>

              <div
                class="grid gap-4 sm:gap-6"
                class:grid-cols-1={deviceView === 'mobile'}
                class:grid-cols-2={deviceView === 'tablet'}
                class:grid-cols-3={deviceView === 'desktop'}
              >
                {#each herbs.slice(0, deviceView === 'mobile' ? 3 : 6) as herb (herb.id)}
                  <div class="bg-white/90 backdrop-blur-sm rounded-[1.5rem] shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-white/70">
                    <div class="relative h-48 sm:h-56 overflow-hidden">
                      <img
                        src={herb.image}
                        alt={herb.name}
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                      <div
                        class="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-medium backdrop-blur-md shadow"
                        style="background-color: {primaryColor}E6;"
                      >
                        {herb.category}
                      </div>

                      <div class="absolute bottom-3 left-3 flex gap-2">
                        <span class="px-2.5 py-1 rounded-full bg-white/85 text-[11px] text-gray-700 backdrop-blur-sm">
                          Thiên nhiên
                        </span>
                        <span class="px-2.5 py-1 rounded-full bg-white/85 text-[11px] text-gray-700 backdrop-blur-sm">
                          Dược liệu
                        </span>
                      </div>
                    </div>

                    <div class="p-4 sm:p-5">
                      <div class="flex items-start justify-between gap-3 mb-2">
                        <h3
                          class="font-semibold text-gray-900 line-clamp-2"
                          class:text-sm={deviceView === 'mobile'}
                          class:text-lg={deviceView !== 'mobile'}
                        >
                          {herb.name}
                        </h3>

                        <div
                          class="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium"
                          style="background-color: {primaryColor}12; color: {primaryColor};"
                        >
                          Nổi bật
                        </div>
                      </div>

                      <p class="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                        Dược liệu được nhiều người biết đến với giá trị truyền thống và tiềm năng ứng dụng trong chăm sóc sức khỏe tự nhiên.
                      </p>

                      <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6c-2 2-4 4.5-4 7a4 4 0 008 0c0-2.5-2-5-4-7z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 19h8"/>
                        </svg>
                        <span>{herb.duration}</span>
                      </div>

                      <div class="flex justify-between items-center">
                        <div>
                          <div class="text-[11px] text-gray-500 mb-0.5">Thông tin thêm</div>
                          <span class="font-semibold text-base sm:text-lg" style="color: {primaryColor};">
                            {herb.price}
                          </span>
                        </div>

                        <button
                          class="rounded-xl font-medium transition-all duration-300 px-4 py-2 text-white hover:opacity-90"
                          style="background-color: {primaryColor};"
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </section>

          <!-- Highlights Section -->
          <section class="py-10 sm:py-14 px-4 sm:px-6">
            <div class="max-w-6xl mx-auto">
              <div
                class="grid gap-4 sm:gap-6"
                class:grid-cols-1={deviceView === 'mobile'}
                class:grid-cols-3={deviceView !== 'mobile'}
              >
                <div class="bg-white/80 backdrop-blur-sm rounded-[1.75rem] p-6 shadow-md border border-white/70">
                  <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style="background-color: {primaryColor}15;">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: {primaryColor};">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold text-lg mb-2" style="color: {primaryColor};">Tinh gọn và dễ tiếp cận</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    Nội dung được trình bày ngắn gọn, hiện đại, giúp người xem dễ dàng tiếp cận thông tin về cây thuốc quý.
                  </p>
                </div>

                <div class="bg-white/80 backdrop-blur-sm rounded-[1.75rem] p-6 shadow-md border border-white/70">
                  <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style="background-color: {primaryColor}15;">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: {primaryColor};">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4h9"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 9h16"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15h16"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold text-lg mb-2" style="color: {primaryColor};">Gần gũi nhưng vẫn cao cấp</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    Kết hợp cảm hứng thiên nhiên với layout hiện đại, tạo nên trải nghiệm xem nhẹ nhàng và tươi mới.
                  </p>
                </div>

                <div class="bg-white/80 backdrop-blur-sm rounded-[1.75rem] p-6 shadow-md border border-white/70">
                  <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style="background-color: {primaryColor}15;">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: {primaryColor};">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v8"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h8"/>
                      <circle cx="12" cy="12" r="9" stroke-width="2" />
                    </svg>
                  </div>
                  <h3 class="font-semibold text-lg mb-2" style="color: {primaryColor};">Truyền cảm hứng khám phá</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">
                    Không chỉ giới thiệu dược liệu, template còn gợi mở cảm giác khám phá thế giới thảo mộc Việt Nam.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Story Section -->
          <section class="px-4 sm:px-6 pb-10 sm:pb-16">
            <div class="max-w-6xl mx-auto">
              <div
                class="relative overflow-hidden rounded-[2rem] p-6 sm:p-10"
                style="background: linear-gradient(135deg, {primaryColor}14 0%, rgba(255,255,255,0.75) 100%);"
              >
                <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20" style="background-color: {primaryColor};"></div>

                <div
                  class="relative grid gap-8 items-center"
                  style:grid-template-columns={deviceView === 'desktop' ? '1.2fr 0.8fr' : '1fr'}
                >
                  <div>
                    <div class="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">Câu chuyện dược liệu</div>
                    <h3 class="text-2xl sm:text-3xl font-semibold mb-4" style="color: {primaryColor};">
                      Mỗi cây thuốc là một lát cắt của tri thức dân gian
                    </h3>
                    <p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-5">
                      Từ núi rừng đến đồng bằng, nhiều cây thuốc quý đã gắn bó với đời sống người Việt qua nhiều thế hệ.
                      Template này được làm mới theo hướng hiện đại để nội dung về dược liệu trở nên gần gũi, trực quan và truyền cảm hứng hơn.
                    </p>

                    <button
                      class="rounded-full px-6 py-3 text-white font-medium shadow-md hover:opacity-90 transition-opacity"
                      style="background-color: {primaryColor};"
                    >
                      Tìm hiểu hành trình dược liệu
                    </button>
                  </div>

                  <div class="bg-white/80 backdrop-blur-sm rounded-[1.5rem] p-5 sm:p-6 shadow-lg border border-white/70">
                    <div class="text-sm text-gray-500 mb-2">Điểm nhấn của template</div>
                    <ul class="space-y-3 text-sm text-gray-700">
                      <li class="flex items-start gap-2">
                        <span class="mt-1 w-2 h-2 rounded-full" style="background-color: {primaryColor};"></span>
                        Layout mềm mại, hiện đại và sáng hơn
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="mt-1 w-2 h-2 rounded-full" style="background-color: {primaryColor};"></span>
                        Họa tiết blur, pattern chấm và shape organic
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="mt-1 w-2 h-2 rounded-full" style="background-color: {primaryColor};"></span>
                        Nội dung tinh gọn, dễ đọc, hợp landing page
                      </li>
                    </ul>
                  </div>
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
                      <circle cx="20" cy="20" r="18" fill={primaryColor} opacity="0.15" />
                      <path d="M20 8C14 12 12 18 14 24C15.5 28 19 31 20 32C21 31 24.5 28 26 24C28 18 26 12 20 8Z" fill={primaryColor} />
                      <path d="M20 13V26" stroke="white" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    <div>
                      <div class="text-base sm:text-lg font-bold" style="color: {primaryColor};">Dược Mộc Việt</div>
                      <div class="text-[8px] text-gray-500 tracking-wide">CÂY THUỐC QUÝ TỰ NHIÊN</div>
                    </div>
                  </div>
                  <p class="text-gray-600 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                    Không gian giới thiệu dược liệu theo phong cách hiện đại, giúp nội dung về cây thuốc quý trở nên trực quan, tươi mới và gần gũi hơn với người xem.
                  </p>
                </div>

                <div>
                  <h4 class="font-medium text-sm sm:text-base mb-2 sm:mb-3" style="color: {primaryColor};">Liên kết</h4>
                  <ul class="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <li><span class="text-gray-600 cursor-pointer hover:opacity-70 transition-opacity font-light">Giới thiệu</span></li>
                    <li><span class="text-gray-600 cursor-pointer hover:opacity-70 transition-opacity font-light">Dược liệu</span></li>
                    <li><span class="text-gray-600 cursor-pointer hover:opacity-70 transition-opacity font-light">Kiến thức</span></li>
                    <li><span class="text-gray-600 cursor-pointer hover:opacity-70 transition-opacity font-light">Liên hệ</span></li>
                  </ul>
                </div>

                <div>
                  <h4 class="font-medium text-sm sm:text-base mb-2 sm:mb-3" style="color: {primaryColor};">Thông tin</h4>
                  <ul class="space-y-1 sm:space-y-2 text-gray-600 text-xs sm:text-sm font-light">
                    <li>📞 1900 6868</li>
                    <li>📧 info@duocmocviet.vn</li>
                    <li>📍 68 Đường Dược Liệu, TP.HCM</li>
                    <li>🕐 8:00 - 18:00 hằng ngày</li>
                  </ul>
                </div>
              </div>

              <div class="border-t border-gray-200 pt-4 sm:pt-6 text-center">
                <p class="text-gray-500 text-[10px] sm:text-xs font-light">&copy; 2024 Dược Mộc Việt. All rights reserved.</p>
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
      class="relative h-full bg-stone-900 overflow-y-auto ml-auto max-w-md lg:max-w-none py-8 lg:py-24 px-4 sm:px-6 lg:px-8"
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
        <div class="bg-stone-800 p-4 sm:p-6 rounded-xl">
          <label for="primary-color" class="flex justify-between items-center mb-3 sm:mb-4 text-gray-200 text-sm sm:text-base font-semibold">
            <span>{t.primary}</span>
            <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 border-stone-700" style="background-color: {selectedPrimary};"></span>
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
            class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-stone-950 border border-stone-700 rounded-lg text-white text-sm sm:text-base font-mono"
            placeholder="#4F7A4D"
          />
        </div>

        <div class="bg-stone-800 p-4 sm:p-6 rounded-xl">
          <label for="secondary-color" class="flex justify-between items-center mb-3 sm:mb-4 text-gray-200 text-sm sm:text-base font-semibold">
            <span>{t.secondary}</span>
            <span class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 border-stone-700" style="background-color: {selectedSecondary};"></span>
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
            class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-stone-950 border border-stone-700 rounded-lg text-white text-sm sm:text-base font-mono"
            placeholder="#F3F0E8"
          />
        </div>
      </div>

      <Button on:click={resetColors} class="w-full mt-6 flex items-center justify-center">
        🔄 {t.reset}
      </Button>

      <div class="mt-6 sm:mt-8 bg-stone-800 p-4 sm:p-6 rounded-xl border-l-4" style="border-color: {primaryColor};">
        <h3 class="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">💡 {t.instructions}:</h3>
        <ul class="text-gray-400 space-y-1.5 sm:space-y-2 text-xs sm:text-sm leading-relaxed">
          <li>• {t.primary_help}</li>
          <li>• {t.secondary_help}</li>
          <li>• {t.live_preview}</li>
        </ul>
      </div>

      <Button on:click={onNavigateContact} class="w-full mt-6 flex items-center justify-center">
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
    background: #57534e;
    border-radius: 3px;
  }
</style>