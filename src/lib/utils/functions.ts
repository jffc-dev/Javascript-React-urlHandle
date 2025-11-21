export const openBlankURL = (url: string) => {
  Object.assign(document.createElement('a'), {
    target: '_blank',
    href: url,
  }).click();
};

export const openAdvancedGoogleSearch = (title: string, url: string) => {
  const searchUrl = title || url;
  const googleUrl = `https://www.google.com.pe/search?tbm=vid&hl=es-419&as_q=${encodeURI(
    searchUrl.replace('&', '')
  )}&as_epq=&as_oq=&as_eq=&as_qdr=all&as_sitesearch=&tbs=dur%3Al`;
  openBlankURL(googleUrl);
};
