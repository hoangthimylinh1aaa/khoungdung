import { writable } from 'svelte/store';
import type { Locale } from '$lib/i18n';
import { translations } from '$lib/i18n';

function createLocaleStore() {
  const { subscribe, set, update } = writable<Locale>('vi');

  return {
    subscribe,
    set,
    update,
    toggle: () =>
      update((locale) => (locale === 'vi' ? 'en' : 'vi')),
    t: (locale: Locale, key: string): string => {
      const keys = key.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any = translations[locale];
      for (const k of keys) {
        value = value?.[k];
      }
      return typeof value === 'string' ? value : key;
    },
  };
}

export const localeStore = createLocaleStore();