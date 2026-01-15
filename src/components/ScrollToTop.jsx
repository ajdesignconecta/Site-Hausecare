import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // Função para fazer o scroll
        const handleScroll = () => {
            if (hash) {
                const id = hash.replace("#", "");
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            } else {
                window.scrollTo(0, 0);
            }
        };

        // Pequeno delay para garantir que a página renderizou
        const timer = setTimeout(handleScroll, 100);

        return () => clearTimeout(timer);
    }, [pathname, hash]);

    return null;
}
