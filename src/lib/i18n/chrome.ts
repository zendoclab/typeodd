import type { Locale } from './index';

export const chromeCopy: Record<
  Locale,
  {
    on: string;
    off: string;
    creator: string;
    works: string;
    cpm: string;
    wpm: string;
    seconds: string;
  }
> = {
  en: {
    on: 'On',
    off: 'Off',
    creator: 'Made by zendoc',
    works: 'More by zendoc',
    cpm: 'CPM',
    wpm: 'WPM',
    seconds: 's'
  },
  ko: {
    on: '켜짐',
    off: '꺼짐',
    creator: '만든 사람 zendoc',
    works: 'zendoc의 다른 작품',
    cpm: '타/분',
    wpm: '단어/분',
    seconds: '초'
  },
  ja: {
    on: 'オン',
    off: 'オフ',
    creator: '制作：zendoc',
    works: 'zendocの他の作品',
    cpm: '文字/分',
    wpm: '語/分',
    seconds: '秒'
  },
  zh: {
    on: '开',
    off: '关',
    creator: '由 zendoc 制作',
    works: 'zendoc 的其他作品',
    cpm: '字/分',
    wpm: '词/分',
    seconds: '秒'
  },
  es: {
    on: 'Sí',
    off: 'No',
    creator: 'Creado por zendoc',
    works: 'Más de zendoc',
    cpm: 'car./min',
    wpm: 'pal./min',
    seconds: 's'
  },
  hi: {
    on: 'चालू',
    off: 'बंद',
    creator: 'निर्माता: zendoc',
    works: 'zendoc की अन्य रचनाएँ',
    cpm: 'अक्षर/मिनट',
    wpm: 'शब्द/मिनट',
    seconds: 'सेकंड'
  },
  ar: {
    on: 'يعمل',
    off: 'متوقف',
    creator: 'صنعها zendoc',
    works: 'أعمال أخرى من zendoc',
    cpm: 'حرف/د',
    wpm: 'كلمة/د',
    seconds: 'ث'
  },
  fr: {
    on: 'Oui',
    off: 'Non',
    creator: 'Créé par zendoc',
    works: 'Autres projets de zendoc',
    cpm: 'car./min',
    wpm: 'mots/min',
    seconds: 's'
  },
  pt: {
    on: 'Ligado',
    off: 'Desligado',
    creator: 'Criado por zendoc',
    works: 'Mais de zendoc',
    cpm: 'car./min',
    wpm: 'pal./min',
    seconds: 's'
  },
  bn: {
    on: 'চালু',
    off: 'বন্ধ',
    creator: 'তৈরি করেছেন zendoc',
    works: 'zendoc-এর অন্য কাজ',
    cpm: 'অক্ষর/মিনিট',
    wpm: 'শব্দ/মিনিট',
    seconds: 'সেকেন্ড'
  },
  ru: {
    on: 'Вкл.',
    off: 'Выкл.',
    creator: 'Создано zendoc',
    works: 'Другие проекты zendoc',
    cpm: 'зн./мин',
    wpm: 'сл./мин',
    seconds: 'с'
  },
  de: {
    on: 'An',
    off: 'Aus',
    creator: 'Von zendoc',
    works: 'Mehr von zendoc',
    cpm: 'Z./Min.',
    wpm: 'W./Min.',
    seconds: 's'
  },
  id: {
    on: 'Nyala',
    off: 'Mati',
    creator: 'Dibuat oleh zendoc',
    works: 'Karya lain zendoc',
    cpm: 'kar./mnt',
    wpm: 'kata/mnt',
    seconds: 'd'
  },
  ur: {
    on: 'چالو',
    off: 'بند',
    creator: 'تخلیق: zendoc',
    works: 'zendoc کے دوسرے کام',
    cpm: 'حرف/منٹ',
    wpm: 'لفظ/منٹ',
    seconds: 'سیکنڈ'
  }
};
