import { describe, expect, it, vi } from 'vitest';
import {
  loadProjectsFromGoogleSheet,
  normalizeProjectImageUrl,
  parseProjectsCsv,
} from '../src/data/projects';

describe('Google Sheets project backend', () => {
  it('parses visible project rows from a published CSV feed', () => {
    const csv = [
      'sort_order,visible,project_name,project_image,description,client,location,value,duration,category,year,highlights',
      '2,yes,Second Project,https://example.com/second.jpg,"Second description",Client B,Bangkok,2 Baht,2 months,Steel,2024,"Detail C|Detail D"',
      '1,yes,First Project,/images/projects/first.jpg,"First description",Client A,Rayong,1 Baht,1 month,Office,2025,"Detail A|Detail B"',
      '3,no,Hidden Project,https://example.com/hidden.jpg,"Hidden description",Client C,Bangkok,3 Baht,3 months,Civil,2023,"Hidden"',
    ].join('\n');

    const projects = parseProjectsCsv(csv);

    expect(projects.map((project) => project.name)).toEqual(['First Project', 'Second Project']);
    expect(projects[0]).toMatchObject({
      image: '/images/projects/first.jpg',
      summary: 'First description',
      client: 'Client A',
      location: 'Rayong',
      value: '1 Baht',
      duration: '1 month',
      category: 'Office',
      year: '2025',
      highlights: ['Detail A', 'Detail B'],
    });
  });

  it('normalizes Google Drive sharing links into image URLs', () => {
    expect(
      normalizeProjectImageUrl('https://drive.google.com/file/d/1abcDEFghi_JKL/view?usp=sharing'),
    ).toBe('https://drive.google.com/thumbnail?id=1abcDEFghi_JKL&sz=w1200');
    expect(normalizeProjectImageUrl('https://drive.google.com/open?id=1abcDEFghi_JKL')).toBe(
      'https://drive.google.com/thumbnail?id=1abcDEFghi_JKL&sz=w1200',
    );
    expect(
      normalizeProjectImageUrl(
        'https://drive.google.com/file/d/1xWfqK5yzgMuWkVAugQWZ8UskYDLnXpxG/view?usp=drive_link',
      ),
    ).toBe(
      'https://drive.google.com/thumbnail?id=1xWfqK5yzgMuWkVAugQWZ8UskYDLnXpxG&sz=w1200',
    );
  });

  it('loads projects from a configured Google Sheet URL', async () => {
    const csv = [
      'project_name,project_image,description,client,location,value,duration,category,year',
      'Sheet Project,https://example.com/sheet.jpg,"Admin-controlled description",Admin Client,Bangkok,9 Baht,9 months,Office,2026',
    ].join('\n');
    const fetcher = vi.fn(async () => new Response(csv, { status: 200 }));

    const projects = await loadProjectsFromGoogleSheet('https://docs.google.com/sheet.csv', fetcher);

    expect(fetcher).toHaveBeenCalledWith('https://docs.google.com/sheet.csv', { cache: 'no-store' });
    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe('Sheet Project');
    expect(projects[0].summary).toBe('Admin-controlled description');
  });

  it('falls back to bundled projects when the Sheet is not configured', async () => {
    const projects = await loadProjectsFromGoogleSheet('', vi.fn());

    expect(projects).toHaveLength(6);
    expect(projects[0].name).toBe('Corteva Agriscience Office Renovation');
  });
});
