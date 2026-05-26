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

## Google Sheet Project Backend

The project cards can be controlled by a public Google Sheet published as CSV. If `VITE_PROJECTS_SHEET_CSV_URL` is empty or the Sheet cannot load, the site uses `knowledge/projects.json` as a safe fallback. A local sample feed is available at `/projects-sample.csv` after the app is built.

Use `knowledge/google-sheet-template.csv` as the column template:

| Column | Required | Notes |
| --- | --- | --- |
| `sort_order` | No | Lower numbers appear first. |
| `visible` | No | Use `yes` to show. Use `no`, `false`, `0`, or `hidden` to hide. |
| `project_name` | Yes | Project title shown on the card. |
| `project_image` | Yes | Public image URL, local `/images/...` path, or Google Drive sharing link. |
| `description` | Yes | Main card description. |
| `client` | No | Falls back to `Porrama client`. |
| `location` | No | Falls back to `Thailand`. |
| `value` | No | Falls back to `Available on request`. |
| `duration` | No | Falls back to `Project-based`. |
| `category` | No | Falls back to `Construction`. |
| `year` | No | Optional display year. |
| `highlights` | No | Separate items with `|` if needed later. |

Admin setup:

1. Create a Google Sheet with the columns above.
2. Add one project per row.
3. Put project images in a public location. Google Drive links should be shared so anyone with the link can view.
4. In Google Sheets, use **File > Share > Publish to web**, select the project sheet, and choose **Comma-separated values (.csv)**.
5. Copy the published CSV URL.
6. Add that URL to Netlify as environment variable `VITE_PROJECTS_SHEET_CSV_URL`.
7. Redeploy the site in Netlify.

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
   - Environment variable: `VITE_PROJECTS_SHEET_CSV_URL`
5. Publish with a Netlify subdomain such as `porrama-engineering.netlify.app`.

## Content Sources

- `knowledge/company-profile.md`
- `knowledge/projects.json`
- `knowledge/content-plan.md`
- Original source PDF: `C:\Users\tanadech.s\Downloads\PROFILES-update 29.12.25.pdf`

Client logos are not published in v1. The site uses client names and project images extracted from the provided profile.
