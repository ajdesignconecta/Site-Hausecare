// src/pages/Blog.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../data/blogPosts";

function BlogCard({ post }) {
    return (
        <Link
            to={`/blog/${post.slug}`}
            className="group block rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300"
        >
            {/* Imagem placeholder */}
            <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-indigo-500/10" />
                <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-slate-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {post.category}
                    </span>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} de leitura</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-600 transition-colors">
                    {post.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {post.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 group-hover:text-emerald-700">
                    Ler artigo
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}

export default function Blog() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = useMemo(() => {
        return BLOG_POSTS.filter(post => {
            const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
            const matchesSearch = !searchQuery ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    return (
        <main className="bg-slate-50 min-h-screen">
            <SEO
                title="Blog | Conteúdo sobre Gestão de Home Care"
                description="Artigos sobre gestão de home care, software para clínicas, organização de agenda, controle de atendimentos e muito mais. Conteúdo para gestores."
                path="/blog"
            />

            {/* Hero */}
            <section className="relative pt-24 pb-12 md:pt-32 md:pb-16">
                <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background:
                            "radial-gradient(circle at 20% 30%, rgba(43, 144, 138, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
                    }}
                />

                <div className="relative container mx-auto px-6 max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 border border-emerald-200 mb-6">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Blog Hausecare
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                            Conteúdo para gestores<br className="hidden md:block" /> de Home Care
                        </h1>

                        <p className="mt-5 text-lg text-slate-600 leading-relaxed">
                            Artigos práticos sobre gestão, tecnologia, operação e financeiro.
                            Sem enrolação — só o que faz diferença na sua clínica.
                        </p>

                        {/* Search */}
                        <div className="mt-8 max-w-md mx-auto">
                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Buscar artigos..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filtros + Grid */}
            <section className="pb-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    {/* Filtros por categoria */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                        <button
                            onClick={() => setSelectedCategory("all")}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${selectedCategory === "all"
                                    ? "bg-slate-900 text-white"
                                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            Todos
                        </button>
                        {BLOG_CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${selectedCategory === category
                                        ? "bg-slate-900 text-white"
                                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Grid de artigos */}
                    {filteredPosts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-slate-600 text-lg">Nenhum artigo encontrado.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("all");
                                }}
                                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mt-16 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            Quer ver essas dicas aplicadas na prática?
                        </h2>
                        <p className="mt-3 text-slate-300 max-w-xl mx-auto">
                            Agende uma demonstração gratuita e veja como o Hausecare pode transformar sua operação de Home Care.
                        </p>
                        <a
                            href="https://wa.me/5561991519369"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition shadow-lg"
                        >
                            Agendar demonstração
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
