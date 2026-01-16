// src/pages/BlogPost.jsx
import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BLOG_POSTS, getPostBySlug } from "../data/blogPosts";

function ArticleSEO({ post }) {
    const BASE_URL = "https://hausecare.com.br";
    const fullUrl = `${BASE_URL}/blog/${post.slug}`;
    const imageUrl = post.image?.startsWith("http") ? post.image : `${BASE_URL}${post.image || "/og-hausecare.png"}`;

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.description,
        "image": imageUrl,
        "author": {
            "@type": "Organization",
            "name": "Hausecare",
            "url": BASE_URL
        },
        "publisher": {
            "@type": "Organization",
            "name": "Hausecare",
            "logo": {
                "@type": "ImageObject",
                "url": `${BASE_URL}/logo-hausecare.png`
            }
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": fullUrl
        }
    };

    return (
        <Helmet>
            <title>{post.title} | Blog Hausecare</title>
            <meta name="description" content={post.description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:type" content="article" />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="article:published_time" content={post.date} />
            <meta property="article:author" content="Hausecare" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.title} />
            <meta name="twitter:description" content={post.description} />
            <meta name="twitter:image" content={imageUrl} />

            {/* Article Schema */}
            <script type="application/ld+json">
                {JSON.stringify(articleSchema)}
            </script>
        </Helmet>
    );
}

function renderContent(content) {
    // Converte o markdown básico para HTML
    const lines = content.trim().split("\n");
    const elements = [];
    let currentParagraph = [];
    let inList = false;
    let listItems = [];
    let inCodeBlock = false;
    let codeContent = [];

    const flushParagraph = () => {
        if (currentParagraph.length > 0) {
            const text = currentParagraph.join(" ").trim();
            if (text) {
                elements.push(
                    <p key={elements.length} className="text-slate-700 leading-relaxed mb-4">
                        {text}
                    </p>
                );
            }
            currentParagraph = [];
        }
    };

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={elements.length} className="list-disc list-inside space-y-2 mb-6 text-slate-700">
                    {listItems.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            );
            listItems = [];
            inList = false;
        }
    };

    lines.forEach((line, index) => {
        const trimmed = line.trim();

        // Code block
        if (trimmed.startsWith("```")) {
            if (inCodeBlock) {
                elements.push(
                    <pre key={elements.length} className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto mb-6 text-sm">
                        <code>{codeContent.join("\n")}</code>
                    </pre>
                );
                codeContent = [];
                inCodeBlock = false;
            } else {
                flushParagraph();
                flushList();
                inCodeBlock = true;
            }
            return;
        }

        if (inCodeBlock) {
            codeContent.push(line);
            return;
        }

        // Heading 2
        if (trimmed.startsWith("## ")) {
            flushParagraph();
            flushList();
            elements.push(
                <h2 key={elements.length} className="text-2xl font-bold text-slate-900 mt-10 mb-4">
                    {trimmed.replace("## ", "")}
                </h2>
            );
            return;
        }

        // Heading 3
        if (trimmed.startsWith("### ")) {
            flushParagraph();
            flushList();
            elements.push(
                <h3 key={elements.length} className="text-xl font-bold text-slate-900 mt-8 mb-3">
                    {trimmed.replace("### ", "")}
                </h3>
            );
            return;
        }

        // Heading 4
        if (trimmed.startsWith("#### ")) {
            flushParagraph();
            flushList();
            elements.push(
                <h4 key={elements.length} className="text-lg font-bold text-slate-900 mt-6 mb-2">
                    {trimmed.replace("#### ", "")}
                </h4>
            );
            return;
        }

        // List item
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || /^\d+\.\s/.test(trimmed)) {
            flushParagraph();
            if (!inList) inList = true;
            listItems.push(trimmed.replace(/^[-*]\s/, "").replace(/^\d+\.\s/, ""));
            return;
        }

        // Empty line
        if (!trimmed) {
            flushParagraph();
            flushList();
            return;
        }

        // Table row (simple)
        if (trimmed.startsWith("|")) {
            flushParagraph();
            flushList();
            // Skip table for now, just render as text
            return;
        }

        // Regular paragraph content
        flushList();
        currentParagraph.push(trimmed);
    });

    flushParagraph();
    flushList();

    return elements;
}

