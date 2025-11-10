# 🔗 Preview Links

* 🌐 **App**: [Відкрити додаток](https://movie-db-gamma-olive.vercel.app/)
* 📘 **Storybook**: [Переглянути Storybook](https://ezio17.github.io/movie-db/?path=/docs/pagination-components-pagination--docs)

---

# 🚀 Як запустити проект

## 1) Локальний запуск

```sh
yarn install
yarn dev
```

## 2) Продакшн білд

```sh
yarn build
yarn start
```

## 3) ENV змінні

Перед запуском необхідно створити `.env` файл на основі `.env.example` та прописати всі необхідні змінні середовища.

## 4) Запуск через Docker

> **Перед запуском через Docker, створіть `.env` файл на основі `.env.example` та заповніть всі необхідні змінні.**
>
> Ви можете передати змінні середовища двома способами:
>
> 1. Вказати їх явно через `-e` (див. приклад нижче, замініть `<your-value>` на ваші значення).
> 2. Або використати файл `.env` через параметр `--env-file .env`.

**Варіант 1: Явно передати змінні**

```sh
docker build -t movie-db .
docker run -d --rm \
  --name movie-db \
  -p 3001:3001 \
  -p 6008:6008 \
  -e MODE=<your-mode> \
  -e TMDB_API_KEY=<your-tmdb-api-key> \
  movie-db
```

**Варіант 2: Використати `.env` файл**

```sh
docker build -t movie-db .
docker run -d --rm \
  --name movie-db \
  -p 3001:3001 \
  -p 6008:6008 \
  --env-file .env \
  movie-db
```

---

# 🏗 Architecture Guide

## 1) Загальна структура проекту

```text
project-root/
├── src/
│   ├── assets/           # глобальні стилі, зображення, шрифти
│   ├── layout/           # легкі каркаси сторінок (Templates)
│   │   ├── default/
│   │   │   └── index.vue
│   │   ├── auth/
│   │   │   └── index.vue
│   │   └── dashboard/
│   │       └── index.vue
│   │
│   ├── middleware/       # route guards (auth, preload, redirects)
│   ├── plugins/          # підключення зовнішніх бібліотек (axios, toast, dayjs)
│   ├── shared/           # глобальні ресурси
│   │   ├── components/   # reusable компоненти
│   │   ├── ui/           # dumb-компоненти
│   │   ├── composables/  # універсальні хуки
│   │   ├── utils/        # загальні утиліти
│   │   ├── constants/    # глобальні enum-и, ключі
│   │   ├── types/        # глобальні типи
│   │   └── store/        # глобальні Pinia стор-и
│   │
│   ├── pages/            # сторінки
│   │   └── index/        # кожна сторінка може мати свої локальні ресурси
│   │       ├── api/
│   │       ├── components/
│   │       ├── ui/
│   │       ├── composables/
│   │       ├── utils/
│   │       ├── constants/
│   │       ├── types/
│   │       ├── widgets/  # локальні віджети
│   │       └── index.vue
│   │
│   ├── widgets/          # глобальні фічеві модулі
│   │   └── feature/
│   │       ├── api/
│   │       ├── store/    # локальні стор-и widget
│   │       ├── components/
│   │       ├── ui/
│   │       ├── composables/
│   │       ├── utils/
│   │       ├── constants/
│   │       ├── types/
│   │       ├── assets/
│   │       └── index.vue      
│   │       └── index.ts  # барель для віджета
│   │
│   └── server/           # серверна логіка (API endpoints)
│
├── public/               # favicon, robots.txt, статичні ресурси
├── static/               # додаткові статичні ресурси
├── app.vue               # вхідна точка застосунку
├── nuxt.config.ts        # конфігурація Nuxt
├── vitest.config.ts      # конфігурація Vitest
├── package.json
├── tsconfig.json
├── .eslintrc.json
└── README.md
```

## 2) Правила архітектури

### 2.1) Рекурсивна структура

* У будь-якому рівні (`pages`, `layouts`, `widgets`, `components`, `ui`) можна створювати ті ж підкаталоги.
* Це дозволяє локально інкапсулювати логіку, компоненти та утиліти.

### 2.2) Барелі

* У кожній директорії  `widgets`, `components`, `ui` створюється `index.ts` для централізованого експорту.
* У підкаталозі (наприклад, `Modal/`) зберігається лише код, тести та stories.

### 2.3) Тести та Storybook

* `ui` та `components` → обов’язково **`.test.ts`** та **`.stories.ts`**.
* `utils` та частина `composables` → обов’язкові **`.test.ts`**.
* Це гарантує перевірку логіки та візуального вигляду.

### 2.4) Заборона паралельних степів 🚫

* Віджет (`widgets/feature`) **не може** імпортувати інший віджет.
* Компоненти (`components/featureA`) **не може** імпортувати інший компонент.
* Дозволено імпортувати лише:
  * директиви нижчих рівнів
  * свої локальні папки (`ui`, `components`, `utils`, `composables`)
  * глобальні ресурси (`layout`, `middleware`, `plugins`, `assets`)

### 2.5) Локальні vs глобальні сутності

* `pages/feature` може мати **свої локальні** `ui`, `components`, `widgets`, `utils`, `composables`.
* `widgets/feature` може мати ту ж структуру, що і `shared/`, але для **локальних фічевих модулів**.
* `shared/` використовується тільки для того, що повторно застосовується у кількох місцях.

### 2.6) Приклади імпортів через барелі

```ts
// імпорт всіх компонентів сторінки через барель
import { DashboardHeader, DashboardFooter } from '@shared/components';

// імпорт утиліт
import { formatDate } from '@shared/utils';

// імпорт локального віджета
import { AnalyticsChart } from '@widgets/analytics/';
```

---

# 🛠 Stack та бібліотеки

**Основний стек:**

* Nuxt 3
* Vue 3
* TypeScript
* TailwindCSS
* Vitest
* Storybook

**Ключові бібліотеки:**

* @nuxtjs/i18n
* @splidejs/vue-splide
* eslint та плагіни для Nuxt, Vue, TypeScript, Prettier, Storybook
* vitest, @vue/test-utils, happy-dom
* prettier
* husky
* sass