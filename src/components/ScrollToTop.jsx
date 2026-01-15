import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Verificar se estamos fazendo navegação de âncora
        const isAnchorNavigation = sessionStorage.getItem('anchorNavigation');

        if (isAnchorNavigation) {
            // Limpar flag e não fazer scroll
            sessionStorage.removeItem('anchorNavigation');
        } else {
            // Navegação normal, fazer scroll para o topo
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
}
