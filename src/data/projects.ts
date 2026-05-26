import bundledProjects from '../../knowledge/projects.json';

export type Project = {
  name: string;
  client: string;
  location: string;
  value: string;
  duration: string;
  category: string;
  year: string;
  image: string;
  summary: string;
  highlights: string[];
  sourcePage?: number;
};

type ProjectRow = Record<string, string>;
type Fetcher = typeof fetch;
type ParsedProject = Project & { sortOrder: number };

const HIDDEN_VALUES = new Set(['0', 'false', 'hidden', 'hide', 'no', 'n']);

export const fallbackProjects = bundledProjects as Project[];

export const defaultProjectsSheetCsvUrl = import.meta.env.VITE_PROJECTS_SHEET_CSV_URL?.trim() ?? '';

export function normalizeProjectImageUrl(value: string) {
  const imageUrl = value.trim();
  if (!imageUrl) return '';

  const filePathMatch = imageUrl.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  const openIdMatch = imageUrl.match(/[?&]id=([^&]+)/i);
  const id = filePathMatch?.[1] ?? openIdMatch?.[1];

  if (imageUrl.includes('drive.google.com') && id) {
    return `https://drive.google.com/uc?export=view&id=${id}`;
  }

  return imageUrl;
}

export function parseProjectsCsv(csv: string): Project[] {
  const [headerRow, ...dataRows] = parseCsvRows(csv);
  const headers = headerRow.map(normalizeHeader);

  return dataRows
    .map((row, index) => mapProjectRow(headers, row, index))
    .filter((project): project is ParsedProject => project !== null)
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map(toProject);
}

export async function loadProjectsFromGoogleSheet(
  csvUrl = defaultProjectsSheetCsvUrl,
  fetcher: Fetcher = fetch,
): Promise<Project[]> {
  const trimmedUrl = csvUrl.trim();
  if (!trimmedUrl) return fallbackProjects;

  try {
    const response = await fetcher(trimmedUrl, { cache: 'no-store' });
    if (!response.ok) return fallbackProjects;

    const csv = await response.text();
    const projects = parseProjectsCsv(csv);
    return projects.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

function mapProjectRow(headers: string[], row: string[], index: number): ParsedProject | null {
  const item = headers.reduce<ProjectRow>((accumulator, header, columnIndex) => {
    accumulator[header] = row[columnIndex]?.trim() ?? '';
    return accumulator;
  }, {});

  if (isHidden(item.visible)) return null;

  const name = pick(item, 'project_name', 'name', 'project');
  const summary = pick(item, 'description', 'summary', 'project_description');
  const image = normalizeProjectImageUrl(pick(item, 'project_image', 'image', 'image_url'));

  if (!name || !summary || !image) return null;

  return {
    name,
    client: pick(item, 'client', 'owner') || 'Porrama client',
    location: pick(item, 'location') || 'Thailand',
    value: pick(item, 'value', 'project_value') || 'Available on request',
    duration: pick(item, 'duration', 'project_duration') || 'Project-based',
    category: pick(item, 'category', 'type') || 'Construction',
    year: pick(item, 'year') || '',
    image,
    summary,
    highlights: splitHighlights(pick(item, 'highlights', 'highlight')),
    sourcePage: Number(item.source_page) || undefined,
    sortOrder: Number(item.sort_order || item.order) || index + 1,
  };
}

function toProject(project: ParsedProject): Project {
  return {
    name: project.name,
    client: project.client,
    location: project.location,
    value: project.value,
    duration: project.duration,
    category: project.category,
    year: project.year,
    image: project.image,
    summary: project.summary,
    highlights: project.highlights,
    sourcePage: project.sourcePage,
  };
}

function parseCsvRows(csv: string) {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const nextChar = csv[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      field += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(field);
      field = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') index += 1;
      row.push(field);
      rows.push(row);
      field = '';
      row = [];
      continue;
    }

    field += char;
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((cells) => cells.some((cell) => cell.trim()));
}

function normalizeHeader(header: string) {
  return header.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function pick(row: ProjectRow, ...keys: string[]) {
  for (const key of keys) {
    const value = row[key]?.trim();
    if (value) return value;
  }

  return '';
}

function isHidden(value = '') {
  const normalized = value.trim().toLowerCase();
  return normalized ? HIDDEN_VALUES.has(normalized) : false;
}

function splitHighlights(value: string) {
  return value
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);
}
