import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 py-4">
            <div className="container mx-auto px-6 text-center">
                <p className="text-slate-500 text-sm">
                    Copyright © 2025 – Site desenvolvido pela <strong className="text-slate-700">Webize Tecnologia</strong> - programador Arnaldo Junior
                </p>
                <div className="mt-2 flex justify-center gap-4 text-xs text-slate-400">
                    <Link to="/legal/privacidade" className="hover:text-slate-600 transition">Privacidade</Link>
                    <span>•</span>
                    <Link to="/legal/termos" className="hover:text-slate-600 transition">Termos de Uso</Link>
                </div>
            </div>
        </footer>
    );
}
