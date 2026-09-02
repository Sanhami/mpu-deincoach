import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ARTICLES } from '../content/articles';
import { GLOSSARY, PILLARS } from '../content/pillars';

interface Result { title: string; text: string; path: string; kind: string }

const normalize = (value: string) => value.toLocaleLowerCase('de-DE').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export function Search({ large = false }: { large?: boolean }) {
  const [params, setParams] = useSearchParams();
  const [value, setValue] = useState(params.get('q') ?? '');
  const submit = (event: React.FormEvent) => { event.preventDefault(); const query = value.trim(); if (query) setParams({ q: query }); };
  return <form className={`search${large ? ' large' : ''}`} role="search" onSubmit={submit}><label htmlFor={large ? 'knowledge-search-large' : 'knowledge-search'}>Was möchtest du wissen?</label><div><input id={large ? 'knowledge-search-large' : 'knowledge-search'} name="q" type="search" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Zum Beispiel: Begutachtungsstelle" autoComplete="off" /><button type="submit">Suchen</button></div></form>;
}

export function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get('q')?.trim() ?? '';
  const results = useMemo<Result[]>(() => {
    if (query.length < 2) return [];
    const words = normalize(query).split(/\s+/);
    const candidates: Result[] = [
      ...ARTICLES.map((article) => ({ title: article.title, text: `${article.excerpt} ${article.primaryTopic} ${article.body.map((block) => 'text' in block ? block.text : 'title' in block ? block.title : block.items.join(' ')).join(' ')}`, path: article.slug, kind: 'Artikel' })),
      ...PILLARS.filter((pillar) => pillar.path).map((pillar) => ({ title: pillar.title, text: pillar.description, path: pillar.path!, kind: 'Thema' })),
      ...GLOSSARY.filter((term) => term.relatedPath).map((term) => ({ title: term.term, text: term.definition, path: `/glossar/?begriff=${encodeURIComponent(term.term)}`, kind: 'Glossar' })),
    ];
    return candidates.map((item) => ({ item, score: words.reduce((score, word) => score + (normalize(item.title).includes(word) ? 4 : 0) + (normalize(item.text).includes(word) ? 1 : 0), 0) })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).slice(0, 12).map(({ item }) => item);
  }, [query]);
  if (!query) return null;
  return <section className="search-results" aria-live="polite"><h2>{results.length ? `${results.length} Ergebnisse für „${query}“` : `Keine Ergebnisse für „${query}“`}</h2>{results.length ? <div>{results.map((result) => <Link key={`${result.kind}-${result.title}`} to={result.path}><span>{result.kind}</span><strong>{result.title}</strong><p>{result.text}</p></Link>)}</div> : <p>Versuche einen allgemeineren Begriff wie „Ablauf“, „Alkohol“ oder „Nachweis“.</p>}</section>;
}
