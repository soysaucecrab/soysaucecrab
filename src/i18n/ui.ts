export type Lang = 'en' | 'ko';
export const LANGS: Lang[] = ['en', 'ko'];
export const DEFAULT_LANG: Lang = 'en';

export type Page = 'home' | 'news' | 'publications' | 'projects';

/** URL for a given language + page. English at root, Korean under /ko/. */
export function pathFor(lang: Lang, page: Page): string {
  const seg: Record<Page, string> = { home: '', news: 'news/', publications: 'publications/', projects: 'projects/' };
  const base = lang === 'ko' ? '/ko/' : '/';
  return base + seg[page];
}

/** UI strings (site chrome + copy that does not live in content collections). */
export const ui = {
  en: {
    tagline: 'ML engineer · developer',
    role: 'ML Engineer & Developer',
    nameSecondary: '',
    heroDesc:
      'I build machine learning models and turn them into products people can actually use. Intelligent Software, Sungkyunkwan University.',
    seeAll: 'see all',
    newsSub: 'Newest first.',
    projSub: 'Active and shipped work.',
    pubSub: 'Peer-reviewed and preprint work.',
    pubEmptyTitle: 'No publications yet',
    pubEmptyBody: "Papers and preprints will be listed here once they're out.",
    pubEmptyLs: 'empty',
  },
  ko: {
    tagline: 'ML 엔지니어 · 개발자',
    role: 'ML Engineer & Developer',
    nameSecondary: '김진우',
    heroDesc:
      '머신러닝 모델을 만들고, 쓸 수 있는 제품으로 옮깁니다. 성균관대학교 지능형소프트웨어학과.',
    seeAll: '전체 보기',
    newsSub: '최신순.',
    projSub: '진행 중이고 배포된 작업.',
    pubSub: '학회 논문과 프리프린트.',
    pubEmptyTitle: '아직 등록된 논문이 없습니다',
    pubEmptyBody: '논문과 프리프린트가 공개되면 이곳에 정리됩니다.',
    pubEmptyLs: '(비어 있음)',
  },
} as const;

/** Tag token → localized label. */
export const tagLabel: Record<Lang, Record<string, string>> = {
  en: { Research: 'Research', ML: 'ML', Systems: 'Systems', Tooling: 'Tooling' },
  ko: { Research: '연구', ML: 'ML', Systems: '시스템', Tooling: '도구' },
};

export function tags(lang: Lang, tokens: string[]): string {
  return tokens.map((t) => tagLabel[lang][t] ?? t).join(' · ');
}

export function t(lang: Lang, key: keyof typeof ui['en']): string {
  return ui[lang][key];
}
