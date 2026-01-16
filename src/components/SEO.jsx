// src/components/SEO.jsx
// Componente reutilizável para SEO por página usando react-helmet-async
import { Helmet } from "react-helmet-async";

const BASE_URL = "https://hausecare.com.br";
const DEFAULT_IMAGE = `${BASE_URL}/og-hausecare.png`;

/**
 * Componente SEO para definir meta tags por página
 * 
 * @param {Object} props
 * @param {string} props.title - Título da página
 * @param {string} props.description - Descrição da página
 * @param {string} [props.path="/"] - Path da página (ex: "/planos")
 * @param {string} [props.image] - URL da imagem OG
 * @param {string} [props.type="website"] - Tipo OG
 * @param {boolean} [props.noindex=false] - Se true, não indexa a página
 */
export default function SEO({
    title,
    description,
    path = "/",
    image = DEFAULT_IMAGE,
    type = "website",
    noindex = false,
}) {
    const canonicalUrl = `${BASE_URL}${path}`;
    const fullTitle = title.includes("Hausecare")
        ? title
        : `${title} | Hausecare`;

    return (
        <Helmet>
            {/* Title */}
            <title>{fullTitle}</title>

            {/* Meta Description */}
            <meta name="description" content={description} />

            {/* Robots */}
            {noindex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            )}

            {/* Canonical */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:image" content={image} />
            <meta property="og:image:alt" content={title} />

            {/* Twitter Card */}
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}
