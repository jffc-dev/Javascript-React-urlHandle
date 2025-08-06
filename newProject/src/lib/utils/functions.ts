export const openBlankURL = (url: string) => {
  Object.assign(document.createElement('a'), {
    target: '_blank',
    href: url,
  }).click();
};
