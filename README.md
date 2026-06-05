# R3NVIO Portfolio Site

## Запуск локально

1. Установи Node.js LTS.
2. Открой папку проекта в VS Code.
3. В терминале:

```bash
npm install
npm run dev
```

4. Открой ссылку, которую покажет Vite, обычно:

```text
http://localhost:5173
```

## Структура

- `src/App.jsx` — основной компонент портфолио, массив работ `works`.
- `src/styles.css` — все стили (тёмная тема, анимации, responsive).
- `public/assets/` — логотипы (иконка и wordmark).
- `public/portfolio/` — видео и постеры для работ (Reels, motion и т.д.).

Работы рендерятся из массива в `App.jsx`. Портретные (вертикальные) в одном гриде, горизонтальные + абстрактный эксперимент — во втором.

Абстрактная карточка ("Визуальный эксперимент") использует CSS-only превью без видео.

## Добавление/замена работы

1. Положи видео + опционально poster.jpg в `public/portfolio/`.
2. Добавь объект в массив `works` в `src/App.jsx`:
   - `video`, `poster` (опц.), `portrait: true` для Reels/вертикали, `featured: true` для крупной карты.
   - `abstract: true` для CSS-визуализации вместо видео.
3. Сбилдь: `npm run build`.

## Сборка и деплой

```bash
npm run build
```

Папка `dist/` — готовая статическая сборка.

Деплой на Vercel / Netlify / GitHub Pages: заливай репо, подключи — Vite build настроен.

## Зависимости

- React + Vite
- framer-motion (скролл, анимации появления, hover tilt на абстрактной карточке)

