import { resolveLocale } from './locale.js';

function closingBrace(message, start) {
  let depth = 0;
  for (let index = start; index < message.length; index += 1) {
    if (message[index] === '{') depth += 1;
    if (message[index] === '}') depth -= 1;
    if (depth === 0) return index;
  }
  return -1;
}

function expressionParts(expression) {
  const parts = [];
  let start = 0;
  let depth = 0;
  for (let index = 0; index < expression.length; index += 1) {
    if (expression[index] === '{') depth += 1;
    if (expression[index] === '}') depth -= 1;
    if (expression[index] === ',' && depth === 0) {
      parts.push(expression.slice(start, index));
      start = index + 1;
    }
  }
  parts.push(expression.slice(start));
  return parts;
}

function choiceOptions(source) {
  const options = {};
  let index = 0;
  while (index < source.length) {
    while (/\s/.test(source[index] || '')) index += 1;
    if (index >= source.length) break;
    const keyStart = index;
    while (index < source.length && !/[\s{]/.test(source[index])) index += 1;
    const key = source.slice(keyStart, index);
    while (/\s/.test(source[index] || '')) index += 1;
    if (!key || source[index] !== '{') return null;
    const end = closingBrace(source, index);
    if (end < 0) return null;
    options[key] = source.slice(index + 1, end);
    index = end + 1;
  }
  return options;
}

function formatMessage(message, values, locale) {
  if (!values) return message;
  let output = '';
  for (let index = 0; index < message.length; index += 1) {
    if (message[index] !== '{') {
      output += message[index];
      continue;
    }
    const end = closingBrace(message, index);
    if (end < 0) return message;
    const token = message.slice(index, end + 1);
    const parts = expressionParts(message.slice(index + 1, end));
    const key = parts.shift().trim();
    if (!Object.prototype.hasOwnProperty.call(values, key)) {
      output += token;
      index = end;
      continue;
    }
    const value = values[key];
    const type = (parts.shift() || '').trim();
    if (!type) {
      output += String(value);
    } else if (type === 'select') {
      const options = choiceOptions(parts.join(','));
      const selected = options && (options[String(value)] ?? options.other);
      output += selected === undefined ? token : formatMessage(selected, values, locale);
    } else if (type === 'plural' || type === 'selectordinal') {
      const numericValue = Number(value);
      const options = choiceOptions(parts.join(','));
      const exact = options ? options['=' + numericValue] : undefined;
      const category = Number.isFinite(numericValue)
        ? new Intl.PluralRules(locale, { type: type === 'selectordinal' ? 'ordinal' : 'cardinal' }).select(numericValue)
        : 'other';
      const selected = exact ?? (options ? options[category] ?? options.other : undefined);
      output += selected === undefined
        ? token
        : formatMessage(selected.replace(/#/g, String(value)), values, locale);
    } else {
      output += token;
    }
    index = end;
  }
  return output;
}

function createTranslator(messages) {
  return function translate(key, values, locale) {
    if (typeof values === 'string' && locale === undefined) {
      locale = values;
      values = undefined;
    }
    const descriptor = messages[key];
    if (!descriptor) throw new Error('Unknown wazuh-farsi message: ' + key);
    const resolvedLocale = resolveLocale(locale);
    return formatMessage(descriptor[resolvedLocale], values, resolvedLocale);
  };
}

function createVariants(messages) {
  return function variants(key) {
    const descriptor = messages[key];
    if (!descriptor) throw new Error('Unknown wazuh-farsi message: ' + key);
    return Array.from(new Set([
      descriptor.en,
      descriptor['fa-IR'],
      ...((descriptor.aliases && descriptor.aliases.en) || []),
      ...((descriptor.aliases && descriptor.aliases['fa-IR']) || []),
    ]));
  };
}

export { createTranslator, createVariants };
