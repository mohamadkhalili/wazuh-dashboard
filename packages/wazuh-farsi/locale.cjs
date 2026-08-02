const DEFAULT_LOCALE = 'fa-IR';
const ENGLISH_LOCALE = 'en';

function valueFromInput(input) {
  if (input === undefined || input === null) {
    if (typeof window !== 'undefined' && window.location) return new URLSearchParams(window.location.search).get('locale');
    return null;
  }
  if (input === ENGLISH_LOCALE || input === DEFAULT_LOCALE) return input;
  if (typeof URLSearchParams !== 'undefined' && input instanceof URLSearchParams) return input.get('locale');
  if (typeof URL !== 'undefined' && input instanceof URL) return input.searchParams.get('locale');
  if (typeof input === 'object' && typeof input.locale === 'string') return input.locale;
  if (typeof input !== 'string') return null;
  const question = input.indexOf('?');
  const query = question >= 0 ? input.slice(question + 1) : input.replace(/^\?/, '');
  return new URLSearchParams(query.split('#', 1)[0]).get('locale');
}

function resolveLocale(input) {
  return valueFromInput(input) === ENGLISH_LOCALE ? ENGLISH_LOCALE : DEFAULT_LOCALE;
}

function getDirection(input) {
  return resolveLocale(input) === ENGLISH_LOCALE ? 'ltr' : 'rtl';
}

function preserveLocaleInUrl(url, input) {
  if (resolveLocale(input) !== ENGLISH_LOCALE || typeof url !== 'string') return url;
  const hashAt = url.indexOf('#');
  const beforeHash = hashAt < 0 ? url : url.slice(0, hashAt);
  const hash = hashAt < 0 ? '' : url.slice(hashAt);
  const queryAt = beforeHash.indexOf('?');
  const pathname = queryAt < 0 ? beforeHash : beforeHash.slice(0, queryAt);
  const query = queryAt < 0 ? '' : beforeHash.slice(queryAt + 1);
  const params = new URLSearchParams(query);
  params.set('locale', ENGLISH_LOCALE);
  return pathname + '?' + params.toString() + hash;
}


module.exports = { DEFAULT_LOCALE, ENGLISH_LOCALE, resolveLocale, getDirection, preserveLocaleInUrl };
