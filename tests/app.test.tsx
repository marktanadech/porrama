import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

describe('Porrama brochure site', () => {
  it('renders the launch hero and primary contact actions', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Office Fit-Out & Interior Specialist/i,
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

  it('renders client trust signals and contact address', () => {
    render(<App />);

    expect(screen.getAllByText('United Nations').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Servcorp')).toBeInTheDocument();
    expect(screen.getByText(/Nakhon Ratchasima Road/i)).toBeInTheDocument();
  });
});
