import { words, toLower } from 'lodash';

export const titleToSlug = title => words(toLower(title)).join('-');
