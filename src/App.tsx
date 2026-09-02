import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ArticleLayout } from './components/ArticleParts';
import { KnowledgeFooter } from './components/KnowledgeFooter';
import { KnowledgeHeader } from './components/KnowledgeHeader';
import { Seo } from './components/Seo';
import { ARTICLES } from './content/articles';
import { redirectForPath } from './config/redirects';
import { HomePage } from './pages/HomePage';
import { FAQPage, GlossaryPage, GuideIndexPage, KnowledgeIndexPage } from './pages/IndexPages';
import { ExternalRedirectPage, GonePage, NotFoundPage } from './pages/StatusPages';
import { AboutPage, CorrectionsPage, EditorialPage, EditorialPolicyPage, LegalPlaceholderPage } from './pages/TrustPages';

function RouteContent() {
  const { pathname } = useLocation();
  const normalized = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`;
  const redirect = redirectForPath(normalized);
  if (redirect?.action === '410' || redirect?.action === 'MANUAL_REVIEW') return <GonePage />;
  if (redirect?.to) return redirect.to.startsWith('http') ? <ExternalRedirectPage target={redirect.to} /> : <Navigate to={redirect.to} replace />;
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wissen/" element={<KnowledgeIndexPage />} />
      <Route path="/ratgeber/" element={<GuideIndexPage />} />
      <Route path="/faq/" element={<FAQPage />} />
      <Route path="/glossar/" element={<GlossaryPage />} />
      <Route path="/ueber-uns/" element={<AboutPage />} />
      <Route path="/redaktion/" element={<EditorialPage />} />
      <Route path="/redaktionsrichtlinien/" element={<EditorialPolicyPage />} />
      <Route path="/korrekturen/" element={<CorrectionsPage />} />
      <Route path="/impressum/" element={<LegalPlaceholderPage kind="Impressum" />} />
      <Route path="/datenschutz/" element={<LegalPlaceholderPage kind="Datenschutz" />} />
      <Route path="/agb/" element={<LegalPlaceholderPage kind="AGB" />} />
      {ARTICLES.map((article) => <Route key={article.id} path={article.slug} element={<ArticleLayout article={article} />} />)}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export function App() {
  return <><Seo /><KnowledgeHeader /><RouteContent /><KnowledgeFooter /></>;
}
