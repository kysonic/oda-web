const MEDIA_QUERIES = {
    xs: '(min-width: 320px) and (max-width: 768px)',
    sm: '(min-width: 768px) and (max-width: 1024px)',
    md: '(min-width: 1024px) and (max-width: 1560px)',
    lg: '(min-width: 1560px) and (max-width: 1980px)',
    elg: '(min-width: 1980px)',
};

export function getScreenSize() {
    return Object.entries(MEDIA_QUERIES).find(([k, v]) => window.matchMedia(v).matches) || [];
}

export function isSmall() {
    const [screenSize] = getScreenSize();

    return screenSize === 'xs';
}
