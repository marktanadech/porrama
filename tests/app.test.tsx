import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from '../src/App';

describe('Porrama brochure site', () => {
  it('renders the launch hero and primary contact actions', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Professional Construction Specialist/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Call 084-646-5997/i })).toHaveAttribute(
      'href',
      'tel:+66846465997',
    );
    expect(screen.getByRole('link', { name: /Email Porrama/i })).toHaveAttribute(
      'href',
      'mailto:porrama456@gmail.com',
    );
  });

  it('renders the six approved featured projects', () => {
    render(<App />);

    expect(screen.getAllByTestId('project-card')).toHaveLength(6);
    expect(screen.getByText('Corteva Agriscience Office Renovation')).toBeInTheDocument();
    expect(screen.getByText('Auto Alliance Employee Car Park')).toBeInTheDocument();
  });

  it('renders project rows loaded from a configured Google Sheet CSV URL', async () => {
    const csv = [
      'project_name,project_image,description,client,location,value,duration,category,year',
      'Admin Sheet Project,https://example.com/admin.jpg,"Edited by non-tech admin",Porrama Client,Bangkok,10 Baht,1 month,Office,2026',
    ].join('\n');
    const fetcher = vi.fn(async () => new Response(csv, { status: 200 }));

    render(<App projectsCsvUrl="https://docs.google.com/spreadsheets.csv" fetchProjects={fetcher} />);

    expect(await screen.findByText('Admin Sheet Project')).toBeInTheDocument();
    expect(screen.getByText('Edited by non-tech admin')).toBeInTheDocument();
    expect(screen.getAllByTestId('project-card')).toHaveLength(1);
  });

  it('renders client trust signals and contact address', () => {
    render(<App />);

    expect(screen.getAllByText('United Nations').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Servcorp')).toBeInTheDocument();
    expect(screen.getByText(/Nakhon Ratchasima Road/i)).toBeInTheDocument();
  });
});
