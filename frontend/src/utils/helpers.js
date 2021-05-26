import storage from 'utils/storage';

const TOKEN = 'token';
const TYPE_TOKEN = 'type_token';
const EXPIRES_IN_TOKEN = 'expires_in_token';

export const login = (jwt) => {
    storage.addItem(TOKEN, jwt.access_token);
    storage.addItem(TYPE_TOKEN, jwt.token_type);
    storage.addItem(EXPIRES_IN_TOKEN, jwt.expires_in);
}

export const logout = () => {
    storage.removeItem(TOKEN);
    storage.removeItem(TYPE_TOKEN);
    storage.removeItem(EXPIRES_IN_TOKEN);
}

export const normalizeUrl = (url) => url.slice(0, 1) === '/' ? url.slice(1, url.length) : url;

export const restObj = (is, obj) => is ? obj : {};


export const getErrorMessage = (error) => {
    let message = '';
    if ('message' in error) {
        message += error.message ?? '';
    }
    
    if ('errors' in error) {
        const keys = Object.keys(error.errors);
        for (const key of keys) {
            message += error.errors[key][0];
        } 
    }

    return message;
}

const ru = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    є: 'e',
    ё: 'e',
    ж: 'j',
    з: 'z',
    и: 'i',
    ї: 'yi',
    й: 'i',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ы: 'y',
    э: 'e',
    ю: 'u',
    я: 'ya',
    ъ: '',
    ь: '',
    ' ': '_',
  };
  
  export const rusToLatin = (str) => {
    return Array.from(str).reduce((acc, letter) => {
      const lowLetter = letter.toLowerCase();
      const en = ru[lowLetter] ?? letter;
      const enNormalized = lowLetter === letter ? en : en.toUpperCase();
      return acc + enNormalized;
    }, '');
  }

  const getPage = (obj) => {
    let page = '?page=';
    if('current' in obj) {
      page += obj.current;
    } else {
      page += 1;
    }
    return page;
  }

  const getUrlParams = (obj) => {
    
    const getParam = (column, param) => {
      const sortedTypes = {
        ascend: 'asc',
        descend: 'desc',
      };

      return `${column}=${sortedTypes[param] ?? param}`
    }

    if(Array.isArray(obj)) {
      let paramString = '';
      for (const val of obj) {
        paramString += `${getParam(val.field, val.order)}&`;
      }
      return paramString.slice(0, -1);
    }
    
    if (obj.column && obj.order) {
      return getParam(obj.field, obj.order);
    }

    return '';
  }

  export const getParams = (pagination, sort) => {
      if (Array.isArray(sort) || sort.field) {
          return `${getPage(pagination)}&${getUrlParams(sort)}`;
      }

      return `${getPage(pagination)}`;
  }