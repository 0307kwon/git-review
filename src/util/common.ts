export const filterURLToPath = (url: string) => {
  return url.replace(/[?#]+.+$/, "");
};

export const isSameURLPath = (url1: string, url2: string) => {
  const urlPath1 = filterURLToPath(url1);
  const urlPath2 = filterURLToPath(url2);

  return urlPath1 === urlPath2;
};