export default function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = getPostBySlug(slug);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // 404 se não encontrar
    if (!post) {
        return (
            <main className="bg-slate-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Artigo não encontrado</h1>
                    <p className="text-slate-600 mb-8">O artigo que você procura não existe ou foi removido.</p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
                    >
                        Voltar ao blog
                    </Link>
                </div>
            </main>
        );
    }

    // Posts relacionados (mesma categoria, exceto o atual)
    const relatedPosts = BLOG_POSTS
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 3);

    // Navegação anterior/próximo
    const currentIndex = BLOG_POSTS.findIndex(p => p.id === post.id);
    const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
    const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

    return (
        <main className="bg-slate-50 min-h-screen">
            <ArticleSEO post={post} />

            {/* Hero do artigo */}
            <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-white">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background:
                            "radial-gradient(circle at 20% 30%, rgba(43, 144, 138, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
                    }}
                />

                <div className="relative container mx-auto px-6 max-w-4xl">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                        <Link to="/" className="hover:text-slate-700">Início</Link>
                        <span>/</span>
                        <Link to="/blog" className="hover:text-slate-700">Blog</Link>
                        <span>/</span>
                        <span className="text-slate-700">{post.category}</span>
                    </nav>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {post.category}
                        </span>
                        <span className="text-sm text-slate-500">{post.date}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-sm text-slate-500">{post.readTime} de leitura</span>
                    </div>

                    {/* Título */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight" style={{ letterSpacing: "-0.02em" }}>
                        {post.title}
                    </h1>

                    {/* Descrição */}
                    <p className="mt-6 text-xl text-slate-600 leading-relaxed">
                        {post.description}
                    </p>
                </div>
            </section>

            {/* Conteúdo do artigo */}
            <section className="py-12">
                <div className="container mx-auto px-6 max-w-4xl">
                    <article className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12">
                        <div className="prose prose-slate max-w-none">
                            {renderContent(post.content)}
                        </div>

                        {/* CTA dentro do artigo */}
                        <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 p-8 text-center">
                            <h3 className="text-xl md:text-2xl font-bold text-white">
                                Quer ver isso na prática?
                            </h3>
                            <p className="mt-2 text-white/90">
                                Agende uma demonstração gratuita do Hausecare.
                            </p>
                            <a
                                href="https://wa.me/5561991519369"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-600 font-bold hover:bg-slate-50 transition"
                            >
                                Agendar demonstração
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>

                        {/* Tags/Keywords */}
                        {post.keywords && post.keywords.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-slate-200">
                                <p className="text-sm font-semibold text-slate-700 mb-3">Palavras-chave:</p>
                                <div className="flex flex-wrap gap-2">
                                    {post.keywords.map((keyword, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>

                    {/* Navegação anterior/próximo */}
                    <div className="mt-8 grid md:grid-cols-2 gap-4">
                        {prevPost && (
                            <Link
                                to={`/blog/${prevPost.slug}`}
                                className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition"
                            >
                                <span className="text-sm text-slate-500">← Artigo anterior</span>
                                <p className="mt-2 font-semibold text-slate-900 group-hover:text-emerald-600 transition line-clamp-2">
                                    {prevPost.title}
                                </p>
                            </Link>
                        )}
                        {nextPost && (
                            <Link
                                to={`/blog/${nextPost.slug}`}
                                className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition text-right md:col-start-2"
                            >
                                <span className="text-sm text-slate-500">Próximo artigo →</span>
                                <p className="mt-2 font-semibold text-slate-900 group-hover:text-emerald-600 transition line-clamp-2">
                                    {nextPost.title}
                                </p>
                            </Link>
                        )}
                    </div>

                    {/* Artigos relacionados */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Artigos relacionados</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.id}
                                        to={`/blog/${relatedPost.slug}`}
                                        className="group block p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition"
                                    >
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 mb-3">
                                            {relatedPost.category}
                                        </span>
                                        <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition line-clamp-2">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-slate-500">{relatedPost.readTime}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Voltar ao blog */}
                    <div className="mt-12 text-center">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            Voltar ao blog
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
