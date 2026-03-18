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

  export let primaryColor: string = '#1F4E79'; // modern real-estate blue
  export let secondaryColor: string = '#F7F5F2'; // warm neutral background

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
    selectedPrimary = '#1F4E79';
    selectedSecondary = '#F7F5F2';
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

  const properties = [
    {
      id: 1,
      name: 'Luxury Penthouse in Downtown',
      price: '$1,250,000',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      type: 'Penthouse',
      description: 'Skyline views with premium interior finishes'
    },
    {
      id: 2,
      name: 'Modern Family Villa',
      price: '$890,000',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80',
      type: 'Villa',
      description: 'Private garden, pool, and spacious living areas'
    },
    {
      id: 3,
      name: 'Minimalist City Apartment',
      price: '$420,000',
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80',
      type: 'Apartment',
      description: 'Ideal for young professionals in the city center'
    },
    {
      id: 4,
      name: 'Waterfront Residence',
      price: '$1,480,000',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      type: 'Residence',
      description: 'Exclusive waterfront home with private terrace'
    },
    {
      id: 5,
      name: 'Elegant Townhouse',
      price: '$670,000',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      type: 'Townhouse',
      description: 'Stylish design in a quiet, upscale neighborhood'
    },
    {
      id: 6,
      name: 'Smart Home Suburban Estate',
      price: '$980,000',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80',
      type: 'Estate',
      description: 'Smart automation, security, and open green space'
    }
  ];

  const onNavigateContact = () => goto('/contact');
</script>

