import { useState } from 'react';
import { ArrowRight, Calendar, Clock, Search, User } from 'lucide-react';
import { PageHeroBanner } from '../components/Layout';
import { BLOG_POSTS, getBlogPostBySlug } from '../data/blog';
import { PRACTICE_AREAS, getPracticeAreaBySlug } from '../data/practiceAreas';
import { getTeamMemberBySlug } from '../data/team';
import { filterAndPaginateBlogPosts, type BreadcrumbItem } from '../utils/router';

interface BlogIndexPageProps {
  breadcrumbs: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export function BlogIndexPage({ breadcrumbs, onNavigate }: BlogIndexPageProps) {
  const [query, setQuery] = useState('');
  const [categorySlug, setCategorySlug] = useState('todas');
  const [page, setPage] = useState(1);

  const result = filterAndPaginateBlogPosts({
    query,
    categorySlug,
    page,
    pageSize: 2,
  });

  return (
    <>
      <PageHeroBanner
        eyebrow="INFORMATIVO JURÍDICO · BAURU/SP"
        titlePrefix="Blog"
        titleHighlight="Carreira Advocacia"
        subtitle="Artigos informativos sobre direitos, prazos legais e prevenção de conflitos em linguagem clara e acessível."
        breadcrumbs={breadcrumbs}
        onNavigate={onNavigate}
      />

      <section aria-label="Artigos e Publicações" className="bg-white py-14 lg:py-16">
        <div className="max-w-[1120px] mx-auto px-6">
          {/* Busca e Filtro por Categoria */}
          <div className="bg-[#F7F7F7] rounded-[6px] border border-[#D2D7DB] p-5 mb-10 space-y-4">
            <div className="relative">
              <label htmlFor="blog-search" className="sr-only">
                Buscar artigos no blog
              </label>
              <Search
                className="w-4 h-4 text-[#39586D] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="blog-search"
                type="search"
                placeholder="Buscar por tema, palavra-chave ou legislação..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-white border border-[#D2D7DB] rounded-[4px] pl-10 pr-4 py-2.5 text-[14px] font-light text-[#082144] placeholder:text-[#98A1AA] focus:border-[#082144] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setCategorySlug('todas');
                  setPage(1);
                }}
                className={`px-3.5 py-1.5 text-[12.5px] font-medium rounded-[4px] border transition-colors cursor-pointer ${
                  categorySlug === 'todas'
                    ? 'bg-[#082144] border-[#082144] text-white'
                    : 'bg-white border-[#D2D7DB] text-[#2C4156] hover:border-[#082144]'
                }`}
              >
                Todas as categorias
              </button>
              {PRACTICE_AREAS.map((area) => (
                <button
                  key={area.slug}
                  type="button"
                  onClick={() => {
                    setCategorySlug(area.slug);
                    setPage(1);
                  }}
                  className={`px-3.5 py-1.5 text-[12.5px] font-medium rounded-[4px] border transition-colors cursor-pointer ${
                    categorySlug === area.slug
                      ? 'bg-[#082144] border-[#082144] text-white'
                      : 'bg-white border-[#D2D7DB] text-[#2C4156] hover:border-[#082144]'
                  }`}
                >
                  {area.title}
                </button>
              ))}
            </div>
          </div>

