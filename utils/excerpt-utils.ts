import { decode } from 'html-entities';
import Xss from 'xss';

const EXCERPT_MAX_WORDS = 50;

export function removeShortWordsFromTheEndReducer(
  { done, text }: { readonly done: boolean; readonly text: string },
  lastWord: string,
) {
  if (done || lastWord.length >= 3) {
    return { done: true, text: lastWord + ' ' + text };
  }
  return { done: false, text };
}

export function createExcerpt(text: string) {
  return decode(Xss(text, { stripIgnoreTag: true, whiteList: {} }))
    .trim()
    .split(/\s+/)
    .filter((word) => word)
    .slice(0, EXCERPT_MAX_WORDS)
    .reduceRight(removeShortWordsFromTheEndReducer, { done: false, text: '' }).text;
}

type ObjectWithDescription = {
  readonly description: string | null;
};

export function addExcerptToArticle<T extends ObjectWithDescription>(article: T) {
  return {
    ...article,
    excerpt: article.description ? createExcerpt(article.description) : '',
  };
}
