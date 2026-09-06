import { isLocale } from '$lib/i18n';
export const match = (param: string) => isLocale(param);
