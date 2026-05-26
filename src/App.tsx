import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Compass,
  Hammer,
  HardHat,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { siteContent } from './data/siteContent';
import {
  defaultProjectsSheetCsvUrl,
  loadProjectsFromGoogleSheet,
  type Project,
} from './data/projects';

const expertiseIcons = [Building2, Hammer, HardHat, Compass];
type FetchProjects = Parameters<typeof loadProjectsFromGoogleSheet>[1];

function BrandMark() {
  return (
    <a className="brand" href="#top" aria-label="Porrama Engineering home">
      <img className="brand-logo" src="/images/brand/porrama-logo.jpg" alt="" aria-hidden="true" />
    </a>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" data-testid="project-card">
      <img src={project.image} alt={`${project.name} project reference`} />
      <div className="project-card-content">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <dl>
          <div>
            <dt>Client</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt>Value</dt>
            <dd>{project.value}</dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>{project.duration}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

type AppProps = {
  projectsCsvUrl?: string;
  fetchProjects?: FetchProjects;
};

export default function App({
  projectsCsvUrl = defaultProjectsSheetCsvUrl,
  fetchProjects,
}: AppProps = {}) {
  const [projects, setProjects] = useState<Project[]>(siteContent.projects);

  useEffect(() => {
    let isActive = true;

    loadProjectsFromGoogleSheet(projectsCsvUrl, fetchProjects).then((loadedProjects) => {
      if (isActive) setProjects(loadedProjects);
    });

    return () => {
      isActive = false;
    };
  }, [fetchProjects, projectsCsvUrl]);

  return (
    <main id="top">
      <header className="site-header" aria-label="Main navigation">
        <BrandMark />
        <nav>
          {siteContent.navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 id="hero-title">{siteContent.hero.title}</h1>
            <p>{siteContent.hero.body}</p>
            <div className="hero-actions">
              <a className="button primary" href={siteContent.contact.phoneHref}>
                <Phone size={18} aria-hidden="true" />
                Call {siteContent.contact.phone}
              </a>
              <a className="button secondary" href={siteContent.contact.emailHref}>
                <Mail size={18} aria-hidden="true" />
                Email Porrama
              </a>
            </div>
          </div>
          <ul className="proof-list" aria-label="Porrama strengths">
            {siteContent.hero.proof.map((item) => (
              <li key={item}>
                <CheckCircle2 size={20} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section expertise-section" id="expertise" aria-labelledby="expertise-title">
        <div className="section-heading">
          <h2 id="expertise-title">Turnkey Construction Capability</h2>
          <p>
            Porrama supports clients from design coordination, site constraints, and budget
            decisions through construction, supervision, quality checks, and handover.
          </p>
        </div>
        <div className="expertise-grid">
          {siteContent.expertise.map((item, index) => {
            const Icon = expertiseIcons[index] ?? ShieldCheck;
            return (
              <article className="expertise-item" key={item.title}>
                <Icon size={28} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section process-section" aria-labelledby="process-title">
        <div>
          <h2 id="process-title">Built Around Practical Delivery</h2>
          <p>
            The company profile shows work across factories, transport facilities, hospitality
            spaces, commercial buildings, corporate offices, and international organization sites.
          </p>
        </div>
        <ol className="process-list">
          {siteContent.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="section projects-section" id="projects" aria-labelledby="projects-title">
        <div className="section-heading">
          <h2 id="projects-title">Featured Projects</h2>
          <p>
            Selected references from the company profile, spanning design-and-build delivery,
            steel structures, facility improvement, renovation, and civil construction.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.name} />
          ))}
        </div>
      </section>

      <section className="section clients-section" id="clients" aria-labelledby="clients-title">
        <div className="section-heading">
          <h2 id="clients-title">Trusted By Local And Global Clients</h2>
          <p>
            Client references from Porrama's profile include transport, automotive, manufacturing,
            international organizations, hospitality, and commercial workplace brands.
          </p>
        </div>
        <div className="client-list">
          {siteContent.clients.map((client) => (
            <span key={client}>{client}</span>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-copy">
          <h2 id="contact-title">Bring Your Next Workspace Or Facility Project To Life</h2>
          <p>
            Speak directly with Porrama Engineering about design coordination, construction,
            renovation, steel works, civil works, and turnkey project delivery in Thailand.
          </p>
        </div>
        <address className="contact-panel">
          <strong>{siteContent.brand.legalName}</strong>
          <span>{siteContent.contact.person}</span>
          <a href={siteContent.contact.phoneHref}>
            <Phone size={18} aria-hidden="true" />
            {siteContent.contact.phone}
          </a>
          <a href={siteContent.contact.emailHref}>
            <Mail size={18} aria-hidden="true" />
            {siteContent.contact.email}
          </a>
          <span>
            <MapPin size={18} aria-hidden="true" />
            {siteContent.contact.address}
          </span>
        </address>
      </section>

      <footer>
        <BrandMark />
        <a href={siteContent.contact.emailHref}>
          Start a conversation
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </footer>
    </main>
  );
}
