export const abrirUrlEspecifica = (cadena) => {
    Object.assign(document.createElement('a'), {
        target: '_blank',
        href: cadena.url,
    }).click();
}