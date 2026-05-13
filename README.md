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

## Где лежат файлы

Логотипы:

```text
public/assets/
```

Видео:

```text
public/portfolio/
```

## Пути видео в коде

```text
/portfolio/podcast-ui-animation.mp4
/portfolio/ui-ad-animation.mp4
/portfolio/ui-sfx-animation.mp4
```

Чтобы заменить видео, просто положи новый файл в `public/portfolio/` и поменяй `videoSrc` в `src/App.jsx`.

## Деплой на Vercel

1. Залей проект в GitHub.
2. Открой Vercel.
3. New Project.
4. Выбери репозиторий.
5. Deploy.

