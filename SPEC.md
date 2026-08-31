# SPEC.md — zinu.kim v1

개인 사이트 v1 명세. CLAUDE.md의 규칙을 전제로 하며, 여기에는 확정된
결정과 구현 범위만 적는다.

## 확정된 결정 (2026-08-31)

- **CV 링크**: hero에 CV PDF 링크를 넣는다. 파일은 `public/cv.pdf`.
  → 파일은 소유자가 추후 제공. 빌드 시 파일 존재 여부를 확인해 없으면
  링크를 렌더링하지 않는다(빈 링크·placeholder 금지).
- **/blog**: v1 범위 제외. 단, 추후 추가 가능성 있음 — 내비게이션·URL
  구조·콘텐츠 디렉토리는 나중에 `blog` 컬렉션을 추가해도 깨지지 않게
  설계한다(전용 코드는 v1에 넣지 않음).
- **논문 썸네일**: 없음. 텍스트 카드만. 스키마의 `thumb`는 optional로
  유지하되 v1에서는 렌더링 경로를 만들지 않는다.
- **콘텐츠 데이터**: 구조 먼저. 논문·프로젝트·뉴스 실데이터는 추후 제공.
  그 전까지 가짜 데이터를 넣지 않으며, 각 섹션은 빈 상태를 정직하게
  처리한다(아래 "빈 상태" 참고).

## 페이지 구성

### `/` (홈)
1. **Hero** — 이름(디스플레이 서체 또는 큰 옵티컬 사이즈), 한 줄 소개,
   소속(SKKU Intelligent Software), 연락처 `me@zinu.kim`, CV 링크(파일
   존재 시).
2. **News** — 최신순, 최대 5개. 날짜 + 한 줄.
3. **Publications** — 최신 3개 + "전체 보기" 링크(`/publications`).
4. **Projects** — 4개(active 우선) + "전체 보기" 링크(`/projects`).
5. **Contact** — 이메일, GitHub 등 외부 링크.

### `/publications`
- 전체 목록, 역시간순. venue 옆에 type 라벨(conference/workshop/
  preprint/poster). 저자 문자열에서 소유자 이름만 볼드. 비1저자 항목은
  `contribution` 한 줄 표시. 링크: paper/code/demo 있는 것만.
- **상태 표기**: accepted/under review 등은 소유자가 확인해준 것만
  렌더링. 확인 안 된 상태는 표기하지 않는다.

### `/projects`
- active / shipped / archived 순 그룹핑. archived는 회색 처리 + 정직한
  노트. 논문 있는 프로젝트는 paper 링크를 같은 카드에 함께 표시.

## 콘텐츠 스키마 (Astro Content Collections, zod)

```
news:         { date: Date, title: string }            # 본문은 md body
publications: { title, venue, authors: string,
                date: Date,
                type: 'conference'|'workshop'|'preprint'|'poster',
                links: { paper?, code?, demo? },
                thumb?: string, contribution?: string }
projects:     { title, blurb: string,
                status: 'active'|'shipped'|'archived',
                tags: string[],
                links: { repo?, demo?, paper? },
                date: Date }
```

## 빈 상태 (실데이터 도착 전)

- 콘텐츠가 0개인 섹션은 홈에서 섹션 자체를 렌더링하지 않는다.
  (CLAUDE.md: 빈/부풀린 섹션은 없는 것보다 나쁨)
- `/publications`, `/projects`는 페이지는 존재하되 "준비 중" 한 줄만.
- 개발 확인용 샘플 데이터가 필요하면 명백한 더미(`_sample-` 접두사,
  빌드에서 제외)로만 두고 배포 산출물에는 포함하지 않는다.

## 디자인

- 토큰: `src/styles/tokens.css`에 배경/전경/보조 텍스트/보더/악센트
  4–6개. 악센트 1색. 라이트 + 다크(`prefers-color-scheme` 기본, 수동
  토글은 v1 제외 — localStorage 금지 제약과 충돌하므로).
- 서체: Pretendard(로컬 번들 또는 정적 self-host). 이름만 별도 처리.
- 레이아웃: 단일 컬럼 max-width ~68ch, 카드 세로 스택.
- 모션: 오케스트레이션 1회(첫 로드 시 hero 등장) 외 없음.
  `prefers-reduced-motion` 존중.

## 기술

- Astro 최신 안정판, `output: 'static'`. 통합/플러그인 최소화.
- 배포: Cloudflare Pages, GitHub 연동 자동 배포(리포 연결은 소유자가
  수행).
- 외부 링크 전부 `rel="noopener noreferrer"`, 내부 링크 상대 경로.
- 시맨틱 헤딩, 가시적 포커스, 360px 대응, alt 텍스트.

## v1 작업 순서

1. Astro 스캐폴드 + 토큰/글로벌 스타일
2. Content Collections 스키마
3. 홈(빈 상태 포함) → `/publications` → `/projects`
4. 실데이터 수신 후 콘텐츠 파일 작성 (별도 태스크)

## 소유자에게 받아야 할 것

- [ ] CV PDF 파일
- [ ] 이름 영문 표기(저자 볼드 매칭 기준) 및 hero 소개 문구
- [ ] 논문 목록(저자 순서 그대로, 상태 확인 포함)
- [ ] 프로젝트 목록, 뉴스 항목
- [ ] GitHub 등 Contact에 넣을 외부 링크