<div class="flex flex-col lg:flex-row min-h-screen bg-slate-950">
  <div class="flex-1 py-20 lg:py-24 px-4 lg:px-8 overflow-y-auto bg-slate-900">

    <!-- Device Switcher -->
    <div class="mb-6 flex justify-center">
      <div class="inline-flex items-center gap-1 sm:gap-2 bg-slate-800 p-1.5 sm:p-2 rounded-lg">
        <button
          on:click={() => setDevice('mobile')}
          class="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition-all duration-200"
          style="background-color: {deviceView === 'mobile' ? primaryColor : 'transparent'}; color: {deviceView === 'mobile' ? 'white' : '#94a3b8'}"
        >
          <Smartphone size={16} class="sm:w-[18px] sm:h-[18px]" />
          <span class="text-xs sm:text-sm font-medium">Mobile</span>
        </button>

        <button
          on:click={() => setDevice('tablet')}
          class="hidden sm:flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition-all duration-200"
          style="background-color: {deviceView === 'tablet' ? primaryColor : 'transparent'}; color: {deviceView === 'tablet' ? 'white' : '#94a3b8'}"
        >
          <Tablet size={16} class="sm:w-[18px] sm:h-[18px]" />
          <span class="text-xs sm:text-sm font-medium">Tablet</span>
        </button>

        <button
          on:click={() => setDevice('desktop')}
          class="hidden xl:flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-md transition-all duration-200"
          style="background-color: {deviceView === 'desktop' ? primaryColor : 'transparent'}; color: {deviceView === 'desktop' ? 'white' : '#94a3b8'}"
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
                <div class="flex items-center gap-3">
                  <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="sm:w-10 sm:h-10">
                    <rect width="40" height="40" rx="8" fill={primaryColor}/>
                    <path d="M10 24L20 12L30 24" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14 24V30H26V24" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div>
                    <div class="text-lg sm:text-xl font-bold" style="color: {primaryColor};">UrbanNest Realty</div>
                    <div class="text-[8px] sm:text-[10px] text-gray-500 tracking-[0.25em] uppercase">Modern Living</div>
                  </div>
                </div>

                {#if deviceView === 'desktop'}
                  <nav class="hidden md:flex gap-4 lg:gap-8 items-center">
                    <span class="text-gray-700 text-xs lg:text-sm cursor-pointer font-medium hover:opacity-70 transition-opacity">Home</span>
                    <span class="text-gray-700 text-xs lg:text-sm cursor-pointer font-medium hover:opacity-70 transition-opacity">Properties</span>
                    <span class="text-gray-700 text-xs lg:text-sm cursor-pointer font-medium hover:opacity-70 transition-opacity">About</span>
                    <button
                      class="text-xs lg:text-sm px-5 py-2.5 rounded-md text-white font-semibold hover:opacity-90 transition-all shadow-md"
                      style="background-color: {primaryColor};"
                    >
                      Book a Viewing
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
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
                alt="Real Estate Background"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-r from-black/65 to-black/30"></div>
            </div>

            <div class="relative z-10 w-full px-4 sm:px-6">
              <div class="max-w-2xl">
                <h1
                  class="font-serif mb-2 sm:mb-3 text-white"
                  class:text-2xl={deviceView === 'mobile'}
                  class:text-4xl={deviceView === 'tablet'}
                  class:text-5xl={deviceView === 'desktop'}
                >
                  Find Your Future Home
                </h1>
                <p
                  class="mb-4 sm:mb-6 text-white/90"
                  class:text-xs={deviceView === 'mobile'}
                  class:text-sm={deviceView === 'tablet'}
                  class:text-base={deviceView === 'desktop'}
                >
                  Discover premium properties designed for modern lifestyles and long-term value.
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
                  Explore Listings
                </button>
              </div>
            </div>
          </section>

          <!-- Featured Properties -->
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
                  Featured Properties
                </h2>
                <p class="text-gray-600 text-xs sm:text-sm">Handpicked homes in prime locations</p>
              </div>

              <div
                class="grid gap-4 sm:gap-6"
                class:grid-cols-1={deviceView === 'mobile'}
                class:grid-cols-2={deviceView === 'tablet'}
                class:grid-cols-3={deviceView === 'desktop'}
              >
                {#each properties.slice(0, deviceView === 'mobile' ? 3 : 6) as property (property.id)}
                  <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100">
                    <div class="relative h-44 sm:h-52 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.name}
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div
                        class="absolute top-3 right-3 px-3 py-1 rounded-md text-white text-xs font-medium backdrop-blur-sm shadow-lg"
                        style="background-color: {primaryColor};"
                      >
                        {property.type}
                      </div>
                    </div>

                    <div class="p-4 sm:p-5">
                      <h3
                        class="font-semibold text-gray-800 mb-2 line-clamp-2"
                        class:text-sm={deviceView === 'mobile'}
                        class:text-base={deviceView !== 'mobile'}
                      >
                        {property.name}
                      </h3>

                      <p class="text-gray-500 text-[10px] sm:text-xs mb-3 line-clamp-1">
                        {property.description}
                      </p>

                      <div class="flex justify-between items-center">
                        <div>
                          <span
                            class="font-bold"
                            class:text-lg={deviceView === 'mobile'}
                            class:text-xl={deviceView !== 'mobile'}
                            style="color: {primaryColor};"
                          >
                            {property.price}
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
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </section>

          <!-- Why Choose Us -->
          <section
            class="py-8 sm:py-12"
            style="background: linear-gradient(135deg, {primaryColor}12 0%, {secondaryColor} 100%);"
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
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-10.5z"/>
                    </svg>
                  </div>
                  <h3 class="font-bold text-sm sm:text-base mb-1 sm:mb-2" style="color: {primaryColor};">Curated Listings</h3>
                  <p class="text-gray-600 text-xs sm:text-sm">Only quality properties with strong market value</p>
                </div>

                <div class="text-center">
                  <div class="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center shadow-lg" style="background-color: {primaryColor};">
                    <svg class="w-7 h-7 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>
                    </svg>
                  </div>
                  <h3 class="font-bold text-sm sm:text-base mb-1 sm:mb-2" style="color: {primaryColor};">Transparent Process</h3>
                  <p class="text-gray-600 text-xs sm:text-sm">Clear pricing, trusted advice, and full support</p>
                </div>

                <div class="text-center">
                  <div class="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center shadow-lg" style="background-color: {primaryColor};">
                    <svg class="w-7 h-7 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2"/>
                      <circle cx="12" cy="12" r="9" stroke-width="2"/>
                    </svg>
                  </div>
                  <h3 class="font-bold text-sm sm:text-base mb-1 sm:mb-2" style="color: {primaryColor};">Fast Response</h3>
                  <p class="text-gray-600 text-xs sm:text-sm">Quick consultation and viewing appointments</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Footer -->
          <footer class="bg-slate-900 text-white py-6 sm:py-10">
            <div class="px-4 sm:px-6 max-w-7xl mx-auto">
              <div
                class="grid gap-6 sm:gap-8 mb-6 sm:mb-8"
                class:grid-cols-1={deviceView === 'mobile'}
                class:grid-cols-4={deviceView !== 'mobile'}
              >
                <div class:col-span-2={deviceView !== 'mobile'}>
                  <div class="flex items-center gap-3 mb-3">
                    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="8" fill={primaryColor}/>
                      <path d="M10 24L20 12L30 24" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 24V30H26V24" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div>
                      <div class="text-lg sm:text-xl font-bold" style="color: {primaryColor};">UrbanNest Realty</div>
                      <div class="text-[8px] text-gray-400 tracking-[0.25em] uppercase">Modern Living</div>
                    </div>
                  </div>
                  <p class="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm">
                    We help clients discover refined spaces, smart investments, and homes built for the future.
                  </p>
                </div>

                <div>
                  <h4 class="font-semibold text-sm sm:text-base mb-2 sm:mb-3" style="color: {primaryColor};">Quick Links</h4>
                  <ul class="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <li><span class="text-gray-300 cursor-pointer hover:text-white transition-colors">About Us</span></li>
                    <li><span class="text-gray-300 cursor-pointer hover:text-white transition-colors">Listings</span></li>
                    <li><span class="text-gray-300 cursor-pointer hover:text-white transition-colors">Schedule a Tour</span></li>
                    <li><span class="text-gray-300 cursor-pointer hover:text-white transition-colors">Contact</span></li>
                  </ul>
                </div>

                <div>
                  <h4 class="font-semibold text-sm sm:text-base mb-2 sm:mb-3" style="color: {primaryColor};">Contact</h4>
                  <ul class="space-y-1 sm:space-y-2 text-gray-300 text-xs sm:text-sm">
                    <li>📞 +1 (555) 123-4567</li>
                    <li>📧 hello@urbannest.com</li>
                    <li>📍 128 Park Avenue, New York, NY</li>
                    <li>🕐 Mon - Sat, 9:00 AM - 7:00 PM</li>
                  </ul>
                </div>
              </div>

              <div class="border-t border-slate-700 pt-4 sm:pt-6 text-center">
                <p class="text-gray-400 text-[10px] sm:text-xs">&copy; 2026 UrbanNest Realty. All rights reserved.</p>
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
      class="relative h-full bg-slate-900 overflow-y-auto ml-auto max-w-md lg:max-w-none py-8 lg:py-24 px-4 sm:px-6 lg:px-8"
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
    background: #475569;
    border-radius: 3px;
  }
</style>