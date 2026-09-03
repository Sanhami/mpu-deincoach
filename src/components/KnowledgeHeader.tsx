import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  ['/wissen/', 'MPU Wissen'],
  ['/mpu-ablauf/', 'Ablauf'],
  ['/mpu-kosten/', 'Kosten'],
  ['/alkohol-mpu/', 'Alkohol'],
  ['/drogen-mpu/', 'Drogen'],
  ['/abstinenznachweis/', 'Nachweise'],
  ['/mpu-begutachtungsstelle/', 'Begutachtungsstellen'],
  ['/faq/', 'FAQ'],
] as const;

export function KnowledgeNavigation({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Hauptnavigation" className="knowledge-nav">
      {links.map(([to, label]) => (
        <NavLink key={to} to={to} onClick={onNavigate} className={({ isActive }) => (isActive ? 'active' : '')}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export function KnowledgeHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-bar wrap">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span><strong>MPU</strong> Wissen<small>von MPUdeincoach</small></span>
        </Link>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          <span aria-hidden="true">{open ? '×' : '☰'}</span> Menü
        </button>
        <div className="desktop-navigation"><KnowledgeNavigation /></div>
      </div>
      {open && <div id="mobile-navigation" className="mobile-navigation wrap"><KnowledgeNavigation onNavigate={() => setOpen(false)} /></div>}
    </header>
  );
}
