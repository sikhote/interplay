const { get } = require('lodash');
const en = require('./en');
const isBrowser = require('../isBrowser');

const translations = { en };

const getLocale = () => {
  const locale = isBrowser
    ? get(navigator, 'languages[0]') || navigator.language
    : 'en';

  return locale.includes('-') ? locale.split('-')[0] : locale;
};

module.exports = { translations, getLocale };
