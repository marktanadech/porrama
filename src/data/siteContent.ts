import { fallbackProjects } from './projects';

export const siteContent = {
  brand: {
    name: 'Porrama Engineering',
    legalName: 'Porrama Engineering Company Limited',
    mark: 'PORRAMA',
    tagline: 'Engineers and Constructors',
  },
  navigation: [
    { label: 'Expertise', href: '#expertise' },
    { label: 'Projects', href: '#projects' },
    { label: 'Clients', href: '#clients' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    title: 'Professional Construction Specialist',
    body: 'Porrama Engineering delivers design coordination, turnkey construction, renovation, steel, civil, and facility improvement projects across Thailand with disciplined project management, quality control, and value engineering.',
    proof: ['Fast turnaround', 'Top-notch quality control', 'Expert project management', 'Cost-effective value engineering'],
  },
  expertise: [
    {
      title: 'Design and construction',
      body: 'Practical design coordination, construction planning, procurement support, site execution, and handover across commercial and industrial projects.',
    },
    {
      title: 'Steel and civil construction',
      body: 'Canopies, parking structures, facility improvements, foundations, industrial site works, and structural coordination.',
    },
    {
      title: 'Project management',
      body: 'Site supervision, safety coordination, schedule control, quality checks, and multi-trade construction delivery.',
    },
    {
      title: 'Value engineering',
      body: 'Practical construction decisions that help clients protect budget, time, space, and workmanship standards.',
    },
  ],
  process: [
    'Understand the site, budget, schedule, and operational constraints.',
    'Coordinate design, engineering, procurement, and site supervision.',
    'Control construction quality, safety, and handover details.',
  ],
  clients: [
    'Bangkok Mass Transit System',
    'Continental (Thailand)',
    'Nissan Motor (Thailand)',
    'United Nations',
    'Auto Alliance (Thailand)',
    'Procter & Gamble Manufacturing',
    'General Motors (Thailand)',
    'Servcorp',
    'Jotun Powder Coatings (Thailand)',
    'Sun Valley (Thailand)',
    'Halla Climate Control (Thailand)',
    'Somboon Somic Manufacturing',
  ],
  contact: {
    person: 'Pongpol Sarathitipak',
    phone: '084-646-5997',
    phoneHref: 'tel:+66846465997',
    email: 'porrama456@gmail.com',
    emailHref: 'mailto:porrama456@gmail.com',
    address: '932/7 Nakhon Ratchasima Road, Nakornchaisri, Dusit, Bangkok 10300',
  },
  projects: fallbackProjects,
};
