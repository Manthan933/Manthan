export function parseURLParams(url) {
  const queryStart = url.indexOf('?') + 1;
  const queryEnd = url.indexOf('#') + 1 || url.length + 1;
  const query = url.slice(queryStart, queryEnd - 1);
  const pairs = query.replace(/\+/g, ' ').split('&');
  const parms = {};

  if (query === url || query === '') return;

  for (let i = 0; i < pairs.length; i += 1) {
    const nv = pairs[i].split('=', 2);
    const n = decodeURIComponent(nv[0]);
    const v = decodeURIComponent(nv[1]);

    parms[n] = v;
  }
  return parms;
}
