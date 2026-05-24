import { describe, expect, it } from 'vitest';
import projects from '../knowledge/projects.json';
import { siteContent } from '../src/data/siteContent';

describe('Porrama launch content', () => {
  it('contains the approved contact details from the company profile', () => {
    expect(siteContent.contact.phone).toBe('084-646-5997');
    expect(siteContent.contact.email).toBe('porrama456@gmail.com');
    expect(siteContent.contact.phoneHref).toBe('tel:+66846465997');
    expect(siteContent.contact.emailHref).toBe('mailto:porrama456@gmail.com');
    expect(siteContent.contact.address).toContain('Bangkok 10300');
  });

  it('curates a focused set of featured projects from the PDF profile', () => {
    expect(projects).toHaveLength(6);
    expect(projects.map((project) => project.name)).toEqual([
      'Corteva Agriscience Office Renovation',
      'STT Parking Shelter',
      'BTS Green Line Depot Facility Improvement',
      'Servcorp Mercury Office Fit-Out',
      'UNOPS Office Interior Decoration',
      'Auto Alliance Employee Car Park',
    ]);
  });

  it('covers the intended expertise and client trust signals', () => {
    expect(siteContent.expertise.map((item) => item.title)).toEqual(
      expect.arrayContaining([
        'Office fit-out and renovation',
        'Steel and civil construction',
        'Project management',
        'Value engineering',
      ]),
    );
    expect(siteContent.clients).toEqual(
      expect.arrayContaining([
        'United Nations',
        'Servcorp',
        'Auto Alliance (Thailand)',
        'Procter & Gamble Manufacturing',
      ]),
    );
  });
});
