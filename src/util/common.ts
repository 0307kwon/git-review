export const filterURLToPath = (url: string) => {
  return url.replace(/[?#]+.+$/, "");
};

export const isSameURLPath = (url1: string, url2: string) => {
  const urlPath1 = filterURLToPath(url1);
  const urlPath2 = filterURLToPath(url2);

  return urlPath1 === urlPath2;
};

export const getRandomNumber = (from: number, to: number) => {
  if (to < from) {
    return -1;
  }

  return from + Math.round(Math.random() * (to - from));
};

export const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const genNewId = function* () {
  let id = 0;

  while (true) {
    yield id++;
  }
};

export const decideAlphabetOrderFromString = (a: string, b: string) => {
  const minLength = Math.min(a.length, b.length);

  const aToNumber = Array.prototype.reduce.call<string, any, number>(
    a.slice(0, minLength),
    (acc: number, current: string) => acc + current.charCodeAt(0),
    0
  );

  const bToNumber = Array.prototype.reduce.call<string, any, number>(
    b.slice(0, minLength),
    (acc: number, current: string) => acc + current.charCodeAt(0),
    0
  );

  return aToNumber - bToNumber;
};
