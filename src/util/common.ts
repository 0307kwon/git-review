const filterUrlToPath = (url: string) => {
  return url.replace(/[?#]+.+$/, "");
};

export const isSameUrlPath = (url1: string, url2: string) => {
  const urlPath1 = filterUrlToPath(url1);
  const urlPath2 = filterUrlToPath(url2);

  return urlPath1 === urlPath2;
};
