# Porrama Engineering Website

English-first brochure website for Porrama Engineering Company Limited, built from the company profile PDF.

## Stack

- React
- Vite
- TypeScript
- Vitest
- Netlify static deployment

## Local Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm test
npm run lint
npm run build
```

## Deploy To Netlify

1. Push this folder to a GitHub repository.
2. In Netlify, choose **Add new project** then **Import an existing project**.
3. Select the GitHub repository.
4. Use these settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Publish with a Netlify subdomain such as `porrama-engineering.netlify.app`.

## Content Sources

- `knowledge/company-profile.md`
- `knowledge/projects.json`
- `knowledge/content-plan.md`
- Original source PDF: `C:\Users\tanadech.s\Downloads\PROFILES-update 29.12.25.pdf`

Client logos are not published in v1. The site uses client names and project images extracted from the provided profile.
