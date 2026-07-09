# 🪝 HookAI

*A web app that writes the opening line of your short-form video — the "hook" — from a one-sentence description of what the video is about.*

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

The first two seconds decide whether a Reel or TikTok gets watched or scrolled past. HookAI takes a plain description ("a tutorial on making sourdough bread") and returns five candidate hooks, each scored 1–100 for engagement potential, so you can copy the strongest one and start filming.

Behind the form is a single serverless function, `api/generate-hooks.mjs`, that makes three calls to OpenAI's `gpt-4o-mini`:

1. It shuffles a list of nine proven templates — "Here's the exact 3 step process to [outcome]", "Wanna know why most people never [outcome]?" — samples five, and asks the model (temperature 0.7) to pick the best and fill the brackets with details from your topic, bolding the filled-in words. It keeps the top three.
2. It generates two fully original hooks (temperature 0.95) tuned to one of six tones — funny, dramatic, inspirational, urgent, casual, professional — under constraints like "under 1.5 seconds of spoken word" and "create a curiosity gap."
3. A third call scores those two originals 1–100.

The five results come back sorted by score and split in the UI into proven templates and original creations, each card badged Viral (80+), Hot (60+), Good (40+), or Decent, with copy-to-clipboard and a regenerate button.

The frontend is React 19 and TypeScript on Vite, styled with Tailwind, over a WebGL animated background (three.js) and a decrypt-style animated headline. It deploys to Vercel; `server.mjs` is an equivalent Express version of the endpoint for local development.

What ships is exactly this: the one page, and the one endpoint behind it. No accounts, no billing, no saved history — you describe the video, you copy the hook you like, you go film.