          {result.items.length === 0 ? (
            <div className="text-center py-12 bg-[#F7F7F7] rounded-[6px] border border-[#D2D7DB]">
              <p className="font-display text-[24px] font-normal text-[#082144] mb-2">
                Nenhum artigo encontrado para os filtros atuais
              </p>
              <p className="text-[14px] font-light text-[#2C4156] mb-5">
                Ajuste sua busca ou limpe o filtro de categoria para visualizar todos os conteúdos.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategorySlug('todas');
                  setPage(1);
                }}
                className="bg-[#082144] hover:bg-[#2C4156] text-white text-[13px] font-medium px-5 py-2.5 rounded-[4px] cursor-pointer"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {result.items.map((post) => {
                const category = getPracticeAreaBySlug(post.categorySlug);
                const author = getTeamMemberBySlug(post.authorSlug);
                return (
                  <article
                    key={post.slug}
                    className="bg-white rounded-[6px] border border-[#D2D7DB] shadow-[0_12px_32px_rgba(8,33,68,0.05)] overflow-hidden flex flex-col"
                  >
                    <a
                      href={`/blog/${post.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/blog/${post.slug}`);
                      }}
                      className="block aspect-[16/9] bg-[#082144] overflow-hidden"
                    >
                      <img
                        src={post.coverImage}
                        alt={post.coverAlt}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                      />
                    </a>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#39586D] mb-2.5">
                        <span className="font-medium text-[#082144]">{category?.title}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.publishedAtDisplay}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{post.readingMinutes} min de leitura</span>
                      </div>
                      <h2 className="font-display text-[24px] font-normal text-[#082144] leading-snug mb-3">
                        <a
                          href={`/blog/${post.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/blog/${post.slug}`);
                          }}
                          className="hover:text-[#39586D] transition-colors"
                        >
                          {post.title}
                        </a>
                      </h2>
                      <p className="text-[14px] font-light leading-[1.65] text-[#2C4156] mb-5 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="pt-4 border-t border-[#D2D7DB]/70 flex items-center justify-between text-[12.5px]">
                        <span className="text-[#39586D]">{author?.name}</span>
                        <a
                          href={`/blog/${post.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/blog/${post.slug}`);
                          }}
                          className="inline-flex items-center gap-1 font-medium text-[#082144] hover:text-[#39586D]"
                        >
                          <span>Ler artigo</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Paginação */}
          {result.totalPages > 1 && (
            <nav
              aria-label="Paginação do Blog"
              className="mt-10 flex items-center justify-center gap-2"
            >
              {Array.from({ length: result.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  aria-current={result.currentPage === pageNum ? 'page' : undefined}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 rounded-[4px] text-[13px] font-medium border transition-colors tabular-nums cursor-pointer ${
                    result.currentPage === pageNum
                      ? 'bg-[#082144] border-[#082144] text-white'
                      : 'bg-white border-[#D2D7DB] text-[#2C4156] hover:border-[#082144]'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}

interface BlogArticlePageProps {
  slug: string;
  breadcrumbs: BreadcrumbItem[];
  onNavigate: (path: string, prefillSubject?: string) => void;
}

export function BlogArticlePage({ slug, breadcrumbs, onNavigate }: BlogArticlePageProps) {
  const post = getBlogPostBySlug(slug) || BLOG_POSTS[0];
  const category = getPracticeAreaBySlug(post.categorySlug);
  const author = getTeamMemberBySlug(post.authorSlug);
  const relatedPosts = BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageHeroBanner
        eyebrow={`${category?.title || 'ARTIGO INFORMATIVO'} · BAURU/SP`}
        titlePrefix={post.title}
        titleHighlight=""
        breadcrumbs={breadcrumbs}
        onNavigate={onNavigate}
      />

      <article className="bg-white py-12 lg:py-16">
        <div className="max-w-[960px] mx-auto px-6">
          {/* Metadados do Artigo */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#39586D] pb-6 mb-8 border-b border-[#D2D7DB]">
            {author && (
              <a
                href={`/equipe/${author.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/equipe/${author.slug}`);
                }}
                className="inline-flex items-center gap-1.5 font-medium text-[#082144] hover:text-[#39586D]"
              >
                <User className="w-4 h-4 text-[#39586D]" aria-hidden="true" />
                <span>
                  {author.name} ({author.oab})
                </span>
              </a>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#39586D]" aria-hidden="true" />
              <span>
                Publicado em {post.publishedAtDisplay} · Atualizado em {post.updatedAtDisplay}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 tabular-nums">
              <Clock className="w-4 h-4 text-[#39586D]" aria-hidden="true" />
              <span>{post.readingMinutes} min de leitura</span>
            </span>
          </div>

          <figure className="mb-8 rounded-[6px] overflow-hidden border border-[#D2D7DB]">
            <img
              src={post.coverImage}
              alt={post.coverAlt}
              className="w-full aspect-[16/9] object-cover"
            />
          </figure>

          {/* Índice de Tópicos */}
          <nav
            aria-label="Índice de tópicos do artigo"
            className="bg-[#F7F7F7] rounded-[6px] border border-[#D2D7DB] p-5 mb-9"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#39586D] mb-2.5">
              ÍNDICE DE TÓPICOS
            </p>
            <ol className="space-y-1.5 text-[14px] text-[#082144]">
              {post.sections.map((section, idx) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="hover:text-[#39586D] font-normal transition-colors"
                  >
                    {idx + 1}. {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Corpo Estruturado com H2 e H3 */}
          <div className="space-y-9">
            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-4">
                <h2 className="font-display text-[28px] font-normal text-[#082144]">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-[15.5px] font-light leading-[1.72] text-[#2C4156]">
                    {p}
                  </p>
                ))}
                {section.subsections?.map((sub) => (
                  <div key={sub.heading} className="pt-2 space-y-2.5">
                    <h3 className="font-display text-[22px] font-normal text-[#082144]">
                      {sub.heading}
                    </h3>
                    {sub.paragraphs.map((sp, sIdx) => (
                      <p key={sIdx} className="text-[15px] font-light leading-[1.7] text-[#2C4156]">
                        {sp}
                      </p>
                    ))}
                  </div>
                ))}
              </section>
            ))}
          </div>

          {/* Links Internos para Áreas Relacionadas */}
          <div className="mt-10 p-5 rounded-[6px] bg-[#F7F7F7] border border-[#D2D7DB]">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#39586D] mb-2.5">
              ÁREAS DE ATUAÇÃO RELACIONADAS
            </p>
            <div className="flex flex-wrap gap-3">
              {post.relatedAreaSlugs.map((areaSlug) => {
                const area = getPracticeAreaBySlug(areaSlug);
                if (!area) return null;
                return (
                  <a
                    key={area.slug}
                    href={`/areas-de-atuacao/${area.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/areas-de-atuacao/${area.slug}`);
                    }}
                    className="px-4 py-2 bg-white border border-[#D2D7DB] hover:border-[#082144] rounded-[4px] text-[13px] font-medium text-[#082144] hover:text-[#39586D] transition-colors"
                  >
                    {area.title} em Bauru/SP →
                  </a>
                );
              })}
            </div>
          </div>

          {/* CTA Informativo ao Fim do Artigo */}
          <div className="mt-10 bg-[#082144] rounded-xl p-7 sm:p-9 text-center text-white border border-[#7F99B2]/20">
            <h2 className="font-display text-[26px] font-normal mb-2">
              Ficou com dúvidas sobre este tema?
            </h2>
            <p className="text-[14px] font-light text-[#D2D7DB] max-w-[540px] mx-auto mb-5">
              Este texto possui caráter meramente informativo. Para orientação aplicável ao seu
              caso específico, entre em contato com nossa equipe em Bauru/SP.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/contato', category?.title)}
              className="bg-[#F7F7F7] hover:bg-white text-[#082144] text-[13px] font-medium px-6 py-3 rounded-[4px] transition-colors cursor-pointer"
            >
              Falar com o Escritório
            </button>
          </div>

          {/* Artigos Relacionados */}
          <div className="mt-12 pt-8 border-t border-[#D2D7DB]">
            <h2 className="font-display text-[26px] font-normal text-[#082144] mb-5">
              Artigos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {relatedPosts.map((related) => (
                <a
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/blog/${related.slug}`);
                  }}
                  className="p-5 rounded-[6px] border border-[#D2D7DB] hover:border-[#082144] bg-[#F7F7F7] transition-colors block"
                >
                  <p className="text-[12px] text-[#39586D] font-medium mb-1">
                    {related.publishedAtDisplay}
                  </p>
                  <h3 className="font-display text-[20px] font-normal text-[#082144]">
                    {related.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
