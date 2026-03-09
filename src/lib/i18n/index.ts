import { vi } from './vi';
import { en } from './en';

export const translations = { vi, en };
export type Locale = 'vi' | 'en';
export type Translations = typeof vi;

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[locale];
  for (const k of keys) {
    value = value?.[k];
  }
  return value ?? key;
}